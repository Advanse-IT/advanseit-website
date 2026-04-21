/**
 * SEO Component — AdvanseIT
 * Manages per-page title, description, keywords, Open Graph, and Twitter Card tags
 * using react-helmet-async for SSR-safe head injection.
 *
 * KEYWORD STRATEGY (per section / page):
 * ─────────────────────────────────────────────────────────────────────────────
 * Home (default)     → "IT company Brisbane", "AI-first IT solutions Australia"
 * Services           → "web design Brisbane", "app development Brisbane"
 * Web Design         → "web design Brisbane", "website development Queensland"
 * App Development    → "app development Brisbane", "mobile app development Australia"
 * Custom Software    → "custom software development Brisbane"
 * Testing / QA       → "software testing services Brisbane", "QA testing Australia"
 * AI Solutions       → "AI solutions Brisbane", "AI development Australia"
 * IT Staffing        → "IT staffing Brisbane", "IT outsourcing Australia"
 * About              → "AdvanseIT Brisbane", "IT company Queensland"
 * Contact            → "contact IT company Brisbane", "get IT quote Brisbane"
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { Helmet } from "react-helmet-async";

const SITE_NAME = "AdvanseIT";
const SITE_URL = "https://advanseit.com.au";
const OG_IMAGE = "/images/og-image-social.png";
const OG_IMAGE_WIDTH = "1200";
const OG_IMAGE_HEIGHT = "630";
const TWITTER_HANDLE = "@AdvanseIT";

export type SEOPage =
  | "home"
  | "services"
  | "web-design"
  | "app-development"
  | "custom-software"
  | "testing"
  | "ai-solutions"
  | "it-staffing"
  | "about"
  | "contact"
  | "blog";

interface SEOProps {
  page?: SEOPage;
  /** Override title (appended with " | AdvanseIT") */
  title?: string;
  /** Override description (50–160 chars) */
  description?: string;
  /** Override canonical URL path, e.g. "/services/web-design" */
  canonicalPath?: string;
  /** Extra keywords to append */
  extraKeywords?: string[];
}

const PAGE_META: Record<
  SEOPage,
  { title: string; description: string; keywords: string[] }
