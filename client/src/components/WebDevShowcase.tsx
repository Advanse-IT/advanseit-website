/* ============================================================
   AdvanceIT Web Dev Showcase — "Fluid Intelligence"
   White section with web dev workspace image + app dev image
   Alternating layout to break monotony
   ============================================================ */

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

const WEB_DEV_IMG =
  "https://private-us-east-1.manuscdn.com/sessionFile/37fQNGQqqG3bNP4NtPOLV7/sandbox/zJvQS07fxaI6Q7ymj4vzLy-img-3_1771758212000_na1fn_d2ViLWRldg.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMzdmUU5HUXFxRzNiTlA0TnRQT0xWNy9zYW5kYm94L3pKdlFTMDdmeGFJNlE3eW1qNHZ6THktaW1nLTNfMTc3MTc1ODIxMjAwMF9uYTFmbl9kMlZpTFdSbGRnLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=l7sZqy8CEIygVJBX7j893~kKlU4HVTv7qdaEYp6V7wupn4BNkvETCrwGMphSNVjmwmJIuxJMzpKSWqf7ykSrfrReuoyNbrc5Bu1lDQc09p-lShhMHPdePc41cCSfTbS5xb4IoGZrQwRCzI74AivxH8-eAFaNi6T0CKUJuSmy4BxmJtwWx00UW3nQMQG6jyRENh~YThAuvUNXcfGiyqHZ2-bvV~y5Q8G2IopfH4WpIAJbz8NTdeTVq26fpvXOyDI24HmF~Sq1jT6w1oHxxBwKlL9o6m-EMxx~1wRzhEItOE~YO8UH1pF28uGcRBUutM1WJs1MqS5xqLdLTkAFTRA2uA__";

const APP_DEV_IMG =
  "https://private-us-east-1.manuscdn.com/sessionFile/37fQNGQqqG3bNP4NtPOLV7/sandbox/zJvQS07fxaI6Q7ymj4vzLy-img-5_1771758214000_na1fn_YXBwLWRldg.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMzdmUU5HUXFxRzNiTlA0TnRQT0xWNy9zYW5kYm94L3pKdlFTMDdmeGFJNlE3eW1qNHZ6THktaW1nLTVfMTc3MTc1ODIxNDAwMF9uYTFmbl9ZWEJ3TFdSbGRnLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=C8DZZvgk4xhlaDKDJNJ03iTc77LWM~sLGhDzTWMjl7xX5zFGSmC53tX~2d-Cx1B2yCkW4P91hVEeCjJ2OSY1vOhVc2jTOhCT3ourItwvyg~XbjbO8l5ilhhtIqTkvOZ1tmt28buhi5Ep2WBrhL9l75jV31XnausS2nuEwIKdZQbnaIyR0mHciJigpXmm7Mafomk0dbMyWjvCrpkl8BUU5NDoBagpuaxzCviO1BhDpgwSigK0S075i7BY8zGCxAhdh6AtIkMI8sFhtNpSCUymhlpXzskiHSiLk~ZiYvnGj--5irt25IrjpX9NhkTZsiTcwqIMHGaPAso3sv~7jNTd1w__";

const webFeatures = [
  "Custom React / Next.js applications",
  "Responsive, mobile-first design",
  "SEO-optimised from the ground up",
  "Performance scores of 95+ on Lighthouse",
  "Integrated CMS and e-commerce solutions",
];

const appFeatures = [
  "iOS and Android from a single codebase",
  "Native-feel performance with React Native",
  "Offline-first architecture",
  "Push notifications and real-time updates",
  "App Store and Google Play submission",
];

export default function WebDevShowcase() {
  const handleContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-[#F8FAFC] section-py pb-24 relative overflow-hidden">
      <div className="container">
        {/* Row 1: Web Dev — image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={WEB_DEV_IMG}
                alt="Web Development Workspace"
                className="w-full h-72 lg:h-80 object-cover"
              />
            </div>
            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-5 -right-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
            >
              <div className="font-display font-800 text-2xl text-[#00C8D4]">95+</div>
              <div className="font-body text-xs text-[#4A6580]">Lighthouse Score</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00C8D4]/10 border border-[#00C8D4]/20 mb-4">
              <span className="text-xs font-body font-600 text-[#0099A8]">Web Design & Development</span>
            </div>
            <h3 className="font-display font-800 text-3xl text-[#0D1B2E] mb-4 leading-tight">
              Websites That Work as Hard as You Do
            </h3>
            <p className="font-body text-base text-[#4A6580] leading-relaxed mb-6">
              We build fast, beautiful, and conversion-focused websites that represent your brand 
              at its best — on every device, every time.
            </p>
            <div className="space-y-2.5 mb-7">
              {webFeatures.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#00C8D4] flex-shrink-0" />
                  <span className="font-body text-sm text-[#4A6580]">{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handleContact}
              className="flex items-center gap-2 text-sm font-display font-600 text-[#0099A8] hover:text-[#0D1B2E] transition-colors group"
            >
              Start Your Web Project
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Row 2: App Dev — text left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00C8D4]/10 border border-[#00C8D4]/20 mb-4">
              <span className="text-xs font-body font-600 text-[#0099A8]">App Development</span>
            </div>
            <h3 className="font-display font-800 text-3xl text-[#0D1B2E] mb-4 leading-tight">
              Apps Your Users Will Love
            </h3>
            <p className="font-body text-base text-[#4A6580] leading-relaxed mb-6">
              From concept to App Store, we build mobile applications that deliver exceptional 
              user experiences and keep your customers coming back.
            </p>
            <div className="space-y-2.5 mb-7">
              {appFeatures.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#00C8D4] flex-shrink-0" />
                  <span className="font-body text-sm text-[#4A6580]">{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handleContact}
              className="flex items-center gap-2 text-sm font-display font-600 text-[#0099A8] hover:text-[#0D1B2E] transition-colors group"
            >
              Build Your App
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl max-w-sm mx-auto lg:mx-0 lg:ml-auto">
              <img
                src={APP_DEV_IMG}
                alt="App Development"
                className="w-full h-96 object-cover"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-5 -left-4 bg-[#0D1B2E] rounded-xl p-4 shadow-xl"
            >
              <div className="font-display font-800 text-2xl text-[#00C8D4]">iOS + Android</div>
              <div className="font-body text-xs text-white/60">Single Codebase</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Bottom wave to navy */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 13.3C120 26.7 240 53.3 360 60C480 66.7 600 53.3 720 46.7C840 40 960 40 1080 43.3C1200 46.7 1320 53.3 1380 56.7L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z" fill="#0D1B2E"/>
        </svg>
      </div>
    </section>
  );
}
