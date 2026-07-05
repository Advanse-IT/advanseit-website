// ── SEO route metadata ────────────────────────────────────────────────────────
const ROUTE_META = {
  "/": { title: "AdvanseIT | AI-Powered IT for Australian Business", description: "We build websites, apps & AI solutions that drive real results. Brisbane IT company trusted by Australian businesses." },
  "/services/web-design": { title: "Trusted Web Design Company Brisbane | AdvanseIT", description: "Build a strong online presence with a web design company Brisbane offering custom designs and business-focused solutions." },
  "/services/app-development": { title: "Custom Mobile App Development Company Brisbane", description: "AdvanseIT is an app development company Brisbane businesses trust for custom iOS and Android apps built for performance and growth." },
  "/services/custom-software": { title: "Custom Software Development Brisbane | AdvanseIT", description: "Replace manual processes with tailored software. AdvanseIT offers custom software development Brisbane businesses can depend on." },
  "/services/ai-solutions": { title: "Trusted AI Software Development Company Australia", description: "Build smarter systems with AI software development Company Australia experts specializing in machine learning and business automation." },
  "/services/testing": { title: "Professional Software Testing Brisbane | AdvanseIT", description: "AdvanseIT provides software testing Brisbane services including QA, automation, performance, and security testing for reliable software." },
  "/services/it-staffing": { title: "Best Outsourced IT Staffing Services | AdvanseIT", description: "Access top technology talent through outsourced IT staffing services designed to support projects, growth, and digital initiatives." },
  "/blog": { title: "Blogs & Insights — AI, Web Dev & IT | AdvanseIT", description: "Expert articles on AI, web development, and IT solutions." },
  "/blog/ai-assisted-testing-transforming-qa-australia-2026": { title: "AI-Assisted Testing: How Australian Dev Teams Ship Faster | AdvanseIT", description: "Discover how Australian development teams are using AI-assisted testing to ship faster without compromising quality. Real strategies for QA teams in 2026." },
  "/blog/agentic-ai-australia-enterprise-2026": { title: "Agentic AI for Australian Enterprise: What IT Leaders Need to Know | AdvanseIT", description: "Agentic AI is transforming Australian enterprise IT in 2026. Learn what it means, why it matters, and how to build a strategy that delivers real business value." },
  "/blog/ai-advancements-reshaping-australian-software-development-2026": { title: "AI Advancements Reshaping Australian Software Development 2026 | AdvanseIT", description: "Explore the AI advancements transforming Australian software development in 2026 — from repository intelligence to autonomous testing." },
};

