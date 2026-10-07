import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { config } from '@/lib/config';
import { companyAddressLines } from '@/lib/format';

export const metadata: Metadata = { title: 'Datenschutzerklärung' };

export default function Datenschutz() {
  const info = config.email.info;
  return (
    <>
      <PageHero crumb="Datenschutz" title="Datenschutzerklärung" lead="Gemäss dem Schweizer Datenschutzgesetz (DSG)" />
      <section className="section">
        <div className="wrap prose">
          <h2>Verantwortliche Stelle</h2>
          <p>{companyAddressLines().map((l, i) => <span key={i}>{l}<br /></span>)}E-Mail: <a href={`mailto:${info}`}>{info}</a></p>
          <h2>Welche Daten wir bearbeiten</h2>
          <h3>Bestellungen</h3>
          <p>Wenn Sie im Onlineshop bestellen, bearbeiten wir Name, Firma (optional), Lieferadresse, E-Mail-Adresse, Telefonnummer (optional), Ihre Bemerkungen sowie die bestellten Produkte. Wir verwenden diese Daten ausschliesslich zur Abwicklung der Bestellung, zur Zuordnung Ihrer Zahlung, für den Versand und für die Kommunikation mit Ihnen. Für den Versand geben wir Name und Adresse an die Schweizerische Post weiter.</p>
          <h3>Kontaktformular und E-Mail</h3>
          <p>Wenn Sie uns schreiben, bearbeiten wir Ihre Angaben, um Ihre Anfrage zu beantworten.</p>
          <h3>Dienstleister</h3>
          <p>Für den Betrieb der Webseite setzen wir folgende Dienstleister ein, die Daten in unserem Auftrag bearbeiten: Vercel Inc. (Hosting der Webseite), Neon Inc. (Datenbank für Bestellungen, Rechenzentrum in der EU) und Resend Inc. (Versand der Bestell-E-Mails). Dabei können Daten auch in den USA bearbeitet werden; die Übermittlung erfolgt auf Grundlage der Standardvertragsklauseln bzw. des Swiss-U.S. Data Privacy Framework. Unsere E-Mail-Postfächer werden von cyon GmbH in der Schweiz betrieben.</p>
          <h3>Server-Logdaten</h3>
          <p>Beim Besuch der Webseite werden technisch notwendige Daten (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser) verarbeitet. Diese dienen der Sicherheit und dem Betrieb der Webseite.</p>
          <h2>Cookies und Tracking</h2>
          <p>Wir verwenden ausschliesslich technisch notwendige Cookies, damit Ihr Warenkorb funktioniert. Wir setzen keine Analyse- oder Werbe-Tracker ein. Schriftarten werden von unserem eigenen Server geladen.</p>
          <h2>Aufbewahrung</h2>
          <p>Bestell- und Buchhaltungsdaten bewahren wir gemäss den gesetzlichen Aufbewahrungspflichten während zehn Jahren auf. Anfragen über das Kontaktformular löschen wir, sobald sie erledigt sind und keine Aufbewahrungspflicht besteht.</p>
          <h2>Datensicherheit</h2>
          <p>Die Webseite ist mit TLS verschlüsselt. Zahlungsdaten wie Kreditkarten werden von uns nicht erhoben, da wir nur Vorauskasse per Banküberweisung anbieten.</p>
          <h2>Ihre Rechte</h2>
          <p>Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer Personendaten sowie auf Herausgabe Ihrer Daten, soweit keine gesetzliche Aufbewahrungspflicht entgegensteht. Wenden Sie sich dazu an <a href={`mailto:${info}`}>{info}</a>. Sie können sich zudem beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) beschweren.</p>
        </div>
      </section>
    </>
  );
}
