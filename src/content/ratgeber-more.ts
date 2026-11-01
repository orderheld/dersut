import type { Article } from './ratgeber';

/**
 * Weitere Ratgeber-Artikel (November 2026): Sortenvergleich, Bürokaffee-Kosten, Cappuccino,
 * Arabica und Robusta, Kaffee als Geschenk. Alle Fakten stammen aus den Produkttexten bzw. dersut.it;
 * Rechenbeispiele beruhen auf den Shop-Preisen und rund 7 g Kaffee pro Espresso.
 */
const OPTIMUM = 'dersut-optimum-rosso-1kg';
const DOMUS = 'dersut-domus-marrone-1kg';
const NPU = 'dersut-non-plus-ultra-1kg';
const ORO = 'dersut-plus-oro-1kg';

export const MORE_ARTICLES: Article[] = [
  /* ------------------------------------------------------------------ */
  /* Alle vier Sorten im Vergleich                                      */
  /* ------------------------------------------------------------------ */
  {
    slug: 'dersut-sorten-vergleich',
    image: 'selezione',
    products: [NPU, ORO, OPTIMUM, DOMUS],
    published: '2026-11-01',
    text: {
      de: {
        title: 'Welcher Dersut Espresso passt zu mir? Alle vier Sorten im Vergleich',
        metaTitle: 'Dersut Espresso Vergleich: alle 4 Sorten erklärt',
        metaDescription:
          'Non Plus Ultra, Plus Oro, Optimum Rosso oder Domus Marrone? Geschmack, Intensität, Preis und Zubereitung der vier Dersut Espressobohnen im direkten Vergleich.',
        teaser:
          'Fruchtig und fein, rund und süss, ausgewogen oder kräftig: die vier Dersut-Mischungen im Überblick, mit einer Entscheidungshilfe in 30 Sekunden.',
        lead:
          'Vier Espressomischungen, vier Charaktere: Im Shop finden Sie die ganze Bandbreite von Dersut, vom feinen 100-%-Arabica bis zum kräftigen Espresso mit Intensität 5. Alle vier kommen als ganze Bohnen in der 1-kg-Packung direkt aus der Rösterei in Conegliano. Dieser Vergleich zeigt, wie sie schmecken, wofür sie sich eignen und welche Mischung am besten zu Ihnen passt.',
        sections: [
          {
            h: 'Die vier Sorten auf einen Blick',
            p: [
              'Alle Mischungen werden in Conegliano in zwei Stufen geröstet und Bohne für Bohne elektronisch nach Farbe sortiert. Sie unterscheiden sich vor allem in der Zusammensetzung der Sorten und damit in Körper, Säure und Intensität.',
            ],
            list: [
              '[Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg): 100 % Arabica, Intensität 3 von 5, floral, Zitrus, Mandel und Kakao, Gold Medal 2025, CHF 39.90',
              '[Plus Oro](/shop/dersut-plus-oro-1kg): Arabica und Robusta, Intensität 4 von 5, Feingebäck, Kakao und Haselnuss, Gold Medal 2025, CHF 34.90',
              '[Optimum Rosso](/shop/dersut-optimum-rosso-1kg): Arabica und Robusta, Intensität 4 von 5, Kakao, Feingebäck und lang anhaltende Crema, CHF 29.90',
              '[Domus Marrone](/shop/dersut-domus-marrone-1kg): Robusta und Arabica, Intensität 5 von 5, Backwaren und Trockenfrüchte, sehr kräftig, CHF 26.90',
            ],
          },
          {
            h: 'Non Plus Ultra: für Geniesser von feinem Espresso',
            p: [
              'Non Plus Ultra ist die Spitze des Sortiments. Die Röstmeister verwenden ausschliesslich Arabica, gewaschen und naturbelassen, vor allem aus Mittelamerika und vom Horn von Afrika. In der Tasse zeigt sich ein eleganter, vielschichtiger Espresso mit floralen und fruchtigen Noten, einer lebendigen Zitrussäure und einem Nachklang von Kakao und Nüssen.',
              'Wählen Sie Non Plus Ultra, wenn Sie Ihren Espresso pur trinken, Nuancen schätzen und eher wenig Bitterkeit mögen. Die Mischung wurde beim International Coffee Tasting mehrfach mit Gold ausgezeichnet, zuletzt 2025, und ist als «Espresso Italiano di Qualità» zertifiziert.',
            ],
          },
          {
            h: 'Plus Oro: die goldene Mitte',
            p: [
              'Plus Oro verbindet edle Arabica- und Robusta-Sorten zu einem weichen und zugleich intensiven Espresso mit mittlerem Körper und feiner Säure. Noten von Feingebäck und Kakaobohne, ein Hauch von Gewürzen und ein Nachklang von Kakao und Haselnuss machen ihn rund und süss.',
              'Plus Oro ist die richtige Wahl, wenn Sie einen ausgezeichneten Espresso suchen, der pur und mit Milch gleich gut funktioniert. Auch er trägt die Gold Medal des International Coffee Tasting 2025 und den Camaleonte Espresso Award.',
            ],
          },
          {
            h: 'Optimum Rosso: der Allrounder für jeden Tag',
            p: [
              'Optimum Rosso ist die Mischung für den täglichen Genuss: beliebte Arabica-Sorten für Süsse und Aroma, Robusta für Körper und eine stabile, haselnussbraune Crema. Feine Noten von Kakao und Feingebäck, wenig Säure und ein langer Abgang machen ihn unkompliziert und vielseitig.',
              'Im Cappuccino und Latte macchiato spielt Optimum seine Stärken voll aus. Für Vollautomaten zu Hause und im Büro ist er unsere meistempfohlene Mischung.',
            ],
          },
          {
            h: 'Domus Marrone: kräftig und vollmundig',
            p: [
              'Domus Marrone ist eine Mischung aus ausgewählten Robusta- und Arabica-Sorten und bringt die meiste Kraft ins Sortiment. Ein sehr intensiver Duft, runder Körper, ein Hauch von Backwaren und ein Nachklang von Trockenfrüchten geben ihm einen entschlossenen Charakter.',
              'Wer seinen Espresso stark mag oder einen Kaffee sucht, der sich auch mit viel Milch noch deutlich durchsetzt, liegt bei Domus richtig. Zudem ist er die preiswerteste Mischung im Shop.',
            ],
          },
          {
            h: 'So entscheiden Sie in 30 Sekunden',
            p: ['Wenn Sie unsicher sind, hilft diese einfache Faustregel:'],
            list: [
              'Pur, fein und fruchtig: Non Plus Ultra',
              'Pur und mit Milch, rund und süss, mit Goldmedaille: Plus Oro',
              'Cappuccino, Vollautomat und tägliche Tasse: Optimum Rosso',
              'Stark, vollmundig und günstig pro Tasse: Domus Marrone',
              'Unentschlossen? Bestellen Sie zwei Sorten zum Vergleichen: Ab {free} ist der Versand ohnehin gratis.',
            ],
          },
        ],
        faq: [
          ['Welche Dersut-Sorte ist die mildeste?', 'Non Plus Ultra mit Intensität 3 von 5. Als 100 % Arabica ist er fein und fruchtig mit wenig Bitterkeit, aber trotzdem aromatisch.'],
          ['Welche Dersut-Sorte ist die stärkste?', 'Domus Marrone mit Intensität 5 von 5. Er hat den kräftigsten Körper und setzt sich auch in Milchgetränken deutlich durch.'],
          ['Welche Sorten haben eine Goldmedaille?', 'Non Plus Ultra und Plus Oro wurden beim International Coffee Tasting 2025 des IIAC in Brescia mit der Gold Medal ausgezeichnet.'],
          ['Eignen sich alle vier für den Vollautomaten?', 'Ja. Alle vier Mischungen sind ganze Bohnen und eignen sich für Vollautomat, Siebträger und Moka-Kanne.'],
        ],
        cta: 'Alle vier Mischungen als ganze Bohnen in der 1-kg-Originalpackung:',
      },
      fr: {
        title: 'Quel espresso Dersut choisir ? Les quatre mélanges comparés',
        metaTitle: 'Comparatif espresso Dersut : les 4 mélanges',
        metaDescription:
          'Non Plus Ultra, Plus Oro, Optimum Rosso ou Domus Marrone ? Goût, intensité, prix et préparation des quatre grains d’espresso Dersut comparés en un coup d’œil.',
        teaser:
          'Fin et fruité, rond et doux, équilibré ou corsé : les quatre mélanges Dersut en un coup d’œil, avec une aide au choix en 30 secondes.',
        lead:
          'Quatre mélanges espresso, quatre caractères : la boutique couvre toute la gamme Dersut, du délicat 100 % Arabica à l’espresso corsé d’intensité 5. Tous sont livrés en grains entiers, en paquet de 1 kg, directement de la torréfaction de Conegliano. Ce comparatif montre leur goût, leur usage idéal et le mélange qui vous correspond.',
        sections: [
          {
            h: 'Les quatre mélanges en un coup d’œil',
            p: [
              'Tous les mélanges sont torréfiés en deux étapes à Conegliano puis triés grain par grain par sélection électronique de la couleur. Ils se distinguent surtout par leur composition, et donc par le corps, l’acidité et l’intensité.',
            ],
            list: [
              '[Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg) : 100 % Arabica, intensité 3 sur 5, floral, agrumes, amande et cacao, Gold Medal 2025, CHF 39.90',
              '[Plus Oro](/shop/dersut-plus-oro-1kg) : Arabica et Robusta, intensité 4 sur 5, pâtisserie, cacao et noisette, Gold Medal 2025, CHF 34.90',
              '[Optimum Rosso](/shop/dersut-optimum-rosso-1kg) : Arabica et Robusta, intensité 4 sur 5, cacao, pâtisserie et crème persistante, CHF 29.90',
              '[Domus Marrone](/shop/dersut-domus-marrone-1kg) : Robusta et Arabica, intensité 5 sur 5, viennoiserie et fruits secs, très corsé, CHF 26.90',
            ],
          },
          {
            h: 'Non Plus Ultra : pour les amateurs d’espresso raffiné',
            p: [
              'Non Plus Ultra est le sommet de la gamme. Les torréfacteurs n’utilisent que de l’Arabica, lavé et nature, principalement d’Amérique centrale et de la Corne de l’Afrique. En tasse, un espresso élégant et complexe, aux notes florales et fruitées, à l’acidité vive d’agrumes et à la finale de cacao et de fruits secs.',
              'Choisissez Non Plus Ultra si vous buvez votre espresso nature, aimez les nuances et préférez peu d’amertume. Le mélange a reçu plusieurs fois l’or à l’International Coffee Tasting, la dernière fois en 2025, et il est certifié « Espresso Italiano di Qualità ».',
            ],
          },
          {
            h: 'Plus Oro : le juste milieu',
            p: [
              'Plus Oro associe de nobles Arabica et Robusta en un espresso doux et intense à la fois, au corps moyen et à l’acidité fine. Des notes de pâtisserie et de fève de cacao, une touche d’épices et une finale de cacao et de noisette le rendent rond et doux.',
              'Plus Oro est le bon choix si vous cherchez un espresso primé, aussi bon nature qu’avec du lait. Il porte lui aussi la Gold Medal de l’International Coffee Tasting 2025 ainsi que le Camaleonte Espresso Award.',
            ],
          },
          {
            h: 'Optimum Rosso : le polyvalent du quotidien',
            p: [
              'Optimum Rosso est le mélange du plaisir quotidien : des Arabica appréciés pour la douceur et l’arôme, du Robusta pour le corps et une crème stable couleur noisette. De fines notes de cacao et de pâtisserie, peu d’acidité et une longue finale le rendent simple et polyvalent.',
              'En cappuccino et en latte macchiato, Optimum donne le meilleur de lui-même. Pour les machines automatiques à la maison comme au bureau, c’est le mélange que nous recommandons le plus souvent.',
            ],
          },
          {
            h: 'Domus Marrone : corsé et généreux',
            p: [
              'Domus Marrone associe des Robusta et des Arabica sélectionnés et apporte le plus de puissance de la gamme. Un parfum très intense, un corps rond, une touche de viennoiserie et une finale de fruits secs lui donnent un caractère affirmé.',
              'Si vous aimez l’espresso fort ou cherchez un café qui reste bien présent même avec beaucoup de lait, Domus est fait pour vous. C’est aussi le mélange le plus avantageux de la boutique.',
            ],
          },
          {
            h: 'Choisir en 30 secondes',
            p: ['En cas de doute, cette règle simple vous aide :'],
            list: [
              'Nature, fin et fruité : Non Plus Ultra',
              'Nature et avec du lait, rond et doux, médaillé d’or : Plus Oro',
              'Cappuccino, machine automatique et tasse quotidienne : Optimum Rosso',
              'Fort, généreux et avantageux par tasse : Domus Marrone',
              'Indécis ? Commandez deux mélanges pour comparer : dès {free}, la livraison est de toute façon offerte.',
            ],
          },
        ],
        faq: [
          ['Quel mélange Dersut est le plus doux ?', 'Non Plus Ultra, intensité 3 sur 5. En 100 % Arabica, il est fin et fruité, avec peu d’amertume, tout en restant aromatique.'],
          ['Quel mélange Dersut est le plus corsé ?', 'Domus Marrone, intensité 5 sur 5. Il a le corps le plus puissant et reste bien présent dans les boissons lactées.'],
          ['Quels mélanges ont une médaille d’or ?', 'Non Plus Ultra et Plus Oro ont reçu la Gold Medal à l’International Coffee Tasting 2025 de l’IIAC à Brescia.'],
          ['Les quatre conviennent-ils aux machines automatiques ?', 'Oui. Les quatre mélanges sont en grains entiers et conviennent aux machines automatiques, au porte-filtre et à la moka.'],
        ],
        cta: 'Les quatre mélanges en grains entiers, paquet original de 1 kg :',
      },
      it: {
        title: 'Quale espresso Dersut fa per me? Le quattro miscele a confronto',
        metaTitle: 'Espresso Dersut a confronto: le 4 miscele',
        metaDescription:
          'Non Plus Ultra, Plus Oro, Optimum Rosso o Domus Marrone? Gusto, intensità, prezzo e preparazione dei quattro caffè in grani Dersut messi a confronto.',
        teaser:
          'Fine e fruttato, rotondo e dolce, equilibrato o deciso: le quattro miscele Dersut in sintesi, con una guida alla scelta in 30 secondi.',
        lead:
          'Quattro miscele espresso, quattro caratteri: nel negozio trovate tutta la gamma Dersut, dal delicato 100 % Arabica all’espresso deciso con intensità 5. Tutte arrivano in grani interi, in confezione da 1 kg, direttamente dalla torrefazione di Conegliano. Questo confronto mostra che sapore hanno, per cosa sono adatte e quale miscela fa per voi.',
        sections: [
          {
            h: 'Le quattro miscele in sintesi',
            p: [
              'Tutte le miscele sono tostate in due fasi a Conegliano e selezionate chicco per chicco con la selezione elettronica del colore. Si distinguono soprattutto per la composizione e quindi per corpo, acidità e intensità.',
            ],
            list: [
              '[Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg): 100 % Arabica, intensità 3 su 5, floreale, agrumi, mandorla e cacao, Gold Medal 2025, CHF 39.90',
              '[Plus Oro](/shop/dersut-plus-oro-1kg): Arabica e Robusta, intensità 4 su 5, pasticceria, cacao e nocciola, Gold Medal 2025, CHF 34.90',
              '[Optimum Rosso](/shop/dersut-optimum-rosso-1kg): Arabica e Robusta, intensità 4 su 5, cacao, pasticceria e crema persistente, CHF 29.90',
              '[Domus Marrone](/shop/dersut-domus-marrone-1kg): Robusta e Arabica, intensità 5 su 5, prodotti da forno e frutta secca, molto deciso, CHF 26.90',
            ],
          },
          {
            h: 'Non Plus Ultra: per chi ama l’espresso raffinato',
            p: [
              'Non Plus Ultra è il vertice della gamma. I mastri tostatori usano solo Arabica, lavate e naturali, soprattutto dal Centro America e dal Corno d’Africa. In tazza un espresso elegante e complesso, con note floreali e fruttate, una vivace acidità agrumata e un finale di cacao e frutta secca.',
              'Scegliete Non Plus Ultra se bevete l’espresso al naturale, amate le sfumature e preferite poca amarezza. La miscela ha vinto più volte l’oro all’International Coffee Tasting, l’ultima volta nel 2025, ed è certificata «Espresso Italiano di Qualità».',
            ],
          },
          {
            h: 'Plus Oro: la via di mezzo dorata',
            p: [
              'Plus Oro unisce pregiate Arabica e Robusta in un espresso morbido e al tempo stesso intenso, con corpo medio e acidità fine. Note di pasticceria e fava di cacao, un tocco di spezie e un finale di cacao e nocciola lo rendono rotondo e dolce.',
              'Plus Oro è la scelta giusta se cercate un espresso premiato, ottimo sia al naturale sia con il latte. Anche lui ha la Gold Medal dell’International Coffee Tasting 2025 e il Camaleonte Espresso Award.',
            ],
          },
          {
            h: 'Optimum Rosso: il tuttofare di ogni giorno',
            p: [
              'Optimum Rosso è la miscela del piacere quotidiano: apprezzate Arabica per dolcezza e aroma, Robusta per corpo e una crema stabile color nocciola. Delicate note di cacao e pasticceria, poca acidità e un finale lungo lo rendono semplice e versatile.',
              'Nel cappuccino e nel latte macchiato Optimum dà il meglio di sé. Per le macchine automatiche a casa e in ufficio è la miscela che consigliamo più spesso.',
            ],
          },
          {
            h: 'Domus Marrone: deciso e corposo',
            p: [
              'Domus Marrone unisce Robusta e Arabica selezionate e porta la maggiore forza della gamma. Un profumo molto intenso, corpo rotondo, un tocco di prodotti da forno e un finale di frutta secca gli danno un carattere deciso.',
              'Se amate l’espresso forte o cercate un caffè che si senta bene anche con molto latte, Domus fa per voi. È anche la miscela più conveniente del negozio.',
            ],
          },
          {
            h: 'Scegliere in 30 secondi',
            p: ['Se siete indecisi, questa semplice regola vi aiuta:'],
            list: [
              'Al naturale, fine e fruttato: Non Plus Ultra',
              'Al naturale e con latte, rotondo e dolce, medaglia d’oro: Plus Oro',
              'Cappuccino, macchina automatica e tazza quotidiana: Optimum Rosso',
              'Forte, corposo e conveniente per tazza: Domus Marrone',
              'Ancora indecisi? Ordinate due miscele per confrontarle: da {free} la spedizione è comunque gratuita.',
            ],
          },
        ],
        faq: [
          ['Qual è la miscela Dersut più delicata?', 'Non Plus Ultra, intensità 3 su 5. Essendo 100 % Arabica è fine e fruttato, con poca amarezza, ma comunque aromatico.'],
          ['Qual è la miscela Dersut più forte?', 'Domus Marrone, intensità 5 su 5. Ha il corpo più deciso e si sente bene anche nelle bevande con latte.'],
          ['Quali miscele hanno la medaglia d’oro?', 'Non Plus Ultra e Plus Oro hanno ricevuto la Gold Medal all’International Coffee Tasting 2025 dell’IIAC a Brescia.'],
          ['Sono tutte adatte alla macchina automatica?', 'Sì. Tutte e quattro le miscele sono in grani interi e adatte a macchina automatica, portafiltro e moka.'],
        ],
        cta: 'Tutte e quattro le miscele in grani, confezione originale da 1 kg:',
      },
      en: {
        title: 'Which Dersut espresso suits me? All four blends compared',
        metaTitle: 'Dersut espresso compared: all 4 blends explained',
        metaDescription:
          'Non Plus Ultra, Plus Oro, Optimum Rosso or Domus Marrone? Taste, intensity, price and brewing of the four Dersut espresso bean blends compared side by side.',
        teaser:
          'Fine and fruity, round and sweet, balanced or bold: the four Dersut blends at a glance, with a 30-second guide to choosing.',
        lead:
          'Four espresso blends, four characters: the shop covers the full Dersut range, from delicate 100 % Arabica to a bold espresso with intensity 5. All four come as whole beans in 1 kg packs, straight from the roastery in Conegliano. This comparison shows how they taste, what they are best for and which blend suits you.',
        sections: [
          {
            h: 'The four blends at a glance',
            p: [
              'All blends are roasted in two stages in Conegliano and sorted bean by bean with electronic colour sorting. They differ mainly in their composition, and therefore in body, acidity and intensity.',
            ],
            list: [
              '[Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg): 100 % Arabica, intensity 3 of 5, floral, citrus, almond and cocoa, Gold Medal 2025, CHF 39.90',
              '[Plus Oro](/shop/dersut-plus-oro-1kg): Arabica and Robusta, intensity 4 of 5, pastry, cocoa and hazelnut, Gold Medal 2025, CHF 34.90',
              '[Optimum Rosso](/shop/dersut-optimum-rosso-1kg): Arabica and Robusta, intensity 4 of 5, cocoa, pastry and long-lasting crema, CHF 29.90',
              '[Domus Marrone](/shop/dersut-domus-marrone-1kg): Robusta and Arabica, intensity 5 of 5, baked goods and dried fruit, very bold, CHF 26.90',
            ],
          },
          {
            h: 'Non Plus Ultra: for lovers of refined espresso',
            p: [
              'Non Plus Ultra is the top of the range. The roasters use only Arabica, washed and natural, mainly from Central America and the Horn of Africa. In the cup it is an elegant, layered espresso with floral and fruity notes, lively citrus acidity and a finish of cocoa and nuts.',
              'Choose Non Plus Ultra if you drink your espresso straight, enjoy nuance and prefer little bitterness. The blend has won gold several times at the International Coffee Tasting, most recently in 2025, and is certified “Espresso Italiano di Qualità”.',
            ],
          },
          {
            h: 'Plus Oro: the golden middle',
            p: [
              'Plus Oro combines fine Arabica and Robusta into an espresso that is smooth yet intense, with medium body and delicate acidity. Notes of pastry and cocoa bean, a hint of spice and a finish of cocoa and hazelnut make it round and sweet.',
              'Plus Oro is the right choice if you want an award-winning espresso that works equally well straight or with milk. It also holds the Gold Medal of the International Coffee Tasting 2025 and the Camaleonte Espresso Award.',
            ],
          },
          {
            h: 'Optimum Rosso: the everyday all-rounder',
            p: [
              'Optimum Rosso is the blend for everyday enjoyment: popular Arabica for sweetness and aroma, Robusta for body and a stable, hazelnut-coloured crema. Delicate notes of cocoa and pastry, low acidity and a long finish make it easy-going and versatile.',
              'In cappuccino and latte macchiato, Optimum shows its full strength. For bean-to-cup machines at home and in the office it is the blend we recommend most often.',
            ],
          },
          {
            h: 'Domus Marrone: bold and full-bodied',
            p: [
              'Domus Marrone combines selected Robusta and Arabica and brings the most power to the range. A very intense aroma, round body, a hint of baked goods and a finish of dried fruit give it a decisive character.',
              'If you like your espresso strong, or want a coffee that still stands out with plenty of milk, Domus is the one. It is also the best-value blend in the shop.',
            ],
          },
          {
            h: 'Decide in 30 seconds',
            p: ['If you are unsure, this simple rule of thumb helps:'],
            list: [
              'Straight, fine and fruity: Non Plus Ultra',
              'Straight and with milk, round and sweet, gold medal: Plus Oro',
              'Cappuccino, bean-to-cup machine and everyday cup: Optimum Rosso',
              'Strong, full-bodied and good value per cup: Domus Marrone',
              'Still undecided? Order two blends to compare: from {free}, shipping is free anyway.',
            ],
          },
        ],
        faq: [
          ['Which Dersut blend is the mildest?', 'Non Plus Ultra with intensity 3 of 5. As a 100 % Arabica it is fine and fruity with little bitterness, yet still aromatic.'],
          ['Which Dersut blend is the strongest?', 'Domus Marrone with intensity 5 of 5. It has the boldest body and stands out clearly in milk drinks too.'],
          ['Which blends have a gold medal?', 'Non Plus Ultra and Plus Oro received the Gold Medal at the IIAC International Coffee Tasting 2025 in Brescia.'],
          ['Are all four suitable for bean-to-cup machines?', 'Yes. All four blends are whole beans and suit bean-to-cup machines, portafilter machines and moka pots.'],
        ],
        cta: 'All four blends as whole beans in the original 1 kg pack:',
      },
    },
  },
  /* ------------------------------------------------------------------ */
  /* Kaffee im Büro: Kosten pro Tasse                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: 'kaffee-buero-kosten',
    image: 'macchina',
    products: [OPTIMUM, DOMUS, ORO],
    published: '2026-11-01',
    text: {
      de: {
        title: 'Kaffee im Büro: Kosten pro Tasse und Monatsbedarf berechnen',
        metaTitle: 'Bürokaffee Kosten: Preis pro Tasse berechnen',
        metaDescription:
          'Was kostet Kaffee im Büro wirklich? Kosten pro Tasse, Monatsbedarf und ein Rechenbeispiel für 15 Personen: mit ganzen Bohnen ab rund 20 Rappen pro Espresso.',
        teaser:
          'Wie viele Tassen gibt ein Kilo, was kostet ein Espresso im Büro und wie viel Kaffee braucht Ihr Team? Mit Rechenbeispiel und Tipps.',
        lead:
          'Kaffee gehört in fast jedem Büro dazu, doch kaum jemand weiss, was eine Tasse eigentlich kostet. Dabei ist die Rechnung einfach: Mit ganzen Bohnen und einem Vollautomaten kostet ein Espresso oft nur rund 20 bis 30 Rappen Kaffee. Hier sehen Sie, wie Sie Kosten und Bedarf für Ihr Team berechnen und worauf Sie achten sollten, damit der Bürokaffee gut bleibt.',
        sections: [
          {
            h: 'Wie viele Tassen gibt ein Kilogramm Kaffee?',
            p: [
              'Für einen Espresso braucht ein Vollautomat oder eine Siebträgermaschine rund 7 Gramm gemahlenen Kaffee. Rechnerisch ergibt ein Kilogramm damit etwa 140 Tassen. Weil beim Einstellen des Mahlgrads, beim Spülen und bei grösseren Tassen etwas mehr Kaffee gebraucht wird, rechnen Sie im Alltag besser mit 120 bis 140 Espressi pro Kilogramm.',
              'Ein Kaffee crème oder Lungo braucht je nach Einstellung gleich viel oder etwas mehr Kaffee, ein doppelter Espresso rund das Doppelte. Für eine gute Planung genügt der Mittelwert von etwa 130 Tassen pro Kilogramm.',
            ],
          },
          {
            h: 'Kosten pro Tasse mit Dersut Espressobohnen',
            p: ['Bei 120 bis 140 Tassen pro Kilogramm ergeben sich mit den Shop-Preisen folgende Kaffeekosten pro Espresso:'],
            list: [
              '[Domus Marrone](/shop/dersut-domus-marrone-1kg), CHF 26.90 pro kg: rund 19 bis 22 Rappen',
              '[Optimum Rosso](/shop/dersut-optimum-rosso-1kg), CHF 29.90 pro kg: rund 21 bis 25 Rappen',
              '[Plus Oro](/shop/dersut-plus-oro-1kg), CHF 34.90 pro kg: rund 25 bis 29 Rappen',
              '[Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg), CHF 39.90 pro kg: rund 29 bis 33 Rappen',
            ],
          },
          {
            h: 'Rechenbeispiel: ein Team mit 15 Personen',
            p: [
              'Nehmen wir ein Büro mit 15 Mitarbeitenden, die im Schnitt zweieinhalb Tassen pro Tag trinken, an 21 Arbeitstagen im Monat. Das ergibt rund 790 Tassen im Monat oder etwa 6 Kilogramm Kaffeebohnen.',
              'Mit dem Optimum Rosso kostet das CHF 179.40 im Monat, also rund 23 Rappen pro Tasse. Mit dem Domus Marrone sind es CHF 161.40 oder rund 20 Rappen pro Tasse. Weil die Bestellung über {free} liegt, ist der Versand gratis. Milch, Wasser, Strom und die Maschine selbst sind darin nicht eingerechnet.',
            ],
          },
          {
            h: 'Bohnen, Kapseln oder Filter: was lohnt sich im Büro?',
            p: [
              'Für Teams ab etwa fünf Personen ist ein Vollautomat mit ganzen Bohnen meist die beste Lösung: Jede Tasse wird frisch gemahlen, Espresso, Kaffee crème und Cappuccino kommen auf Knopfdruck, und die Kaffeekosten pro Tasse sind tief. Kapseln sind pro Portion in der Regel deutlich teurer und erzeugen viel Abfall. Vergleichen Sie einfach Ihren heutigen Preis pro Kapsel mit den Zahlen oben.',
              'Filterkaffee ist günstig, kommt aber bei Mitarbeitenden, die Espresso und Cappuccino gewohnt sind, oft weniger gut an. Wer Wert auf zufriedene Teams und Gäste legt, fährt mit Espressobohnen im Vollautomaten am besten.',
            ],
          },
          {
            h: 'So bleibt der Bürokaffee gut und günstig',
            p: ['Ein paar einfache Regeln sorgen dafür, dass jede Tasse schmeckt und nichts verloren geht:'],
            list: [
              'Eine Person ist für Nachschub und Reinigung zuständig',
              'Bohnenbehälter nur für wenige Tage füllen, die Packung gut verschliessen',
              'Reinigungs- und Entkalkungsprogramm der Maschine regelmässig laufen lassen',
              'Nach Plan bestellen, damit der Kaffee nie ausgeht und keine Vorräte alt werden',
              'Eine Mischung für alle wählen, zum Beispiel Optimum Rosso, der pur und mit Milch gefällt',
            ],
          },
          {
            h: 'Angebot für Ihre Firma',
            p: [
              'Für kleinere Teams bestellen Sie einfach im Shop. Für grössere Mengen, regelmässige Lieferungen oder mehrere Standorte erstellen wir Ihnen gerne ein Angebot mit Mengenpreisen. Fragen Sie unverbindlich auf der Seite [Firmen & Büro](/firmen) an. Mehr zur Wahl des Lieferanten lesen Sie im Ratgeber [Kaffee für Firmen und Gastronomie](/ratgeber/kaffee-fuer-firmen-gastronomie).',
            ],
          },
        ],
        faq: [
          ['Wie viele Tassen Espresso gibt ein Kilogramm Kaffeebohnen?', 'Rechnerisch etwa 140 bei 7 Gramm pro Tasse. Im Alltag sind 120 bis 140 Espressi pro Kilogramm realistisch.'],
          ['Was kostet ein Espresso im Büro mit ganzen Bohnen?', 'Mit Dersut Espressobohnen rund 19 bis 33 Rappen Kaffee pro Tasse, je nach Mischung. Milch, Strom und Maschine kommen dazu.'],
          ['Wie viel Kaffee braucht ein Büro mit 15 Personen?', 'Bei zweieinhalb Tassen pro Person und Arbeitstag etwa 6 Kilogramm Kaffeebohnen im Monat.'],
          ['Gibt es Mengenpreise für Firmen?', 'Ja. Für grössere Mengen und regelmässige Lieferungen erstellen wir ein Angebot. Fragen Sie auf der Seite Firmen & Büro an.'],
        ],
        cta: 'Beliebte Mischungen für den Vollautomaten im Büro:',
      },
      fr: {
        title: 'Café au bureau : calculer le coût par tasse et les besoins mensuels',
        metaTitle: 'Café de bureau : calculer le coût par tasse',
        metaDescription:
          'Combien coûte vraiment le café au bureau ? Coût par tasse, besoins mensuels et exemple pour 15 personnes : en grains, dès environ 20 centimes l’espresso.',
        teaser:
          'Combien de tasses par kilo, combien coûte un espresso au bureau et de combien de café votre équipe a-t-elle besoin ? Exemple chiffré et conseils.',
        lead:
          'Le café fait partie de presque tous les bureaux, mais rares sont ceux qui savent combien coûte réellement une tasse. Le calcul est pourtant simple : avec des grains entiers et une machine automatique, un espresso ne coûte souvent qu’environ 20 à 30 centimes de café. Voici comment calculer les coûts et les besoins de votre équipe, et comment garder un bon café au bureau.',
        sections: [
          {
            h: 'Combien de tasses donne un kilo de café ?',
            p: [
              'Pour un espresso, une machine automatique ou à porte-filtre utilise environ 7 grammes de café moulu. En théorie, un kilo donne donc environ 140 tasses. Comme le réglage de la mouture, les rinçages et les grandes tasses demandent un peu plus de café, comptez plutôt 120 à 140 espressos par kilo au quotidien.',
              'Un café crème ou un lungo utilise autant ou un peu plus de café selon le réglage, un double espresso environ le double. Pour planifier, la moyenne d’environ 130 tasses par kilo suffit.',
            ],
          },
          {
            h: 'Coût par tasse avec les grains Dersut',
            p: ['Avec 120 à 140 tasses par kilo et les prix de la boutique, le coût du café par espresso est le suivant :'],
            list: [
              '[Domus Marrone](/shop/dersut-domus-marrone-1kg), CHF 26.90 le kg : environ 19 à 22 centimes',
              '[Optimum Rosso](/shop/dersut-optimum-rosso-1kg), CHF 29.90 le kg : environ 21 à 25 centimes',
              '[Plus Oro](/shop/dersut-plus-oro-1kg), CHF 34.90 le kg : environ 25 à 29 centimes',
              '[Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg), CHF 39.90 le kg : environ 29 à 33 centimes',
            ],
          },
          {
            h: 'Exemple : une équipe de 15 personnes',
            p: [
              'Prenons un bureau de 15 collaborateurs qui boivent en moyenne deux tasses et demie par jour, 21 jours ouvrables par mois. Cela fait environ 790 tasses par mois, soit environ 6 kilos de grains.',
              'Avec l’Optimum Rosso, cela coûte CHF 179.40 par mois, soit environ 23 centimes la tasse. Avec le Domus Marrone, CHF 161.40, soit environ 20 centimes la tasse. La commande dépassant {free}, la livraison est offerte. Le lait, l’eau, l’électricité et la machine ne sont pas inclus.',
            ],
          },
          {
            h: 'Grains, capsules ou filtre : que choisir au bureau ?',
            p: [
              'Dès cinq personnes environ, une machine automatique avec des grains entiers est généralement la meilleure solution : chaque tasse est moulue à la minute, espresso, café crème et cappuccino sont prêts d’une simple pression, et le coût par tasse reste bas. Les capsules sont en règle générale nettement plus chères par portion et produisent beaucoup de déchets. Comparez simplement votre prix actuel par capsule aux chiffres ci-dessus.',
              'Le café filtre est bon marché, mais il plaît souvent moins aux collaborateurs habitués à l’espresso et au cappuccino. Pour des équipes et des visiteurs satisfaits, les grains d’espresso en machine automatique restent le meilleur choix.',
            ],
          },
          {
            h: 'Un café de bureau bon et économique',
            p: ['Quelques règles simples garantissent une bonne tasse sans gaspillage :'],
            list: [
              'Une personne est responsable du réapprovisionnement et du nettoyage',
              'Ne remplir le réservoir que pour quelques jours et bien refermer le paquet',
              'Lancer régulièrement les programmes de nettoyage et de détartrage',
              'Commander selon un plan, pour ne jamais manquer de café ni stocker trop longtemps',
              'Choisir un mélange pour tous, par exemple Optimum Rosso, apprécié nature et avec du lait',
            ],
          },
          {
            h: 'Une offre pour votre entreprise',
            p: [
              'Pour les petites équipes, commandez simplement dans la boutique. Pour de plus grandes quantités, des livraisons régulières ou plusieurs sites, nous vous établissons volontiers une offre avec prix de quantité. Demandez-la sans engagement sur la page [Entreprises & bureau](/firmen). Pour bien choisir votre fournisseur, lisez aussi [Café pour entreprises et restaurants](/ratgeber/kaffee-fuer-firmen-gastronomie).',
            ],
          },
        ],
        faq: [
          ['Combien d’espressos donne un kilo de grains ?', 'En théorie environ 140 à 7 grammes par tasse. Au quotidien, 120 à 140 espressos par kilo sont réalistes.'],
          ['Combien coûte un espresso au bureau avec des grains ?', 'Avec les grains Dersut, environ 19 à 33 centimes de café par tasse selon le mélange. Lait, électricité et machine en sus.'],
          ['De combien de café a besoin un bureau de 15 personnes ?', 'Avec deux tasses et demie par personne et par jour ouvrable, environ 6 kilos de grains par mois.'],
          ['Y a-t-il des prix de quantité pour les entreprises ?', 'Oui. Pour les grandes quantités et les livraisons régulières, nous établissons une offre. Demandez-la sur la page Entreprises & bureau.'],
        ],
        cta: 'Les mélanges préférés pour la machine automatique du bureau :',
      },
      it: {
        title: 'Caffè in ufficio: calcolare il costo per tazza e il fabbisogno mensile',
        metaTitle: 'Caffè in ufficio: calcolare il costo per tazza',
        metaDescription:
          'Quanto costa davvero il caffè in ufficio? Costo per tazza, fabbisogno mensile ed esempio per 15 persone: con i chicchi da circa 20 centesimi a espresso.',
        teaser:
          'Quante tazze da un chilo, quanto costa un espresso in ufficio e di quanto caffè ha bisogno il vostro team? Con esempio di calcolo e consigli.',
        lead:
          'Il caffè fa parte di quasi ogni ufficio, ma pochi sanno quanto costa davvero una tazza. Eppure il calcolo è semplice: con i chicchi interi e una macchina automatica, un espresso costa spesso solo circa 20–30 centesimi di caffè. Ecco come calcolare costi e fabbisogno del vostro team e cosa fare perché il caffè in ufficio resti buono.',
        sections: [
          {
            h: 'Quante tazze si ottengono da un chilo di caffè?',
            p: [
              'Per un espresso una macchina automatica o a portafiltro usa circa 7 grammi di caffè macinato. In teoria un chilo dà quindi circa 140 tazze. Poiché la regolazione della macinatura, i risciacqui e le tazze più grandi richiedono un po’ più di caffè, nella pratica è meglio calcolare 120–140 espressi per chilo.',
              'Un caffè lungo usa, a seconda della regolazione, la stessa quantità o un po’ di più, un doppio espresso circa il doppio. Per pianificare basta la media di circa 130 tazze per chilo.',
            ],
          },
          {
            h: 'Costo per tazza con il caffè in grani Dersut',
            p: ['Con 120–140 tazze per chilo e i prezzi del negozio, il costo del caffè per espresso è il seguente:'],
            list: [
              '[Domus Marrone](/shop/dersut-domus-marrone-1kg), CHF 26.90 al kg: circa 19–22 centesimi',
              '[Optimum Rosso](/shop/dersut-optimum-rosso-1kg), CHF 29.90 al kg: circa 21–25 centesimi',
              '[Plus Oro](/shop/dersut-plus-oro-1kg), CHF 34.90 al kg: circa 25–29 centesimi',
              '[Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg), CHF 39.90 al kg: circa 29–33 centesimi',
            ],
          },
          {
            h: 'Esempio: un team di 15 persone',
            p: [
              'Prendiamo un ufficio con 15 collaboratori che bevono in media due tazze e mezza al giorno, per 21 giorni lavorativi al mese. Sono circa 790 tazze al mese, ossia circa 6 chili di caffè in grani.',
              'Con l’Optimum Rosso il costo è di CHF 179.40 al mese, circa 23 centesimi a tazza. Con il Domus Marrone CHF 161.40, circa 20 centesimi a tazza. Poiché l’ordine supera {free}, la spedizione è gratuita. Latte, acqua, corrente e macchina non sono inclusi.',
            ],
          },
          {
            h: 'Chicchi, capsule o filtro: cosa conviene in ufficio?',
            p: [
              'Da circa cinque persone in su, una macchina automatica con chicchi interi è di solito la soluzione migliore: ogni tazza è macinata al momento, espresso, caffè lungo e cappuccino arrivano con un tasto e il costo per tazza resta basso. Le capsule costano di regola molto di più a porzione e producono molti rifiuti. Confrontate semplicemente il vostro prezzo attuale per capsula con i numeri qui sopra.',
              'Il caffè filtro costa poco, ma piace meno a chi è abituato a espresso e cappuccino. Per team e ospiti soddisfatti, il caffè in grani nella macchina automatica resta la scelta migliore.',
            ],
          },
          {
            h: 'Un caffè d’ufficio buono e conveniente',
            p: ['Alcune semplici regole garantiscono una buona tazza senza sprechi:'],
            list: [
              'Una persona si occupa di rifornimento e pulizia',
              'Riempire il contenitore solo per pochi giorni e chiudere bene la confezione',
              'Avviare regolarmente i programmi di pulizia e decalcificazione',
              'Ordinare secondo un piano, per non restare mai senza caffè né tenere scorte vecchie',
              'Scegliere una miscela per tutti, per esempio Optimum Rosso, apprezzato al naturale e con latte',
            ],
          },
          {
            h: 'Un’offerta per la vostra azienda',
            p: [
              'Per i team più piccoli basta ordinare nel negozio. Per quantità maggiori, consegne regolari o più sedi vi prepariamo volentieri un’offerta con prezzi di quantità. Richiedetela senza impegno nella pagina [Aziende & ufficio](/firmen). Per scegliere il fornitore leggete anche [Caffè per aziende e gastronomia](/ratgeber/kaffee-fuer-firmen-gastronomie).',
            ],
          },
        ],
        faq: [
          ['Quanti espressi si fanno con un chilo di caffè in grani?', 'In teoria circa 140 con 7 grammi a tazza. Nella pratica sono realistici 120–140 espressi per chilo.'],
          ['Quanto costa un espresso in ufficio con i chicchi?', 'Con il caffè in grani Dersut circa 19–33 centesimi di caffè a tazza, secondo la miscela. Latte, corrente e macchina a parte.'],
          ['Di quanto caffè ha bisogno un ufficio di 15 persone?', 'Con due tazze e mezza a persona per giorno lavorativo, circa 6 chili di caffè in grani al mese.'],
          ['Ci sono prezzi di quantità per le aziende?', 'Sì. Per quantità maggiori e consegne regolari prepariamo un’offerta. Richiedetela nella pagina Aziende & ufficio.'],
        ],
        cta: 'Le miscele preferite per la macchina automatica in ufficio:',
      },
      en: {
        title: 'Office coffee: calculating cost per cup and monthly needs',
        metaTitle: 'Office coffee costs: calculate the price per cup',
        metaDescription:
          'What does office coffee really cost? Cost per cup, monthly needs and a worked example for 15 people: with whole beans from around 20 centimes per espresso.',
        teaser:
          'How many cups from a kilo, what an espresso costs at the office and how much coffee your team needs. With a worked example and tips.',
        lead:
          'Coffee is part of almost every office, yet few people know what a cup actually costs. The maths is simple: with whole beans and a bean-to-cup machine, an espresso often costs only around 20 to 30 centimes in coffee. Here is how to work out costs and quantities for your team, and how to keep your office coffee good.',
        sections: [
          {
            h: 'How many cups does a kilo of coffee make?',
            p: [
              'For one espresso, a bean-to-cup or portafilter machine uses around 7 grams of ground coffee. In theory, a kilo therefore makes about 140 cups. Because adjusting the grind, rinsing and larger cups use a little more coffee, it is safer to count on 120 to 140 espressos per kilo in everyday use.',
              'A lungo or café crème uses the same or slightly more coffee depending on the setting, a double espresso about twice as much. For planning, an average of about 130 cups per kilo is enough.',
            ],
          },
          {
            h: 'Cost per cup with Dersut espresso beans',
            p: ['At 120 to 140 cups per kilo and the shop prices, the coffee cost per espresso is:'],
            list: [
              '[Domus Marrone](/shop/dersut-domus-marrone-1kg), CHF 26.90 per kg: around 19 to 22 centimes',
              '[Optimum Rosso](/shop/dersut-optimum-rosso-1kg), CHF 29.90 per kg: around 21 to 25 centimes',
              '[Plus Oro](/shop/dersut-plus-oro-1kg), CHF 34.90 per kg: around 25 to 29 centimes',
              '[Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg), CHF 39.90 per kg: around 29 to 33 centimes',
            ],
          },
          {
            h: 'Worked example: a team of 15',
            p: [
              'Take an office with 15 employees who drink an average of two and a half cups a day, on 21 working days a month. That is around 790 cups a month, or about 6 kilos of coffee beans.',
              'With Optimum Rosso, that costs CHF 179.40 a month, around 23 centimes per cup. With Domus Marrone, it is CHF 161.40, around 20 centimes per cup. Because the order is above {free}, shipping is free. Milk, water, electricity and the machine itself are not included.',
            ],
          },
          {
            h: 'Beans, capsules or filter: what pays off at the office?',
            p: [
              'For teams of around five people or more, a bean-to-cup machine with whole beans is usually the best solution: every cup is freshly ground, espresso, lungo and cappuccino are ready at the touch of a button, and the cost per cup stays low. Capsules are generally much more expensive per serving and create a lot of waste. Simply compare your current price per capsule with the figures above.',
              'Filter coffee is cheap, but it is often less popular with staff used to espresso and cappuccino. For happy teams and visitors, espresso beans in a bean-to-cup machine remain the best choice.',
            ],
          },
          {
            h: 'Keeping office coffee good and affordable',
            p: ['A few simple rules make sure every cup tastes good and nothing goes to waste:'],
            list: [
              'One person is responsible for restocking and cleaning',
              'Only fill the bean hopper for a few days and close the pack tightly',
              'Run the machine’s cleaning and descaling programmes regularly',
              'Order to a schedule so you never run out and stock never gets old',
              'Choose one blend for everyone, for example Optimum Rosso, popular straight and with milk',
            ],
          },
          {
            h: 'A quote for your company',
            p: [
              'Smaller teams can simply order in the shop. For larger quantities, regular deliveries or several locations, we are happy to prepare a quote with volume prices. Ask without obligation on our [companies & office](/firmen) page. To choose the right supplier, also read [Coffee for companies and hospitality](/ratgeber/kaffee-fuer-firmen-gastronomie).',
            ],
          },
        ],
        faq: [
          ['How many espressos does a kilo of coffee beans make?', 'In theory about 140 at 7 grams per cup. In everyday use, 120 to 140 espressos per kilo are realistic.'],
          ['What does an espresso cost at the office with whole beans?', 'With Dersut espresso beans, around 19 to 33 centimes of coffee per cup depending on the blend. Milk, electricity and the machine come on top.'],
          ['How much coffee does an office of 15 people need?', 'At two and a half cups per person per working day, about 6 kilos of coffee beans a month.'],
          ['Are there volume prices for companies?', 'Yes. For larger quantities and regular deliveries we prepare a quote. Ask on our companies & office page.'],
        ],
        cta: 'Popular blends for the office bean-to-cup machine:',
      },
    },
  },
  /* ------------------------------------------------------------------ */
  /* Cappuccino und Latte macchiato                                     */
  /* ------------------------------------------------------------------ */
  {
    slug: 'cappuccino-zubereiten',
    image: 'tazze',
    products: [OPTIMUM, ORO, DOMUS],
    published: '2026-11-01',
    text: {
      de: {
        title: 'Cappuccino zubereiten wie in Italien: Milchschaum, Bohnen, Rezept',
        metaTitle: 'Cappuccino zubereiten: Rezept und Milchschaum',
        metaDescription:
          'Cappuccino und Latte macchiato wie an der Bar: das richtige Verhältnis, perfekter Milchschaum mit und ohne Dampfdüse und die besten Espressobohnen für Milch.',
        teaser:
          'Verhältnis, Milchtemperatur, feiner Schaum: so gelingt Cappuccino an der Siebträgermaschine, im Vollautomaten und ganz ohne Dampfdüse.',
        lead:
          'Ein guter Cappuccino ist mehr als Espresso mit Milch: Er lebt von einer kräftigen Basis, seidigem Milchschaum und dem richtigen Verhältnis. Mit ein paar Handgriffen gelingt er zuhause und im Büro fast wie an der italienischen Bar. Dieser Ratgeber zeigt das Rezept, die Technik für den Milchschaum und welche Espressobohnen sich mit Milch am besten verstehen.',
        sections: [
          {
            h: 'Das Grundrezept für den klassischen Cappuccino',
            p: [
              'Die Basis ist ein einfacher Espresso von rund 25 bis 30 ml. Darauf kommen heisse Milch und feiner Milchschaum, bis die Tasse mit etwa 150 bis 180 ml gefüllt ist. Als Faustregel gilt: ungefähr ein Drittel Espresso, ein Drittel Milch und ein Drittel Schaum, wobei der Schaum heute meist etwas feiner und flüssiger ist als früher.',
              'Wichtig ist eine vorgewärmte Tasse aus dickwandigem Porzellan. Sie hält die Temperatur und lässt Crema und Schaum schön zusammenfliessen.',
            ],
          },
          {
            h: 'Perfekter Milchschaum an der Dampfdüse',
            p: [
              'Verwenden Sie kalte Vollmilch direkt aus dem Kühlschrank und ein kaltes Kännchen aus Edelstahl, das etwa zu einem Drittel gefüllt ist. Lassen Sie die Dampfdüse kurz ab, tauchen Sie sie knapp unter die Oberfläche und ziehen Sie in den ersten Sekunden etwas Luft ein, bis die Milch leise zischt.',
              'Sobald sich das Volumen um etwa ein Drittel vergrössert hat, tauchen Sie die Düse etwas tiefer ein und lassen die Milch kreisen, bis sie 60 bis 65 °C erreicht. Das Kännchen wird dann gerade zu heiss, um es länger zu halten. Heisser sollte die Milch nicht werden, sonst verliert sie ihre natürliche Süsse.',
            ],
            list: [
              'Kalte Vollmilch schäumt am cremigsten, laktosefreie Milch funktioniert ebenfalls',
              'Bei Pflanzendrinks auf Barista-Varianten achten',
              'Kännchen nach dem Schäumen kurz aufklopfen und schwenken, bis die Oberfläche glänzt',
              'Dampfdüse sofort mit einem feuchten Tuch abwischen und kurz ablassen',
            ],
          },
          {
            h: 'Ohne Dampfdüse und im Vollautomaten',
            p: [
              'Auch ohne Siebträgermaschine gelingt guter Milchschaum: mit einem elektrischen Milchaufschäumer, mit einem Handschäumer oder in einer Stempelkanne (French Press), in der Sie warme Milch kräftig auf und ab pumpen. Erwärmen Sie die Milch vorher auf 60 bis 65 °C, nicht bis zum Kochen.',
              'Viele Vollautomaten haben ein automatisches Milchsystem. Damit der Cappuccino gut bleibt, sollte es täglich gespült und regelmässig gereinigt werden, denn Milchreste verändern Geschmack und Schaum schnell.',
            ],
          },
          {
            h: 'Latte macchiato, Caffè macchiato und Co.',
            p: [
              'Beim Latte macchiato kommt zuerst heisse Milch mit viel Schaum in ein hohes Glas, danach wird der Espresso langsam hineingegossen. So entstehen die typischen Schichten. Der Caffè macchiato ist das Gegenteil: ein Espresso, der nur mit einem Löffel Milchschaum «befleckt» wird.',
              'In Italien wird Cappuccino übrigens vor allem am Morgen getrunken, nach dem Essen gibt es meist einen Espresso. Zuhause dürfen Sie das natürlich halten, wie Sie möchten.',
            ],
          },
          {
            h: 'Welche Espressobohnen passen zu Milch?',
            p: [
              'Milch dämpft Aromen und Säure. Für Milchgetränke eignen sich deshalb Mischungen mit Körper, dichter Crema und Noten, die gut zu Milch passen, etwa Kakao, Gebäck oder Nuss. Der [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg) mit Kakaonoten und lang anhaltender Crema ist unsere erste Empfehlung für Cappuccino.',
              'Der mit Gold prämierte [Dersut Plus Oro](/shop/dersut-plus-oro-1kg) bringt Feingebäck und Haselnuss in die Tasse und ergibt einen besonders runden, süsslichen Cappuccino. Wer es kräftig mag und viel Milch verwendet, greift zum [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg) mit Intensität 5 von 5. Den feinen [Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg) geniessen Sie am besten pur oder als Caffè macchiato. Mehr zum Espresso selbst lesen Sie im Ratgeber [Espresso zubereiten](/ratgeber/espresso-zubereiten).',
            ],
          },
        ],
        faq: [
          ['Wie heiss sollte die Milch für Cappuccino sein?', '60 bis 65 °C. Heisser verliert die Milch ihre Süsse und der Schaum wird grob.'],
          ['Welche Milch schäumt am besten?', 'Kalte Vollmilch ergibt den cremigsten Schaum. Bei Pflanzendrinks schäumen Barista-Varianten deutlich besser.'],
          ['Was ist der Unterschied zwischen Cappuccino und Latte macchiato?', 'Cappuccino wird in der Tasse mit etwa gleich viel Espresso, Milch und Schaum zubereitet. Latte macchiato hat deutlich mehr Milch und wird im Glas in Schichten serviert.'],
          ['Welche Kaffeebohnen sind die besten für Cappuccino?', 'Mischungen mit Körper und dichter Crema, zum Beispiel Dersut Optimum Rosso oder Plus Oro. Für sehr kräftigen Cappuccino Domus Marrone.'],
        ],
        cta: 'Unsere Empfehlungen für Cappuccino und Latte macchiato:',
      },
      fr: {
        title: 'Préparer un cappuccino comme en Italie : mousse de lait, grains, recette',
        metaTitle: 'Préparer un cappuccino : recette et mousse de lait',
        metaDescription:
          'Cappuccino et latte macchiato comme au bar : les bonnes proportions, une mousse de lait parfaite avec ou sans buse vapeur et les meilleurs grains pour le lait.',
        teaser:
          'Proportions, température du lait, mousse fine : réussir le cappuccino au porte-filtre, en machine automatique et même sans buse vapeur.',
        lead:
          'Un bon cappuccino, c’est plus qu’un espresso avec du lait : il repose sur une base corsée, une mousse soyeuse et les bonnes proportions. Avec quelques gestes, il se réussit à la maison et au bureau presque comme au bar italien. Ce guide présente la recette, la technique de la mousse et les grains qui s’accordent le mieux avec le lait.',
        sections: [
          {
            h: 'La recette de base du cappuccino classique',
            p: [
              'La base est un espresso simple d’environ 25 à 30 ml. On y ajoute du lait chaud et une fine mousse de lait jusqu’à remplir la tasse d’environ 150 à 180 ml. En règle générale : environ un tiers d’espresso, un tiers de lait et un tiers de mousse, la mousse étant aujourd’hui souvent plus fine et plus fluide qu’autrefois.',
              'Utilisez une tasse préchauffée en porcelaine épaisse. Elle garde la chaleur et permet à la crème et à la mousse de bien se mêler.',
            ],
          },
          {
            h: 'Une mousse parfaite à la buse vapeur',
            p: [
              'Prenez du lait entier froid, sorti du réfrigérateur, et un pot à lait en inox froid rempli à environ un tiers. Purgez brièvement la buse, plongez-la juste sous la surface et laissez entrer un peu d’air pendant les premières secondes, jusqu’à ce que le lait chuinte doucement.',
              'Dès que le volume a augmenté d’environ un tiers, enfoncez un peu la buse et faites tourner le lait jusqu’à 60 à 65 °C. Le pot devient alors juste trop chaud pour être tenu longtemps. N’allez pas plus loin, sinon le lait perd sa douceur naturelle.',
            ],
            list: [
              'Le lait entier froid donne la mousse la plus crémeuse, le lait sans lactose fonctionne aussi',
              'Pour les boissons végétales, choisir les versions « barista »',
              'Après le moussage, tapoter le pot et le faire tourner jusqu’à ce que la surface brille',
              'Essuyer aussitôt la buse avec un linge humide et la purger',
            ],
          },
          {
            h: 'Sans buse vapeur et en machine automatique',
            p: [
              'Même sans machine à porte-filtre, on obtient une bonne mousse : avec un mousseur électrique, un mousseur à main ou une cafetière à piston (French press), en pompant vigoureusement le lait chaud. Chauffez d’abord le lait à 60–65 °C, sans le faire bouillir.',
              'Beaucoup de machines automatiques ont un système à lait intégré. Pour garder un bon cappuccino, rincez-le chaque jour et nettoyez-le régulièrement, car les résidus de lait altèrent vite le goût et la mousse.',
            ],
          },
          {
            h: 'Latte macchiato, caffè macchiato et compagnie',
            p: [
              'Pour le latte macchiato, on verse d’abord le lait chaud et beaucoup de mousse dans un grand verre, puis on ajoute lentement l’espresso. Ainsi se forment les couches typiques. Le caffè macchiato est l’inverse : un espresso simplement « taché » d’une cuillère de mousse.',
              'En Italie, le cappuccino se boit surtout le matin, après le repas on prend plutôt un espresso. Chez vous, faites bien sûr comme vous l’aimez.',
            ],
          },
          {
            h: 'Quels grains pour les boissons lactées ?',
            p: [
              'Le lait atténue les arômes et l’acidité. Pour les boissons lactées, choisissez des mélanges avec du corps, une crème dense et des notes qui s’accordent au lait, comme le cacao, la pâtisserie ou la noisette. Le [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg), aux notes de cacao et à la crème persistante, est notre première recommandation pour le cappuccino.',
              'Le [Dersut Plus Oro](/shop/dersut-plus-oro-1kg), médaillé d’or, apporte pâtisserie et noisette et donne un cappuccino particulièrement rond et doux. Si vous aimez le café corsé avec beaucoup de lait, prenez le [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg), intensité 5 sur 5. Le délicat [Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg) se savoure plutôt nature ou en caffè macchiato. Pour l’espresso lui-même, lisez notre guide [Préparer un espresso](/ratgeber/espresso-zubereiten).',
            ],
          },
        ],
        faq: [
          ['À quelle température chauffer le lait du cappuccino ?', '60 à 65 °C. Au-delà, le lait perd sa douceur et la mousse devient grossière.'],
          ['Quel lait mousse le mieux ?', 'Le lait entier froid donne la mousse la plus crémeuse. Pour les boissons végétales, les versions « barista » moussent bien mieux.'],
          ['Quelle différence entre cappuccino et latte macchiato ?', 'Le cappuccino se prépare en tasse, avec à peu près autant d’espresso, de lait et de mousse. Le latte macchiato contient bien plus de lait et se sert en couches dans un verre.'],
          ['Quels grains sont les meilleurs pour le cappuccino ?', 'Des mélanges avec du corps et une crème dense, par exemple Dersut Optimum Rosso ou Plus Oro. Pour un cappuccino très corsé, Domus Marrone.'],
        ],
        cta: 'Nos recommandations pour le cappuccino et le latte macchiato :',
      },
      it: {
        title: 'Preparare il cappuccino come al bar: schiuma di latte, chicchi, ricetta',
        metaTitle: 'Come fare il cappuccino: ricetta e schiuma di latte',
        metaDescription:
          'Cappuccino e latte macchiato come al bar: le giuste proporzioni, una schiuma perfetta con o senza lancia vapore e i migliori chicchi da abbinare al latte.',
        teaser:
          'Proporzioni, temperatura del latte, schiuma fine: il cappuccino perfetto con la macchina a portafiltro, la macchina automatica e anche senza lancia vapore.',
        lead:
          'Un buon cappuccino è più di un espresso con latte: vive di una base decisa, di una schiuma vellutata e delle giuste proporzioni. Con pochi gesti riesce a casa e in ufficio quasi come al bar. Questa guida mostra la ricetta, la tecnica per la schiuma e quali chicchi si abbinano meglio al latte.',
        sections: [
          {
            h: 'La ricetta base del cappuccino classico',
            p: [
              'La base è un espresso singolo di circa 25–30 ml. Si aggiungono latte caldo e schiuma fine fino a riempire una tazza di circa 150–180 ml. Come regola: circa un terzo di espresso, un terzo di latte e un terzo di schiuma, oggi spesso più fine e fluida di un tempo.',
              'Importante è una tazza preriscaldata in porcellana spessa: mantiene il calore e fa fondere bene crema e schiuma.',
            ],
          },
          {
            h: 'Schiuma perfetta con la lancia vapore',
            p: [
              'Usate latte intero freddo di frigorifero e un bricco in acciaio freddo, riempito per circa un terzo. Spurgate brevemente la lancia, immergetela appena sotto la superficie e nei primi secondi lasciate entrare un po’ d’aria, finché il latte sibila piano.',
              'Quando il volume è aumentato di circa un terzo, immergete un po’ di più la lancia e fate girare il latte fino a 60–65 °C. Il bricco diventa allora appena troppo caldo da tenere a lungo. Non andate oltre, altrimenti il latte perde la sua dolcezza naturale.',
            ],
            list: [
              'Il latte intero freddo dà la schiuma più cremosa, funziona anche quello senza lattosio',
              'Per le bevande vegetali scegliere le versioni «barista»',
              'Dopo la montatura battere leggermente il bricco e farlo roteare finché la superficie è lucida',
              'Pulire subito la lancia con un panno umido e spurgarla',
            ],
          },
          {
            h: 'Senza lancia vapore e con la macchina automatica',
            p: [
              'Anche senza macchina a portafiltro si ottiene una buona schiuma: con un montalatte elettrico, un frullino manuale o una caffettiera a pistone (French press), pompando con energia il latte caldo. Scaldate prima il latte a 60–65 °C, senza farlo bollire.',
              'Molte macchine automatiche hanno un sistema latte integrato. Perché il cappuccino resti buono va risciacquato ogni giorno e pulito regolarmente: i residui di latte alterano presto gusto e schiuma.',
            ],
          },
          {
            h: 'Latte macchiato, caffè macchiato e simili',
            p: [
              'Per il latte macchiato si versa prima il latte caldo con molta schiuma in un bicchiere alto, poi si aggiunge lentamente l’espresso. Così nascono i tipici strati. Il caffè macchiato è il contrario: un espresso appena «macchiato» con un cucchiaio di schiuma.',
              'In Italia il cappuccino si beve soprattutto al mattino, dopo i pasti si preferisce l’espresso. A casa, naturalmente, fate come preferite.',
            ],
          },
          {
            h: 'Quali chicchi per le bevande con latte?',
            p: [
              'Il latte attenua aromi e acidità. Per le bevande con latte servono miscele con corpo, crema densa e note che si sposano con il latte, come cacao, pasticceria o nocciola. Il [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg), con note di cacao e crema persistente, è la nostra prima scelta per il cappuccino.',
              'Il [Dersut Plus Oro](/shop/dersut-plus-oro-1kg), medaglia d’oro, porta in tazza pasticceria e nocciola e dà un cappuccino particolarmente rotondo e dolce. Chi lo ama deciso e con molto latte sceglie il [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg), intensità 5 su 5. Il raffinato [Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg) si gusta meglio al naturale o come caffè macchiato. Sull’espresso leggete la guida [Preparare l’espresso](/ratgeber/espresso-zubereiten).',
            ],
          },
        ],
        faq: [
          ['A che temperatura va scaldato il latte per il cappuccino?', '60–65 °C. Oltre, il latte perde dolcezza e la schiuma diventa grossolana.'],
          ['Quale latte monta meglio?', 'Il latte intero freddo dà la schiuma più cremosa. Tra le bevande vegetali, le versioni «barista» montano molto meglio.'],
          ['Che differenza c’è tra cappuccino e latte macchiato?', 'Il cappuccino si prepara in tazza con circa la stessa quantità di espresso, latte e schiuma. Il latte macchiato ha molto più latte e si serve a strati nel bicchiere.'],
          ['Quali sono i chicchi migliori per il cappuccino?', 'Miscele con corpo e crema densa, per esempio Dersut Optimum Rosso o Plus Oro. Per un cappuccino molto deciso, Domus Marrone.'],
        ],
        cta: 'I nostri consigli per cappuccino e latte macchiato:',
      },
      en: {
        title: 'How to make cappuccino like in Italy: milk foam, beans, recipe',
        metaTitle: 'How to make cappuccino: recipe and milk foam',
        metaDescription:
          'Cappuccino and latte macchiato like at the bar: the right ratio, perfect milk foam with or without a steam wand, and the best espresso beans to pair with milk.',
        teaser:
          'Ratio, milk temperature, fine foam: how to make cappuccino with a portafilter machine, a bean-to-cup machine or without any steam wand.',
        lead:
          'A good cappuccino is more than espresso with milk: it relies on a strong base, silky milk foam and the right ratio. With a few simple steps, you can make it at home or at the office almost as well as an Italian bar. This guide covers the recipe, the milk-foam technique and which espresso beans work best with milk.',
        sections: [
          {
            h: 'The basic recipe for a classic cappuccino',
            p: [
              'The base is a single espresso of around 25 to 30 ml. Hot milk and fine milk foam are added until a cup of about 150 to 180 ml is full. As a rule of thumb: roughly one third espresso, one third milk and one third foam, with today’s foam usually finer and more liquid than it used to be.',
              'Use a pre-warmed, thick-walled porcelain cup. It holds the temperature and lets crema and foam blend beautifully.',
            ],
          },
          {
            h: 'Perfect milk foam with a steam wand',
            p: [
              'Use cold whole milk straight from the fridge and a cold stainless-steel jug filled about one third. Purge the steam wand briefly, place the tip just below the surface and let in a little air during the first few seconds, until the milk hisses softly.',
              'Once the volume has grown by about a third, lower the wand slightly and let the milk spin until it reaches 60 to 65 °C. At that point the jug becomes just too hot to hold for long. Do not go hotter, or the milk loses its natural sweetness.',
            ],
            list: [
              'Cold whole milk gives the creamiest foam; lactose-free milk works too',
              'For plant-based drinks, choose “barista” versions',
              'After steaming, tap the jug and swirl it until the surface is glossy',
              'Wipe the steam wand with a damp cloth straight away and purge it',
            ],
          },
          {
            h: 'Without a steam wand and with a bean-to-cup machine',
            p: [
              'You can make good foam without a portafilter machine too: with an electric milk frother, a handheld frother or a French press, pumping the warm milk vigorously up and down. Heat the milk to 60 to 65 °C first, without boiling it.',
              'Many bean-to-cup machines have an automatic milk system. To keep your cappuccino good, rinse it daily and clean it regularly, because milk residue quickly changes taste and foam.',
            ],
          },
          {
            h: 'Latte macchiato, caffè macchiato and more',
            p: [
              'For a latte macchiato, hot milk with plenty of foam goes into a tall glass first, then the espresso is poured in slowly. This creates the typical layers. A caffè macchiato is the opposite: an espresso just “stained” with a spoonful of milk foam.',
              'In Italy, cappuccino is mostly a morning drink; after meals people usually have an espresso. At home, of course, you can enjoy it whenever you like.',
            ],
          },
          {
            h: 'Which espresso beans go best with milk?',
            p: [
              'Milk softens aromas and acidity. For milk drinks, choose blends with body, dense crema and notes that pair well with milk, such as cocoa, pastry or nuts. [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg), with cocoa notes and long-lasting crema, is our first recommendation for cappuccino.',
              'The gold-medal [Dersut Plus Oro](/shop/dersut-plus-oro-1kg) brings pastry and hazelnut to the cup and makes a particularly round, sweet cappuccino. If you like it strong with plenty of milk, choose [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg) with intensity 5 of 5. The delicate [Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg) is best enjoyed straight or as a caffè macchiato. For the espresso itself, read our guide [How to make espresso](/ratgeber/espresso-zubereiten).',
            ],
          },
        ],
        faq: [
          ['How hot should the milk be for cappuccino?', '60 to 65 °C. Any hotter and the milk loses its sweetness and the foam becomes coarse.'],
          ['Which milk foams best?', 'Cold whole milk gives the creamiest foam. Among plant-based drinks, “barista” versions foam much better.'],
          ['What is the difference between cappuccino and latte macchiato?', 'A cappuccino is made in a cup with roughly equal parts espresso, milk and foam. A latte macchiato has much more milk and is served in layers in a glass.'],
          ['Which coffee beans are best for cappuccino?', 'Blends with body and dense crema, for example Dersut Optimum Rosso or Plus Oro. For a very strong cappuccino, Domus Marrone.'],
        ],
        cta: 'Our recommendations for cappuccino and latte macchiato:',
      },
    },
  },
  /* ------------------------------------------------------------------ */
  /* Arabica und Robusta                                                */
  /* ------------------------------------------------------------------ */
  {
    slug: 'arabica-robusta-unterschied',
    image: 'fiori',
    products: [NPU, ORO, OPTIMUM, DOMUS],
    published: '2026-11-01',
    text: {
      de: {
        title: 'Arabica oder Robusta? Die Unterschiede einfach erklärt',
        metaTitle: 'Arabica oder Robusta: Unterschiede einfach erklärt',
        metaDescription:
          'Arabica oder Robusta: Geschmack, Koffein, Crema und Anbau im Vergleich. Warum italienische Espressomischungen beide kombinieren und was zu Ihnen passt.',
        teaser:
          'Säure, Körper, Koffein und Crema: was Arabica und Robusta unterscheidet und warum italienischer Espresso oft beide Sorten verbindet.',
        lead:
          'Auf fast jeder Kaffeepackung steht es: Arabica, Robusta oder eine Mischung aus beiden. Doch was bedeutet das für den Geschmack in Ihrer Tasse? Ist 100 % Arabica automatisch besser? Dieser Ratgeber erklärt die beiden wichtigsten Kaffeearten verständlich und zeigt, warum die besten italienischen Espressomischungen oft gerade die Kombination suchen.',
        sections: [
          {
            h: 'Zwei Kaffeearten, zwei Charaktere',
            p: [
              'Fast der ganze Kaffee der Welt stammt von zwei Pflanzenarten: Coffea arabica, kurz Arabica, und Coffea canephora, im Handel meist Robusta genannt. Arabica wächst bevorzugt in höheren, kühleren Lagen und ist empfindlicher gegenüber Wetter und Schädlingen. Robusta gedeiht in tieferen, wärmeren Regionen und ist, wie der Name sagt, deutlich widerstandsfähiger.',
              'Auch die Bohnen sehen unterschiedlich aus: Arabica-Bohnen sind eher länglich-oval mit geschwungener Kerbe, Robusta-Bohnen kleiner und runder mit gerader Kerbe.',
            ],
          },
          {
            h: 'Geschmack: Aroma und Säure gegen Körper und Kraft',
            p: [
              'Arabica steht für Vielfalt im Aroma: florale, fruchtige und süssliche Noten, eine feine, lebendige Säure und eher weniger Bitterkeit. Robusta bringt Körper, Kraft und eine angenehme Herbe, oft mit Noten von Kakao, Getreide oder dunkler Schokolade, und kaum Säure.',
            ],
            list: [
              'Arabica: aromatisch, fein, mehr Säure, weniger Bitterkeit',
              'Robusta: kräftig, vollmundig, wenig Säure, mehr Herbe',
              'Robusta enthält ungefähr doppelt so viel Koffein wie Arabica',
              'Robusta sorgt im Espresso für eine dichtere, stabilere Crema',
            ],
          },
          {
            h: 'Warum italienischer Espresso oft beide verbindet',
            p: [
              'In Italien hat die Espressomischung, die «miscela», eine lange Tradition. Die Röster kombinieren Arabica für Aroma und Süsse mit einem Anteil Robusta für Körper, Crema und Kraft. So entsteht ein Espresso, der pur intensiv schmeckt und sich auch mit Milch durchsetzt.',
              '100 % Arabica ist deshalb nicht automatisch «besser», sondern einfach anders: feiner, fruchtiger, mit mehr Säure. Welche Richtung Ihnen gefällt, ist Geschmackssache. Entscheidend sind die Qualität der Rohkaffees, eine sorgfältige Röstung und eine gut abgestimmte Mischung.',
            ],
          },
          {
            h: 'Gewaschen oder naturbelassen: die Aufbereitung zählt mit',
            p: [
              'Neben der Kaffeeart prägt auch die Aufbereitung nach der Ernte den Geschmack. Bei gewaschenen Kaffees wird das Fruchtfleisch vor dem Trocknen entfernt, sie schmecken meist klarer und mit hellerer Säure. Naturbelassene Kaffees trocknen in der ganzen Kirsche und wirken oft fruchtiger und vollmundiger.',
              'Dersut verwendet für seine Mischungen sowohl gewaschene als auch naturbelassene Sorten und kombiniert so Klarheit und Fülle.',
            ],
          },
          {
            h: 'Welche Dersut-Mischung passt zu Ihnen?',
            p: [
              'Wenn Sie Arabica pur erleben möchten, ist der [Dersut Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg) die richtige Wahl: 100 % Arabica vor allem aus Mittelamerika und vom Horn von Afrika, floral, mit Zitrusfrische und Kakao im Abgang, ausgezeichnet mit der Gold Medal 2025.',
              'Für die klassische italienische Balance aus Arabica und Robusta stehen der goldprämierte [Dersut Plus Oro](/shop/dersut-plus-oro-1kg) und der vielseitige [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg). Wer viel Körper und Kraft sucht, wählt den [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg) aus Robusta und Arabica, die kräftigste Mischung. Alle vier im direkten Vergleich finden Sie im Ratgeber [Alle vier Sorten im Vergleich](/ratgeber/dersut-sorten-vergleich).',
            ],
          },
        ],
        faq: [
          ['Ist Arabica besser als Robusta?', 'Nicht automatisch. Arabica ist aromatischer und feiner, Robusta bringt Körper, Crema und Kraft. Viele der besten italienischen Espressi sind Mischungen aus beiden.'],
          ['Welche Kaffeeart hat mehr Koffein?', 'Robusta enthält ungefähr doppelt so viel Koffein wie Arabica.'],
          ['Warum hat Espresso mit Robusta mehr Crema?', 'Robusta-Bohnen ergeben eine dichtere und stabilere Crema. Deshalb enthalten viele italienische Espressomischungen einen Anteil Robusta.'],
          ['Welche Dersut-Mischung ist 100 % Arabica?', 'Der Non Plus Ultra. Plus Oro und Optimum Rosso verbinden Arabica und Robusta, Domus Marrone ist die kräftigste Mischung aus Robusta und Arabica.'],
        ],
        cta: 'Von 100 % Arabica bis kräftig mit Robusta, alle als ganze Bohnen:',
      },
      fr: {
        title: 'Arabica ou Robusta ? Les différences expliquées simplement',
        metaTitle: 'Arabica ou Robusta : les différences expliquées',
        metaDescription:
          'Arabica ou Robusta : goût, caféine, crème et culture comparés. Pourquoi les mélanges espresso italiens associent souvent les deux et lequel vous correspond.',
        teaser:
          'Acidité, corps, caféine et crème : ce qui distingue l’Arabica du Robusta et pourquoi l’espresso italien marie souvent les deux.',
        lead:
          'C’est écrit sur presque chaque paquet de café : Arabica, Robusta ou un mélange des deux. Mais qu’est-ce que cela change dans votre tasse ? Le 100 % Arabica est-il forcément meilleur ? Ce guide explique simplement les deux principales espèces de café et pourquoi les meilleurs mélanges espresso italiens recherchent justement leur association.',
        sections: [
          {
            h: 'Deux espèces, deux caractères',
            p: [
              'Presque tout le café du monde provient de deux espèces : Coffea arabica, ou Arabica, et Coffea canephora, appelé Robusta dans le commerce. L’Arabica pousse de préférence en altitude, dans des zones plus fraîches, et il est plus sensible aux aléas climatiques et aux parasites. Le Robusta prospère dans des régions plus basses et plus chaudes et, comme son nom l’indique, il est bien plus résistant.',
              'Les grains se distinguent aussi à l’œil : l’Arabica est plutôt allongé et ovale avec un sillon sinueux, le Robusta plus petit et rond avec un sillon droit.',
            ],
          },
          {
            h: 'Le goût : arôme et acidité contre corps et puissance',
            p: [
              'L’Arabica est synonyme de richesse aromatique : notes florales, fruitées et douces, acidité fine et vive, peu d’amertume. Le Robusta apporte corps, puissance et une agréable amertume, souvent avec des notes de cacao, de céréales ou de chocolat noir, et presque pas d’acidité.',
            ],
            list: [
              'Arabica : aromatique, fin, plus d’acidité, moins d’amertume',
              'Robusta : puissant, généreux, peu d’acidité, plus d’amertume',
              'Le Robusta contient environ deux fois plus de caféine que l’Arabica',
              'Le Robusta donne à l’espresso une crème plus dense et plus stable',
            ],
          },
          {
            h: 'Pourquoi l’espresso italien associe souvent les deux',
            p: [
              'En Italie, le mélange espresso, la « miscela », a une longue tradition. Les torréfacteurs associent l’Arabica pour l’arôme et la douceur à une part de Robusta pour le corps, la crème et la puissance. Il en résulte un espresso intense nature, qui s’affirme aussi avec du lait.',
              'Le 100 % Arabica n’est donc pas forcément « meilleur », simplement différent : plus fin, plus fruité, plus acidulé. La direction qui vous plaît est une question de goût. Ce qui compte, c’est la qualité des cafés verts, une torréfaction soignée et un mélange bien équilibré.',
            ],
          },
          {
            h: 'Lavé ou nature : le traitement compte aussi',
            p: [
              'Outre l’espèce, le traitement après la récolte influence le goût. Pour les cafés lavés, la pulpe est retirée avant le séchage : ils sont souvent plus nets, avec une acidité plus claire. Les cafés nature sèchent dans la cerise entière et paraissent souvent plus fruités et plus ronds.',
              'Dersut utilise pour ses mélanges des cafés lavés et des cafés nature, et réunit ainsi netteté et rondeur.',
            ],
          },
          {
            h: 'Quel mélange Dersut vous correspond ?',
            p: [
              'Pour découvrir l’Arabica pur, choisissez le [Dersut Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg) : 100 % Arabica, principalement d’Amérique centrale et de la Corne de l’Afrique, floral, frais d’agrumes, finale cacaotée, Gold Medal 2025.',
              'Pour l’équilibre italien classique entre Arabica et Robusta, il y a le [Dersut Plus Oro](/shop/dersut-plus-oro-1kg), médaillé d’or, et le polyvalent [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg). Si vous cherchez du corps et de la puissance, prenez le [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg), Robusta et Arabica, le plus corsé. Les quatre comparés : [Les quatre mélanges comparés](/ratgeber/dersut-sorten-vergleich).',
            ],
          },
        ],
        faq: [
          ['L’Arabica est-il meilleur que le Robusta ?', 'Pas forcément. L’Arabica est plus aromatique et plus fin, le Robusta apporte corps, crème et puissance. Beaucoup des meilleurs espressos italiens sont des mélanges des deux.'],
          ['Quelle espèce contient le plus de caféine ?', 'Le Robusta contient environ deux fois plus de caféine que l’Arabica.'],
          ['Pourquoi un espresso avec du Robusta a-t-il plus de crème ?', 'Le Robusta donne une crème plus dense et plus stable. C’est pourquoi de nombreux mélanges espresso italiens en contiennent une part.'],
          ['Quel mélange Dersut est 100 % Arabica ?', 'Le Non Plus Ultra. Plus Oro et Optimum Rosso associent Arabica et Robusta, Domus Marrone est le mélange Robusta et Arabica le plus corsé.'],
        ],
        cta: 'Du 100 % Arabica au corsé avec Robusta, tous en grains entiers :',
      },
      it: {
        title: 'Arabica o Robusta? Le differenze spiegate in modo semplice',
        metaTitle: 'Arabica o Robusta: le differenze spiegate',
        metaDescription:
          'Arabica o Robusta: gusto, caffeina, crema e coltivazione a confronto. Perché le miscele espresso italiane uniscono spesso le due specie e quale fa per voi.',
        teaser:
          'Acidità, corpo, caffeina e crema: cosa distingue Arabica e Robusta e perché l’espresso italiano spesso le unisce.',
        lead:
          'È scritto su quasi ogni confezione di caffè: Arabica, Robusta o una miscela delle due. Ma cosa significa per il gusto nella tazza? Il 100 % Arabica è sempre migliore? Questa guida spiega in modo semplice le due principali specie di caffè e perché le migliori miscele italiane cercano proprio la loro combinazione.',
        sections: [
          {
            h: 'Due specie, due caratteri',
            p: [
              'Quasi tutto il caffè del mondo proviene da due specie: Coffea arabica, l’Arabica, e Coffea canephora, in commercio chiamata Robusta. L’Arabica cresce di preferenza ad altitudini più elevate e fresche ed è più sensibile al clima e ai parassiti. La Robusta prospera in zone più basse e calde ed è, come dice il nome, molto più resistente.',
              'Anche i chicchi sono diversi: quelli di Arabica sono più allungati e ovali con un solco sinuoso, quelli di Robusta più piccoli e tondi con un solco dritto.',
            ],
          },
          {
            h: 'Il gusto: aroma e acidità contro corpo e forza',
            p: [
              'L’Arabica significa ricchezza aromatica: note floreali, fruttate e dolci, un’acidità fine e vivace e meno amarezza. La Robusta porta corpo, forza e un piacevole amaro, spesso con note di cacao, cereali o cioccolato fondente, e quasi nessuna acidità.',
            ],
            list: [
              'Arabica: aromatica, fine, più acidità, meno amarezza',
              'Robusta: forte, corposa, poca acidità, più amaro',
              'La Robusta contiene circa il doppio di caffeina dell’Arabica',
              'La Robusta dà all’espresso una crema più densa e stabile',
            ],
          },
          {
            h: 'Perché l’espresso italiano spesso le unisce',
            p: [
              'In Italia la miscela per espresso ha una lunga tradizione. I torrefattori uniscono l’Arabica per aroma e dolcezza a una quota di Robusta per corpo, crema e forza. Ne nasce un espresso intenso al naturale, che si fa sentire anche con il latte.',
              'Il 100 % Arabica non è quindi automaticamente «migliore», ma semplicemente diverso: più fine, più fruttato, più acidulo. Quale direzione preferite è questione di gusto. Contano la qualità dei caffè verdi, una tostatura accurata e una miscela ben equilibrata.',
            ],
          },
          {
            h: 'Lavato o naturale: conta anche la lavorazione',
            p: [
              'Oltre alla specie, anche la lavorazione dopo la raccolta influisce sul gusto. Nei caffè lavati la polpa viene tolta prima dell’essiccazione: sono spesso più puliti, con un’acidità più chiara. I caffè naturali essiccano nella ciliegia intera e risultano spesso più fruttati e corposi.',
              'Dersut usa per le sue miscele sia caffè lavati sia naturali, unendo così pulizia e pienezza.',
            ],
          },
          {
            h: 'Quale miscela Dersut fa per voi?',
            p: [
              'Per gustare l’Arabica in purezza scegliete il [Dersut Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg): 100 % Arabica soprattutto dal Centro America e dal Corno d’Africa, floreale, con freschezza agrumata e cacao nel finale, Gold Medal 2025.',
              'Per il classico equilibrio italiano tra Arabica e Robusta ci sono il [Dersut Plus Oro](/shop/dersut-plus-oro-1kg), medaglia d’oro, e il versatile [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg). Chi cerca corpo e forza sceglie il [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg), Robusta e Arabica, il più deciso. Tutte e quattro a confronto: [Le quattro miscele a confronto](/ratgeber/dersut-sorten-vergleich).',
            ],
          },
        ],
        faq: [
          ['L’Arabica è migliore della Robusta?', 'Non per forza. L’Arabica è più aromatica e fine, la Robusta porta corpo, crema e forza. Molti dei migliori espressi italiani sono miscele di entrambe.'],
          ['Quale specie ha più caffeina?', 'La Robusta contiene circa il doppio di caffeina dell’Arabica.'],
          ['Perché l’espresso con Robusta ha più crema?', 'La Robusta dà una crema più densa e stabile. Per questo molte miscele espresso italiane ne contengono una quota.'],
          ['Quale miscela Dersut è 100 % Arabica?', 'Il Non Plus Ultra. Plus Oro e Optimum Rosso uniscono Arabica e Robusta, Domus Marrone è la miscela di Robusta e Arabica più decisa.'],
        ],
        cta: 'Dal 100 % Arabica al deciso con Robusta, tutti in grani interi:',
      },
      en: {
        title: 'Arabica or Robusta? The differences explained simply',
        metaTitle: 'Arabica vs Robusta: the differences explained',
        metaDescription:
          'Arabica or Robusta: taste, caffeine, crema and growing compared. Why Italian espresso blends often combine both species, and which style suits you best.',
        teaser:
          'Acidity, body, caffeine and crema: what sets Arabica and Robusta apart, and why Italian espresso often combines the two.',
        lead:
          'It is printed on almost every coffee pack: Arabica, Robusta or a blend of both. But what does it mean for the taste in your cup? Is 100 % Arabica automatically better? This guide explains the two main coffee species in plain terms and shows why the best Italian espresso blends often seek out exactly that combination.',
        sections: [
          {
            h: 'Two species, two characters',
            p: [
              'Almost all the world’s coffee comes from two plant species: Coffea arabica, or Arabica, and Coffea canephora, usually sold as Robusta. Arabica prefers higher, cooler altitudes and is more sensitive to weather and pests. Robusta thrives in lower, warmer regions and, as the name suggests, is much hardier.',
              'The beans look different too: Arabica beans are more elongated and oval with a curved crease, Robusta beans smaller and rounder with a straight crease.',
            ],
          },
          {
            h: 'Taste: aroma and acidity versus body and strength',
            p: [
              'Arabica stands for aromatic variety: floral, fruity and sweet notes, a fine, lively acidity and less bitterness. Robusta brings body, strength and a pleasant bitterness, often with notes of cocoa, grain or dark chocolate, and hardly any acidity.',
            ],
            list: [
              'Arabica: aromatic, refined, more acidity, less bitterness',
              'Robusta: strong, full-bodied, low acidity, more bitterness',
              'Robusta contains roughly twice as much caffeine as Arabica',
              'Robusta gives espresso a denser, more stable crema',
            ],
          },
          {
            h: 'Why Italian espresso often combines both',
            p: [
              'In Italy, the espresso blend, the “miscela”, has a long tradition. Roasters combine Arabica for aroma and sweetness with a share of Robusta for body, crema and strength. The result is an espresso that tastes intense on its own and still stands out with milk.',
              'So 100 % Arabica is not automatically “better”, just different: finer, fruitier, with more acidity. Which direction you prefer is a matter of taste. What really counts is the quality of the green coffee, careful roasting and a well-balanced blend.',
            ],
          },
          {
            h: 'Washed or natural: processing matters too',
            p: [
              'Besides the species, processing after harvest also shapes the flavour. For washed coffees the fruit is removed before drying; they usually taste cleaner with brighter acidity. Natural coffees dry inside the whole cherry and often taste fruitier and fuller.',
              'Dersut uses both washed and natural coffees in its blends, combining clarity and fullness.',
            ],
          },
          {
            h: 'Which Dersut blend suits you?',
            p: [
              'If you want to experience pure Arabica, [Dersut Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg) is the right choice: 100 % Arabica, mainly from Central America and the Horn of Africa, floral, with citrus freshness and cocoa on the finish, Gold Medal 2025.',
              'For the classic Italian balance of Arabica and Robusta there is the gold-medal [Dersut Plus Oro](/shop/dersut-plus-oro-1kg) and the versatile [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg). If you want plenty of body and strength, choose [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg), Robusta and Arabica, the boldest blend. All four side by side: [All four blends compared](/ratgeber/dersut-sorten-vergleich).',
            ],
          },
        ],
        faq: [
          ['Is Arabica better than Robusta?', 'Not automatically. Arabica is more aromatic and refined, Robusta brings body, crema and strength. Many of the best Italian espressos are blends of both.'],
          ['Which species has more caffeine?', 'Robusta contains roughly twice as much caffeine as Arabica.'],
          ['Why does espresso with Robusta have more crema?', 'Robusta gives a denser, more stable crema. That is why many Italian espresso blends contain a share of it.'],
          ['Which Dersut blend is 100 % Arabica?', 'Non Plus Ultra. Plus Oro and Optimum Rosso combine Arabica and Robusta, while Domus Marrone is the boldest Robusta and Arabica blend.'],
        ],
        cta: 'From 100 % Arabica to bold with Robusta, all as whole beans:',
      },
    },
  },
  /* ------------------------------------------------------------------ */
  /* Kaffee als Geschenk                                                */
  /* ------------------------------------------------------------------ */
  {
    slug: 'kaffee-geschenk',
    image: 'img_3',
    products: [NPU, ORO, OPTIMUM, DOMUS],
    published: '2026-11-01',
    text: {
      de: {
        title: 'Kaffee schenken: Geschenkideen für Kaffeeliebhaber, Team und Kunden',
        metaTitle: 'Kaffee als Geschenk: Ideen für Geniesser und Firmen',
        metaDescription:
          'Kaffee schenken, der wirklich Freude macht: prämierte italienische Espressobohnen als Geschenk für Geniesser, Mitarbeitende und Kunden, mit Ideen und Tipps.',
        teaser:
          'Prämierter Espresso als Geschenk: welche Sorte zu wem passt, Ideen für Sets und Tipps für Mitarbeiter- und Kundengeschenke.',
        lead:
          'Ein gutes Geschenk wird benutzt und erinnert an den Menschen, der es gemacht hat. Kaffee erfüllt beides: Er wird jeden Tag genossen und erinnert mit jeder Tasse an Sie. Mit original italienischem Espresso, sogar mit Goldmedaille, liegen Sie bei Geniessern, im Team und bei Kunden richtig. Hier finden Sie Ideen, welche Sorte zu wem passt und wie Sie Kaffee als Firmengeschenk einsetzen.',
        sections: [
          {
            h: 'Warum Kaffee ein gutes Geschenk ist',
            p: [
              'Kaffee ist ein Geschenk, das kaum jemand ablehnt und das nicht im Schrank verstaubt. Besonders schön wird es, wenn die Geschichte dahinter stimmt: Dersut röstet seit 1947 in Conegliano bei Venedig, und zwei Mischungen wurden 2025 beim International Coffee Tasting mit der Gold Medal ausgezeichnet. Das ist mehr als irgendein Kaffee aus dem Regal.',
              'Ganze Bohnen in der 1-kg-Packung reichen für viele Wochen Genuss und passen zu Vollautomat, Siebträger und Moka-Kanne. So muss die beschenkte Person nichts Neues anschaffen.',
            ],
          },
          {
            h: 'Welche Sorte passt zu wem?',
            p: ['Wählen Sie die Mischung nach den Vorlieben der beschenkten Person:'],
            list: [
              'Für Feinschmecker, die Espresso pur trinken: [Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg), 100 % Arabica mit Gold Medal 2025',
              'Für alle, die es rund und süss mögen, pur oder mit Milch: [Plus Oro](/shop/dersut-plus-oro-1kg), ebenfalls Gold Medal 2025',
              'Für Cappuccino-Fans und den Vollautomaten: [Optimum Rosso](/shop/dersut-optimum-rosso-1kg) mit Kakaonoten und dichter Crema',
              'Für Liebhaber von kräftigem Espresso: [Domus Marrone](/shop/dersut-domus-marrone-1kg) mit Intensität 5 von 5',
            ],
          },
          {
            h: 'Ideen für Sets',
            p: [
              'Ein Duo macht ein Geschenk besonders: Das «Gold-Duo» aus Non Plus Ultra und Plus Oro vereint die beiden prämierten Mischungen für zusammen CHF 74.80. Wer neugierig ist, freut sich über ein Entdecker-Set mit allen vier Sorten für CHF 131.60, versandkostenfrei ab {free}.',
              'Legen Sie eine kleine Karte mit einem Tipp zur Zubereitung bei, zum Beispiel aus unserem Ratgeber [Espresso zubereiten](/ratgeber/espresso-zubereiten) oder [Cappuccino zubereiten](/ratgeber/cappuccino-zubereiten). So wird aus Kaffee ein persönliches Geschenk.',
            ],
          },
          {
            h: 'Kaffee als Geschenk für Mitarbeitende und Kunden',
            p: [
              'Zum Jahresende, zum Firmenjubiläum oder als Dank für eine gute Zusammenarbeit: Kaffee ist ein Firmengeschenk, das täglich genutzt wird und zu fast allen passt. Prämierte italienische Espressobohnen zeigen Wertschätzung, ohne aufdringlich zu wirken.',
              'Für einzelne Geschenke bestellen Sie direkt im Shop. Für grössere Mengen für Team oder Kunden erstellen wir Ihnen gerne ein Angebot mit Mengenpreisen. Fragen Sie auf der Seite [Firmen & Büro](/firmen) an und planen Sie vor den Feiertagen etwas Vorlauf ein.',
            ],
          },
          {
            h: 'Damit das Geschenk frisch ankommt',
            p: [
              'Kaffeebohnen sind in der verschlossenen Originalpackung lange haltbar. Bewahren Sie die Packungen bis zur Übergabe kühl, trocken und dunkel auf, nicht neben Gewürzen oder anderen stark riechenden Lebensmitteln. Ist die Packung geöffnet, sollte sie innert weniger Wochen verbraucht werden.',
              'Wir versenden in der ganzen Schweiz mit der Post, ab {free} gratis, sonst für {ship}.',
            ],
          },
        ],
        faq: [
          ['Welcher Kaffee eignet sich als Geschenk?', 'Hochwertige ganze Bohnen mit einer Geschichte, zum Beispiel die mit Gold prämierten Dersut Non Plus Ultra und Plus Oro aus Conegliano.'],
          ['Passen Kaffeebohnen zu jeder Maschine?', 'Ganze Bohnen passen zu Vollautomat, Siebträger und Moka-Kanne. Wer nur eine Kapselmaschine besitzt, braucht zusätzlich eine Mühle.'],
          ['Gibt es Mengenpreise für Firmengeschenke?', 'Ja. Für grössere Mengen erstellen wir ein Angebot. Fragen Sie auf der Seite Firmen & Büro an.'],
          ['Wie lange sind Kaffeebohnen haltbar?', 'In der verschlossenen Originalpackung lange. Nach dem Öffnen am besten innert weniger Wochen verbrauchen.'],
        ],
        cta: 'Prämierter Espresso zum Verschenken:',
      },
      fr: {
        title: 'Offrir du café : idées cadeaux pour amateurs, équipes et clients',
        metaTitle: 'Offrir du café : idées cadeaux et cadeaux d’affaires',
        metaDescription:
          'Un café qui fait vraiment plaisir : des grains d’espresso italiens primés à offrir aux amateurs, aux collaborateurs et aux clients, avec idées et conseils.',
        teaser:
          'Un espresso primé à offrir : quel mélange pour qui, des idées de coffrets et des conseils pour les cadeaux d’entreprise.',
        lead:
          'Un bon cadeau sert et rappelle la personne qui l’a offert. Le café coche les deux cases : on le savoure chaque jour, et chaque tasse rappelle votre attention. Avec un authentique espresso italien, médaillé d’or qui plus est, vous visez juste auprès des amateurs, de votre équipe et de vos clients. Voici quel mélange choisir pour qui et comment faire du café un cadeau d’entreprise.',
        sections: [
          {
            h: 'Pourquoi le café est un bon cadeau',
            p: [
              'Le café est un cadeau que presque personne ne refuse et qui ne prend pas la poussière. Il devient encore plus beau quand l’histoire suit : Dersut torréfie depuis 1947 à Conegliano, près de Venise, et deux de ses mélanges ont reçu la Gold Medal à l’International Coffee Tasting 2025. Bien plus qu’un café de supermarché.',
              'Les grains entiers en paquet de 1 kg offrent des semaines de plaisir et conviennent aux machines automatiques, au porte-filtre et à la moka. La personne n’a donc rien à acheter en plus.',
            ],
          },
          {
            h: 'Quel mélange pour qui ?',
            p: ['Choisissez le mélange selon les goûts de la personne :'],
            list: [
              'Pour les fins gourmets qui boivent l’espresso nature : [Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg), 100 % Arabica, Gold Medal 2025',
              'Pour ceux qui l’aiment rond et doux, nature ou avec du lait : [Plus Oro](/shop/dersut-plus-oro-1kg), lui aussi Gold Medal 2025',
              'Pour les amateurs de cappuccino et de machine automatique : [Optimum Rosso](/shop/dersut-optimum-rosso-1kg), notes de cacao et crème dense',
              'Pour les amateurs d’espresso corsé : [Domus Marrone](/shop/dersut-domus-marrone-1kg), intensité 5 sur 5',
            ],
          },
          {
            h: 'Idées de coffrets',
            p: [
              'Un duo rend le cadeau spécial : le « duo d’or » Non Plus Ultra et Plus Oro réunit les deux mélanges primés pour CHF 74.80. Les curieux apprécieront un coffret découverte avec les quatre mélanges pour CHF 131.60, livraison offerte dès {free}.',
              'Ajoutez une petite carte avec un conseil de préparation, par exemple tiré de nos guides [Préparer un espresso](/ratgeber/espresso-zubereiten) ou [Préparer un cappuccino](/ratgeber/cappuccino-zubereiten). Le café devient alors un cadeau personnel.',
            ],
          },
          {
            h: 'Le café, cadeau pour collaborateurs et clients',
            p: [
              'En fin d’année, pour un anniversaire d’entreprise ou pour remercier d’une bonne collaboration : le café est un cadeau d’entreprise utilisé au quotidien et qui convient à presque tout le monde. Des grains d’espresso italiens primés témoignent de votre estime sans être ostentatoires.',
              'Pour quelques cadeaux, commandez directement dans la boutique. Pour de plus grandes quantités destinées à votre équipe ou à vos clients, nous vous établissons volontiers une offre avec prix de quantité. Demandez-la sur la page [Entreprises & bureau](/firmen) et prévoyez un peu d’avance avant les fêtes.',
            ],
          },
          {
            h: 'Pour que le cadeau arrive frais',
            p: [
              'Les grains de café se conservent longtemps dans leur paquet d’origine fermé. Jusqu’à la remise, gardez les paquets au frais, au sec et à l’abri de la lumière, loin des épices et des aliments odorants. Une fois ouvert, le paquet se consomme de préférence en quelques semaines.',
              'Nous livrons dans toute la Suisse par la poste, gratuitement dès {free}, sinon pour {ship}.',
            ],
          },
        ],
        faq: [
          ['Quel café offrir ?', 'Des grains entiers de qualité avec une histoire, par exemple les Dersut Non Plus Ultra et Plus Oro de Conegliano, médaillés d’or.'],
          ['Des grains conviennent-ils à toutes les machines ?', 'Les grains entiers conviennent aux machines automatiques, au porte-filtre et à la moka. Avec une machine à capsules, il faut en plus un moulin.'],
          ['Y a-t-il des prix de quantité pour les cadeaux d’entreprise ?', 'Oui. Pour de grandes quantités, nous établissons une offre. Demandez-la sur la page Entreprises & bureau.'],
          ['Combien de temps se conservent les grains de café ?', 'Longtemps dans le paquet d’origine fermé. Une fois ouvert, de préférence en quelques semaines.'],
        ],
        cta: 'Un espresso primé à offrir :',
      },
      it: {
        title: 'Regalare caffè: idee regalo per appassionati, team e clienti',
        metaTitle: 'Caffè da regalare: idee per appassionati e aziende',
        metaDescription:
          'Un caffè che fa davvero piacere: caffè in grani italiano premiato da regalare ad appassionati, collaboratori e clienti, con idee e consigli pratici.',
        teaser:
          'Espresso premiato da regalare: quale miscela per chi, idee per set e consigli per i regali a collaboratori e clienti.',
        lead:
          'Un buon regalo si usa e ricorda chi l’ha fatto. Il caffè fa entrambe le cose: si gusta ogni giorno e ogni tazza ricorda voi. Con un autentico espresso italiano, per di più medaglia d’oro, andate sul sicuro con gli appassionati, il team e i clienti. Ecco quale miscela scegliere per chi e come usare il caffè come regalo aziendale.',
        sections: [
          {
            h: 'Perché il caffè è un buon regalo',
            p: [
              'Il caffè è un regalo che quasi nessuno rifiuta e che non resta a prendere polvere. Diventa ancora più bello quando la storia è quella giusta: Dersut tosta dal 1947 a Conegliano, vicino a Venezia, e due sue miscele hanno ricevuto la Gold Medal all’International Coffee Tasting 2025. Molto più di un caffè qualunque.',
              'I chicchi interi nella confezione da 1 kg bastano per settimane di piacere e sono adatti a macchina automatica, portafiltro e moka. Chi lo riceve non deve comprare nulla in più.',
            ],
          },
          {
            h: 'Quale miscela per chi?',
            p: ['Scegliete la miscela secondo i gusti di chi riceve il regalo:'],
            list: [
              'Per i buongustai che bevono l’espresso al naturale: [Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg), 100 % Arabica, Gold Medal 2025',
              'Per chi lo ama rotondo e dolce, al naturale o con latte: [Plus Oro](/shop/dersut-plus-oro-1kg), anch’esso Gold Medal 2025',
              'Per chi ama il cappuccino e la macchina automatica: [Optimum Rosso](/shop/dersut-optimum-rosso-1kg), note di cacao e crema densa',
              'Per chi ama l’espresso forte: [Domus Marrone](/shop/dersut-domus-marrone-1kg), intensità 5 su 5',
            ],
          },
          {
            h: 'Idee per set regalo',
            p: [
              'Un duo rende il regalo speciale: il «duo d’oro» Non Plus Ultra e Plus Oro riunisce le due miscele premiate per CHF 74.80 in tutto. I curiosi apprezzeranno un set scoperta con tutte e quattro le miscele per CHF 131.60, spedizione gratuita da {free}.',
              'Aggiungete un biglietto con un consiglio di preparazione, per esempio dalle nostre guide [Preparare l’espresso](/ratgeber/espresso-zubereiten) o [Preparare il cappuccino](/ratgeber/cappuccino-zubereiten). Così il caffè diventa un regalo personale.',
            ],
          },
          {
            h: 'Il caffè come regalo per collaboratori e clienti',
            p: [
              'A fine anno, per un anniversario aziendale o come ringraziamento per una buona collaborazione: il caffè è un regalo aziendale che si usa ogni giorno e piace quasi a tutti. Un caffè in grani italiano premiato esprime stima senza essere invadente.',
              'Per pochi regali ordinate direttamente nel negozio. Per quantità maggiori per il team o i clienti vi prepariamo volentieri un’offerta con prezzi di quantità. Richiedetela nella pagina [Aziende & ufficio](/firmen) e prevedete un po’ di anticipo prima delle feste.',
            ],
          },
          {
            h: 'Perché il regalo arrivi fresco',
            p: [
              'Il caffè in grani si conserva a lungo nella confezione originale chiusa. Fino alla consegna tenete le confezioni in un luogo fresco, asciutto e buio, lontano da spezie e alimenti dall’odore forte. Una volta aperta, la confezione va consumata preferibilmente entro poche settimane.',
              'Spediamo in tutta la Svizzera con la posta, gratis da {free}, altrimenti per {ship}.',
            ],
          },
        ],
        faq: [
          ['Quale caffè regalare?', 'Chicchi interi di qualità con una storia, per esempio i Dersut Non Plus Ultra e Plus Oro di Conegliano, medaglie d’oro.'],
          ['Il caffè in grani va bene per ogni macchina?', 'I chicchi interi vanno bene per macchina automatica, portafiltro e moka. Con una macchina a capsule serve anche un macinino.'],
          ['Ci sono prezzi di quantità per i regali aziendali?', 'Sì. Per quantità maggiori prepariamo un’offerta. Richiedetela nella pagina Aziende & ufficio.'],
          ['Quanto si conserva il caffè in grani?', 'A lungo nella confezione originale chiusa. Una volta aperto, preferibilmente entro poche settimane.'],
        ],
        cta: 'Espresso premiato da regalare:',
      },
      en: {
        title: 'Coffee as a gift: ideas for coffee lovers, teams and clients',
        metaTitle: 'Coffee as a gift: ideas for friends and clients',
        metaDescription:
          'Give coffee that truly delights: award-winning Italian espresso beans as a gift for coffee lovers, employees and clients, with gift ideas and practical tips.',
        teaser:
          'Award-winning espresso as a gift: which blend suits whom, ideas for sets and tips for employee and client gifts.',
        lead:
          'A good gift gets used and reminds people of who gave it. Coffee does both: it is enjoyed every day, and every cup is a reminder of you. With genuine Italian espresso, gold-medal winning at that, you get it right with coffee lovers, your team and your clients. Here are ideas on which blend suits whom and how to use coffee as a corporate gift.',
        sections: [
          {
            h: 'Why coffee makes a good gift',
            p: [
              'Coffee is a gift almost nobody turns down and that never gathers dust. It becomes even better when the story is right: Dersut has been roasting in Conegliano near Venice since 1947, and two of its blends won the Gold Medal at the International Coffee Tasting 2025. That is much more than any coffee off the shelf.',
              'Whole beans in a 1 kg pack last for weeks and suit bean-to-cup machines, portafilter machines and moka pots, so the recipient does not need to buy anything new.',
            ],
          },
          {
            h: 'Which blend suits whom?',
            p: ['Choose the blend according to the recipient’s taste:'],
            list: [
              'For connoisseurs who drink espresso straight: [Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg), 100 % Arabica, Gold Medal 2025',
              'For those who like it round and sweet, straight or with milk: [Plus Oro](/shop/dersut-plus-oro-1kg), also Gold Medal 2025',
              'For cappuccino fans and bean-to-cup machines: [Optimum Rosso](/shop/dersut-optimum-rosso-1kg) with cocoa notes and dense crema',
              'For lovers of strong espresso: [Domus Marrone](/shop/dersut-domus-marrone-1kg) with intensity 5 of 5',
            ],
          },
          {
            h: 'Gift set ideas',
            p: [
              'A duo makes a gift special: the “gold duo” of Non Plus Ultra and Plus Oro brings together both award-winning blends for CHF 74.80. The curious will love a discovery set with all four blends for CHF 131.60, with free shipping from {free}.',
              'Add a small card with a brewing tip, for example from our guides [How to make espresso](/ratgeber/espresso-zubereiten) or [How to make cappuccino](/ratgeber/cappuccino-zubereiten). That turns coffee into a personal gift.',
            ],
          },
          {
            h: 'Coffee as a gift for employees and clients',
            p: [
              'At the end of the year, for a company anniversary or as thanks for good cooperation: coffee is a corporate gift that gets used every day and suits almost everyone. Award-winning Italian espresso beans show appreciation without being pushy.',
              'For individual gifts, order directly in the shop. For larger quantities for your team or clients, we are happy to prepare a quote with volume prices. Ask on our [companies & office](/firmen) page and allow some lead time before the holidays.',
            ],
          },
          {
            h: 'Making sure the gift arrives fresh',
            p: [
              'Coffee beans keep for a long time in their sealed original pack. Until you hand them over, store the packs somewhere cool, dry and dark, away from spices and strong-smelling food. Once opened, a pack is best used within a few weeks.',
              'We ship throughout Switzerland by post, free from {free}, otherwise for {ship}.',
            ],
          },
        ],
        faq: [
          ['Which coffee makes a good gift?', 'High-quality whole beans with a story, for example the gold-medal Dersut Non Plus Ultra and Plus Oro from Conegliano.'],
          ['Do coffee beans suit every machine?', 'Whole beans suit bean-to-cup machines, portafilter machines and moka pots. With a capsule machine only, a grinder is needed as well.'],
          ['Are there volume prices for corporate gifts?', 'Yes. For larger quantities we prepare a quote. Ask on our companies & office page.'],
          ['How long do coffee beans keep?', 'A long time in the sealed original pack. Once opened, ideally within a few weeks.'],
        ],
        cta: 'Award-winning espresso to give:',
      },
    },
  },
];
