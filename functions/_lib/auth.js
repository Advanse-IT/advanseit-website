// Minimal, dependency-free auth helpers for Cloudflare Pages Functions.
// Uses the platform's built-in Web Crypto API (available in the Workers
// runtime) rather than node-only libraries like bcrypt/jsonwebtoken, which
// don't run reliably on Cloudflare's edge runtime.

function bufToHex(buf) {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function hexToBuf(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  return bytes.buffer;
}

function base64url(input) {
  let str = typeof input === 'string' ? btoa(input) : btoa(String.fromCharCode(...new Uint8Array(input)));
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export function generateSalt() {
  return bufToHex(crypto.getRandomValues(new Uint8Array(16)));
}

export async function hashPassword(password, saltHex) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveBits']
  );
  const derived = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: hexToBuf(saltHex), iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  return bufToHex(derived);
}

export async function verifyPassword(password, saltHex, expectedHashHex) {
  const computed = await hashPassword(password, saltHex);
  // Constant-time-ish comparison
  if (computed.length !== expectedHashHex.length) return false;
  let diff = 0;
  for (let i = 0; i < computed.length; i++) diff |= computed.charCodeAt(i) ^ expectedHashHex.charCodeAt(i);
  return diff === 0;
}

async function hmacKey(secret) {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']
  );
}

export async function signJWT(payload, secret, expiresInSeconds = 60 * 60 * 24 * 7) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const body = { ...payload, iat: now, exp: now + expiresInSeconds };
  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(body));
  const data = `${encodedHeader}.${encodedPayload}`;
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return `${data}.${base64url(sig)}`;
}

export async function verifyJWT(token, secret) {
  try {
    const [encodedHeader, encodedPayload, encodedSig] = token.split('.');
    if (!encodedHeader || !encodedPayload || !encodedSig) return null;
    const data = `${encodedHeader}.${encodedPayload}`;
    const key = await hmacKey(secret);
    const valid = await crypto.subtle.verify('HMAC', key, base64urlDecode(encodedSig), new TextEncoder().encode(data));
    if (!valid) return null;
    const payload = JSON.parse(new TextDecoder().decode(base64urlDecode(encodedPayload)));
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getCookie(request, name) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function sessionCookieHeader(token, maxAgeSeconds = 60 * 60 * 24 * 7) {
  return `session=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAgeSeconds}`;
}

export function clearCookieHeader() {
  return `session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}
