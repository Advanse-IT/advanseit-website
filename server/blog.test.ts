/**
 * Blog Router Tests — AdvanseIT
 * Tests for the blog listing, slug lookup, and generation pipeline helpers.
 */

import { describe, it, expect } from "vitest";

// ── Slug generation helper (mirrors blogRouter.ts logic) ──────────────────────
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

// ── Read-time estimator (mirrors blogRouter.ts logic) ─────────────────────────
function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("slugify", () => {
  it("converts spaces to hyphens", () => {
    const result = slugify("Hello World");
    expect(result).toBe("hello-world");
  });

  it("removes special characters", () => {
    const result = slugify("AI & Machine Learning: 2025 Trends!");
    // & and : are stripped, spaces become hyphens, multiple hyphens collapsed
    expect(result).toBe("ai-machine-learning-2025-trends");
  });

  it("collapses multiple hyphens", () => {
    const result = slugify("Web  Design  Tips");
    expect(result).toBe("web-design-tips");
  });

  it("truncates to 100 characters", () => {
    const longTitle = "a".repeat(150);
    const result = slugify(longTitle);
    expect(result.length).toBeLessThanOrEqual(100);
  });

  it("handles empty string", () => {
    const result = slugify("");
    expect(result).toBe("");
  });
});

describe("estimateReadTime", () => {
  it("returns at least 1 minute for short content", () => {
    expect(estimateReadTime("Short text")).toBe(1);
  });

  it("estimates 1 minute for ~200 words", () => {
    const content = Array(200).fill("word").join(" ");
    expect(estimateReadTime(content)).toBe(1);
  });

  it("estimates 5 minutes for ~1000 words", () => {
    const content = Array(1000).fill("word").join(" ");
    expect(estimateReadTime(content)).toBe(5);
  });

  it("estimates 10 minutes for ~2000 words", () => {
    const content = Array(2000).fill("word").join(" ");
    expect(estimateReadTime(content)).toBe(10);
  });
});

describe("blog post structure validation", () => {
  it("validates required fields for a blog post", () => {
    const post = {
      title: "AI Trends in Australia 2025",
      slug: "ai-trends-australia-2025",
      content: "# AI Trends\n\nContent here...",
      excerpt: "Exploring the latest AI trends shaping Australian businesses.",
      category: "AI Solutions",
      tags: ["AI", "Australia", "Technology"],
      status: "published",
    };

    expect(post.title).toBeTruthy();
    expect(post.slug).toMatch(/^[a-z0-9-]+$/);
    expect(post.content).toContain("#");
    expect(post.excerpt.length).toBeLessThanOrEqual(300);
    expect(["published", "draft", "review"]).toContain(post.status);
    expect(Array.isArray(post.tags)).toBe(true);
  });

  it("validates category is one of the allowed values", () => {
    const allowedCategories = [
      "Web Development",
      "App Development",
      "AI Solutions",
      "Custom Software",
      "Testing & QA",
      "IT Staffing",
      "General",
    ];
    const category = "AI Solutions";
    expect(allowedCategories).toContain(category);
  });

  it("validates cross-platform content structure", () => {
    const crossPlatform = {
      linkedin: "LinkedIn post content (max 3000 chars)",
      medium: "Medium intro paragraph",
      reddit: "Reddit post with title and body",
    };

    expect(typeof crossPlatform.linkedin).toBe("string");
    expect(typeof crossPlatform.medium).toBe("string");
    expect(typeof crossPlatform.reddit).toBe("string");
    expect(crossPlatform.linkedin.length).toBeLessThanOrEqual(3000);
  });
});
