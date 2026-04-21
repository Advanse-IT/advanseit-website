# Phase 1 Migration — Remove Manus Dependencies

## Image Assets
- [ ] Download hero background image (Hero.tsx — private-us-east-1.manuscdn.com)
- [ ] Download WebDevShowcase image 1 (WebDevShowcase.tsx)
- [ ] Download WebDevShowcase image 2 (WebDevShowcase.tsx)
- [ ] Download logo SVG (Navbar.tsx, Footer.tsx — files.manuscdn.com)
- [ ] Download OG image (SEO.tsx — files.manuscdn.com)
- [ ] Download LocalBusinessSchema image (files.manuscdn.com)
- [ ] Download ServicePageTemplate images (files.manuscdn.com x2)
- [ ] Download BlogPost fallback image (files.manuscdn.com)

## Source File Updates
- [ ] Replace Manus CDN URLs in Hero.tsx
- [ ] Replace Manus CDN URLs in WebDevShowcase.tsx
- [ ] Replace Manus CDN URLs in Navbar.tsx
- [ ] Replace Manus CDN URLs in Footer.tsx
- [ ] Replace Manus CDN URLs in SEO.tsx
- [ ] Replace Manus CDN URLs in LocalBusinessSchema.tsx
- [ ] Replace Manus CDN URLs in ServicePageTemplate.tsx
- [ ] Replace Manus CDN URLs in BlogPost.tsx

## Vite Config
- [ ] Remove vite-plugin-manus-runtime
- [ ] Remove vitePluginManusDebugCollector
- [ ] Remove Manus allowedHosts from vite.config.ts
- [ ] Remove __manus__ debug-collector.js from client/public

## Backend — Storage
- [ ] Replace Manus storage proxy in server/storage.ts with AWS S3 SDK
- [ ] Update blogRouter.ts to use new storage helper
- [ ] Add S3 env vars to ENV config

## Backend — Notifications
- [ ] Replace notifyOwner in routers.ts with second SMTP email fallback
- [ ] Remove Manus notification dependency from blogScheduler.ts

## Final
- [ ] Verify TypeScript build compiles cleanly
- [ ] Verify dev server starts without errors
