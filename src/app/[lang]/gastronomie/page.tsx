import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { PageHero } from '@/components/PageHero';
import { brand } from '@/lib/brand';
import { asLocale, lp, type Locale } from '@/lib/i18n';
import { pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ lang: string }> };

const PATH = '/gastronomie';

const de = {
  metaTitle: 'Dersut Kaffee für Gastronomie & Büro',
  metaDescription: 'Dersut Espresso für Bars, Restaurants, Hotels, Bäckereien und Büros: persönliche Beratung, individuelle Konditionen und Lieferung in die ganze Schweiz.',
  crumb: 'Gastronomie & Büro',
  eyebrow: 'Horeca · Ufficio',
  title: <>Dersut für<br /><em>Ihre Gäste</em></>,
  lead: 'Bars, Restaurants, Hotels, Bäckereien und Büros: Wir bringen den Espresso, den über 4’000 Betriebe in Italien und weltweit ausschenken, zu Ihnen in die Schweiz.',
  features: [
    ['cup', 'Die passende Mischung', 'Wir beraten Sie, welche Dersut-Mischung zu Ihrem Angebot, Ihrer Maschine und Ihren Gästen passt.'],
    ['box', 'Mengen & Konditionen', 'Für Geschäftskunden mit regelmässigem Bedarf erstellen wir gerne ein individuelles Angebot.'],
    ['award', 'Wissen aus der Accademia', 'Das Know-how der Dersut-Akademie ABCD steht hinter jeder Empfehlung, von der Extraktion bis zur Latte Art.'],
  ],
  imgAlt: 'Barista bei der Zubereitung von Dersut Espresso',
  ctaEyebrow: 'Anfrage',
  ctaTitle: 'Lassen Sie uns sprechen',
  ctaText: 'Erzählen Sie uns kurz von Ihrem Betrieb und Ihrem ungefähren Bedarf. Wir melden uns persönlich bei Ihnen.',
  checks: ['Unverbindliche Beratung', 'Lieferung in die ganze Schweiz', 'Original Dersut direkt vom offiziellen Vertrieb'],
  button: 'Angebot anfragen',
};

