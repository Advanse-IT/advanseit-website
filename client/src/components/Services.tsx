/* ============================================================
   AdvanseIT Services Section — "Fluid Intelligence"
   Light white background with animated service cards
   6 services with icons, descriptions, hover effects
   ============================================================ */

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Code2,
  FlaskConical,
  Brain,
  Users,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Design & Development",
    description:
      "Stunning, high-performance websites crafted with modern frameworks. From landing pages to complex web applications — pixel-perfect and conversion-optimised.",
    features: ["React / Next.js", "UI/UX Design", "SEO Optimised", "Mobile-First"],
  },
  {
    icon: Smartphone,
    title: "App Development",
    description:
      "Native and cross-platform mobile apps for iOS and Android. Seamless user experiences backed by robust, scalable architecture.",
    features: ["React Native", "Flutter", "iOS & Android", "App Store Ready"],
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "Bespoke software solutions engineered to your exact business requirements. We build systems that grow with you — not against you.",
    features: ["Enterprise Systems", "API Integration", "Cloud-Native", "Scalable"],
  },
  {
    icon: FlaskConical,
    title: "Testing & QA Services",
    description:
      "Comprehensive quality assurance to ensure your software is bulletproof. Manual testing, automated pipelines, and performance benchmarking.",
    features: ["Automated Testing", "Performance QA", "Security Testing", "CI/CD"],
  },
  {
    icon: Brain,
    title: "AI Projects & Solutions",
    description:
      "Harness the power of artificial intelligence to automate workflows, gain insights, and build intelligent products. AI-first thinking in every engagement.",
    features: ["LLM Integration", "ML Pipelines", "AI Automation", "Data Analytics"],
    featured: true,
  },
  {
    icon: Users,
    title: "IT Staffing & Outsourcing",
    description:
      "Access top-tier tech talent without the overhead. Flexible staffing models — from dedicated teams to individual specialists — at competitive rates.",
    features: ["Dedicated Teams", "Staff Augmentation", "Managed Services", "Cost-Effective"],
  },
];

export default function Services() {
  const handleLearnMore = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="section-py pb-24 bg-white relative">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0D1B2E 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00C8D4]/10 border border-[#00C8D4]/20 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#00C8D4]" />
            <span className="text-sm font-body font-600 text-[#0099A8] tracking-wide">
              What We Do
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-800 text-4xl sm:text-5xl text-[#0D1B2E] mb-4"
          >
            End-to-End IT Services
            <br />
            <span className="text-gradient-cyan">Powered by AI</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg text-[#4A6580] max-w-2xl mx-auto"
          >
            From concept to deployment, we deliver cost-effective technology solutions 
            that give Australian businesses a competitive edge.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className={`service-card relative rounded-2xl p-7 border cursor-default ${
                  service.featured
                    ? "bg-[#0D1B2E] border-[#00C8D4]/40 shadow-xl"
                    : "bg-white border-gray-100 shadow-sm hover:border-[#00C8D4]/30"
                }`}
              >
                {service.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#00C8D4]/20 border border-[#00C8D4]/40">
                    <span className="text-xs font-body font-600 text-[#00C8D4]">AI-First</span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                    service.featured ? "bg-[#00C8D4]/15" : "bg-[#00C8D4]/10"
                  }`}
                >
                  <Icon
                    size={26}
                    className={service.featured ? "text-[#00C8D4]" : "text-[#0099A8]"}
                  />
                </div>

                {/* Title */}
                <h3
                  className={`font-display font-700 text-xl mb-3 ${
                    service.featured ? "text-white" : "text-[#0D1B2E]"
                  }`}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className={`font-body text-sm leading-relaxed mb-5 ${
                    service.featured ? "text-white/65" : "text-[#4A6580]"
                  }`}
                >
                  {service.description}
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {service.features.map((f) => (
                    <span
                      key={f}
                      className={`text-xs px-2.5 py-1 rounded-full font-body font-500 ${
                        service.featured
                          ? "bg-white/10 text-white/70"
                          : "bg-[#F0F7FF] text-[#0099A8]"
                      }`}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Learn More */}
                <button
                  onClick={handleLearnMore}
                  className={`flex items-center gap-1.5 text-sm font-body font-600 transition-all group ${
                    service.featured
                      ? "text-[#00C8D4] hover:text-white"
                      : "text-[#0099A8] hover:text-[#0D1B2E]"
                  }`}
                >
                  Learn More
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
