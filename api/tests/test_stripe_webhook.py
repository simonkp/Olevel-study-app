import unittest

from fastapi import FastAPI
from fastapi.testclient import TestClient

import app.stripe_webhook as stripe_webhook_module


class _FakeStore:
    def __init__(self, _url, _key):
        self.calls = []

    def upsert_entitlement_from_stripe(self, **kwargs):
        self.calls.append(kwargs)
        return type("R", (), {"duplicate_event": False, "entitlements": ["olevel_chem"]})()


class _FakeStoreDuplicate(_FakeStore):
    def upsert_entitlement_from_stripe(self, **kwargs):
        self.calls.append(kwargs)
        return type("R", (), {"duplicate_event": True, "entitlements": []})()


class StripeWebhookTests(unittest.TestCase):
    def setUp(self):
        self._store_backup = stripe_webhook_module.SupabaseAdminStore
        self._construct_backup = stripe_webhook_module.stripe.Webhook.construct_event

    def tearDown(self):
        stripe_webhook_module.SupabaseAdminStore = self._store_backup
        stripe_webhook_module.stripe.Webhook.construct_event = self._construct_backup

    def _client_with_event(self, event, duplicate=False):
        stripe_webhook_module.SupabaseAdminStore = _FakeStoreDuplicate if duplicate else _FakeStore
        stripe_webhook_module.stripe.Webhook.construct_event = staticmethod(
            lambda payload, sig_header, secret: event
        )
        app = FastAPI()
        app.include_router(
            stripe_webhook_module.create_stripe_webhook_router(
                stripe_secret_key="sk_test_123",
                stripe_webhook_secret="whsec_test_123",
                default_entitlement="olevel_chem",
                supabase_url="http://127.0.0.1:54321",
                supabase_service_role_key="service_key",
            )
        )
        return TestClient(app)

    def test_ignores_non_checkout_events(self):
        event = {"id": "evt_1", "type": "payment_intent.succeeded", "data": {"object": {}}}
        c = self._client_with_event(event)
        r = c.post("/webhook/stripe", data="{}", headers={"stripe-signature": "sig"})
        self.assertEqual(r.status_code, 200)
        self.assertTrue(r.json().get("ignored"))

    def test_completed_event_updates_entitlement(self):
        event = {
            "id": "evt_2",
            "type": "checkout.session.completed",
            "data": {
                "object": {
                    "id": "cs_test_1",
                    "client_reference_id": "user-uuid-1",
                    "customer": "cus_123",
                    "metadata": {"entitlement": "olevel_chem"},
                }
            },
        }
        c = self._client_with_event(event)
        r = c.post("/webhook/stripe", data="{}", headers={"stripe-signature": "sig"})
        self.assertEqual(r.status_code, 200)
        j = r.json()
        self.assertEqual(j.get("ok"), True)
        self.assertEqual(j.get("user_id"), "user-uuid-1")

    def test_duplicate_event_returns_duplicate_true(self):
        event = {
            "id": "evt_3",
            "type": "checkout.session.completed",
            "data": {"object": {"id": "cs_test_2", "client_reference_id": "user-uuid-2"}},
        }
        c = self._client_with_event(event, duplicate=True)
        r = c.post("/webhook/stripe", data="{}", headers={"stripe-signature": "sig"})
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json().get("duplicate"), True)


if __name__ == "__main__":
    unittest.main()
