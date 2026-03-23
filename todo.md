# AdvanseIT Website TODO

## Completed
- [x] Project scaffold and design system (navy/cyan brand palette)
- [x] Navbar with scroll-aware styling, mobile menu, and logo
- [x] Hero section with animated aurora background and stats
- [x] Services section with 6-service animated cards
- [x] Web Dev Showcase section with AI-generated imagery
- [x] AI Solutions section with dark navy background
- [x] About section with Brisbane HQ context and core values
- [x] Tech Stack scrolling marquee
- [x] Why Us section with process steps
- [x] Testimonials carousel
- [x] CTA Banner section
- [x] Contact section with form
- [x] Footer with links and brand info
- [x] New SVG logo (Group776.svg) uploaded to CDN and applied across site
- [x] Updated contact details: admin@advanseit.com.au, 0481 261 679
- [x] Full-stack upgrade (tRPC + DB + server)
- [x] Contact form wired to real tRPC backend endpoint
- [x] Email sending via nodemailer (SMTP) to admin@advanseit.com.au
- [x] Owner notification via Manus notification system as fallback
- [x] Vitest tests for contact router (4 tests passing)

## Pending / Future
- [ ] Add real portfolio / case studies section with client projects
- [x] Blog: Database schema for posts (title, slug, content, cover_image, inline_images, tags, status, published_at)
- [x] Blog: tRPC API for blog CRUD and public listing
- [x] Blog: Automated pipeline - trending topic fetcher + LLM writer + image generation
- [x] Blog: Public blog listing page with cover images
- [x] Blog: Article detail page with cover image + inline images
- [x] Blog: Cross-platform repurposing content (LinkedIn, Medium, Reddit variants)
- [x] Blog: Schedule automated generation Tuesdays and Fridays 8am AEST (node-cron)
- [x] Blog: Navbar updated with Blog link (active state highlight)
- [x] Blog: sitemap.xml updated with /blog route
- [x] Blog: SEO meta tags per article (Helmet, OG, Twitter Card)
- [x] Blog: 22 vitest tests passing (blog + legal + contact + auth)
- [ ] Connect LinkedIn, Twitter, GitHub social links to real profiles
- [ ] Add ABN number to footer (currently placeholder: 12 345 678 901)
- [ ] Add Google Analytics or custom analytics integration
- [ ] Add cookie consent banner (GDPR/Australian Privacy Act compliance)
- [x] Fix favicon: add navy blue (#0D1B2E) background so it's not transparent
- [x] Fix SEO: shorten meta description to under 160 characters (now 136 chars)
- [x] SEO: Per-page keyword focus with dynamic meta tags (react-helmet-async)
- [x] SEO: Generate and serve robots.txt and sitemap.xml
- [x] SEO: Implement LocalBusiness JSON-LD structured data (Brisbane + AU cities)
- [x] SEO: Branded Open Graph image (1200x630) + full OG/Twitter card meta tags
- [x] SEO: Weekly SEO reporting template document (SEO-Weekly-Report-Template.md)
- [x] Rebrand: Replaced ALL "AdvanseIT" references across every source file (was AdvanceIT)
- [x] Footer: Update ABN to 12 656 409 850
- [x] Footer: Update LinkedIn link to https://www.linkedin.com/company/advanseit
- [x] Footer: Update X/Twitter link to https://x.com/AdvanseIT
- [x] Footer: Remove GitHub link
- [x] Footer: Replace Twitter bird icon with X logo SVG
- [x] Legal: Create Terms & Conditions page (Australian law compliant)
- [x] Legal: Create Privacy Policy page (Australian Privacy Act 1988)
- [x] Legal: Create Cookie Policy page
- [x] Legal: Add cookie consent banner (localStorage persistence)
- [x] Legal: Update footer links to point to legal pages (new Legal column in footer)
- [x] Logo: Update website with new Group789.svg logo (navbar, footer, favicon)
- [x] Logo: Create favicon PNG (icon mark only, navy background) from Group789.svg
- [x] Logo: Create LinkedIn company icon 300x300 (icon mark, navy background)
- [x] Logo: Create LinkedIn cover page 1128x191 (logo right, tagline, navy/cyan theme)

## AI SEO Optimisation (AEO/GEO)
- [x] robots.txt: Allow all major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Applebot-Extended, FacebookBot, cohere-ai, Google-Extended)
- [x] Create /llms.txt — curated Markdown overview of site for LLM context (services, FAQs, contact, key pages)
- [x] Structured data: AISEOSchema component — FAQPage (10 Q&A), HowTo (5 steps), Service ItemList (6 services)
- [x] Structured data: WebSite + SiteLinksSearchBox schema
- [x] Structured data: Enhanced Organization schema with taxID, foundingDate, contactPoint, knowsAbout
- [x] Structured data: Article schema for blog posts (datePublished, dateModified, author, publisher, image)
- [x] Add FAQ section to homepage (AEO — 8 direct-answer accordions for AI citation)
- [x] Add E-E-A-T trust signals: ABN badge, Brisbane QLD badge, Founded 2023 badge in About section
- [x] Optimise home meta description with ABN, entity-rich language, and expanded keyword set
- [x] Add canonical tags to all pages (already present, confirmed)
- [x] Add AI/GEO meta tags: author, article:publisher, speakable-selector, googlebot, bingbot
- [x] Blog posts: full OG article meta (published_time, modified_time, section, publisher)
- [x] Twitter handle corrected to @AdvanseIT across SEO and BlogPost components
- [x] sitemap.xml: updated lastmod timestamps to 2026-03-16

