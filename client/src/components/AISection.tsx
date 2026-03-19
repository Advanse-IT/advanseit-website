/* ============================================================
   AdvanseIT AI Solutions Section — "Fluid Intelligence"
   Dark navy background with AI brain image
   Highlights AI-first approach and cost optimisation
   ============================================================ */

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, TrendingDown, Cpu, BarChart3, CheckCircle2 } from "lucide-react";

const AI_IMG =
  "https://private-us-east-1.manuscdn.com/sessionFile/37fQNGQqqG3bNP4NtPOLV7/sandbox/zJvQS07fxaI6Q7ymj4vzLy-img-2_1771758218000_na1fn_YWktc2VydmljZXM.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMzdmUU5HUXFxRzNiTlA0TnRQT0xWNy9zYW5kYm94L3pKdlFTMDdmeGFJNlE3eW1qNHZ6THktaW1nLTJfMTc3MTc1ODIxODAwMF9uYTFmbl9ZV2t0YzJWeWRtbGpaWE0uanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=IA97f5y-gAOvfsj5zHTUhInMeLiWHAUdB6M3Wg1Vtb8~Y7o1gYd8V95PyCUIi053uJzpWK7ttBX39TYTk45NAuQZFwjSApX-mU~fJTdTksW40zE5FI4jUY1nW1OQ~EmY~ACRt5yg94MGBXIuz1uZFG3AXYwqEG8mTFwu1HGKNKfeHVpnKFYOuk-I7vR0IQ1jP2a3H6PtdQvywedgMX4YLkRUcPC1oi0d00oCb~kDhcfnryJZ69ArnmhC6K376WKTfLLmfgX3NElYDrYZmrrvUiAnRW4mjDlwsbsG8sQ~hX8tODgOdcjXtp69kMzcX-wO-jBS3kKFS-bJymcrfASjTA__";

const aiCapabilities = [
  {
    icon: Cpu,
    title: "LLM & Generative AI",
    desc: "Custom AI assistants, chatbots, and content generation tools built on leading models.",
  },
  {
    icon: TrendingDown,
    title: "Cost Optimisation",
    desc: "AI-driven process automation that reduces operational costs by up to 40%.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics & Insights",
    desc: "Turn raw data into actionable intelligence with ML-powered dashboards.",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    desc: "Eliminate repetitive tasks with intelligent automation pipelines.",
  },
];

const benefits = [
  "AI integrated into every project from day one",
  "Reduce development time by 30–50% with AI tooling",
  "Smarter testing with AI-powered QA automation",
  "Predictive analytics for better business decisions",
  "Custom AI models trained on your business data",
  "Ongoing AI optimisation and model fine-tuning",
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function AISection() {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section id="ai-solutions" className="section-py pb-24 bg-[#0D1B2E] relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#00C8D4]/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#00C8D4]/5 blur-3xl" />

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
            <span className="w-2 h-2 rounded-full bg-[#00C8D4] animate-pulse" />
            <span className="text-sm font-body font-600 text-[#00C8D4] tracking-wide">
              AI-First Approach
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-800 text-3xl sm:text-5xl text-white mb-4"
          >
            Intelligence Built Into
            <br />
            <span className="text-gradient-cyan">Every Solution</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg text-white/60 max-w-2xl mx-auto"
          >
            We don't bolt AI on as an afterthought. From the first line of code to the final 
            deployment, AI thinking shapes every decision we make.
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glow-cyan">
              <img
                src={AI_IMG}
                alt="AI neural network visualisation representing AdvanseIT's AI-first software development approach in Brisbane, Australia"
                className="w-full h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/60 to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-4 glass-card rounded-xl p-4 border border-[#00C8D4]/20"
            >
              <div className="font-display font-800 text-3xl text-[#00C8D4]">40%</div>
              <div className="font-body text-xs text-white/60">Average Cost Reduction</div>
              <div className="font-body text-xs text-white/40">with AI Automation</div>
            </motion.div>
          </motion.div>

          {/* Right: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="font-display font-700 text-2xl text-white mb-6">
              Why AI-First Matters for Your Business
            </h3>
            <div className="space-y-3 mb-8">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={18} className="text-[#00C8D4] flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-white/70">{b}</span>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => {
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary px-6 py-3.5 rounded-xl text-sm"
            >
              Explore AI Solutions
            </button>
          </motion.div>
        </div>

        {/* AI Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {aiCapabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-xl p-5 border border-white/8 hover:border-[#00C8D4]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00C8D4]/15 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#00C8D4]" />
                </div>
                <h4 className="font-display font-600 text-sm text-white mb-2">{cap.title}</h4>
                <p className="font-body text-xs text-white/50 leading-relaxed">{cap.desc}</p>
              </motion.div>
            );
          })}
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
