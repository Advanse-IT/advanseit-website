import { z } from "zod";
import { eq, desc, and, sql } from "drizzle-orm";
import { getDb } from "./db";
import { blogPosts, InsertBlogPost } from "../drizzle/schema";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { invokeLLM } from "./_core/llm";
import { generateImage } from "./_core/imageGeneration";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100)
    + "-" + nanoid(6);
}

function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// ─── Topic generators ────────────────────────────────────────────────────────

/** Generates a fresh, specific test automation topic relevant to the current date */
async function fetchTestAutomationTopic(): Promise<string> {
  const today = new Date().toLocaleDateString("en-AU", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const prompt = `You are a content strategist for AdvanseIT, an Australian IT company in Brisbane.
Today's date: ${today}

Generate ONE highly specific, currently relevant blog topic about software test automation.
The topic should:
1. Be specific — not generic (e.g. "How to use AI to auto-heal Selenium locators in 2025" not just "Test automation")
2. Be relevant to Java, Selenium, TestNG, Cucumber, REST Assured, CI/CD, or AI-powered testing
3. Appeal to QA engineers, test leads, and developers in Australia
4. Have strong SEO potential for Australian searches
5. Be different from common evergreen topics — think about what is trending RIGHT NOW

Return as JSON with a single "topic" string field.`;

  const response = await invokeLLM({
    messages: [{ role: "user", content: prompt }],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "test_automation_topic",
        strict: true,
        schema: {
          type: "object",
          properties: { topic: { type: "string" } },
          required: ["topic"],
          additionalProperties: false,
        },
      },
    },
  });

  const rawContent = response.choices?.[0]?.message?.content;
  const content = typeof rawContent === "string" ? rawContent : null;
  if (!content) return "AI-Powered Test Automation with Java Selenium in 2025";
  try {
    const parsed = JSON.parse(content);
    return parsed.topic ?? "AI-Powered Test Automation with Java Selenium in 2025";
  } catch {
    return "AI-Powered Test Automation with Java Selenium in 2025";
  }
}

/** Generates a trending IT/tech topic for Australian business audiences */
async function fetchTrendingITTopic(): Promise<string> {
  const today = new Date().toLocaleDateString("en-AU", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const prompt = `You are a content strategist for AdvanseIT, an Australian IT company in Brisbane specialising in web design, app development, AI solutions, and IT staffing.
Today's date: ${today}

Generate ONE highly specific, currently trending blog topic about IT or technology for Australian businesses.
The topic should:
1. Be trending RIGHT NOW in the Australian IT/tech market (think about recent industry news, new tools, regulatory changes, AI developments)
2. Appeal to business owners, CTOs, and IT managers in Australia
3. Align with at least one of: web development, app development, AI/automation, cloud, cybersecurity, digital transformation, or IT outsourcing
4. Have strong SEO potential for Australian searches
5. Be specific and timely — not a generic evergreen topic

Return as JSON with a single "topic" string field.`;

  const response = await invokeLLM({
    messages: [{ role: "user", content: prompt }],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "trending_it_topic",
        strict: true,
        schema: {
          type: "object",
          properties: { topic: { type: "string" } },
          required: ["topic"],
          additionalProperties: false,
        },
      },
    },
  });

  const rawContent = response.choices?.[0]?.message?.content;
  const content = typeof rawContent === "string" ? rawContent : null;
  if (!content) return "How Australian Businesses Are Using AI to Cut IT Costs in 2025";
  try {
    const parsed = JSON.parse(content);
    return parsed.topic ?? "How Australian Businesses Are Using AI to Cut IT Costs in 2025";
  } catch {
    return "How Australian Businesses Are Using AI to Cut IT Costs in 2025";
  }
}

// ─── Article generator ────────────────────────────────────────────────────────

