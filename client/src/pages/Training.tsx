/* ============================================================
   AdvanseIT Training Page
   Courses, pricing tiers (live + recordings), enquiry form
   ============================================================ */

import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Code2, MonitorPlay, Users, Clock, CheckCircle2, Star,
  BookOpen, Zap, Award, ChevronRight, Mail, Phone, MapPin,
  GraduationCap, Laptop, Calendar, Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Data ────────────────────────────────────────────────────────────────────

const courses = [
  {
    id: "java-selenium",
    icon: <Code2 size={28} />,
    title: "Java Selenium Test Automation",
    badge: "Most Popular",
    badgeColor: "bg-[#00C8D4] text-white",
    level: "Beginner to Advanced",
    duration: "60+ days live",
    sessions: "Daily live sessions",
    description:
      "Master end-to-end web test automation using Java and Selenium WebDriver. Build robust, maintainable frameworks from scratch — including Page Object Model, TestNG, Maven, and CI/CD integration.",
    outcomes: [
      "Write production-grade Selenium tests in Java",
      "Design Page Object Model (POM) frameworks",
      "Integrate with TestNG, JUnit 5, and Allure reporting",
      "Run tests in CI/CD pipelines (Jenkins, GitHub Actions)",
      "Handle dynamic elements, waits, and cross-browser testing",
      "Build data-driven and keyword-driven frameworks",
    ],
    topics: ["Java fundamentals", "Selenium WebDriver 4", "TestNG / JUnit 5", "Maven / Gradle", "Page Object Model", "CI/CD integration", "Allure Reports", "Cross-browser testing"],
  },
  {
    id: "ai-test-automation",
    icon: <Zap size={28} />,
    title: "AI-Powered Test Automation",
    badge: "New",
    badgeColor: "bg-purple-500 text-white",
    level: "Intermediate",
    duration: "60+ days live",
    sessions: "Daily live sessions",
    description:
      "Take your Selenium skills to the next level with AI. Learn self-healing locators, AI-generated test scripts, visual regression testing, and predictive test selection — the future of QA automation.",
    outcomes: [
      "Implement self-healing locators with Healenium",
      "Use AI tools (Applitools, Testim) with Java Selenium",
      "Generate test scripts using LLM prompting",
      "Set up visual regression testing with AI diff",
      "Apply predictive test selection to cut CI time by 70%",
      "Build AI-augmented frameworks for enterprise projects",
    ],
    topics: ["Self-healing locators", "Applitools Eyes", "Healenium", "AI script generation", "Visual regression AI", "Predictive test selection", "LLM integration", "Enterprise patterns"],
  },
  {
    id: "manual-qa",
    icon: <BookOpen size={28} />,
    title: "Manual & Functional Testing",
    badge: "Beginner Friendly",
    badgeColor: "bg-green-500 text-white",
    level: "Beginner",
    duration: "60+ days live",
    sessions: "Daily live sessions",
    description:
      "Start your QA career with a solid foundation in manual testing. Learn test planning, test case design, bug reporting, Agile/Scrum QA practices, and industry-standard tools.",
    outcomes: [
      "Write professional test plans and test cases",
      "Perform exploratory, regression, and UAT testing",
      "Report bugs effectively using Jira",
      "Understand Agile/Scrum QA workflows",
      "Use tools: Jira, Confluence, TestRail, Postman",
      "Build a QA portfolio to land your first job",
    ],
    topics: ["Test planning", "Test case design", "Bug lifecycle", "Jira & TestRail", "Agile/Scrum QA", "API testing basics", "Mobile testing", "QA portfolio"],
  },
];

const pricingPlans = [
  {
    name: "Live Classes",
    icon: <Users size={24} />,
    price: "AUD 499",
    period: "per course",
    highlight: true,
    description: "Full live training experience with instructor interaction, Q&A, and lifetime access to recordings.",
    features: [
      "Daily live sessions (60+ days)",
      "Lifetime access to all recordings",
      "Live Q&A with instructor",
      "Real-world projects & assignments",
      "Tests at regular intervals",
      "Certificate of completion",
      "Job placement support",
      "Private community access",
    ],
  },
  {
    name: "Recordings Only",
    icon: <Video size={24} />,
    price: "AUD 199",
    period: "per course",
    highlight: false,
    description: "Self-paced access to all recorded sessions. Learn on your own schedule.",
    features: [
      "Lifetime access to all recordings",
      "Real-world projects & assignments",
      "Tests at regular intervals",
      "Certificate of completion",
      "Community access",
      "Email support",
    ],
  },
];

