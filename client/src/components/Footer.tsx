/* ============================================================
   AdvanceIT Footer — "Fluid Intelligence"
   Dark navy footer with links, social, and copyright
   ============================================================ */

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Linkedin, Twitter, Github } from "lucide-react";

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
  Company: ["About Us", "Our Process", "Why AdvanceIT", "Careers", "Blog"],
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
                alt="AdvanceIT"
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
            © {new Date().getFullYear()} AdvanceIT Pty Ltd. All rights reserved. ABN: 12 345 678 901
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {[
              { Icon: Linkedin, href: "#", label: "LinkedIn" },
              { Icon: Twitter, href: "#", label: "Twitter" },
              { Icon: Github, href: "#", label: "GitHub" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-[#00C8D4] hover:border-[#00C8D4]/30 transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
