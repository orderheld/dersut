import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { PageHero } from '@/components/PageHero';
import { brand } from '@/lib/brand';
import { config } from '@/lib/config';
import { companyAddressLines, ibanFormat } from '@/lib/format';
import { asLocale, lp, type Locale } from '@/lib/i18n';
import { pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ lang: string }> };

const PATH = '/offizieller-vertrieb';
const c = config.company;
const bankName = config.bank.bank;

const de = {
  metaTitle: 'Offizieller Dersut Vertrieb in der Schweiz',
  metaDescription: `${c.name} ist der offizielle Vertriebspartner von Dersut Caffè in der Schweiz: Espressobohnen kaufen, Originalware direkt aus Conegliano.`,
  crumb: 'Offizieller Vertrieb Schweiz',
  eyebrow: 'Distributore ufficiale · Svizzera',
  title: <>Offizieller Vertrieb<br /><em>von Dersut in der Schweiz</em></>,
  lead: `${c.name} hat den Vertrieb von Dersut Caffè für die Schweiz übernommen. Für Sie heisst das: Originalware, direkt aus Conegliano, mit Schweizer Service.`,
  benefitsEyebrow: 'Ihre Vorteile',
  benefitsTitle: 'Warum Sie bei uns richtig sind',
  benefits: [
    ['shield', 'Garantiert original', 'Alle Produkte stammen direkt von Dersut Caffè S.p.A. in Conegliano. Keine Parallelimporte, keine Graumarktware.'],
    ['flag', 'Schweizer Firma', `Ihr Vertragspartner ist die ${c.name} mit Sitz in der Schweiz. Rechnung und Zahlung in Franken.`],
    ['truck', 'Lieferung in die ganze Schweiz', 'Versand mit der Schweizerischen Post, pauschal CHF 9.– pro Bestellung. Ohne Zollformalitäten, ohne Zusatzkosten.'],
    ['bank', 'Sichere Zahlung', `Sie bezahlen per Banküberweisung auf unser Konto bei der ${bankName}. Keine Kartendaten nötig.`],
    ['cup', 'Frische Ware', 'Wir beziehen laufend nach, damit Ihr Kaffee frisch bei Ihnen ankommt. Das Sortiment wird saisonal erweitert.'],
    ['users', 'Persönliche Beratung', 'Ob Privatkunde oder Gastronomie: Wir sind per E-Mail für Sie da und beraten Sie gerne persönlich.'],
  ],
  partnerAlt: 'Hauptsitz Dersut Caffè in Conegliano',
  partnerEyebrow: 'Unser Partner',
  partnerText1: 'Dersut wurde 1947 gegründet und ist seit 1949 im Besitz der Familie Caballini. Am Hauptsitz an der Via San Giuseppe 46 in Conegliano (Provinz Treviso) wird bis heute geröstet, gemischt und verpackt.',
  partnerText2: 'Über 4’000 Betriebe vertrauen auf Dersut, vor allem im Nordosten Italiens, zunehmend auch im Piemont, in Osteuropa, den Vereinigten Arabischen Emiraten, Mexiko und der Dominikanischen Republik. Und jetzt offiziell in der Schweiz.',
  partnerLink: 'Zur Geschichte von Dersut',
  contactEyebrow: 'Transparenz',
  contactTitle: 'Ihre Ansprechpartner in der Schweiz',
  company: 'Firma',
  contact: 'Kontakt',
  contactText: 'Bestellungen, Beratung, Geschäftskunden und Partnerschaften',
  bankDetails: 'Bankverbindung',
  uid: 'UID',
  ctaEyebrow: 'Onlineshop',
  ctaTitle: 'Original Dersut, geliefert in die ganze Schweiz',
  ctaText: 'Optimum Rosso und Domus Marrone, je 1 kg Espressobohnen.',
  ctaButton: 'Jetzt bestellen',
};

