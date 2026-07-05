import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, Tag, ArrowLeft, Calendar, Share2, Linkedin, Twitter } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import ReadingProgress from "@/components/ReadingProgress";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";

  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;
    setIsLoading(true);
    
    // Fetch from static blogs.json
    fetch("/blogs.json")
      .then(r => { if (!r.ok) throw new Error("Not found"); return r.json(); })
      .then(data => {
        const found = data.find((post: any) => post.slug === slug);
        if (!found) throw new Error("Post not found");
        setPost(found);
        setError(null);
      })
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500" />
          <p className="text-gray-400 mt-4">Loading article...</p>
        </div>
      </div>
    );

  if (error || !post)
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-32 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article not found</h1>
          <p className="text-gray-500 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog">
            <a className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold">
              <ArrowLeft size={16} />
              Back to blog
            </a>
          </Link>
        </div>
        <Footer />
      </div>
    );

  const shareUrl = `https://advanseit.com.au/blog/${slug}`;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{post.title} | AdvanseIT Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <ReadingProgress />
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/blog">
            <a className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 hover:text-cyan-700 mb-8">
              <ArrowLeft size={14} />
              Back to blog
            </a>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {post.category && (
              <div className="inline-block mb-4">
                <span className="bg-cyan-100 text-cyan-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(post.publishedAt).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </span>
              {post.readTimeMinutes && (
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {post.readTimeMinutes} min read
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImageUrl && (
        <div className="mb-12">
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-a:text-cyan-600 prose-a:underline prose-strong:font-bold prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-ul:list-disc prose-ol:list-decimal prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:pl-4 prose-blockquote:italic"
          >
            <ReactMarkdown>{post.content || ""}</ReactMarkdown>
          </motion.div>

          {/* Inline Images */}
          {post.inlineImages && post.inlineImages.length > 0 && (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              {post.inlineImages.map((img: any, i: number) => (
                <figure key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.altText || ""}
                    className="w-full h-auto object-cover"
                  />
                  {img.caption && (
                    <figcaption className="p-4 text-sm text-gray-600 bg-gray-50">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Share this article</h3>
            <div className="flex gap-3">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-cyan-400 hover:text-cyan-600 transition-colors"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-cyan-400 hover:text-cyan-600 transition-colors"
              >
                <Twitter size={16} />
                Twitter
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
