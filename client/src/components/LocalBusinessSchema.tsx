/**
 * LocalBusinessSchema — AdvanseIT
 *
 * Injects JSON-LD structured data for:
 *   - LocalBusiness (ProfessionalService)
 *   - Organization
 *   - WebSite (with SearchAction for Sitelinks Searchbox)
 *
 * Placed once in App.tsx so it appears on every page.
 * Google uses this for Knowledge Panel, Local Pack, and rich results.
 */

import { Helmet } from "react-helmet-async";

const SCHEMA_DATA = {
  localBusiness: {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService", "SoftwareApplication"],
    "@id": "https://advanseit.com.au/#organization",
    name: "AdvanseIT",
    legalName: "AdvanseIT Pty Ltd",
    alternateName: ["Advanse IT", "AdvanseIT Brisbane"],
    description:
      "Brisbane IT company delivering AI-first web design, mobile app development, custom software, AI solutions, QA testing, and IT staffing to Australian businesses.",
    url: "https://advanseit.com.au",
    logo: {
      "@type": "ImageObject",
      url: "https://advanseit.com.au/images/advanseit-logo-schema.png",
      width: 400,
      height: 100,
    },
    image: [
      "https://advanseit.com.au/images/og-image-social.png",
      "https://advanseit.com.au/images/hero-bg.jpg",
      "https://advanseit.com.au/images/team-collab.jpg",
    ],
    telephone: "+61481261679",
    email: "admin@advanseit.com.au",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Brisbane",
      addressLocality: "Brisbane",
      addressRegion: "Queensland",
      postalCode: "4000",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -27.4698,
      longitude: 153.0251,
    },
    areaServed: [
      { "@type": "City", name: "Brisbane", sameAs: "https://www.wikidata.org/wiki/Q34932" },
      { "@type": "City", name: "Gold Coast", sameAs: "https://www.wikidata.org/wiki/Q140547" },
      { "@type": "City", name: "Sunshine Coast" },
      { "@type": "City", name: "Ipswich" },
      { "@type": "City", name: "Toowoomba" },
      { "@type": "City", name: "Sydney", sameAs: "https://www.wikidata.org/wiki/Q3130" },
      { "@type": "City", name: "Melbourne", sameAs: "https://www.wikidata.org/wiki/Q3141" },
      { "@type": "City", name: "Perth", sameAs: "https://www.wikidata.org/wiki/Q3456" },
      { "@type": "City", name: "Adelaide" },
      { "@type": "City", name: "Canberra" },
      { "@type": "State", name: "Queensland" },
      { "@type": "Country", name: "Australia" },
    ],
    serviceArea: {
      "@type": "Country",
      name: "Australia",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:30",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "AUD",
    paymentAccepted: "Credit Card, Bank Transfer, Invoice",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Design & Development Brisbane",
            url: "https://advanseit.com.au/services/web-design",
            description:
              "Professional, responsive, SEO-optimised website design and development for Australian businesses.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "App Development Brisbane",
            url: "https://advanseit.com.au/services/app-development",
            description:
              "Custom iOS, Android, and cross-platform mobile app development for Australian businesses.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Software Development Brisbane",
            url: "https://advanseit.com.au/services/custom-software",
            description:
              "Bespoke enterprise software, SaaS platforms, and API integrations built to your specifications.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Solutions Brisbane",
            url: "https://advanseit.com.au/services/ai-solutions",
            description:
              "AI integrations, chatbots, machine learning models, and process automation for Australian businesses.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Software Testing & QA Brisbane",
            url: "https://advanseit.com.au/services/testing",
            description:
              "Manual, automated, and performance testing services for web and mobile applications.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "IT Staffing & Outsourcing Brisbane",
            url: "https://advanseit.com.au/services/it-staffing",
            description:
              "Flexible IT staffing, dedicated development teams, and IT outsourcing across Australia.",
          },
        },
      ],
    },
    founder: {
      "@type": "Person",
      name: "Sush",
      jobTitle: "Founder & CEO",
      knowsAbout: [
        "Software Testing",
        "QA Automation",
        "Java",
        "Selenium WebDriver",
        "AI Solutions",
        "Web Development",
      ],
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 2,
      maxValue: 15,
    },
    foundingDate: "2021",
    foundingLocation: {
      "@type": "City",
      name: "Brisbane",
      containedInPlace: {
        "@type": "State",
        name: "Queensland",
        containedInPlace: {
          "@type": "Country",
          name: "Australia",
        },
      },
    },
    sameAs: [
      "https://www.linkedin.com/company/advanseit",
      "https://x.com/AdvanseIT",
    ],
    knowsAbout: [
      "Web Design",
      "Web Development",
      "Mobile App Development",
      "Custom Software Development",
      "Artificial Intelligence",
      "Machine Learning",
      "Software Testing",
      "QA Automation",
      "IT Staffing",
      "IT Outsourcing",
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "Selenium WebDriver",
    ],
    slogan: "AI-Powered IT for Australian Business",
  },

  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://advanseit.com.au/#website",
    name: "AdvanseIT",
    url: "https://advanseit.com.au",
    description:
      "Brisbane IT company delivering AI-first technology solutions to Australian businesses.",
    publisher: {
      "@id": "https://advanseit.com.au/#organization",
    },
    inLanguage: "en-AU",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://advanseit.com.au/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },

  breadcrumbHome: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://advanseit.com.au/",
      },
    ],
  },
};

export default function LocalBusinessSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(SCHEMA_DATA.localBusiness)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(SCHEMA_DATA.website)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(SCHEMA_DATA.breadcrumbHome)}
      </script>
    </Helmet>
  );
}
