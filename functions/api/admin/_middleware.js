import { getCookie, verifyJWT } from '../../_lib/auth.js';

export async function onRequest(context) {
  const { request, env, next } = context;
  const token = getCookie(request, 'session');
  const payload = token ? await verifyJWT(token, env.JWT_SECRET) : null;

  if (!payload) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  // Make the authenticated user available to downstream handlers.
  context.data.user = payload;
  return next();
}
