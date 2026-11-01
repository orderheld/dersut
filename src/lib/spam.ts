import 'server-only';
import { one } from './db';

/**
 * Spamschutz für Kontakt- und Anfrageformulare, ganz ohne Drittanbieter.
 * Erkannter Spam wird nicht gemailt und nicht gepusht, sondern still im Admin unter «Spam» abgelegt
 * (der Absender sieht trotzdem «gesendet», damit Bots nichts dazulernen).
 */

/** Absender-Domains, die nachweislich Werbe-Spam über das Formular schicken. */
const BLOCKED_DOMAINS = [
  'amazingleadgen.com', 'ultraleadgeneration.com', 'boostleadgen.com', 'firstleadgen.com',
  'zeroshift.live', 'iamreena.chatgpt.site',
];

/** Typische Wörter aus Werbe- und Akquise-Spam (meist Englisch). Jeder Treffer zählt einen Punkt. */
const SPAM_PHRASES: RegExp[] = [
  /\blead ?gen/i,
  /\bleads?\b/i,
  /contact form/i,
  /digital marketing/i,
  /\bseo\b/i,
  /social media/i,
  /paid advertising|\badvertis(e|ing)\b/i,
  /marketing services?|our services|service portfolio/i,
  /website owners?|site owners?/i,
  /\boutreach\b/i,
  /decision[- ]makers?/i,
  /\b(14|7|30) days? free|free trial|no (credit )?card (is )?needed/i,
  /\bai (voice )?agent|our ai\b/i,
  /book(s)? (the|an) appointment/i,
  /grow your business|more customers|rank(ing)? (higher|on google)|first page of google/i,
  /i (just )?(visited|came across) (your website|dersut)/i,
  /\b(introduce|share) our\b/i,
  /\bbacklinks?\b|guest post/i,
  /\b(usd|\$\s?\d)/i,
  /web ?design|website redesign|app development/i,
  /crypto|bitcoin|casino|loan offer/i,
];

/** Abmeldelinks gibt es nur in Massenwerbung, nie in echten Kundenanfragen. */
const OPT_OUT = /unsubscribe|opt[- ]?out|not interested\?|not a fit\?|not for you\?/i;
const LINK = /https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|io|live|site|biz|info|co|xyz|ai|app)\b/i;

export type SpamInput = { name: string; email: string; company: string; message: string; startedAt: string; ip: string };

/** Gibt den Grund zurück, falls die Nachricht nach Spam aussieht, sonst einen leeren Text. */
export async function spamReason(v: SpamInput): Promise<string> {
  const text = `${v.name}\n${v.company}\n${v.message}`;
  const domain = v.email.split('@')[1]?.toLowerCase() ?? '';

  if (BLOCKED_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`) || text.toLowerCase().includes(d))) return 'Bekannter Spam-Absender';
  if (OPT_OUT.test(v.message)) return 'Abmeldelink (Massenwerbung)';

  // Mindest-Ausfüllzeit: Das Formular setzt beim Öffnen einen Zeitstempel. Bots schicken sofort oder ohne.
  const started = Number(v.startedAt);
  const secs = (Date.now() - started) / 1000;
  if (!started) return 'Ohne Browser gesendet';
  if (secs < 4) return 'Zu schnell ausgefüllt';

  let score = SPAM_PHRASES.reduce((n, re) => n + (re.test(text) ? 1 : 0), 0);
  if (LINK.test(v.message)) score += 2;
  if (/dersutkaffee\.ch|dersut\.ch/i.test(v.message)) score += 1; // «I visited dersutkaffee.ch …»
  if (score >= 3) return `Werbetext erkannt (${score} Punkte)`;

  // Rate-Limit: höchstens 3 Nachrichten pro Stunde von derselben Adresse
  if (v.ip && v.ip !== '0.0.0.0') {
    const r = await one<{ n: number }>(`SELECT COUNT(*)::int AS n FROM messages WHERE ip = $1 AND created_at > now() - interval '1 hour'`, [v.ip]);
    if ((r?.n ?? 0) >= 3) return 'Zu viele Nachrichten in kurzer Zeit';
  }
  return '';
}
