/**
 * AdvanseIT Blog Scheduler
 * ─────────────────────────────────────────────────────────────────────────────
 * Runs the blog generation pipeline twice per week:
 *   • Tuesday  08:00 AEST (UTC+10) → Monday  22:00 UTC
 *   • Friday   08:00 AEST (UTC+10) → Thursday 22:00 UTC
 *
 * AEST is UTC+10 (no daylight saving in Queensland).
 * node-cron uses server-local time; the server runs in UTC, so we subtract 10h.
 *
 * Cron format: second minute hour day-of-month month day-of-week
 *   Tuesday  08:00 AEST = Monday    22:00 UTC → "0 22 * * 1"
 *   Friday   08:00 AEST = Thursday  22:00 UTC → "0 22 * * 4"
 */

import cron from "node-cron";
import { runBlogGenerationPipeline } from "./blogRouter";
import { notifyOwner } from "./_core/notification";

let schedulerStarted = false;

export function startBlogScheduler(): void {
  if (schedulerStarted) return;
  schedulerStarted = true;

  console.log("[BlogScheduler] Starting — Tuesday & Friday 08:00 AEST");

  // Tuesday 08:00 AEST = Monday 22:00 UTC
  cron.schedule("0 22 * * 1", async () => {
    console.log("[BlogScheduler] Tuesday 08:00 AEST — running generation pipeline");
    await runPipelineWithNotification();
  });

  // Friday 08:00 AEST = Thursday 22:00 UTC
  cron.schedule("0 22 * * 4", async () => {
    console.log("[BlogScheduler] Friday 08:00 AEST — running generation pipeline");
    await runPipelineWithNotification();
  });
}

async function runPipelineWithNotification(): Promise<void> {
  const startTime = Date.now();
  try {
    const result = await runBlogGenerationPipeline();
    const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);

    const summary = result.success
      ? `✅ Blog generation succeeded in ${durationSec}s\n\n` +
        `Posts created: ${result.postsCreated}\n` +
        (result.errors.length > 0 ? `Warnings: ${result.errors.join(", ")}` : "No errors.")
      : `❌ Blog generation failed in ${durationSec}s\n\nErrors:\n${result.errors.join("\n")}`;

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
