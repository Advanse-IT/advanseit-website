/* ============================================================
   AdvanseIT Contact Section — "Fluid Intelligence"
   Dark navy background with contact form + info
   ============================================================ */

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const services = [
  "Web Design & Development",
  "App Development",
  "Custom Software",
  "Testing & QA",
  "AI Solutions",
  "IT Staffing / Outsourcing",
  "General Enquiry",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (err) => {
      toast.error("Failed to send message. Please try again or email us directly.", {
        description: err.message,
      });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate({
      name: form.name,
      email: form.email,
      company: form.company || undefined,
      service: form.service || undefined,
      message: form.message,
    });
  };

  const loading = submitMutation.isPending;

  return (
    <section id="contact" className="section-py bg-[#0D1B2E] relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#00C8D4]/5 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-[#00C8D4]/5 blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00C8D4]/30 bg-[#00C8D4]/10 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#00C8D4] animate-pulse" />
            <span className="text-sm font-body font-600 text-[#00C8D4] tracking-wide">
              Let's Talk
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-800 text-3xl sm:text-5xl text-white mb-4"
          >
            Ready to Advance
            <br />
            <span className="text-gradient-cyan">Your Business?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg text-white/60 max-w-xl mx-auto"
          >
            Get a free consultation and project quote. We'll respond within 24 hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-display font-700 text-xl text-white mb-6">Get in Touch</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00C8D4]/15 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#00C8D4]" />
                  </div>
                  <div>
                    <div className="font-display font-600 text-sm text-white mb-0.5">Headquarters</div>
                    <div className="font-body text-sm text-white/55">Brisbane, Queensland</div>
                    <div className="font-body text-sm text-white/55">Australia</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00C8D4]/15 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-[#00C8D4]" />
                  </div>
                  <div>
                    <div className="font-display font-600 text-sm text-white mb-0.5">Email Us</div>
                    <a
                      href="mailto:admin@advanseit.com.au"
                      className="font-body text-sm text-white/55 hover:text-[#00C8D4] transition-colors"
                    >
                      admin@advanseit.com.au
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00C8D4]/15 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-[#00C8D4]" />
                  </div>
                  <div>
                    <div className="font-display font-600 text-sm text-white mb-0.5">Call Us</div>
                    <a
                      href="tel:+61481261679"
                      className="font-body text-sm text-white/55 hover:text-[#00C8D4] transition-colors"
                    >
                      +61 481 261 679
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Response time promise */}
            <div className="glass-card rounded-xl p-5 border border-[#00C8D4]/20">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 size={18} className="text-[#00C8D4]" />
                <span className="font-display font-600 text-sm text-white">Our Promise</span>
              </div>
              <ul className="space-y-2">
                {[
                  "Response within 24 hours",
                  "Free initial consultation",
                  "No obligation quote",
                  "Transparent pricing",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00C8D4]" />
                    <span className="font-body text-xs text-white/55">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-10 border border-[#00C8D4]/20 text-center h-full flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="w-16 h-16 rounded-full bg-[#00C8D4]/15 flex items-center justify-center mb-5">
                  <CheckCircle2 size={32} className="text-[#00C8D4]" />
                </div>
                <h3 className="font-display font-700 text-2xl text-white mb-3">
                  Message Sent!
                </h3>
                <p className="font-body text-white/60 max-w-sm">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-7 sm:p-9 border border-white/8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-xs font-600 text-white/60 mb-1.5 uppercase tracking-wide">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 font-body focus:outline-none focus:border-[#00C8D4]/50 focus:bg-white/8 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-600 text-white/60 mb-1.5 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 font-body focus:outline-none focus:border-[#00C8D4]/50 focus:bg-white/8 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-xs font-600 text-white/60 mb-1.5 uppercase tracking-wide">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your Company Pty Ltd"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 font-body focus:outline-none focus:border-[#00C8D4]/50 focus:bg-white/8 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-600 text-white/60 mb-1.5 uppercase tracking-wide">
                      Service Interested In
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-body focus:outline-none focus:border-[#00C8D4]/50 transition-all appearance-none"
                      style={{ colorScheme: "dark" }}
                    >
                      <option value="" className="bg-[#0D1B2E]">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s} className="bg-[#0D1B2E]">{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-body text-xs font-600 text-white/60 mb-1.5 uppercase tracking-wide">
                    Tell Us About Your Project *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your project, goals, and any specific requirements..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 font-body focus:outline-none focus:border-[#00C8D4]/50 focus:bg-white/8 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0D1B2E]/30 border-t-[#0D1B2E] rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