async function generateArticle(topic: string, isTestAutomation = false): Promise<{
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  metaDescription: string;
  linkedinPost: string;
  mediumIntro: string;
  redditPost: string;
  imagePrompts: { coverPrompt: string; inlinePrompts: Array<{ prompt: string; caption: string; altText: string }> };
}> {
  const trainingInstructions = isTestAutomation
    ? `
- This is a TEST AUTOMATION article. You MUST include a dedicated section (H2 or H3) promoting AdvanseIT's Java Selenium & AI Test Automation Training program. The section should:
  - Mention that AdvanseIT runs live, instructor-led Java Selenium training for Australian QA engineers and developers
  - Include a Markdown hyperlink to the training site: [AdvanseIT Java Selenium Training](https://training.advanseit.com.au/)
  - Mention key details: 60 live sessions, 9 weeks, Brisbane in-person + online across Australia, two plans (Live Class AUD $399, Recording Only AUD $249)
  - Feel natural and helpful, not like an ad — position it as a resource for readers who want to upskill
- The LinkedIn post for this article MUST also include a link to https://training.advanseit.com.au/ and mention the training program`
    : "";

  const prompt = `You are a senior technology writer for AdvanseIT, an Australian IT company in Brisbane.

Write a comprehensive, high-quality blog article about: "${topic}"

The article should:
- Be 800–1200 words
- Use Markdown formatting with H2/H3 headings, bullet points, and bold text
- Include practical, actionable advice for Australian businesses
- Reference Australian market context where relevant
- Naturally mention AdvanseIT's expertise (web design, app development, AI, testing, IT staffing) without being overly promotional
- End with a subtle CTA to contact AdvanseIT at https://advanseit.com.au/contact
- Be SEO-optimised for Australian searches${trainingInstructions}

Also generate:
1. A LinkedIn post (150–200 words, hook-first, 3–5 hashtags, professional tone)
2. A Medium intro paragraph (100 words, engaging, sets up the full article)
3. A Reddit post (conversational, community-aware, no hard selling, 150 words)
4. An image generation prompt for the COVER IMAGE (detailed, photorealistic or abstract tech visual, 1200x630 landscape)
5. Three inline image prompts with captions for images within the article

Return as JSON matching the schema exactly.`;

  const response = await invokeLLM({
    messages: [{ role: "user", content: prompt }],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "article",
        strict: true,
        schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            excerpt: { type: "string" },
            content: { type: "string" },
            category: { type: "string" },
            tags: { type: "array", items: { type: "string" } },
            metaDescription: { type: "string" },
            linkedinPost: { type: "string" },
            mediumIntro: { type: "string" },
            redditPost: { type: "string" },
            imagePrompts: {
              type: "object",
              properties: {
                coverPrompt: { type: "string" },
                inlinePrompts: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      prompt: { type: "string" },
                      caption: { type: "string" },
                      altText: { type: "string" },
                    },
                    required: ["prompt", "caption", "altText"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["coverPrompt", "inlinePrompts"],
              additionalProperties: false,
            },
          },
          required: ["title", "excerpt", "content", "category", "tags", "metaDescription", "linkedinPost", "mediumIntro", "redditPost", "imagePrompts"],
          additionalProperties: false,
        },
      },
    },
  });

  const rawContent = response.choices?.[0]?.message?.content;
  const content = typeof rawContent === "string" ? rawContent : null;
  if (!content) throw new Error("LLM returned no content");

  return JSON.parse(content);
}

// ─── Image uploader ───────────────────────────────────────────────────────────

async function generateAndUploadImage(prompt: string, label: string): Promise<string | null> {
  try {
    const result = await generateImage({ prompt });
    const url = result?.url;
    if (!url) return null;
    // Fetch the image and upload to S3
    const res = await fetch(url);
    const buffer = Buffer.from(await res.arrayBuffer());
    const key = `blog-images/${nanoid()}-${label}.jpg`;
    const { url: s3Url } = await storagePut(key, buffer, "image/jpeg");
    return s3Url;
  } catch (err) {
    console.error(`[Blog] Image generation failed for "${label}":`, err);
    return null;
  }
}

// ─── Full pipeline ────────────────────────────────────────────────────────────

