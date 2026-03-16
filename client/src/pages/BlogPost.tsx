/* ============================================================
   AdvanseIT Blog Post Page
   Displays a single article with cover image, inline images,
   rich markdown content, and cross-platform share links.
   ============================================================ */

import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, Tag, ArrowLeft, Calendar, Share2, Linkedin, Twitter } from "lucide-react";
import { Streamdown } from "streamdown";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://advanseit.com.au";

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ShareButton({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:border-cyan-400 hover:text-cyan-600 transition-colors"
    >
      {icon}
      {label}
    </a>
  );
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";

  const { data: post, isLoading, error } = trpc.blog.bySlug.useQuery({ slug }, { enabled: !!slug });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 py-32 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-8" />
          <div className="aspect-[16/9] bg-gray-200 rounded-2xl mb-8" />
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded mb-3" />
          ))}
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 py-32 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <p className="text-gray-500 mb-8">This article may have been moved or doesn't exist.</p>
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-cyan-600 font-semibold hover:text-cyan-700 cursor-pointer">
              <ArrowLeft size={16} /> Back to Blog
            </span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}&via=AdvanseIT`;

  // Parse inline images
  type InlineImage = { url: string; caption: string; altText: string };
  let inlineImages: InlineImage[] = [];
  try {
    if (post.inlineImages) {
      const raw = typeof post.inlineImages === "string"
        ? JSON.parse(post.inlineImages)
        : post.inlineImages;
      inlineImages = Array.isArray(raw) ? (raw as InlineImage[]) : [];
    }
  } catch {
    inlineImages = [];
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": postUrl,
    headline: post.title,
    description: post.excerpt ?? "",
    url: postUrl,
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
    author: {
      "@type": "Organization",
      name: "AdvanseIT",
      url: "https://advanseit.com.au",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://advanseit.com.au/#organization",
      name: "AdvanseIT",
      logo: {
        "@type": "ImageObject",
        url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663374153263/ZQDItgJAIEmNJbOO.png",
      },
    },
    image: post.coverImageUrl
      ? { "@type": "ImageObject", url: post.coverImageUrl, width: 1200, height: 630 }
      : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    keywords: Array.isArray(post.tags) ? post.tags.join(", ") : (post.tags ?? ""),
    articleSection: post.category ?? "Technology",
    inLanguage: "en-AU",
    isPartOf: { "@id": "https://advanseit.com.au/#website" },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{post.title} | AdvanseIT Blog</title>
        <meta name="description" content={post.excerpt ?? ""} />
        <meta name="author" content="AdvanseIT" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="AdvanseIT" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt ?? ""} />
        <meta property="og:url" content={postUrl} />
        {post.coverImageUrl && <meta property="og:image" content={post.coverImageUrl} />}
        {post.coverImageUrl && <meta property="og:image:width" content="1200" />}
        {post.coverImageUrl && <meta property="og:image:height" content="630" />}
        <meta property="og:locale" content="en_AU" />
        {post.publishedAt && <meta property="article:published_time" content={new Date(post.publishedAt).toISOString()} />}
        {post.updatedAt && <meta property="article:modified_time" content={new Date(post.updatedAt).toISOString()} />}
        <meta property="article:publisher" content="https://www.linkedin.com/company/advanseit" />
        <meta property="article:section" content={post.category ?? "Technology"} />
        {/* Twitter / X Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AdvanseIT" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt ?? ""} />
        {post.coverImageUrl && <meta name="twitter:image" content={post.coverImageUrl} />}
        <link rel="canonical" href={postUrl} />
        {/* Article JSON-LD for AI grounding */}
        <script type="application/ld+json">{JSON.stringify(articleSchema, null, 2)}</script>
      </Helmet>

      <Navbar />

      {/* Hero cover */}
      {post.coverImageUrl && (
        <div className="w-full h-64 md:h-96 overflow-hidden relative">
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/80 via-transparent to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link href="/blog">
          <span className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-600 transition-colors cursor-pointer mb-8">
            <ArrowLeft size={14} /> Back to Blog
          </span>
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Category badge */}
          {post.category && (
            <span className="inline-block bg-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6 pb-6 border-b border-gray-100">
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {formatDate(post.publishedAt)}
              </span>
            )}
            {post.readTimeMinutes && (
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {post.readTimeMinutes} min read
              </span>
            )}
          </div>

          {/* Tags */}
          {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {(post.tags as string[]).map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Article content */}
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-cyan-600 prose-strong:text-gray-800 prose-code:text-cyan-700 prose-code:bg-cyan-50 prose-code:px-1 prose-code:rounded prose-pre:bg-gray-900 prose-blockquote:border-cyan-400 prose-blockquote:text-gray-600">
            <Streamdown>{post.content}</Streamdown>
          </div>

          {/* Inline images gallery */}
          {inlineImages.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Related Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inlineImages.map((img, i) => (
                  <figure key={i} className="m-0">
                    <img
                      src={img.url}
                      alt={img.altText || `Illustration ${i + 1} for ${post.title}`}
                      className="w-full rounded-xl object-cover aspect-video"
                      loading="lazy"
                    />
                    {img.caption && (
                      <figcaption className="text-xs text-gray-400 text-center mt-2">{img.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          )}

          {/* Share section */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Share2 size={14} />
                Share this article:
              </span>
              <ShareButton
                href={linkedinShareUrl}
                label="LinkedIn"
                icon={<Linkedin size={14} />}
              />
              <ShareButton
                href={twitterShareUrl}
                label="X / Twitter"
                icon={<Twitter size={14} />}
              />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-[#0D1B2E] to-[#1a2f4e] rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Ready to transform your business with AI-first IT?</h3>
            <p className="text-gray-300 text-sm mb-6">
              AdvanseIT delivers cost-effective web, app, AI, and staffing solutions from Brisbane.
            </p>
            <Link href="/#contact">
              <span className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer">
                Get a Free Consultation
              </span>
            </Link>
          </div>
        </motion.article>
      </div>

      <Footer />
    </div>
  );
}
