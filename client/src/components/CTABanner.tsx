/* ============================================================
   AdvanceIT CTA Banner — "Fluid Intelligence"
   Cyan gradient banner with strong call to action
   ============================================================ */

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTABanner() {
  const handleContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-20 bg-[#0D1B2E]">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0D1B2E 0%, #0F2845 40%, #0D3A4A 70%, #0D1B2E 100%)",
        }}
      />

      {/* Animated glow orbs */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-[#00C8D4]/10 blur-3xl -translate-y-1/2 animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-[#00C8D4]/8 blur-3xl -translate-y-1/2 animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,200,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,212,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00C8D4]/30 bg-[#00C8D4]/10 mb-6"
        >
          <Sparkles size={14} className="text-[#00C8D4]" />
          <span className="text-sm font-body font-600 text-[#00C8D4] tracking-wide">
            AI-Powered · Cost-Effective · Australian
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-800 text-4xl sm:text-5xl lg:text-6xl text-white mb-5 leading-tight"
        >
          Start Your Project Today.
          <br />
          <span className="text-gradient-cyan">No Obligation, Free Quote.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-lg text-white/60 max-w-xl mx-auto mb-10"
        >
          Join the growing number of Australian businesses that trust AdvanceIT 
          to deliver smarter, faster, and more cost-effective technology solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={handleContact}
            className="btn-primary flex items-center gap-2 px-8 py-4 rounded-xl text-base"
          >
            Get Your Free Quote
            <ArrowRight size={18} />
          </button>
          <a
            href="tel:+61731234567"
            className="btn-outline-white flex items-center gap-2 px-8 py-4 rounded-xl text-base"
          >
            Call Us Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
