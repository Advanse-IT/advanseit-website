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
 */

import cron from "node-cron";
import { runBlogGenerationPipeline } from "./blogRouter";
import { notifyOwner } from "./_core/notification";

let schedulerStarted = false;

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
