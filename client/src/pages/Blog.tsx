/* ============================================================
   AdvanseIT Blog Listing Page
   Shows published articles with cover images, category filters,
   and pagination. Matches the site's navy/cyan design system.
   ============================================================ */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearch } from "wouter";
import { Clock, Tag, ArrowRight, BookOpen, Rss, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const PLACEHOLDER_COVER = "/images/blog-placeholder.svg";

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

function BlogCard({ post, index, onCategoryClick }: { post: any; index: number; onCategoryClick: (c: string) => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative overflow-hidden aspect-[16/9]">
          <img
            src={post.coverImageUrl || PLACEHOLDER_COVER}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {post.category && (
            <button
              onClick={(e) => { e.preventDefault(); onCategoryClick(post.category); }}
              className="absolute top-3 left-3 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold px-3 py-1 rounded-full transition-colors"
            >
              {post.category}
            </button>
          )}
        </div>
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          {post.publishedAt && (
            <span>{formatDate(post.publishedAt)}</span>
          )}
          {post.readTimeMinutes && (
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.readTimeMinutes} min read
            </span>
          )}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-cyan-600 transition-colors line-clamp-2 cursor-pointer">
            {post.title}
          </h2>
        </Link>
        {post.excerpt && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
            {post.excerpt}
          </p>
        )}
        {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {(post.tags as string[]).slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Tag size={9} />
                {tag}
              </span>
            ))}
          </div>
        )}
        <Link href={`/blog/${post.slug}`}>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer">
            Read article <ArrowRight size={14} />
          </span>
        </Link>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  const search = useSearch();
  const category = new URLSearchParams(search).get("category") || undefined;
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 9;

  // Load blogs from the live blog API (Cloudflare D1 via Pages Functions)
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        // API already returns only published posts, but keep the filter as a safety net
        const published = data.filter((post: any) => post.status === "published" || !post.status);
        setAllPosts(published);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load blogs:", error);
        setAllPosts([]);
        setIsLoading(false);
      }
    };
    loadBlogs();
  }, []);

  // Filter by category if needed
  const filteredPosts = category
    ? allPosts.filter((post) => post.category === category)
    : allPosts;

  const totalPages = Math.ceil(filteredPosts.length / limit);
  const paginatedPosts = filteredPosts.slice((page - 1) * limit, page * limit);

  const setCategoryFilter = (next: string | undefined) => {
    setPage(1);
    const url = next ? `/blog?category=${encodeURIComponent(next)}` : "/blog";
    window.history.pushState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        page="blog"
        title="Blog & Insights | AdvanseIT — AI-First IT Solutions Brisbane"
        description="Expert articles on AI, web development, app development, IT staffing, and cost-effective technology solutions for Australian businesses."
        canonicalPath="/blog"
      />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0D1B2E] pt-28 pb-16 sm:pt-32 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <Rss size={14} className="text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">Insights & Articles</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              AdvanseIT <span className="text-cyan-400">Blog</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Expert insights on AI, web development, app development, IT staffing, and cost-effective technology strategies for Australian businesses.
            </p>
            {category && (
              <button
                onClick={() => setCategoryFilter(undefined)}
                className="inline-flex items-center gap-2 mt-6 bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-4 py-2 text-sm text-white transition-colors"
              >
                Filtered: <span className="font-semibold text-cyan-300">{category}</span>
                <X size={14} />
              </button>
            )}
          </motion.div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-50" style={{
          clipPath: "polygon(0 50%, 100% 0, 100% 100%, 0 100%)"
        }} />
      </section>

      {/* Blog Grid */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div className="text-center py-24">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500" />
              </div>
              <p className="text-gray-400 mt-4">Loading articles...</p>
            </div>
          ) : paginatedPosts.length === 0 ? (
            <div className="text-center py-24">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                {category ? `No articles yet in "${category}"` : "Articles coming soon"}
              </h2>
              <p className="text-gray-400 max-w-md mx-auto">
                {category
                  ? "Check back soon, or browse all articles in the meantime."
                  : "We publish new articles regularly. Check back soon for expert insights on AI, web development, and IT solutions."}
              </p>
              {category && (
                <button
                  onClick={() => setCategoryFilter(undefined)}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
                >
                  View all articles <ArrowRight size={14} />
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post, i) => (
                  <BlogCard key={post.id} post={post} index={i} onCategoryClick={setCategoryFilter} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-16">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Previous
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          p === page
                            ? "bg-cyan-500 text-white"
                            : "border border-gray-200 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
