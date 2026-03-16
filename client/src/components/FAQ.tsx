/* ============================================================
   FAQ Section — AdvanseIT
   AEO-optimised: structured Q&A for AI search citation
   Uses Radix Accordion for accessible expand/collapse
   ============================================================ */

import { useState } from "react";
import { ChevronDown, MessageSquare } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What does AdvanseIT specialise in?",
    answer:
      "AdvanseIT specialises in AI-first IT solutions for Australian businesses, including web design and development, mobile app development, custom software, AI projects and chatbot integrations, software testing and QA, and IT staffing and outsourcing. Headquartered in Brisbane, Queensland, we serve clients across Australia.",
  },
  {
    question: "How much does it cost to build a website or app with AdvanseIT?",
    answer:
      "We offer transparent, competitive pricing. Small business websites typically start from $2,000 AUD. Custom web applications and mobile apps are scoped individually — we provide a detailed fixed-price quote after a free consultation. There are no hidden costs or surprise invoices. Contact us at admin@advanseit.com.au for a no-obligation quote.",
  },
  {
    question: "Does AdvanseIT build AI chatbots and AI solutions?",
    answer:
      "Yes. We build custom AI chatbots and virtual assistants using large language models (LLMs) including GPT-4, Claude, and Gemini. Our AI solutions include customer service automation, internal knowledge bases, AI-powered data analysis, computer vision applications, and natural language processing integrations — making enterprise-grade AI accessible to Australian SMEs.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on scope. A standard small business website takes 2–4 weeks. A custom web application takes 6–16 weeks. A mobile app MVP typically takes 8–16 weeks. We provide a detailed project timeline during the free consultation phase, and you'll have access to a staging environment to review progress in real time.",
  },
  {
    question: "What is IT staffing and how does AdvanseIT provide it?",
    answer:
      "IT staffing (also called staff augmentation or IT outsourcing) means providing skilled technology professionals — developers, testers, designers, and project managers — to work as part of your team. AdvanseIT sources, vets, and manages these professionals, handling HR and administration so you can scale your technology team quickly and cost-effectively.",
  },
  {
    question: "What technologies does AdvanseIT use?",
    answer:
      "We work across a broad modern stack: React, Next.js, Vue.js, Node.js, Python, TypeScript, React Native, Flutter, Swift, Kotlin, AWS, Google Cloud, Azure, PostgreSQL, MySQL, MongoDB, Docker, Kubernetes, and AI/ML frameworks including TensorFlow, PyTorch, and OpenAI APIs.",
  },
  {
    question: "Does AdvanseIT offer software testing services?",
    answer:
      "Yes. We provide comprehensive QA services including manual testing, automated testing (Selenium, Cypress, Playwright), performance and load testing, security testing, regression testing, and user acceptance testing (UAT). We offer both project-based testing engagements and ongoing QA retainers.",
  },
  {
    question: "How is AdvanseIT different from other IT companies in Brisbane?",
    answer:
      "Our AI-first approach sets us apart — every solution is built with artificial intelligence at its core, delivering faster results and lower costs. We combine Brisbane-based management (ensuring Australian business understanding and clear communication) with offshore delivery efficiency, making enterprise-quality IT accessible at SME-friendly pricing.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="py-20 bg-white"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-200 text-cyan-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <MessageSquare className="w-4 h-4" />
            Common Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2E] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Everything you need to know about working with AdvanseIT. Can't find
            your answer?{" "}
            <a
              href="#contact"
              className="text-cyan-600 hover:text-cyan-700 underline underline-offset-2"
            >
              Get in touch
            </a>
            .
          </p>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="bg-white">
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-inset"
                >
                  <span className="font-semibold text-[#0D1B2E] text-base leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-slate-600 leading-relaxed text-[0.95rem]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA below FAQ */}
        <div className="mt-10 text-center">
          <p className="text-slate-500 mb-4">
            Still have questions? We're happy to help.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#0D1B2E] hover:bg-[#1a2e4a] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
