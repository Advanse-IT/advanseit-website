/**
 * One-off script to manually trigger the blog generation pipeline.
 * Run with: npx tsx scripts/trigger-blog.mjs
 */
import "dotenv/config";

// Patch console.log to always flush
const origLog = console.log.bind(console);
const origError = console.error.bind(console);
console.log = (...args) => { origLog(...args); };
console.error = (...args) => { origError(...args); };

origLog("[ManualTrigger] Environment check:");
origLog("  DATABASE_URL:", process.env.DATABASE_URL ? `SET (${process.env.DATABASE_URL.length} chars)` : "NOT SET");
origLog("  BUILT_IN_FORGE_API_KEY:", process.env.BUILT_IN_FORGE_API_KEY ? "SET" : "NOT SET");
origLog("  BUILT_IN_FORGE_API_URL:", process.env.BUILT_IN_FORGE_API_URL || "NOT SET");

origLog("[ManualTrigger] Importing runBlogGenerationPipeline...");

const { runBlogGenerationPipeline } = await import("../server/blogRouter.ts");

origLog("[ManualTrigger] Starting blog generation pipeline...");
const start = Date.now();

try {
  const result = await runBlogGenerationPipeline();
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  if (result.success) {
    origLog(`[ManualTrigger] ✅ Success in ${elapsed}s — ${result.postsCreated} post(s) created`);
    if (result.errors.length > 0) {
      origLog("[ManualTrigger] Warnings:", result.errors.join(", "));
    }
  } else {
    origError(`[ManualTrigger] ❌ Failed in ${elapsed}s`);
    origError("[ManualTrigger] Errors:", result.errors.join("\n"));
  }
  process.exit(result.success ? 0 : 1);
} catch (err) {
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  origError(`[ManualTrigger] 💥 Crashed in ${elapsed}s:`, err);
  process.exit(1);
}