> = {
  home: {
    title: "AI-Powered IT for Australian Business",
    description:
      "We build websites, apps & AI solutions that drive real results. Brisbane IT company trusted by Australian businesses.",
    keywords: [
      "AI web development Brisbane",
      "app development Brisbane",
      "Brisbane IT company",
      "AI software development Australia",
      "custom software development Brisbane",
      "AI chatbot development Brisbane",
      "IT staffing Brisbane",
      "web design Brisbane",
      "IT services Queensland",
      "digital transformation Brisbane",
    ],
  },
  services: {
    title: "Our Services — Web, App, AI & IT Staffing",
    description:
      "Explore AdvanseIT's full range of IT services: web design, app development, AI solutions, QA testing, and IT staffing across Australia.",
    keywords: [
      "IT services Brisbane",
      "web design Brisbane",
      "app development Brisbane",
      "AI solutions Australia",
      "IT staffing Brisbane",
      "software development Queensland",
    ],
  },
  "web-design": {
    title: "Web Design & Development Brisbane",
    description:
      "Professional web design and development in Brisbane. Responsive, fast, and SEO-optimised websites built for Australian businesses.",
    keywords: [
      "web design Brisbane",
      "website development Brisbane",
      "web development Queensland",
      "responsive web design Australia",
      "SEO website Brisbane",
      "professional website design Brisbane",
    ],
  },
  "app-development": {
    title: "App Development Brisbane — iOS & Android",
    description:
      "Custom iOS and Android app development in Brisbane. We build scalable, user-friendly mobile and web applications for Australian businesses.",
    keywords: [
      "app development Brisbane",
      "mobile app development Brisbane",
      "iOS app development Australia",
      "Android app development Brisbane",
      "React Native development Brisbane",
      "cross-platform app development Queensland",
    ],
  },
  "custom-software": {
    title: "Custom Software Development Brisbane",
    description:
      "Bespoke software solutions designed for your business. AdvanseIT delivers scalable, AI-powered custom software from Brisbane.",
    keywords: [
      "custom software development Brisbane",
      "bespoke software Brisbane",
      "enterprise software development Australia",
      "software solutions Queensland",
      "tailored software Brisbane",
    ],
  },
  testing: {
    title: "Software Testing & QA Services Brisbane",
    description:
      "Comprehensive software testing and QA services in Brisbane. Manual, automated, and performance testing for web and mobile applications.",
    keywords: [
      "software testing Brisbane",
      "QA testing Brisbane",
      "automated testing Australia",
      "software quality assurance Brisbane",
      "test automation Queensland",
      "performance testing Brisbane",
    ],
  },
  "ai-solutions": {
    title: "AI Solutions & Development Brisbane",
    description:
      "Harness the power of AI for your business. AdvanseIT delivers AI integrations, automation, and machine learning solutions from Brisbane.",
    keywords: [
      "AI solutions Brisbane",
      "artificial intelligence development Brisbane",
      "AI integration Australia",
      "machine learning Brisbane",
      "AI automation Queensland",
      "AI consulting Brisbane",
      "AI-first software Australia",
    ],
  },
  "it-staffing": {
    title: "IT Staffing & Outsourcing Brisbane",
    description:
      "Flexible IT staffing and outsourcing solutions from Brisbane. Access skilled developers, testers, and IT professionals across Australia.",
    keywords: [
      "IT staffing Brisbane",
      "IT outsourcing Brisbane",
      "IT recruitment Australia",
      "offshore IT staffing Brisbane",
      "dedicated development team Australia",
      "IT consulting Brisbane",
    ],
  },
  about: {
    title: "About AdvanseIT — Brisbane IT Company",
    description:
      "Learn about AdvanseIT, a Brisbane-based IT company delivering cost-effective, AI-first technology solutions to businesses across Australia.",
    keywords: [
      "AdvanseIT Brisbane",
      "IT company Brisbane",
      "technology company Queensland",
      "Brisbane software company",
      "Australian IT company",
    ],
  },
  contact: {
    title: "Contact AdvanseIT — Get a Free IT Quote",
    description:
      "Get in touch with AdvanseIT in Brisbane for a free consultation and project quote. We respond within 24 hours.",
    keywords: [
      "contact IT company Brisbane",
      "IT quote Brisbane",
      "free IT consultation Brisbane",
      "hire IT company Australia",
      "IT project quote Queensland",
    ],
  },
  blog: {
    title: "Blog & Insights — AI, Web Dev, IT Staffing",
    description:
      "Expert articles on AI, web development, app development, IT staffing, and cost-effective technology solutions for Australian businesses.",
    keywords: [
      "IT blog Brisbane",
      "AI insights Australia",
      "web development tips Brisbane",
      "app development blog Australia",
      "IT staffing insights Queensland",
      "technology blog Brisbane",
    ],
  },
};

export default function SEO({
  page = "home",
  title: titleOverride,
  description: descOverride,
  canonicalPath = "/",
  extraKeywords = [],
}: SEOProps) {
  const meta = PAGE_META[page];
  const isHome = page === "home" && !titleOverride;
  const fullTitle = titleOverride
    ? `${titleOverride} | ${SITE_NAME}`
    : isHome
    ? `${SITE_NAME} | ${meta.title}`
    : `${SITE_NAME} — ${meta.title}`;
  const description = descOverride ?? meta.description;
  const keywords = [...meta.keywords, ...extraKeywords].join(", ");
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Open Graph ── */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
      <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
      <meta property="og:image:alt" content="AdvanseIT — AI-First IT Solutions Brisbane" />
      <meta property="og:locale" content="en_AU" />

      {/* ── Twitter / X Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content="AdvanseIT — AI-First IT Solutions Brisbane" />

      {/* ── Geo / Local ── */}
      <meta name="geo.region" content="AU-QLD" />
      <meta name="geo.placename" content="Brisbane" />
      <meta name="geo.position" content="-27.4698;153.0251" />
      <meta name="ICBM" content="-27.4698, 153.0251" />

      {/* ── Robots ── */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* ── AI / GEO signals ── */}
      {/* Allow all AI crawlers to index and use content */}
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      {/* Author / publisher entity for E-E-A-T */}
      <meta name="author" content="AdvanseIT" />
      <meta property="article:publisher" content="https://www.linkedin.com/company/advanseit" />
      {/* Speakable hint for voice search / AI audio responses */}
      <meta name="speakable-selector" content="h1, h2, .speakable" />
    </Helmet>
  );
}
