import 'server-only';
import webpush from 'web-push';
import { config } from './config';
import { one, query } from './db';

export type PushMessage = { title: string; body: string; url: string; tag?: string };

let keys: Promise<{ publicKey: string; privateKey: string }> | null = null;

/**
 * VAPID-Schlüssel für Web Push. Aus VAPID_PUBLIC_KEY/VAPID_PRIVATE_KEY, sonst einmalig erzeugt
 * und in der Datenbank abgelegt, damit nichts zusätzlich in Vercel eingetragen werden muss.
 */
export function vapidKeys(): Promise<{ publicKey: string; privateKey: string }> {
  if (!keys) {
    keys = (async () => {
      const envPub = process.env.VAPID_PUBLIC_KEY, envPriv = process.env.VAPID_PRIVATE_KEY;
      if (envPub && envPriv) return { publicKey: envPub, privateKey: envPriv };
      const row = await one<{ value: string }>(`SELECT value FROM app_settings WHERE key = 'vapid'`);
      if (row) return JSON.parse(row.value);
      const fresh = webpush.generateVAPIDKeys();
      // Bei gleichzeitigen Aufrufen gewinnt der erste Eintrag; danach erneut lesen
      await query(`INSERT INTO app_settings (key, value) VALUES ('vapid', $1) ON CONFLICT (key) DO NOTHING`, [JSON.stringify(fresh)]);
      const saved = await one<{ value: string }>(`SELECT value FROM app_settings WHERE key = 'vapid'`);
      return JSON.parse(saved!.value);
    })().catch((e) => {
      keys = null;
      throw e;
    });
  }
  return keys;
}

export async function savePushSubscription(adminId: number, sub: { endpoint: string; keys: { p256dh: string; auth: string } }, device: string): Promise<void> {
  await query(
    `INSERT INTO push_subscriptions (admin_id, endpoint, p256dh, auth, device) VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (endpoint) DO UPDATE SET admin_id = EXCLUDED.admin_id, p256dh = EXCLUDED.p256dh, auth = EXCLUDED.auth, device = EXCLUDED.device`,
    [adminId, sub.endpoint, sub.keys.p256dh, sub.keys.auth, device.slice(0, 200)],
  );
}

export async function removePushSubscription(adminId: number, endpoint: string): Promise<void> {
  await query('DELETE FROM push_subscriptions WHERE admin_id = $1 AND endpoint = $2', [adminId, endpoint]);
}

/** Schickt eine Benachrichtigung an alle registrierten Admin-Geräte. Fehler bremsen nie die Bestellung. */
export async function notifyAdmins(msg: PushMessage, adminId?: number): Promise<number> {
  try {
    const subs = await query<{ id: number; endpoint: string; p256dh: string; auth: string }>(
      adminId ? 'SELECT id, endpoint, p256dh, auth FROM push_subscriptions WHERE admin_id = $1' : 'SELECT id, endpoint, p256dh, auth FROM push_subscriptions',
      adminId ? [adminId] : [],
    );
    if (!subs.length) return 0;
    const { publicKey, privateKey } = await vapidKeys();
    const opts = { vapidDetails: { subject: `mailto:${config.email.orders}`, publicKey, privateKey }, TTL: 60 * 60 * 24, urgency: 'high' as const };
    const payload = JSON.stringify(msg);
    let sent = 0;
    await Promise.all(
      subs.map(async (s) => {
        try {
          await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload, opts);
          sent++;
        } catch (e) {
          const code = (e as { statusCode?: number }).statusCode;
          // Gerät abgemeldet oder Abo abgelaufen: Eintrag entfernen
          if (code === 404 || code === 410) await query('DELETE FROM push_subscriptions WHERE id = $1', [s.id]);
          else console.error('Push fehlgeschlagen:', code ?? e);
        }
      }),
    );
    return sent;
  } catch (e) {
    console.error('Push-Versand fehlgeschlagen:', e);
    return 0;
  }
}
