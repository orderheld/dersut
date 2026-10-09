import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { getDict } from '@/i18n';
import { config } from '@/lib/config';
import { chf } from '@/lib/format';
import { asLocale, lp, type Locale } from '@/lib/i18n';
import { pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ lang: string }> };

const PATH = '/agb';
const c = config.company;
const host = config.primaryHost;
const seat = c.city ? `, ${c.zip} ${c.city}` : '';
const ship = chf(config.shop.shipping);
const free = chf(config.shop.freeShippingFrom);
const days = config.shop.paymentDays;
const ordersMail = <a href={`mailto:${config.email.orders}`}>{config.email.orders}</a>;

/** Beschriftung des Bestellknopfs in der jeweiligen Sprache (identisch mit der Kasse) */
const submit = (lang: Locale) => getDict(lang).checkout.submit;

const de = {
  metaTitle: 'Allgemeine Geschäftsbedingungen (AGB)',
  metaDescription: `AGB für Bestellungen bei ${c.name}: Preise in CHF inkl. MWST, Vorauskasse per Banküberweisung und Postversand in die ganze Schweiz.`,
  crumb: 'AGB',
  title: 'Allgemeine Geschäftsbedingungen',
  lead: `Für Bestellungen im Onlineshop von ${c.name}`,
  note: '',
  h1: '1. Geltungsbereich',
  p1: `Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Bestellungen über den Onlineshop unter ${host}. Vertragspartnerin ist die ${c.name}${seat} (nachfolgend «wir»). Abweichende Bedingungen der Kundschaft gelten nur, wenn wir ihnen schriftlich zustimmen.`,
  h2: '2. Angebot und Vertragsabschluss',
  p2: (btn: string) => `Die Darstellung der Produkte im Onlineshop ist kein verbindliches Angebot. Mit dem Klick auf «${btn}» geben Sie ein verbindliches Angebot ab. Der Vertrag kommt mit unserer Bestellbestätigung per E-Mail zustande, die Ihre Bestellnummer und die Zahlungsangaben enthält.`,
  h3: '3. Preise',
  p3: `Alle Preise verstehen sich in Schweizer Franken (CHF) inklusive der gesetzlichen Mehrwertsteuer. Massgebend ist der Preis zum Zeitpunkt der Bestellung. Für den Versand berechnen wir pauschal ${ship} pro Bestellung. Ab einem Warenwert von ${free} ist der Versand gratis.`,
  h4: '4. Zahlung (Vorauskasse)',
  p4: `Die Zahlung erfolgt ausschliesslich per Vorauskasse mittels Banküberweisung auf das in der Bestellbestätigung genannte Konto. Bitte geben Sie im Zahlungszweck Ihre Bestellnummer an. Der Betrag ist innert ${days} Tagen nach Bestellung zur Zahlung fällig. Geht innert dieser Frist keine Zahlung ein, sind wir berechtigt, vom Vertrag zurückzutreten und die Bestellung zu stornieren.`,
  h5: '5. Lieferung',
  p5: 'Wir liefern ausschliesslich an Adressen in der Schweiz. Der Versand erfolgt mit der Schweizerischen Post nach Eingang der vollständigen Zahlung, in der Regel innert 1 bis 3 Arbeitstagen. Ist ein Produkt wider Erwarten nicht lieferbar, informieren wir Sie umgehend und erstatten bereits geleistete Zahlungen vollständig zurück.',
  h6: '6. Eigentumsvorbehalt und Gefahrenübergang',
  p6: 'Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum. Nutzen und Gefahr gehen mit der Übergabe der Ware an die Schweizerische Post auf die Kundschaft über.',
  h7: '7. Prüfung, Mängel und Rückgabe',
  p7: <>Bitte prüfen Sie die Ware bei Erhalt und melden Sie Transportschäden oder Mängel innert 7 Tagen an {ordersMail}. Bei berechtigten Beanstandungen liefern wir nach unserer Wahl Ersatz oder erstatten den Kaufpreis. Lebensmittel sind aus hygienischen Gründen von Umtausch und Rückgabe ausgeschlossen, sofern die Verpackung geöffnet wurde. Ein gesetzliches Widerrufsrecht für Online-Käufe besteht in der Schweiz nicht.</>,
  h8: '8. Haftung',
  p8: 'Wir haften im Rahmen der gesetzlichen Bestimmungen. Die Haftung für leichte Fahrlässigkeit ist, soweit gesetzlich zulässig, ausgeschlossen.',
  h9: '9. Datenschutz',
  p9: ['Wir bearbeiten Ihre Personendaten gemäss unserer ', 'Datenschutzerklärung', '.'],
  h10: '10. Anwendbares Recht und Gerichtsstand',
  p10: `Es gilt ausschliesslich schweizerisches Recht unter Ausschluss des UN-Kaufrechts (CISG). Gerichtsstand ist der Sitz der ${c.name}, soweit nicht zwingende Bestimmungen einen anderen Gerichtsstand vorsehen.`,
};

