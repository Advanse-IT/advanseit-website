/**
 * Minimal structured logger — AdvanseIT server
 *
 * In production (NODE_ENV=production): only warn + error are emitted.
 * In development: all levels are printed.
 *
 * Usage:
 *   import { logger } from "./_core/logger";
 *   logger.info("[Blog] Post created");
 *   logger.warn("[SMTP] Not configured");
 *   logger.error("[DB] Connection failed", err);
 */

const isProd = process.env.NODE_ENV === "production";

function fmt(level: string, msg: string, meta?: unknown): string {
  const ts = new Date().toISOString();
  return meta !== undefined
    ? `${ts} [${level}] ${msg} ${JSON.stringify(meta)}`
    : `${ts} [${level}] ${msg}`;
}

export const logger = {
  /** Debug info — silenced in production */
  info: (msg: string, meta?: unknown) => {
    if (!isProd) console.log(fmt("INFO", msg, meta));
  },
  /** Warnings — always printed */
  warn: (msg: string, meta?: unknown) => {
    console.warn(fmt("WARN", msg, meta));
  },
  /** Errors — always printed */
  error: (msg: string, meta?: unknown) => {
    console.error(fmt("ERROR", msg, meta));
  },
};
