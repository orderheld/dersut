import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { config } from '@/lib/config';
import { companyAddressLines } from '@/lib/format';
import { asLocale, type Locale } from '@/lib/i18n';
import { pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ lang: string }> };

const PATH = '/datenschutz';
const info = config.email.info;
const infoMail = <a href={`mailto:${info}`}>{info}</a>;

const de = {
  metaTitle: 'Datenschutzerklärung',
  metaDescription: 'Datenschutzerklärung von Dersut Kaffee Schweiz gemäss DSG: welche Daten wir bei Bestellungen bearbeiten, eingesetzte Dienstleister, Cookies und Ihre Rechte.',
  crumb: 'Datenschutz',
  title: 'Datenschutzerklärung',
  lead: 'Gemäss dem Schweizer Datenschutzgesetz (DSG)',
  note: '',
  country: 'Schweiz',
  email: 'E-Mail',
  controller: 'Verantwortliche Stelle',
  dataTitle: 'Welche Daten wir bearbeiten',
  ordersTitle: 'Bestellungen',
  orders: 'Wenn Sie im Onlineshop bestellen, bearbeiten wir Name, Firma (optional), Lieferadresse, E-Mail-Adresse, Telefonnummer (optional), Ihre Bemerkungen sowie die bestellten Produkte. Wir verwenden diese Daten ausschliesslich zur Abwicklung der Bestellung, zur Zuordnung Ihrer Zahlung, für den Versand und für die Kommunikation mit Ihnen. Für den Versand geben wir Name und Adresse an die Schweizerische Post weiter.',
  contactTitle: 'Kontaktformular und E-Mail',
  contact: 'Wenn Sie uns schreiben, bearbeiten wir Ihre Angaben, um Ihre Anfrage zu beantworten.',
  processorsTitle: 'Dienstleister',
  processors: 'Für den Betrieb der Webseite setzen wir folgende Dienstleister ein, die Daten in unserem Auftrag bearbeiten: Vercel Inc. (Hosting der Webseite), Neon Inc. (Datenbank für Bestellungen, Rechenzentrum in der EU) und Resend Inc. (Versand der Bestell-E-Mails). Dabei können Daten auch in den USA bearbeitet werden; die Übermittlung erfolgt auf Grundlage der Standardvertragsklauseln bzw. des Swiss-U.S. Data Privacy Framework. Unsere E-Mail-Postfächer werden von cyon GmbH in der Schweiz betrieben.',
  logsTitle: 'Server-Logdaten',
  logs: 'Beim Besuch der Webseite werden technisch notwendige Daten (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser) verarbeitet. Diese dienen der Sicherheit und dem Betrieb der Webseite.',
  cookiesTitle: 'Cookies und Tracking',
  cookies: 'Wir verwenden ausschliesslich technisch notwendige Cookies, damit Ihr Warenkorb funktioniert. Wir setzen keine Analyse- oder Werbe-Tracker ein. Schriftarten werden von unserem eigenen Server geladen.',
  retentionTitle: 'Aufbewahrung',
  retention: 'Bestell- und Buchhaltungsdaten bewahren wir gemäss den gesetzlichen Aufbewahrungspflichten während zehn Jahren auf. Anfragen über das Kontaktformular löschen wir, sobald sie erledigt sind und keine Aufbewahrungspflicht besteht.',
  securityTitle: 'Datensicherheit',
  security: 'Die Webseite ist mit TLS verschlüsselt. Zahlungsdaten wie Kreditkarten werden von uns nicht erhoben, da wir nur Vorauskasse per Banküberweisung anbieten.',
  rightsTitle: 'Ihre Rechte',
  rights: <>Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer Personendaten sowie auf Herausgabe Ihrer Daten, soweit keine gesetzliche Aufbewahrungspflicht entgegensteht. Wenden Sie sich dazu an {infoMail}. Sie können sich zudem beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) beschweren.</>,
};

