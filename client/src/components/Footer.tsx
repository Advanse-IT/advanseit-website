/* ============================================================
   AdvanseIT Footer — "Fluid Intelligence"
   Dark navy footer with links, social, and copyright
   ============================================================ */

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Linkedin } from "lucide-react";

// X (formerly Twitter) logo as inline SVG — official X mark
const XLogo = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663374153263/tvGUeOVhUQagHxoF.svg";

const footerLinks = {
  Services: [
    "Web Design & Development",
    "App Development",
    "Custom Software",
    "Testing & QA",
    "AI Solutions",
    "IT Staffing",
  ],
  Company: ["About Us", "Our Process", "Why AdvanseIT", "Careers", "Blog"],
  Resources: ["Case Studies", "Tech Stack", "Privacy Policy", "Terms of Service"],
};

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#091422] border-t border-white/5">
      <div className="container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-4">
              <img
                src={LOGO_URL}
                alt="AdvanseIT"
                className="h-14 w-auto object-contain"
                style={{ maxWidth: "220px" }}
              />
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
                <a href="tel:0481261679" className="font-body text-xs text-white/45 hover:text-[#00C8D4] transition-colors">
                  0481 261 679
                </a>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-700 text-sm text-white mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => {
                        if (category === "Services") handleNavClick("#services");
                        else if (category === "Company") handleNavClick("#about");
                        else handleNavClick("#contact");
                      }}
                      className="font-body text-sm text-white/45 hover:text-[#00C8D4] transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/35">
            © {new Date().getFullYear()} AdvanseIT Pty Ltd. All rights reserved. ABN: 12 656 409 850
          </p>

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
