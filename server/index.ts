import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import compression from "compression";
import cors from "cors";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { createContext } from "./_core/context";
import { logger } from "./_core/logger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Gzip compression (dev server; Cloudflare handles this in production)
  app.use(compression());

  // CORS — allow same-origin + training subdomain
  const allowedOrigins = process.env.NODE_ENV === "production"
    ? ["https://advanseit.com.au", "https://www.advanseit.com.au", "https://training.advanseit.com.au"]
    : ["http://localhost:3000", "http://localhost:5173", "http://localhost:3001"];

  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));
  app.use(express.json());

  // Rate limiting — protects contact form and blog endpoints from abuse
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 60,                   // 60 requests per window per IP
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many requests. Please try again in 15 minutes." },
    skip: (req) => req.method === "GET", // Only rate-limit mutations
  });

  const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,                    // 5 contact form submits per hour per IP
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many contact requests. Please try again later." },
  });

  app.use("/api/trpc", apiLimiter);
  app.use("/api/trpc/contact", contactLimiter);

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
      onError: ({ error, path }) => {
        if (error.code === "INTERNAL_SERVER_ERROR") {
          logger.error(`[tRPC] Unhandled error on ${path ?? "unknown"}`, {
            message: error.message,
          });
        }
      },
    })
  );

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    logger.info(`AdvanseIT main server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