const faqs = [
  {
    q: "Are the live sessions recorded?",
    a: "Yes. All live sessions are recorded and made available to enrolled students within 24 hours. If you miss a session, you can catch up at any time.",
  },
  {
    q: "Do I need prior programming experience?",
    a: "For the Java Selenium and AI courses, basic programming familiarity is helpful but not required — we cover Java fundamentals from the ground up. The Manual QA course requires no coding background.",
  },
  {
    q: "Are sessions online or in-person?",
    a: "All courses are delivered live online, so you can join from anywhere in Australia. In-person workshops in Brisbane are available for teams of 5 or more — contact us to arrange.",
  },
  {
    q: "What time are the live sessions?",
    a: "Sessions are scheduled to suit Australian time zones (AEST/AEDT). Exact schedules are confirmed upon enrolment. Recordings are always available if you can't attend live.",
  },
  {
    q: "Do you offer corporate/team training?",
    a: "Yes. We offer tailored team training packages for organisations of all sizes. Contact us to discuss your team's needs, preferred schedule, and budget.",
  },
  {
    q: "Is there a certificate at the end?",
    a: "Yes. All students who complete the course and pass the assessments receive a digital certificate of completion from AdvanseIT.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Training() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    plan: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const enquiry = trpc.training.enquire.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Enquiry sent! We'll be in touch within 1 business day.");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    enquiry.mutate(form);
  };

  return (
    <>
      <Helmet>
        <title>Training Courses | Java Selenium, AI Test Automation | AdvanseIT Brisbane</title>
        <meta
          name="description"
          content="Hands-on Java Selenium, AI test automation, and manual QA training in Brisbane and online across Australia. Live daily sessions, 60+ days, recordings included. AdvanseIT."
        />
        <meta name="keywords" content="Java Selenium training Brisbane, test automation course Australia, AI test automation training, QA training Brisbane, software testing course online Australia" />
        <link rel="canonical" href="https://advanseit.com.au/training" />
        <meta property="og:title" content="Training Courses | AdvanseIT Brisbane" />
        <meta property="og:description" content="Hands-on Java Selenium, AI test automation, and manual QA training. Live daily sessions, 60+ days, recordings included." />
        <meta property="og:url" content="https://advanseit.com.au/training" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-[#0D1B2E] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 70% 40%, #00C8D4 0%, transparent 60%)" }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-[#00C8D4]/10 border border-[#00C8D4]/30 rounded-full px-4 py-1.5 mb-6">
              <GraduationCap size={14} className="text-[#00C8D4]" />
              <span className="text-[#00C8D4] text-sm font-medium">Brisbane & Online Across Australia</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight mb-6">
              Industry-Ready
              <br />
              <span className="text-[#00C8D4]">QA & Automation Training</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mb-8">
              Hands-on courses in Java Selenium, AI-powered test automation, and manual QA. Live daily sessions, real-world projects, and lifetime access to recordings — designed for Australian professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#courses">
                <Button size="lg" className="bg-[#00C8D4] hover:bg-[#00b0bb] text-white font-semibold px-8 w-full sm:w-auto">
                  View Courses <ChevronRight size={16} className="ml-1" />
                </Button>
              </a>
              <a href="#enquire">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 w-full sm:w-auto">
                  Enquire Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-[#0A1628] border-y border-white/10 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: <Clock size={20} />, value: "60+ Days", label: "Live Training" },
              { icon: <Calendar size={20} />, value: "Daily", label: "Live Sessions" },
              { icon: <Laptop size={20} />, value: "Online", label: "& Brisbane In-Person" },
              { icon: <Award size={20} />, value: "Certificate", label: "On Completion" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="text-[#00C8D4]">{s.icon}</div>
                <div className="text-white font-bold text-lg">{s.value}</div>
                <div className="text-white/50 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses ── */}
      <section id="courses" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2E] mb-4">Our Courses</h2>
            <p className="text-[#0D1B2E]/60 text-lg max-w-2xl mx-auto">
              Practical, job-ready training built for the Australian tech market. Each course runs for 60+ days with daily live sessions.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-[#00C8D4]">{course.icon}</div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${course.badgeColor}`}>{course.badge}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0D1B2E] mb-2">{course.title}</h3>
                <div className="flex gap-3 mb-3 flex-wrap">
                  <span className="text-xs text-[#0D1B2E]/50 bg-gray-100 px-2 py-0.5 rounded-full">{course.level}</span>
                  <span className="text-xs text-[#0D1B2E]/50 bg-gray-100 px-2 py-0.5 rounded-full">{course.duration}</span>
                </div>
                <p className="text-[#0D1B2E]/65 text-sm mb-5 flex-1">{course.description}</p>
                <div className="mb-5">
                  <p className="text-xs font-semibold text-[#0D1B2E]/40 uppercase tracking-wider mb-2">What you'll learn</p>
                  <ul className="space-y-1.5">
                    {course.outcomes.slice(0, 4).map((o, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[#0D1B2E]/70">
                        <CheckCircle2 size={14} className="text-[#00C8D4] mt-0.5 shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {course.topics.slice(0, 5).map((t, j) => (
                    <span key={j} className="text-xs bg-[#00C8D4]/10 text-[#0193CC] px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                <a href="#enquire">
                  <Button className="w-full bg-[#0D1B2E] hover:bg-[#0193CC] text-white text-sm">
                    Enquire About This Course
                  </Button>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="bg-[#F8FAFC] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2E] mb-4">Simple, Transparent Pricing</h2>
            <p className="text-[#0D1B2E]/60 text-lg max-w-xl mx-auto">
              Choose the plan that suits your learning style. All prices are in Australian dollars (AUD) and include GST.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-8 flex flex-col ${plan.highlight
                  ? "bg-[#0D1B2E] text-white shadow-xl ring-2 ring-[#00C8D4]"
                  : "bg-white text-[#0D1B2E] border border-gray-200 shadow-sm"
                  }`}
              >
                <div className={`mb-4 ${plan.highlight ? "text-[#00C8D4]" : "text-[#0193CC]"}`}>{plan.icon}</div>
                <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-[#0D1B2E]"}`}>{plan.name}</h3>
                <div className="flex items-end gap-1 mb-3">
                  <span className={`text-3xl font-extrabold ${plan.highlight ? "text-[#00C8D4]" : "text-[#0D1B2E]"}`}>{plan.price}</span>
                  <span className={`text-sm mb-1 ${plan.highlight ? "text-white/50" : "text-[#0D1B2E]/50"}`}>{plan.period}</span>
                </div>
                <p className={`text-sm mb-6 ${plan.highlight ? "text-white/65" : "text-[#0D1B2E]/60"}`}>{plan.description}</p>
                <ul className="space-y-2.5 flex-1 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={15} className={`mt-0.5 shrink-0 ${plan.highlight ? "text-[#00C8D4]" : "text-[#00C8D4]"}`} />
                      <span className={plan.highlight ? "text-white/80" : "text-[#0D1B2E]/70"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#enquire">
                  <Button
                    className={`w-full font-semibold ${plan.highlight
                      ? "bg-[#00C8D4] hover:bg-[#00b0bb] text-white"
                      : "bg-[#0D1B2E] hover:bg-[#0193CC] text-white"
                      }`}
                  >
                    Enrol Now
                  </Button>
                </a>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[#0D1B2E]/50 text-sm mt-6">
            Team training packages available for 5+ participants. <a href="#enquire" className="text-[#0193CC] underline">Contact us</a> for a custom quote.
          </p>
        </div>
      </section>

      {/* ── Why AdvanseIT Training ── */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0D1B2E] mb-4">Why Train with AdvanseIT?</h2>
              <p className="text-[#0D1B2E]/65 mb-6">
                Our instructors are active industry practitioners — not just teachers. Every course is built around real-world projects, not textbook exercises. We train you the way we work.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: <Star size={18} />, title: "Industry Practitioners", desc: "Learn from QA engineers and developers who work on live Australian projects every day." },
                  { icon: <MonitorPlay size={18} />, title: "Live + Recorded", desc: "Attend live for interaction, or watch recordings at your own pace. Both are included in the Live plan." },
                  { icon: <Users size={18} />, title: "Small Cohorts", desc: "We keep cohorts small so every student gets attention, feedback, and support." },
                  { icon: <Award size={18} />, title: "Job-Ready Focus", desc: "Portfolio projects, mock interviews, and resume guidance to help you land your next role." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="text-[#00C8D4] mt-0.5 shrink-0">{item.icon}</div>
                    <div>
                      <p className="font-semibold text-[#0D1B2E] text-sm">{item.title}</p>
                      <p className="text-[#0D1B2E]/60 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0D1B2E] rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4 text-[#00C8D4]">Course Schedule</h3>
              <div className="space-y-4">
                {courses.map((c, i) => (
                  <div key={i} className="flex items-start gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <div className="text-[#00C8D4] mt-0.5 shrink-0">{c.icon}</div>
                    <div>
                      <p className="font-semibold text-sm">{c.title}</p>
                      <p className="text-white/50 text-xs">{c.duration} · {c.sessions}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-white/60 text-xs">Next intake dates confirmed upon enquiry. Online across Australia — Brisbane in-person available for teams.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-[#0D1B2E] text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 font-semibold text-[#0D1B2E] text-sm hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <ChevronRight size={16} className={`shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-[#0D1B2E]/65 text-sm leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enquiry Form ── */}
      <section id="enquire" className="bg-[#0D1B2E] py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Enquire About Training</h2>
            <p className="text-white/60">
              Fill in the form below and we'll get back to you within 1 business day with course dates, pricing, and enrolment details.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#00C8D4]/10 border border-[#00C8D4]/30 rounded-2xl p-10 text-center"
            >
              <CheckCircle2 size={48} className="text-[#00C8D4] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Enquiry Received!</h3>
              <p className="text-white/65 text-sm">
                Thanks for reaching out. We'll be in touch within 1 business day with everything you need to get started.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label className="text-white/70 text-sm mb-1.5 block">Full Name *</Label>
                  <Input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Jane Smith"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-[#00C8D4]"
                    required
                  />
                </div>
                <div>
                  <Label className="text-white/70 text-sm mb-1.5 block">Email Address *</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="jane@company.com.au"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-[#00C8D4]"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label className="text-white/70 text-sm mb-1.5 block">Phone (optional)</Label>
                  <Input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="+61 4XX XXX XXX"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-[#00C8D4]"
                  />
                </div>
                <div>
                  <Label className="text-white/70 text-sm mb-1.5 block">Course of Interest</Label>
                  <select
                    value={form.course}
                    onChange={e => setForm(f => ({ ...f, course: e.target.value }))}
                    className="w-full h-10 rounded-md border border-white/20 bg-white/10 text-white text-sm px-3 focus:outline-none focus:border-[#00C8D4]"
                  >
                    <option value="" className="text-black">Select a course</option>
                    <option value="Java Selenium Test Automation" className="text-black">Java Selenium Test Automation</option>
                    <option value="AI-Powered Test Automation" className="text-black">AI-Powered Test Automation</option>
                    <option value="Manual & Functional Testing" className="text-black">Manual & Functional Testing</option>
                    <option value="Team Training (Custom)" className="text-black">Team Training (Custom)</option>
                  </select>
                </div>
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1.5 block">Preferred Plan</Label>
                <div className="flex gap-4">
                  {["Live Classes", "Recordings Only", "Not sure yet"].map(p => (
                    <label key={p} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="plan"
                        value={p}
                        checked={form.plan === p}
                        onChange={e => setForm(f => ({ ...f, plan: e.target.value }))}
                        className="accent-[#00C8D4]"
                      />
                      <span className="text-white/70 text-sm">{p}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1.5 block">Message (optional)</Label>
                <Textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us about your background, goals, or any questions you have..."
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-[#00C8D4] resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={enquiry.isPending}
                className="w-full bg-[#00C8D4] hover:bg-[#00b0bb] text-white font-semibold py-3 text-base"
              >
                {enquiry.isPending ? "Sending..." : "Send Enquiry"}
              </Button>
            </form>
          )}

          {/* Contact details */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { icon: <Mail size={16} />, label: "Email", value: "admin@advanseit.com.au", href: "mailto:admin@advanseit.com.au" },
              { icon: <Phone size={16} />, label: "Phone", value: "0481 261 679", href: "tel:+61481261679" },
              { icon: <MapPin size={16} />, label: "Location", value: "Brisbane, QLD", href: null },
            ].map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="text-[#00C8D4]">{c.icon}</div>
                <p className="text-white/40 text-xs">{c.label}</p>
                {c.href ? (
                  <a href={c.href} className="text-white/80 text-sm hover:text-[#00C8D4] transition-colors">{c.value}</a>
                ) : (
                  <p className="text-white/80 text-sm">{c.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
