/* ============================================================
   AdvanseIT Hero Section — "Fluid Intelligence"
   Full-viewport dark navy with aurora background image
   Animated headline, stats counter, dual CTA buttons
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const HERO_BG =
  "https://private-us-east-1.manuscdn.com/sessionFile/37fQNGQqqG3bNP4NtPOLV7/sandbox/zJvQS07fxaI6Q7ymj4vzLy-img-1_1771758218000_na1fn_aGVyby1iZw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMzdmUU5HUXFxRzNiTlA0TnRQT0xWNy9zYW5kYm94L3pKdlFTMDdmeGFJNlE3eW1qNHZ6THktaW1nLTFfMTc3MTc1ODIxODAwMF9uYTFmbl9hR1Z5YnkxaVp3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=CBbVynUbhCZivmLUmeDaJC1x0wLoXXNVcTIDqx2QpDf0FnD8qzIwCUlJ-ZOh7yDI6ss2-Tad~9JPOzR2dNbMmNUZ8DEJRCfvM9zt20OPlUaVG5031Iz1PTEyNamRPKbg6hszfN6ewjoLdTRPAw3H-sd-orpvzZ-cj~vGDHpZyB3GVSRT6i6Bu8pzE1O8yvPAtQAoQ6Ph9PsdWXpjfpw7rMxooLMZq--Rn5zPNgNRqwt6VBPiuhxGYlZ~XvOduS5Pwz4ooD76dQlcJTVuvnufk3Bn0KsXPENMp6El9wcQkcLXAjhE1Bff7qAmrYUWrc17Kdkps~N9BJ9sJ4JYjlcM8w__";

const stats = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 40, suffix: "%", label: "Cost Reduction with AI" },
  { value: 10, suffix: "+", label: "Years Experience" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
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
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
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
      <div className="relative z-10 container pt-24 pb-16">
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

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-display font-800 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] mb-6"
          >
            Advance Your
            <br />
            Business with{" "}
            <span className="text-gradient-cyan">Smart IT</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-body text-lg sm:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed"
          >
            Cost-effective web design, app development, AI projects, and IT staffing solutions 
            tailored for Australian businesses. We put AI at the heart of everything we build 
            — so you get more, for less.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <button
              onClick={handleContact}
              className="btn-primary flex items-center gap-2 px-7 py-4 rounded-xl text-base"
            >
              Get a Free Quote
              <ArrowRight size={18} />
            </button>
            <button
              onClick={handleServices}
              className="btn-outline-white flex items-center gap-2 px-7 py-4 rounded-xl text-base"
            >
              Explore Services
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="font-display font-800 text-3xl sm:text-4xl text-[#00C8D4] leading-none mb-1">
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
  );
}
