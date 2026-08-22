function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function estimateReadTime(content) {
  // Strip HTML tags before counting words (content is now HTML from the rich text editor)
  const text = (content || '').replace(/<[^>]*>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function onRequestGet(context) {
  const { env } = context;
  const { results } = await env.DB.prepare(
    `SELECT id, title, slug, excerpt, cover_image, category, status, published_at, updated_at
     FROM posts ORDER BY updated_at DESC`
  ).all();

  return new Response(JSON.stringify({ posts: results }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json().catch(() => ({}));
  const { title, content, excerpt, cover_image, category, tags, status, meta_title, meta_description } = body;

  if (!title || !content) {
    return new Response(JSON.stringify({ error: 'Title and content are required' }), { status: 400 });
  }

  let slug = body.slug ? slugify(body.slug) : slugify(title);
  const finalStatus = status === 'published' ? 'published' : 'draft';
  const publishedAt = finalStatus === 'published' ? new Date().toISOString() : null;
  const readTime = estimateReadTime(content);
  const tagsJson = Array.isArray(tags) ? JSON.stringify(tags) : null;

  const existing = await env.DB.prepare('SELECT id FROM posts WHERE slug = ?').bind(slug).first();
  if (existing) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  const result = await env.DB.prepare(
    `INSERT INTO posts (title, slug, excerpt, content, cover_image, category, tags, meta_title, meta_description, read_time_minutes, status, published_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
  ).bind(
    title, slug, excerpt || null, content, cover_image || null, category || null,
    tagsJson, meta_title || null, meta_description || null, readTime, finalStatus, publishedAt
  ).run();

  return new Response(JSON.stringify({ ok: true, id: result.meta.last_row_id, slug }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
