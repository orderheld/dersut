import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { PageHero } from '@/components/PageHero';
import { config } from '@/lib/config';
import { chf, ibanFormat } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Versand & Zahlung',
  description: 'Lieferung in die ganze Schweiz mit der Post für CHF 9.–. Zahlung per Vorauskasse (Banküberweisung).',
};

export default function Versand() {
  const days = config.shop.paymentDays;
  const yy = String(new Date().getFullYear()).slice(2);
  return (
    <>
      <PageHero crumb="Versand & Zahlung" eyebrow="Service" title="Versand & Zahlung" lead="Einfach, transparent und sicher: Lieferung in die ganze Schweiz für pauschal CHF 9.–, Zahlung per Vorauskasse." />
      <section className="section">
        <div className="wrap">
          <ol className="howto" style={{ marginBottom: 80 }}>
            <li><span className="howto__icon"><Icon name="bag" /></span><h3>Bestellen</h3><p>Sie schliessen Ihre Bestellung ab und erhalten sofort eine Bestellnummer sowie eine E-Mail mit allen Zahlungsangaben.</p></li>
            <li><span className="howto__icon"><Icon name="bank" /></span><h3>Überweisen</h3><p>Sie überweisen den Gesamtbetrag innert {days} Tagen und geben dabei Ihre Bestellnummer an. Am einfachsten mit dem QR-Code in Ihrer Banking-App.</p></li>
            <li><span className="howto__icon"><Icon name="truck" /></span><h3>Erhalten</h3><p>Sobald Ihre Zahlung eingegangen ist, versenden wir mit der Post und senden Ihnen die Versandbestätigung.</p></li>
          </ol>
          <div className="faq">
            <details open><summary>Was kostet der Versand?</summary><div><p>Der Versand mit der Schweizerischen Post kostet pauschal {chf(config.shop.shipping)} pro Bestellung, unabhängig von der Menge. Wir liefern an Adressen in der ganzen Schweiz.</p></div></details>
            <details><summary>Welche Zahlungsarten gibt es?</summary><div><p>Wir bieten ausschliesslich Vorauskasse per Banküberweisung an. So müssen Sie keine Kartendaten angeben, und wir halten die Preise tief.</p></div></details>
            <details><summary>Wohin überweise ich den Betrag?</summary><div>
              <p>Kontoinhaber: <strong>{config.bank.holder}</strong><br />Bank: {config.bank.bank}<br />IBAN: <strong>{ibanFormat(config.bank.iban)}</strong></p>
              <p>Bitte geben Sie im Mitteilungsfeld unbedingt Ihre Bestellnummer an (z. B. «{config.shop.orderPrefix}-{yy}-1001»), damit wir Ihre Zahlung zuordnen können.</p>
            </div></details>
            <details><summary>Wann wird meine Bestellung versendet?</summary><div><p>Sobald Ihre Zahlung auf unserem Konto eingegangen ist, in der Regel innert 1 bis 2 Arbeitstagen. Eine Banküberweisung innerhalb der Schweiz dauert meist 1 Arbeitstag. Sie erhalten eine E-Mail, wenn Ihre Zahlung verbucht ist und wenn das Paket unterwegs ist.</p></div></details>
            <details><summary>Was passiert, wenn ich nicht bezahle?</summary><div><p>Geht innert {days} Tagen keine Zahlung ein, behalten wir uns vor, die Bestellung zu stornieren. Es entstehen Ihnen dadurch keine Kosten.</p></div></details>
            <details><summary>Sind die Preise inklusive Mehrwertsteuer?</summary><div><p>Ja, alle Preise verstehen sich in Schweizer Franken inklusive der gesetzlichen Mehrwertsteuer von {config.shop.vatRate} %.</p></div></details>
            <details><summary>Kann ich auch ins Ausland bestellen?</summary><div><p>Derzeit liefern wir ausschliesslich an Adressen in der Schweiz.</p></div></details>
            <details><summary>Wie bewahre ich die Bohnen am besten auf?</summary><div><p>Kühl, trocken und lichtgeschützt, die Packung nach dem Öffnen gut verschliessen. Für das beste Aroma die Bohnen erst kurz vor der Zubereitung mahlen.</p></div></details>
          </div>
        </div>
      </section>
    </>
  );
}