export async function runBlogGenerationPipeline(topicOverride?: string): Promise<{ success: boolean; postsCreated: number; errors: string[] }> {
  const errors: string[] = [];
  let postsCreated = 0;

  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // 1. Determine topics: always 1 test automation + 1 trending IT topic
    let topicsToProcess: Array<{ topic: string; isTestAutomation: boolean }>;
    if (topicOverride) {
      topicsToProcess = [{ topic: topicOverride, isTestAutomation: false }];
    } else {
      console.log("[Blog] Fetching test automation topic...");
      const testTopic = await fetchTestAutomationTopic();
      console.log("[Blog] Fetching trending IT topic...");
      const trendingTopic = await fetchTrendingITTopic();
      topicsToProcess = [
        { topic: testTopic, isTestAutomation: true },
        { topic: trendingTopic, isTestAutomation: false },
      ];
    }

    for (const { topic, isTestAutomation } of topicsToProcess) {
      try {
        console.log(`[Blog] Generating article for topic: "${topic}" (isTestAutomation: ${isTestAutomation})`);

        // 2. Generate article content
        const article = await generateArticle(topic, isTestAutomation);

        // 3. Generate cover image
        console.log(`[Blog] Generating cover image for: "${article.title}"`);
        const coverImageUrl = await generateAndUploadImage(
          article.imagePrompts.coverPrompt,
          "cover"
        );

        // 4. Generate inline images (up to 3)
        const inlineImages: Array<{ url: string; caption: string; altText: string }> = [];
        for (const imgPrompt of article.imagePrompts.inlinePrompts.slice(0, 3)) {
          const url = await generateAndUploadImage(imgPrompt.prompt, "inline");
          if (url) {
            inlineImages.push({ url, caption: imgPrompt.caption, altText: imgPrompt.altText });
          }
        }

        // 5. Save to database — auto-publish immediately
        const slug = slugify(article.title);
        const post: InsertBlogPost = {
          slug,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          coverImageUrl: coverImageUrl ?? undefined,
          inlineImages: inlineImages.length > 0 ? inlineImages : undefined,
          category: article.category,
          tags: article.tags,
          status: "published",
          publishedAt: new Date(),
          aiGenerated: true,
          trendingTopic: topic,
          linkedinPost: article.linkedinPost,
          mediumIntro: article.mediumIntro,
          redditPost: article.redditPost,
          metaDescription: article.metaDescription.slice(0, 160),
          readTimeMinutes: estimateReadTime(article.content),
        };

        await db.insert(blogPosts).values(post);
        postsCreated++;
        console.log(`[Blog] Created post: "${article.title}" (slug: ${slug})`);

      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`[Blog] Failed to generate article for topic "${topic}":`, msg);
        errors.push(`Topic "${topic}": ${msg}`);
      }
    }

    return { success: true, postsCreated, errors };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, postsCreated, errors: [msg] };
  }
}

// ─── tRPC Router ─────────────────────────────────────────────────────────────

export const blogRouter = router({
  /** Public: list published posts (paginated) */
  list: publicProcedure
    .input(z.object({ page: z.number().min(1).default(1), limit: z.number().min(1).max(20).default(9) }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { posts: [], total: 0 };
      const page = input?.page ?? 1;
      const limit = input?.limit ?? 9;
      const offset = (page - 1) * limit;

      const posts = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.status, "published"))
        .orderBy(desc(blogPosts.publishedAt))
        .limit(limit)
        .offset(offset);

      const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(blogPosts)
        .where(eq(blogPosts.status, "published"));

      return { posts, total: Number(count) };
    }),

  /** Public: get single post by slug */
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const [post] = await db
        .select()
        .from(blogPosts)
        .where(and(eq(blogPosts.slug, input.slug), eq(blogPosts.status, "published")))
        .limit(1);

      if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      return post;
    }),

  /** Public: get recent posts (for homepage widget) */
  recent: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(6).default(3) }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      return db
        .select({
          id: blogPosts.id,
          slug: blogPosts.slug,
          title: blogPosts.title,
          excerpt: blogPosts.excerpt,
          coverImageUrl: blogPosts.coverImageUrl,
          category: blogPosts.category,
          tags: blogPosts.tags,
          readTimeMinutes: blogPosts.readTimeMinutes,
          publishedAt: blogPosts.publishedAt,
        })
        .from(blogPosts)
        .where(eq(blogPosts.status, "published"))
        .orderBy(desc(blogPosts.publishedAt))
        .limit(input?.limit ?? 3);
    }),

  /** Admin: list all posts including drafts and review */
  adminList: protectedProcedure
    .query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) return [];
      return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    }),

  /** Admin: publish a post */
  publish: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db
        .update(blogPosts)
        .set({ status: "published", publishedAt: new Date() })
        .where(eq(blogPosts.id, input.id));
      return { success: true };
    }),

  /** Admin: reject/delete a post */
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.delete(blogPosts).where(eq(blogPosts.id, input.id));
      return { success: true };
    }),

  /** Admin: manually trigger article generation */
  generate: protectedProcedure
    .input(z.object({ topic: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const result = await runBlogGenerationPipeline(input.topic);
      return result;
    }),

  /** Admin: get cross-platform repurposing content for a post */
  repurposingContent: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, input.id)).limit(1);
      if (!post) throw new TRPCError({ code: "NOT_FOUND" });
      return {
        linkedin: post.linkedinPost,
        medium: post.mediumIntro,
        reddit: post.redditPost,
        title: post.title,
        slug: post.slug,
        tags: post.tags,
      };
    }),
});
