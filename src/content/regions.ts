import type { BrandKey } from '@/lib/brand';
import type { Locale } from '@/lib/i18n';

/**
 * Regionalseiten (/region/<slug>): Dersut Kaffee in Basel, Zürich, Bern, der Romandie und im Tessin.
 * Jede Seite hat eigene Inhalte (keine reinen Platzhalter-Kopien), damit sie für Suchmaschinen wertvoll ist.
 */
export type RegionText = {
  name: string;
  metaTitle: string;
  metaDescription: string;
  title: [string, string];
  lead: string;
  introTitle: string;
  intro: string[];
  b2bTitle: string;
  b2b: string;
  deliveryTitle: string;
  delivery: string;
  faq: [string, string][];
};

export type Region = {
  slug: string;
  img: BrandKey;
  /** Orte, die auf der Seite genannt werden (Eigennamen, in der Landessprache der Region) */
  places: string[];
  /** Für JSON-LD: Kantone bzw. Gebiete */
  areas: string[];
  text: Record<Locale, RegionText>;
};

export const REGIONS: Region[] = [
  {
    slug: 'basel',
    img: 'img_1',
    places: ['Basel', 'Riehen', 'Bettingen', 'Allschwil', 'Binningen', 'Bottmingen', 'Birsfelden', 'Muttenz', 'Pratteln', 'Münchenstein', 'Reinach', 'Arlesheim', 'Aesch', 'Liestal', 'Sissach', 'Rheinfelden', 'Möhlin', 'Laufen', 'Dornach', 'Breitenbach'],
    areas: ['Basel-Stadt', 'Basel-Landschaft', 'Fricktal', 'Schwarzbubenland'],
    text: {
      de: {
        name: 'Basel',
        metaTitle: 'Kaffee Basel: Dersut Espressobohnen kaufen',
        metaDescription: 'Italienischer Espresso aus Basel: Dersut Kaffeebohnen beim offiziellen Vertrieb mit Sitz in Basel kaufen. Für Zuhause, Gastronomie und Büros in der Region.',
        title: ['Dersut Kaffee', 'in Basel & Region'],
        lead: 'Der offizielle Schweizer Vertrieb von Dersut Caffè ist in Basel zuhause. Von hier aus beliefern wir Geniesser, Restaurants, Bars und Büros in der ganzen Region mit original italienischem Espresso aus Conegliano.',
        introTitle: 'Italienischer Espresso, zuhause in Basel',
        intro: [
          'Basel liebt Kaffee: vom Espresso an der Bar am Rhein bis zum Cappuccino im Büro am Aeschenplatz. Mit Dersut kommt eine Rösterei nach Basel, die seit 1947 in Conegliano bei Venedig Espresso mit Charakter röstet und in Italien von über 4’000 Bars und Geschäften geschätzt wird.',
          'Als Dersut Kaffee GmbH mit Sitz in Basel sind wir Ihr direkter Ansprechpartner: Originalware ohne Zwischenhandel, Preise in Franken, Rechnung aus der Schweiz und ein Kundenservice, der Ihre Sprache spricht.',
        ],
        b2bTitle: 'Für Basler Gastronomie und Firmen',
        b2b: 'Ob Quartierbeiz im Gundeli, Café in der Altstadt, Hotel an der Messe oder Büro in Kleinbasel: Für Betriebe in Basel und Umgebung erstellen wir individuelle Angebote mit Mengenkonditionen und regelmässiger Lieferung.',
        deliveryTitle: 'Lieferung in Basel und der Nordwestschweiz',
        delivery: 'Wir versenden mit der Schweizerischen Post, pauschal CHF 12.– (ab CHF 100.– gratis) pro Bestellung. In Basel-Stadt, Baselland, im Fricktal und im Schwarzbubenland ist Ihr Paket in der Regel innert 1 bis 2 Arbeitstagen nach Zahlungseingang bei Ihnen.',
        faq: [
          ['Wo kann ich Dersut Kaffee in Basel kaufen?', 'Am einfachsten direkt in unserem Onlineshop: Sie bestellen Dersut Espressobohnen beim offiziellen Vertrieb in Basel und erhalten sie per Post nach Hause oder ins Büro.'],
          ['Beliefern Sie Restaurants und Bars in Basel?', 'Ja. Für Gastronomiebetriebe in Basel und der Region erstellen wir gerne ein individuelles Angebot. Schreiben Sie uns über das Anfrageformular auf der Seite Gastronomie.'],
          ['Wie schnell wird in Basel geliefert?', 'In der Regel innert 1 bis 2 Arbeitstagen nach Zahlungseingang, mit der Schweizerischen Post, für pauschal CHF 12.– (ab CHF 100.– gratis).'],
        ],
      },
      fr: {
        name: 'Bâle',
        metaTitle: 'Café à Bâle : grains d’espresso Dersut',
        metaDescription: 'Espresso italien depuis Bâle : grains Dersut chez le distributeur officiel établi à Bâle. Pour la maison, la restauration et les bureaux de la région.',
        title: ['Café Dersut', 'à Bâle & dans la région'],
        lead: 'Le distributeur officiel de Dersut Caffè en Suisse est établi à Bâle. D’ici, nous livrons particuliers, restaurants, bars et bureaux de toute la région avec un espresso italien original de Conegliano.',
        introTitle: 'L’espresso italien, établi à Bâle',
        intro: [
          'Bâle aime le café, de l’espresso au comptoir au bord du Rhin au cappuccino du bureau. Avec Dersut arrive à Bâle une torréfaction qui, depuis 1947, torréfie à Conegliano un espresso de caractère, apprécié en Italie par plus de 4’000 bars et commerces.',
          'Dersut Kaffee GmbH, établie à Bâle, est votre interlocuteur direct : produits originaux sans intermédiaire, prix en francs, facture suisse et un service clientèle qui parle votre langue.',
        ],
        b2bTitle: 'Pour la restauration et les entreprises bâloises',
        b2b: 'Bistrot de quartier, café de la vieille ville, hôtel près de la foire ou bureau au Petit-Bâle : pour les établissements de Bâle et des environs, nous établissons des offres sur mesure avec conditions sur quantité et livraison régulière.',
        deliveryTitle: 'Livraison à Bâle et dans le nord-ouest de la Suisse',
        delivery: 'Nous expédions par La Poste suisse, forfait de CHF 12.– (livraison offerte dès CHF 100.–) par commande. À Bâle-Ville, Bâle-Campagne et dans le Fricktal, votre colis arrive en général dans un délai de 1 à 2 jours ouvrables après réception du paiement.',
        faq: [
          ['Où acheter du café Dersut à Bâle ?', 'Le plus simple est notre boutique en ligne : vous commandez les grains Dersut chez le distributeur officiel établi à Bâle et les recevez par la poste, à la maison ou au bureau.'],
          ['Livrez-vous les restaurants et bars à Bâle ?', 'Oui. Pour les établissements de Bâle et de la région, nous établissons volontiers une offre personnalisée via le formulaire de la page Restauration.'],
          ['Quel est le délai de livraison à Bâle ?', 'En général 1 à 2 jours ouvrables après réception du paiement, par La Poste suisse, pour un forfait de CHF 12.– (livraison offerte dès CHF 100.–).'],
        ],
      },
      it: {
        name: 'Basilea',
        metaTitle: 'Caffè a Basilea: caffè in grani Dersut',
        metaDescription: 'Vero espresso italiano da Basilea: caffè in grani Dersut dal distributore ufficiale con sede a Basilea. Per casa, gastronomia e uffici.',
        title: ['Caffè Dersut', 'a Basilea & dintorni'],
        lead: 'Il distributore ufficiale di Dersut Caffè in Svizzera ha sede a Basilea. Da qui riforniamo appassionati, ristoranti, bar e uffici di tutta la regione con vero espresso italiano da Conegliano.',
        introTitle: 'Espresso italiano, di casa a Basilea',
        intro: [
          'Basilea ama il caffè, dall’espresso al banco sul Reno al cappuccino in ufficio. Con Dersut arriva a Basilea una torrefazione che dal 1947 tosta a Conegliano un espresso di carattere, apprezzato in Italia da oltre 4’000 bar e negozi.',
          'Dersut Kaffee GmbH, con sede a Basilea, è il vostro referente diretto: prodotti originali senza intermediari, prezzi in franchi, fattura svizzera e un servizio clienti che parla la vostra lingua.',
        ],
        b2bTitle: 'Per la gastronomia e le aziende di Basilea',
        b2b: 'Per ristoranti, caffè, hotel e uffici a Basilea e dintorni prepariamo offerte su misura con condizioni sulla quantità e consegna regolare.',
        deliveryTitle: 'Consegna a Basilea e nella Svizzera nordoccidentale',
        delivery: 'Spediamo con la Posta Svizzera, forfait di CHF 12.– (gratuita da CHF 100.–) per ordine. A Basilea Città, Basilea Campagna e nel Fricktal il pacco arriva di regola entro 1–2 giorni lavorativi dal ricevimento del pagamento.',
        faq: [
          ['Dove comprare caffè Dersut a Basilea?', 'Nel nostro negozio online: ordinate i chicchi Dersut dal distributore ufficiale con sede a Basilea e li ricevete per posta a casa o in ufficio.'],
          ['Riforniate ristoranti e bar a Basilea?', 'Sì. Per i locali di Basilea e della regione prepariamo volentieri un’offerta personalizzata tramite il modulo della pagina Gastronomia.'],
          ['Quanto tempo richiede la consegna a Basilea?', 'Di regola 1–2 giorni lavorativi dal ricevimento del pagamento, con la Posta Svizzera, per un forfait di CHF 12.– (gratuita da CHF 100.–).'],
        ],
      },
      en: {
        name: 'Basel',
        metaTitle: 'Coffee in Basel: buy Dersut espresso beans',
        metaDescription: 'Genuine Italian espresso from Basel: buy Dersut coffee beans from the official distributor based in Basel. For home, hospitality and offices in the region.',
        title: ['Dersut coffee', 'in Basel & the region'],
        lead: 'The official Swiss distributor of Dersut Caffè is based in Basel. From here we supply coffee lovers, restaurants, bars and offices throughout the region with genuine Italian espresso from Conegliano.',
        introTitle: 'Italian espresso, at home in Basel',
        intro: [
          'Basel loves coffee, from an espresso at the bar by the Rhine to a cappuccino at the office. With Dersut comes a roastery that has been roasting characterful espresso in Conegliano near Venice since 1947, trusted by more than 4,000 bars and shops in Italy.',
          'Dersut Kaffee GmbH, based in Basel, is your direct contact: original products without middlemen, prices in Swiss francs, a Swiss invoice and customer service that speaks your language.',
        ],
        b2bTitle: 'For Basel’s hospitality and businesses',
        b2b: 'Whether a neighbourhood restaurant, an old-town café, a hotel near the exhibition centre or an office in Kleinbasel: for businesses in and around Basel we prepare tailored quotes with volume terms and regular delivery.',
        deliveryTitle: 'Delivery in Basel and north-western Switzerland',
        delivery: 'We ship with Swiss Post for a flat CHF 12.– (free from CHF 100.–) per order. In Basel-Stadt, Basel-Landschaft and the Fricktal your parcel usually arrives within 1 to 2 working days of payment.',
        faq: [
          ['Where can I buy Dersut coffee in Basel?', 'The easiest way is our online shop: order Dersut espresso beans from the official distributor in Basel and receive them by post at home or at the office.'],
          ['Do you supply restaurants and bars in Basel?', 'Yes. For hospitality businesses in Basel and the region we are happy to prepare an individual quote via the form on our hospitality page.'],
          ['How fast is delivery in Basel?', 'Usually within 1 to 2 working days of payment, by Swiss Post, for a flat CHF 12.– (free from CHF 100.–).'],
        ],
      },
    },
  },
  {
    slug: 'romandie',
    img: 'tazze',
    places: ['Genève', 'Lausanne', 'Montreux', 'Vevey', 'Nyon', 'Morges', 'Yverdon-les-Bains', 'Neuchâtel', 'La Chaux-de-Fonds', 'Fribourg', 'Bulle', 'Sion', 'Martigny', 'Sierre', 'Delémont', 'Porrentruy'],
    areas: ['Genève', 'Vaud', 'Neuchâtel', 'Fribourg', 'Valais', 'Jura'],
    text: {
      de: {
        name: 'Romandie',
        metaTitle: 'Dersut Kaffee in der Romandie: Genf & Lausanne',
        metaDescription: 'Italienischer Espresso für die Westschweiz: Dersut Kaffeebohnen mit Lieferung nach Genf, Lausanne, Neuenburg, Freiburg, ins Wallis und in den Jura.',
        title: ['Dersut Kaffee', 'in der Romandie'],
        lead: 'Von Genf bis in den Jura: Wir liefern original italienischen Espresso von Dersut in die ganze Westschweiz. Auf Wunsch betreuen wir Sie auf Französisch, für Ihr Zuhause, Ihr Restaurant oder Ihr Büro.',
        introTitle: 'Italienische Espressokultur für die Westschweiz',
        intro: [
          'In der Romandie gehört der Espresso nach dem Essen einfach dazu, ob am Genfersee, in der Altstadt von Lausanne oder auf einer Terrasse im Wallis. Dersut röstet seit 1947 in Conegliano und steht für einen vollmundigen Espresso mit dichter Crema.',
          'Unsere Webseite, unser Shop und unser Kundenservice sind auch auf Französisch für Sie da. Sie bestellen in Franken, bezahlen per Banküberweisung und erhalten Originalware direkt vom offiziellen Vertrieb.',
        ],
        b2bTitle: 'Für Gastronomie und Firmen in der Westschweiz',
        b2b: 'Restaurants, Bistros, Hotels und Büros in Genf, Lausanne, Neuenburg, Freiburg, Sitten und im Jura erhalten auf Anfrage ein individuelles Angebot mit Mengenkonditionen, gerne auch auf Französisch.',
        deliveryTitle: 'Lieferung in die ganze Romandie',
        delivery: 'Wir versenden mit der Schweizerischen Post in alle Westschweizer Kantone, pauschal CHF 12.– (ab CHF 100.– gratis) pro Bestellung. Ihr Paket ist in der Regel innert 1 bis 2 Arbeitstagen nach Zahlungseingang bei Ihnen.',
        faq: [
          ['Liefern Sie nach Genf und Lausanne?', 'Ja, wir liefern in die ganze Romandie, also in die Kantone Genf, Waadt, Neuenburg, Freiburg, Wallis und Jura, mit der Schweizerischen Post.'],
          ['Kann ich auf Französisch bestellen?', 'Ja. Die ganze Webseite und der Shop sind auf Französisch verfügbar, und auch Ihre Bestellbestätigung erhalten Sie auf Französisch.'],
          ['Gibt es Angebote für Restaurants in der Romandie?', 'Ja. Über das Anfrageformular auf der Seite Gastronomie erstellen wir Ihnen ein individuelles Angebot.'],
        ],
      },
      fr: {
        name: 'Suisse romande',
        metaTitle: 'Café Dersut en Suisse romande : Genève, Lausanne',
        metaDescription: 'Espresso italien en Suisse romande : grains Dersut livrés à Genève, Lausanne, Neuchâtel, Fribourg, en Valais et dans le Jura. Boutique en français.',
        title: ['Le café Dersut', 'en Suisse romande'],
        lead: 'De Genève au Jura, nous livrons l’espresso italien original de Dersut dans toute la Suisse romande. Boutique, service clientèle et confirmations en français, pour votre maison, votre restaurant ou votre bureau.',
        introTitle: 'La culture de l’espresso italien pour la Romandie',
        intro: [
          'En Suisse romande, l’espresso après le repas est un incontournable, au bord du Léman, dans la vieille ville de Lausanne ou sur une terrasse valaisanne. Dersut torréfie depuis 1947 à Conegliano, près de Venise, un espresso rond à la crème dense et persistante.',
          'Notre site, notre boutique et notre service clientèle sont entièrement en français. Vous commandez en francs, payez par virement bancaire et recevez des produits originaux, directement du distributeur officiel en Suisse.',
        ],
        b2bTitle: 'Pour la restauration et les entreprises romandes',
        b2b: 'Restaurants, bistrots, hôtels, boulangeries et bureaux à Genève, Lausanne, Neuchâtel, Fribourg, Sion ou Delémont : sur demande, nous établissons une offre personnalisée avec conditions sur quantité et livraison régulière.',
        deliveryTitle: 'Livraison dans toute la Suisse romande',
        delivery: 'Nous expédions par La Poste suisse dans tous les cantons romands, au forfait de CHF 12.– (livraison offerte dès CHF 100.–) par commande. Votre colis arrive en général dans un délai de 1 à 2 jours ouvrables après réception du paiement.',
        faq: [
          ['Livrez-vous à Genève et à Lausanne ?', 'Oui, nous livrons dans toute la Suisse romande, à savoir les cantons de Genève, Vaud, Neuchâtel, Fribourg, du Valais et du Jura, par La Poste suisse.'],
          ['Puis-je commander en français ?', 'Bien sûr. Tout le site et la boutique sont en français, et vous recevez votre confirmation de commande et nos e-mails en français.'],
          ['Avez-vous des offres pour les restaurants romands ?', 'Oui. Via le formulaire de la page Restauration, nous établissons une offre sur mesure pour votre établissement.'],
        ],
      },
      it: {
        name: 'Romandia',
        metaTitle: 'Caffè Dersut in Romandia: Ginevra e Losanna',
        metaDescription: 'Vero espresso italiano nella Svizzera francese: caffè in grani Dersut con consegna a Ginevra, Losanna, Neuchâtel, Friburgo e in Vallese.',
        title: ['Caffè Dersut', 'in Romandia'],
        lead: 'Da Ginevra al Giura: consegniamo il vero espresso italiano Dersut in tutta la Svizzera francese, per casa, ristorante o ufficio.',
        introTitle: 'Cultura dell’espresso italiano per la Svizzera francese',
        intro: [
          'In Romandia l’espresso dopo il pasto è un rito, sul Lago Lemano come nella città vecchia di Losanna. Dersut tosta dal 1947 a Conegliano un espresso rotondo dalla crema densa.',
          'Sito, negozio e servizio clienti sono disponibili anche in francese. Ordinate in franchi, pagate con bonifico e ricevete prodotti originali dal distributore ufficiale.',
        ],
        b2bTitle: 'Per gastronomia e aziende in Romandia',
        b2b: 'Ristoranti, bistrot, hotel e uffici a Ginevra, Losanna, Neuchâtel, Friburgo e Sion ricevono su richiesta un’offerta personalizzata con condizioni sulla quantità.',
        deliveryTitle: 'Consegna in tutta la Romandia',
        delivery: 'Spediamo con la Posta Svizzera in tutti i cantoni romandi, forfait di CHF 12.– (gratuita da CHF 100.–) per ordine. Di regola il pacco arriva entro 1–2 giorni lavorativi dal ricevimento del pagamento.',
        faq: [
          ['Consegnate a Ginevra e Losanna?', 'Sì, consegniamo in tutta la Romandia: Ginevra, Vaud, Neuchâtel, Friburgo, Vallese e Giura.'],
          ['Il negozio è disponibile in francese?', 'Sì, l’intero sito e il negozio sono disponibili in francese, così come le conferme d’ordine.'],
          ['Ci sono offerte per ristoranti in Romandia?', 'Sì, tramite il modulo della pagina Gastronomia prepariamo un’offerta su misura.'],
        ],
      },
      en: {
        name: 'French-speaking Switzerland',
        metaTitle: 'Dersut coffee in Romandy: Geneva & Lausanne',
        metaDescription: 'Genuine Italian espresso for western Switzerland: Dersut beans delivered to Geneva, Lausanne, Neuchâtel, Fribourg, Valais and Jura.',
        title: ['Dersut coffee', 'in French-speaking Switzerland'],
        lead: 'From Geneva to the Jura, we deliver genuine Italian espresso from Dersut throughout Romandy, with a shop and customer service in French, for your home, restaurant or office.',
        introTitle: 'Italian espresso culture for Romandy',
        intro: [
          'In French-speaking Switzerland an espresso after a meal is a must, whether by Lake Geneva, in Lausanne’s old town or on a terrace in Valais. Dersut has been roasting a full-bodied espresso with a dense crema in Conegliano since 1947.',
          'Our website, shop and customer service are also available in French. You order in Swiss francs, pay by bank transfer and receive original products from the official distributor.',
        ],
        b2bTitle: 'For hospitality and businesses in Romandy',
        b2b: 'Restaurants, bistros, hotels and offices in Geneva, Lausanne, Neuchâtel, Fribourg, Sion and the Jura can request an individual quote with volume terms, in French if preferred.',
        deliveryTitle: 'Delivery throughout Romandy',
        delivery: 'We ship with Swiss Post to every French-speaking canton for a flat CHF 12.– (free from CHF 100.–) per order. Your parcel usually arrives within 1 to 2 working days of payment.',
        faq: [
          ['Do you deliver to Geneva and Lausanne?', 'Yes, we deliver throughout Romandy: the cantons of Geneva, Vaud, Neuchâtel, Fribourg, Valais and Jura, by Swiss Post.'],
          ['Can I order in French?', 'Yes. The entire website and shop are available in French, and so are order confirmations.'],
          ['Do you have offers for restaurants in Romandy?', 'Yes. Use the form on our hospitality page and we will prepare an individual quote.'],
        ],
      },
    },
  },
  {
    slug: 'zuerich',
    img: 'img_4',
    places: ['Zürich', 'Winterthur', 'Uster', 'Dübendorf', 'Dietikon', 'Wädenswil', 'Horgen', 'Kloten', 'Wallisellen', 'Baden', 'Aarau', 'Zug', 'Luzern'],
    areas: ['Zürich', 'Aargau', 'Zug', 'Luzern'],
    text: {
      de: {
        name: 'Zürich',
        metaTitle: 'Kaffee Zürich: Dersut Espressobohnen bestellen',
        metaDescription: 'Italienischer Espresso für Zürich: Dersut Kaffeebohnen online bestellen, Lieferung nach Zürich, Winterthur, Zug und Luzern. Auch für Büros und Gastronomie.',
        title: ['Dersut Kaffee', 'für Zürich'],
        lead: 'Zürich trinkt gerne guten Kaffee, im Büro, im Café und zuhause. Wir liefern original italienischen Espresso von Dersut in den ganzen Grossraum Zürich und in die Zentralschweiz.',
        introTitle: 'Echter Espresso aus Conegliano',
        intro: [
          'Ob Siebträger in der Wohnung im Kreis 4 oder Vollautomat im Grossraumbüro in Oerlikon: Die Espressobohnen von Dersut sind für beide gemacht. Optimum Rosso überzeugt mit feinen Kakaonoten, Domus Marrone mit Kraft und Fülle.',
          'Sie bestellen direkt beim offiziellen Schweizer Vertrieb, erhalten Originalware aus der Rösterei und bezahlen bequem per Banküberweisung, ganz ohne Kartenangaben.',
        ],
        b2bTitle: 'Bürokaffee und Gastronomie in Zürich',
        b2b: 'Für Firmen, Agenturen, Praxen sowie Restaurants und Bars in Zürich und Umgebung erstellen wir Angebote mit Mengenkonditionen und regelmässiger Lieferung.',
        deliveryTitle: 'Lieferung im Grossraum Zürich',
        delivery: 'Versand mit der Schweizerischen Post, pauschal CHF 12.– (ab CHF 100.– gratis) pro Bestellung. In Zürich, Winterthur, im Aargau, in Zug und Luzern in der Regel innert 1 bis 2 Arbeitstagen nach Zahlungseingang.',
        faq: [
          ['Liefern Sie Kaffee nach Zürich?', 'Ja, wir liefern per Post in die Stadt und den Kanton Zürich sowie in die ganze Schweiz, pauschal für CHF 12.– (ab CHF 100.– gratis).'],
          ['Gibt es Bürokaffee für Zürcher Firmen?', 'Ja. Auf der Seite Firmen & Büro können Sie unverbindlich ein Angebot mit Konditionen für Ihr Team anfragen.'],
        ],
      },
      fr: {
        name: 'Zurich',
        metaTitle: 'Café à Zurich : grains d’espresso Dersut',
        metaDescription: 'Espresso italien pour Zurich : grains Dersut livrés à Zurich, Winterthour, Zoug et Lucerne. Offres pour bureaux et restauration.',
        title: ['Le café Dersut', 'pour Zurich'],
        lead: 'Zurich apprécie le bon café, au bureau, au café et à la maison. Nous livrons l’espresso italien original de Dersut dans toute la région zurichoise et en Suisse centrale.',
        introTitle: 'Un véritable espresso de Conegliano',
        intro: [
          'Machine à porte-filtre à la maison ou machine automatique au bureau : les grains Dersut conviennent aux deux. Optimum Rosso séduit par ses notes de cacao, Domus Marrone par sa force et sa rondeur.',
          'Vous commandez directement chez le distributeur officiel en Suisse, recevez des produits originaux et payez par virement bancaire, sans données de carte.',
        ],
        b2bTitle: 'Café de bureau et restauration à Zurich',
        b2b: 'Pour les entreprises, agences, cabinets, restaurants et bars de Zurich et environs, nous établissons des offres avec conditions sur quantité et livraison régulière.',
        deliveryTitle: 'Livraison dans la région zurichoise',
        delivery: 'Expédition par La Poste suisse, forfait de CHF 12.– (livraison offerte dès CHF 100.–) par commande, en général 1 à 2 jours ouvrables après réception du paiement.',
        faq: [
          ['Livrez-vous du café à Zurich ?', 'Oui, nous livrons par la poste en ville et dans le canton de Zurich ainsi que dans toute la Suisse, au forfait de CHF 12.– (livraison offerte dès CHF 100.–).'],
          ['Proposez-vous du café de bureau aux entreprises zurichoises ?', 'Oui. Sur la page Entreprises & bureau, vous pouvez demander sans engagement une offre adaptée à votre équipe.'],
        ],
      },
      it: {
        name: 'Zurigo',
        metaTitle: 'Caffè a Zurigo: caffè in grani Dersut con consegna',
        metaDescription:
          'Vero espresso italiano per Zurigo: ordinate online i chicchi Dersut, consegna a Zurigo, Winterthur, Baden, Zugo e Lucerna. Offerte per uffici e gastronomia.',
        title: ['Caffè Dersut', 'per Zurigo'],
        lead: 'Zurigo ama il buon caffè, in ufficio, al bar e a casa. Consegniamo il vero espresso italiano Dersut in tutta l’area di Zurigo e nella Svizzera centrale.',
        introTitle: 'Vero espresso da Conegliano',
        intro: [
          'Macchina a leva a casa o automatica in ufficio: i chicchi Dersut sono adatti a entrambe. Optimum Rosso conquista con note di cacao, Domus Marrone con forza e corpo.',
          'Ordinate direttamente dal distributore ufficiale svizzero, ricevete prodotti originali e pagate comodamente con bonifico.',
        ],
        b2bTitle: 'Caffè per uffici e gastronomia a Zurigo',
        b2b: 'Per aziende, studi, ristoranti e bar di Zurigo e dintorni prepariamo offerte con condizioni sulla quantità e consegna regolare.',
        deliveryTitle: 'Consegna nell’area di Zurigo',
        delivery: 'Spedizione con la Posta Svizzera, forfait di CHF 12.– (gratuita da CHF 100.–) per ordine, di regola entro 1–2 giorni lavorativi dal pagamento.',
        faq: [
          ['Consegnate caffè a Zurigo?', 'Sì, consegniamo per posta in città e nel cantone di Zurigo e in tutta la Svizzera, con forfait di CHF 12.– (gratuita da CHF 100.–).'],
          ['Avete caffè per uffici a Zurigo?', 'Sì. Nella pagina Aziende & ufficio potete richiedere un’offerta senza impegno.'],
        ],
      },
      en: {
        name: 'Zurich',
        metaTitle: 'Coffee in Zurich: Dersut espresso beans delivered',
        metaDescription: 'Genuine Italian espresso for Zurich: Dersut coffee beans delivered to Zurich, Winterthur, Baden, Zug and Lucerne. For offices and hospitality.',
        title: ['Dersut coffee', 'for Zurich'],
        lead: 'Zurich loves good coffee, at the office, in cafés and at home. We deliver genuine Italian espresso from Dersut throughout greater Zurich and central Switzerland.',
        introTitle: 'Real espresso from Conegliano',
        intro: [
          'Portafilter machine at home or bean-to-cup machine at the office: Dersut beans are made for both. Optimum Rosso impresses with fine cocoa notes, Domus Marrone with strength and body.',
          'You order directly from the official Swiss distributor, receive original products and pay conveniently by bank transfer, without card details.',
        ],
        b2bTitle: 'Office coffee and hospitality in Zurich',
        b2b: 'For companies, agencies, practices, restaurants and bars in and around Zurich we prepare quotes with volume terms and regular delivery.',
        deliveryTitle: 'Delivery in greater Zurich',
        delivery: 'Shipped by Swiss Post for a flat CHF 12.– (free from CHF 100.–) per order, usually within 1 to 2 working days of payment.',
        faq: [
          ['Do you deliver coffee to Zurich?', 'Yes, we deliver by post to the city and canton of Zurich and throughout Switzerland for a flat CHF 12.– (free from CHF 100.–).'],
          ['Do you offer office coffee for Zurich companies?', 'Yes. Request a quote for your team without obligation on our companies & office page.'],
        ],
      },
    },
  },
  {
    slug: 'bern',
    img: 'caffe',
    places: ['Bern', 'Köniz', 'Ostermundigen', 'Muri bei Bern', 'Ittigen', 'Thun', 'Biel/Bienne', 'Burgdorf', 'Langenthal', 'Solothurn', 'Olten', 'Interlaken'],
    areas: ['Bern', 'Solothurn'],
    text: {
      de: {
        name: 'Bern',
        metaTitle: 'Kaffee Bern: Dersut Espressobohnen online kaufen',
        metaDescription: 'Italienischer Espresso für Bern: Dersut Kaffeebohnen mit Lieferung nach Bern, Thun, Biel und Solothurn. Auch für Gastronomie und Büros im Mittelland.',
        title: ['Dersut Kaffee', 'für Bern & Mittelland'],
        lead: 'Von der Bundesstadt bis ins Berner Oberland: Wir liefern original italienischen Espresso von Dersut nach Bern, Thun, Biel und ins ganze Mittelland.',
        introTitle: 'Ein Espresso mit Geschichte',
        intro: [
          'Dersut wurde 1947 von zwei Triestinern gegründet und wird seit 1949 von der Familie Caballini geführt. Dieselbe Sorgfalt steckt bis heute in jeder Packung: ausgewählte Rohkaffees, zweistufige Röstung und Kontrolle Bohne für Bohne.',
          'In Bern und im Mittelland erhalten Sie diese Qualität jetzt direkt vom offiziellen Schweizer Vertrieb, mit Preisen in Franken und Versand per Post.',
        ],
        b2bTitle: 'Für Berner Gastronomie, Verwaltung und Firmen',
        b2b: 'Restaurants unter den Lauben, Cafés, Hotels im Oberland und Büros in Bern und Umgebung erhalten auf Anfrage ein Angebot mit Mengenkonditionen.',
        deliveryTitle: 'Lieferung nach Bern und ins Mittelland',
        delivery: 'Versand mit der Schweizerischen Post, pauschal CHF 12.– (ab CHF 100.– gratis) pro Bestellung, in der Regel innert 1 bis 2 Arbeitstagen nach Zahlungseingang.',
        faq: [
          ['Liefern Sie nach Bern und Thun?', 'Ja, wir liefern per Post in den ganzen Kanton Bern und in die ganze Schweiz, pauschal für CHF 12.– (ab CHF 100.– gratis).'],
          ['Gibt es Angebote für Berner Restaurants?', 'Ja. Über die Seite Gastronomie erstellen wir Ihnen ein individuelles Angebot.'],
        ],
      },
      fr: {
        name: 'Berne',
        metaTitle: 'Café à Berne et Bienne : grains d’espresso Dersut',
        metaDescription: 'Espresso italien pour Berne et Bienne : grains Dersut livrés à Berne, Thoune, Bienne et Soleure. Aussi pour la restauration et les bureaux.',
        title: ['Le café Dersut', 'pour Berne & Bienne'],
        lead: 'De la ville fédérale à Bienne la bilingue : nous livrons l’espresso italien original de Dersut à Berne, Thoune, Bienne et sur tout le Plateau.',
        introTitle: 'Un espresso chargé d’histoire',
        intro: [
          'Dersut a été fondée en 1947 par deux Triestins et est dirigée depuis 1949 par la famille Caballini. Le même soin se retrouve dans chaque paquet : cafés verts sélectionnés, torréfaction en deux étapes et contrôle grain par grain.',
          'À Berne et à Bienne, vous recevez désormais cette qualité directement du distributeur officiel en Suisse, avec des prix en francs et une livraison par la poste.',
        ],
        b2bTitle: 'Pour la restauration et les entreprises bernoises',
        b2b: 'Restaurants, cafés, hôtels et bureaux à Berne, Bienne et environs reçoivent sur demande une offre avec conditions sur quantité.',
        deliveryTitle: 'Livraison à Berne et sur le Plateau',
        delivery: 'Expédition par La Poste suisse, forfait de CHF 12.– (livraison offerte dès CHF 100.–) par commande, en général 1 à 2 jours ouvrables après réception du paiement.',
        faq: [
          ['Livrez-vous à Berne et à Bienne ?', 'Oui, nous livrons par la poste dans tout le canton de Berne et dans toute la Suisse, au forfait de CHF 12.– (livraison offerte dès CHF 100.–).'],
          ['Avez-vous des offres pour les restaurants bernois ?', 'Oui. Via la page Restauration, nous établissons une offre sur mesure.'],
        ],
      },
      it: {
        name: 'Berna',
        metaTitle: 'Caffè a Berna: caffè in grani Dersut online',
        metaDescription:
          'Vero espresso italiano per Berna e l’Altopiano: chicchi Dersut con consegna a Berna, Thun, Bienne, Burgdorf e Soletta. Anche per gastronomia e uffici.',
        title: ['Caffè Dersut', 'per Berna & l’Altopiano'],
        lead: 'Dalla città federale all’Oberland bernese: consegniamo il vero espresso italiano Dersut a Berna, Thun, Bienne e in tutto l’Altopiano.',
        introTitle: 'Un espresso con una storia',
        intro: [
          'Dersut è stata fondata nel 1947 da due triestini ed è guidata dal 1949 dalla famiglia Caballini. La stessa cura si ritrova in ogni confezione: caffè verdi selezionati, tostatura in due fasi e controllo chicco per chicco.',
          'A Berna ricevete ora questa qualità direttamente dal distributore ufficiale svizzero, con prezzi in franchi e spedizione per posta.',
        ],
        b2bTitle: 'Per gastronomia e aziende bernesi',
        b2b: 'Ristoranti, caffè, hotel e uffici a Berna e dintorni ricevono su richiesta un’offerta con condizioni sulla quantità.',
        deliveryTitle: 'Consegna a Berna e nell’Altopiano',
        delivery: 'Spedizione con la Posta Svizzera, forfait di CHF 12.– (gratuita da CHF 100.–) per ordine, di regola entro 1–2 giorni lavorativi dal pagamento.',
        faq: [
          ['Consegnate a Berna e Thun?', 'Sì, consegniamo per posta in tutto il cantone di Berna e in tutta la Svizzera, con forfait di CHF 12.– (gratuita da CHF 100.–).'],
          ['Avete offerte per ristoranti bernesi?', 'Sì. Tramite la pagina Gastronomia prepariamo un’offerta su misura.'],
        ],
      },
      en: {
        name: 'Bern',
        metaTitle: 'Coffee in Bern: buy Dersut espresso beans online',
        metaDescription: 'Genuine Italian espresso for Bern: Dersut coffee beans delivered to Bern, Thun, Biel and Solothurn. Also for hospitality and offices.',
        title: ['Dersut coffee', 'for Bern & the Mittelland'],
        lead: 'From the federal city to the Bernese Oberland: we deliver genuine Italian espresso from Dersut to Bern, Thun, Biel and across the Mittelland.',
        introTitle: 'An espresso with a history',
        intro: [
          'Dersut was founded in 1947 by two men from Trieste and has been run by the Caballini family since 1949. The same care goes into every pack today: selected green coffees, two-stage roasting and bean-by-bean inspection.',
          'In Bern you now get this quality directly from the official Swiss distributor, with prices in Swiss francs and delivery by post.',
        ],
        b2bTitle: 'For Bern’s hospitality and businesses',
        b2b: 'Restaurants, cafés, hotels and offices in and around Bern can request a quote with volume terms.',
        deliveryTitle: 'Delivery to Bern and the Mittelland',
        delivery: 'Shipped by Swiss Post for a flat CHF 12.– (free from CHF 100.–) per order, usually within 1 to 2 working days of payment.',
        faq: [
          ['Do you deliver to Bern and Thun?', 'Yes, we deliver by post throughout the canton of Bern and all of Switzerland for a flat CHF 12.– (free from CHF 100.–).'],
          ['Do you have offers for restaurants in Bern?', 'Yes. Use our hospitality page and we will prepare an individual quote.'],
        ],
      },
    },
  },
  {
    slug: 'tessin',
    img: 'fiori',
    places: ['Lugano', 'Bellinzona', 'Locarno', 'Ascona', 'Mendrisio', 'Chiasso', 'Biasca', 'Airolo'],
    areas: ['Ticino'],
    text: {
      de: {
        name: 'Tessin',
        metaTitle: 'Dersut Kaffee im Tessin: Lugano & Bellinzona',
        metaDescription: 'Italienischer Espresso fürs Tessin: Dersut Kaffeebohnen mit Lieferung nach Lugano, Bellinzona, Locarno und Mendrisio. Shop auch auf Italienisch.',
        title: ['Dersut Kaffee', 'im Tessin'],
        lead: 'Im Tessin ist Espresso Kultur. Wir liefern den Espresso aus Conegliano nach Lugano, Bellinzona, Locarno und in die ganze Sonnenstube der Schweiz.',
        introTitle: 'Italienische Rösterkunst, ganz nah',
        intro: [
          'Wer im Tessin Kaffee trinkt, erwartet einen echten italienischen Espresso. Dersut röstet seit 1947 in Conegliano in Venetien und trägt das Siegel «Espresso Italiano Certificato» des Istituto Espresso Italiano.',
          'Unser Shop ist auch auf Italienisch verfügbar. Sie bestellen in Franken beim offiziellen Schweizer Vertrieb und erhalten Originalware per Post.',
        ],
        b2bTitle: 'Für Tessiner Bars, Grotti und Hotels',
        b2b: 'Bars, Grotti, Ristoranti, Hotels und Büros im Tessin erhalten auf Anfrage ein individuelles Angebot mit Mengenkonditionen, gerne auf Italienisch.',
        deliveryTitle: 'Lieferung ins ganze Tessin',
        delivery: 'Versand mit der Schweizerischen Post, pauschal CHF 12.– (ab CHF 100.– gratis) pro Bestellung, in der Regel innert 1 bis 2 Arbeitstagen nach Zahlungseingang.',
        faq: [
          ['Liefern Sie ins Tessin?', 'Ja, wir liefern per Post ins ganze Tessin und in die ganze Schweiz, pauschal für CHF 12.– (ab CHF 100.– gratis).'],
          ['Kann ich auf Italienisch bestellen?', 'Ja. Die Webseite, der Shop und die Bestellbestätigung sind auch auf Italienisch verfügbar.'],
        ],
      },
      fr: {
        name: 'Tessin',
        metaTitle: 'Café Dersut au Tessin : Lugano, Bellinzone, Locarno',
        metaDescription:
          'Espresso italien original pour le Tessin : grains Dersut livrés à Lugano, Bellinzone, Locarno et Mendrisio. Offres pour la restauration et les bureaux.',
        title: ['Le café Dersut', 'au Tessin'],
        lead: 'Au Tessin, l’espresso est une culture. Nous livrons l’espresso de Conegliano à Lugano, Bellinzone, Locarno et dans tout le sud ensoleillé de la Suisse.',
        introTitle: 'L’art italien de la torréfaction, tout proche',
        intro: [
          'Au Tessin, on attend un véritable espresso italien. Dersut torréfie depuis 1947 à Conegliano, en Vénétie, et porte le label « Espresso Italiano Certificato » de l’Istituto Espresso Italiano.',
          'Vous commandez en francs chez le distributeur officiel en Suisse et recevez des produits originaux par la poste.',
        ],
        b2bTitle: 'Pour les bars, grotti et hôtels tessinois',
        b2b: 'Bars, grotti, restaurants, hôtels et bureaux au Tessin reçoivent sur demande une offre personnalisée avec conditions sur quantité.',
        deliveryTitle: 'Livraison dans tout le Tessin',
        delivery: 'Expédition par La Poste suisse, forfait de CHF 12.– (livraison offerte dès CHF 100.–) par commande, en général 1 à 2 jours ouvrables après réception du paiement.',
        faq: [
          ['Livrez-vous au Tessin ?', 'Oui, nous livrons par la poste dans tout le Tessin et dans toute la Suisse, au forfait de CHF 12.– (livraison offerte dès CHF 100.–).'],
          ['Avez-vous des offres pour les restaurants tessinois ?', 'Oui. Via la page Restauration, nous établissons une offre sur mesure.'],
        ],
      },
      it: {
        name: 'Ticino',
        metaTitle: 'Caffè Dersut in Ticino: Lugano, Bellinzona, Locarno',
        metaDescription: 'Vero espresso italiano per il Ticino: caffè in grani Dersut con consegna a Lugano, Bellinzona, Locarno e Mendrisio. Offerte per bar e ristoranti.',
        title: ['Caffè Dersut', 'in Ticino'],
        lead: 'In Ticino l’espresso è cultura. Portiamo l’espresso di Conegliano a Lugano, Bellinzona, Locarno e in tutto il cantone, direttamente dal distributore ufficiale svizzero.',
        introTitle: 'L’arte della torrefazione italiana, a due passi',
        intro: [
          'In Ticino chi beve un caffè si aspetta un vero espresso italiano. Dersut tosta dal 1947 a Conegliano, in Veneto, e porta il marchio «Espresso Italiano Certificato» dell’Istituto Espresso Italiano.',
          'Il nostro negozio è interamente in italiano. Ordinate in franchi, pagate con bonifico e ricevete prodotti originali per posta, senza dogana né sorprese.',
        ],
        b2bTitle: 'Per bar, grotti e hotel ticinesi',
        b2b: 'Bar, grotti, ristoranti, hotel e uffici in Ticino ricevono su richiesta un’offerta personalizzata con condizioni sulla quantità e consegna regolare.',
        deliveryTitle: 'Consegna in tutto il Ticino',
        delivery: 'Spediamo con la Posta Svizzera, forfait di CHF 12.– (gratuita da CHF 100.–) per ordine. Di regola il pacco arriva entro 1–2 giorni lavorativi dal ricevimento del pagamento.',
        faq: [
          ['Consegnate in Ticino?', 'Sì, consegniamo per posta in tutto il Ticino e in tutta la Svizzera, con forfait di CHF 12.– (gratuita da CHF 100.–).'],
          ['Posso ordinare in italiano?', 'Certo. Il sito, il negozio e le conferme d’ordine sono disponibili in italiano.'],
          ['Avete offerte per bar e ristoranti ticinesi?', 'Sì. Tramite il modulo della pagina Gastronomia prepariamo un’offerta su misura per il vostro locale.'],
        ],
      },
      en: {
        name: 'Ticino',
        metaTitle: 'Dersut coffee in Ticino: Lugano, Bellinzona, Locarno',
        metaDescription:
          'Genuine Italian espresso for Ticino: Dersut coffee beans delivered to Lugano, Bellinzona, Locarno and Mendrisio. Offers for hospitality and offices.',
        title: ['Dersut coffee', 'in Ticino'],
        lead: 'In Ticino, espresso is culture. We deliver the espresso from Conegliano to Lugano, Bellinzona, Locarno and all of Switzerland’s sunny south.',
        introTitle: 'Italian roasting craft, close at hand',
        intro: [
          'In Ticino, people expect a real Italian espresso. Dersut has been roasting in Conegliano, Veneto, since 1947 and carries the “Espresso Italiano Certificato” seal of the Istituto Espresso Italiano.',
          'You order in Swiss francs from the official Swiss distributor and receive original products by post.',
        ],
        b2bTitle: 'For Ticino’s bars, grotti and hotels',
        b2b: 'Bars, grotti, restaurants, hotels and offices in Ticino can request an individual quote with volume terms.',
        deliveryTitle: 'Delivery throughout Ticino',
        delivery: 'Shipped by Swiss Post for a flat CHF 12.– (free from CHF 100.–) per order, usually within 1 to 2 working days of payment.',
        faq: [
          ['Do you deliver to Ticino?', 'Yes, we deliver by post throughout Ticino and all of Switzerland for a flat CHF 12.– (free from CHF 100.–).'],
          ['Can I order in Italian?', 'Yes. The website, shop and order confirmations are also available in Italian.'],
        ],
      },
    },
  },
];

