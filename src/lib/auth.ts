import 'server-only';
import { cookies, headers } from 'next/headers';
import { createHmac, randomBytes, scrypt as _scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { query, one } from './db';

const scrypt = promisify(_scrypt) as (pw: string, salt: string, len: number) => Promise<Buffer>;
const COOKIE = 'dersut_admin';
const MAX_AGE = 60 * 60 * 12; // 12 Stunden

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 24) throw new Error('SESSION_SECRET fehlt oder ist zu kurz (mind. 24 Zeichen).');
  return s;
}

export async function hashPassword(pw: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const hash = await scrypt(pw, salt, 64);
  return `scrypt$${salt}$${hash.toString('hex')}`;
}

export async function verifyPassword(pw: string, stored: string): Promise<boolean> {
  const [, salt, hex] = stored.split('$');
  if (!salt || !hex) return false;
  const hash = await scrypt(pw, salt, 64);
  const expected = Buffer.from(hex, 'hex');
  return expected.length === hash.length && timingSafeEqual(expected, hash);
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

export async function createSession(adminId: number): Promise<void> {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = `${adminId}.${exp}`;
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

export type Admin = { id: number; email: string };

export async function currentAdmin(): Promise<Admin | null> {
  const v = (await cookies()).get(COOKIE)?.value;
  if (!v) return null;
  const [id, exp, sig] = v.split('.');
  if (!id || !exp || !sig) return null;
  const expected = sign(`${id}.${exp}`);
  if (expected.length !== sig.length || !timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return null;
  if (Number(exp) < Date.now() / 1000) return null;
  return one<Admin>('SELECT id, email FROM admins WHERE id = $1', [Number(id)]);
}

export async function hasAdmins(): Promise<boolean> {
  const r = await one<{ n: number }>('SELECT COUNT(*)::int AS n FROM admins');
  return (r?.n ?? 0) > 0;
}

export async function clientIp(): Promise<string> {
  const h = await headers();
  return (h.get('x-forwarded-for') ?? '').split(',')[0].trim() || h.get('x-real-ip') || '0.0.0.0';
}

export async function tooManyAttempts(ip: string): Promise<boolean> {
  await query(`DELETE FROM login_attempts WHERE at < now() - interval '15 minutes'`);
  const r = await one<{ n: number }>('SELECT COUNT(*)::int AS n FROM login_attempts WHERE ip = $1', [ip]);
  return (r?.n ?? 0) >= 8;
}

export async function recordFailedAttempt(ip: string): Promise<void> {
  await query('INSERT INTO login_attempts (ip) VALUES ($1)', [ip]);
}

export async function clearAttempts(ip: string): Promise<void> {
  await query('DELETE FROM login_attempts WHERE ip = $1', [ip]);
}

/* ---------- Passwort vergessen ---------- */

const RESET_TTL = 30 * 60; // 30 Minuten

/** Reset-Link-Token: an E-Mail und aktuellen Passwort-Hash gebunden, dadurch nur einmal gültig. */
function resetSig(email: string, exp: number, currentHash: string): string {
  return sign(`reset:${email}:${exp}:${currentHash}`);
}

async function currentHashFor(email: string): Promise<string> {
  const row = await one<{ password_hash: string }>('SELECT password_hash FROM admins WHERE email = $1', [email]);
  return row?.password_hash ?? 'neu';
}

export async function createResetToken(email: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + RESET_TTL;
  const e = Buffer.from(email).toString('base64url');
  return `${e}.${exp}.${resetSig(email, exp, await currentHashFor(email))}`;
}

/** Prüft ein Reset-Token und liefert die E-Mail-Adresse, oder null. */
export async function verifyResetToken(token: string): Promise<string | null> {
  const [e, expRaw, sig] = (token ?? '').split('.');
  if (!e || !expRaw || !sig) return null;
  const exp = Number(expRaw);
  if (!exp || exp < Date.now() / 1000) return null;
  const email = Buffer.from(e, 'base64url').toString();
  const expected = Buffer.from(resetSig(email, exp, await currentHashFor(email)));
  const given = Buffer.from(sig);
  return expected.length === given.length && timingSafeEqual(expected, given) ? email : null;
}
