/**
 * SEO Component — AdvanseIT
 * Manages per-page title, description, keywords, Open Graph, Twitter Card,
 * hreflang, and all technical on-page meta tags via react-helmet-async.
 *
 * KEYWORD STRATEGY:
 * ─────────────────────────────────────────────────────────────────────────────
 * Home               → "IT company Brisbane", "AI-first IT solutions Australia"
 * Web Design         → "web design Brisbane", "website development Queensland"
 * App Development    → "app development Brisbane", "mobile app development Australia"
 * Custom Software    → "custom software development Brisbane"
 * Testing / QA       → "software testing services Brisbane", "QA testing Australia"
 * AI Solutions       → "AI solutions Brisbane", "AI development Australia"
 * IT Staffing        → "IT staffing Brisbane", "IT outsourcing Australia"
 * Blog               → "IT blog Brisbane", "AI insights Australia"
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { Helmet } from "react-helmet-async";

const SITE_NAME = "AdvanseIT";
const SITE_URL = "https://advanseit.com.au";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image-social.png`;
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
  | "blog"
  | "blog-post"
  | "privacy"
  | "terms"
  | "cookies"
  | "security"
  | "not-found";

interface SEOProps {
  page?: SEOPage;
  /** Override title (replaces auto-generated title entirely when set) */
  title?: string;
  /** Override description (50–160 chars) */
  description?: string;
  /** Canonical URL path, e.g. "/services/web-design" */
  canonicalPath?: string;
  /** Extra keywords to append */
  extraKeywords?: string[];
  /** Per-page OG image (absolute URL). Falls back to default OG image. */
  ogImage?: string;
  /** Published date for blog posts (ISO string) */
  datePublished?: string;
  /** Modified date for blog posts (ISO string) */
  dateModified?: string;
  /** Prevent indexing (404, thank-you pages, etc.) */
  noindex?: boolean;
  /** Article author name (blog posts) */
  author?: string;
}

const PAGE_META: Record<
  SEOPage,
  { title: string; description: string; keywords: string[] }
