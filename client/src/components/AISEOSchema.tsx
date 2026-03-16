/**
 * AISEOSchema — AdvanseIT
 *
 * Injects additional JSON-LD structured data optimised for AI search engines
 * (ChatGPT, Perplexity, Google AI Overviews, Gemini).
 *
 * Schema types:
 *   - WebSite + SiteLinksSearchBox  → site-level entity recognition
 *   - Organization                  → E-E-A-T authority signals
 *   - FAQPage                       → AEO direct-answer citations
 *   - HowTo                         → Process step citations
 *   - ItemList (Services)           → Service entity grounding
 *   - Speakable                     → Voice search / AI audio responses
 */

import { Helmet } from "react-helmet-async";

const SITE_URL = "https://advanseit.com.au";
const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663374153263/ZQDItgJAIEmNJbOO.png";

// ── WebSite + SiteLinksSearchBox ──────────────────────────────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "AdvanseIT",
  url: SITE_URL,
  description: "AI-first IT solutions for Australian businesses — web design, app development, custom software, AI projects, testing, and IT staffing from Brisbane.",
  inLanguage: "en-AU",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
};

// ── Organization (enhanced E-E-A-T signals) ───────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "AdvanseIT",
  alternateName: ["Advanse IT", "AdvanseIT Pty Ltd"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: LOGO_URL,
    contentUrl: LOGO_URL,
    width: 512,
    height: 512,
    caption: "AdvanseIT logo",
  },
  image: LOGO_URL,
  description: "AdvanseIT is a Brisbane-based Australian IT company delivering AI-first web design, app development, custom software, testing, AI solutions, and IT staffing. ABN: 12 656 409 850.",
  foundingDate: "2023",
  foundingLocation: {
    "@type": "Place",
    name: "Brisbane, Queensland, Australia",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brisbane",
    addressRegion: "QLD",
    postalCode: "4000",
    addressCountry: "AU",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+61481261679",
      email: "admin@advanseit.com.au",
      contactType: "customer service",
      areaServed: "AU",
      availableLanguage: "English",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:30",
      },
    },
    {
      "@type": "ContactPoint",
      email: "admin@advanseit.com.au",
      contactType: "sales",
      areaServed: "AU",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/advanseit",
    "https://x.com/AdvanseIT",
  ],
  taxID: "12 656 409 850",
  legalName: "AdvanseIT",
  knowsAbout: [
    "Web Design and Development",
    "Mobile App Development",
    "Custom Software Development",
    "Artificial Intelligence Solutions",
    "Machine Learning",
    "Natural Language Processing",
    "Software Testing and Quality Assurance",
    "IT Staffing and Outsourcing",
    "React Development",
    "Node.js Development",
    "TypeScript",
    "Python",
    "Cloud Computing",
    "Digital Transformation",
    "IT Consulting",
  ],
  areaServed: [
    { "@type": "Country", name: "Australia", sameAs: "https://www.wikidata.org/wiki/Q408" },
    { "@type": "City", name: "Brisbane", sameAs: "https://www.wikidata.org/wiki/Q34932" },
    { "@type": "City", name: "Sydney", sameAs: "https://www.wikidata.org/wiki/Q3130" },
    { "@type": "City", name: "Melbourne", sameAs: "https://www.wikidata.org/wiki/Q3141" },
    { "@type": "City", name: "Perth", sameAs: "https://www.wikidata.org/wiki/Q3183" },
    { "@type": "City", name: "Adelaide", sameAs: "https://www.wikidata.org/wiki/Q5112" },
    { "@type": "City", name: "Gold Coast", sameAs: "https://www.wikidata.org/wiki/Q140773" },
  ],
};

