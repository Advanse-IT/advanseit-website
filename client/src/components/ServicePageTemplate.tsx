/* ============================================================
   ServicePageTemplate — AdvanseIT
   Reusable layout for all 6 dedicated service sub-pages.
   Each page gets: hero, benefits grid, process steps,
   tech stack pills, FAQ accordion, CTA, and full SEO.
   ============================================================ */

import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, CheckCircle2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const SITE_URL = "https://advanseit.com.au";
const LOGO_URL =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663374153263/ZQDItgJAIEmNJbOO.png";
const OG_IMAGE =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663374153263/HdTBZOVgOmaFOEAz.png";

const ALL_SERVICES = [
  {
    slug: "web-design",
    title: "Web Design & Development",
    description: "Responsive websites and web apps built for performance and conversion.",
    icon: "🌐",
  },
  {
    slug: "app-development",
    title: "App Development",
    description: "Native and cross-platform iOS & Android apps for your business.",
    icon: "📱",
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    description: "Bespoke software tailored to your unique workflows and processes.",
    icon: "⚙️",
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    description: "Chatbots, ML models, and AI automation that drive real results.",
    icon: "🤖",
  },
  {
    slug: "testing",
    title: "Software Testing & QA",
    description: "Manual and automated testing to ship with confidence.",
    icon: "✅",
  },
  {
    slug: "it-staffing",
    title: "IT Staffing & Outsourcing",
    description: "Pre-vetted developers, testers, and designers on demand.",
    icon: "👥",
  },
];

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ServicePageProps {
  /** URL slug, e.g. "web-design" */
  slug: string;
  /** Schema.org @type for the service */
  serviceType: string;
  /** Page <title> suffix */
  pageTitle: string;
  /** Meta description (≤160 chars) */
  metaDescription: string;
  /** Keywords array */
  keywords: string[];
  /** Hero headline (can include <br/> via JSX) */
  heroHeadline: React.ReactNode;
  /** Hero subheading — speakable */
  heroSubheading: string;
  /** Accent colour class for badges/highlights, e.g. "bg-cyan-500" */
  accentBg?: string;
  accentText?: string;
  /** Service description for schema */
  schemaDescription: string;
  /** 4–6 benefit cards */
  benefits: { icon: React.ReactNode; title: string; description: string }[];
  /** 4–5 process steps */
  process: ProcessStep[];
  /** Tech / tool pills */
  technologies: string[];
  /** 4–6 FAQs */
  faqs: ServiceFAQ[];
}

function FAQItem({ faq }: { faq: ServiceFAQ }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 py-5 text-left hover:text-cyan-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
      >
        <span className="font-semibold text-[#0D1B2E] text-base leading-snug">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="pb-5 text-slate-600 leading-relaxed text-[0.95rem]">
          {faq.answer}
        </p>
      )}
    </div>
  );
}

