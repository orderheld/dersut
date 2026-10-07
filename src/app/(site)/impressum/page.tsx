import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { config } from '@/lib/config';
import { companyAddressLines } from '@/lib/format';

export const metadata: Metadata = { title: 'Impressum' };

export default function Impressum() {
  const c = config.company;
  return (
    <>
      <PageHero crumb="Impressum" title="Impressum" />
      <section className="section">
        <div className="wrap prose">
          <h2>Betreiberin</h2>
          <p>{companyAddressLines().map((l, i) => <span key={i}>{l}<br /></span>)}</p>
          <p>
            E-Mail: <a href={`mailto:${config.email.info}`}>{config.email.info}</a><br />
            {c.phone && <>Telefon: {c.phone}<br /></>}
            {c.managing && <>Geschäftsführung: {c.managing}<br /></>}
            {c.uid && <>UID: {c.uid}<br /></>}
            {c.vatNo && <>MWST-Nr.: {c.vatNo}<br /></>}
            {c.register && <>Handelsregister: {c.register}</>}
          </p>
          <h2>Marke und Bildmaterial</h2>
          <p>Dersut® sowie das Dersut-Logo sind Marken der Dersut Caffè S.p.A., Via San Giuseppe 46, 31015 Conegliano (TV), Italien. Produktbilder und Fotografien stammen von Dersut Caffè S.p.A. und werden von {c.name} als offizieller Vertriebspartner für die Schweiz verwendet.</p>
          <h2>Haftungsausschluss</h2>
          <p>Wir prüfen die Inhalte dieser Webseite sorgfältig, übernehmen jedoch keine Gewähr für Richtigkeit, Vollständigkeit und Aktualität. Für Inhalte verlinkter Webseiten sind ausschliesslich deren Betreiber verantwortlich.</p>
        </div>
      </section>
    </>
  );
}