// ── Contact form handler ──────────────────────────────────────────────────────
async function handleContact(request, env) {
  // CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method !== "POST") {
    return jsonResponse({ success: false, error: "Method not allowed" }, 405);
  }

  const resendApiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_TO || "admin@advanseit.com.au";
  const from = env.CONTACT_FROM || "noreply@advanseit.com.au";

  if (!resendApiKey) {
    console.error("[Contact] RESEND_API_KEY is not set");
    return jsonResponse({ success: false, error: "Email service not configured" }, 500);
  }

  // Parse body
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ success: false, error: "Invalid JSON" }, 400);
  }

  const { name, email, company, service, message, turnstileToken } = body;

  // Validate
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return jsonResponse({ success: false, error: "Missing required fields" }, 422);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ success: false, error: "Invalid email address" }, 422);
  }
  if (message.trim().length < 10) {
    return jsonResponse({ success: false, error: "Message too short" }, 422);
  }

  // Optional Turnstile verification
  if (env.TURNSTILE_SECRET_KEY && turnstileToken) {
    try {
      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: turnstileToken }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return jsonResponse({ success: false, error: "Bot verification failed" }, 403);
      }
    } catch (err) {
      console.warn("[Contact] Turnstile check failed:", err?.message);
    }
  }

  // Build email HTML
  const subject = `New Enquiry from ${name}${service ? ` — ${service}` : ""}`;
  const htmlBody = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:0;">
      <div style="background:linear-gradient(135deg,#0D1B2E 0%,#0a3d5c 100%);padding:32px 40px;border-radius:8px 8px 0 0;">
        <h1 style="color:#00C8D4;margin:0;font-size:24px;font-weight:700;">AdvanseIT</h1>
        <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:14px;">New Contact Form Submission</p>
      </div>
      <div style="background:#ffffff;padding:32px 40px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;width:120px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Name</td>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:15px;">${escHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Email</td>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:15px;">
              <a href="mailto:${escHtml(email)}" style="color:#0193CC;">${escHtml(email)}</a>
            </td>
          </tr>
          ${company ? `<tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Company</td>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:15px;">${escHtml(company)}</td>
          </tr>` : ""}
          ${service ? `<tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Service</td>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:15px;">${escHtml(service)}</td>
          </tr>` : ""}
        </table>
        <div style="margin-top:24px;">
          <p style="color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 8px;">Message</p>
          <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:16px;color:#374151;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escHtml(message)}</div>
        </div>
        <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e5e7eb;">
          <a href="mailto:${escHtml(email)}" style="display:inline-block;background:linear-gradient(135deg,#0193CC,#01D0CC);color:white;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:600;">Reply to ${escHtml(name)}</a>
        </div>
      </div>
      <p style="text-align:center;color:#9ca3af;font-size:12px;margin:16px 0;">AdvanseIT Pty Ltd · Brisbane, Queensland, Australia</p>
    </div>
  `;

  // ── 1. Send admin notification email ─────────────────────────────────────
  let emailSent = false;
  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: `AdvanseIT Website <${from}>`,
        to: [to],
        reply_to: email,
        subject,
        html: htmlBody,
        text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}${company ? `\nCompany: ${company}` : ""}${service ? `\nService: ${service}` : ""}\n\nMessage:\n${message}`,
      }),
    });

    const resendData = await resendRes.json().catch(() => ({}));
    if (resendRes.ok && resendData.id) {
      emailSent = true;
    } else {
      console.error(`[Contact] Resend admin email error ${resendRes.status}:`, JSON.stringify(resendData));
    }
  } catch (err) {
    console.error("[Contact] Resend admin email failed:", err?.message ?? err);
  }

  // ── 2. Send acknowledgement email to submitter ────────────────────────────
  const ackHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:0;">
      <div style="background:linear-gradient(135deg,#0D1B2E 0%,#0a3d5c 100%);padding:32px 40px;border-radius:8px 8px 0 0;">
        <h1 style="color:#00C8D4;margin:0;font-size:24px;font-weight:700;">AdvanseIT</h1>
        <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:14px;">We've received your message</p>
      </div>
      <div style="background:#ffffff;padding:32px 40px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none;">
        <p style="color:#111827;font-size:16px;margin:0 0 16px;">Hi ${escHtml(name)},</p>
        <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 16px;">
          Thanks for reaching out! We've received your enquiry and one of our team members will get back to you within <strong>24 hours</strong>.
        </p>
        ${service ? `<p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 24px;">You enquired about: <strong>${escHtml(service)}</strong></p>` : ""}
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-left:4px solid #00C8D4;border-radius:6px;padding:16px 20px;margin:0 0 24px;">
          <p style="color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 6px;">Your message</p>
          <p style="color:#374151;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">${escHtml(message)}</p>
        </div>
        <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 24px;">
          In the meantime, feel free to explore our services at
          <a href="https://advanseit.com.au" style="color:#0193CC;">advanseit.com.au</a>
          or call us directly on <a href="tel:+61481261679" style="color:#0193CC;">0481 261 679</a>.
        </p>
        <p style="color:#374151;font-size:15px;margin:0;">Cheers,<br><strong>The AdvanseIT Team</strong></p>
      </div>
      <p style="text-align:center;color:#9ca3af;font-size:12px;margin:16px 0;">
        AdvanseIT Pty Ltd · Brisbane, Queensland, Australia<br>
        <a href="https://advanseit.com.au" style="color:#9ca3af;">advanseit.com.au</a>
      </p>
    </div>
  `;

  try {
    const ackRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: `AdvanseIT <${from}>`,
        to: [email],
        reply_to: to,
        subject: `We've received your enquiry — AdvanseIT`,
        html: ackHtml,
        text: `Hi ${name},\n\nThanks for reaching out! We've received your enquiry and will get back to you within 24 hours.\n${service ? `\nYou enquired about: ${service}\n` : ""}\nYour message:\n${message}\n\nIn the meantime, visit us at advanseit.com.au or call 0481 261 679.\n\nCheers,\nThe AdvanseIT Team`,
      }),
    });

    const ackData = await ackRes.json().catch(() => ({}));
    if (!ackRes.ok || !ackData.id) {
      console.error(`[Contact] Resend ack email error ${ackRes.status}:`, JSON.stringify(ackData));
    }
  } catch (err) {
    console.error("[Contact] Resend ack email failed:", err?.message ?? err);
  }

  return jsonResponse({ success: true, emailSent }, 200);
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

function escHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Blog API handler ──────────────────────────────────────────────────────────
async function handleBlogs(request, env, pathname) {
  const headers = { "Content-Type": "application/json", "Cache-Control": "public, max-age=300" };

  // Fetch the static blogs.json from assets
  const blogsReq = new Request(new URL("/blogs.json", request.url).toString());
  const blogsRes = await env.ASSETS.fetch(blogsReq);
  if (!blogsRes.ok) return new Response(JSON.stringify({ error: "Blogs not found" }), { status: 404, headers });

  const allPosts = await blogsRes.json();
  const published = allPosts.filter(p => p.status === "published")
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // GET /api/blogs/:slug
  const slugMatch = pathname.match(/^\/api\/blogs\/(.+)$/);
  if (slugMatch) {
    const post = published.find(p => p.slug === slugMatch[1]);
    if (!post) return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers });
    return new Response(JSON.stringify(post), { status: 200, headers });
  }

  // GET /api/blogs?page=1&limit=9&category=Testwise
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const limit = Math.min(20, Math.max(1, parseInt(url.searchParams.get("limit") || "9")));
  const category = url.searchParams.get("category");
  
  // Filter by category if provided
  let filtered = published;
  if (category) {
    filtered = published.filter(p => p.category === category);
  }
  
  const offset = (page - 1) * limit;
  const posts = filtered.slice(offset, offset + limit);
  return new Response(JSON.stringify({ posts, total: filtered.length, page, limit }), { status: 200, headers });
}

// ── Main worker entry point ───────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/$/, "") || "/";

    // Route /api/contact to the contact handler
    if (pathname === "/api/contact") {
      return handleContact(request, env);
    }

    // Route /api/blogs and /api/blogs/:slug to the blog handler
    if (pathname === "/api/blogs" || pathname.startsWith("/api/blogs/")) {
      return handleBlogs(request, env, pathname);
    }

    // All other requests: serve static assets with SEO meta injection
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
  },
};
