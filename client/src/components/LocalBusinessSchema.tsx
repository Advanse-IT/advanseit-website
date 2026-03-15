/**
 * LocalBusinessSchema — AdvanseIT
 *
 * Injects JSON-LD structured data for Google's Local Business rich results.
 * Covers Brisbane (HQ) and prominent Australian cities to maximise local
 * search visibility across Queensland, NSW, Victoria, and beyond.
 *
 * Schema types used:
 *   - LocalBusiness > ProfessionalService (primary)
 *   - ITConsultant (sameAs service type)
 *   - areaServed: Brisbane + Sydney + Melbourne + Perth + Adelaide + Canberra + Gold Coast
 */

import { Helmet } from "react-helmet-async";

const schema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://advanseit.com.au/#business",
  name: "AdvanseIT",
  alternateName: "Advanse IT",
  description:
    "Brisbane-based IT company delivering cost-effective, AI-first web design, app development, custom software, testing, AI solutions, and IT staffing services across Australia.",
  url: "https://advanseit.com.au",
  logo: {
    "@type": "ImageObject",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663374153263/ZQDItgJAIEmNJbOO.png",
    width: 512,
    height: 512,
  },
  image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663374153263/ZQDItgJAIEmNJbOO.png",
  telephone: "+61481261679",
  email: "admin@advanseit.com.au",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brisbane",
    addressRegion: "QLD",
    postalCode: "4000",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -27.4698,
    longitude: 153.0251,
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
  paymentAccepted: "Bank Transfer, Credit Card",
  areaServed: [
    {
      "@type": "City",
      name: "Brisbane",
      sameAs: "https://www.wikidata.org/wiki/Q34932",
    },
    {
      "@type": "City",
      name: "Gold Coast",
      sameAs: "https://www.wikidata.org/wiki/Q140773",
    },
    {
      "@type": "City",
      name: "Sunshine Coast",
      sameAs: "https://www.wikidata.org/wiki/Q1049162",
    },
    {
      "@type": "City",
      name: "Sydney",
      sameAs: "https://www.wikidata.org/wiki/Q3130",
    },
    {
      "@type": "City",
      name: "Melbourne",
      sameAs: "https://www.wikidata.org/wiki/Q3141",
    },
    {
      "@type": "City",
      name: "Perth",
      sameAs: "https://www.wikidata.org/wiki/Q3183",
    },
    {
      "@type": "City",
      name: "Adelaide",
      sameAs: "https://www.wikidata.org/wiki/Q5112",
    },
    {
      "@type": "City",
      name: "Canberra",
      sameAs: "https://www.wikidata.org/wiki/Q3114",
    },
    {
      "@type": "Country",
      name: "Australia",
      sameAs: "https://www.wikidata.org/wiki/Q408",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "IT Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Design & Development",
          description:
            "Responsive, SEO-optimised website design and development for Australian businesses.",
          areaServed: "Australia",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "App Development",
          description:
            "Custom iOS and Android mobile app development and cross-platform solutions.",
          areaServed: "Australia",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Software Development",
          description:
            "Bespoke enterprise software solutions tailored to your business needs.",
          areaServed: "Australia",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Software Testing & QA",
          description:
            "Manual, automated, and performance testing services for web and mobile applications.",
          areaServed: "Australia",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Solutions",
          description:
            "AI integrations, automation, and machine learning solutions to optimise your business.",
          areaServed: "Australia",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "IT Staffing & Outsourcing",
          description:
            "Flexible IT staffing, dedicated development teams, and outsourcing solutions.",
          areaServed: "Australia",
        },
      },
    ],
  },
  sameAs: [
    "https://www.linkedin.com/company/advanceit-au",
    "https://twitter.com/AdvanseIT_AU",
  ],
  knowsAbout: [
    "Web Design",
    "App Development",
    "Custom Software Development",
    "Software Testing",
    "Artificial Intelligence",
    "IT Staffing",
    "IT Outsourcing",
    "Digital Transformation",
    "Cloud Computing",
    "React",
    "Node.js",
    "TypeScript",
  ],
};

export default function LocalBusinessSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema, null, 2)}
      </script>
    </Helmet>
  );
}
