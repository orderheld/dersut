import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { PageHero } from '@/components/PageHero';
import { brand } from '@/lib/brand';
import { config } from '@/lib/config';
import { companyAddressLines, ibanFormat } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Offizieller Vertrieb Schweiz',
  description: 'Dersut Kaffee GmbH ist der offizielle Vertriebspartner von Dersut Caffè in der Schweiz.',
};

export default function Vertrieb() {
  const c = config.company;
  return (
    <>
      <PageHero img={brand('img_1')} crumb="Offizieller Vertrieb Schweiz" eyebrow="Distributore ufficiale · Svizzera" title={<>Offizieller Vertrieb<br /><em>von Dersut in der Schweiz</em></>} lead={`${c.name} hat den Vertrieb von Dersut Caffè für die Schweiz übernommen. Für Sie heisst das: Originalware, direkt aus Conegliano, mit Schweizer Service.`} />

      <section className="section section--white">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">Ihre Vorteile</p>
            <h2 className="h2">Warum Sie bei uns richtig sind</h2>
          </header>
          <div className="features">
            <div className="feature"><Icon name="shield" /><h3>Garantiert original</h3><p>Alle Produkte stammen direkt von Dersut Caffè S.p.A. in Conegliano. Keine Parallelimporte, keine Graumarktware.</p></div>
            <div className="feature"><Icon name="flag" /><h3>Schweizer Firma</h3><p>Ihr Vertragspartner ist die {c.name} mit Sitz in der Schweiz. Rechnung und Zahlung in Franken.</p></div>
            <div className="feature"><Icon name="truck" /><h3>Lieferung in die ganze Schweiz</h3><p>Versand mit der Schweizerischen Post, pauschal CHF 9.– pro Bestellung. Ohne Zollformalitäten, ohne Zusatzkosten.</p></div>
            <div className="feature"><Icon name="bank" /><h3>Sichere Zahlung</h3><p>Sie bezahlen per Banküberweisung auf unser Konto bei der {config.bank.bank}. Keine Kartendaten nötig.</p></div>
            <div className="feature"><Icon name="cup" /><h3>Frische Ware</h3><p>Wir beziehen laufend nach, damit Ihr Kaffee frisch bei Ihnen ankommt. Das Sortiment wird saisonal erweitert.</p></div>
            <div className="feature"><Icon name="users" /><h3>Persönliche Beratung</h3><p>Ob Privatkunde oder Gastronomie: Wir sind per E-Mail für Sie da und beraten Sie gerne persönlich.</p></div>
          </div>
        </div>
      </section>

      <section className="split">
        <div className="wrap split__inner">
          <div className="split__media frame"><Img src={brand('nuova_sede')} alt="Hauptsitz Dersut Caffè in Conegliano" /></div>
          <div className="split__text">
            <p className="eyebrow">Unser Partner</p>
            <h2 className="h2">Dersut Caffè S.p.A., Conegliano</h2>
            <p>Dersut wurde 1947 gegründet und ist seit 1949 im Besitz der Familie Caballini. Am Hauptsitz an der Via San Giuseppe 46 in Conegliano (Provinz Treviso) wird bis heute geröstet, gemischt und verpackt.</p>
            <p>Über 4’000 Betriebe vertrauen auf Dersut, vor allem im Nordosten Italiens, zunehmend auch im Piemont, in Osteuropa, den Vereinigten Arabischen Emiraten, Mexiko und der Dominikanischen Republik. Und jetzt offiziell in der Schweiz.</p>
            <Link className="link-arrow" href="/geschichte">Zur Geschichte von Dersut <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">Transparenz</p>
            <h2 className="h2">Ihre Ansprechpartner in der Schweiz</h2>
          </header>
          <div className="features">
            <div className="feature"><Icon name="pin" /><h3>Firma</h3><p>{companyAddressLines().map((l, i) => <span key={i}>{l}<br /></span>)}{c.uid && <>UID: {c.uid}</>}</p></div>
            <div className="feature"><Icon name="mail" /><h3>Kontakt</h3><p><a href={`mailto:${config.email.info}`}>{config.email.info}</a><br />Bestellungen, Beratung, Geschäftskunden und Partnerschaften</p></div>
            <div className="feature"><Icon name="bank" /><h3>Bankverbindung</h3><p>{config.bank.holder}<br />{config.bank.bank}<br />IBAN {ibanFormat(config.bank.iban)}</p></div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap cta-box">
          <div>
            <p className="eyebrow">Onlineshop</p>
            <h2 className="h3">Original Dersut, geliefert in die ganze Schweiz</h2>
            <p>Optimum Rosso und Domus Marrone, je 1 kg Espressobohnen.</p>
          </div>
          <Link className="btn btn--primary btn--lg" href="/shop">Jetzt bestellen <Icon name="arrow" /></Link>
        </div>
      </section>
    </>
  );
}
