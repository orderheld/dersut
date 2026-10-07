import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { config } from '@/lib/config';
import { companyAddressLines } from '@/lib/format';
import { asLocale, type Locale } from '@/lib/i18n';
import { pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ lang: string }> };

const PATH = '/impressum';
const c = config.company;

const de = {
  metaTitle: 'Impressum',
  metaDescription: `Impressum von ${c.name}, offizieller Vertriebspartner von Dersut Caffè in der Schweiz: Kontakt, Firmenangaben, Marken und Haftungsausschluss.`,
  crumb: 'Impressum',
  title: 'Impressum',
  note: '',
  country: 'Schweiz',
  operator: 'Betreiberin',
  email: 'E-Mail',
  phone: 'Telefon',
  managing: 'Geschäftsführung',
  uid: 'UID',
  vatNo: 'MWST-Nr.',
  register: 'Handelsregister',
  brandTitle: 'Marke und Bildmaterial',
  brand: `Dersut® sowie das Dersut-Logo sind Marken der Dersut Caffè S.p.A., Via San Giuseppe 46, 31015 Conegliano (TV), Italien. Produktbilder und Fotografien stammen von Dersut Caffè S.p.A. und werden von ${c.name} als offizieller Vertriebspartner für die Schweiz verwendet.`,
  disclaimerTitle: 'Haftungsausschluss',
  disclaimer: 'Wir prüfen die Inhalte dieser Webseite sorgfältig, übernehmen jedoch keine Gewähr für Richtigkeit, Vollständigkeit und Aktualität. Für Inhalte verlinkter Webseiten sind ausschliesslich deren Betreiber verantwortlich.',
};

const T: Record<Locale, typeof de> = {
  de,
  fr: {
    metaTitle: 'Mentions légales',
    metaDescription: `Mentions légales de ${c.name}, distributeur officiel de Dersut Caffè en Suisse : contact, données de l’entreprise, marques et responsabilité.`,
    crumb: 'Mentions légales',
    title: 'Mentions légales',
    note: 'Seule la version allemande des présentes mentions légales fait foi ; en cas de divergence, elle prévaut sur la présente traduction.',
    country: 'Suisse',
    operator: 'Exploitant',
    email: 'E-mail',
    phone: 'Téléphone',
    managing: 'Direction',
    uid: 'IDE',
    vatNo: 'N° TVA',
    register: 'Registre du commerce',
    brandTitle: 'Marque et images',
    brand: `Dersut® ainsi que le logo Dersut sont des marques de Dersut Caffè S.p.A., Via San Giuseppe 46, 31015 Conegliano (TV), Italie. Les images de produits et les photographies proviennent de Dersut Caffè S.p.A. et sont utilisées par ${c.name} en sa qualité de distributeur officiel pour la Suisse.`,
    disclaimerTitle: 'Exclusion de responsabilité',
    disclaimer: 'Nous vérifions soigneusement les contenus de ce site, mais n’assumons aucune garantie quant à leur exactitude, leur exhaustivité et leur actualité. Les exploitants des sites liés sont seuls responsables de leurs contenus.',
  },
  it: {
    metaTitle: 'Note legali',
    metaDescription: `Note legali di ${c.name}, distributore ufficiale di Dersut Caffè in Svizzera: contatti, dati aziendali, marchi ed esclusione di responsabilità.`,
    crumb: 'Note legali',
    title: 'Note legali',
    note: 'Fa stato unicamente la versione tedesca delle presenti note legali; in caso di divergenze, essa prevale sulla presente traduzione.',
    country: 'Svizzera',
    operator: 'Gestore',
    email: 'E-mail',
    phone: 'Telefono',
    managing: 'Direzione',
    uid: 'IDI',
    vatNo: 'N. IVA',
    register: 'Registro di commercio',
    brandTitle: 'Marchio e immagini',
    brand: `Dersut® e il logo Dersut sono marchi di Dersut Caffè S.p.A., Via San Giuseppe 46, 31015 Conegliano (TV), Italia. Le immagini dei prodotti e le fotografie provengono da Dersut Caffè S.p.A. e sono utilizzate da ${c.name} in qualità di distributore ufficiale per la Svizzera.`,
    disclaimerTitle: 'Esclusione di responsabilità',
    disclaimer: 'Verifichiamo con cura i contenuti di questo sito, ma non ci assumiamo alcuna garanzia per la loro correttezza, completezza e attualità. Dei contenuti dei siti collegati rispondono esclusivamente i rispettivi gestori.',
  },
  en: {
    metaTitle: 'Legal notice',
    metaDescription: `Legal notice of ${c.name}, the official distribution partner of Dersut Caffè in Switzerland: contact, company details, trademarks and disclaimer.`,
    crumb: 'Legal notice',
    title: 'Legal notice',
    note: 'Only the German version of this legal notice is legally binding; in the event of any discrepancy, it shall prevail over this translation.',
    country: 'Switzerland',
    operator: 'Operator',
    email: 'E-mail',
    phone: 'Phone',
    managing: 'Management',
    uid: 'UID',
    vatNo: 'VAT No.',
    register: 'Commercial register',
    brandTitle: 'Trademark and images',
    brand: `Dersut® and the Dersut logo are trademarks of Dersut Caffè S.p.A., Via San Giuseppe 46, 31015 Conegliano (TV), Italy. Product images and photographs are provided by Dersut Caffè S.p.A. and are used by ${c.name} as the official distribution partner for Switzerland.`,
    disclaimerTitle: 'Disclaimer',
    disclaimer: 'We check the content of this website carefully but accept no liability for its accuracy, completeness or timeliness. The operators of linked websites are solely responsible for their content.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  return pageMeta(lang, PATH, T[lang].metaTitle, T[lang].metaDescription);
}

export default async function Impressum({ params }: Props) {
  const lang = asLocale((await params).lang);
  const t = T[lang];
  const address = companyAddressLines().map((l) => (l === 'Schweiz' ? t.country : l));
  return (
    <>
      <PageHero lang={lang} crumb={t.crumb} title={t.title} />
      <section className="section">
        <div className="wrap prose">
          {t.note && <p><em>{t.note}</em></p>}
          <h2>{t.operator}</h2>
          <p>{address.map((l, i) => <span key={i}>{l}<br /></span>)}</p>
          <p>
            {t.email}: <a href={`mailto:${config.email.info}`}>{config.email.info}</a><br />
            {c.phone && <>{t.phone}: {c.phone}<br /></>}
            {c.managing && <>{t.managing}: {c.managing}<br /></>}
            {c.uid && <>{t.uid}: {c.uid}<br /></>}
            {c.vatNo && <>{t.vatNo}: {c.vatNo}<br /></>}
            {c.register && <>{t.register}: {c.register}</>}
          </p>
          <h2>{t.brandTitle}</h2>
          <p>{t.brand}</p>
          <h2>{t.disclaimerTitle}</h2>
          <p>{t.disclaimer}</p>
        </div>
      </section>
    </>
  );
}
