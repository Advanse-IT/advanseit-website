/* ============================================================
   AdvanceIT Tech Stack Section — "Fluid Intelligence"
   White background, scrolling logo marquee
   ============================================================ */

import { motion } from "framer-motion";

const technologies = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "React Native", color: "#61DAFB" },
  { name: "Flutter", color: "#54C5F8" },
  { name: "Node.js", color: "#8CC84B" },
  { name: "Python", color: "#FFD43B" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "AWS", color: "#FF9900" },
  { name: "Azure", color: "#0078D4" },
  { name: "OpenAI", color: "#00A67E" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Docker", color: "#2496ED" },
  { name: "Kubernetes", color: "#326CE5" },
  { name: "TensorFlow", color: "#FF6F00" },
  { name: "GraphQL", color: "#E10098" },
  { name: "Vue.js", color: "#4FC08D" },
];

// Duplicate for seamless loop
const doubled = [...technologies, ...technologies];

export default function TechStack() {
  return (
    <section className="py-16 bg-[#F8FAFC] relative overflow-hidden">
      <div className="container mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="font-body text-sm font-600 text-[#4A6580] uppercase tracking-widest mb-2">
            Technologies We Work With
          </p>
          <h3 className="font-display font-700 text-2xl text-[#0D1B2E]">
            Modern Stack, Proven Results
          </h3>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="flex gap-4 w-max"
        >
          {doubled.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white border border-gray-100 shadow-sm flex-shrink-0"
            >
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: tech.color }}
              />
              <span className="font-body font-500 text-sm text-[#0D1B2E] whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
