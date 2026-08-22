import { verifyPassword, signJWT, sessionCookieHeader } from '../../_lib/auth.js';

export async function onRequestPost(context) {
  const { request, env } = context;
  const { email, password } = await request.json().catch(() => ({}));

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password required' }), { status: 400 });
  }

  const user = await env.DB.prepare('SELECT * FROM admin_users WHERE email = ?').bind(email).first();
  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  }

  const valid = await verifyPassword(password, user.salt, user.password_hash);
  if (!valid) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  }

  const token = await signJWT({ sub: user.id, email: user.email }, env.JWT_SECRET);

  return new Response(JSON.stringify({ ok: true, email: user.email }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': sessionCookieHeader(token),
    },
  });
}
