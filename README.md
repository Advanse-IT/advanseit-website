# AdvanseIT — Main Website

**advanseit.com.au** · React 19 + TypeScript + Tailwind CSS v4 + Express + tRPC

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Wouter, TanStack Query, tRPC, Framer Motion |
| Styling | Tailwind CSS v4, shadcn/ui, self-hosted Outfit + Nunito Sans |
| Backend | Express, tRPC, Drizzle ORM (MySQL) |
| Email | Nodemailer (SMTP) |
| Maps | OpenStreetMap iframe (no API key) |
| Analytics | Google Analytics 4 (Consent Mode v2) |
| Spam protection | Cloudflare Turnstile (optional) |
| Hosting | Cloudflare Pages |

---

## Local Development

```bash
cp .env.example .env
# Fill in required values (see Environment Variables below)

pnpm install
pnpm run dev
# → http://localhost:3000
```

---

## Build & Deploy (Cloudflare Pages)

### Option A — GitHub integration (recommended)

1. Push to GitHub
2. Cloudflare Dashboard → Pages → Create project → Connect to Git
3. Set build settings:
   - **Build command:** `pnpm install && pnpm run build`
   - **Output directory:** `dist/public`
   - **Node version (env var):** `NODE_VERSION = 20`
4. Add environment variables (see below)

### Option B — Manual upload

```bash
pnpm install
pnpm run build
# Upload dist/public/ to Cloudflare Pages
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in:

### Required

| Variable | Description |
|---|---|
| `SMTP_HOST` | SMTP server, e.g. `smtp.gmail.com` |
| `SMTP_PORT` | Usually `587` |
| `SMTP_USER` | Your email address |
| `SMTP_PASS` | App password (not your login password) |

### Recommended

| Variable | Description |
|---|---|
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 ID (`G-XXXXXXXXXX`) |
| `VITE_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (free spam protection) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret (server-side verification) |
| `JWT_SECRET` | Long random string for blog admin sessions |

### Optional

| Variable | Description |
|---|---|
| `DATABASE_URL` | MySQL connection string for blog + enquiry storage |
| `OPENAI_API_KEY` | Enables AI blog auto-generation |
| `S3_BUCKET` / `S3_*` | Cloudflare R2 or AWS S3 for blog cover images |

---

## Google Analytics 4 Setup

1. Go to [analytics.google.com](https://analytics.google.com) → Create property for `advanseit.com.au`
2. Copy your **Measurement ID** (`G-XXXXXXXXXX`)
3. Add `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX` to Cloudflare Pages env vars
4. GA4 uses **Consent Mode v2** — no data collected until user accepts cookie banner

**Events tracked automatically:**
- `page_view` — every route change (SPA-aware)
- `contact_form_submit` — contact form success
- `conversion` + `generate_lead` — contact form success

---

## Cloudflare Turnstile Setup (Spam Protection)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → Turnstile → Add Site → `advanseit.com.au`
2. Choose **Managed** challenge type
3. Copy **Site Key** → `VITE_TURNSTILE_SITE_KEY`
4. Copy **Secret Key** → `TURNSTILE_SECRET_KEY`
5. Both are **free** — no billing required

---

## Self-Hosted Assets

All external dependencies removed — zero third-party requests on page load:

- ✅ Fonts: Outfit + Nunito Sans from `/public/fonts/`
- ✅ Maps: OpenStreetMap iframe
- ✅ Images: all in `/public/images/`
- ✅ Analytics: GA4 script loads only after consent

---

## Performance

- **Vite manual chunk splitting** — React, Radix, charts, animations in separate chunks
- **LCP preload** — hero background image preloaded in `<head>`
- **Cloudflare CDN** — immutable cache on `/assets/*` and `/fonts/*`
- **Gzip compression** — via Express middleware (dev) and Cloudflare (prod)

---

## Security

- **Rate limiting** — 60 req/15min general, 5 req/hour on contact form
- **CORS** — restricted to `advanseit.com.au` in production
- **CSP** — Content-Security-Policy header via `_headers`
- **Turnstile** — server-side token verification before email send
- **Error boundary** — stack traces hidden in production

---

## Training Site

Lives in a separate repo: `advanseit-training` → `training.advanseit.com.au`

The main site 301-redirects `/training` and `/training/*` to the subdomain.
