/* ============================================================
   AdvanseIT Terms & Conditions Page
   Australian law compliant — last updated March 2026
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
const ADDRESS = "Brisbane, Queensland, Australia";

export default function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SEO
        title="Terms & Conditions | AdvanseIT"
        description="Read AdvanseIT's Terms and Conditions governing the use of our website and IT services. Brisbane-based IT company serving Australian businesses."
        extraKeywords={["terms and conditions", "AdvanseIT terms", "IT services agreement", "Brisbane IT"]}
        canonicalPath="/terms"
      />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0D1B2E] pt-32 pb-16">
        <div className="container max-w-4xl mx-auto px-6">
          <p className="font-body text-[#00C8D4] text-sm font-600 tracking-widest uppercase mb-3">Legal</p>
          <h1 className="font-display font-700 text-4xl md:text-5xl text-white mb-4">Terms &amp; Conditions</h1>
          <p className="font-body text-white/50 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="prose prose-slate max-w-none font-body text-gray-700 leading-relaxed space-y-10">

            {/* Intro */}
            <div>
              <p className="text-base">
                These Terms and Conditions ("Terms") govern your access to and use of the website located at{" "}
                <a href="https://advanseit.com.au" className="text-[#00C8D4] hover:underline">advanseit.com.au</a>{" "}
                ("Website") and the services provided by <strong>{COMPANY_NAME}</strong> (ABN {ABN}), a company registered in Queensland, Australia ("AdvanseIT", "we", "us", or "our"). By accessing or using our Website or engaging our services, you agree to be bound by these Terms. If you do not agree, please discontinue use immediately.
              </p>
            </div>

            <Section title="1. Definitions">
              <p>"Services" means any IT services, including but not limited to web design and development, mobile application development, custom software development, testing and quality assurance, artificial intelligence solutions, and IT staffing and outsourcing services provided by AdvanseIT.</p>
              <p>"Client" or "you" means any individual or entity that accesses the Website or engages AdvanseIT for Services.</p>
              <p>"Agreement" means these Terms together with any Statement of Work, Service Agreement, or Proposal entered into between AdvanseIT and the Client.</p>
            </Section>

            <Section title="2. Services">
              <p>AdvanseIT provides professional IT services to businesses and individuals across Australia. The specific scope, deliverables, timelines, and fees for any engagement will be set out in a separate written Statement of Work or Service Agreement, which forms part of the Agreement between the parties.</p>
              <p>We reserve the right to modify, suspend, or discontinue any Service at any time with reasonable notice to affected Clients. AdvanseIT does not guarantee uninterrupted availability of any Service.</p>
            </Section>

            <Section title="3. Intellectual Property">
              <p>Unless expressly agreed otherwise in writing, all intellectual property rights in deliverables created by AdvanseIT (including but not limited to code, designs, documentation, and reports) remain the property of AdvanseIT until full payment has been received, at which point ownership transfers to the Client as specified in the applicable Statement of Work.</p>
              <p>All content on this Website, including text, graphics, logos, images, and software, is the property of AdvanseIT or its licensors and is protected under the <em>Copyright Act 1968</em> (Cth). You may not reproduce, distribute, or create derivative works without our prior written consent.</p>
              <p>Any third-party software, libraries, or tools incorporated into deliverables remain subject to their respective licences, which will be disclosed to the Client.</p>
            </Section>

            <Section title="4. Client Obligations">
              <p>You agree to provide AdvanseIT with accurate, complete, and timely information, materials, and access reasonably required to perform the Services. Delays caused by the Client's failure to provide required inputs may result in revised timelines and additional fees, which will be communicated in advance.</p>
              <p>You are solely responsible for ensuring that any content, data, or materials you provide to AdvanseIT do not infringe the rights of any third party and comply with all applicable laws.</p>
            </Section>

            <Section title="5. Payment Terms">
              <p>Fees for Services are as set out in the applicable Statement of Work or Proposal. Unless otherwise agreed in writing, invoices are payable within fourteen (14) days of the invoice date. AdvanseIT reserves the right to charge interest on overdue amounts at the rate of 2% per month, compounding monthly, in accordance with applicable Australian law.</p>
              <p>All fees are quoted in Australian Dollars (AUD) and are exclusive of Goods and Services Tax (GST) unless stated otherwise. GST will be added where applicable in accordance with the <em>A New Tax System (Goods and Services Tax) Act 1999</em> (Cth).</p>
            </Section>

            <Section title="6. Confidentiality">
              <p>Each party agrees to keep confidential all non-public information received from the other party in connection with the Services ("Confidential Information") and not to disclose it to any third party without the prior written consent of the disclosing party, except as required by law or as necessary to perform the Services.</p>
              <p>This obligation of confidentiality survives the termination of any Agreement for a period of three (3) years.</p>
            </Section>

            <Section title="7. Limitation of Liability">
              <p>To the maximum extent permitted by law, AdvanseIT's total liability to you for any loss or damage arising out of or in connection with the Services or these Terms (whether in contract, tort, statute, or otherwise) is limited to the total fees paid by you to AdvanseIT in the three (3) months immediately preceding the event giving rise to the claim.</p>
              <p>AdvanseIT is not liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, loss of data, or loss of business opportunity, even if advised of the possibility of such damages.</p>
              <p>Nothing in these Terms excludes, restricts, or modifies any right or remedy, or any guarantee, warranty, or other term or condition, implied or imposed by the <em>Australian Consumer Law</em> (Schedule 2 to the <em>Competition and Consumer Act 2010</em> (Cth)) that cannot lawfully be excluded or limited.</p>
            </Section>

            <Section title="8. Australian Consumer Law">
              <p>Our Services come with guarantees that cannot be excluded under the Australian Consumer Law. You are entitled to a replacement or refund for a major failure and compensation for any other reasonably foreseeable loss or damage. You are also entitled to have the Services remedied if they fail to be of acceptable quality and the failure does not amount to a major failure.</p>
            </Section>

            <Section title="9. Termination">
              <p>Either party may terminate an Agreement by providing thirty (30) days' written notice to the other party. AdvanseIT may terminate immediately if the Client breaches any material term of the Agreement and fails to remedy such breach within seven (7) days of written notice.</p>
              <p>Upon termination, the Client must pay all fees for Services rendered up to the date of termination. AdvanseIT will deliver all completed work product to the Client upon receipt of outstanding payment.</p>
            </Section>

            <Section title="10. Dispute Resolution">
              <p>The parties agree to attempt to resolve any dispute arising out of or in connection with these Terms or the Services through good-faith negotiation. If the dispute is not resolved within thirty (30) days of written notice, either party may refer the matter to mediation administered by the Resolution Institute (or a mutually agreed mediator) before commencing legal proceedings.</p>
              <p>These Terms are governed by the laws of Queensland, Australia, and the parties submit to the non-exclusive jurisdiction of the courts of Queensland.</p>
            </Section>

            <Section title="11. Website Use">
              <p>You agree to use this Website only for lawful purposes and in a manner that does not infringe the rights of others. You must not use the Website to transmit any unsolicited commercial communications, malicious code, or content that is unlawful, defamatory, or harmful.</p>
              <p>AdvanseIT makes no warranty that the Website will be uninterrupted, error-free, or free of viruses. We reserve the right to modify or discontinue the Website at any time without notice.</p>
            </Section>

            <Section title="12. Privacy">
              <p>Your use of this Website and our Services is also governed by our{" "}
                <Link href="/privacy" className="text-[#00C8D4] hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference. By using the Website, you consent to the collection and use of your information as described in the Privacy Policy.
              </p>
            </Section>

            <Section title="13. Changes to These Terms">
              <p>AdvanseIT reserves the right to update these Terms at any time. We will notify you of material changes by posting the updated Terms on this page with a revised "Last updated" date. Your continued use of the Website or Services after such changes constitutes your acceptance of the updated Terms.</p>
            </Section>

            <Section title="14. Contact Us">
              <p>If you have any questions about these Terms, please contact us:</p>
              <div className="bg-gray-50 rounded-xl p-6 mt-4 border border-gray-100">
                <p className="font-700 text-[#0D1B2E] mb-1">{COMPANY_NAME}</p>
                <p>ABN: {ABN}</p>
                <p>{ADDRESS}</p>
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
