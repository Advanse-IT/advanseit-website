# AdvanseIT — Main Website

**advanseit.com.au**

React + TypeScript + Tailwind CSS v4 + Express API

## Stack
- **Frontend**: React 19, Wouter, TanStack Query, tRPC, Framer Motion
- **Styling**: Tailwind CSS v4, shadcn/ui, self-hosted Outfit + Nunito Sans fonts
- **Backend**: Express, tRPC, Drizzle ORM (MySQL)
- **Email**: Nodemailer (SMTP) — configure via `.env`
- **Maps**: OpenStreetMap embed — no API key required

## Getting Started

```bash
cp .env.example .env
# Fill in your SMTP and DATABASE_URL values

pnpm install
pnpm run dev
```

## Build for Cloudflare Pages

```bash
pnpm install
pnpm run build
# Deploy the dist/public folder to Cloudflare Pages
```

Or connect your GitHub repo to Cloudflare Pages:
- **Build command**: `pnpm install && pnpm run build`
- **Output directory**: `dist/public`
- **Environment variables**: set from `.env.example` in Cloudflare dashboard

## Environment Variables

See `.env.example` for all required and optional variables.

## Self-Hosted Assets

All external dependencies have been removed:
- ✅ Fonts: Outfit + Nunito Sans served from `/public/fonts/`
- ✅ Maps: OpenStreetMap iframe (no API key)
- ✅ Images: All in `/public/images/`
- ✅ Blog placeholder: `/public/images/blog-placeholder.svg`
- ✅ Analytics: Optional Umami (or leave blank)

## Subdomain

The training site lives in a separate repo: `advanseit-training`
