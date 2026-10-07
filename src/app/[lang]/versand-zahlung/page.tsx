import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { PageHero } from '@/components/PageHero';
import { config } from '@/lib/config';
import { chf, ibanFormat } from '@/lib/format';
import { asLocale, type Locale } from '@/lib/i18n';
import { jsonLd, pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ lang: string }> };

const PATH = '/versand-zahlung';
const ship = chf(config.shop.shipping);
const days = config.shop.paymentDays;
const vat = config.shop.vatRate;
const example = `${config.shop.orderPrefix}-${String(new Date().getFullYear()).slice(2)}-1001`;

const de = {
  metaTitle: 'Versand & Zahlung',
  metaDescription: `Lieferung in die ganze Schweiz mit der Post für pauschal ${ship}. Zahlung per Vorauskasse (Banküberweisung mit QR-Code). Alle Preise inkl. MWST.`,
  crumb: 'Versand & Zahlung',
  eyebrow: 'Service',
  title: 'Versand & Zahlung',
  lead: `Einfach, transparent und sicher: Lieferung in die ganze Schweiz für pauschal ${ship}, Zahlung per Vorauskasse.`,
  steps: [
    ['bag', 'Bestellen', 'Sie schliessen Ihre Bestellung ab und erhalten sofort eine Bestellnummer sowie eine E-Mail mit allen Zahlungsangaben.'],
    ['bank', 'Überweisen', `Sie überweisen den Gesamtbetrag innert ${days} Tagen und geben dabei Ihre Bestellnummer an. Am einfachsten mit dem QR-Code in Ihrer Banking-App.`],
    ['truck', 'Erhalten', 'Sobald Ihre Zahlung eingegangen ist, versenden wir mit der Post und senden Ihnen die Versandbestätigung.'],
  ],
  holder: 'Kontoinhaber',
  bank: 'Bank',
  faq: [
    ['Was kostet der Versand?', `Der Versand mit der Schweizerischen Post kostet pauschal ${ship} pro Bestellung, unabhängig von der Menge. Wir liefern an Adressen in der ganzen Schweiz.`],
    ['Welche Zahlungsarten gibt es?', 'Wir bieten ausschliesslich Vorauskasse per Banküberweisung an. So müssen Sie keine Kartendaten angeben, und wir halten die Preise tief.'],
    ['Wohin überweise ich den Betrag?', `Bitte geben Sie im Mitteilungsfeld unbedingt Ihre Bestellnummer an (z. B. «${example}»), damit wir Ihre Zahlung zuordnen können.`],
    ['Wann wird meine Bestellung versendet?', 'Sobald Ihre Zahlung auf unserem Konto eingegangen ist, in der Regel innert 1 bis 2 Arbeitstagen. Eine Banküberweisung innerhalb der Schweiz dauert meist 1 Arbeitstag. Sie erhalten eine E-Mail, wenn Ihre Zahlung verbucht ist und wenn das Paket unterwegs ist.'],
    ['Was passiert, wenn ich nicht bezahle?', `Geht innert ${days} Tagen keine Zahlung ein, behalten wir uns vor, die Bestellung zu stornieren. Es entstehen Ihnen dadurch keine Kosten.`],
    ['Sind die Preise inklusive Mehrwertsteuer?', `Ja, alle Preise verstehen sich in Schweizer Franken inklusive der gesetzlichen Mehrwertsteuer von ${vat} %.`],
    ['Kann ich auch ins Ausland bestellen?', 'Derzeit liefern wir ausschliesslich an Adressen in der Schweiz.'],
    ['Wie bewahre ich die Bohnen am besten auf?', 'Kühl, trocken und lichtgeschützt, die Packung nach dem Öffnen gut verschliessen. Für das beste Aroma die Bohnen erst kurz vor der Zubereitung mahlen.'],
  ],
};

