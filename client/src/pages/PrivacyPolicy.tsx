/* ============================================================
   AdvanseIT Privacy Policy Page
   Australian Privacy Act 1988 (Cth) compliant
   ============================================================ */

import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const LAST_UPDATED = "15 March 2026";
const COMPANY_NAME = "AdvanseIT Pty Ltd";
const ABN = "12 656 409 850";
const EMAIL = "admin@advanseit.com.au";
const PHONE = "0481 261 679";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SEO
        title="Privacy Policy | AdvanseIT"
        description="AdvanseIT's Privacy Policy outlines how we collect, use, and protect your personal information in accordance with the Australian Privacy Act 1988."
        extraKeywords={["privacy policy", "data protection", "Australian Privacy Act", "AdvanseIT privacy"]}
        canonicalPath="/privacy"
      />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0D1B2E] pt-32 pb-16">
        <div className="container max-w-4xl mx-auto px-6">
          <p className="font-body text-[#00C8D4] text-sm font-600 tracking-widest uppercase mb-3">Legal</p>
          <h1 className="font-display font-700 text-4xl md:text-5xl text-white mb-4">Privacy Policy</h1>
          <p className="font-body text-white/50 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="prose prose-slate max-w-none font-body text-gray-700 leading-relaxed space-y-10">

            <div>
              <p>
                {COMPANY_NAME} (ABN {ABN}) ("AdvanseIT", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information in accordance with the <em>Privacy Act 1988</em> (Cth) ("Privacy Act") and the Australian Privacy Principles ("APPs") contained in Schedule 1 of the Privacy Act.
              </p>
              <p className="mt-3">
                By using our website at <a href="https://advanseit.com.au" className="text-[#00C8D4] hover:underline">advanseit.com.au</a> or engaging our services, you consent to the practices described in this Policy. If you do not agree, please discontinue use.
              </p>
            </div>

            <Section title="1. What Personal Information We Collect">
              <p>We may collect the following types of personal information:</p>
              <table className="w-full text-sm border-collapse mt-3">
                <thead>
                  <tr className="bg-[#0D1B2E] text-white">
                    <th className="text-left p-3 rounded-tl-lg">Category</th>
                    <th className="text-left p-3 rounded-tr-lg">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Identity information", "Name, job title, company name"],
                    ["Contact information", "Email address, phone number, postal address"],
                    ["Technical information", "IP address, browser type, device information, cookies"],
                    ["Usage information", "Pages visited, time on site, referral source"],
                    ["Communications", "Messages sent via our contact form or email"],
                    ["Business information", "Project requirements, briefs, and related documents you share with us"],
                  ].map(([cat, ex], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-3 font-600 text-[#0D1B2E] border-b border-gray-100">{cat}</td>
                      <td className="p-3 border-b border-gray-100">{ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3">We only collect personal information that is reasonably necessary for our business functions and activities.</p>
            </Section>

            <Section title="2. How We Collect Personal Information">
              <p>We collect personal information in the following ways:</p>
              <p><strong>Directly from you</strong> — when you fill in our contact form, send us an email, call us, or engage our services.</p>
              <p><strong>Automatically</strong> — when you visit our website, we may automatically collect technical and usage information through cookies and similar technologies. Please see our <Link href="/cookies" className="text-[#00C8D4] hover:underline">Cookie Policy</Link> for more details.</p>
              <p><strong>From third parties</strong> — we may receive information about you from third parties such as referral partners or publicly available sources, where permitted by law.</p>
            </Section>

            <Section title="3. How We Use Your Personal Information">
              <p>We use your personal information for the following purposes:</p>
              <p>To provide, manage, and improve our IT services and website; to respond to your enquiries and communicate with you; to send you information about our services, updates, or promotions (where you have consented or where permitted by law); to comply with our legal obligations; to protect the security and integrity of our systems; and to conduct internal business analysis and planning.</p>
              <p>We will not use your personal information for any purpose that is incompatible with the primary purpose for which it was collected, unless you have consented or an exception under the Privacy Act applies.</p>
            </Section>

            <Section title="4. Disclosure of Personal Information">
              <p>We may disclose your personal information to:</p>
              <p><strong>Service providers</strong> — third-party vendors who assist us in operating our website and delivering services (e.g., cloud hosting providers — Cloudflare; email platforms; analytics — Google Analytics 4), subject to confidentiality obligations.</p>
              <p><strong>Professional advisers</strong> — lawyers, accountants, and insurers where necessary.</p>
              <p><strong>Government and regulatory bodies</strong> — where required or authorised by law.</p>
              <p>We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
            </Section>

            <Section title="5. Overseas Disclosure">
              <p>Some of our service providers may be located overseas (for example, cloud infrastructure providers in the United States or Singapore). Where we disclose your personal information to overseas recipients, we take reasonable steps to ensure those recipients handle your information in a manner consistent with the Australian Privacy Principles, as required by APP 8.</p>
            </Section>

            <Section title="6. Data Security">
              <p>We take reasonable technical and organisational measures to protect your personal information from misuse, interference, loss, and unauthorised access, modification, or disclosure. These measures include secure server infrastructure, access controls, and encrypted communications where appropriate.</p>
              <p>However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your personal information, we cannot guarantee its absolute security.</p>
            </Section>

            <Section title="7. Data Retention">
              <p>We retain personal information for as long as necessary to fulfil the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. When personal information is no longer required, we will take reasonable steps to destroy or de-identify it.</p>
            </Section>

            <Section title="8. Access and Correction">
              <p>Under the Privacy Act, you have the right to request access to the personal information we hold about you and to request corrections if it is inaccurate, out of date, incomplete, or misleading. To make such a request, please contact us using the details below. We will respond within a reasonable time (generally within 30 days) and will not charge a fee for making an access request, though we may charge a reasonable fee for providing access.</p>
              <p>If we refuse your request, we will provide written reasons and information about how to complain.</p>
            </Section>

            <Section title="9. Cookies">
              <p>Our website uses cookies and similar tracking technologies to enhance your browsing experience and collect usage data. For full details on the types of cookies we use and how to manage them, please read our <Link href="/cookies" className="text-[#00C8D4] hover:underline">Cookie Policy</Link>.</p>
            </Section>

            <Section title="10. Links to Third-Party Websites">
              <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to read the privacy policies of any third-party sites you visit.</p>
            </Section>

            <Section title="11. Complaints">
              <p>If you believe we have breached the Australian Privacy Principles or the Privacy Act, you may lodge a complaint with us by contacting us using the details below. We will investigate your complaint and respond within 30 days.</p>
              <p>If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-[#00C8D4] hover:underline">www.oaic.gov.au</a> or by calling 1300 363 992.</p>
            </Section>

            <Section title="12. Changes to This Policy">
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will post the updated Policy on this page with a revised "Last updated" date. We encourage you to review this Policy periodically.</p>
            </Section>

            <Section title="13. Contact Us">
              <p>For any privacy-related enquiries, requests, or complaints, please contact our Privacy Officer:</p>
              <div className="bg-gray-50 rounded-xl p-6 mt-4 border border-gray-100">
                <p className="font-700 text-[#0D1B2E] mb-1">{COMPANY_NAME}</p>
                <p>ABN: {ABN}</p>
                <p>Brisbane, Queensland, Australia</p>
                <p>Email: <a href={`mailto:${EMAIL}`} className="text-[#00C8D4] hover:underline">{EMAIL}</a></p>
                <p>Phone: <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="text-[#00C8D4] hover:underline">{PHONE}</a></p>
              </div>
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
