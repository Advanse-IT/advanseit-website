/**
 * Analytics.tsx — AdvanseIT
 *
 * Google Analytics 4 — Measurement ID: G-56VZJR0KTQ
 * Australian Privacy Act + GDPR Consent Mode v2 compliant.
 *
 * Behaviour:
 *  • GA4 script injected immediately after <head> (as Google recommends)
 *  • Consent Mode v2 default: analytics_storage=denied until user accepts cookie banner
 *  • When user accepts → consent updated to "granted" → GA4 starts collecting
 *  • When user declines → stays denied → GA4 fires no hits
 *  • SPA page_view fired on every wouter route change
 *  • Conversion events on contact form submit
 */

import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";

// ── Types ─────────────────────────────────────────────────────────────────────
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    advanseConsentAccepted?: boolean;
  }
}

// ── Config ────────────────────────────────────────────────────────────────────
const GA_ID = "G-56VZJR0KTQ";
const CONSENT_KEY = "advanseit_cookie_consent";

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Fire a custom GA4 event */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params ?? {});
}

/** Fire a GA4 conversion / lead event on contact form success */
export function trackConversion(params?: {
  send_to?: string;
  value?: number;
  currency?: string;
  transaction_id?: string;
}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "conversion", {
    send_to: params?.send_to ?? GA_ID,
    value: params?.value ?? 1,
    currency: params?.currency ?? "AUD",
    transaction_id: params?.transaction_id ?? Date.now().toString(),
  });
  window.gtag("event", "generate_lead", {
    currency: "AUD",
    value: params?.value ?? 1,
  });
}

/** Grant analytics consent — call when user accepts cookie banner */
export function grantAnalyticsConsent() {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });
  window.advanseConsentAccepted = true;
}

/** Revoke analytics consent — call when user declines cookie banner */
export function revokeAnalyticsConsent() {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.advanseConsentAccepted = false;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Analytics() {
  const [location] = useLocation();

  // Fire page_view on every SPA route change
  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;
    window.gtag("event", "page_view", {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);

  // On mount: restore consent if user already accepted previously
  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      if (saved === "accepted") {
        grantAnalyticsConsent();
      }
    } catch {
      // localStorage blocked — consent stays denied
    }
  }, []);

  return (
    <Helmet>
      {/*
        Google tag (gtag.js) — G-56VZJR0KTQ
        Placed immediately after <head> as recommended by Google.
        Consent Mode v2 default is DENIED — no data collected until
        user accepts the cookie banner.
      */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <script>{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;

        // Consent Mode v2 — default DENIED until user accepts cookie banner
        gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          functionality_storage: 'granted',
          security_storage: 'granted',
          wait_for_update: 500
        });

        // Google tag — G-56VZJR0KTQ
        gtag('js', new Date());
        gtag('config', '${GA_ID}', {
          send_page_view: false,
          anonymize_ip: true,
          cookie_flags: 'SameSite=None;Secure',
          cookie_domain: 'advanseit.com.au',
          cookie_expires: 63072000,
          transport_type: 'beacon'
        });
      `}</script>
    </Helmet>
  );
}