const T: Record<Locale, typeof de> = {
  de,
  fr: {
    metaTitle: 'Café Dersut pour la restauration et le bureau',
    metaDescription: 'Café Dersut pour bars, restaurants, hôtels, boulangeries et bureaux : conseil personnalisé, conditions sur mesure et livraison dans toute la Suisse.',
    crumb: 'Restauration & bureau',
    eyebrow: 'Horeca · Ufficio',
    title: <>Dersut pour<br /><em>vos clients</em></>,
    lead: 'Bars, restaurants, hôtels, boulangeries et bureaux : nous vous apportons en Suisse l’espresso servi par plus de 4’000 établissements en Italie et dans le monde entier.',
    features: [
      ['cup', 'Le mélange idéal', 'Nous vous conseillons sur le mélange Dersut le mieux adapté à votre offre, à votre machine et à vos clients.'],
      ['box', 'Quantités & conditions', 'Pour les clients professionnels aux besoins réguliers, nous établissons volontiers une offre personnalisée.'],
      ['award', 'Le savoir de l’Accademia', 'Le savoir-faire de l’académie Dersut ABCD guide chacune de nos recommandations, de l’extraction au latte art.'],
    ],
    imgAlt: 'Barista préparant un espresso Dersut',
    ctaEyebrow: 'Demande',
    ctaTitle: 'Parlons-en',
    ctaText: 'Présentez-nous brièvement votre établissement et vos besoins approximatifs. Nous vous recontacterons personnellement.',
    checks: ['Conseil sans engagement', 'Livraison dans toute la Suisse', 'Dersut original, directement auprès du distributeur officiel'],
    button: 'Demander une offre',
  },
  it: {
    metaTitle: 'Caffè Dersut per gastronomia e ufficio',
    metaDescription: 'Espresso Dersut per bar, ristoranti, hotel, panetterie e uffici in Svizzera: consulenza personale, condizioni su misura e consegna in tutta la Svizzera.',
    crumb: 'Gastronomia & ufficio',
    eyebrow: 'Horeca · Ufficio',
    title: <>Dersut per<br /><em>i vostri ospiti</em></>,
    lead: 'Bar, ristoranti, hotel, panetterie e uffici: portiamo da voi in Svizzera l’espresso servito da oltre 4’000 locali in Italia e nel mondo.',
    features: [
      ['cup', 'La miscela giusta', 'Vi consigliamo la miscela Dersut più adatta alla vostra offerta, alla vostra macchina e ai vostri ospiti.'],
      ['box', 'Quantità & condizioni', 'Per i clienti commerciali con un fabbisogno regolare allestiamo volentieri un’offerta personalizzata.'],
      ['award', 'Il sapere dell’Accademia', 'Il know-how dell’Accademia Dersut ABCD è alla base di ogni nostro consiglio, dall’estrazione alla latte art.'],
    ],
    imgAlt: 'Barista durante la preparazione di un espresso Dersut',
    ctaEyebrow: 'Richiesta',
    ctaTitle: 'Parliamone',
    ctaText: 'Raccontateci brevemente del vostro locale e del vostro fabbisogno indicativo. Vi ricontatteremo personalmente.',
    checks: ['Consulenza senza impegno', 'Consegna in tutta la Svizzera', 'Dersut originale direttamente dal distributore ufficiale'],
    button: 'Richiedere un’offerta',
  },
  en: {
    metaTitle: 'Dersut coffee for hospitality & offices',
    metaDescription: 'Dersut espresso for bars, restaurants, hotels, bakeries and offices in Switzerland: personal advice, tailored terms and delivery throughout Switzerland.',
    crumb: 'Hospitality & office',
    eyebrow: 'Horeca · Ufficio',
    title: <>Dersut for<br /><em>your guests</em></>,
    lead: 'Bars, restaurants, hotels, bakeries and offices: we bring the espresso served by more than 4,000 businesses in Italy and around the world to you in Switzerland.',
    features: [
      ['cup', 'The right blend', 'We advise you on which Dersut blend best suits your menu, your machine and your guests.'],
      ['box', 'Volumes & terms', 'For business customers with regular requirements, we are happy to prepare an individual quote.'],
      ['award', 'Expertise from the Accademia', 'The know-how of the Dersut academy ABCD stands behind every recommendation, from extraction to latte art.'],
    ],
    imgAlt: 'Barista preparing Dersut espresso',
    ctaEyebrow: 'Enquiry',
    ctaTitle: 'Let’s talk',
    ctaText: 'Tell us briefly about your business and your approximate requirements. We will get back to you personally.',
    checks: ['No-obligation advice', 'Delivery throughout Switzerland', 'Original Dersut direct from the official distributor'],
    button: 'Request a quote',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  return pageMeta(lang, PATH, T[lang].metaTitle, T[lang].metaDescription);
}

export default async function Gastronomie({ params }: Props) {
  const lang = asLocale((await params).lang);
  const t = T[lang];
  return (
    <>
      <PageHero lang={lang} img={brand('macchina')} crumb={t.crumb} eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <section className="section section--white">
        <div className="wrap">
          <div className="features">
            {t.features.map(([icon, h, p]) => (
              <div className="feature" key={icon}><Icon name={icon} /><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="split split--cream">
        <div className="wrap split__inner">
          <div className="split__media frame"><Img src={brand('img_2')} alt={t.imgAlt} /></div>
          <div className="split__text">
            <p className="eyebrow">{t.ctaEyebrow}</p>
            <h2 className="h2">{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
            <ul className="checks">
              {t.checks.map((c) => (
                <li key={c}><Icon name="check" /> {c}</li>
              ))}
            </ul>
            <Link className="btn btn--primary btn--lg" href={lp(lang, '/kontakt') + '?thema=Gastronomie'}>{t.button} <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
