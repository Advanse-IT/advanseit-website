/* ============================================================
   AdvanseIT Cookie Consent Banner
   Shown on first visit; persists preference in localStorage
   ============================================================ */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { X, Cookie } from "lucide-react";

const STORAGE_KEY = "advanseit_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if user hasn't made a choice yet
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Slight delay so it doesn't flash immediately on load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="bg-[#0D1B2E] border border-white/10 rounded-2xl shadow-2xl p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Cookie size={18} className="text-[#00C8D4] flex-shrink-0" />
                <span className="font-display font-700 text-white text-sm">We use cookies</span>
              </div>
              <button
                onClick={decline}
                className="text-white/40 hover:text-white/70 transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <p className="font-body text-xs text-white/55 leading-relaxed mb-4">
              We use cookies to improve your experience on our website, analyse traffic, and personalise content. By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or learn more in our{" "}
              <Link
                href="/cookies"
                className="text-[#00C8D4] hover:underline"
                onClick={() => setVisible(false)}
              >
                Cookie Policy
              </Link>.
            </p>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={accept}
                className="flex-1 bg-[#00C8D4] hover:bg-[#00b8c4] text-[#0D1B2E] font-display font-700 text-xs py-2.5 px-4 rounded-lg transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={decline}
                className="flex-1 border border-white/15 hover:border-white/30 text-white/60 hover:text-white font-body text-xs py-2.5 px-4 rounded-lg transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
