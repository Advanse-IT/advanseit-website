/**
 * Analytics.tsx — AdvanseIT
 *
 * Google Analytics 4 (GA4) — GDPR / Australian Privacy Act compliant.
 *
 * Behaviour:
 *  • GA4 script is injected into <head> immediately (required for gtag consent mode v2)
 *  • Default consent state: analytics_storage=denied, ad_storage=denied
 *  • When user accepts cookies → consent updated to "granted" → GA4 starts collecting
 *  • When user declines → consent stays denied → GA4 fires no hits
 *  • SPA page_view fired on every wouter route change (critical for single-page apps)
 *  • Conversion events fired for: contact form submit, enquiry form submit
 *
 * Setup:
 *  1. Set VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX in your .env
 *  2. Import <Analytics /> once in App.tsx (already done)
 *  3. Use the exported helpers (trackEvent, trackConversion) anywhere in the app
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
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const CONSENT_KEY = "advanseit_cookie_consent";

// ── Helpers (exported for use throughout the app) ─────────────────────────────

/** Fire a custom GA4 event */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined" || !window.gtag || !GA_ID) return;
  window.gtag("event", eventName, params ?? {});
}

/** Fire a GA4 conversion event (contact form, enquiry, etc.) */
export function trackConversion(params?: {
  send_to?: string;
  value?: number;
  currency?: string;
  transaction_id?: string;
}) {
  if (typeof window === "undefined" || !window.gtag || !GA_ID) return;
  window.gtag("event", "conversion", {
    send_to: params?.send_to ?? GA_ID,
    value: params?.value ?? 1,
    currency: params?.currency ?? "AUD",
    transaction_id: params?.transaction_id ?? Date.now().toString(),
  });
  // Also fire as a lead event for GA4 reports
  window.gtag("event", "generate_lead", {
    currency: "AUD",
    value: params?.value ?? 1,
  });
}

/** Update GA4 consent mode — call after user accepts cookies */
export function grantAnalyticsConsent() {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied", // We don't run ads — keep ad_storage denied
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });
  window.advanseConsentAccepted = true;
}

/** Revoke analytics consent — call when user declines */
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

  // Fire page_view on every SPA route change — critical for GA4 in SPAs
  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag || !GA_ID) return;
    window.gtag("event", "page_view", {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);

  // On mount: check existing consent and update GA4 accordingly
  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag || !GA_ID) return;
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      if (saved === "accepted") {
        grantAnalyticsConsent();
      }
    } catch {
      // localStorage blocked — consent stays denied
    }
  }, []);

  // If no GA_ID configured, render nothing
  if (!GA_ID) return null;

  return (
    <Helmet>
      {/* GA4 — Consent Mode v2 (default denied until user accepts) */}
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