const T: Record<Locale, typeof de> = {
  de,
  fr: {
    metaTitle: 'Livraison & paiement',
    metaDescription: `Livraison dans toute la Suisse par La Poste pour un forfait de ${ship}. Paiement anticipé par virement bancaire avec QR-code. Tous les prix TVA incluse.`,
    crumb: 'Livraison & paiement',
    eyebrow: 'Service',
    title: 'Livraison & paiement',
    lead: `Simple, transparent et sûr : livraison dans toute la Suisse pour un forfait de ${ship}, paiement anticipé.`,
    steps: [
      ['bag', 'Commander', 'Vous finalisez votre commande et recevez immédiatement un numéro de commande ainsi qu’un e-mail avec toutes les informations de paiement.'],
      ['bank', 'Virer', `Vous virez le montant total dans les ${days} jours en indiquant votre numéro de commande. Le plus simple : avec le QR-code dans votre application bancaire.`],
      ['truck', 'Recevoir', 'Dès réception de votre paiement, nous expédions par La Poste et vous envoyons la confirmation d’expédition.'],
    ],
    holder: 'Titulaire du compte',
    bank: 'Banque',
    faq: [
      ['Combien coûte la livraison ?', `La livraison par La Poste suisse coûte un forfait de ${ship} par commande, quelle que soit la quantité. Nous livrons à des adresses dans toute la Suisse.`],
      ['Quels modes de paiement proposez-vous ?', 'Nous proposons exclusivement le paiement anticipé par virement bancaire. Vous n’avez ainsi aucune donnée de carte à saisir, et nous maintenons des prix bas.'],
      ['Où dois-je virer le montant ?', `Veuillez impérativement indiquer votre numéro de commande dans le champ de communication (p. ex. « ${example} ») afin que nous puissions attribuer votre paiement.`],
      ['Quand ma commande sera-t-elle expédiée ?', 'Dès que votre paiement est crédité sur notre compte, généralement dans un délai de 1 à 2 jours ouvrables. Un virement bancaire en Suisse prend le plus souvent 1 jour ouvrable. Vous recevez un e-mail lorsque votre paiement est enregistré et lorsque le colis est en route.'],
      ['Que se passe-t-il si je ne paie pas ?', `Si aucun paiement ne nous parvient dans les ${days} jours, nous nous réservons le droit d’annuler la commande. Cela n’entraîne aucun frais pour vous.`],
      ['Les prix incluent-ils la TVA ?', `Oui, tous les prix s’entendent en francs suisses, TVA légale de ${vat} % incluse.`],
      ['Puis-je commander depuis l’étranger ?', 'Pour le moment, nous livrons exclusivement à des adresses en Suisse.'],
      ['Comment conserver au mieux les grains ?', 'Au frais, au sec et à l’abri de la lumière, en refermant bien le paquet après ouverture. Pour un arôme optimal, moudre les grains juste avant la préparation.'],
    ],
  },
  it: {
    metaTitle: 'Spedizione & pagamento',
    metaDescription: `Consegna in tutta la Svizzera con la Posta a un forfait di ${ship}. Pagamento anticipato tramite bonifico bancario con codice QR. Tutti i prezzi IVA inclusa.`,
    crumb: 'Spedizione & pagamento',
    eyebrow: 'Servizio',
    title: 'Spedizione & pagamento',
    lead: `Semplice, trasparente e sicuro: consegna in tutta la Svizzera a un forfait di ${ship}, pagamento anticipato.`,
    steps: [
      ['bag', 'Ordinare', 'Concludete l’ordine e ricevete subito un numero d’ordine e un’e-mail con tutti i dati per il pagamento.'],
      ['bank', 'Bonificare', `Bonificate l’importo totale entro ${days} giorni indicando il numero d’ordine. Il modo più semplice: con il codice QR nella vostra app bancaria.`],
      ['truck', 'Ricevere', 'Appena ricevuto il pagamento, spediamo con la Posta e vi inviamo la conferma di spedizione.'],
    ],
    holder: 'Titolare del conto',
    bank: 'Banca',
    faq: [
      ['Quanto costa la spedizione?', `La spedizione con la Posta Svizzera costa un forfait di ${ship} per ordine, indipendentemente dalla quantità. Consegniamo a indirizzi in tutta la Svizzera.`],
      ['Quali metodi di pagamento offrite?', 'Offriamo esclusivamente il pagamento anticipato tramite bonifico bancario. Così non dovete indicare dati della carta e noi manteniamo i prezzi bassi.'],
      ['Dove devo bonificare l’importo?', `Indicate assolutamente il numero d’ordine nel campo della comunicazione (p. es. «${example}»), affinché possiamo attribuire il vostro pagamento.`],
      ['Quando viene spedito il mio ordine?', 'Appena il pagamento è accreditato sul nostro conto, di regola entro 1–2 giorni lavorativi. Un bonifico all’interno della Svizzera richiede di solito 1 giorno lavorativo. Riceverete un’e-mail quando il pagamento è registrato e quando il pacco è in viaggio.'],
      ['Cosa succede se non pago?', `Se entro ${days} giorni non riceviamo alcun pagamento, ci riserviamo di annullare l’ordine. Per voi non ne derivano costi.`],
      ['I prezzi includono l’IVA?', `Sì, tutti i prezzi sono in franchi svizzeri, IVA legale del ${vat} % inclusa.`],
      ['Posso ordinare anche dall’estero?', 'Al momento consegniamo esclusivamente a indirizzi in Svizzera.'],
      ['Come conservare al meglio i chicchi?', 'In luogo fresco, asciutto e al riparo dalla luce, richiudendo bene la confezione dopo l’apertura. Per l’aroma migliore macinate i chicchi poco prima della preparazione.'],
    ],
  },
  en: {
    metaTitle: 'Shipping & payment',
    metaDescription: `Delivery throughout Switzerland by Swiss Post for a flat ${ship}. Payment in advance by bank transfer with QR code. All prices include VAT.`,
    crumb: 'Shipping & payment',
    eyebrow: 'Service',
    title: 'Shipping & payment',
    lead: `Simple, transparent and secure: delivery throughout Switzerland for a flat ${ship}, payment in advance.`,
    steps: [
      ['bag', 'Order', 'You complete your order and immediately receive an order number and an e-mail with all payment details.'],
      ['bank', 'Transfer', `You transfer the total amount within ${days} days, quoting your order number. The easiest way: with the QR code in your banking app.`],
      ['truck', 'Receive', 'As soon as your payment has arrived, we ship with Swiss Post and send you a shipping confirmation.'],
    ],
    holder: 'Account holder',
    bank: 'Bank',
    faq: [
      ['How much does shipping cost?', `Shipping with Swiss Post costs a flat ${ship} per order, regardless of quantity. We deliver to addresses throughout Switzerland.`],
      ['Which payment methods do you offer?', 'We only offer payment in advance by bank transfer. That way you never have to enter card details, and we can keep our prices low.'],
      ['Where do I transfer the amount?', `Please be sure to quote your order number in the payment reference (e.g. “${example}”) so that we can match your payment.`],
      ['When will my order be shipped?', 'As soon as your payment has reached our account, usually within 1 to 2 working days. A bank transfer within Switzerland usually takes 1 working day. You will receive an e-mail when your payment has been booked and when the parcel is on its way.'],
      ['What happens if I don’t pay?', `If no payment is received within ${days} days, we reserve the right to cancel the order. This will not cost you anything.`],
      ['Do prices include VAT?', `Yes, all prices are in Swiss francs and include the statutory VAT of ${vat} %.`],
      ['Can I order from abroad?', 'At the moment we only deliver to addresses in Switzerland.'],
      ['How should I store the beans?', 'Keep them cool, dry and away from light, and close the pack tightly after opening. For the best aroma, grind the beans just before brewing.'],
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  return pageMeta(lang, PATH, T[lang].metaTitle, T[lang].metaDescription);
}

export default async function Versand({ params }: Props) {
  const lang = asLocale((await params).lang);
  const t = T[lang];
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />
      <PageHero lang={lang} crumb={t.crumb} eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <section className="section">
        <div className="wrap">
          <ol className="howto" style={{ marginBottom: 80 }}>
            {t.steps.map(([icon, h, p]) => (
              <li key={h}><span className="howto__icon"><Icon name={icon} /></span><h3>{h}</h3><p>{p}</p></li>
            ))}
          </ol>
          <div className="faq">
            {t.faq.map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary>{q}</summary>
                <div>
                  {i === 2 && (
                    <p>{t.holder}: <strong>{config.bank.holder}</strong><br />{t.bank}: {config.bank.bank}<br />IBAN: <strong>{ibanFormat(config.bank.iban)}</strong></p>
                  )}
                  <p>{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
