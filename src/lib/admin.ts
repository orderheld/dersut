import 'server-only';
import { redirect } from 'next/navigation';
import { currentAdmin, hasAdmins, type Admin } from './auth';

/** Für alle Admin-Seiten und -Aktionen: leitet ohne Anmeldung zum Login weiter. */
export async function requireAdmin(): Promise<Admin> {
  const a = await currentAdmin();
  if (a) return a;
  redirect((await hasAdmins()) ? '/admin/login' : '/admin/setup');
}

/** Kurze Meldungen nach einer Aktion, per ?ok=code in der URL. */
export const FLASH: Record<string, string> = {
  paid: 'Als bezahlt markiert.',
  paid_mail: 'Als bezahlt markiert. Der Kunde wurde per E-Mail informiert.',
  shipped: 'Als versendet markiert.',
  shipped_mail: 'Als versendet markiert. Der Kunde wurde per E-Mail informiert.',
  cancelled: 'Bestellung storniert.',
  cancelled_mail: 'Bestellung storniert. Der Kunde wurde per E-Mail informiert.',
  open: 'Status auf «Zahlung ausstehend» zurückgesetzt.',
  mail_failed: 'Status gespeichert, aber die E-Mail an den Kunden konnte nicht gesendet werden. Bitte RESEND_API_KEY prüfen.',
  resent: 'E-Mail erneut gesendet.',
  resend_failed: 'Die E-Mail konnte nicht gesendet werden. Bitte RESEND_API_KEY prüfen.',
  tracking: 'Sendungsnummer gespeichert.',
  note: 'Notiz gespeichert.',
  bulk: 'Ausgewählte Bestellungen aktualisiert.',
  bulk_none: 'Bitte zuerst Bestellungen auswählen.',
  saved: 'Produkt gespeichert.',
  welcome: 'Willkommen! Ihr Admin-Konto ist eingerichtet.',
};
