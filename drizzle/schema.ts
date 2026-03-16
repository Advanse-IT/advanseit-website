import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Blog posts table — stores AI-generated and manually authored articles.
 * Each post has a cover image, inline images (JSON array), and cross-platform
 * repurposing content for LinkedIn, Medium, and Reddit.
 */
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  /** URL-friendly slug, e.g. "ai-first-approach-cuts-costs-2025" */
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 512 }).notNull(),
  /** Brief 1–2 sentence summary shown in listing cards */
  excerpt: text("excerpt"),
  /** Full article body in Markdown */
  content: text("content").notNull(),
  /** CDN URL of the AI-generated cover image (1200×630) */
  coverImageUrl: varchar("coverImageUrl", { length: 1024 }),
  /** JSON array of { url, caption, altText } objects for inline images */
  inlineImages: json("inlineImages").$type<Array<{ url: string; caption: string; altText: string }>>(),
  /** Primary topic/category tag */
  category: varchar("category", { length: 128 }),
  /** JSON array of tag strings, e.g. ["AI", "Brisbane", "Cost Optimisation"] */
  tags: json("tags").$type<string[]>(),
  /** draft | review | published */
  status: mysqlEnum("status", ["draft", "review", "published"]).default("draft").notNull(),
  /** Whether this post was AI-generated (vs manually authored) */
  aiGenerated: boolean("aiGenerated").default(false).notNull(),
  /** Trending topic or keyword that triggered this article */
  trendingTopic: varchar("trendingTopic", { length: 512 }),
  /** LinkedIn post variant (shorter, hook-first) */
  linkedinPost: text("linkedinPost"),
  /** Medium intro paragraph variant */
  mediumIntro: text("mediumIntro"),
  /** Reddit post body (conversational, community-aware) */
  redditPost: text("redditPost"),
  /** SEO meta description (max 160 chars) */
  metaDescription: varchar("metaDescription", { length: 160 }),
  /** Estimated read time in minutes */
  readTimeMinutes: int("readTimeMinutes"),
  /** When the post was or should be published */
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;
