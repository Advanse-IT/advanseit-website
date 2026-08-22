# AdvanseIT Blog Module — Complete Setup Instructions

Since none of this has been applied yet, this is the full sequence
end-to-end. Same free-tier Cloudflare Pages + D1 pattern used for
drskhatri.com.au — no Express/MySQL/OAuth needed.

## What's included

- **Backend:** `functions/` — D1-backed auth + full blog CRUD API (Pages
  Functions, no server needed)
- **Database:** `migrations/` — schema, your 4 existing posts (migrated
  from `client/public/blogs.json`), and a `meta_title` column
- **Admin UI:** `client/src/pages/admin/` — login, dashboard, and a post
  editor with a rich text editor (headings, bold/italic, lists, links,
  images), Meta Title, Meta Description, Tags/Keywords, Featured Image,
  and URL Slug fields
- **Public blog pages:** `client/src/pages/Blog.tsx` and `BlogPost.tsx` —
  updated to read live from the database instead of the static
  `blogs.json` file
- **Config:** `wrangler.toml` (D1 binding), `client/public/_redirects`
  (fixed to avoid a known Cloudflare false-positive build error),
  `package.json` / lockfiles (added `@tiptap/*` and `dompurify`)

**Not touched:** the old `server/`, tRPC blog router, Manus OAuth login,
and `functions/api/contact.js` are untouched. They were already
non-functional on Cloudflare Pages (it can't run a persistent Express
server), so nothing that currently works is being removed.

## 1. Merge the code

Copy everything in this zip into your local clone of
`Advanse-IT/advanseit-website`, preserving folder structure, then:

```
git checkout -b feature/blog-module
git add .
git commit -m "Add blog module with admin login, rich text editor, and SEO fields"
git push origin feature/blog-module
```
Merge as usual — Cloudflare Pages auto-deploys.

Note: this repo uses pnpm (`packageManager` field in `package.json`), so
Cloudflare will install with pnpm automatically — no lockfile mismatch
issue like the plain-npm Dr Khatri repo had.

## 2. Create the D1 database

```
npm install -g wrangler
wrangler login
wrangler d1 create advanseit-blog
```
Copy the `database_id` it prints, paste it into `wrangler.toml` in place
of `REPLACE_WITH_D1_DATABASE_ID`, commit and push.

## 3. Run all three migrations

```
wrangler d1 execute advanseit-blog --remote --file=./migrations/0001_init.sql
wrangler d1 execute advanseit-blog --remote --file=./migrations/0002_seed_posts.sql
wrangler d1 execute advanseit-blog --remote --file=./migrations/0003_add_meta_title.sql
```
The second command loads your 4 existing posts so nothing is lost.

## 4. Set environment variables/secrets (Cloudflare Dashboard)

Pages project → **Settings** → **Environment variables** (add as **Secrets**):

| Name | Value |
|---|---|
| `JWT_SECRET` | long random string (e.g. `openssl rand -hex 32`) |
| `SETUP_KEY` | another long random string — used once to create your admin login |

Add both to **Production**, then trigger a redeploy.

## 5. Create your admin account (one-time)

On Windows, use PowerShell's `Invoke-RestMethod` (avoids `curl.exe` JSON
quoting issues you hit last time):

```powershell
$headers = @{
    "Content-Type" = "application/json"
    "X-Setup-Key"  = "<your SETUP_KEY>"
}
$body = @{
    email    = "you@advanseit.com.au"
    password = "choose-a-strong-password"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://advanseit.com.au/api/setup" -Method Post -Headers $headers -Body $body
```
This endpoint refuses to run again once an admin exists.

## 6. Log in and manage posts

Go to `https://advanseit.com.au/admin/login`. You'll land on a dashboard
listing all posts (including the 4 migrated ones). The editor gives you:

- A rich text toolbar (headings, bold, italic, lists, quotes, links, images)
- **Meta Title** (SEO/browser tab title — falls back to the post title if left blank)
- **Meta Description** (with a 160-character guide)
- **Tags / Keywords** (comma-separated)
- **Featured Image** (URL, with a live preview)
- **URL Slug / Permalink** (auto-generated from the title, editable)

Published posts appear at `https://advanseit.com.au/blog` automatically.

## Notes

- **Legacy content format:** the 4 migrated posts are stored as Markdown;
  new posts from the rich text editor save as HTML. The public blog pages
  detect and render both correctly. If you open one of the original 4 in
  the new editor, you'll see raw Markdown text (asterisks, hashes) rather
  than formatted content — just reformat and re-save once and it becomes
  proper HTML from then on.
- **Images:** cover/featured images and in-editor images are pasted by
  URL — no upload pipeline in this version. Can be added later via
  Cloudflare R2 (also free tier) if wanted.
- **AI auto-generation** (the old scheduled LLM + image-gen pipeline) was
  intentionally dropped — this is manual create/edit only, per your request.
- Everything (Pages, Functions, D1) stays within Cloudflare's free tier at
  this traffic level.
