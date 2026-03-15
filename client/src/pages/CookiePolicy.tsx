/* ============================================================
   AdvanseIT Cookie Policy Page
   ============================================================ */

import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const LAST_UPDATED = "15 March 2026";
const EMAIL = "admin@advanseit.com.au";

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SEO
        title="Cookie Policy | AdvanseIT"
        description="Learn how AdvanseIT uses cookies and similar technologies on our website. Manage your cookie preferences at any time."
        extraKeywords={["cookie policy", "cookies", "tracking", "AdvanseIT cookies"]}
        canonicalPath="/cookies"
      />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0D1B2E] pt-32 pb-16">
        <div className="container max-w-4xl mx-auto px-6">
          <p className="font-body text-[#00C8D4] text-sm font-600 tracking-widest uppercase mb-3">Legal</p>
          <h1 className="font-display font-700 text-4xl md:text-5xl text-white mb-4">Cookie Policy</h1>
          <p className="font-body text-white/50 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="prose prose-slate max-w-none font-body text-gray-700 leading-relaxed space-y-10">

            <div>
              <p>
                This Cookie Policy explains how AdvanseIT Pty Ltd ("AdvanseIT", "we", "us", or "our") uses cookies and similar tracking technologies when you visit our website at{" "}
                <a href="https://advanseit.com.au" className="text-[#00C8D4] hover:underline">advanseit.com.au</a>. This Policy should be read alongside our{" "}
                <Link href="/privacy" className="text-[#00C8D4] hover:underline">Privacy Policy</Link>.
              </p>
            </div>

            <Section title="1. What Are Cookies?">
              <p>Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently, to remember your preferences, and to provide information to website owners about how their site is being used.</p>
              <p>Similar technologies include web beacons (also known as pixel tags), local storage, and session storage, which function in a comparable way to cookies.</p>
            </Section>

            <Section title="2. Types of Cookies We Use">
              <table className="w-full text-sm border-collapse mt-3">
                <thead>
                  <tr className="bg-[#0D1B2E] text-white">
                    <th className="text-left p-3 rounded-tl-lg">Type</th>
                    <th className="text-left p-3">Purpose</th>
                    <th className="text-left p-3 rounded-tr-lg">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Strictly Necessary", "Essential for the website to function. These cannot be disabled. They include session management and security cookies.", "Session"],
                    ["Performance / Analytics", "Help us understand how visitors interact with our website by collecting anonymous usage data (e.g., pages visited, time on site). We use this data to improve our website.", "Up to 2 years"],
                    ["Functional", "Remember your preferences and settings (e.g., language, region) to provide a more personalised experience.", "Up to 1 year"],
                    ["Marketing / Targeting", "Used to deliver relevant advertisements and track the effectiveness of marketing campaigns. Currently not used by AdvanseIT.", "N/A"],
                  ].map(([type, purpose, duration], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-3 font-600 text-[#0D1B2E] border-b border-gray-100 align-top">{type}</td>
                      <td className="p-3 border-b border-gray-100 align-top">{purpose}</td>
                      <td className="p-3 border-b border-gray-100 align-top whitespace-nowrap">{duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>

            <Section title="3. Third-Party Cookies">
              <p>Some cookies on our website are set by third-party services that appear on our pages. These may include:</p>
              <p><strong>Google Analytics</strong> — we use Google Analytics to collect anonymous information about how visitors use our website. Google Analytics sets cookies to help us analyse site traffic and usage patterns. You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#00C8D4] hover:underline">Google Analytics Opt-out Browser Add-on</a>.</p>
              <p>We do not control the cookies set by third parties. Please refer to the relevant third party's privacy and cookie policies for more information.</p>
            </Section>

            <Section title="4. Managing Your Cookie Preferences">
              <p>When you first visit our website, you will be presented with a cookie consent banner that allows you to accept or decline non-essential cookies. You can change your preferences at any time.</p>
              <p>You can also control cookies through your browser settings. Most browsers allow you to refuse or delete cookies. Please note that disabling certain cookies may affect the functionality of our website. The following links provide information on how to manage cookies in common browsers:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#00C8D4] hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-[#00C8D4] hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/en-au/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#00C8D4] hover:underline">Apple Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#00C8D4] hover:underline">Microsoft Edge</a></li>
              </ul>
            </Section>

            <Section title="5. Do Not Track">
              <p>Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want your online activity tracked. Our website does not currently respond to DNT signals, but you can use the cookie management options described above to control tracking.</p>
            </Section>

            <Section title="6. Changes to This Policy">
              <p>We may update this Cookie Policy from time to time. We will notify you of any significant changes by posting the updated Policy on this page with a revised "Last updated" date.</p>
            </Section>

            <Section title="7. Contact Us">
              <p>If you have any questions about our use of cookies, please contact us at{" "}
                <a href={`mailto:${EMAIL}`} className="text-[#00C8D4] hover:underline">{EMAIL}</a>.
              </p>
            </Section>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display font-700 text-xl text-[#0D1B2E] mb-3 pb-2 border-b border-gray-100">{title}</h2>
      <div className="space-y-3 text-gray-700">{children}</div>
    </div>
  );
}
