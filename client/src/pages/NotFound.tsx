import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useLocation, Link } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <>
      <Helmet>
        <title>Page Not Found (404) | AdvanseIT</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to AdvanseIT's homepage for web design, app development, AI solutions and IT staffing in Brisbane." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0D1B2E] to-[#0a2540]">
        <div className="text-center px-6 max-w-lg">
          {/* 404 */}
          <p className="text-8xl font-extrabold text-cyan-400 mb-4 tracking-tight">404</p>
          <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
          <p className="text-white/60 mb-10 leading-relaxed">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => setLocation("/")}
              className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-2.5 rounded-xl font-semibold"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Link href="/blog">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-6 py-2.5 rounded-xl font-semibold w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Visit Blog
              </Button>
            </Link>
          </div>

          {/* Popular links */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-white/40 text-sm mb-4">Popular pages</p>
            <div className="flex flex-wrap gap-3 justify-center text-sm">
              {[
                { label: "Web Design", href: "/services/web-design" },
                { label: "App Development", href: "/services/app-development" },
                { label: "AI Solutions", href: "/services/ai-solutions" },
                { label: "IT Staffing", href: "/services/it-staffing" },
                { label: "Blog", href: "/blog" },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="text-cyan-400/70 hover:text-cyan-400 transition-colors cursor-pointer">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
