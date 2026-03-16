/* ============================================================
   AdvanseIT Testimonials Section — "Fluid Intelligence"
   White background with client quotes carousel
   ============================================================ */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO, RetailTech Pty Ltd",
    location: "Brisbane, QLD",
    quote:
      "AdvanseIT transformed our outdated inventory system into an AI-powered platform that cut our operational costs by 35%. Their team's expertise and responsiveness made the whole process seamless.",
    rating: 5,
    initials: "SM",
  },
  {
    name: "James Thornton",
    role: "CTO, FinServe Australia",
    location: "Sydney, NSW",
    quote:
      "We needed a custom app built fast and within budget. AdvanseIT delivered in 8 weeks — on time, on budget, and with quality that exceeded our expectations. The AI-first approach was a game-changer.",
    rating: 5,
    initials: "JT",
  },
  {
    name: "Priya Sharma",
    role: "Founder, HealthConnect",
    location: "Melbourne, VIC",
    quote:
      "Their IT staffing solution gave us access to senior developers at a fraction of the cost of hiring locally. The team integrated seamlessly with our existing processes. Highly recommend.",
    rating: 5,
    initials: "PS",
  },
  {
    name: "Michael O'Brien",
    role: "Operations Manager, LogiCorp",
    location: "Brisbane, QLD",
    quote:
      "The testing services AdvanseIT provided caught critical bugs before launch that would have cost us thousands. Their automated QA pipeline is now a permanent part of our development process.",
    rating: 5,
    initials: "MO",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="section-py pb-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#00C8D4]/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00C8D4]/10 border border-[#00C8D4]/20 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#00C8D4]" />
            <span className="text-sm font-body font-600 text-[#0099A8] tracking-wide">
              Client Stories
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-800 text-3xl sm:text-5xl text-[#0D1B2E]"
          >
            Trusted by Australian
            <br />
            <span className="text-gradient-cyan">Businesses</span>
          </motion.h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-[#F8FAFC] rounded-2xl p-8 sm:p-12 border border-gray-100 shadow-sm min-h-[280px]">
            <Quote size={40} className="text-[#00C8D4]/30 mb-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-[#00C8D4] fill-[#00C8D4]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-body text-lg text-[#2D4A65] leading-relaxed mb-8 italic">
                  "{testimonials[current].quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0D1B2E] flex items-center justify-center flex-shrink-0">
                    <span className="font-display font-700 text-sm text-[#00C8D4]">
                      {testimonials[current].initials}
                    </span>
                  </div>
                  <div>
                    <div className="font-display font-700 text-[#0D1B2E]">
                      {testimonials[current].name}
                    </div>
                    <div className="font-body text-sm text-[#4A6580]">
                      {testimonials[current].role} · {testimonials[current].location}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[#0D1B2E]/20 flex items-center justify-center text-[#0D1B2E] hover:border-[#00C8D4] hover:text-[#0099A8] transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-[#00C8D4]" : "w-2 bg-[#0D1B2E]/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[#0D1B2E]/20 flex items-center justify-center text-[#0D1B2E] hover:border-[#00C8D4] hover:text-[#0099A8] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
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
