import type { Locale } from '@/lib/i18n';

/**
 * Infoseiten für Geschäftskunden: Gastronomie (/gastronomie) und Firmen & Büro (/firmen).
 * Texte in allen vier Sprachen; die Seiten selbst baut src/components/B2BPage.tsx.
 */
export type B2BKind = 'gastro' | 'office';

export type B2BText = {
  metaTitle: string;
  metaDescription: string;
  crumb: string;
  eyebrow: string;
  title: [string, string];
  lead: string;
  heroCta: string;
  segEyebrow: string;
  segTitle: string;
  segments: [string, string, string][];
  whyEyebrow: string;
  whyTitle: string;
  whyText: string;
  why: string[];
  imgAlt: string;
  stepsEyebrow: string;
  stepsTitle: string;
  steps: [string, string][];
  faqTitle: string;
  faq: [string, string][];
  formEyebrow: string;
  formTitle: string;
  formText: string;
  crossTitle: string;
  crossText: string;
  crossLink: string;
};

export const B2B_PATH: Record<B2BKind, string> = { gastro: '/gastronomie', office: '/firmen' };

export const B2B: Record<B2BKind, Record<Locale, B2BText>> = {
  gastro: {
    de: {
      metaTitle: 'Kaffee für Gastronomie: Espresso für Restaurant, Bar & Hotel',
      metaDescription:
        'Original Dersut Espresso für Restaurants, Bars, Cafés und Hotels in Basel und der ganzen Schweiz. Individuelle Konditionen für Geschäftskunden direkt vom offiziellen Vertrieb.',
      crumb: 'Gastronomie',
      eyebrow: 'Horeca · Bar · Ristorante',
      title: ['Italienischer Espresso', 'für Ihre Gäste'],
      lead:
        'Restaurants, Bars, Cafés, Hotels und Bäckereien: Wir liefern Ihnen den Espresso, den über 4’000 Betriebe in Italien und weltweit ausschenken. Mit Schweizer Ansprechpartner in Basel und zu Konditionen, die zu Ihrem Bedarf passen.',
      heroCta: 'Konditionen anfragen',
      segEyebrow: 'Für wen',
      segTitle: 'Gemacht für die Gastronomie',
      segments: [
        ['cup', 'Bars & Cafés', 'Ein Espresso mit dichter, langanhaltender Crema, Tasse für Tasse gleich gut. Ideal für Espresso, Cappuccino und Latte macchiato.'],
        ['users', 'Restaurants & Pizzerien', 'Der krönende Abschluss eines guten Essens: ein echter italienischer Espresso, der Ihre Küche würdig abrundet.'],
        ['award', 'Hotels & Frühstück', 'Vom Frühstücksbuffet bis zur Hotelbar: eine Mischung, die im Vollautomaten und in der Siebträgermaschine überzeugt.'],
        ['box', 'Bäckereien & Take-away', 'Kaffee zum Mitnehmen mit italienischem Charakter. Konstante Qualität auch bei hohem Durchsatz.'],
      ],
      whyEyebrow: 'Ihre Vorteile',
      whyTitle: 'Warum Gastronomen auf Dersut setzen',
      whyText:
        'Dersut röstet seit 1947 in Conegliano und beliefert seit Jahrzehnten Bars und Restaurants in ganz Italien. Als offizieller Vertrieb in der Schweiz bringen wir diese Erfahrung direkt zu Ihnen.',
      why: [
        'Individuelle Preise und Mengenkonditionen für Geschäftskunden',
        'Originalware direkt aus der Rösterei, ohne Zwischenhandel',
        'Persönlicher Ansprechpartner in Basel, Rechnung in CHF',
        'Lieferung in die ganze Schweiz, regelmässig nach Vereinbarung',
        'Beratung zu Mischung, Mahlgrad und Zubereitung',
        'Zertifiziert: Espresso Italiano Certificato (IEI)',
      ],
      imgAlt: 'Barista bei der Zubereitung von Dersut Espresso',
      stepsEyebrow: 'So einfach geht’s',
      stepsTitle: 'In drei Schritten zu Ihrem Hausespresso',
      steps: [
        ['Anfrage senden', 'Erzählen Sie uns kurz von Ihrem Betrieb, Ihrer Maschine und Ihrem ungefähren Bedarf pro Monat.'],
        ['Angebot erhalten', 'Wir melden uns persönlich, empfehlen die passende Mischung und erstellen Ihnen ein individuelles Angebot.'],
        ['Geniessen & ausschenken', 'Sie erhalten Ihren Dersut Espresso regelmässig geliefert. Nachbestellen ist jederzeit unkompliziert möglich.'],
      ],
      faqTitle: 'Häufige Fragen aus der Gastronomie',
      faq: [
        ['Welche Mischung eignet sich für meinen Betrieb?', 'Optimum Rosso ist ausgewogen mit feinen Kakaonoten und langanhaltender Crema, ideal als Hausespresso. Domus Marrone ist kräftiger und vollmundiger, perfekt für Gäste, die einen intensiven Espresso schätzen und für Milchgetränke. Wir beraten Sie gerne persönlich.'],
        ['Gibt es Mengenrabatte?', 'Ja. Für Betriebe mit regelmässigem Bedarf erstellen wir ein individuelles Angebot. Die Konditionen richten sich nach Menge und Liefertakt.'],
        ['Liefern Sie in die ganze Schweiz?', 'Ja, wir liefern in alle Regionen der Schweiz: von Basel über Zürich und Bern bis in die Romandie und ins Tessin.'],
        ['Kann ich Dersut vorher testen?', 'Natürlich. Sie können einzelne Packungen jederzeit in unserem Onlineshop bestellen und den Kaffee in Ruhe mit Ihrer Maschine testen.'],
        ['Funktioniert Dersut mit meiner Maschine?', 'Die ganzen Bohnen eignen sich für Siebträgermaschinen und Vollautomaten. Gerne geben wir Ihnen Tipps zu Mahlgrad, Dosierung und Bezugszeit.'],
      ],
      formEyebrow: 'Anfrage',
      formTitle: 'Konditionen für Ihren Betrieb anfragen',
      formText: 'Unverbindlich und kostenlos. Wir antworten in der Regel innert eines Arbeitstages.',
      crossTitle: 'Kaffee fürs Büro?',
      crossText: 'Auch für Firmen, Praxen und Kanzleien haben wir passende Angebote.',
      crossLink: 'Zu Firmen & Büro',
    },
    fr: {
      metaTitle: 'Café pour la restauration : espresso pour restaurant, bar & hôtel',
      metaDescription:
        'Espresso Dersut original pour restaurants, bars, cafés et hôtels à Genève, Lausanne et dans toute la Suisse. Conditions sur mesure pour les professionnels, directement auprès du distributeur officiel.',
      crumb: 'Restauration',
      eyebrow: 'Horeca · Bar · Ristorante',
      title: ['L’espresso italien', 'pour vos clients'],
      lead:
        'Restaurants, bars, cafés, hôtels et boulangeries : nous vous livrons l’espresso servi par plus de 4’000 établissements en Italie et dans le monde. Avec un interlocuteur en Suisse et des conditions adaptées à vos besoins.',
      heroCta: 'Demander nos conditions',
      segEyebrow: 'Pour qui',
      segTitle: 'Pensé pour la restauration',
      segments: [
        ['cup', 'Bars & cafés', 'Un espresso à la crème dense et persistante, aussi bon tasse après tasse. Idéal pour l’espresso, le cappuccino et le latte macchiato.'],
        ['users', 'Restaurants & pizzerias', 'La touche finale d’un bon repas : un véritable espresso italien, à la hauteur de votre cuisine.'],
        ['award', 'Hôtels & petit-déjeuner', 'Du buffet du petit-déjeuner au bar de l’hôtel : un mélange qui convainc en machine automatique comme en machine à porte-filtre.'],
        ['box', 'Boulangeries & take-away', 'Du café à l’emporter au caractère italien. Une qualité constante, même à fort débit.'],
      ],
      whyEyebrow: 'Vos avantages',
      whyTitle: 'Pourquoi les restaurateurs choisissent Dersut',
      whyText:
        'Dersut torréfie depuis 1947 à Conegliano et fournit depuis des décennies bars et restaurants dans toute l’Italie. En tant que distributeur officiel en Suisse, nous mettons cette expérience à votre service.',
      why: [
        'Prix et conditions sur mesure pour les professionnels',
        'Produits originaux, directement de la torréfaction, sans intermédiaire',
        'Interlocuteur personnel en Suisse, facture en CHF',
        'Livraison dans toute la Suisse, régulière selon accord',
        'Conseils sur le mélange, la mouture et la préparation',
        'Certifié : Espresso Italiano Certificato (IEI)',
      ],
      imgAlt: 'Barista préparant un espresso Dersut',
      stepsEyebrow: 'Rien de plus simple',
      stepsTitle: 'Votre espresso maison en trois étapes',
      steps: [
        ['Envoyer une demande', 'Présentez-nous brièvement votre établissement, votre machine et vos besoins mensuels approximatifs.'],
        ['Recevoir une offre', 'Nous vous recontactons personnellement, vous conseillons le mélange idéal et établissons une offre sur mesure.'],
        ['Servir & savourer', 'Votre espresso Dersut vous est livré régulièrement. Recommander est simple, à tout moment.'],
      ],
      faqTitle: 'Questions fréquentes des restaurateurs',
      faq: [
        ['Quel mélange convient à mon établissement ?', 'Optimum Rosso est équilibré, avec de fines notes de cacao et une crème persistante : l’espresso maison idéal. Domus Marrone est plus corsé et plus rond, parfait pour les amateurs d’espresso intense et pour les boissons lactées. Nous vous conseillons volontiers.'],
        ['Proposez-vous des remises sur quantité ?', 'Oui. Pour les établissements aux besoins réguliers, nous établissons une offre personnalisée. Les conditions dépendent des quantités et du rythme de livraison.'],
        ['Livrez-vous dans toute la Suisse ?', 'Oui, nous livrons dans toutes les régions : Genève, Lausanne, Neuchâtel, Fribourg, le Valais et le Jura comme la Suisse alémanique et le Tessin.'],
        ['Puis-je tester Dersut avant ?', 'Bien sûr. Vous pouvez commander des paquets à l’unité dans notre boutique en ligne et tester le café en toute tranquillité avec votre machine.'],
        ['Dersut fonctionne-t-il avec ma machine ?', 'Les grains entiers conviennent aux machines à porte-filtre et aux machines automatiques. Nous vous donnons volontiers des conseils sur la mouture, le dosage et le temps d’extraction.'],
      ],
      formEyebrow: 'Demande',
      formTitle: 'Demander les conditions pour votre établissement',
      formText: 'Sans engagement et gratuit. Nous répondons en général dans un délai d’un jour ouvrable.',
      crossTitle: 'Du café pour le bureau ?',
      crossText: 'Nous avons aussi des offres adaptées aux entreprises, cabinets et études.',
      crossLink: 'Entreprises & bureau',
    },
    it: {
      metaTitle: 'Caffè per la gastronomia: espresso per ristorante, bar & hotel',
      metaDescription:
        'Espresso Dersut originale per ristoranti, bar, caffè e hotel in Ticino e in tutta la Svizzera. Condizioni su misura per clienti commerciali, direttamente dal distributore ufficiale.',
      crumb: 'Gastronomia',
      eyebrow: 'Horeca · Bar · Ristorante',
      title: ['Vero espresso italiano', 'per i vostri ospiti'],
      lead:
        'Ristoranti, bar, caffè, hotel e panetterie: vi forniamo l’espresso servito da oltre 4’000 locali in Italia e nel mondo. Con un referente in Svizzera e condizioni adatte al vostro fabbisogno.',
      heroCta: 'Richiedere le condizioni',
      segEyebrow: 'Per chi',
      segTitle: 'Pensato per la gastronomia',
      segments: [
        ['cup', 'Bar & caffè', 'Un espresso dalla crema densa e persistente, sempre buono tazzina dopo tazzina. Ideale per espresso, cappuccino e latte macchiato.'],
        ['users', 'Ristoranti & pizzerie', 'Il degno finale di un buon pasto: un vero espresso italiano all’altezza della vostra cucina.'],
        ['award', 'Hotel & colazione', 'Dal buffet della colazione al bar dell’hotel: una miscela che convince nella macchina automatica e in quella a leva.'],
        ['box', 'Panetterie & take-away', 'Caffè da asporto dal carattere italiano. Qualità costante anche con grandi volumi.'],
      ],
      whyEyebrow: 'I vostri vantaggi',
      whyTitle: 'Perché i gastronomi scelgono Dersut',
      whyText:
        'Dersut tosta dal 1947 a Conegliano e da decenni rifornisce bar e ristoranti in tutta Italia. Come distributore ufficiale in Svizzera mettiamo questa esperienza al vostro servizio.',
      why: [
        'Prezzi e condizioni su misura per clienti commerciali',
        'Prodotti originali direttamente dalla torrefazione, senza intermediari',
        'Referente personale in Svizzera, fattura in CHF',
        'Consegna in tutta la Svizzera, regolare secondo accordi',
        'Consulenza su miscela, macinatura e preparazione',
        'Certificato: Espresso Italiano Certificato (IEI)',
      ],
      imgAlt: 'Barista durante la preparazione di un espresso Dersut',
      stepsEyebrow: 'Semplicissimo',
      stepsTitle: 'Il vostro espresso della casa in tre passi',
      steps: [
        ['Inviare la richiesta', 'Raccontateci brevemente del vostro locale, della vostra macchina e del fabbisogno mensile indicativo.'],
        ['Ricevere l’offerta', 'Vi ricontattiamo personalmente, consigliamo la miscela giusta e prepariamo un’offerta su misura.'],
        ['Servire & gustare', 'Il vostro espresso Dersut vi viene consegnato regolarmente. Riordinare è semplice in qualsiasi momento.'],
      ],
      faqTitle: 'Domande frequenti dalla gastronomia',
      faq: [
        ['Quale miscela è adatta al mio locale?', 'Optimum Rosso è equilibrata, con fini note di cacao e crema persistente: l’espresso della casa ideale. Domus Marrone è più decisa e corposa, perfetta per chi ama un espresso intenso e per le bevande al latte. Vi consigliamo volentieri.'],
        ['Ci sono sconti sulla quantità?', 'Sì. Per i locali con un fabbisogno regolare prepariamo un’offerta personalizzata. Le condizioni dipendono da quantità e frequenza di consegna.'],
        ['Consegnate in tutta la Svizzera?', 'Sì, consegniamo in tutte le regioni della Svizzera, dal Ticino alla Svizzera tedesca fino alla Romandia.'],
        ['Posso provare Dersut prima?', 'Certo. Potete ordinare singole confezioni nel nostro negozio online e provare il caffè con calma con la vostra macchina.'],
        ['Dersut funziona con la mia macchina?', 'I chicchi interi sono adatti alle macchine a leva e alle macchine automatiche. Vi diamo volentieri consigli su macinatura, dosaggio e tempo di estrazione.'],
      ],
      formEyebrow: 'Richiesta',
      formTitle: 'Richiedere le condizioni per il vostro locale',
      formText: 'Senza impegno e gratuito. Di regola rispondiamo entro un giorno lavorativo.',
      crossTitle: 'Caffè per l’ufficio?',
      crossText: 'Abbiamo offerte adatte anche per aziende, studi medici e studi legali.',
      crossLink: 'Aziende & ufficio',
    },
    en: {
      metaTitle: 'Coffee for hospitality: espresso for restaurants, bars & hotels',
      metaDescription:
        'Original Dersut espresso for restaurants, bars, cafés and hotels in Basel, Zurich, Geneva and throughout Switzerland. Tailored terms for business customers, direct from the official distributor.',
      crumb: 'Hospitality',
      eyebrow: 'Horeca · Bar · Ristorante',
      title: ['Italian espresso', 'for your guests'],
      lead:
        'Restaurants, bars, cafés, hotels and bakeries: we supply the espresso served by more than 4,000 businesses in Italy and around the world. With a Swiss contact in Basel and terms that match your needs.',
      heroCta: 'Request terms',
      segEyebrow: 'Who it’s for',
      segTitle: 'Made for hospitality',
      segments: [
        ['cup', 'Bars & cafés', 'An espresso with a dense, long-lasting crema, just as good cup after cup. Ideal for espresso, cappuccino and latte macchiato.'],
        ['users', 'Restaurants & pizzerias', 'The perfect end to a good meal: a genuine Italian espresso worthy of your kitchen.'],
        ['award', 'Hotels & breakfast', 'From the breakfast buffet to the hotel bar: a blend that shines in bean-to-cup machines and portafilter machines alike.'],
        ['box', 'Bakeries & take-away', 'Coffee to go with Italian character. Consistent quality, even at high volumes.'],
      ],
      whyEyebrow: 'Your benefits',
      whyTitle: 'Why hospitality businesses choose Dersut',
      whyText:
        'Dersut has been roasting in Conegliano since 1947 and has supplied bars and restaurants all over Italy for decades. As the official distributor in Switzerland, we bring that experience straight to you.',
      why: [
        'Individual prices and volume terms for business customers',
        'Original products straight from the roastery, no middlemen',
        'Personal contact in Basel, invoices in CHF',
        'Delivery throughout Switzerland, on a regular schedule if you wish',
        'Advice on blend, grind and preparation',
        'Certified: Espresso Italiano Certificato (IEI)',
      ],
      imgAlt: 'Barista preparing Dersut espresso',
      stepsEyebrow: 'It’s that simple',
      stepsTitle: 'Your house espresso in three steps',
      steps: [
        ['Send an enquiry', 'Tell us briefly about your business, your machine and your approximate monthly requirements.'],
        ['Receive a quote', 'We get back to you personally, recommend the right blend and prepare a tailored quote.'],
        ['Serve & enjoy', 'Your Dersut espresso is delivered regularly. Reordering is easy at any time.'],
      ],
      faqTitle: 'Frequently asked questions from hospitality',
      faq: [
        ['Which blend suits my business?', 'Optimum Rosso is balanced, with fine cocoa notes and a long-lasting crema: the ideal house espresso. Domus Marrone is stronger and fuller, perfect for guests who love an intense espresso and for milk drinks. We are happy to advise you.'],
        ['Do you offer volume discounts?', 'Yes. For businesses with regular requirements we prepare an individual quote. Terms depend on volume and delivery frequency.'],
        ['Do you deliver throughout Switzerland?', 'Yes, we deliver to every region of Switzerland, from Basel, Zurich and Bern to French-speaking Switzerland and Ticino.'],
        ['Can I try Dersut first?', 'Of course. You can order individual packs in our online shop at any time and test the coffee with your machine.'],
        ['Does Dersut work with my machine?', 'The whole beans are suitable for portafilter and bean-to-cup machines. We are happy to give you tips on grind, dose and extraction time.'],
      ],
      formEyebrow: 'Enquiry',
      formTitle: 'Request terms for your business',
      formText: 'Free and without obligation. We usually reply within one working day.',
      crossTitle: 'Coffee for the office?',
      crossText: 'We also have offers for companies, practices and law firms.',
      crossLink: 'Companies & office',
    },
  },
  office: {
    de: {
      metaTitle: 'Bürokaffee für Firmen: Espresso fürs Büro in der Schweiz',
      metaDescription:
        'Original italienischer Espresso fürs Büro: Dersut Kaffeebohnen für Firmen, Praxen und Kanzleien in Basel und der ganzen Schweiz. Mengenkonditionen und regelmässige Lieferung.',
      crumb: 'Firmen & Büro',
      eyebrow: 'Caffè in ufficio',
      title: ['Guter Kaffee', 'macht gute Teams'],
      lead:
        'Ob Startup, KMU, Arztpraxis oder Kanzlei: Mit Dersut trinken Ihre Mitarbeitenden und Gäste echten italienischen Espresso. Wir liefern Kaffeebohnen für Ihren Vollautomaten in die ganze Schweiz, zu Konditionen für Firmenkunden.',
      heroCta: 'Firmenangebot anfragen',
      segEyebrow: 'Für wen',
      segTitle: 'Kaffee für jede Art von Arbeitsplatz',
      segments: [
        ['users', 'Büros & KMU', 'Die Kaffeepause ist der Treffpunkt im Büro. Mit Dersut wird daraus ein kleiner Moment Italien.'],
        ['shield', 'Praxen & Kanzleien', 'Ein Espresso für Ihre Klientinnen und Klienten zeigt Wertschätzung vom ersten Moment an.'],
        ['flag', 'Empfang & Sitzungen', 'Beeindrucken Sie Kunden und Partner mit einem Kaffee, der nach mehr schmeckt.'],
        ['box', 'Showrooms & Geschäfte', 'Ein Kaffee für die Kundschaft verlängert jeden Besuch und bleibt in guter Erinnerung.'],
      ],
      whyEyebrow: 'Ihre Vorteile',
      whyTitle: 'Bürokaffee ohne Aufwand',
      whyText:
        'Sie bestimmen Menge und Rhythmus, wir kümmern uns um den Rest. Ihre Kaffeebohnen kommen original verpackt direkt aus der Rösterei in Conegliano, geliefert per Post an Ihre Firmenadresse.',
      why: [
        'Mengenkonditionen für Firmenkunden',
        'Regelmässige Lieferung nach Vereinbarung, ganze Schweiz',
        'Ganze Bohnen, ideal für Vollautomaten im Büro',
        'Ein fester Ansprechpartner, Rechnung in CHF',
        'Originalware vom offiziellen Vertrieb Schweiz',
        'Nachhaltige Rösterei: rund 80 % Energie aus eigener Solaranlage',
      ],
      imgAlt: 'Espressotassen mit Dersut Kaffee',
      stepsEyebrow: 'So funktioniert’s',
      stepsTitle: 'In drei Schritten zum Bürokaffee',
      steps: [
        ['Bedarf mitteilen', 'Wie viele Personen trinken bei Ihnen Kaffee, und welche Maschine steht im Büro? Ein paar Angaben genügen.'],
        ['Angebot erhalten', 'Wir empfehlen die passende Mischung und senden Ihnen ein Angebot mit Ihren Konditionen.'],
        ['Regelmässig beliefert', 'Ihr Kaffee kommt im vereinbarten Rhythmus. Mengen anpassen ist jederzeit möglich.'],
      ],
      faqTitle: 'Häufige Fragen zum Bürokaffee',
      faq: [
        ['Wie viel Kaffee braucht unser Büro?', 'Als Faustregel rechnet man mit rund 7 g Bohnen pro Tasse. Ein Kilo ergibt also etwa 140 Espressi. Bei 10 Personen mit je zwei Tassen pro Arbeitstag sind das rund 3 kg pro Monat.'],
        ['Eignen sich die Bohnen für unseren Vollautomaten?', 'Ja. Optimum Rosso und Domus Marrone sind ganze Bohnen und eignen sich für alle gängigen Vollautomaten. Wir empfehlen einen mittelfeinen bis feinen Mahlgrad.'],
        ['Gibt es Konditionen für Firmen?', 'Ja. Je nach Menge und Liefertakt erstellen wir Ihnen ein individuelles Angebot. Fragen Sie einfach unverbindlich an.'],
        ['Liefern Sie auch ausserhalb von Basel?', 'Selbstverständlich. Wir liefern an Firmenadressen in der ganzen Schweiz, von Zürich und Bern bis Genf, Lausanne und Lugano.'],
        ['Können wir zuerst probieren?', 'Gerne. Bestellen Sie einzelne Packungen in unserem Onlineshop und testen Sie Dersut in Ruhe im Büroalltag.'],
      ],
      formEyebrow: 'Anfrage',
      formTitle: 'Angebot für Ihre Firma anfragen',
      formText: 'Unverbindlich und kostenlos. Wir antworten in der Regel innert eines Arbeitstages.',
      crossTitle: 'Gastronomiebetrieb?',
      crossText: 'Für Restaurants, Bars, Cafés und Hotels haben wir ein eigenes Angebot.',
      crossLink: 'Zur Gastronomie',
    },
    fr: {
      metaTitle: 'Café pour entreprises : espresso au bureau en Suisse',
      metaDescription:
        'Un véritable espresso italien au bureau : café en grains Dersut pour entreprises, cabinets et études à Genève, Lausanne et dans toute la Suisse. Conditions sur quantité et livraison régulière.',
      crumb: 'Entreprises & bureau',
      eyebrow: 'Caffè in ufficio',
      title: ['Un bon café', 'fait de bonnes équipes'],
      lead:
        'Start-up, PME, cabinet médical ou étude d’avocats : avec Dersut, vos collaborateurs et vos visiteurs savourent un véritable espresso italien. Nous livrons du café en grains pour votre machine automatique dans toute la Suisse, à des conditions pour entreprises.',
      heroCta: 'Demander une offre entreprise',
      segEyebrow: 'Pour qui',
      segTitle: 'Du café pour chaque lieu de travail',
      segments: [
        ['users', 'Bureaux & PME', 'La pause-café est le point de rencontre du bureau. Avec Dersut, elle devient un petit moment d’Italie.'],
        ['shield', 'Cabinets & études', 'Un espresso offert à vos clients témoigne de votre attention dès le premier instant.'],
        ['flag', 'Accueil & réunions', 'Impressionnez clients et partenaires avec un café qui donne envie d’y revenir.'],
        ['box', 'Showrooms & boutiques', 'Un café pour la clientèle prolonge chaque visite et laisse un excellent souvenir.'],
      ],
      whyEyebrow: 'Vos avantages',
      whyTitle: 'Le café au bureau, sans contrainte',
      whyText:
        'Vous fixez la quantité et le rythme, nous nous occupons du reste. Vos grains arrivent dans leur emballage d’origine, directement de la torréfaction de Conegliano, livrés par La Poste à l’adresse de votre entreprise.',
      why: [
        'Conditions sur quantité pour les entreprises',
        'Livraison régulière selon accord, dans toute la Suisse',
        'Grains entiers, idéaux pour les machines automatiques',
        'Un interlocuteur attitré, facture en CHF',
        'Produits originaux du distributeur officiel en Suisse',
        'Torréfaction durable : environ 80 % d’énergie solaire autoproduite',
      ],
      imgAlt: 'Tasses d’espresso avec du café Dersut',
      stepsEyebrow: 'Comment ça marche',
      stepsTitle: 'Le café au bureau en trois étapes',
      steps: [
        ['Indiquer vos besoins', 'Combien de personnes boivent du café chez vous, et quelle machine utilisez-vous ? Quelques informations suffisent.'],
        ['Recevoir une offre', 'Nous vous recommandons le mélange adapté et vous envoyons une offre avec vos conditions.'],
        ['Être livré régulièrement', 'Votre café arrive au rythme convenu. Les quantités peuvent être adaptées à tout moment.'],
      ],
      faqTitle: 'Questions fréquentes sur le café au bureau',
      faq: [
        ['De combien de café notre bureau a-t-il besoin ?', 'On compte environ 7 g de grains par tasse : un kilo donne donc quelque 140 espressos. Pour 10 personnes buvant deux tasses par jour ouvrable, cela représente environ 3 kg par mois.'],
        ['Les grains conviennent-ils à notre machine automatique ?', 'Oui. Optimum Rosso et Domus Marrone sont des grains entiers qui conviennent à toutes les machines automatiques courantes. Nous recommandons une mouture moyenne-fine à fine.'],
        ['Avez-vous des conditions pour les entreprises ?', 'Oui. Selon les quantités et le rythme de livraison, nous établissons une offre personnalisée. Demandez-la simplement, sans engagement.'],
        ['Livrez-vous en Suisse romande ?', 'Bien sûr. Nous livrons les entreprises dans toute la Suisse romande, à Genève, Lausanne, Neuchâtel, Fribourg, Sion et dans le Jura, ainsi que dans le reste du pays.'],
        ['Pouvons-nous d’abord goûter ?', 'Volontiers. Commandez des paquets à l’unité dans notre boutique en ligne et testez Dersut au quotidien, en toute tranquillité.'],
      ],
      formEyebrow: 'Demande',
      formTitle: 'Demander une offre pour votre entreprise',
      formText: 'Sans engagement et gratuit. Nous répondons en général dans un délai d’un jour ouvrable.',
      crossTitle: 'Un établissement de restauration ?',
      crossText: 'Pour les restaurants, bars, cafés et hôtels, nous avons une offre dédiée.',
      crossLink: 'Restauration',
    },
    it: {
      metaTitle: 'Caffè per aziende: espresso in ufficio in Svizzera',
      metaDescription:
        'Vero espresso italiano in ufficio: caffè in grani Dersut per aziende, studi medici e legali in Ticino e in tutta la Svizzera. Condizioni sulla quantità e consegna regolare.',
      crumb: 'Aziende & ufficio',
      eyebrow: 'Caffè in ufficio',
      title: ['Un buon caffè', 'fa un buon team'],
      lead:
        'Startup, PMI, studio medico o studio legale: con Dersut collaboratori e ospiti gustano un vero espresso italiano. Consegniamo caffè in grani per la vostra macchina automatica in tutta la Svizzera, a condizioni per aziende.',
      heroCta: 'Richiedere un’offerta aziendale',
      segEyebrow: 'Per chi',
      segTitle: 'Caffè per ogni luogo di lavoro',
      segments: [
        ['users', 'Uffici & PMI', 'La pausa caffè è il punto d’incontro in ufficio. Con Dersut diventa un piccolo momento d’Italia.'],
        ['shield', 'Studi medici & legali', 'Un espresso offerto ai clienti dimostra attenzione fin dal primo momento.'],
        ['flag', 'Reception & riunioni', 'Colpite clienti e partner con un caffè che lascia il segno.'],
        ['box', 'Showroom & negozi', 'Un caffè per la clientela prolunga ogni visita e resta nella memoria.'],
      ],
      whyEyebrow: 'I vostri vantaggi',
      whyTitle: 'Caffè in ufficio senza pensieri',
      whyText:
        'Voi decidete quantità e frequenza, noi pensiamo al resto. I chicchi arrivano nella confezione originale, direttamente dalla torrefazione di Conegliano, consegnati per posta all’indirizzo della vostra azienda.',
      why: [
        'Condizioni sulla quantità per aziende',
        'Consegna regolare secondo accordi, in tutta la Svizzera',
        'Chicchi interi, ideali per le macchine automatiche',
        'Un referente fisso, fattura in CHF',
        'Prodotti originali dal distributore ufficiale in Svizzera',
        'Torrefazione sostenibile: circa l’80 % di energia dal proprio impianto solare',
      ],
      imgAlt: 'Tazzine da espresso con caffè Dersut',
      stepsEyebrow: 'Come funziona',
      stepsTitle: 'Il caffè in ufficio in tre passi',
      steps: [
        ['Indicare il fabbisogno', 'Quante persone bevono caffè da voi e quale macchina usate? Bastano poche informazioni.'],
        ['Ricevere l’offerta', 'Vi consigliamo la miscela giusta e vi inviamo un’offerta con le vostre condizioni.'],
        ['Consegna regolare', 'Il caffè arriva con la frequenza concordata. Le quantità si possono adattare in qualsiasi momento.'],
      ],
      faqTitle: 'Domande frequenti sul caffè in ufficio',
      faq: [
        ['Di quanto caffè ha bisogno il nostro ufficio?', 'Si calcolano circa 7 g di chicchi per tazzina: un chilo corrisponde quindi a circa 140 espressi. Per 10 persone con due tazzine per giorno lavorativo sono circa 3 kg al mese.'],
        ['I chicchi sono adatti alla nostra macchina automatica?', 'Sì. Optimum Rosso e Domus Marrone sono chicchi interi adatti a tutte le comuni macchine automatiche. Consigliamo una macinatura medio-fine o fine.'],
        ['Ci sono condizioni per le aziende?', 'Sì. In base a quantità e frequenza di consegna prepariamo un’offerta personalizzata. Richiedetela senza impegno.'],
        ['Consegnate anche in Ticino?', 'Certamente. Consegniamo alle aziende in tutto il Ticino, a Lugano, Bellinzona, Locarno e Mendrisio, e nel resto della Svizzera.'],
        ['Possiamo prima assaggiare?', 'Volentieri. Ordinate singole confezioni nel nostro negozio online e provate Dersut con calma nella vita d’ufficio.'],
      ],
      formEyebrow: 'Richiesta',
      formTitle: 'Richiedere un’offerta per la vostra azienda',
      formText: 'Senza impegno e gratuito. Di regola rispondiamo entro un giorno lavorativo.',
      crossTitle: 'Avete un locale?',
      crossText: 'Per ristoranti, bar, caffè e hotel abbiamo un’offerta dedicata.',
      crossLink: 'Gastronomia',
    },
    en: {
      metaTitle: 'Office coffee for companies: espresso at work in Switzerland',
      metaDescription:
        'Genuine Italian espresso at the office: Dersut coffee beans for companies, practices and law firms in Basel, Zurich, Geneva and throughout Switzerland. Volume terms and regular delivery.',
      crumb: 'Companies & office',
      eyebrow: 'Caffè in ufficio',
      title: ['Good coffee', 'makes good teams'],
      lead:
        'Start-up, SME, medical practice or law firm: with Dersut, your staff and visitors enjoy genuine Italian espresso. We deliver coffee beans for your bean-to-cup machine throughout Switzerland, on terms for business customers.',
      heroCta: 'Request a company quote',
      segEyebrow: 'Who it’s for',
      segTitle: 'Coffee for every workplace',
      segments: [
        ['users', 'Offices & SMEs', 'The coffee break is where the office meets. With Dersut it becomes a little moment of Italy.'],
        ['shield', 'Practices & law firms', 'An espresso for your clients shows appreciation from the very first moment.'],
        ['flag', 'Reception & meetings', 'Impress clients and partners with a coffee that leaves them wanting more.'],
        ['box', 'Showrooms & shops', 'A coffee for customers makes every visit longer and more memorable.'],
      ],
      whyEyebrow: 'Your benefits',
      whyTitle: 'Office coffee made effortless',
      whyText:
        'You decide on quantity and frequency, we take care of the rest. Your beans arrive in their original packaging straight from the roastery in Conegliano, delivered by post to your business address.',
      why: [
        'Volume terms for business customers',
        'Regular delivery as agreed, throughout Switzerland',
        'Whole beans, ideal for office bean-to-cup machines',
        'One dedicated contact, invoices in CHF',
        'Original products from the official Swiss distributor',
        'Sustainable roastery: around 80 % of its energy from its own solar plant',
      ],
      imgAlt: 'Espresso cups with Dersut coffee',
      stepsEyebrow: 'How it works',
      stepsTitle: 'Office coffee in three steps',
      steps: [
        ['Tell us your needs', 'How many people drink coffee at your office, and which machine do you use? A few details are enough.'],
        ['Receive a quote', 'We recommend the right blend and send you a quote with your terms.'],
        ['Regular delivery', 'Your coffee arrives at the agreed frequency. Quantities can be adjusted at any time.'],
      ],
      faqTitle: 'Frequently asked questions about office coffee',
      faq: [
        ['How much coffee does our office need?', 'As a rule of thumb, count about 7 g of beans per cup, so one kilo makes roughly 140 espressos. For 10 people drinking two cups per working day, that is about 3 kg per month.'],
        ['Are the beans suitable for our bean-to-cup machine?', 'Yes. Optimum Rosso and Domus Marrone are whole beans and suit all common bean-to-cup machines. We recommend a medium-fine to fine grind.'],
        ['Do you offer terms for companies?', 'Yes. Depending on volume and delivery frequency, we prepare an individual quote. Just ask, without obligation.'],
        ['Do you deliver outside Basel?', 'Of course. We deliver to business addresses throughout Switzerland, from Zurich and Bern to Geneva, Lausanne and Lugano.'],
        ['Can we try it first?', 'Gladly. Order individual packs in our online shop and test Dersut in your everyday office life.'],
      ],
      formEyebrow: 'Enquiry',
      formTitle: 'Request a quote for your company',
      formText: 'Free and without obligation. We usually reply within one working day.',
      crossTitle: 'Running a restaurant or bar?',
      crossText: 'We have a dedicated offer for restaurants, bars, cafés and hotels.',
      crossLink: 'Hospitality',
    },
  },
};

