/**
 * AdvanseIT Blog Scheduler
 * ─────────────────────────────────────────────────────────────────────────────
 * Runs the blog generation pipeline twice per week:
 *   • Tuesday   09:00 AEST (UTC+10) → Monday    23:00 UTC
 *   • Thursday  09:00 AEST (UTC+10) → Wednesday 23:00 UTC
 *
 * AEST is UTC+10 (no daylight saving in Queensland / Brisbane).
 * node-cron uses server-local time; the server runs in UTC, so we subtract 10h.
 *
 * Cron format: minute hour day-of-month month day-of-week
 *   Tuesday   09:00 AEST = Monday    23:00 UTC → "0 23 * * 1"
 *   Thursday  09:00 AEST = Wednesday 23:00 UTC → "0 23 * * 3"
 *
 * Catch-up logic: on startup, if the server was down during a scheduled window
 * (within the last 24 hours), the pipeline runs immediately to compensate.
 */

import cron from "node-cron";
import { eq, desc } from "drizzle-orm";
import { runBlogGenerationPipeline } from "./blogRouter";
import { notifyOwner } from "./_core/notification";
import { getDb } from "./db";
import { blogPosts } from "../drizzle/schema";

let schedulerStarted = false;

/**
 * Returns true if a scheduled run was missed in the last 24 hours.
 * Scheduled days (UTC): Monday=1 (Tue AEST), Wednesday=3 (Thu AEST)
 * Scheduled hour (UTC): 23
 */
function wasMissedRecently(): boolean {
  const now = new Date();
  const nowUTC = now.getTime();
  const scheduledDays = [1, 3]; // Mon=1, Wed=3 (UTC day-of-week, 0=Sun)
  const scheduledHourUTC = 23;

  // Check the last 24 hours
  for (let hoursBack = 1; hoursBack <= 24; hoursBack++) {
    const candidate = new Date(nowUTC - hoursBack * 60 * 60 * 1000);
    const dayOfWeek = candidate.getUTCDay();
    const hour = candidate.getUTCHours();
    if (scheduledDays.includes(dayOfWeek) && hour === scheduledHourUTC) {
      return true;
    }
  }
  return false;
}

/**
 * Returns true if a blog post was already published in the last 12 hours.
 * Used to avoid duplicate catch-up runs.
 */
async function hasRecentPost(): Promise<boolean> {
  try {
    const db = await getDb();
    if (!db) return false;
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
    const recent = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(1);
    if (recent.length === 0) return false;
    // Check if the latest post was published in the last 12 hours
    const latest = await db
      .select({ publishedAt: blogPosts.publishedAt })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(1);
    if (!latest[0]?.publishedAt) return false;
    return new Date(latest[0].publishedAt).getTime() > twelveHoursAgo.getTime();
  } catch {
    return false;
  }
}

export function startBlogScheduler(): void {
  if (schedulerStarted) return;
  schedulerStarted = true;

  console.log("[BlogScheduler] Starting — Tuesday & Thursday 09:00 AEST (Brisbane)");

  // Tuesday 09:00 AEST = Monday 23:00 UTC
  cron.schedule("0 23 * * 1", async () => {
    console.log("[BlogScheduler] Tuesday 09:00 AEST — running generation pipeline");
    await runPipelineWithNotification();
  });

  // Thursday 09:00 AEST = Wednesday 23:00 UTC
  cron.schedule("0 23 * * 3", async () => {
    console.log("[BlogScheduler] Thursday 09:00 AEST — running generation pipeline");
    await runPipelineWithNotification();
  });

  // Catch-up: run on startup if a scheduled window was missed in the last 24h
  // and no post was already published in the last 12h
  setTimeout(async () => {
    if (!wasMissedRecently()) return;
    const alreadyPublished = await hasRecentPost();
    if (alreadyPublished) {
      console.log("[BlogScheduler] Catch-up check: recent post found, skipping.");
      return;
    }
    console.log("[BlogScheduler] Catch-up: missed scheduled run detected — running pipeline now");
    await runPipelineWithNotification("catch-up");
  }, 10_000); // 10s delay to let the server fully initialise
}

async function runPipelineWithNotification(label = "scheduled"): Promise<void> {
  const startTime = Date.now();
  try {
    const result = await runBlogGenerationPipeline();
    const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);

    const summary = result.success
      ? `✅ Blog generation (${label}) succeeded in ${durationSec}s\n\n` +
        `Posts created: ${result.postsCreated}\n` +
        (result.errors.length > 0 ? `Warnings: ${result.errors.join(", ")}` : "No errors.")
      : `❌ Blog generation (${label}) failed in ${durationSec}s\n\nErrors:\n${result.errors.join("\n")}`;

    console.log("[BlogScheduler]", summary);

    await notifyOwner({
      title: result.success
        ? `📝 Blog: ${result.postsCreated} new article(s) generated`
        : "⚠️ Blog generation failed",
      content: summary,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[BlogScheduler] Unhandled error:", msg);
    await notifyOwner({
      title: "🚨 Blog scheduler crashed",
      content: `Unhandled error during blog generation:\n\n${msg}`,
    }).catch(() => {/* ignore notification failures */});
  }
}

/**
 * Manually trigger the pipeline (for testing or admin use).
 * Exported so the tRPC `blog.generate` mutation can call it directly.
 */
export { runBlogGenerationPipeline } from "./blogRouter";
