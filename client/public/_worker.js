const ROUTE_META = {
   "/": { title: "AdvanseIT | AI-Powered IT for Australian Business", description: "We build websites, apps & AI solutions that drive real results. Brisbane IT company trusted by Australian businesses." },
  "/services/web-design": { title: "Trusted Web Design Company Brisbane | AdvanseIT", description: "Build a strong online presence with a web design company Brisbane offering custom designs and business-focused solutions." },
  "/services/app-development": { title: "Custom Mobile App Development Company Brisbane", description: "AdvanseIT is an app development company Brisbane businesses trust for custom iOS and Android apps built for performance and growth." },
  "/services/custom-software": { title: "Custom Software Development Brisbane | AdvanseIT", description: "Replace manual processes with tailored software. AdvanseIT offers custom software development Brisbane businesses can depend on." },
  "/services/ai-solutions": { title: "Trusted AI Software Development Company Australia", description: "Build smarter systems with AI software development Company Australia experts specializing in machine learning and business automation." },
  "/services/testing": { title: "Professional Software Testing Brisbane | AdvanseIT", description: "AdvanseIT provides software testing Brisbane services including QA, automation, performance, and security testing for reliable software." },
  "/services/it-staffing": { title: "Best Outsourced IT Staffing Services | AdvanseIT", description: "Access top technology talent through outsourced IT staffing services designed to support projects, growth, and digital initiatives." },
  // "/blog": { title: "Blog & Insights — AI, Web Dev & IT | AdvanseIT", description: "Expert articles on AI, web development, and IT solutions." },
  // "/privacy": { title: "Privacy Policy | AdvanseIT", description: "AdvanseIT privacy policy." },
  // "/terms": { title: "Terms & Conditions | AdvanseIT", description: "Terms and conditions for AdvanseIT services." },
  // "/cookies": { title: "Cookie Policy | AdvanseIT", description: "How AdvanseIT uses cookies." },
  // "/security": { title: "Security & Compliance | AdvanseIT", description: "AdvanseIT security practices." },
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
   const pathname = url.pathname.replace(/\/$/, "") || "/";
    const response = await env.ASSETS.fetch(request);
    if (!response.headers.get("content-type")?.includes("text/html")) {
      return response;
    }
    const isBlogPost = pathname.startsWith("/blog/") && pathname !== "/blog";
    const meta = ROUTE_META[pathname] ?? (isBlogPost
      ? { title: "Blog | AdvanseIT", description: "Insights from the AdvanseIT team." }
      : ROUTE_META["/"]);
    let html = await response.text();
 html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
html = html.replace(/<meta[^>]*name="description"[^>]*>/g, `<meta name="description" content="${meta.description}">`);
    return new Response(html, {
      status: response.status,
      headers: response.headers,
    });
  }
};
