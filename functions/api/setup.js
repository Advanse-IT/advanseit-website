// One-time endpoint to create the first (and only) admin account.
// Guarded by the SETUP_KEY secret (set in Cloudflare Pages env vars) and
// refuses to run again once an admin already exists.
//
// Usage (PowerShell — Invoke-RestMethod avoids curl quoting issues on Windows):
//
// $headers = @{ "Content-Type" = "application/json"; "X-Setup-Key" = "<SETUP_KEY>" }
// $body = @{ email = "you@advanseit.com.au"; password = "choose-a-strong-password" } | ConvertTo-Json
// Invoke-RestMethod -Uri "https://advanseit.com.au/api/setup" -Method Post -Headers $headers -Body $body

import { generateSalt, hashPassword } from '../_lib/auth.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    if (!env.SETUP_KEY || request.headers.get('X-Setup-Key') !== env.SETUP_KEY) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    if (!env.DB) {
      return new Response(JSON.stringify({ error: 'D1 database is not bound to this Pages project (env.DB missing).' }), { status: 500 });
    }

    let existing;
    try {
      existing = await env.DB.prepare('SELECT id FROM admin_users LIMIT 1').first();
    } catch (dbErr) {
      return new Response(JSON.stringify({ error: 'Database query failed. Has the migration (0001_init.sql) been run?', detail: String(dbErr) }), { status: 500 });
    }

    if (existing) {
      return new Response(JSON.stringify({ error: 'Admin already exists. Setup can only run once.' }), { status: 403 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Request body is not valid JSON.' }), { status: 400 });
    }

    const { email, password } = body || {};
    if (!email || !password || password.length < 10) {
      return new Response(JSON.stringify({ error: 'Email and a password of at least 10 characters are required.' }), { status: 400 });
    }

    const salt = generateSalt();
    const hash = await hashPassword(password, salt);

    await env.DB.prepare('INSERT INTO admin_users (email, password_hash, salt) VALUES (?, ?, ?)')
      .bind(email, hash, salt)
      .run();

    return new Response(JSON.stringify({ ok: true }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Unexpected server error.', detail: String(err) }), { status: 500 });
  }
}