## AI SEO Suggestions 2 & 3
- [x] Speakable: Hero subheading marked class="speakable" + SpeakableSpecification JSON-LD in Hero.tsx
- [x] Services: Built /services/web-design dedicated page (benefits, process, tech stack, FAQ, CTA, SEO)
- [x] Services: Built /services/app-development dedicated page
- [x] Services: Built /services/custom-software dedicated page
- [x] Services: Built /services/ai-solutions dedicated page
- [x] Services: Built /services/testing dedicated page
- [x] Services: Built /services/it-staffing dedicated page
- [x] Services: All 6 routes added to App.tsx
- [x] Services: Navbar updated with hover dropdown listing all 6 service pages (desktop + mobile accordion)
- [x] Services: sitemap.xml updated with all 6 service URLs at priority 0.90–0.95
- [x] Services: AISEOSchema ItemList URLs updated to point to dedicated service pages
- [x] Services: ServicePageTemplate component with Service + BreadcrumbList + FAQPage JSON-LD per page

## Bug Fixes
- [x] Fix: Page navigation does not scroll to top — added global ScrollToTop component to App.tsx (fires on every route change via useLocation)

## UX Improvements
- [x] Back-to-top: Sticky floating button (BackToTop.tsx) appears after 400px scroll, smooth-scrolls to top, fade+scale animation via Framer Motion
- [x] Related Services: Row of 3 other service cards at bottom of each service page (ServicePageTemplate.tsx)
- [x] Blog progress bar: Thin 3px cyan reading progress bar at top of blog post pages (ReadingProgress.tsx)

