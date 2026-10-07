import 'server-only';
import { Resend } from 'resend';
import { config } from './config';

/**
 * Versendet eine E-Mail über Resend.
 * Ohne RESEND_API_KEY (lokal) wird die E-Mail nur in der Konsole protokolliert.
 */
export type MailOpts = { to: string; subject: string; html: string; replyTo?: string };
export type MailResult = { ok: boolean; error?: string };

export async function sendMail(opts: MailOpts): Promise<boolean> {
  return (await deliverMail(opts)).ok;
}

/** Wie sendMail, liefert bei einem Fehler aber den Grund (z. B. von Resend) zurück. */
export async function deliverMail(opts: MailOpts): Promise<MailResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info(`[E-Mail nicht gesendet, RESEND_API_KEY fehlt] an ${opts.to}: ${opts.subject}`);
    if (process.env.MAIL_DUMP_DIR) {
      const { writeFile, mkdir } = await import('node:fs/promises');
      await mkdir(process.env.MAIL_DUMP_DIR, { recursive: true });
      const name = `${Date.now()}-${opts.subject.replace(/\W+/g, '_')}.html`;
      await writeFile(`${process.env.MAIL_DUMP_DIR}/${name}`, opts.html);
      return { ok: true }; // lokaler Test: als Datei «zugestellt»
    }
    return { ok: false, error: 'RESEND_API_KEY ist nicht gesetzt' };
  }
  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: config.email.from,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: htmlToText(opts.html),
      replyTo: opts.replyTo,
    });
    if (error) {
      console.error('Resend-Fehler:', error);
      return { ok: false, error: `Resend: ${error.message || error.name || 'unbekannter Fehler'}` };
    }
    return { ok: true };
  } catch (e) {
    console.error('E-Mail-Versand fehlgeschlagen:', e);
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

function htmlToText(html: string): string {
  return html
    .replace(/<(style|head)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<br\s*\/?>|<\/(p|div|tr|h[1-6]|li)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .trim();
}
