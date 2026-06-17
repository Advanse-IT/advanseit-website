/* ============================================================
   AdvanseIT Footer — "Fluid Intelligence"
   Dark navy footer with links, social, and copyright
   ============================================================ */

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Linkedin } from "lucide-react";
import { Link } from "wouter";

// X (formerly Twitter) logo as inline SVG — official X mark
const XLogo = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LOGO_URL = "/images/logo-navbar.svg";

// Section anchor links
// const serviceLinks = [
//   { label: "Web Design & Development", href: "/services/web-design" },
//   { label: "App Development", href: "/services/app-development" },
//   { label: "Custom Software", href: "/services/custom-software" },
//   { label: "Testing & QA", href: "/services/testing" },
//   { label: "AI Solutions", anchor: "#ai-solutions" },
//   { label: "IT Staffing", href: "/services/it-staffing" },
// ];

const serviceLinks = [
  { label: "Web Design & Development", href: "/services/web-design" },
  { label: "App Development", href: "/services/app-development" },
  { label: "Custom Software", href: "/services/custom-software" },
  { label: "Testing & QA", href: "/services/testing" },
  { label: "AI Solutions", href: "/services/ai-solutions" },
  { label: "IT Staffing", href: "/services/it-staffing" },
];

const companyLinks = [
  { label: "About Us", anchor: "#about" },
  { label: "Our Process", anchor: "#why-us" },
  { label: "Why AdvanseIT", anchor: "#why-us" },
  { label: "Contact Us", anchor: "#contact" },
];

// Legal links — these navigate to dedicated pages
const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Security & Compliance", href: "/security" },
];

export default function Footer() {
  const handleAnchorClick = (anchor: string) => {
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // If not on home page, navigate home first then scroll
      window.location.href = `/${anchor}`;
    }
  };

  return (
    <footer className="bg-[#091422] border-t border-white/5">
      <div className="container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-4">
              <Link href="/">
                <img
                  src={LOGO_URL}
                  alt="AdvanseIT"
                  className="h-14 w-auto object-contain cursor-pointer"
                  style={{ maxWidth: "220px" }}
                />
              </Link>
            </div>

            <p className="font-body text-sm text-white/50 leading-relaxed mb-6 max-w-xs">
              Brisbane-based IT company delivering cost-effective, AI-first technology solutions 
              for Australian businesses.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <MapPin size={14} className="text-[#00C8D4] flex-shrink-0" />
                <span className="font-body text-xs text-white/45">Brisbane, Queensland, Australia</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#00C8D4] flex-shrink-0" />
                <a href="mailto:admin@advanseit.com.au" className="font-body text-xs text-white/45 hover:text-[#00C8D4] transition-colors">
                  admin@advanseit.com.au
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#00C8D4] flex-shrink-0" />
                <a href="tel:+61481261679" className="font-body text-xs text-white/45 hover:text-[#00C8D4] transition-colors">
                  0481 261 679
                </a>
              </div>
            </div>
          </div>

          {/* Services Column */}
        
<div>
  <h4 className="font-display font-700 text-sm text-white mb-4">Services</h4>
  <ul className="space-y-2.5">
    {serviceLinks.map(({ label, href }) => (
      <li key={label}>
        <Link href={href} className="font-body text-sm text-white/45 hover:text-[#00C8D4] transition-colors">
          {label}
        </Link>
      </li>
    ))}
  </ul>
</div>

          {/* Company Column */}
          <div>
            <h4 className="font-display font-700 text-sm text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map(({ label, anchor }) => (
                <li key={label}>
                  <button
                    onClick={() => handleAnchorClick(anchor)}
                    className="font-body text-sm text-white/45 hover:text-[#00C8D4] transition-colors text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-display font-700 text-sm text-white mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-body text-sm text-white/45 hover:text-[#00C8D4] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="font-body text-xs text-white/35">
              © {new Date().getFullYear()} AdvanseIT Pty Ltd. All rights reserved.
            </p>
            <span className="hidden sm:inline text-white/20 text-xs">|</span>
            <p className="font-body text-xs text-white/25">ABN: 12 656 409 850</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/company/advanseit", icon: <Linkedin size={15} /> },
              { label: "X", href: "https://x.com/AdvanseIT", icon: <XLogo size={15} /> },
            ].map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-[#00C8D4] hover:border-[#00C8D4]/30 transition-all"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