export default function ServicePageTemplate({
  slug,
  serviceType,
  pageTitle,
  metaDescription,
  keywords,
  heroHeadline,
  heroSubheading,
  accentBg = "bg-cyan-500",
  accentText = "text-cyan-600",
  schemaDescription,
  benefits,
  process,
  technologies,
  faqs,
}: ServicePageProps) {
  const canonicalUrl = `${SITE_URL}/services/${slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    name: pageTitle,
    description: schemaDescription,
    serviceType,
    provider: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "AdvanseIT",
    },
    areaServed: {
      "@type": "Country",
      name: "Australia",
      sameAs: "https://www.wikidata.org/wiki/Q408",
    },
    url: canonicalUrl,
    image: OG_IMAGE,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_URL}/#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pageTitle,
        item: canonicalUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── SEO ── */}
      <Helmet>
        <title>{pageTitle} | AdvanseIT</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords.join(", ")} />
        <meta name="author" content="AdvanseIT" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link rel="canonical" href={canonicalUrl} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AdvanseIT" />
        <meta property="og:title" content={`${pageTitle} | AdvanseIT`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_AU" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AdvanseIT" />
        <meta name="twitter:title" content={`${pageTitle} | AdvanseIT`} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={OG_IMAGE} />
        {/* Geo */}
        <meta name="geo.region" content="AU-QLD" />
        <meta name="geo.placename" content="Brisbane" />
        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema, null, 2)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema, null, 2)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema, null, 2)}
        </script>
      </Helmet>

      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-[#0D1B2E] pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2E] via-[#0D1B2E] to-[#0a2540]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-cyan-400/5 blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-cyan-400/5 blur-3xl translate-y-1/3 -translate-x-1/3" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li>
                <Link href="/">
                  <span className="hover:text-white/70 transition-colors cursor-pointer">
                    Home
                  </span>
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/#services">
                  <span className="hover:text-white/70 transition-colors cursor-pointer">
                    Services
                  </span>
                </Link>
              </li>
              <li>/</li>
              <li className="text-white/70">{pageTitle}</li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center gap-2 ${accentBg} text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6`}
          >
            {serviceType}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-800 text-3xl sm:text-4xl lg:text-6xl text-white leading-tight mb-6"
          >
            {heroHeadline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="speakable text-base sm:text-lg text-white/70 max-w-2xl mb-8 leading-relaxed"
          >
            {heroSubheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link href="/#contact">
              <span className="inline-flex items-center justify-center gap-2 bg-[#00C8D4] hover:bg-[#00b5c0] text-[#0D1B2E] font-bold px-6 py-3.5 rounded-xl transition-colors cursor-pointer w-full sm:w-auto">
                Get a Free Quote <ArrowRight size={16} />
              </span>
            </Link>
            <Link href="/#services">
              <span className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-semibold px-6 py-3.5 rounded-xl transition-colors cursor-pointer w-full sm:w-auto">
                <ArrowLeft size={16} /> All Services
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#0D1B2E] mb-3">
              What We Deliver
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Every engagement is built around measurable outcomes for your
              business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-cyan-200 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center mb-4 text-cyan-600">
                  {b.icon}
                </div>
                <h3 className="font-bold text-[#0D1B2E] mb-2">{b.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {b.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#0D1B2E] mb-3">
              How We Work
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              A transparent, structured process from first conversation to
              go-live.
            </p>
          </div>
          <div className="space-y-6">
            {process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-5 items-start"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0D1B2E] text-white font-bold text-sm flex items-center justify-center">
                  {i + 1}
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-[#0D1B2E] mb-1">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technologies ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-[#0D1B2E] mb-8">
            Technologies & Tools
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-full border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0D1B2E] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500">
              Common questions about our {pageTitle.toLowerCase()} service.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 divide-y divide-slate-100">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#0D1B2E]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle2 className="text-[#00C8D4]" size={20} />
              <span className="text-[#00C8D4] font-semibold text-sm">
                Free consultation · Fixed-price quotes · No lock-in contracts
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Talk to our team today about your project. We'll provide a
              detailed proposal and fixed-price quote within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#contact">
                <span className="inline-flex items-center justify-center gap-2 bg-[#00C8D4] hover:bg-[#00b5c0] text-[#0D1B2E] font-bold px-8 py-4 rounded-xl transition-colors cursor-pointer w-full sm:w-auto">
                  Get a Free Quote <ArrowRight size={16} />
                </span>
              </Link>
              <a
                href="mailto:admin@advanseit.com.au"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors break-all text-sm sm:text-base"
              >
                admin@advanseit.com.au
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Related Services ── */}
      {(() => {
        const related = ALL_SERVICES.filter((s) => s.slug !== slug).slice(0, 3);
        return (
          <section className="py-16 bg-slate-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-[#0D1B2E] mb-2">
                  Explore Related Services
                </h2>
                <p className="text-slate-500 text-sm">
                  AdvanseIT offers a full suite of IT solutions for Australian businesses.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 bg-white rounded-2xl border border-slate-100 hover:border-cyan-200 hover:shadow-md transition-all cursor-pointer h-full"
                    >
                      <div className="text-3xl mb-3">{s.icon}</div>
                      <h3 className="font-bold text-[#0D1B2E] mb-2">{s.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {s.description}
                      </p>
                      <div className="mt-4 flex items-center gap-1 text-cyan-600 text-sm font-semibold">
                        Learn more <ArrowRight size={14} />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      <Footer />
    </div>
  );
}
