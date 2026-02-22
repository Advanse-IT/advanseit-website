/* ============================================================
   AdvanceIT Home Page — "Fluid Intelligence"
   Assembles all sections in order with smooth flow
   ============================================================ */

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WebDevShowcase from "@/components/WebDevShowcase";
import AISection from "@/components/AISection";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <WebDevShowcase />
      <AISection />
      <About />
      <TechStack />
      <WhyUs />
      <Testimonials />
      <CTABanner />
      <Contact />
      <Footer />
    </div>
  );
}
