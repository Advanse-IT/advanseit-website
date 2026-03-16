import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Smartphone, Zap, RefreshCw, ShieldCheck, Users, BarChart3 } from "lucide-react";

export default function AppDevelopmentPage() {
  return (
    <ServicePageTemplate
      slug="app-development"
      serviceType="Mobile App Development"
      pageTitle="App Development Brisbane — iOS & Android"
      metaDescription="Custom iOS and Android app development in Brisbane. AdvanseIT builds scalable, user-friendly mobile apps using React Native and Flutter for Australian businesses. Fixed-price quotes. ABN 12 656 409 850."
      keywords={[
        "app development Brisbane",
        "mobile app development Brisbane",
        "iOS app development Australia",
        "Android app development Brisbane",
        "React Native development Brisbane",
        "Flutter development Australia",
        "cross-platform app development Queensland",
        "startup app development Brisbane",
        "SaaS app development Australia",
      ]}
      heroHeadline={
        <>
          App Development
          <br />
          <span className="text-[#00C8D4]">iOS, Android & Web</span>
        </>
      }
      heroSubheading="AdvanseIT builds native and cross-platform mobile applications for Australian businesses and startups. From MVP to full-scale product launch — we deliver fast, reliable, and beautifully designed apps on iOS, Android, and the web."
      schemaDescription="Custom iOS and Android mobile application development for Australian businesses. AdvanseIT builds cross-platform apps using React Native and Flutter, and native apps using Swift and Kotlin, from Brisbane, Queensland."
      benefits={[
        {
          icon: <Smartphone size={20} />,
          title: "Cross-Platform Efficiency",
          description:
            "React Native and Flutter let us build one codebase that runs natively on iOS and Android — reducing cost and time to market without sacrificing quality.",
        },
        {
          icon: <Zap size={20} />,
          title: "Fast MVP Delivery",
          description:
            "We specialise in rapid MVP development for startups — getting your core product in front of users quickly so you can validate and iterate.",
        },
        {
          icon: <RefreshCw size={20} />,
          title: "Scalable Architecture",
          description:
            "Apps are built on scalable cloud backends (AWS, Firebase, Supabase) that grow with your user base without expensive rewrites.",
        },
        {
          icon: <Users size={20} />,
          title: "User-Centred Design",
          description:
            "Every app goes through UX research, wireframing, and usability testing to ensure intuitive, delightful experiences for your users.",
        },
        {
          icon: <ShieldCheck size={20} />,
          title: "App Store Ready",
          description:
            "We handle App Store and Google Play submission, compliance, and review processes — getting your app live without the headaches.",
        },
        {
          icon: <BarChart3 size={20} />,
          title: "Analytics & Crash Reporting",
          description:
            "Integrated analytics (Mixpanel, Amplitude) and crash reporting (Sentry, Firebase Crashlytics) give you full visibility from day one.",
        },
      ]}
      process={[
        {
          title: "Discovery & Scoping",
          description:
            "We define your app's core features, user personas, and technical requirements. We produce a detailed scope document and fixed-price quote.",
        },
        {
          title: "UX Design & Prototyping",
          description:
            "Wireframes and interactive prototypes in Figma. We validate the UX before development begins to avoid costly rework.",
        },
        {
          title: "Agile Development",
          description:
            "Development in 2-week sprints with regular demos. You see working software early and often, with full visibility into progress.",
        },
        {
          title: "Testing & QA",
          description:
            "Automated and manual testing on real devices. Performance profiling, security review, and accessibility testing before submission.",
        },
        {
          title: "Launch & Growth",
          description:
            "App Store / Google Play submission, post-launch monitoring, and ongoing feature development as your product grows.",
        },
      ]}
      technologies={[
        "React Native",
        "Flutter",
        "Swift",
        "Kotlin",
        "Expo",
        "TypeScript",
        "Node.js",
        "Firebase",
        "AWS Amplify",
        "Supabase",
        "Stripe",
        "Figma",
        "Sentry",
        "Mixpanel",
      ]}
      faqs={[
        {
          question: "How much does it cost to build a mobile app?",
          answer:
            "A simple MVP app typically starts from $15,000 AUD. A full-featured consumer or B2B app ranges from $30,000–$100,000+ depending on complexity. We provide a detailed fixed-price quote after a free scoping session.",
        },
        {
          question: "How long does app development take?",
          answer:
            "An MVP typically takes 8–12 weeks. A full-featured app takes 12–24 weeks. We provide a detailed timeline in our proposal.",
        },
        {
          question: "Do you build for both iOS and Android?",
          answer:
            "Yes. We primarily use React Native and Flutter for cross-platform development, which delivers native performance on both iOS and Android from a single codebase. We also build native Swift (iOS) and Kotlin (Android) apps when required.",
        },
        {
          question: "Can you build the backend as well as the app?",
          answer:
            "Yes. We build full-stack solutions including REST APIs, GraphQL APIs, databases, authentication, push notifications, and cloud infrastructure.",
        },
        {
          question: "Do you work with startups?",
          answer:
            "Yes. We have extensive experience working with Australian startups from idea to launch. We offer flexible engagement models including fixed-price MVPs and ongoing development retainers.",
        },
      ]}
    />
  );
}