const T: Record<Locale, typeof de> = {
  de,
  fr: {
    metaTitle: 'Distributeur officiel du café Dersut en Suisse',
    metaDescription: `${c.name} est le distributeur officiel de Dersut Caffè en Suisse : grains d’espresso originaux, directement de Conegliano, avec un service suisse.`,
    crumb: 'Distribution officielle Suisse',
    eyebrow: 'Distributore ufficiale · Svizzera',
    title: <>Distribution officielle<br /><em>de Dersut en Suisse</em></>,
    lead: `${c.name} a repris la distribution de Dersut Caffè pour la Suisse. Pour vous, cela signifie : des produits originaux, directement de Conegliano, avec un service suisse.`,
    benefitsEyebrow: 'Vos avantages',
    benefitsTitle: 'Pourquoi vous êtes à la bonne adresse',
    benefits: [
      ['shield', 'Original garanti', 'Tous les produits proviennent directement de Dersut Caffè S.p.A. à Conegliano. Aucune importation parallèle, aucun produit du marché gris.'],
      ['flag', 'Entreprise suisse', `Votre partenaire contractuel est ${c.name}, dont le siège est en Suisse. Facturation et paiement en francs.`],
      ['truck', 'Livraison dans toute la Suisse', 'Expédition par La Poste suisse, forfait de CHF 9.– par commande. Sans formalités douanières, sans frais supplémentaires.'],
      ['bank', 'Paiement sécurisé', `Vous payez par virement bancaire sur notre compte auprès de ${bankName}. Aucune donnée de carte nécessaire.`],
      ['cup', 'Produits frais', 'Nous nous réapprovisionnons en continu pour que votre café vous parvienne frais. L’assortiment s’enrichit au fil des saisons.'],
      ['users', 'Conseil personnalisé', 'Particulier ou professionnel de la restauration : nous sommes à votre disposition par e-mail et vous conseillons volontiers personnellement.'],
    ],
    partnerAlt: 'Siège de Dersut Caffè à Conegliano',
    partnerEyebrow: 'Notre partenaire',
    partnerText1: 'Fondée en 1947, Dersut appartient depuis 1949 à la famille Caballini. Au siège de la Via San Giuseppe 46 à Conegliano (province de Trévise), le café est aujourd’hui encore torréfié, assemblé et conditionné.',
    partnerText2: 'Plus de 4’000 établissements font confiance à Dersut, surtout dans le nord-est de l’Italie, et de plus en plus dans le Piémont, en Europe de l’Est, aux Émirats arabes unis, au Mexique et en République dominicaine. Et désormais officiellement en Suisse.',
    partnerLink: 'Découvrir l’histoire de Dersut',
    contactEyebrow: 'Transparence',
    contactTitle: 'Vos interlocuteurs en Suisse',
    company: 'Entreprise',
    contact: 'Contact',
    contactText: 'Commandes, conseil, clients professionnels et partenariats',
    bankDetails: 'Coordonnées bancaires',
    uid: 'IDE',
    ctaEyebrow: 'Boutique en ligne',
    ctaTitle: 'Dersut original, livré dans toute la Suisse',
    ctaText: 'Optimum Rosso et Domus Marrone, grains d’espresso en paquets de 1 kg.',
    ctaButton: 'Commander maintenant',
  },
  it: {
    metaTitle: 'Distributore ufficiale del caffè Dersut in Svizzera',
    metaDescription: `${c.name} è il distributore ufficiale di Dersut Caffè in Svizzera: caffè in grani originale, direttamente da Conegliano, con un servizio svizzero.`,
    crumb: 'Distribuzione ufficiale Svizzera',
    eyebrow: 'Distributore ufficiale · Svizzera',
    title: <>Distribuzione ufficiale<br /><em>di Dersut in Svizzera</em></>,
    lead: `${c.name} ha assunto la distribuzione di Dersut Caffè per la Svizzera. Per voi significa: prodotti originali, direttamente da Conegliano, con un servizio svizzero.`,
    benefitsEyebrow: 'I vostri vantaggi',
    benefitsTitle: 'Perché siete nel posto giusto',
    benefits: [
      ['shield', 'Originale garantito', 'Tutti i prodotti provengono direttamente da Dersut Caffè S.p.A. a Conegliano. Nessuna importazione parallela, nessuna merce del mercato grigio.'],
      ['flag', 'Azienda svizzera', `Il vostro partner contrattuale è ${c.name}, con sede in Svizzera. Fatturazione e pagamento in franchi svizzeri.`],
      ['truck', 'Consegna in tutta la Svizzera', 'Spedizione con la Posta Svizzera, forfait di CHF 9.– per ordine. Senza formalità doganali, senza costi aggiuntivi.'],
      ['bank', 'Pagamento sicuro', `Pagate con bonifico bancario sul nostro conto presso ${bankName}. Nessun dato della carta necessario.`],
      ['cup', 'Prodotti freschi', 'Ci riforniamo regolarmente affinché il vostro caffè arrivi fresco. L’assortimento viene ampliato di stagione in stagione.'],
      ['users', 'Consulenza personale', 'Clienti privati o gastronomia: siamo a vostra disposizione via e-mail e vi consigliamo volentieri di persona.'],
    ],
    partnerAlt: 'Sede di Dersut Caffè a Conegliano',
    partnerEyebrow: 'Il nostro partner',
    partnerText1: 'Dersut è stata fondata nel 1947 ed è di proprietà della famiglia Caballini dal 1949. Nella sede di Via San Giuseppe 46 a Conegliano (provincia di Treviso) il caffè viene ancora oggi tostato, miscelato e confezionato.',
    partnerText2: 'Oltre 4’000 locali si affidano a Dersut, soprattutto nel Nord-Est italiano e sempre più anche in Piemonte, nell’Europa dell’Est, negli Emirati Arabi Uniti, in Messico e nella Repubblica Dominicana. E ora ufficialmente in Svizzera.',
    partnerLink: 'Scoprite la storia di Dersut',
    contactEyebrow: 'Trasparenza',
    contactTitle: 'I vostri interlocutori in Svizzera',
    company: 'Azienda',
    contact: 'Contatto',
    contactText: 'Ordini, consulenza, clienti business e partnership',
    bankDetails: 'Coordinate bancarie',
    uid: 'IDI',
    ctaEyebrow: 'Shop online',
    ctaTitle: 'Dersut originale, consegnato in tutta la Svizzera',
    ctaText: 'Optimum Rosso e Domus Marrone, caffè in grani in confezioni da 1 kg.',
    ctaButton: 'Ordina ora',
  },
  en: {
    metaTitle: 'Official Dersut Coffee Distributor in Switzerland',
    metaDescription: `${c.name} is the official distributor of Dersut Caffè in Switzerland: original Dersut espresso beans, direct from Conegliano, with Swiss service.`,
    crumb: 'Official distribution Switzerland',
    eyebrow: 'Distributore ufficiale · Svizzera',
    title: <>Official distribution<br /><em>of Dersut in Switzerland</em></>,
    lead: `${c.name} has taken over the distribution of Dersut Caffè for Switzerland. For you, that means original products, direct from Conegliano, with Swiss service.`,
    benefitsEyebrow: 'Your benefits',
    benefitsTitle: 'Why you have come to the right place',
    benefits: [
      ['shield', 'Guaranteed original', 'All products come directly from Dersut Caffè S.p.A. in Conegliano. No parallel imports, no grey-market goods.'],
      ['flag', 'Swiss company', `Your contractual partner is ${c.name}, based in Switzerland. Invoicing and payment in Swiss francs.`],
      ['truck', 'Delivery throughout Switzerland', 'Shipped by Swiss Post for a flat CHF 9.– per order. No customs formalities, no extra costs.'],
      ['bank', 'Secure payment', `You pay by bank transfer to our account with ${bankName}. No card details required.`],
      ['cup', 'Fresh stock', 'We restock continuously so that your coffee reaches you fresh. The range is extended seasonally.'],
      ['users', 'Personal advice', 'Whether you are a private customer or in hospitality, we are available by email and happy to advise you personally.'],
    ],
    partnerAlt: 'Dersut Caffè headquarters in Conegliano',
    partnerEyebrow: 'Our partner',
    partnerText1: 'Founded in 1947, Dersut has been owned by the Caballini family since 1949. At the headquarters on Via San Giuseppe 46 in Conegliano (province of Treviso), the coffee is still roasted, blended and packed to this day.',
    partnerText2: 'More than 4,000 businesses rely on Dersut, above all in north-eastern Italy and increasingly in Piedmont, Eastern Europe, the United Arab Emirates, Mexico and the Dominican Republic. And now officially in Switzerland.',
    partnerLink: 'Discover the history of Dersut',
    contactEyebrow: 'Transparency',
    contactTitle: 'Your contacts in Switzerland',
    company: 'Company',
    contact: 'Contact',
    contactText: 'Orders, advice, business customers and partnerships',
    bankDetails: 'Bank details',
    uid: 'UID',
    ctaEyebrow: 'Online shop',
    ctaTitle: 'Original Dersut, delivered throughout Switzerland',
    ctaText: 'Optimum Rosso and Domus Marrone, 1 kg of espresso beans each.',
    ctaButton: 'Order now',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  return pageMeta(lang, PATH, T[lang].metaTitle, T[lang].metaDescription);
}

export default async function Vertrieb({ params }: Props) {
  const lang = asLocale((await params).lang);
  const t = T[lang];
  return (
    <>
      <PageHero lang={lang} img={brand('img_1')} crumb={t.crumb} eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section className="section section--white">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">{t.benefitsEyebrow}</p>
            <h2 className="h2">{t.benefitsTitle}</h2>
          </header>
          <div className="features">
            {t.benefits.map(([icon, h, p]) => (
              <div className="feature" key={icon}><Icon name={icon} /><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="split">
        <div className="wrap split__inner">
          <div className="split__media frame"><Img src={brand('nuova_sede')} alt={t.partnerAlt} /></div>
          <div className="split__text">
            <p className="eyebrow">{t.partnerEyebrow}</p>
            <h2 className="h2">Dersut Caffè S.p.A., Conegliano</h2>
            <p>{t.partnerText1}</p>
            <p>{t.partnerText2}</p>
            <Link className="link-arrow" href={lp(lang, '/geschichte')}>{t.partnerLink} <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">{t.contactEyebrow}</p>
            <h2 className="h2">{t.contactTitle}</h2>
          </header>
          <div className="features">
            <div className="feature"><Icon name="pin" /><h3>{t.company}</h3><p>{companyAddressLines().map((l, i) => <span key={i}>{l}<br /></span>)}{c.uid && <>{t.uid}: {c.uid}</>}</p></div>
            <div className="feature"><Icon name="mail" /><h3>{t.contact}</h3><p><a href={`mailto:${config.email.info}`}>{config.email.info}</a><br />{t.contactText}</p></div>
            <div className="feature"><Icon name="bank" /><h3>{t.bankDetails}</h3><p>{config.bank.holder}<br />{config.bank.bank}<br />IBAN {ibanFormat(config.bank.iban)}</p></div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap cta-box">
          <div>
            <p className="eyebrow">{t.ctaEyebrow}</p>
            <h2 className="h3">{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
          </div>
          <Link className="btn btn--primary btn--lg" href={lp(lang, '/shop')}>{t.ctaButton} <Icon name="arrow" /></Link>
        </div>
      </section>
    </>
  );
}
