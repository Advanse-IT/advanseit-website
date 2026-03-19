/* ============================================================
   AdvanseIT Security & Compliance Page
   Lists security frameworks, practices, and compliance standards
   ============================================================ */

import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  ShieldCheck,
  Lock,
  Eye,
  Server,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const frameworks = [
  {
    icon: ShieldCheck,
    name: "Essential Eight",
    authority: "Australian Cyber Security Centre (ACSC)",
    description:
      "We align our software development and infrastructure practices with the ACSC Essential Eight Maturity Model — Australia's baseline cybersecurity framework for protecting organisations from common cyber threats.",
    practices: [
      "Application control and whitelisting guidance",
      "Patch application and OS hardening recommendations",
      "Multi-factor authentication (MFA) by default",
      "Regular backups with tested restoration procedures",
      "Restriction of administrative privileges",
      "User application hardening",
    ],
  },
  {
    icon: Lock,
    name: "OWASP Top 10",
    authority: "Open Web Application Security Project",
    description:
      "Every web and mobile application we build is developed with the OWASP Top 10 in mind — the globally recognised standard for web application security risks.",
    practices: [
      "Protection against SQL injection and XSS attacks",
      "Secure authentication and session management",
      "Input validation and output encoding",
      "Secure API design and access control",
      "Dependency vulnerability scanning in CI/CD",
      "Security misconfiguration prevention",
    ],
  },
  {
    icon: Eye,
    name: "Privacy Act 1988 (AU)",
    authority: "Office of the Australian Information Commissioner (OAIC)",
    description:
      "We design and build software that respects Australian privacy law. Our development process incorporates Privacy by Design principles, ensuring personal data is handled lawfully and transparently.",
    practices: [
      "Privacy by Design in all software architecture",
      "Data minimisation — only collect what is necessary",
      "Transparent data handling and consent mechanisms",
      "Secure data storage and transmission (TLS/AES-256)",
      "Right to access and deletion support",
      "Breach notification procedures",
    ],
  },
  {
    icon: Server,
    name: "ISO/IEC 27001 Alignment",
    authority: "International Organisation for Standardisation",
    description:
      "While AdvanseIT is a growing company and not yet ISO 27001 certified, we align our information security management practices with the ISO 27001 framework — the international standard for information security.",
    practices: [
      "Risk-based approach to information security",
      "Access control and identity management",
      "Incident response and management procedures",
      "Secure development lifecycle (SDLC)",
      "Vendor and third-party security assessments",
      "Regular security reviews and audits",
    ],
  },
  {
    icon: FileCheck,
    name: "SOC 2 Type II Readiness",
    authority: "AICPA Trust Services Criteria",
    description:
      "For enterprise clients requiring SOC 2 compliance evidence, we can provide documentation and support to demonstrate our security, availability, and confidentiality controls align with SOC 2 Trust Services Criteria.",
    practices: [
      "Security: protection against unauthorised access",
      "Availability: system uptime and performance monitoring",
      "Confidentiality: data classification and protection",
      "Processing integrity: complete and accurate processing",
      "Audit logging and monitoring",
      "Change management controls",
    ],
  },
];

const securityPractices = [
  {
    icon: Lock,
    title: "Secure Code Reviews",
    desc: "Every codebase undergoes peer review with security as a first-class concern — not an afterthought.",
  },
  {
    icon: AlertTriangle,
    title: "Vulnerability Scanning",
    desc: "Automated dependency scanning and SAST tools are integrated into our CI/CD pipelines.",
  },
  {
    icon: ShieldCheck,
    title: "Penetration Testing",
    desc: "For enterprise projects, we coordinate third-party penetration testing before production deployment.",
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    desc: "Cloud infrastructure is configured with least-privilege access, encrypted at rest and in transit.",
  },
];

export default function SecurityCompliance() {
  return (
    <>
      <Helmet>
        <title>Security & Compliance | AdvanseIT — Brisbane IT Company</title>
        <meta
          name="description"
          content="AdvanseIT's security and compliance practices — Essential Eight, OWASP Top 10, Australian Privacy Act, ISO 27001 alignment, and SOC 2 readiness for Brisbane and Australian businesses."
        />
        <meta
          name="keywords"
          content="IT security Brisbane, cybersecurity compliance Australia, Essential Eight Brisbane, OWASP compliance, ISO 27001 Australia, SOC 2 readiness, secure software development Brisbane"
        />
        <link rel="canonical" href="https://advanseit.com.au/security" />
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section className="bg-[#0D1B2E] pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00C8D4]/5 via-transparent to-transparent" />
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00C8D4]/30 bg-[#00C8D4]/10 mb-6"
          >
            <ShieldCheck size={14} className="text-[#00C8D4]" />
            <span className="text-sm font-body font-600 text-[#00C8D4] tracking-wide">
              Security & Compliance
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-800 text-4xl sm:text-5xl text-white mb-6 leading-tight"
          >
            Built Secure.{" "}
            <span className="text-gradient-cyan">Built to Comply.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-body text-lg text-white/65 leading-relaxed"
          >
            Security is not a feature we add at the end — it is a discipline we apply from the
            first line of code. Our practices align with Australian and international security
            frameworks to protect your business and your customers.
          </motion.p>
        </div>
      </section>

      {/* Security Practices Row */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityPractices.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-6 rounded-2xl border border-gray-100 bg-[#F8FAFC] hover:border-[#00C8D4]/30 hover:shadow-md transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#00C8D4]/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[#0099A8]" />
                  </div>
                  <h3 className="font-display font-700 text-base text-[#0D1B2E] mb-2">{p.title}</h3>
                  <p className="font-body text-sm text-[#4A6580] leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section className="bg-[#F8FAFC] py-20">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="font-display font-800 text-3xl sm:text-4xl text-[#0D1B2E] mb-4">
              Frameworks &amp; Standards We Align With
            </h2>
            <p className="font-body text-base text-[#4A6580] max-w-2xl mx-auto">
              We do not claim certifications we do not hold. What we do claim is that our practices
              are deliberately aligned with the following frameworks — and we can demonstrate this
              alignment to enterprise clients on request.
            </p>
          </div>

          <div className="space-y-8">
            {frameworks.map((fw, i) => {
              const Icon = fw.icon;
              return (
                <motion.div
                  key={fw.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="bg-white rounded-2xl border border-gray-100 p-8 hover:border-[#00C8D4]/30 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-[#00C8D4]/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={26} className="text-[#0099A8]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                        <h3 className="font-display font-800 text-xl text-[#0D1B2E]">{fw.name}</h3>
                        <span className="text-xs font-body text-[#0099A8] bg-[#00C8D4]/10 border border-[#00C8D4]/20 px-2.5 py-1 rounded-full w-fit">
                          {fw.authority}
                        </span>
                      </div>
                      <p className="font-body text-sm text-[#4A6580] leading-relaxed mb-5">
                        {fw.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {fw.practices.map((practice) => (
                          <div key={practice} className="flex items-start gap-2">
                            <CheckCircle2 size={15} className="text-[#00C8D4] flex-shrink-0 mt-0.5" />
                            <span className="font-body text-sm text-[#4A6580]">{practice}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0D1B2E] py-20">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-white mb-4">
            Need Security Documentation for Your Enterprise Procurement?
          </h2>
          <p className="font-body text-base text-white/60 mb-8 leading-relaxed">
            We can provide security questionnaire responses, compliance evidence packages, and
            architecture documentation tailored to your organisation's requirements.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 btn-primary px-7 py-3.5 rounded-xl text-sm"
          >
            Request Security Documentation
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
