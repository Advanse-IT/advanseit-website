import { getCookie, verifyJWT } from '../../_lib/auth.js';

export async function onRequestGet(context) {
  const { request, env } = context;
  const token = getCookie(request, 'session');
  const payload = token ? await verifyJWT(token, env.JWT_SECRET) : null;

  if (!payload) {
    return new Response(JSON.stringify({ authenticated: false }), { status: 200 });
  }

  return new Response(JSON.stringify({ authenticated: true, email: payload.email }), { status: 200 });
}
