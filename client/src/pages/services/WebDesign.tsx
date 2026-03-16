import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Globe, Zap, Search, Smartphone, ShieldCheck, BarChart3 } from "lucide-react";

export default function WebDesignPage() {
  return (
    <ServicePageTemplate
      slug="web-design"
      serviceType="Web Design & Development"
      pageTitle="Web Design & Development Brisbane"
      metaDescription="Professional web design and development in Brisbane. Responsive, fast, SEO-optimised websites and web applications built for Australian businesses. Fixed-price quotes. ABN 12 656 409 850."
      keywords={[
        "web design Brisbane",
        "website development Brisbane",
        "web development Queensland",
        "responsive web design Australia",
        "SEO website Brisbane",
        "professional website design Brisbane",
        "React web development Brisbane",
        "Next.js development Australia",
        "e-commerce website Brisbane",
        "landing page design Brisbane",
      ]}
      heroHeadline={
        <>
          Web Design &amp; Development
          <br />
          <span className="text-[#00C8D4]">Built for Brisbane</span>
        </>
      }
      heroSubheading="AdvanseIT designs and builds professional, responsive websites and web applications for Australian businesses. From small business websites to complex React/Next.js web apps — we deliver fast, SEO-optimised, and conversion-focused digital experiences."
      schemaDescription="Professional web design and development services for Australian businesses. AdvanseIT builds responsive, SEO-optimised websites and web applications using React, Next.js, and modern web technologies from Brisbane, Queensland."
      benefits={[
        {
          icon: <Globe size={20} />,
          title: "Responsive & Mobile-First",
          description:
            "Every site we build is fully responsive — looking and performing perfectly on desktop, tablet, and mobile devices.",
        },
        {
          icon: <Zap size={20} />,
          title: "Performance Optimised",
          description:
            "We target Core Web Vitals scores in the green. Fast load times improve user experience, SEO rankings, and conversion rates.",
        },
        {
          icon: <Search size={20} />,
          title: "SEO-Ready from Day One",
          description:
            "Structured data, semantic HTML, canonical tags, Open Graph, and sitemap.xml are built in — not bolted on after.",
        },
        {
          icon: <Smartphone size={20} />,
          title: "Modern Tech Stack",
          description:
            "React, Next.js, TypeScript, and Tailwind CSS for maintainable, scalable codebases that your team can grow with.",
        },
        {
          icon: <ShieldCheck size={20} />,
          title: "Secure & Accessible",
          description:
            "HTTPS by default, WCAG 2.1 AA accessibility compliance, and security best practices on every project.",
        },
        {
          icon: <BarChart3 size={20} />,
          title: "Analytics & Conversion",
          description:
            "Google Analytics 4, heatmaps, and A/B testing integrations to continuously improve your site's performance.",
        },
      ]}
      process={[
        {
          title: "Discovery & Strategy",
          description:
            "We start with a free consultation to understand your business goals, target audience, and competitors. We then define the sitemap, user journeys, and success metrics.",
        },
        {
          title: "Design & Prototyping",
          description:
            "Our designers create wireframes and high-fidelity mockups in Figma. You review and approve the design before a single line of code is written.",
        },
        {
          title: "Development",
          description:
            "We build your site using modern frameworks (React, Next.js, or WordPress) with clean, documented code. You get access to a staging environment throughout.",
        },
        {
          title: "Testing & QA",
          description:
            "Cross-browser testing, mobile testing, performance audits (Lighthouse), accessibility checks, and SEO validation before launch.",
        },
        {
          title: "Launch & Support",
          description:
            "We manage the go-live process and provide post-launch support, hosting management, and ongoing maintenance retainers.",
        },
      ]}
      technologies={[
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "WordPress",
        "Shopify",
        "Vite",
        "Framer Motion",
        "Vercel",
        "AWS",
        "Cloudflare",
        "Figma",
        "Google Analytics 4",
        "Lighthouse",
      ]}
      faqs={[
        {
          question: "How much does a website cost with AdvanseIT?",
          answer:
            "Small business websites start from $2,000 AUD. Custom web applications are scoped individually. We always provide a detailed fixed-price quote after a free consultation — no hidden costs.",
        },
        {
          question: "How long does it take to build a website?",
          answer:
            "A standard small business website takes 2–4 weeks. A custom web application takes 6–16 weeks depending on complexity. We provide a detailed timeline in our proposal.",
        },
        {
          question: "Do you build e-commerce websites?",
          answer:
            "Yes. We build e-commerce solutions on Shopify, WooCommerce, and custom React/Next.js storefronts with payment gateway integrations (Stripe, PayPal, Afterpay).",
        },
        {
          question: "Will my website rank on Google?",
          answer:
            "We build every site with technical SEO best practices: structured data, fast load times, semantic HTML, canonical tags, and sitemap.xml. We also offer ongoing SEO services to improve rankings over time.",
        },
        {
          question: "Do you offer website maintenance after launch?",
          answer:
            "Yes. We offer monthly maintenance retainers covering security updates, content changes, performance monitoring, and ongoing development.",
        },
      ]}
    />
  );
}
