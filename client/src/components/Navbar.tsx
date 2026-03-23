/* ============================================================
   AdvanseIT Navbar — "Fluid Intelligence" Design
   Transparent on hero, solid navy on scroll
   Services link now has a dropdown to all 6 service pages
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Globe, Smartphone, Code2, Bot, CheckCircle2, Users } from "lucide-react";
import { Link, useLocation } from "wouter";

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663374153263/IXgYLeAuYjWgUTBq.svg";

const serviceLinks = [
  { label: "Web Design & Development", href: "/services/web-design", icon: Globe },
  { label: "App Development", href: "/services/app-development", icon: Smartphone },
  { label: "Custom Software", href: "/services/custom-software", icon: Code2 },
  { label: "AI Solutions", href: "/services/ai-solutions", icon: Bot },
  { label: "Software Testing & QA", href: "/services/testing", icon: CheckCircle2 },
  { label: "IT Staffing & Outsourcing", href: "/services/it-staffing", icon: Users },
];

const navLinks = [
  { label: "Services", href: "#services", type: "dropdown" },
  { label: "AI Solutions", href: "#ai-solutions", type: "hash" },
  { label: "About", href: "#about", type: "hash" },
  { label: "Why Us", href: "#why-us", type: "hash" },
  { label: "Blog", href: "/blog", type: "page" },
  { label: "Training", href: "/training", type: "page" },
  { label: "Contact", href: "#contact", type: "hash" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [location, navigate] = useLocation();
  const isOnHomePage = location === "/";
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (href: string, type: string) => {
    setMobileOpen(false);
    setServicesOpen(false);
    if (type === "page") {
      navigate(href);
      return;
    }
    if (type === "dropdown") {
      // Scroll to #services on homepage
      if (isOnHomePage) {
        const el = document.querySelector("#services");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        navigate("/");
        setTimeout(() => {
          const el = document.querySelector("#services");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
      return;
    }
    if (isOnHomePage) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  };

  const isServiceActive = location.startsWith("/services/");

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0D1B2E]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/5"
            : "bg-[#0D1B2E]/80 backdrop-blur-sm"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (isOnHomePage) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  navigate("/");
                }
              }}
              className="flex items-center flex-shrink-0"
              aria-label="AdvanseIT Home"
            >
              <img
                src={LOGO_URL}
                alt="AdvanseIT"
                className="h-10 lg:h-14 w-auto object-contain"
                style={{ maxWidth: "220px" }}
              />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.type === "dropdown") {
                  return (
                    <div key={link.label} className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        onMouseEnter={() => setServicesOpen(true)}
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-body font-500 transition-colors duration-200 rounded-lg hover:bg-white/5 ${
                          isServiceActive ? "text-[#00C8D4]" : "text-white/80 hover:text-[#00C8D4]"
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            onMouseLeave={() => setServicesOpen(false)}
                            className="absolute top-full left-0 mt-1 w-64 bg-[#0D1B2E]/98 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                          >
                            <div className="p-2">
                              {/* View all services anchor */}
                              <button
                                onClick={() => handleNavClick("#services", "dropdown")}
                                className="w-full text-left px-3 py-2 text-xs font-semibold text-[#00C8D4] uppercase tracking-wider hover:bg-white/5 rounded-lg transition-colors mb-1"
                              >
                                All Services ↓
                              </button>
                              {serviceLinks.map((svc) => {
                                const Icon = svc.icon;
                                return (
                                  <Link key={svc.href} href={svc.href}>
                                    <span
                                      onClick={() => setServicesOpen(false)}
                                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer ${
                                        location === svc.href
                                          ? "bg-white/10 text-[#00C8D4]"
                                          : "text-white/70 hover:bg-white/5 hover:text-white"
                                      }`}
                                    >
                                      <Icon size={15} className="flex-shrink-0 text-[#00C8D4]" />
                                      {svc.label}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href, link.type)}
                    className={`px-4 py-2 text-sm font-body font-500 transition-colors duration-200 rounded-lg hover:bg-white/5 ${
                      link.type === "page" && location.startsWith(link.href)
                        ? "text-[#00C8D4]"
                        : "text-white/80 hover:text-[#00C8D4]"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => handleNavClick("#contact", "hash")}
                className="btn-primary px-5 py-2.5 rounded-lg text-sm"
              >
                Get a Free Quote
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-3 -mr-1 text-white/80 hover:text-white touch-manipulation"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0D1B2E]/98 backdrop-blur-xl border-b border-white/10 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="container py-4 flex flex-col gap-0.5">
              {navLinks.map((link, i) => {
                if (link.type === "dropdown") {
                  return (
                    <div key={link.label}>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3 font-body font-500 text-base rounded-lg hover:bg-white/5 transition-colors ${
                          isServiceActive ? "text-[#00C8D4]" : "text-white/80 hover:text-white"
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                        />
                      </motion.button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-2 flex flex-col gap-1">
                              {serviceLinks.map((svc) => {
                                const Icon = svc.icon;
                                return (
                                  <Link key={svc.href} href={svc.href}>
                                    <span
                                      onClick={() => setMobileOpen(false)}
                                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm cursor-pointer transition-colors ${
                                        location === svc.href
                                          ? "text-[#00C8D4] bg-white/5"
                                          : "text-white/60 hover:text-white hover:bg-white/5"
                                      }`}
                                    >
                                      <Icon size={14} className="text-[#00C8D4] flex-shrink-0" />
                                      {svc.label}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.href, link.type)}
                    className={`text-left px-4 py-3 font-body font-500 text-base rounded-lg hover:bg-white/5 transition-colors ${
                      link.type === "page" && location.startsWith(link.href)
                        ? "text-[#00C8D4]"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                );
              })}
              <div className="pt-3 border-t border-white/10">
                <button
                  onClick={() => handleNavClick("#contact", "hash")}
                  className="btn-primary w-full px-5 py-3 rounded-lg text-sm text-center"
                >
                  Get a Free Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