/** Beschriftungen des Anfrageformulars für Geschäftskunden */
export const B2B_FORM: Record<Locale, {
  company: string;
  type: string;
  types: [string, string][];
  contact: string;
  email: string;
  phone: string;
  place: string;
  volume: string;
  volumes: [string, string][];
  machine: string;
  machines: [string, string][];
  message: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  sent: string;
  companyMissing: string;
}> = {
  de: {
    company: 'Betrieb / Firma',
    type: 'Art des Betriebs',
    types: [['Restaurant', 'Restaurant / Pizzeria'], ['Bar / Café', 'Bar / Café'], ['Hotel', 'Hotel'], ['Bäckerei / Take-away', 'Bäckerei / Take-away'], ['Catering', 'Catering / Events'], ['Büro / Firma', 'Büro / Firma'], ['Praxis / Kanzlei', 'Praxis / Kanzlei'], ['Andere', 'Andere']],
    contact: 'Ansprechperson',
    email: 'E-Mail',
    phone: 'Telefon',
    place: 'PLZ / Ort',
    volume: 'Ungefährer Bedarf pro Monat',
    volumes: [['unbekannt', 'Weiss ich noch nicht'], ['bis 5 kg', 'bis 5 kg'], ['5–15 kg', '5–15 kg'], ['15–40 kg', '15–40 kg'], ['über 40 kg', 'über 40 kg']],
    machine: 'Kaffeemaschine',
    machines: [['Siebträger', 'Siebträgermaschine'], ['Vollautomat', 'Vollautomat'], ['Noch keine', 'Noch keine / in Planung'], ['Andere', 'Andere']],
    message: 'Ihre Nachricht',
    messagePlaceholder: 'Was ist Ihnen wichtig? Gibt es Fragen zu Mischung, Lieferung oder Konditionen?',
    send: 'Anfrage senden',
    sending: 'Wird gesendet …',
    sent: '<strong>Vielen Dank für Ihre Anfrage!</strong> Wir melden uns persönlich bei Ihnen, in der Regel innert eines Arbeitstages.',
    companyMissing: 'Bitte den Namen Ihres Betriebs oder Ihrer Firma angeben.',
  },
  fr: {
    company: 'Établissement / entreprise',
    type: 'Type d’établissement',
    types: [['Restaurant', 'Restaurant / pizzeria'], ['Bar / Café', 'Bar / café'], ['Hotel', 'Hôtel'], ['Bäckerei / Take-away', 'Boulangerie / take-away'], ['Catering', 'Traiteur / événements'], ['Büro / Firma', 'Bureau / entreprise'], ['Praxis / Kanzlei', 'Cabinet / étude'], ['Andere', 'Autre']],
    contact: 'Personne de contact',
    email: 'E-mail',
    phone: 'Téléphone',
    place: 'NPA / localité',
    volume: 'Besoin mensuel approximatif',
    volumes: [['unbekannt', 'Je ne sais pas encore'], ['bis 5 kg', 'jusqu’à 5 kg'], ['5–15 kg', '5–15 kg'], ['15–40 kg', '15–40 kg'], ['über 40 kg', 'plus de 40 kg']],
    machine: 'Machine à café',
    machines: [['Siebträger', 'Machine à porte-filtre'], ['Vollautomat', 'Machine automatique'], ['Noch keine', 'Pas encore / en projet'], ['Andere', 'Autre']],
    message: 'Votre message',
    messagePlaceholder: 'Qu’est-ce qui compte pour vous ? Des questions sur le mélange, la livraison ou les conditions ?',
    send: 'Envoyer la demande',
    sending: 'Envoi en cours …',
    sent: '<strong>Merci pour votre demande !</strong> Nous vous recontactons personnellement, en général dans un délai d’un jour ouvrable.',
    companyMissing: 'Veuillez indiquer le nom de votre établissement ou de votre entreprise.',
  },
  it: {
    company: 'Locale / azienda',
    type: 'Tipo di attività',
    types: [['Restaurant', 'Ristorante / pizzeria'], ['Bar / Café', 'Bar / caffè'], ['Hotel', 'Hotel'], ['Bäckerei / Take-away', 'Panetteria / take-away'], ['Catering', 'Catering / eventi'], ['Büro / Firma', 'Ufficio / azienda'], ['Praxis / Kanzlei', 'Studio medico / legale'], ['Andere', 'Altro']],
    contact: 'Persona di contatto',
    email: 'E-mail',
    phone: 'Telefono',
    place: 'NPA / località',
    volume: 'Fabbisogno mensile indicativo',
    volumes: [['unbekannt', 'Non lo so ancora'], ['bis 5 kg', 'fino a 5 kg'], ['5–15 kg', '5–15 kg'], ['15–40 kg', '15–40 kg'], ['über 40 kg', 'oltre 40 kg']],
    machine: 'Macchina da caffè',
    machines: [['Siebträger', 'Macchina a leva / portafiltro'], ['Vollautomat', 'Macchina automatica'], ['Noch keine', 'Non ancora / in progetto'], ['Andere', 'Altro']],
    message: 'Il vostro messaggio',
    messagePlaceholder: 'Cosa è importante per voi? Domande su miscela, consegna o condizioni?',
    send: 'Inviare la richiesta',
    sending: 'Invio in corso …',
    sent: '<strong>Grazie per la vostra richiesta!</strong> Vi ricontatteremo personalmente, di regola entro un giorno lavorativo.',
    companyMissing: 'Indicate il nome del vostro locale o della vostra azienda.',
  },
  en: {
    company: 'Business / company',
    type: 'Type of business',
    types: [['Restaurant', 'Restaurant / pizzeria'], ['Bar / Café', 'Bar / café'], ['Hotel', 'Hotel'], ['Bäckerei / Take-away', 'Bakery / take-away'], ['Catering', 'Catering / events'], ['Büro / Firma', 'Office / company'], ['Praxis / Kanzlei', 'Practice / law firm'], ['Andere', 'Other']],
    contact: 'Contact person',
    email: 'E-mail',
    phone: 'Phone',
    place: 'Postcode / town',
    volume: 'Approximate monthly requirement',
    volumes: [['unbekannt', 'Not sure yet'], ['bis 5 kg', 'up to 5 kg'], ['5–15 kg', '5–15 kg'], ['15–40 kg', '15–40 kg'], ['über 40 kg', 'over 40 kg']],
    machine: 'Coffee machine',
    machines: [['Siebträger', 'Portafilter machine'], ['Vollautomat', 'Bean-to-cup machine'], ['Noch keine', 'None yet / planned'], ['Andere', 'Other']],
    message: 'Your message',
    messagePlaceholder: 'What matters to you? Any questions about blends, delivery or terms?',
    send: 'Send enquiry',
    sending: 'Sending …',
    sent: '<strong>Thank you for your enquiry!</strong> We will get back to you personally, usually within one working day.',
    companyMissing: 'Please enter the name of your business or company.',
  },
};
