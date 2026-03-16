/* ============================================================
   AdvanseIT Home Page — "Fluid Intelligence"
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
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import AISEOSchema from "@/components/AISEOSchema";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <SEO page="home" canonicalPath="/" />
      <LocalBusinessSchema />
      <AISEOSchema />
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
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