const T: Record<Locale, typeof de> = {
  de,
  fr: {
    metaTitle: 'Déclaration de protection des données',
    metaDescription: 'Protection des données chez Dersut Kaffee Schweiz selon la LPD : données traitées lors des commandes, prestataires mandatés, cookies et vos droits.',
    crumb: 'Protection des données',
    title: 'Déclaration de protection des données',
    lead: 'Conformément à la loi fédérale sur la protection des données (LPD)',
    note: 'Seule la version allemande de la présente déclaration fait foi ; en cas de divergence, elle prévaut sur la présente traduction.',
    country: 'Suisse',
    email: 'E-mail',
    controller: 'Responsable du traitement',
    dataTitle: 'Données que nous traitons',
    ordersTitle: 'Commandes',
    orders: 'Lorsque vous passez commande dans la boutique en ligne, nous traitons votre nom, votre entreprise (facultatif), votre adresse de livraison, votre adresse e-mail, votre numéro de téléphone (facultatif), vos remarques ainsi que les produits commandés. Nous utilisons ces données exclusivement pour le traitement de la commande, l’attribution de votre paiement, l’expédition et la communication avec vous. Pour l’expédition, nous transmettons votre nom et votre adresse à La Poste suisse.',
    contactTitle: 'Formulaire de contact et e-mail',
    contact: 'Lorsque vous nous écrivez, nous traitons vos indications afin de répondre à votre demande.',
    processorsTitle: 'Prestataires',
    processors: 'Pour l’exploitation du site, nous faisons appel aux prestataires suivants, qui traitent des données sur notre mandat : Vercel Inc. (hébergement du site), Neon Inc. (base de données des commandes, centre de données dans l’UE) et Resend Inc. (envoi des e-mails de commande). Des données peuvent également être traitées aux États-Unis ; leur communication repose sur les clauses contractuelles types ou sur le Swiss-U.S. Data Privacy Framework. Nos boîtes e-mail sont exploitées par cyon GmbH en Suisse.',
    logsTitle: 'Données des journaux du serveur',
    logs: 'Lors de la visite du site, des données techniquement nécessaires (adresse IP, date et heure, page consultée, navigateur) sont traitées. Elles servent à la sécurité et à l’exploitation du site.',
    cookiesTitle: 'Cookies et suivi',
    cookies: 'Nous utilisons exclusivement des cookies techniquement nécessaires au fonctionnement de votre panier. Nous n’utilisons aucun outil de suivi à des fins d’analyse ou de publicité. Les polices de caractères sont chargées depuis notre propre serveur.',
    retentionTitle: 'Conservation',
    retention: 'Nous conservons les données de commande et de comptabilité pendant dix ans, conformément aux obligations légales de conservation. Les demandes reçues via le formulaire de contact sont supprimées dès qu’elles ont été traitées et qu’aucune obligation de conservation ne s’applique.',
    securityTitle: 'Sécurité des données',
    security: 'Le site est chiffré au moyen de TLS. Nous ne collectons aucune donnée de paiement telle que les données de carte de crédit, puisque nous proposons uniquement le paiement anticipé par virement bancaire.',
    rightsTitle: 'Vos droits',
    rights: <>Vous avez le droit d’accéder à vos données personnelles, de les faire rectifier et effacer et d’en obtenir la remise, pour autant qu’aucune obligation légale de conservation ne s’y oppose. Pour ce faire, adressez-vous à {infoMail}. Vous pouvez en outre déposer une plainte auprès du Préposé fédéral à la protection des données et à la transparence (PFPDT).</>,
  },
  it: {
    metaTitle: 'Informativa sulla protezione dei dati',
    metaDescription: 'Protezione dei dati presso Dersut Kaffee Schweiz secondo la LPD: quali dati trattiamo per gli ordini, fornitori incaricati, cookie e i vostri diritti.',
    crumb: 'Protezione dei dati',
    title: 'Informativa sulla protezione dei dati',
    lead: 'Conformemente alla legge federale sulla protezione dei dati (LPD)',
    note: 'Fa stato unicamente la versione tedesca della presente informativa; in caso di divergenze, essa prevale sulla presente traduzione.',
    country: 'Svizzera',
    email: 'E-mail',
    controller: 'Titolare del trattamento',
    dataTitle: 'Quali dati trattiamo',
    ordersTitle: 'Ordini',
    orders: 'Quando ordinate nel negozio online, trattiamo nome, ditta (facoltativa), indirizzo di consegna, indirizzo e-mail, numero di telefono (facoltativo), le vostre osservazioni e i prodotti ordinati. Utilizziamo questi dati esclusivamente per l’evasione dell’ordine, l’attribuzione del vostro pagamento, la spedizione e la comunicazione con voi. Per la spedizione trasmettiamo nome e indirizzo alla Posta Svizzera.',
    contactTitle: 'Modulo di contatto ed e-mail',
    contact: 'Quando ci scrivete, trattiamo i vostri dati per rispondere alla vostra richiesta.',
    processorsTitle: 'Fornitori di servizi',
    processors: 'Per la gestione del sito ci avvaliamo dei seguenti fornitori di servizi, che trattano dati per nostro conto: Vercel Inc. (hosting del sito), Neon Inc. (banca dati degli ordini, centro di calcolo nell’UE) e Resend Inc. (invio delle e-mail relative agli ordini). I dati possono essere trattati anche negli Stati Uniti; la comunicazione avviene sulla base delle clausole contrattuali standard o dello Swiss-U.S. Data Privacy Framework. Le nostre caselle e-mail sono gestite da cyon GmbH in Svizzera.',
    logsTitle: 'Dati di log del server',
    logs: 'Durante la visita del sito vengono trattati dati tecnicamente necessari (indirizzo IP, data e ora, pagina consultata, browser). Essi servono alla sicurezza e al funzionamento del sito.',
    cookiesTitle: 'Cookie e tracciamento',
    cookies: 'Utilizziamo esclusivamente cookie tecnicamente necessari, affinché il vostro carrello funzioni. Non impieghiamo strumenti di tracciamento a fini di analisi o pubblicitari. I caratteri tipografici vengono caricati dal nostro server.',
    retentionTitle: 'Conservazione',
    retention: 'Conserviamo i dati relativi agli ordini e alla contabilità per dieci anni, conformemente agli obblighi legali di conservazione. Le richieste pervenute tramite il modulo di contatto vengono cancellate non appena evase e se non sussiste alcun obbligo di conservazione.',
    securityTitle: 'Sicurezza dei dati',
    security: 'Il sito è cifrato con TLS. Non raccogliamo dati di pagamento come quelli delle carte di credito, poiché offriamo unicamente il pagamento anticipato tramite bonifico bancario.',
    rightsTitle: 'I vostri diritti',
    rights: <>Avete il diritto di ottenere informazioni sui vostri dati personali, di chiederne la rettifica e la cancellazione nonché di ottenerne la consegna, nella misura in cui non vi si opponga un obbligo legale di conservazione. A tal fine rivolgetevi a {infoMail}. Potete inoltre presentare reclamo all’Incaricato federale della protezione dei dati e della trasparenza (IFPDT).</>,
  },
  en: {
    metaTitle: 'Privacy policy',
    metaDescription: 'Privacy policy of Dersut Kaffee Schweiz under the revised Swiss FADP: what data we process for orders, the service providers we use, cookies and your rights.',
    crumb: 'Privacy',
    title: 'Privacy policy',
    lead: 'In accordance with the Swiss Federal Act on Data Protection (FADP)',
    note: 'Only the German version of this privacy policy is legally binding; in the event of any discrepancy, it shall prevail over this translation.',
    country: 'Switzerland',
    email: 'E-mail',
    controller: 'Controller',
    dataTitle: 'What data we process',
    ordersTitle: 'Orders',
    orders: 'When you order in the online shop, we process your name, company (optional), delivery address, e-mail address, telephone number (optional), your comments and the products ordered. We use this data exclusively to process the order, to match your payment, for shipping and to communicate with you. For shipping, we pass your name and address on to Swiss Post.',
    contactTitle: 'Contact form and e-mail',
    contact: 'When you write to us, we process the information you provide in order to answer your enquiry.',
    processorsTitle: 'Service providers',
    processors: 'To operate the website, we use the following service providers, who process data on our behalf: Vercel Inc. (website hosting), Neon Inc. (order database, data centre in the EU) and Resend Inc. (sending order e-mails). Data may also be processed in the USA; such transfers are based on the standard contractual clauses or the Swiss-U.S. Data Privacy Framework. Our e-mail mailboxes are operated by cyon GmbH in Switzerland.',
    logsTitle: 'Server log data',
    logs: 'When you visit the website, technically necessary data (IP address, date and time, page accessed, browser) is processed. This data serves the security and operation of the website.',
    cookiesTitle: 'Cookies and tracking',
    cookies: 'We only use technically necessary cookies so that your shopping basket works. We do not use any analytics or advertising trackers. Fonts are loaded from our own server.',
    retentionTitle: 'Retention',
    retention: 'We retain order and accounting data for ten years in accordance with the statutory retention obligations. Enquiries submitted via the contact form are deleted as soon as they have been dealt with and no retention obligation applies.',
    securityTitle: 'Data security',
    security: 'The website is encrypted with TLS. We do not collect payment data such as credit card details, as we only offer payment in advance by bank transfer.',
    rightsTitle: 'Your rights',
    rights: <>You have the right to access, rectify and erase your personal data and to receive a copy of your data, provided this does not conflict with any statutory retention obligation. To exercise these rights, please contact {infoMail}. You may also lodge a complaint with the Federal Data Protection and Information Commissioner (FDPIC).</>,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  return pageMeta(lang, PATH, T[lang].metaTitle, T[lang].metaDescription);
}

export default async function Datenschutz({ params }: Props) {
  const lang = asLocale((await params).lang);
  const t = T[lang];
  const address = companyAddressLines().map((l) => (l === 'Schweiz' ? t.country : l));
  return (
    <>
      <PageHero lang={lang} crumb={t.crumb} title={t.title} lead={t.lead} />
      <section className="section">
        <div className="wrap prose">
          {t.note && <p><em>{t.note}</em></p>}
          <h2>{t.controller}</h2>
          <p>{address.map((l, i) => <span key={i}>{l}<br /></span>)}{t.email}: {infoMail}</p>
          <h2>{t.dataTitle}</h2>
          <h3>{t.ordersTitle}</h3>
          <p>{t.orders}</p>
          <h3>{t.contactTitle}</h3>
          <p>{t.contact}</p>
          <h3>{t.processorsTitle}</h3>
          <p>{t.processors}</p>
          <h3>{t.logsTitle}</h3>
          <p>{t.logs}</p>
          <h2>{t.cookiesTitle}</h2>
          <p>{t.cookies}</p>
          <h2>{t.retentionTitle}</h2>
          <p>{t.retention}</p>
          <h2>{t.securityTitle}</h2>
          <p>{t.security}</p>
          <h2>{t.rightsTitle}</h2>
          <p>{t.rights}</p>
        </div>
      </section>
    </>
  );
}
