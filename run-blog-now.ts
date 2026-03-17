import "dotenv/config";
import { runBlogGenerationPipeline } from "./server/blogRouter";

const topic = "How Australian SMEs Can Use AI to Cut IT Costs in 2026";
console.log("[BlogTrigger] Starting pipeline with topic:", topic);
const start = Date.now();

const result = await runBlogGenerationPipeline(topic);
const elapsed = ((Date.now() - start) / 1000).toFixed(1);

if (result.success) {
  console.log(`[BlogTrigger] ✅ Done in ${elapsed}s — ${result.postsCreated} post(s) created`);
  if (result.errors.length > 0) console.log("[BlogTrigger] Warnings:", result.errors);
} else {
  console.error(`[BlogTrigger] ❌ Failed in ${elapsed}s — Errors:`, result.errors);
}
process.exit(0);
