/* ============================================================
   AdvanseIT Hero Section — "Fluid Intelligence"
   Full-viewport dark navy with aurora background image
   Animated headline, stats counter, dual CTA buttons
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";

const HERO_BG = "/images/hero-bg.jpg";

const stats = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 40, suffix: "%", label: "Cost Reduction with AI" },
  { value: 10, suffix: "+", label: "Years Experience" },
];

/**
 * CountUp — animates from 0 to target on mount.
 * Falls back to showing the target value immediately so it never renders as "0".
 */
function CountUp({ target, suffix }: { target: number; suffix: string }) {
  // Initialise to target as a safe fallback — never show 0 on first paint
  const [count, setCount] = useState(target);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // Reset to 0 then animate up after a short delay so the page has painted
    setCount(0);
    const delay = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }, 500);

    return () => clearTimeout(delay);
  }, [target]);

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const handleScrollDown = () => {
    const el = document.querySelector("#services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleServices = () => {
    const el = document.querySelector("#services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SpeakableSpecification",
        cssSelector: [".speakable"],
      }, null, 2)}</script>
    </Helmet>
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#0D1B2E" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          opacity: 0.45,
        }}
      />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2E]/60 via-[#0D1B2E]/20 to-[#0D1B2E]/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2E]/80 via-transparent to-[#0D1B2E]/40" />

      {/* Floating geometric accents */}
      <div className="absolute top-1/4 right-10 w-64 h-64 rounded-full bg-cyan-400/5 blur-3xl animate-float" style={{ animationDelay: "0s" }} />
      <div className="absolute bottom-1/3 left-10 w-48 h-48 rounded-full bg-cyan-400/8 blur-2xl animate-float" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 container pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#00C8D4] animate-pulse" />
            <span className="text-sm font-body font-600 text-[#00C8D4] tracking-wide">
              Brisbane, Australia · AI-First IT Solutions
            </span>
          </motion.div>

          {/* H1 — keyword-optimised for SEO */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-display font-800 text-3xl sm:text-5xl lg:text-7xl xl:text-8xl text-white leading-[1.1] mb-6"
          >
            AI-First Web &amp; App{" "}
            <br />
            Development{" "}
            <span className="text-gradient-cyan">Brisbane</span>
          </motion.h1>

          {/* Subheading — marked speakable for voice search & AI audio responses */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="speakable font-body text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mb-8 leading-relaxed"
          >
            AdvanseIT is a Brisbane-based Australian IT company (ABN 12 656 409 850) specialising
            in AI-first web design, app development, custom software, AI chatbots, software testing,
            and IT staffing. We deliver cost-effective, enterprise-quality technology solutions to
            Australian businesses — putting AI at the heart of everything we build.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-3 mb-12"
          >
            <button
              onClick={handleContact}
              className="btn-primary flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base w-full sm:w-auto"
            >
              Get a Free Quote
              <ArrowRight size={18} />
            </button>
            <button
              onClick={handleServices}
              className="btn-outline-white flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base w-full sm:w-auto"
            >
              Explore Services
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display font-800 text-2xl sm:text-3xl text-[#00C8D4] leading-none mb-1">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-body text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
      >
        <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L60 66.7C120 53.3 240 26.7 360 20C480 13.3 600 26.7 720 33.3C840 40 960 40 1080 36.7C1200 33.3 1320 26.7 1380 23.3L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
        </svg>
      </div>
    </section>
    </>
  );
}
