const ROUTE_META = {
  "/": { title: "AdvanseIT | AI-Powered IT for Australian Business", description: "We build websites, apps & AI solutions that drive real results. Brisbane IT company trusted by Australian businesses." },
  "/services/web-design": { title: "Web Design & Development Brisbane | AdvanseITs", description: "Professional web design and development in Brisbane. Responsive, fast, SEO-optimised websites." },
  "/services/app-development": { title: "App Development Brisbane — iOS & Android | AdvanseIT", description: "Custom iOS and Android app development in Brisbane." },
  "/services/custom-software": { title: "Custom Software Development Brisbane | AdvanseIT", description: "Bespoke software solutions designed for your business." },
  "/services/ai-solutions": { title: "AI Solutions & Development Brisbane | AdvanseIT", description: "Harness the power of AI for your business." },
  "/services/testing": { title: "Software Testing & QA Services Brisbane | AdvanseIT", description: "Comprehensive software testing and QA services in Brisbane." },
  "/services/it-staffing": { title: "IT Staffing & Outsourcing Brisbane | AdvanseIT", description: "Flexible IT staffing and outsourcing solutions from Brisbane." },
  "/blog": { title: "Blog & Insights — AI, Web Dev & IT | AdvanseIT", description: "Expert articles on AI, web development, and IT solutions." },
  "/privacy": { title: "Privacy Policy | AdvanseIT", description: "AdvanseIT privacy policy." },
  "/terms": { title: "Terms & Conditions | AdvanseIT", description: "Terms and conditions for AdvanseIT services." },
  "/cookies": { title: "Cookie Policy | AdvanseIT", description: "How AdvanseIT uses cookies." },
  "/security": { title: "Security & Compliance | AdvanseIT", description: "AdvanseIT security practices." },
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;
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
    html = html.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${meta.description}">`);
    return new Response(html, {
      status: response.status,
      headers: response.headers,
    });
  }
};
