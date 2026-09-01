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

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ success: false, error: "Invalid JSON" }, 400);
  }

  const { name, email, company, service, message, turnstileToken } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return jsonResponse({ success: false, error: "Missing required fields" }, 422);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ success: false, error: "Invalid email address" }, 422);
  }
  if (message.trim().length < 10) {
    return jsonResponse({ success: false, error: "Message too short" }, 422);
  }

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

  let emailSent = false;
  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${resendApiKey}` },
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
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${resendApiKey}` },
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

// ── Legacy static blogs.json API (kept for backward compatibility) ────────────
async function handleLegacyBlogs(request, env, pathname) {
  const headers = { "Content-Type": "application/json", "Cache-Control": "public, max-age=300" };
  const blogsReq = new Request(new URL("/blogs.json", request.url).toString());
  const blogsRes = await env.ASSETS.fetch(blogsReq);
  if (!blogsRes.ok) return new Response(JSON.stringify({ error: "Blogs not found" }), { status: 404, headers });

  const allPosts = await blogsRes.json();
  const published = allPosts.filter(p => p.status === "published")
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  const slugMatch = pathname.match(/^\/api\/blogs\/(.+)$/);
  if (slugMatch) {
    const post = published.find(p => p.slug === slugMatch[1]);
    if (!post) return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers });
    return new Response(JSON.stringify(post), { status: 200, headers });
  }

  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const limit = Math.min(20, Math.max(1, parseInt(url.searchParams.get("limit") || "9")));
  const offset = (page - 1) * limit;
  const posts = published.slice(offset, offset + limit);
  return new Response(JSON.stringify({ posts, total: published.length, page, limit }), { status: 200, headers });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

function escHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── D1-backed blog module: crypto helpers ──────────────────────────────────────
function bufToHex(buf) {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}
function hexToBuf(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  return bytes.buffer;
}
function base64url(input) {
  let str = typeof input === "string" ? btoa(input) : btoa(String.fromCharCode(...new Uint8Array(input)));
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function base64urlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
function generateSalt() {
  return bufToHex(crypto.getRandomValues(new Uint8Array(16)));
}
async function hashPassword(password, saltHex) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveBits"]);
  const derived = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: hexToBuf(saltHex), iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return bufToHex(derived);
}
async function verifyPassword(password, saltHex, expectedHashHex) {
  const computed = await hashPassword(password, saltHex);
  if (computed.length !== expectedHashHex.length) return false;
  let diff = 0;
  for (let i = 0; i < computed.length; i++) diff |= computed.charCodeAt(i) ^ expectedHashHex.charCodeAt(i);
  return diff === 0;
}
async function hmacKey(secret) {
  const enc = new TextEncoder();
  return crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
async function signJWT(payload, secret, expiresInSeconds = 60 * 60 * 24 * 7) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const body = { ...payload, iat: now, exp: now + expiresInSeconds };
  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(body));
  const data = `${encodedHeader}.${encodedPayload}`;
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return `${data}.${base64url(sig)}`;
}
async function verifyJWT(token, secret) {
  try {
    const [encodedHeader, encodedPayload, encodedSig] = token.split(".");
    if (!encodedHeader || !encodedPayload || !encodedSig) return null;
    const data = `${encodedHeader}.${encodedPayload}`;
    const key = await hmacKey(secret);
    const valid = await crypto.subtle.verify("HMAC", key, base64urlDecode(encodedSig), new TextEncoder().encode(data));
    if (!valid) return null;
    const payload = JSON.parse(new TextDecoder().decode(base64urlDecode(encodedPayload)));
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
function getCookie(request, name) {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}
function sessionCookieHeader(token, maxAgeSeconds = 60 * 60 * 24 * 7) {
  return `session=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAgeSeconds}`;
}
function clearCookieHeader() {
  return `session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}
function slugify(title) {
  return title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
function estimateReadTime(content) {
  const text = (content || "").replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
async function requireAuth(request, env) {
  const token = getCookie(request, "session");
  const payload = token ? await verifyJWT(token, env.JWT_SECRET) : null;
  return payload; // null if not authenticated
}

// ── D1-backed blog module: route handlers ──────────────────────────────────────
async function handleSetup(request, env) {
  try {
    if (!env.SETUP_KEY || request.headers.get("X-Setup-Key") !== env.SETUP_KEY) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    if (!env.DB) {
      return jsonResponse({ error: "D1 database is not bound (env.DB missing)." }, 500);
    }
    let existing;
    try {
      existing = await env.DB.prepare("SELECT id FROM admin_users LIMIT 1").first();
    } catch (dbErr) {
      return jsonResponse({ error: "Database query failed. Has the migration been run?", detail: String(dbErr) }, 500);
    }
    if (existing) {
      return jsonResponse({ error: "Admin already exists. Setup can only run once." }, 403);
    }
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: "Request body is not valid JSON." }, 400);
    }
    const { email, password } = body || {};
    if (!email || !password || password.length < 10) {
      return jsonResponse({ error: "Email and a password of at least 10 characters are required." }, 400);
    }
    const salt = generateSalt();
    const hash = await hashPassword(password, salt);
    await env.DB.prepare("INSERT INTO admin_users (email, password_hash, salt) VALUES (?, ?, ?)").bind(email, hash, salt).run();
    return jsonResponse({ ok: true }, 201);
  } catch (err) {
    return jsonResponse({ error: "Unexpected server error.", detail: String(err) }, 500);
  }
}

async function handleLogin(request, env) {
  const { email, password } = await request.json().catch(() => ({}));
  if (!email || !password) return jsonResponse({ error: "Email and password required" }, 400);

  const user = await env.DB.prepare("SELECT * FROM admin_users WHERE email = ?").bind(email).first();
  if (!user) return jsonResponse({ error: "Invalid credentials" }, 401);

  const valid = await verifyPassword(password, user.salt, user.password_hash);
  if (!valid) return jsonResponse({ error: "Invalid credentials" }, 401);

  const token = await signJWT({ sub: user.id, email: user.email }, env.JWT_SECRET);
  return new Response(JSON.stringify({ ok: true, email: user.email }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Set-Cookie": sessionCookieHeader(token) },
  });
}

async function handleLogout() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Set-Cookie": clearCookieHeader() },
  });
}

async function handleMe(request, env) {
  const payload = await requireAuth(request, env);
  if (!payload) return jsonResponse({ authenticated: false });
  return jsonResponse({ authenticated: true, email: payload.email });
}

function toCamelList(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    coverImageUrl: row.cover_image,
    category: row.category,
    tags: row.tags ? JSON.parse(row.tags) : [],
    readTimeMinutes: row.read_time_minutes,
    publishedAt: row.published_at,
    status: "published",
  };
}

async function handlePublicPostsList(request, env) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const query = category
    ? env.DB.prepare(
        `SELECT id, title, slug, excerpt, cover_image, category, tags, read_time_minutes, published_at
         FROM posts WHERE status = 'published' AND category = ? ORDER BY published_at DESC`
      ).bind(category)
    : env.DB.prepare(
        `SELECT id, title, slug, excerpt, cover_image, category, tags, read_time_minutes, published_at
         FROM posts WHERE status = 'published' ORDER BY published_at DESC`
      );
  const { results } = await query.all();
  return jsonResponse(results.map(toCamelList));
}

async function handlePublicPostBySlug(env, slug) {
  const row = await env.DB.prepare(
    `SELECT id, title, slug, excerpt, content, cover_image, category, tags, inline_images,
            meta_title, meta_description, read_time_minutes, published_at
     FROM posts WHERE slug = ? AND status = 'published'`
  ).bind(slug).first();
  if (!row) return jsonResponse({ error: "Not found" }, 404);
  return jsonResponse({
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImageUrl: row.cover_image,
    category: row.category,
    tags: row.tags ? JSON.parse(row.tags) : [],
    inlineImages: row.inline_images ? JSON.parse(row.inline_images) : [],
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    readTimeMinutes: row.read_time_minutes,
    publishedAt: row.published_at,
  });
}

async function handleAdminPostsList(env) {
  const { results } = await env.DB.prepare(
    `SELECT id, title, slug, excerpt, cover_image, category, status, published_at, updated_at
     FROM posts ORDER BY updated_at DESC`
  ).all();
  return jsonResponse({ posts: results });
}

async function handleAdminPostsCreate(request, env) {
  const body = await request.json().catch(() => ({}));
  const { title, content, excerpt, cover_image, category, tags, status, meta_title, meta_description } = body;
  if (!title || !content) return jsonResponse({ error: "Title and content are required" }, 400);

  let slug = body.slug ? slugify(body.slug) : slugify(title);
  const finalStatus = status === "published" ? "published" : "draft";
  const publishedAt = finalStatus === "published" ? new Date().toISOString() : null;
  const readTime = estimateReadTime(content);
  const tagsJson = Array.isArray(tags) ? JSON.stringify(tags) : null;

  const existing = await env.DB.prepare("SELECT id FROM posts WHERE slug = ?").bind(slug).first();
  if (existing) slug = `${slug}-${Date.now().toString(36)}`;

  const result = await env.DB.prepare(
    `INSERT INTO posts (title, slug, excerpt, content, cover_image, category, tags, meta_title, meta_description, read_time_minutes, status, published_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
  ).bind(
    title, slug, excerpt || null, content, cover_image || null, category || null,
    tagsJson, meta_title || null, meta_description || null, readTime, finalStatus, publishedAt
  ).run();

  return jsonResponse({ ok: true, id: result.meta.last_row_id, slug }, 201);
}

async function handleAdminPostGet(env, id) {
  const post = await env.DB.prepare("SELECT * FROM posts WHERE id = ?").bind(id).first();
  if (!post) return jsonResponse({ error: "Not found" }, 404);
  post.tags = post.tags ? JSON.parse(post.tags) : [];
  return jsonResponse({ post });
}

async function handleAdminPostUpdate(request, env, id) {
  const body = await request.json().catch(() => ({}));
  const { title, content, excerpt, cover_image, category, tags, status, slug, meta_title, meta_description } = body;
  if (!title || !content) return jsonResponse({ error: "Title and content are required" }, 400);

  const existingPost = await env.DB.prepare("SELECT * FROM posts WHERE id = ?").bind(id).first();
  if (!existingPost) return jsonResponse({ error: "Not found" }, 404);

  const finalStatus = status === "published" ? "published" : "draft";
  const publishedAt = finalStatus === "published" ? (existingPost.published_at || new Date().toISOString()) : existingPost.published_at;
  const readTime = estimateReadTime(content);
  const tagsJson = Array.isArray(tags) ? JSON.stringify(tags) : existingPost.tags;

  await env.DB.prepare(
    `UPDATE posts SET title = ?, slug = ?, excerpt = ?, content = ?, cover_image = ?, category = ?, tags = ?,
     meta_title = ?, meta_description = ?, read_time_minutes = ?, status = ?, published_at = ?, updated_at = datetime('now')
     WHERE id = ?`
  ).bind(
    title, slug || existingPost.slug, excerpt || null, content, cover_image || null, category || null,
    tagsJson, meta_title || null, meta_description || null, readTime, finalStatus, publishedAt, id
  ).run();

  return jsonResponse({ ok: true });
}

async function handleAdminPostDelete(env, id) {
  await env.DB.prepare("DELETE FROM posts WHERE id = ?").bind(id).run();
  return jsonResponse({ ok: true });
}

// ── Image upload (R2-backed) ────────────────────────────────────────────────
const UPLOAD_MAX_BYTES = 8 * 1024 * 1024; // 8MB
const UPLOAD_ALLOWED_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

function randomHex(bytes) {
  return Array.from(crypto.getRandomValues(new Uint8Array(bytes)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function handleImageUpload(request, env) {
  if (!env.IMAGES) {
    return jsonResponse({ error: "Image storage is not configured (R2 binding missing)." }, 500);
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse({ error: "Expected multipart/form-data with a file field." }, 400);
  }

  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return jsonResponse({ error: "No file provided." }, 400);
  }

  const ext = UPLOAD_ALLOWED_TYPES[file.type];
  if (!ext) {
    return jsonResponse({ error: "Unsupported file type. Use JPEG, PNG, WebP, or GIF." }, 400);
  }
  if (file.size > UPLOAD_MAX_BYTES) {
    return jsonResponse({ error: "File too large. Maximum size is 8MB." }, 400);
  }

  const key = `${Date.now().toString(36)}-${randomHex(8)}.${ext}`;
  const buffer = await file.arrayBuffer();
  await env.IMAGES.put(key, buffer, { httpMetadata: { contentType: file.type } });

  return jsonResponse({ ok: true, url: `/api/images/${key}` }, 201);
}

async function handleImageServe(env, key) {
  if (!env.IMAGES) {
    return new Response("Image storage is not configured.", { status: 500 });
  }
  const object = await env.IMAGES.get(key);
  if (!object) {
    return new Response("Not found", { status: 404 });
  }
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return new Response(object.body, { headers });
}

// ── D1-backed blog module: router ──────────────────────────────────────────────
async function handleBlogModule(request, env, pathname) {
  // Public, unauthenticated routes
  if (pathname === "/api/setup" && request.method === "POST") return handleSetup(request, env);
  if (pathname === "/api/auth/login" && request.method === "POST") return handleLogin(request, env);
  if (pathname === "/api/auth/logout" && request.method === "POST") return handleLogout();
  if (pathname === "/api/auth/me" && request.method === "GET") return handleMe(request, env);
  if (pathname === "/api/posts" && request.method === "GET") return handlePublicPostsList(request, env);

  const publicSlugMatch = pathname.match(/^\/api\/posts\/(.+)$/);
  if (publicSlugMatch && request.method === "GET") return handlePublicPostBySlug(env, publicSlugMatch[1]);

  // Admin routes — require a valid session
  if (pathname.startsWith("/api/admin/")) {
    const user = await requireAuth(request, env);
    if (!user) return jsonResponse({ error: "Unauthorized" }, 401);

    if (pathname === "/api/admin/posts" && request.method === "GET") return handleAdminPostsList(env);
    if (pathname === "/api/admin/posts" && request.method === "POST") return handleAdminPostsCreate(request, env);

    const adminIdMatch = pathname.match(/^\/api\/admin\/posts\/(\d+)$/);
    if (adminIdMatch) {
      const id = adminIdMatch[1];
      if (request.method === "GET") return handleAdminPostGet(env, id);
      if (request.method === "PUT") return handleAdminPostUpdate(request, env, id);
      if (request.method === "DELETE") return handleAdminPostDelete(env, id);
    }

    if (pathname === "/api/admin/upload" && request.method === "POST") return handleImageUpload(request, env);
  }

  return null; // not a blog-module route
}

// ── Main worker entry point ───────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/$/, "") || "/";

    // Contact form
    if (pathname === "/api/contact") {
      return handleContact(request, env);
    }

    // Legacy static blogs.json API (kept working for backward compatibility)
    if (pathname === "/api/blogs" || pathname.startsWith("/api/blogs/")) {
      return handleLegacyBlogs(request, env, pathname);
    }

    // Uploaded blog images (public, no auth — just serving already-uploaded files)
    const imageMatch = pathname.match(/^\/api\/images\/(.+)$/);
    if (imageMatch && request.method === "GET") {
      return handleImageServe(env, imageMatch[1]);
    }

    // New D1-backed blog module (admin login, CRUD, live /api/posts)
    if (pathname === "/api/setup" || pathname.startsWith("/api/auth/") || pathname.startsWith("/api/admin/") || pathname.startsWith("/api/posts")) {
      const blogResponse = await handleBlogModule(request, env, pathname);
      if (blogResponse) return blogResponse;
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