// ── FAQPage — AEO direct-answer citations ─────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "What does AdvanseIT specialise in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AdvanseIT specialises in AI-first IT solutions for Australian businesses, including web design and development, mobile app development, custom software development, AI projects and integrations, software testing and QA, and IT staffing and outsourcing. The company is headquartered in Brisbane, Queensland, and serves clients across Australia.",
      },
    },
    {
      "@type": "Question",
      name: "Where is AdvanseIT located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AdvanseIT is headquartered in Brisbane, Queensland, Australia (ABN: 12 656 409 850). The company serves clients across Australia including Sydney, Melbourne, Perth, Adelaide, Gold Coast, and Canberra, with a hybrid onshore-offshore delivery model.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost to build a website with AdvanseIT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AdvanseIT offers competitive, transparent pricing for Australian businesses. Small business websites typically start from $2,000 AUD, while custom web applications are priced based on scope and complexity. AdvanseIT provides free consultations and fixed-price quotes. Contact admin@advanseit.com.au or call +61 481 261 679 for a no-obligation quote.",
      },
    },
    {
      "@type": "Question",
      name: "Does AdvanseIT build AI chatbots and AI solutions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AdvanseIT builds custom AI chatbots and virtual assistants using large language models (LLMs) including GPT-4, Claude, and Gemini. AI solutions include customer service automation, internal knowledge bases, AI-powered data analysis, computer vision applications, and natural language processing integrations. AdvanseIT makes enterprise-grade AI accessible to small and medium Australian businesses.",
      },
    },
    {
      "@type": "Question",
      name: "What is IT staffing and how does AdvanseIT provide it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "IT staffing (also called IT outsourcing or staff augmentation) means providing skilled technology professionals — developers, testers, designers, and project managers — to work as part of a client's team. AdvanseIT sources, vets, and manages these professionals, handling HR and administration so Australian businesses can scale their technology teams quickly and cost-effectively.",
      },
    },
    {
      "@type": "Question",
      name: "What technologies does AdvanseIT use for app and web development?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AdvanseIT works across a broad technology stack including: React, Next.js, Vue.js, Node.js, Python, TypeScript, React Native, Flutter, Swift, Kotlin, AWS, Google Cloud, Azure, PostgreSQL, MySQL, MongoDB, Docker, Kubernetes, and AI/ML frameworks including TensorFlow, PyTorch, and OpenAI APIs.",
      },
    },
    {
      "@type": "Question",
      name: "Can AdvanseIT help Australian startups with app development?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AdvanseIT works with Australian startups from MVP (minimum viable product) through to full-scale product launch. The team offers flexible engagement models including fixed-price MVP packages, time-and-materials development, and ongoing development retainers. AdvanseIT has experience building consumer apps, B2B SaaS platforms, and marketplace applications.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a website or app with AdvanseIT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Timelines depend on project scope. A standard small business website typically takes 2–4 weeks. A custom web application takes 6–16 weeks depending on complexity. A mobile app MVP typically takes 8–16 weeks. AdvanseIT provides detailed project timelines during the free consultation phase.",
      },
    },
    {
      "@type": "Question",
      name: "Does AdvanseIT offer software testing services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AdvanseIT provides comprehensive software testing and QA services including manual testing, automated testing (Selenium, Cypress, Playwright), performance and load testing, security testing, regression testing, and user acceptance testing (UAT). AdvanseIT offers both project-based testing engagements and ongoing QA retainers.",
      },
    },
    {
      "@type": "Question",
      name: "How is AdvanseIT different from other IT companies in Brisbane?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AdvanseIT differentiates through its AI-first approach — every solution is built with artificial intelligence at its core, delivering faster results and lower costs. The company combines Brisbane-based management (ensuring Australian business understanding and clear communication) with offshore delivery efficiency, making enterprise-quality IT accessible at SME-friendly pricing.",
      },
    },
  ],
};

