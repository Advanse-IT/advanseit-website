function toCamel(row) {
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
    status: 'published',
  };
}

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const category = url.searchParams.get('category');

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

  // Returns a raw array — matches the shape the frontend previously got from /blogs.json
  return new Response(JSON.stringify(results.map(toCamel)), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
