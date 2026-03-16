/* ============================================================
   AdvanseIT Blog Listing Page
   Shows published articles with cover images, category filters,
   and pagination. Matches the site's navy/cyan design system.
   ============================================================ */

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Clock, Tag, ArrowRight, BookOpen, Rss } from "lucide-react";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const PLACEHOLDER_COVER = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80";

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

function BlogCard({ post, index }: { post: any; index: number }) {
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
            <span className="absolute top-3 left-3 bg-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {post.category}
            </span>
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
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, isLoading } = trpc.blog.list.useQuery({ page, limit });
  const posts = data?.posts ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        page="blog"
        title="Blog & Insights | AdvanseIT — AI-First IT Solutions Brisbane"
        description="Expert articles on AI, web development, app development, IT staffing, and cost-effective technology solutions for Australian businesses."
      />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0D1B2E] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <Rss size={14} className="text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">Insights & Articles</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AdvanseIT <span className="text-cyan-400">Blog</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Expert insights on AI, web development, app development, IT staffing, and cost-effective technology strategies for Australian businesses.
            </p>
          </motion.div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Blog grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
                <div className="aspect-[16/9] bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-5 bg-gray-200 rounded w-4/5" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Articles coming soon</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              We publish new articles every Tuesday and Friday. Check back soon for expert insights on AI, web development, and IT solutions.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:border-cyan-400 hover:text-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      page === i + 1
                        ? "bg-cyan-500 text-white"
                        : "border border-gray-200 text-gray-600 hover:border-cyan-400 hover:text-cyan-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:border-cyan-400 hover:text-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