export const REGION_UI: Record<Locale, {
  crumb: string;
  eyebrow: string;
  placesTitle: string;
  placesText: string;
  shopEyebrow: string;
  shopTitle: string;
  gastro: string;
  gastroText: string;
  office: string;
  officeText: string;
  more: string;
  faqTitle: string;
  linksEyebrow: string;
  linksTitle: string;
}> = {
  de: {
    crumb: 'Regionen',
    eyebrow: 'Lieferung in Ihre Region',
    placesTitle: 'Wir liefern unter anderem nach',
    placesText: 'und an jede andere Adresse in der Schweiz.',
    shopEyebrow: 'Onlineshop',
    shopTitle: 'Unsere Espressobohnen',
    gastro: 'Gastronomie',
    gastroText: 'Restaurants, Bars, Cafés und Hotels',
    office: 'Firmen & Büro',
    officeText: 'Bürokaffee für Teams, Praxen und Kanzleien',
    more: 'Mehr erfahren',
    faqTitle: 'Häufige Fragen',
    linksEyebrow: 'Ganze Schweiz',
    linksTitle: 'Dersut in Ihrer Region',
  },
  fr: {
    crumb: 'Régions',
    eyebrow: 'Livraison dans votre région',
    placesTitle: 'Nous livrons notamment à',
    placesText: 'et à toute autre adresse en Suisse.',
    shopEyebrow: 'Boutique en ligne',
    shopTitle: 'Nos grains d’espresso',
    gastro: 'Restauration',
    gastroText: 'Restaurants, bars, cafés et hôtels',
    office: 'Entreprises & bureau',
    officeText: 'Café de bureau pour équipes, cabinets et études',
    more: 'En savoir plus',
    faqTitle: 'Questions fréquentes',
    linksEyebrow: 'Toute la Suisse',
    linksTitle: 'Dersut dans votre région',
  },
  it: {
    crumb: 'Regioni',
    eyebrow: 'Consegna nella vostra regione',
    placesTitle: 'Consegniamo tra l’altro a',
    placesText: 'e a qualsiasi altro indirizzo in Svizzera.',
    shopEyebrow: 'Negozio online',
    shopTitle: 'Il nostro caffè in grani',
    gastro: 'Gastronomia',
    gastroText: 'Ristoranti, bar, caffè e hotel',
    office: 'Aziende & ufficio',
    officeText: 'Caffè per team, studi medici e legali',
    more: 'Scoprire di più',
    faqTitle: 'Domande frequenti',
    linksEyebrow: 'Tutta la Svizzera',
    linksTitle: 'Dersut nella vostra regione',
  },
  en: {
    crumb: 'Regions',
    eyebrow: 'Delivery to your region',
    placesTitle: 'We deliver to places including',
    placesText: 'and to any other address in Switzerland.',
    shopEyebrow: 'Online shop',
    shopTitle: 'Our espresso beans',
    gastro: 'Hospitality',
    gastroText: 'Restaurants, bars, cafés and hotels',
    office: 'Companies & office',
    officeText: 'Office coffee for teams, practices and law firms',
    more: 'Learn more',
    faqTitle: 'Frequently asked questions',
    linksEyebrow: 'All of Switzerland',
    linksTitle: 'Dersut in your region',
  },
};

export function getRegion(slug: string): Region | undefined {
  return REGIONS.find((r) => r.slug === slug);
}
