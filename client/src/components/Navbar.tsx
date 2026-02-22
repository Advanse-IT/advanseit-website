/* ============================================================
   AdvanceIT Navbar — "Fluid Intelligence" Design
   Transparent on hero, solid navy on scroll
   Logo: dark version on dark bg, light version on light bg
   ============================================================ */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663374153263/RHzsmnslexFfsTDS.jpg";

const navLinks = [
  { label: "Services", href: "#services", hasDropdown: false },
  { label: "AI Solutions", href: "#ai-solutions", hasDropdown: false },
  { label: "About", href: "#about", hasDropdown: false },
  { label: "Why Us", href: "#why-us", hasDropdown: false },
  { label: "Contact", href: "#contact", hasDropdown: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0D1B2E]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2 flex-shrink-0"
            >
              <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                {/* Show dark logo portion (top half of the combined image) */}
                <img
                  src={LOGO_URL}
                  alt="AdvanceIT Logo"
                  className="absolute top-0 left-0 w-full"
                  style={{ height: "200%", objectFit: "cover", objectPosition: "top center" }}
                />
              </div>
              <span className="font-display font-700 text-xl text-white">
                Advance<span className="text-cyan">IT</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm font-body font-500 text-white/80 hover:text-white hover:text-cyan transition-colors duration-200 rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => handleNavClick("#contact")}
                className="btn-primary px-5 py-2.5 rounded-lg text-sm"
              >
                Get a Free Quote
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-white/80 hover:text-white"
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
            className="fixed top-16 left-0 right-0 z-40 bg-[#0D1B2E]/98 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          >
            <div className="container py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 text-white/80 hover:text-white font-body font-500 text-base rounded-lg hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="pt-3 border-t border-white/10">
                <button
                  onClick={() => handleNavClick("#contact")}
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
