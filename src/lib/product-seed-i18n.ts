/**
 * Ausführliche Produkttexte und Übersetzungen für die beiden Startprodukte.
 * Werden beim ersten Start in die Datenbank geschrieben (Spalte products.translations) und
 * lassen sich danach im Admin bearbeiten.
 */
import type { ProductTranslations } from './products-shared';

export const SEED_TRANSLATIONS: Record<string, { translations: ProductTranslations; gallery: string[] }> = {
  'dersut-optimum-rosso-1kg': {
    gallery: ['brand:prod_optimum', 'brand:tazze', 'brand:tostatura', 'brand:selezione', 'brand:img_1'],
    translations: {
      de: {
        seoTitle: 'Dersut Optimum Rosso Espressobohnen 1 kg kaufen',
        seoDescription:
          'Dersut Optimum Rosso, 1 kg Espressobohnen aus Conegliano: Arabica & Robusta, Noten von Kakao und Feingebäck, dichte Crema. Vom offiziellen Vertrieb Schweiz.',
        highlights: ['Ausgewogene Mischung aus Arabica und Robusta', 'Noten von Kakao und Feingebäck', 'Dichte, langanhaltende Crema', 'Für Siebträger, Vollautomat und Moka'],
        details:
          'Optimum ist der Allrounder im Sortiment von Dersut: eine Mischung, die im Espresso ebenso überzeugt wie im Cappuccino. Die Röstmeister in Conegliano kombinieren beliebte Arabica-Sorten, die für Süsse und Aroma sorgen, mit Robusta, die dem Espresso Körper und eine stabile Crema gibt.\n\nIn der Tasse zeigt sich Optimum rund und harmonisch. Feine Noten von Kakao und Feingebäck prägen den Geschmack, die Säure bleibt zurückhaltend und der Nachklang ist angenehm lang. Die dichte, haselnussbraune Crema hält lange und verbindet sich mit Milchschaum zu einem cremigen Cappuccino.\n\nDie 1-kg-Packung mit ganzen Bohnen ist ideal für den täglichen Genuss zu Hause, im Büro oder in der Gastronomie. Ganze Bohnen behalten ihr Aroma länger als gemahlener Kaffee: Mahlen Sie immer nur so viel, wie Sie gerade brauchen.',
      },
      fr: {
        subtitle: 'Grains d’espresso · 1 kg',
        description:
          'Optimum est un mélange soigneusement composé des variétés d’Arabica et de Robusta les plus appréciées, torréfié à Conegliano. En espresso, il révèle une crème agréablement persistante et un corps équilibré. De fines notes de cacao et de pâtisserie marquent son goût enveloppant.',
        notes: 'Cacao, pâtisserie, crème persistante',
        blend: 'Arabica & Robusta',
        seoTitle: 'Dersut Optimum Rosso grains d’espresso 1 kg',
        seoDescription:
          'Dersut Optimum Rosso, 1 kg de grains d’espresso : Arabica & Robusta, notes de cacao et de pâtisserie, crème persistante. Du distributeur officiel en Suisse.',
        highlights: ['Mélange équilibré d’Arabica et de Robusta', 'Notes de cacao et de pâtisserie', 'Crème dense et persistante', 'Pour machine à porte-filtre, automate et moka'],
        details:
          'Optimum est le polyvalent de la gamme Dersut : un mélange aussi convaincant en espresso qu’en cappuccino. Les maîtres torréfacteurs de Conegliano associent des variétés d’Arabica appréciées, qui apportent douceur et arôme, à du Robusta, qui donne corps et une crème stable.\n\nEn tasse, Optimum se montre rond et harmonieux. De fines notes de cacao et de pâtisserie dominent, l’acidité reste discrète et la finale est agréablement longue. Sa crème dense, couleur noisette, tient longtemps et s’associe à la mousse de lait pour un cappuccino onctueux.\n\nLe paquet de 1 kg en grains est idéal pour le plaisir quotidien à la maison, au bureau ou en restauration. Les grains entiers conservent leur arôme plus longtemps que le café moulu : ne moulez que la quantité dont vous avez besoin.',
      },
      it: {
        subtitle: 'Caffè in grani · 1 kg',
        description:
          'Optimum è una miscela accuratamente composta dalle più apprezzate qualità di Arabica e Robusta, tostata a Conegliano. In tazza rivela una crema piacevolmente persistente e un corpo equilibrato. Delicate note di cacao e pasticceria caratterizzano il suo gusto avvolgente.',
        notes: 'Cacao, pasticceria, crema persistente',
        blend: 'Arabica & Robusta',
        seoTitle: 'Dersut Optimum Rosso caffè in grani 1 kg',
        seoDescription:
          'Dersut Optimum Rosso, 1 kg di caffè in grani: Arabica e Robusta, note di cacao e pasticceria, crema persistente. Dal distributore ufficiale in Svizzera.',
        highlights: ['Miscela equilibrata di Arabica e Robusta', 'Note di cacao e pasticceria', 'Crema densa e persistente', 'Per macchina a leva, automatica e moka'],
        details:
          'Optimum è la miscela versatile della gamma Dersut: convince nell’espresso come nel cappuccino. I mastri tostatori di Conegliano uniscono pregiate qualità di Arabica, che donano dolcezza e aroma, alla Robusta, che conferisce corpo e una crema stabile.\n\nIn tazza Optimum si presenta rotondo e armonioso. Delicate note di cacao e pasticceria ne definiscono il gusto, l’acidità resta contenuta e il finale è piacevolmente lungo. La crema densa, color nocciola, dura a lungo e si unisce alla schiuma di latte in un cappuccino vellutato.\n\nLa confezione da 1 kg in grani è ideale per il piacere quotidiano a casa, in ufficio o nella ristorazione. I chicchi interi conservano l’aroma più a lungo del caffè macinato: macinate sempre solo la quantità che vi serve.',
      },
      en: {
        subtitle: 'Espresso beans · 1 kg',
        description:
          'Optimum is a carefully composed blend of the most popular Arabica and Robusta varieties, roasted in Conegliano. As an espresso it shows a pleasantly long-lasting crema and a balanced body. Delicate notes of cocoa and pastry shape its rounded flavour.',
        notes: 'Cocoa, pastry, long-lasting crema',
        blend: 'Arabica & Robusta',
        seoTitle: 'Dersut Optimum Rosso espresso beans 1 kg',
        seoDescription:
          'Dersut Optimum Rosso, 1 kg espresso beans from Conegliano: Arabica & Robusta, notes of cocoa and pastry, rich crema. From the official Swiss distributor.',
        highlights: ['Balanced blend of Arabica and Robusta', 'Notes of cocoa and pastry', 'Dense, long-lasting crema', 'For portafilter, bean-to-cup and moka'],
        details:
          'Optimum is the all-rounder in the Dersut range: a blend that shines as an espresso just as much as in a cappuccino. The roasters in Conegliano combine popular Arabica varieties, which bring sweetness and aroma, with Robusta, which gives body and a stable crema.\n\nIn the cup, Optimum is round and harmonious. Delicate notes of cocoa and pastry define the flavour, acidity stays restrained and the finish is pleasantly long. The dense, hazelnut-coloured crema holds for a long time and combines with milk foam into a creamy cappuccino.\n\nThe 1 kg pack of whole beans is ideal for everyday enjoyment at home, in the office or in hospitality. Whole beans keep their aroma longer than ground coffee: only grind as much as you need.',
      },
    },
  },
  'dersut-domus-marrone-1kg': {
    gallery: ['brand:prod_domus', 'brand:macchina', 'brand:caffe', 'brand:img_3', 'brand:img_4'],
    translations: {
      de: {
        seoTitle: 'Dersut Domus Marrone Espressobohnen 1 kg kaufen',
        seoDescription:
          'Dersut Domus Marrone, 1 kg Espressobohnen aus Conegliano: kräftige Robusta-Arabica-Mischung, Noten von Gebäck und Trockenfrüchten. Vom offiziellen Vertrieb.',
        highlights: ['Kräftige Mischung aus Robusta und Arabica', 'Noten von Backwaren und Trockenfrüchten', 'Intensiver Duft, runder Körper', 'Ideal für Espresso und Milchgetränke'],
        details:
          'Domus ist die kräftige Mischung von Dersut für alle, die ihren Espresso intensiv und vollmundig mögen. Ausgewählte Robusta-Sorten geben Körper, Kraft und eine feste Crema, Arabica rundet die Mischung mit Aroma und Süsse ab.\n\nSchon beim Mahlen zeigt sich der ausgesprochen intensive Duft. In der Tasse wirkt Domus rund und entschlossen, mit einem angenehmen Hauch von Backwaren und einem feinen Nachklang von Trockenfrüchten. Die Bitterkeit bleibt angenehm, die Säure ist gering.\n\nDank seiner Kraft setzt sich Domus auch in Cappuccino, Latte macchiato und Caffè latte mühelos durch. Die 1-kg-Packung mit ganzen Bohnen eignet sich für Siebträger, Vollautomat und Moka.',
      },
      fr: {
        subtitle: 'Grains d’espresso · 1 kg',
        description:
          'Domus est un mélange de variétés sélectionnées de Robusta et d’Arabica au parfum particulièrement intense et au corps rond. Une agréable touche de viennoiserie et une fine finale de fruits secs donnent à cet espresso son caractère puissant et affirmé. Idéal pour qui aime un espresso corsé et généreux.',
        notes: 'Viennoiserie, fruits secs, corsé',
        blend: 'Robusta & Arabica',
        seoTitle: 'Dersut Domus Marrone grains d’espresso 1 kg',
        seoDescription:
          'Dersut Domus Marrone, 1 kg de grains d’espresso : mélange corsé Robusta-Arabica, notes de viennoiserie et de fruits secs. Du distributeur officiel en Suisse.',
        highlights: ['Mélange corsé de Robusta et d’Arabica', 'Notes de viennoiserie et de fruits secs', 'Parfum intense, corps rond', 'Idéal pour l’espresso et les boissons lactées'],
        details:
          'Domus est le mélange corsé de Dersut pour celles et ceux qui aiment un espresso intense et généreux. Des variétés de Robusta sélectionnées apportent corps, puissance et une crème ferme ; l’Arabica complète le mélange avec arôme et douceur.\n\nDès la mouture, son parfum particulièrement intense se révèle. En tasse, Domus est rond et affirmé, avec une agréable touche de viennoiserie et une fine finale de fruits secs. L’amertume reste agréable, l’acidité faible.\n\nGrâce à sa puissance, Domus s’impose aussi sans peine dans le cappuccino, le latte macchiato et le café au lait. Le paquet de 1 kg en grains convient aux machines à porte-filtre, aux automates et à la moka.',
      },
      it: {
        subtitle: 'Caffè in grani · 1 kg',
        description:
          'Domus è una miscela di pregiate qualità di Robusta e Arabica dal profumo spiccatamente intenso e dal corpo rotondo. Un piacevole sentore di prodotti da forno e un delicato finale di frutta secca conferiscono a questo espresso il suo carattere deciso e risoluto. Ideale per chi ama un espresso corposo e intenso.',
        notes: 'Prodotti da forno, frutta secca, deciso',
        blend: 'Robusta & Arabica',
        seoTitle: 'Dersut Domus Marrone caffè in grani 1 kg',
        seoDescription:
          'Dersut Domus Marrone, 1 kg di caffè in grani: miscela decisa di Robusta e Arabica, note di prodotti da forno e frutta secca. Dal distributore ufficiale.',
        highlights: ['Miscela decisa di Robusta e Arabica', 'Note di prodotti da forno e frutta secca', 'Profumo intenso, corpo rotondo', 'Ideale per espresso e bevande al latte'],
        details:
          'Domus è la miscela decisa di Dersut per chi ama un espresso intenso e corposo. Selezionate qualità di Robusta donano corpo, forza e una crema compatta, mentre l’Arabica completa la miscela con aroma e dolcezza.\n\nGià durante la macinatura si sprigiona il suo profumo spiccatamente intenso. In tazza Domus è rotondo e risoluto, con un piacevole sentore di prodotti da forno e un delicato finale di frutta secca. L’amaro resta gradevole, l’acidità è bassa.\n\nGrazie alla sua forza, Domus si afferma senza fatica anche nel cappuccino, nel latte macchiato e nel caffellatte. La confezione da 1 kg in grani è adatta a macchine a leva, automatiche e alla moka.',
      },
      en: {
        subtitle: 'Espresso beans · 1 kg',
        description:
          'Domus is a blend of selected Robusta and Arabica varieties with a remarkably intense aroma and a round body. A pleasant hint of baked goods and a delicate finish of dried fruit give this espresso its strong, decisive character. Ideal for anyone who likes their espresso full-bodied and powerful.',
        notes: 'Baked goods, dried fruit, strong',
        blend: 'Robusta & Arabica',
        seoTitle: 'Dersut Domus Marrone espresso beans 1 kg',
        seoDescription:
          'Dersut Domus Marrone, 1 kg espresso beans from Conegliano: a strong Robusta-Arabica blend, notes of baked goods and dried fruit. Official Swiss distributor.',
        highlights: ['Strong blend of Robusta and Arabica', 'Notes of baked goods and dried fruit', 'Intense aroma, round body', 'Ideal for espresso and milk drinks'],
        details:
          'Domus is Dersut’s strong blend for everyone who likes their espresso intense and full-bodied. Selected Robusta varieties bring body, power and a firm crema, while Arabica rounds off the blend with aroma and sweetness.\n\nIts remarkably intense aroma is noticeable as soon as you grind. In the cup, Domus is round and decisive, with a pleasant hint of baked goods and a delicate finish of dried fruit. Bitterness stays pleasant and acidity is low.\n\nThanks to its strength, Domus easily holds its own in cappuccino, latte macchiato and caffè latte. The 1 kg pack of whole beans suits portafilter machines, bean-to-cup machines and the moka pot.',
      },
    },
  },
  'dersut-non-plus-ultra-1kg': {
    gallery: ['brand:prod_nonplusultra', 'brand:fiori', 'brand:tazze', 'brand:selezione', 'brand:img_2'],
    translations: {
      de: {
        seoTitle: 'Dersut Non Plus Ultra 100 % Arabica Espressobohnen 1 kg',
        seoDescription:
          'Dersut Non Plus Ultra, 1 kg Espressobohnen aus 100 % Arabica: florale Noten, Zitrus und Kakao. Gold Medal 2025. Vom offiziellen Vertrieb Schweiz.',
        highlights: ['100 % Arabica aus Mittelamerika und Afrika', 'Florale und fruchtige Noten, feine Zitrussäure', 'Nachklang von Kakao, Mandel und Nüssen', 'Gold Medal International Coffee Tasting 2016, 2022 und 2025'],
        details:
          'Non Plus Ultra heisst «nichts darüber hinaus», und genau so ist diese Mischung gemeint: Sie ist die Spitze des Sortiments von Dersut. Die Röstmeister in Conegliano verwenden ausschliesslich die besten Arabica-Sorten, gewaschen und naturbelassen. Die Einzelherkünfte stammen vor allem aus Mittelamerika und vom Horn von Afrika und bringen florale und fruchtige Aromen in die Tasse.\n\nIm Espresso zeigt sich Non Plus Ultra elegant und vielschichtig. Zitrusnoten prägen die feine, lebendige Säure, der Körper ist zart und umhüllend, das Aroma reich und lang anhaltend. Leichte Noten von Frucht und Mandel verbinden sich mit einem Nachklang von Kakao: ein Espresso, der wunderbar zu einem Dessert passt.\n\nDie Jury des International Coffee Tasting (IIAC) hat Non Plus Ultra mehrfach mit der Gold Medal ausgezeichnet, zuletzt 2025 in Brescia in der Kategorie Espressomischung. Zudem ist die Mischung als «Espresso Italiano di Qualità» zertifiziert. Die 1-kg-Packung mit ganzen Bohnen eignet sich für Siebträger, Vollautomat und Moka.',
      },
      fr: {
        subtitle: 'Grains d’espresso · 1 kg',
        description:
          'Non Plus Ultra est le mélange le plus noble de Dersut : 100 % Arabica issu des meilleures variétés lavées et naturelles, surtout d’Amérique centrale et de la Corne de l’Afrique. Des notes florales et fruitées, une élégante fraîcheur d’agrumes et une fine finale de cacao et de fruits secs en font l’espresso des moments particuliers. Récompensé par la Gold Medal de l’International Coffee Tasting.',
        notes: 'Floral, agrumes, amande, cacao',
        blend: '100 % Arabica',
        seoTitle: 'Dersut Non Plus Ultra grains 100 % Arabica 1 kg',
        seoDescription:
          'Dersut Non Plus Ultra, 1 kg de grains d’espresso 100 % Arabica : notes florales, agrumes et cacao. Gold Medal 2025. Du distributeur officiel en Suisse.',
        highlights: ['100 % Arabica d’Amérique centrale et d’Afrique', 'Notes florales et fruitées, fine acidité d’agrumes', 'Finale de cacao, d’amande et de fruits secs', 'Gold Medal International Coffee Tasting 2016, 2022 et 2025'],
        details:
          'Non Plus Ultra signifie « rien au-delà », et c’est bien l’ambition de ce mélange : il est le sommet de la gamme Dersut. Les maîtres torréfacteurs de Conegliano n’utilisent que les meilleures variétés d’Arabica, lavées et naturelles. Les origines uniques proviennent surtout d’Amérique centrale et de la Corne de l’Afrique et apportent des arômes floraux et fruités.\n\nEn espresso, Non Plus Ultra se montre élégant et complexe. Les notes d’agrumes marquent une acidité fine et vive, le corps est délicat et enveloppant, l’arôme riche et persistant. De légères notes de fruits et d’amande s’unissent à une finale de cacao : un espresso parfait avec un dessert.\n\nLe jury de l’International Coffee Tasting (IIAC) a décerné plusieurs fois la Gold Medal à Non Plus Ultra, la dernière fois en 2025 à Brescia dans la catégorie mélange espresso. Le mélange est en outre certifié « Espresso Italiano di Qualità ». Le paquet de 1 kg en grains convient aux machines à porte-filtre, aux automates et à la moka.',
      },
      it: {
        subtitle: 'Caffè in grani · 1 kg',
        description:
          'Non Plus Ultra è la miscela più pregiata di Dersut: 100 % Arabica dalle varietà più eccelse, lavate e naturali, provenienti soprattutto dal Centro America e dal Corno d’Africa. Note floreali e fruttate, un’elegante freschezza agrumata e un fine retrogusto di cacao e frutta secca ne fanno l’espresso dei momenti speciali. Premiato con la Gold Medal dell’International Coffee Tasting.',
        notes: 'Floreale, agrumi, mandorla, cacao',
        blend: '100 % Arabica',
        seoTitle: 'Dersut Non Plus Ultra caffè in grani 100 % Arabica 1 kg',
        seoDescription:
          'Dersut Non Plus Ultra, 1 kg di caffè in grani 100 % Arabica: note floreali, agrumi e cacao. Gold Medal 2025. Dal distributore ufficiale in Svizzera.',
        highlights: ['100 % Arabica dal Centro America e dall’Africa', 'Note floreali e fruttate, fine acidità agrumata', 'Retrogusto di cacao, mandorla e frutta secca', 'Gold Medal International Coffee Tasting 2016, 2022 e 2025'],
        details:
          'Non Plus Ultra significa «niente oltre», ed è proprio questa l’ambizione della miscela: è il vertice della gamma Dersut. I mastri tostatori di Conegliano utilizzano solo le varietà di Arabica più pregiate, lavate e naturali. Le monorigini provengono principalmente dal Centro America e dal Corno d’Africa e portano in tazza aromi floreali e fruttati.\n\nIn espresso Non Plus Ultra si presenta elegante e complesso. Le note agrumate caratterizzano un’acidità fine e vivace, il corpo è delicato e avvolgente, l’aroma ricco e persistente. Leggere note fruttate e mandorlate si sposano con il retrogusto di cacao: un espresso ideale in abbinamento a un dessert.\n\nLa giuria dell’International Coffee Tasting (IIAC) ha premiato più volte Non Plus Ultra con la Gold Medal, l’ultima nel 2025 a Brescia nella categoria miscela per espresso. La miscela è inoltre certificata «Espresso Italiano di Qualità». La confezione da 1 kg in grani è adatta a macchina a leva, automatica e moka.',
      },
      en: {
        subtitle: 'Espresso beans · 1 kg',
        description:
          'Non Plus Ultra is Dersut’s finest blend: 100 % Arabica from the most exquisite washed and natural varieties, mainly from Central America and the Horn of Africa. Floral and fruity notes, an elegant citrus freshness and a delicate finish of cocoa and nuts make it the espresso for special moments. Awarded the Gold Medal of the International Coffee Tasting.',
        notes: 'Floral, citrus, almond, cocoa',
        blend: '100 % Arabica',
        seoTitle: 'Dersut Non Plus Ultra 100 % Arabica espresso beans 1 kg',
        seoDescription:
          'Dersut Non Plus Ultra, 1 kg of 100 % Arabica espresso beans: floral notes, citrus and cocoa. Gold Medal 2025. From the official Swiss distributor.',
        highlights: ['100 % Arabica from Central America and Africa', 'Floral and fruity notes, fine citrus acidity', 'Finish of cocoa, almond and nuts', 'Gold Medal International Coffee Tasting 2016, 2022 and 2025'],
        details:
          'Non Plus Ultra means “nothing beyond”, and that is exactly the idea behind this blend: it is the pinnacle of the Dersut range. The roasters in Conegliano use only the finest Arabica varieties, washed and natural. The single origins come mainly from Central America and the Horn of Africa and bring floral and fruity aromas to the cup.\n\nAs an espresso, Non Plus Ultra is elegant and complex. Citrus notes shape a fine, lively acidity, the body is delicate and enveloping, the aroma rich and long-lasting. Light notes of fruit and almond meet a finish of cocoa: an espresso that pairs beautifully with dessert.\n\nThe jury of the International Coffee Tasting (IIAC) has awarded Non Plus Ultra the Gold Medal several times, most recently in 2025 in Brescia in the espresso blend category. The blend is also certified “Espresso Italiano di Qualità”. The 1 kg pack of whole beans suits portafilter machines, bean-to-cup machines and the moka pot.',
      },
    },
  },
  'dersut-plus-oro-1kg': {
    gallery: ['brand:prod_plusoro', 'brand:caffe', 'brand:macchina', 'brand:tostatura', 'brand:img_1'],
    translations: {
      de: {
        seoTitle: 'Dersut Plus Oro Espressobohnen 1 kg kaufen · Gold Medal',
        seoDescription:
          'Dersut Plus Oro, 1 kg Espressobohnen aus Conegliano: harmonisch und süss, Noten von Gebäck, Kakao und Haselnuss. Gold Medal 2025. Offizieller Vertrieb.',
        highlights: ['Harmonische Mischung aus Arabica und Robusta', 'Noten von Feingebäck, Kakao und Haselnuss', 'Weich und intensiv, mittlerer Körper', 'Gold Medal International Coffee Tasting 2014, 2018 und 2025'],
        details:
          'Plus Oro ist die goldene Mitte im Sortiment von Dersut: harmonisch, süss und zugleich mit Charakter. Für diese Mischung wählen die Röstmeister in Conegliano edle Arabica- und Robusta-Sorten, gewaschen und naturbelassen, und rösten sie mit viel Gefühl für die Balance.\n\nIn der Tasse ist Plus Oro weich und intensiv, mit mittlerem Körper und feiner Säure. Noten von Feingebäck treten hervor, getragen von der Kakaobohne und einem zarten, würzigen Aroma. Im Nachklang bleiben angenehme Noten von Kakao und Haselnuss. Pur als Espresso ebenso überzeugend wie im Cappuccino.\n\nPlus Oro wurde beim International Coffee Tasting (IIAC) mehrfach mit der Gold Medal ausgezeichnet, zuletzt 2025 in Brescia in der Kategorie Espressomischung, und erhielt zudem den Camaleonte Espresso Award. Die Mischung ist als «Espresso Italiano di Qualità» zertifiziert. Die 1-kg-Packung mit ganzen Bohnen eignet sich für Siebträger, Vollautomat und Moka.',
      },
      fr: {
        subtitle: 'Grains d’espresso · 1 kg',
        description:
          'Plus Oro est le mélange doré et harmonieux de Dersut : des variétés choisies d’Arabica et de Robusta, à la fois douces et intenses, au corps moyen et à l’acidité fine. Des notes de pâtisserie et de fève de cacao, une touche épicée et une finale de cacao et de noisette le rendent rond et doux. Plusieurs fois récompensé par la Gold Medal de l’International Coffee Tasting.',
        notes: 'Pâtisserie, cacao, noisette, épices',
        blend: 'Arabica & Robusta',
        seoTitle: 'Dersut Plus Oro grains d’espresso 1 kg · Gold Medal',
        seoDescription:
          'Dersut Plus Oro, 1 kg de grains d’espresso : harmonieux et doux, notes de pâtisserie, cacao et noisette. Gold Medal 2025. Du distributeur officiel en Suisse.',
        highlights: ['Mélange harmonieux d’Arabica et de Robusta', 'Notes de pâtisserie, de cacao et de noisette', 'Doux et intense, corps moyen', 'Gold Medal International Coffee Tasting 2014, 2018 et 2025'],
        details:
          'Plus Oro est le juste milieu doré de la gamme Dersut : harmonieux, doux et pourtant plein de caractère. Pour ce mélange, les maîtres torréfacteurs de Conegliano choisissent de nobles variétés d’Arabica et de Robusta, lavées et naturelles, et les torréfient avec un grand sens de l’équilibre.\n\nEn tasse, Plus Oro est doux et intense, avec un corps moyen et une acidité fine. Les notes de pâtisserie ressortent, portées par la fève de cacao et un délicat arôme épicé. En finale persistent d’agréables notes de cacao et de noisette. Aussi convaincant en espresso qu’en cappuccino.\n\nPlus Oro a reçu plusieurs fois la Gold Medal de l’International Coffee Tasting (IIAC), la dernière fois en 2025 à Brescia dans la catégorie mélange espresso, ainsi que le Camaleonte Espresso Award. Le mélange est certifié « Espresso Italiano di Qualità ». Le paquet de 1 kg en grains convient aux machines à porte-filtre, aux automates et à la moka.',
      },
      it: {
        subtitle: 'Caffè in grani · 1 kg',
        description:
          'Plus Oro è la miscela armoniosa e dolce di Dersut: pregiate varietà di Arabica e Robusta, dal gusto morbido e intenso, di media corposità e fine acidità. Sentori di pasticceria e di fava di cacao, un delicato aroma speziato e un retrogusto di cacao e nocciola la rendono rotonda e dolce. Più volte premiata con la Gold Medal dell’International Coffee Tasting.',
        notes: 'Pasticceria, cacao, nocciola, spezie',
        blend: 'Arabica & Robusta',
        seoTitle: 'Dersut Plus Oro caffè in grani 1 kg · Gold Medal',
        seoDescription:
          'Dersut Plus Oro, 1 kg di caffè in grani: armonioso e dolce, note di pasticceria, cacao e nocciola. Gold Medal 2025. Dal distributore ufficiale in Svizzera.',
        highlights: ['Miscela armoniosa di Arabica e Robusta', 'Note di pasticceria, cacao e nocciola', 'Morbido e intenso, media corposità', 'Gold Medal International Coffee Tasting 2014, 2018 e 2025'],
        details:
          'Plus Oro è il giusto mezzo dorato della gamma Dersut: armonioso, dolce e al tempo stesso di carattere. Per questa miscela i mastri tostatori di Conegliano scelgono pregiate varietà di Arabica e Robusta, lavate e naturali, e le tostano con grande attenzione all’equilibrio.\n\nIn tazza Plus Oro è morbido e intenso, di media corposità e fine acidità. I sentori di pasticceria spiccano sulla fava di cacao e fanno emergere un delicato aroma speziato. Nel retrogusto restano piacevoli note di cacao e nocciola. Convince sia come espresso sia nel cappuccino.\n\nPlus Oro ha ricevuto più volte la Gold Medal dell’International Coffee Tasting (IIAC), l’ultima nel 2025 a Brescia nella categoria miscela per espresso, oltre al Camaleonte Espresso Award. La miscela è certificata «Espresso Italiano di Qualità». La confezione da 1 kg in grani è adatta a macchina a leva, automatica e moka.',
      },
      en: {
        subtitle: 'Espresso beans · 1 kg',
        description:
          'Plus Oro is Dersut’s harmonious golden blend: selected Arabica and Robusta varieties, smooth yet intense, with a medium body and fine acidity. Notes of pastry and cocoa bean, a hint of spice and a finish of cocoa and hazelnut make it round and sweet. Awarded the Gold Medal of the International Coffee Tasting several times.',
        notes: 'Pastry, cocoa, hazelnut, spice',
        blend: 'Arabica & Robusta',
        seoTitle: 'Dersut Plus Oro espresso beans 1 kg · Gold Medal',
        seoDescription:
          'Dersut Plus Oro, 1 kg espresso beans from Conegliano: harmonious and sweet, notes of pastry, cocoa and hazelnut. Gold Medal 2025. Official Swiss distributor.',
        highlights: ['Harmonious blend of Arabica and Robusta', 'Notes of pastry, cocoa and hazelnut', 'Smooth and intense, medium body', 'Gold Medal International Coffee Tasting 2014, 2018 and 2025'],
        details:
          'Plus Oro is the golden mean of the Dersut range: harmonious, sweet and full of character. For this blend, the roasters in Conegliano choose fine Arabica and Robusta varieties, washed and natural, and roast them with a keen sense of balance.\n\nIn the cup, Plus Oro is smooth and intense, with a medium body and fine acidity. Pastry notes stand out, carried by the cocoa bean and a delicate spicy aroma. The finish leaves pleasant notes of cocoa and hazelnut. Just as convincing as a pure espresso as in a cappuccino.\n\nPlus Oro has won the Gold Medal of the International Coffee Tasting (IIAC) several times, most recently in 2025 in Brescia in the espresso blend category, as well as the Camaleonte Espresso Award. The blend is certified “Espresso Italiano di Qualità”. The 1 kg pack of whole beans suits portafilter machines, bean-to-cup machines and the moka pot.',
      },
    },
  },
};