> = {
  home: {
    title: "AdvanseIT | AI-Powered IT for Australian Business",
    description:
      "We build websites, apps & AI solutions that drive real results. Brisbane IT company trusted by Australian businesses. Free quotes within 24 hours.",
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
    title: "IT Services Brisbane — Web, App, AI & IT Staffing | AdvanseIT",
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
    title: "Web Design & Development Brisbane | AdvanseIT",
    description:
      "Professional web design and development in Brisbane. Responsive, fast, SEO-optimised websites built for Australian businesses. Fixed-price quotes.",
    keywords: [
      "web design Brisbane",
      "website development Brisbane",
      "web development Queensland",
      "responsive web design Australia",
      "SEO website Brisbane",
      "professional website design Brisbane",
      "React web development Brisbane",
      "Next.js development Australia",
    ],
  },
  "app-development": {
    title: "App Development Brisbane — iOS & Android | AdvanseITs",
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
    title: "Custom Software Development Brisbane | AdvanseIT",
    description:
      "Bespoke software solutions designed for your business. AdvanseIT delivers scalable, AI-powered custom software from Brisbane. Fixed-price quotes.",
    keywords: [
      "custom software development Brisbane",
      "bespoke software Brisbane",
      "enterprise software development Australia",
      "software solutions Queensland",
      "tailored software Brisbane",
    ],
  },
  testing: {
    title: "Software Testing & QA Services Brisbane | AdvanseIT",
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
    title: "AI Solutions & Development Brisbane | AdvanseIT",
    description:
      "Harness the power of AI for your business. AdvanseIT delivers AI integrations, chatbots, and machine learning solutions from Brisbane.",
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
    title: "IT Staffing & Outsourcing Brisbane | AdvanseIT",
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
    title: "Contact AdvanseIT — Get a Free IT Quote | Brisbane",
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
    title: "Blog & Insights — AI, Web Dev & IT | AdvanseIT",
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
  "blog-post": {
    title: "Blog | AdvanseIT",
    description: "Insights and articles from the AdvanseIT team.",
    keywords: ["IT blog Brisbane", "AI insights Australia", "AdvanseIT blog"],
  },
  privacy: {
    title: "Privacy Policy | AdvanseIT",
    description:
      "AdvanseIT's privacy policy — how we collect, use, and protect your personal information in accordance with the Australian Privacy Act.",
    keywords: ["AdvanseIT privacy policy", "Australian Privacy Act"],
  },
  terms: {
    title: "Terms & Conditions | AdvanseIT",
    description: "Terms and conditions governing the use of AdvanseIT services and website.",
    keywords: ["AdvanseIT terms and conditions"],
  },
  cookies: {
    title: "Cookie Policy | AdvanseIT",
    description: "How AdvanseIT uses cookies and similar tracking technologies on advanseit.com.au.",
    keywords: ["AdvanseIT cookie policy"],
  },
  security: {
    title: "Security & Compliance | AdvanseIT",
    description:
      "AdvanseIT's security practices, data protection measures, and compliance with Australian regulations.",
    keywords: ["AdvanseIT security", "data protection Australia", "IT compliance Brisbane"],
  },
  "not-found": {
    title: "Page Not Found (404) | AdvanseIT",
    description: "The page you're looking for doesn't exist. Return to AdvanseIT's homepage.",
    keywords: [],
  },
};

export default function SEO({
  page = "home",
  title: titleOverride,
  description: descOverride,
  canonicalPath = "/",
  extraKeywords = [],
  ogImage,
  datePublished,
  dateModified,
  noindex = false,
  author,
}: SEOProps) {
  const meta = PAGE_META[page] ?? PAGE_META["home"];

  // Title: use override as-is, or use the page's pre-formatted title
  const fullTitle = titleOverride ?? meta.title;

  const description = descOverride ?? meta.description;
  const keywords = [...meta.keywords, ...extraKeywords].join(", ");
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const resolvedOgImage = ogImage ?? DEFAULT_OG_IMAGE;

  const isArticle = page === "blog-post";
  const robotsContent = noindex
    ? "noindex, nofollow"
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* ── hreflang — Australian English (en-AU primary, en fallback) ── */}
      <link rel="alternate" hrefLang="en-AU" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />

      {/* ── Open Graph ── */}
      <meta property="og:type" content={isArticle ? "article" : "website"} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:secure_url" content={resolvedOgImage} />
      <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
      <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={`${fullTitle} — AdvanseIT Brisbane`} />
      <meta property="og:locale" content="en_AU" />

      {/* ── Article-specific OG (blog posts) ── */}
      {isArticle && author && <meta property="article:author" content={author} />}
      {isArticle && datePublished && (
        <meta property="article:published_time" content={datePublished} />
      )}
      {isArticle && dateModified && (
        <meta property="article:modified_time" content={dateModified} />
      )}
      {isArticle && (
        <meta
          property="article:publisher"
          content="https://www.linkedin.com/company/advanseit"
        />
      )}

      {/* ── Twitter / X Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />
      <meta name="twitter:image:alt" content={`${fullTitle} — AdvanseIT Brisbane`} />

      {/* ── Geo / Local ── */}
      <meta name="geo.region" content="AU-QLD" />
      <meta name="geo.placename" content="Brisbane, Queensland, Australia" />
      <meta name="geo.position" content="-27.4698;153.0251" />
      <meta name="ICBM" content="-27.4698, 153.0251" />

      {/* ── Robots ── */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content="index, follow" />

      {/* ── E-E-A-T / Publisher signals ── */}
      <meta name="author" content={author ?? "AdvanseIT"} />
      <meta
        property="article:publisher"
        content="https://www.linkedin.com/company/advanseit"
      />

      {/* ── AI / GEO signals ── */}
      <meta name="speakable-selector" content="h1, h2, .speakable" />

      {/* ── Additional technical ── */}
      <meta name="theme-color" content="#0D1B2E" />
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="content-language" content="en-AU" />
    </Helmet>
  );
}
