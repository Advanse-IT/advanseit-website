# Root Cause Found & Fixed: `_worker.js` was overriding everything

## What was actually happening

Your repo has a file at `client/public/_worker.js`. This is a hand-written
Cloudflare Worker that already handled your contact form and a legacy
`/api/blogs` endpoint (reading from the static `blogs.json` file) — it was
built before our blog module work.

**Cloudflare Pages rule:** if a `_worker.js` file exists in the build
output, Cloudflare uses *only* that file for all routing and completely
ignores the `/functions` directory. That's why every `functions/api/*.js`
file we built (setup, login, posts, admin CRUD) has never actually been
live, no matter how many times you merged and deployed — Cloudflare was
silently skipping all of it in favour of `_worker.js`.

This also explains the exact errors you saw:
- `GET /api/posts` → 404 (no matching route in the old `_worker.js`, falls
  through to "serve static assets", which returns 404 for a non-existent path)
- `POST /api/setup` → 405 (same fallthrough, but static asset serving only
  allows GET/HEAD, so a POST gets rejected with 405)

## The fix

I merged all of the blog module logic (auth, D1 posts CRUD, setup) directly
into your existing `client/public/_worker.js`, alongside what was already
there. This is a single-file replacement:

- **Kept, unchanged:** the contact form handler, the legacy `/api/blogs`
  endpoint (still works, just no longer used by the frontend), and the SEO
  meta-tag injection for page titles/descriptions
- **Added:** `/api/setup`, `/api/auth/login`, `/api/auth/logout`,
  `/api/auth/me`, `/api/posts`, `/api/posts/:slug`, `/api/admin/posts`,
  `/api/admin/posts/:id` — same logic as the `functions/` files, just
  inlined into this one file since `_worker.js` can't import from
  `/functions`

The `functions/api/*.js` files from before are now dead code (Cloudflare
won't touch them while `_worker.js` exists) — harmless to leave in place,
but you can delete the `functions/` directory later if you want to tidy up.

## What to do

1. Replace `client/public/_worker.js` in your repo with the one in this zip
   (that's the only file that changed)
2. Commit and push to your branch, merge to `main`
3. Wait for the Cloudflare deploy to finish
4. In the deploy log, confirm you see `Found _worker.js in output
   directory. Uploading.` (you will — that's expected and correct now)
5. Re-run your setup command:

```powershell
$headers = @{ "Content-Type" = "application/json"; "X-Setup-Key" = "<your SETUP_KEY>" }
$body = @{ email = "admin@advanseit.com.au"; password = "<your password>" } | ConvertTo-Json
Invoke-RestMethod -Uri "https://advanseit.com.au/api/setup" -Method Post -Headers $headers -Body $body
```

This should finally return `{"ok":true}`. Your D1 database, migrations, and
secrets (`JWT_SECRET`, `SETUP_KEY`) you already set up are untouched and
still apply — this Worker reads the same `env.DB`, `env.JWT_SECRET`, and
`env.SETUP_KEY` bindings.

6. Log in at `https://advanseit.com.au/admin/login`
7. Confirm `https://advanseit.com.au/api/posts` returns a JSON array (even
   if empty, or showing your 4 seeded posts if you ran the seed migration)

## Verified locally

- `node --check` passes on the new `_worker.js`
- Full `vite build` succeeds and copies the file into `dist/public/_worker.js`
  correctly (confirmed it lands where Cloudflare expects it)
