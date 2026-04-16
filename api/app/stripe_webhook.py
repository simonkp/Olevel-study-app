from __future__ import annotations

from typing import Any

import stripe
from fastapi import APIRouter, HTTPException, Request

from app.supabase_admin import SupabaseAdminStore


def create_stripe_webhook_router(
    *,
    stripe_secret_key: str,
    stripe_webhook_secret: str,
    default_entitlement: str,
    supabase_url: str,
    supabase_service_role_key: str,
) -> APIRouter:
    router = APIRouter()
    admin_store = SupabaseAdminStore(supabase_url, supabase_service_role_key)
    stripe.api_key = stripe_secret_key.strip()

    @router.post("/webhook/stripe")
    async def stripe_webhook(request: Request) -> dict[str, Any]:
        if not (stripe_webhook_secret or "").strip():
            raise HTTPException(status_code=503, detail="STRIPE_WEBHOOK_SECRET is not configured")
        payload = await request.body()
        sig_header = request.headers.get("stripe-signature", "")
        try:
            event = stripe.Webhook.construct_event(
                payload=payload,
                sig_header=sig_header,
                secret=stripe_webhook_secret.strip(),
            )
        except stripe.error.SignatureVerificationError as exc:
            raise HTTPException(status_code=400, detail="Invalid Stripe signature") from exc
        except ValueError as exc:
            raise HTTPException(status_code=400, detail="Invalid Stripe payload") from exc

        event_type = str(event.get("type") or "")
        event_id = str(event.get("id") or "")
        if event_type != "checkout.session.completed":
            return {"ok": True, "ignored": event_type or "unknown"}

        data_obj = (event.get("data") or {}).get("object") or {}
        user_id = str(data_obj.get("client_reference_id") or "").strip()
        if not user_id:
            raise HTTPException(
                status_code=400,
                detail="checkout.session.completed is missing client_reference_id",
            )

        metadata = data_obj.get("metadata") or {}
        entitlement = str(metadata.get("entitlement") or default_entitlement or "").strip()
        if not entitlement:
            raise HTTPException(status_code=400, detail="Missing entitlement in webhook configuration")

        result = admin_store.upsert_entitlement_from_stripe(
            user_id=user_id,
            entitlement=entitlement,
            stripe_event_id=event_id,
            stripe_event_type=event_type,
            stripe_customer_id=str(data_obj.get("customer") or "") or None,
            stripe_checkout_session_id=str(data_obj.get("id") or "") or None,
            payload=event,
        )
        if result.duplicate_event:
            return {"ok": True, "duplicate": True, "event_id": event_id}
        return {"ok": True, "event_id": event_id, "user_id": user_id, "entitlements": result.entitlements}

    return router
