import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

const ROUTE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "AdvanseIT | AI-Powered IT for Australian Business",
    description: "We build websites, apps & AI solutions that drive real results. Brisbane IT company trusted by Australian businesses. Free quotes within 24 hours.",
  },
  "/services/web-design": {
    title: "Web Design & Development Brisbane | AdvanseIT",
    description: "Professional web design and development in Brisbane. Responsive, fast, SEO-optimised websites built for Australian businesses. Fixed-price quotes.",
  },
  "/services/app-development": {
    title: "App Development Brisbane — iOS & Android | AdvanseIT",
    description: "Custom iOS and Android app development in Brisbane. We build scalable, user-friendly mobile and web applications for Australian businesses.",
  },
  "/services/custom-software": {
    title: "Custom Software Development Brisbane | AdvanseIT",
    description: "Bespoke software solutions designed for your business. AdvanseIT delivers scalable, AI-powered custom software from Brisbane. Fixed-price quotes.",
  },
  "/services/ai-solutions": {
    title: "AI Solutions & Development Brisbane | AdvanseIT",
    description: "Harness the power of AI for your business. AdvanseIT delivers AI integrations, chatbots, and machine learning solutions from Brisbane.",
  },
  "/services/testing": {
    title: "Software Testing & QA Services Brisbane | AdvanseIT",
    description: "Comprehensive software testing and QA services in Brisbane. Manual, automated, and performance testing for web and mobile applications.",
  },
  "/services/it-staffing": {
    title: "IT Staffing & Outsourcing Brisbane | AdvanseIT",
    description: "Flexible IT staffing and outsourcing solutions from Brisbane. Access skilled developers, testers, and IT professionals across Australia.",
  },
  "/blog": {
    title: "Blog & Insights — AI, Web Dev & IT | AdvanseIT",
    description: "Expert articles on AI, web development, app development, IT staffing, and cost-effective technology solutions for Australian businesses.",
  },
  "/privacy": {
    title: "Privacy Policy | AdvanseIT",
    description: "AdvanseIT's privacy policy — how we collect, use, and protect your personal information in accordance with the Australian Privacy Act.",
  },
  "/terms": {
    title: "Terms & Conditions | AdvanseIT",
    description: "Terms and conditions governing the use of AdvanseIT services and website.",
  },
  "/cookies": {
    title: "Cookie Policy | AdvanseIT",
    description: "How AdvanseIT uses cookies and similar tracking technologies on advanseit.com.au.",
  },
  "/security": {
    title: "Security & Compliance | AdvanseIT",
    description: "AdvanseIT's security practices, data protection measures, and compliance with Australian regulations.",
  },
};

function injectMeta(html: string, url: string): string {
  const isBlogPost = url.startsWith("/blog/") && url !== "/blog";

  const meta = ROUTE_META[url] ?? (isBlogPost
    ? {
        title: "Blog | AdvanseIT",
        description: "Insights and articles from the AdvanseIT team.",
      }
    : ROUTE_META["/"]);

  return html
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /<meta name="description" content=".*?">/,
      `<meta name="description" content="${meta.description}">`
    );
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  // Inject meta tags per route for crawlers
  app.use("*", (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    fs.readFile(indexPath, "utf-8", (err, html) => {
      if (err) {
        res.status(500).send("Server error");
        return;
      }
      const injected = injectMeta(html, req.originalUrl.split("?")[0]);
      res.status(200).set({ "Content-Type": "text/html" }).end(injected);
    });
  });
}
