from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from postgrest.exceptions import APIError
from supabase import Client, create_client


@dataclass
class EntitlementUpdateResult:
    duplicate_event: bool
    entitlements: list[str]


class SupabaseAdminStore:
    def __init__(self, url: str, service_role_key: str) -> None:
        if not (url or "").strip():
            raise ValueError("SUPABASE_URL is required")
        if not (service_role_key or "").strip():
            raise ValueError("SUPABASE_SERVICE_ROLE_KEY is required")
        self._client: Client = create_client(url.strip(), service_role_key.strip())

    def upsert_entitlement_from_stripe(
        self,
        *,
        user_id: str,
        entitlement: str,
        stripe_event_id: str,
        stripe_event_type: str,
        stripe_customer_id: str | None,
        stripe_checkout_session_id: str | None,
        payload: dict[str, Any],
    ) -> EntitlementUpdateResult:
        event_row = {
            "stripe_event_id": stripe_event_id,
            "stripe_event_type": stripe_event_type,
            "payload": payload,
        }
        try:
            self._client.table("stripe_webhook_events").insert(event_row).execute()
        except APIError as exc:
            # Ignore duplicate event ids for idempotency.
            msg = str(exc)
            code = getattr(exc, "code", "")
            if code == "23505" or "duplicate key value" in msg.lower():
                return EntitlementUpdateResult(duplicate_event=True, entitlements=[])
            raise

        existing = (
            self._client.table("user_entitlements")
            .select("entitlements")
            .eq("user_id", user_id)
            .maybe_single()
            .execute()
        )
        row = existing.data or {}
        current = row.get("entitlements") or []
        if not isinstance(current, list):
            current = []
        normalized = [str(x).strip() for x in current if str(x).strip()]
        if entitlement and entitlement not in normalized:
            normalized.append(entitlement)

        update_payload = {
            "user_id": user_id,
            "entitlements": normalized,
            "stripe_customer_id": stripe_customer_id,
            "stripe_last_checkout_session": stripe_checkout_session_id,
            "stripe_last_event_id": stripe_event_id,
        }
        self._client.table("user_entitlements").upsert(update_payload).execute()
        return EntitlementUpdateResult(duplicate_event=False, entitlements=normalized)
