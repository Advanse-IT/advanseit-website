/* ============================================================
   AdvanseIT Why Us Section — "Fluid Intelligence"
   Dark navy background, process steps + differentiators
   Includes tech stack logos and process flow
   ============================================================ */

import { motion } from "framer-motion";
import { DollarSign, Clock, Shield, Headphones, Rocket, Star } from "lucide-react";

const differentiators = [
  {
    icon: DollarSign,
    title: "Cost-Effective by Design",
    desc: "We engineer solutions with cost optimisation as a core requirement, not an afterthought. AI tooling reduces our build time — and your bill.",
    stat: "40%",
    statLabel: "avg. cost savings",
  },
  {
    icon: Rocket,
    title: "Faster Time to Market",
    desc: "AI-accelerated development pipelines mean your product reaches market 30–50% faster than traditional approaches.",
    stat: "2×",
    statLabel: "faster delivery",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    desc: "Every project includes comprehensive testing. We don't ship until it's right — automated and manual QA built into every sprint.",
    stat: "98%",
    statLabel: "client satisfaction",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Post-launch, we're still here. Ongoing maintenance, updates, and support packages to keep your systems running smoothly.",
    stat: "24/7",
    statLabel: "support available",
  },
  {
    icon: Clock,
    title: "Agile & Transparent",
    desc: "Regular sprint reviews, clear communication, and full visibility into project progress. No surprises, ever.",
    stat: "100%",
    statLabel: "transparency",
  },
  {
    icon: Star,
    title: "Australian-Based Team",
    desc: "Local expertise with global capability. We understand the Australian market, compliance requirements, and business culture.",
    stat: "BNE",
    statLabel: "headquartered",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    desc: "We deep-dive into your business goals, technical requirements, and budget to craft a tailored roadmap.",
  },
  {
    number: "02",
    title: "Design & Architecture",
    desc: "UI/UX prototypes and technical architecture designed with scalability and user experience at the forefront.",
  },
  {
    number: "03",
    title: "Agile Development",
    desc: "Sprint-based development with regular demos, AI-assisted coding, and continuous integration.",
  },
  {
    number: "04",
    title: "Testing & QA",
    desc: "Rigorous automated and manual testing to ensure every feature works flawlessly before launch.",
  },
  {
    number: "05",
    title: "Launch & Support",
    desc: "Smooth deployment with post-launch monitoring, optimisation, and ongoing support.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="section-py pb-24 bg-[#0D1B2E] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-[#00C8D4]/4 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-[#00C8D4]/4 blur-3xl" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00C8D4]/30 bg-[#00C8D4]/10 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#00C8D4]" />
            <span className="text-sm font-body font-600 text-[#00C8D4] tracking-wide">
              Why AdvanseIT
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-800 text-4xl sm:text-5xl text-white mb-4"
          >
            The Smarter Choice for
            <br />
            <span className="text-gradient-cyan">Australian Businesses</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg text-white/60 max-w-2xl mx-auto"
          >
            We combine technical excellence with AI efficiency to deliver outcomes that 
            exceed expectations — without exceeding budgets.
          </motion.p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="glass-card rounded-xl p-6 border border-white/8 hover:border-[#00C8D4]/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#00C8D4]/15 flex items-center justify-center group-hover:bg-[#00C8D4]/25 transition-colors">
                    <Icon size={20} className="text-[#00C8D4]" />
                  </div>
                  <div className="text-right">
                    <div className="font-display font-800 text-2xl text-[#00C8D4]">{item.stat}</div>
                    <div className="font-body text-xs text-white/40">{item.statLabel}</div>
                  </div>
                </div>
                <h3 className="font-display font-700 text-base text-white mb-2">{item.title}</h3>
                <p className="font-body text-sm text-white/55 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Process Section */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-700 text-2xl sm:text-3xl text-white text-center mb-12"
          >
            Our Proven Process
          </motion.h3>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#00C8D4]/30 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center relative"
                >
                  {/* Step number circle */}
                  <div className="w-16 h-16 rounded-full border-2 border-[#00C8D4]/40 bg-[#0D1B2E] flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="font-display font-800 text-[#00C8D4] text-lg">{step.number}</span>
                  </div>
                  <h4 className="font-display font-700 text-sm text-white mb-2">{step.title}</h4>
                  <p className="font-body text-xs text-white/50 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave to white */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L60 66.7C120 53.3 240 26.7 360 20C480 13.3 600 26.7 720 33.3C840 40 960 40 1080 36.7C1200 33.3 1320 26.7 1380 23.3L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
