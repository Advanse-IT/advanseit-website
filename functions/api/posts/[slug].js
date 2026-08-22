export async function onRequestGet(context) {
  const { env, params } = context;

  const row = await env.DB.prepare(
    `SELECT id, title, slug, excerpt, content, cover_image, category, tags, inline_images,
            meta_title, meta_description, read_time_minutes, published_at
     FROM posts WHERE slug = ? AND status = 'published'`
  ).bind(params.slug).first();

  if (!row) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }

  const post = {
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
  };

  // Returns the post object directly — matches what BlogPost.tsx expects
  return new Response(JSON.stringify(post), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