// ── HowTo — "How we work" process ─────────────────────────────────────────────
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${SITE_URL}/#howto-process`,
  name: "How to Start a Project with AdvanseIT",
  description: "AdvanseIT's streamlined process for delivering IT projects to Australian businesses — from initial consultation to launch and ongoing support.",
  totalTime: "P2W",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Free Consultation",
      text: "Contact AdvanseIT via email (admin@advanseit.com.au) or phone (+61 481 261 679) to discuss your project requirements. The team will schedule a free 30-minute discovery call to understand your goals, timeline, and budget.",
      url: `${SITE_URL}/#contact`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Proposal & Fixed-Price Quote",
      text: "AdvanseIT prepares a detailed project proposal including scope of work, technology recommendations, timeline, and a fixed-price quote. No hidden costs or surprise invoices.",
      url: `${SITE_URL}/#contact`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Design & Development",
      text: "The AdvanseIT team begins design and development with regular progress updates. Clients receive access to a staging environment to review work in real time.",
      url: `${SITE_URL}/#services`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Testing & Quality Assurance",
      text: "Every project undergoes rigorous testing including functional testing, cross-browser/device testing, performance testing, and security review before launch.",
      url: `${SITE_URL}/#services`,
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Launch & Ongoing Support",
      text: "AdvanseIT manages the go-live process and provides post-launch support, maintenance, and ongoing development as needed.",
      url: `${SITE_URL}/#contact`,
    },
  ],
};

// ── ItemList — Services ───────────────────────────────────────────────────────
const servicesListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/#services-list`,
  name: "AdvanseIT IT Services",
  description: "Complete list of IT services offered by AdvanseIT for Australian businesses.",
  numberOfItems: 6,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/#service-web-design`,
        name: "Web Design & Development",
        description: "Professional, responsive website design and development for Australian businesses. Includes custom WordPress sites, React/Next.js web applications, e-commerce platforms, and landing pages optimised for performance and conversion.",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "Australia" },
        serviceType: "Web Design and Development",
        url: `${SITE_URL}/services/web-design`,
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/#service-app-development`,
        name: "App Development",
        description: "Native and cross-platform mobile application development for iOS and Android. Technologies include React Native, Flutter, Swift, and Kotlin. AdvanseIT builds consumer apps, enterprise mobility solutions, and SaaS platforms.",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "Australia" },
        serviceType: "Mobile App Development",
        url: `${SITE_URL}/services/app-development`,
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/#service-custom-software`,
        name: "Custom Software Development",
        description: "Bespoke software solutions tailored to unique business workflows. Includes ERP integrations, automation tools, API development, and cloud-native applications powered by AI.",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "Australia" },
        serviceType: "Custom Software Development",
        url: `${SITE_URL}/services/custom-software`,
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/#service-ai-solutions`,
        name: "AI Solutions & AI Projects",
        description: "End-to-end AI project delivery including chatbots, machine learning models, NLP integrations, computer vision, AI automation, and LLM integrations. Making enterprise AI accessible to Australian SMEs.",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "Australia" },
        serviceType: "Artificial Intelligence Solutions",
        url: `${SITE_URL}/services/ai-solutions`,
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/#service-testing`,
        name: "Software Testing & QA",
        description: "Comprehensive software quality assurance including manual testing, automated testing (Selenium, Cypress, Playwright), performance testing, security testing, and regression testing.",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "Australia" },
        serviceType: "Software Testing and Quality Assurance",
        url: `${SITE_URL}/services/testing`,
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/#service-it-staffing`,
        name: "IT Staffing & Outsourcing",
        description: "Flexible IT talent solutions: dedicated offshore development teams, staff augmentation, contract developers, and IT outsourcing. Pre-vetted software engineers, QA testers, UI/UX designers, and project managers.",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "Australia" },
        serviceType: "IT Staffing and Outsourcing",
        url: `${SITE_URL}/services/it-staffing`,
      },
    },
  ],
};

export default function AISEOSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema, null, 2)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema, null, 2)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema, null, 2)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(howToSchema, null, 2)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(servicesListSchema, null, 2)}
      </script>
    </Helmet>
  );
}
