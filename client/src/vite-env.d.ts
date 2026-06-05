/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional self-hosted Umami analytics endpoint */
  readonly VITE_ANALYTICS_ENDPOINT?: string;
  /** Optional Umami website ID */
  readonly VITE_ANALYTICS_WEBSITE_ID?: string;
  /** Cloudflare Turnstile site key for contact form spam protection */
  readonly VITE_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