/** Frühere, zu lange Google-Beschreibungen: werden ersetzt, solange sie im Admin nicht geändert wurden. */
export const SEO_DESCRIPTION_UPDATES: [slug: string, lang: string, old: string, next: string][] = [
  ['dersut-optimum-rosso-1kg', 'de', 'Dersut Optimum Rosso, 1 kg ganze Espressobohnen aus Conegliano: Arabica & Robusta, Noten von Kakao und Feingebäck, langanhaltende Crema. Original vom offiziellen Vertrieb Schweiz.', 'Dersut Optimum Rosso, 1 kg Espressobohnen aus Conegliano: Arabica & Robusta, Noten von Kakao und Feingebäck, dichte Crema. Vom offiziellen Vertrieb Schweiz.'],
  ['dersut-optimum-rosso-1kg', 'fr', 'Dersut Optimum Rosso, 1 kg de grains d’espresso de Conegliano : Arabica & Robusta, notes de cacao et de pâtisserie, crème persistante. Original du distributeur officiel en Suisse.', 'Dersut Optimum Rosso, 1 kg de grains d’espresso : Arabica & Robusta, notes de cacao et de pâtisserie, crème persistante. Du distributeur officiel en Suisse.'],
  ['dersut-optimum-rosso-1kg', 'it', 'Dersut Optimum Rosso, 1 kg di caffè in grani da Conegliano: Arabica & Robusta, note di cacao e pasticceria, crema persistente. Originale dal distributore ufficiale in Svizzera.', 'Dersut Optimum Rosso, 1 kg di caffè in grani: Arabica e Robusta, note di cacao e pasticceria, crema persistente. Dal distributore ufficiale in Svizzera.'],
  ['dersut-optimum-rosso-1kg', 'en', 'Dersut Optimum Rosso, 1 kg whole espresso beans from Conegliano: Arabica & Robusta, notes of cocoa and pastry, long-lasting crema. Original from the official Swiss distributor.', 'Dersut Optimum Rosso, 1 kg espresso beans from Conegliano: Arabica & Robusta, notes of cocoa and pastry, rich crema. From the official Swiss distributor.'],
  ['dersut-domus-marrone-1kg', 'de', 'Dersut Domus Marrone, 1 kg ganze Espressobohnen aus Conegliano: kräftige Robusta-Arabica-Mischung mit Noten von Backwaren und Trockenfrüchten. Original vom offiziellen Vertrieb Schweiz.', 'Dersut Domus Marrone, 1 kg Espressobohnen aus Conegliano: kräftige Robusta-Arabica-Mischung, Noten von Gebäck und Trockenfrüchten. Vom offiziellen Vertrieb.'],
  ['dersut-domus-marrone-1kg', 'fr', 'Dersut Domus Marrone, 1 kg de grains d’espresso de Conegliano : mélange corsé Robusta-Arabica aux notes de viennoiserie et de fruits secs. Original du distributeur officiel en Suisse.', 'Dersut Domus Marrone, 1 kg de grains d’espresso : mélange corsé Robusta-Arabica, notes de viennoiserie et de fruits secs. Du distributeur officiel en Suisse.'],
  ['dersut-domus-marrone-1kg', 'it', 'Dersut Domus Marrone, 1 kg di caffè in grani da Conegliano: miscela decisa di Robusta e Arabica con note di prodotti da forno e frutta secca. Originale dal distributore ufficiale.', 'Dersut Domus Marrone, 1 kg di caffè in grani: miscela decisa di Robusta e Arabica, note di prodotti da forno e frutta secca. Dal distributore ufficiale.'],
  ['dersut-domus-marrone-1kg', 'en', 'Dersut Domus Marrone, 1 kg whole espresso beans from Conegliano: a strong Robusta-Arabica blend with notes of baked goods and dried fruit. Original from the official Swiss distributor.', 'Dersut Domus Marrone, 1 kg espresso beans from Conegliano: a strong Robusta-Arabica blend, notes of baked goods and dried fruit. Official Swiss distributor.'],
];