const T: Record<Locale, typeof de> = {
  de,
  fr: {
    metaTitle: 'Conditions générales de vente (CGV)',
    metaDescription: `CGV des commandes chez ${c.name} : prix en CHF TVA incluse, paiement anticipé par virement, livraison par La Poste dans toute la Suisse.`,
    crumb: 'CGV',
    title: 'Conditions générales de vente',
    lead: `Pour les commandes passées dans la boutique en ligne de ${c.name}`,
    note: 'Seule la version allemande des présentes CGV fait foi ; en cas de divergence, elle prévaut sur la présente traduction.',
    h1: '1. Champ d’application',
    p1: `Les présentes conditions générales de vente (CGV) s’appliquent à toutes les commandes passées via la boutique en ligne ${host}. Le partenaire contractuel est ${c.name}${seat} (ci-après « nous »). Les conditions divergentes de la clientèle ne s’appliquent que si nous les avons acceptées par écrit.`,
    h2: '2. Offre et conclusion du contrat',
    p2: (btn: string) => `La présentation des produits dans la boutique en ligne ne constitue pas une offre ferme. En cliquant sur « ${btn} », vous soumettez une offre ferme. Le contrat est conclu à réception de notre confirmation de commande par e-mail, qui contient votre numéro de commande et les informations de paiement.`,
    h3: '3. Prix',
    p3: `Tous les prix s’entendent en francs suisses (CHF), TVA légale incluse. Le prix applicable est celui en vigueur au moment de la commande. Pour la livraison, nous facturons un forfait de ${ship} par commande. La livraison est offerte à partir d’un montant de marchandises de ${free}.`,
    h4: '4. Paiement (paiement anticipé)',
    p4: `Le paiement s’effectue exclusivement à l’avance, par virement bancaire sur le compte indiqué dans la confirmation de commande. Veuillez indiquer votre numéro de commande dans la communication du paiement. Le montant est exigible dans les ${days} jours suivant la commande. Si aucun paiement ne nous parvient dans ce délai, nous sommes en droit de nous départir du contrat et d’annuler la commande.`,
    h5: '5. Livraison',
    p5: 'Nous livrons exclusivement à des adresses en Suisse. L’expédition s’effectue par La Poste suisse après réception du paiement intégral, en règle générale dans un délai de 1 à 3 jours ouvrables. Si, contre toute attente, un produit n’est pas disponible, nous vous en informons sans délai et vous remboursons intégralement les paiements déjà effectués.',
    h6: '6. Réserve de propriété et transfert des risques',
    p6: 'La marchandise demeure notre propriété jusqu’à son paiement intégral. Les profits et les risques passent à la clientèle dès la remise de la marchandise à La Poste suisse.',
    h7: '7. Vérification, défauts et retours',
    p7: <>Veuillez vérifier la marchandise dès réception et nous signaler tout dommage dû au transport ou tout défaut dans un délai de 7 jours à {ordersMail}. En cas de réclamation fondée, nous procédons, à notre choix, à un remplacement ou au remboursement du prix d’achat. Pour des raisons d’hygiène, les denrées alimentaires sont exclues de l’échange et du retour dès lors que l’emballage a été ouvert. En Suisse, il n’existe pas de droit légal de rétractation pour les achats en ligne.</>,
    h8: '8. Responsabilité',
    p8: 'Nous répondons dans le cadre des dispositions légales. Dans la mesure permise par la loi, toute responsabilité pour négligence légère est exclue.',
    h9: '9. Protection des données',
    p9: ['Nous traitons vos données personnelles conformément à notre ', 'déclaration de protection des données', '.'],
    h10: '10. Droit applicable et for juridique',
    p10: `Le droit suisse est exclusivement applicable, à l’exclusion de la Convention des Nations Unies sur les contrats de vente internationale de marchandises (CVIM). Le for juridique est au siège de ${c.name}, sous réserve de dispositions impératives prévoyant un autre for.`,
  },
  it: {
    metaTitle: 'Condizioni generali di vendita (CG)',
    metaDescription: `CG per gli ordini presso ${c.name}: prezzi in franchi svizzeri IVA inclusa, pagamento anticipato con bonifico, consegna in tutta la Svizzera.`,
    crumb: 'CG',
    title: 'Condizioni generali di vendita',
    lead: `Per gli ordini nel negozio online di ${c.name}`,
    note: 'Fa stato unicamente la versione tedesca delle presenti CG; in caso di divergenze, essa prevale sulla presente traduzione.',
    h1: '1. Campo d’applicazione',
    p1: `Le presenti condizioni generali di vendita (CG) si applicano a tutti gli ordini effettuati tramite il negozio online ${host}. La controparte contrattuale è ${c.name}${seat} (di seguito «noi»). Condizioni divergenti della clientela si applicano soltanto se le abbiamo accettate per iscritto.`,
    h2: '2. Offerta e conclusione del contratto',
    p2: (btn: string) => `La presentazione dei prodotti nel negozio online non costituisce un’offerta vincolante. Cliccando su «${btn}» presentate un’offerta vincolante. Il contratto è concluso con la nostra conferma d’ordine via e-mail, che contiene il vostro numero d’ordine e i dati per il pagamento.`,
    h3: '3. Prezzi',
    p3: `Tutti i prezzi si intendono in franchi svizzeri (CHF), IVA legale inclusa. Fa stato il prezzo valido al momento dell’ordine. Per la spedizione addebitiamo un forfait di ${ship} per ordine. A partire da un valore della merce di ${free} la spedizione è gratuita.`,
    h4: '4. Pagamento (pagamento anticipato)',
    p4: `Il pagamento avviene esclusivamente in anticipo, mediante bonifico bancario sul conto indicato nella conferma d’ordine. Vi preghiamo di indicare il numero d’ordine nella causale del pagamento. L’importo è esigibile entro ${days} giorni dall’ordine. Se entro questo termine non riceviamo alcun pagamento, abbiamo il diritto di recedere dal contratto e di annullare l’ordine.`,
    h5: '5. Consegna',
    p5: 'Consegniamo esclusivamente a indirizzi in Svizzera. La spedizione avviene con la Posta Svizzera dopo la ricezione del pagamento completo, di regola entro 1–3 giorni lavorativi. Se, contrariamente alle attese, un prodotto non fosse disponibile, vi informiamo immediatamente e rimborsiamo integralmente i pagamenti già effettuati.',
    h6: '6. Riserva di proprietà e trasferimento dei rischi',
    p6: 'La merce rimane di nostra proprietà fino al pagamento completo. Utili e rischi passano alla clientela con la consegna della merce alla Posta Svizzera.',
    h7: '7. Verifica, difetti e restituzione',
    p7: <>Vi preghiamo di verificare la merce al ricevimento e di segnalare danni di trasporto o difetti entro 7 giorni a {ordersMail}. In caso di reclami giustificati, a nostra scelta forniamo una sostituzione o rimborsiamo il prezzo d’acquisto. Per motivi igienici, i generi alimentari sono esclusi dal cambio e dalla restituzione se la confezione è stata aperta. In Svizzera non esiste un diritto di revoca legale per gli acquisti online.</>,
    h8: '8. Responsabilità',
    p8: 'Rispondiamo nei limiti delle disposizioni legali. Nella misura consentita dalla legge, la responsabilità per negligenza lieve è esclusa.',
    h9: '9. Protezione dei dati',
    p9: ['Trattiamo i vostri dati personali conformemente alla nostra ', 'informativa sulla protezione dei dati', '.'],
    h10: '10. Diritto applicabile e foro competente',
    p10: `Si applica esclusivamente il diritto svizzero, con esclusione della Convenzione delle Nazioni Unite sui contratti di compravendita internazionale di merci (CISG). Il foro competente è la sede di ${c.name}, salvo disposizioni imperative che prevedano un altro foro.`,
  },
  en: {
    metaTitle: 'General Terms and Conditions (GTC)',
    metaDescription: `GTC for orders from ${c.name}: prices in Swiss francs incl. VAT, payment in advance by bank transfer, delivery by Swiss Post across Switzerland.`,
    crumb: 'GTC',
    title: 'General Terms and Conditions',
    lead: `For orders placed in the ${c.name} online shop`,
    note: 'Only the German version of these GTC is legally binding; in the event of any discrepancy, it shall prevail over this translation.',
    h1: '1. Scope',
    p1: `These General Terms and Conditions (GTC) apply to all orders placed via the online shop at ${host}. The contracting party is ${c.name}${seat} (hereinafter “we”). Deviating terms of the customer apply only if we have agreed to them in writing.`,
    h2: '2. Offer and conclusion of contract',
    p2: (btn: string) => `The presentation of products in the online shop does not constitute a binding offer. By clicking “${btn}”, you submit a binding offer. The contract is concluded upon our order confirmation by e-mail, which contains your order number and the payment details.`,
    h3: '3. Prices',
    p3: `All prices are in Swiss francs (CHF) and include statutory VAT. The price applicable at the time of the order is binding. We charge a flat rate of ${ship} per order for shipping. Shipping is free for orders with a goods value of ${free} or more.`,
    h4: '4. Payment (payment in advance)',
    p4: `Payment is made exclusively in advance by bank transfer to the account stated in the order confirmation. Please quote your order number in the payment reference. The amount is due for payment within ${days} days of the order. If no payment is received within this period, we are entitled to withdraw from the contract and cancel the order.`,
    h5: '5. Delivery',
    p5: 'We deliver exclusively to addresses in Switzerland. Goods are shipped by Swiss Post after receipt of full payment, usually within 1 to 3 working days. Should a product unexpectedly be unavailable, we will inform you without delay and refund any payments already made in full.',
    h6: '6. Retention of title and transfer of risk',
    p6: 'The goods remain our property until paid for in full. Benefit and risk pass to the customer upon handover of the goods to Swiss Post.',
    h7: '7. Inspection, defects and returns',
    p7: <>Please inspect the goods upon receipt and report any transport damage or defects within 7 days to {ordersMail}. In the case of justified complaints, we will, at our discretion, supply a replacement or refund the purchase price. For reasons of hygiene, food products are excluded from exchange and return once the packaging has been opened. There is no statutory right of withdrawal for online purchases in Switzerland.</>,
    h8: '8. Liability',
    p8: 'We are liable within the scope of the statutory provisions. Liability for slight negligence is excluded to the extent permitted by law.',
    h9: '9. Data protection',
    p9: ['We process your personal data in accordance with our ', 'privacy policy', '.'],
    h10: '10. Applicable law and place of jurisdiction',
    p10: `These GTC are governed exclusively by Swiss law, excluding the United Nations Convention on Contracts for the International Sale of Goods (CISG). The place of jurisdiction is the registered office of ${c.name}, unless mandatory provisions stipulate another place of jurisdiction.`,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  return pageMeta(lang, PATH, T[lang].metaTitle, T[lang].metaDescription);
}

export default async function Agb({ params }: Props) {
  const lang = asLocale((await params).lang);
  const t = T[lang];
  return (
    <>
      <PageHero lang={lang} crumb={t.crumb} title={t.title} lead={t.lead} />
      <section className="section">
        <div className="wrap prose">
          {t.note && <p><em>{t.note}</em></p>}
          <h2>{t.h1}</h2>
          <p>{t.p1}</p>
          <h2>{t.h2}</h2>
          <p>{t.p2(submit(lang))}</p>
          <h2>{t.h3}</h2>
          <p>{t.p3}</p>
          <h2>{t.h4}</h2>
          <p>{t.p4}</p>
          <h2>{t.h5}</h2>
          <p>{t.p5}</p>
          <h2>{t.h6}</h2>
          <p>{t.p6}</p>
          <h2>{t.h7}</h2>
          <p>{t.p7}</p>
          <h2>{t.h8}</h2>
          <p>{t.p8}</p>
          <h2>{t.h9}</h2>
          <p>{t.p9[0]}<Link href={lp(lang, '/datenschutz')}>{t.p9[1]}</Link>{t.p9[2]}</p>
          <h2>{t.h10}</h2>
          <p>{t.p10}</p>
        </div>
      </section>
    </>
  );
}
