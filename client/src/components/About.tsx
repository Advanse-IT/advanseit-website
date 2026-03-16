/* ============================================================
   AdvanseIT About Section — "Fluid Intelligence"
   White background, asymmetric layout with team image
   Brisbane focus, company story and values
   ============================================================ */

import { motion } from "framer-motion";
import { MapPin, Award, Lightbulb, Heart, TrendingDown, ShieldCheck } from "lucide-react";

const TEAM_IMG =
  "https://private-us-east-1.manuscdn.com/sessionFile/37fQNGQqqG3bNP4NtPOLV7/sandbox/zJvQS07fxaI6Q7ymj4vzLy-img-4_1771758215000_na1fn_dGVhbS1jb2xsYWI.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMzdmUU5HUXFxRzNiTlA0TnRQT0xWNy9zYW5kYm94L3pKdlFTMDdmeGFJNlE3eW1qNHZ6THktaW1nLTRfMTc3MTc1ODIxNTAwMF9uYTFmbl9kR1ZoYlMxamIyeHNZV0kuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=CrnemqLJztonHVL3OoQfvcx5FFFt3~XLck1ZcoRwH--ek~TrcF~rOsTl7aFhs7z74THSPhi~XD3sNGfZyZjswjNwP7M~8~zgBBJBaypk8eCDWyEjpdKsKSRRpcZc5kSkTupfI-2XuHhgxygrS0JTakHMVFrbfDZ-zNDtAWCWKRJ8HAIj3863MZrD1vID8GHJ37S4agrOZRiCyIwJ3vkvsQLWoOGK5tnVLAMEZJhGpQeH5P8ALYL9YLeqjAWsfeqA5dFqLeXDrui449MMh~kUnf4Bo8pO6neSYmEZB5CR6CK9wWc4duzxNVj-iT4HQaDuVU-aEQdLl3715Eo~UJ~d1Q__";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    desc: "We embrace emerging technologies — especially AI — to deliver solutions that are ahead of the curve.",
  },
  {
    icon: TrendingDown,
    title: "Cost Optimisation",
    desc: "Every decision is made with your budget in mind. We find smarter ways to deliver more value for less.",
  },
  {
    icon: Award,
    title: "Quality Without Compromise",
    desc: "Rigorous testing, clean code, and thoughtful design are non-negotiable on every project.",
  },
  {
    icon: Heart,
    title: "Long-Term Partnership",
    desc: "We're not just vendors — we're your technology partners invested in your long-term success.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-py pb-24 bg-white relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#00C8D4]/5 blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container relative z-10">
        {/* Two-column: text left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00C8D4]/10 border border-[#00C8D4]/20 mb-4"
            >
              <MapPin size={14} className="text-[#0099A8]" />
              <span className="text-sm font-body font-600 text-[#0099A8] tracking-wide">
                Brisbane, Queensland, Australia
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-800 text-4xl sm:text-5xl text-[#0D1B2E] mb-6 leading-tight"
            >
              Advancing Australian
              <br />
              <span className="text-gradient-cyan">Businesses Through Tech</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 font-body text-base text-[#4A6580] leading-relaxed"
            >
              <p>
                Founded in Brisbane, AdvanseIT was built on a simple belief: every Australian 
                business — regardless of size — deserves access to world-class technology solutions 
                at a price that makes sense.
              </p>
              <p>
                We've assembled a team of passionate engineers, designers, and AI specialists who 
                combine deep technical expertise with a genuine understanding of the Australian 
                business landscape. Our AI-first approach means we're always finding smarter, 
                faster, and more cost-effective ways to solve your challenges.
              </p>
              <p>
                Whether you're a startup looking to launch your first app, or an established 
                enterprise seeking to modernise your systems, we bring the same level of 
                dedication and innovation to every engagement.
              </p>
            </motion.div>

            {/* E-E-A-T trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
                <ShieldCheck size={14} className="text-[#0099A8]" />
                <span className="text-xs font-semibold text-slate-600">ABN 12 656 409 850</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
                <span className="text-xs font-semibold text-slate-600">🇦🇺 Brisbane, QLD</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
                <span className="text-xs font-semibold text-slate-600">Founded 2023</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-6 flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary px-6 py-3.5 rounded-xl text-sm w-full sm:w-auto text-center"
              >
                Work With Us
              </button>
              <button
                onClick={() => {
                  const el = document.querySelector("#why-us");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded-xl text-sm font-display font-600 text-[#0D1B2E] border-2 border-[#0D1B2E]/20 hover:border-[#00C8D4] hover:text-[#0099A8] transition-colors w-full sm:w-auto text-center"
              >
                Why Choose Us
              </button>
            </motion.div>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={TEAM_IMG}
                alt="AdvanseIT Brisbane Team"
                className="w-full h-80 lg:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-5 -left-5 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00C8D4]/15 flex items-center justify-center">
                  <MapPin size={18} className="text-[#0099A8]" />
                </div>
                <div>
                  <div className="font-display font-700 text-sm text-[#0D1B2E]">Brisbane HQ</div>
                  <div className="font-body text-xs text-[#4A6580]">Queensland, Australia</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-700 text-2xl text-[#0D1B2E] text-center mb-10"
          >
            Our Core Values
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-[#F8FAFC] border border-gray-100 hover:border-[#00C8D4]/30 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00C8D4]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-[#0099A8]" />
                  </div>
                  <h4 className="font-display font-700 text-base text-[#0D1B2E] mb-2">{v.title}</h4>
                  <p className="font-body text-sm text-[#4A6580] leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom wave to navy */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 13.3C120 26.7 240 53.3 360 60C480 66.7 600 53.3 720 46.7C840 40 960 40 1080 43.3C1200 46.7 1320 53.3 1380 56.7L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z" fill="#0D1B2E"/>
        </svg>
      </div>
    </section>
  );
}