## Mobile Responsiveness Audit & Fixes
- [x] Global: Added overflow-x:hidden to html/body in index.css
- [x] Navbar: Fixed corrupted JSX div in mobile menu; Services dropdown accordion works on mobile
- [x] Hero: text-3xl on xs screens, pt-20 sm:pt-24, CTA buttons full-width on mobile (flex-col sm:flex-row)
- [x] Services section: Cards already grid-cols-1 md:grid-cols-2 lg:grid-cols-3 — confirmed correct
- [x] AISection: heading text-3xl sm:text-5xl
- [x] About: heading text-3xl sm:text-5xl, CTA buttons flex-col sm:flex-row w-full sm:w-auto
- [x] WhyUs: heading text-3xl sm:text-5xl
- [x] Testimonials: heading text-3xl sm:text-5xl
- [x] CTABanner: heading text-3xl sm:text-5xl, buttons flex-col sm:flex-row
- [x] Contact: heading text-3xl sm:text-5xl, form already responsive
- [x] Footer: already uses sm:grid-cols-2 and flex-col sm:flex-row — confirmed correct
- [x] Blog listing: px-4 sm:px-6, py-10 sm:py-16, heading text-3xl sm:text-4xl
- [x] Blog post: px-4 sm:px-6, py-8 sm:py-12, heading text-2xl sm:text-3xl
- [x] Service pages: pt-24 sm:pt-32, px-4 sm:px-6, heading text-3xl sm:text-4xl, CTA buttons full-width on mobile
- [x] FAQ accordion: px-4 sm:px-6, py-4 sm:py-5 touch targets
- [x] All 22 tests pass after all mobile fixes

## Content Fixes
- [x] Fix phone number format: update displayed numbers to 0481 261 679 (local format) across all files
- [x] Fix CTABanner "Call Us Now" button to display +61 481 261 679 visibly
- [x] Fix PrivacyPolicy.tsx PHONE constant to +61 481 261 679

## Blog Scheduler Fix
- [x] Fix cron: changed schedule to Tuesday & Thursday 09:00 AEST (Mon/Wed 23:00 UTC)
- [x] Trigger manual blog generation run for missed Tuesday 17 March run
- [x] Blog: Changed pipeline to auto-publish (status = 'published', publishedAt = new Date())
- [x] Blog: Published existing draft article (id=1) via SQL UPDATE
- [x] Blog: Scheduler corrected to Tuesday & Thursday 09:00 AEST (Mon/Wed 23:00 UTC)

## Thursday 20 March 2026 Fix
- [x] Diagnose: Thursday 09:00 AEST run missed due to sandbox hibernation (server was down Wed 23:00 UTC)
- [x] Diagnose: json_schema minItems/maxItems constraints causing silent LLM API failures (postsCreated always 0)
- [x] Fix: Remove minItems/maxItems from topics json_schema in blogRouter.ts
- [x] Manual trigger: Generated 2 new articles for Thursday (published successfully)
- [x] Fix: Updated blogScheduler.ts with catch-up logic — on startup, if a scheduled window was missed in last 24h and no recent post exists, runs pipeline automatically

## Audit Fixes (March 2026)
- [x] Fix #1: Hero counter animation bug — counters showing 0+ / 0% on page load
- [x] Fix #2: Brand name inconsistency — page title reads "AdvanceIT" instead of "AdvanseIT"
- [x] Fix #3: H1 tag has no SEO keywords — rewrite to include target keywords
- [x] Fix #4: Cookie consent banner not triggering on deployed site — audit and fix
- [x] Fix #5: Service card tech-stack tags — replace with outcome-focused language for business buyers
- [x] Fix #6: Hero headline — strengthen to reinforce AI-First brand promise
- [x] Fix #7: Image alt text — improve alt text on stock photos to be descriptive and keyword-rich
- [x] Fix #13: Security/compliance page — list frameworks/standards (Essential 8, ISO alignment, etc.)
- [x] Fix home page SEO title (64→42 chars) and meta description (217→128 chars) to meet 30–60 / 50–160 character limits

## Manual Blog Posts (March 2026)
- [x] Generate and publish blog post: AI-Powered Test Automation / Java Selenium / AI / AdvanseIT training reference

## Training & LinkedIn (March 2026)
- [x] Build /training page with course details, pricing (live + recordings), and enquiry form
- [x] Add Training link to navbar
- [x] Add /training to sitemap.xml
- [x] Wire training enquiry form to backend (email + owner notification + DB log)
- [x] Retrieve and deliver LinkedIn post copy for Selenium article

## Training Page Sync (March 2026)
- [x] Update Training page prices to match training.advanseit.com.au
- [x] Add link/CTA from Training page to training.advanseit.com.au
