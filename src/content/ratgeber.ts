import type { Locale } from '@/lib/i18n';
import type { BrandKey } from '@/lib/brand';

export type ArticleSection = { h: string; p: string[]; list?: string[] };
export type ArticleText = {
  title: string; // H1, max ~70 chars
  metaTitle: string; // <= 60 chars, keyword first, no brand suffix (added automatically)
  metaDescription: string; // 140-160 chars, includes a reason to click
  teaser: string; // 1-2 sentences for the overview card
  lead: string; // intro paragraph
  sections: ArticleSection[]; // 4-6 sections
  faq: [string, string][]; // 3-4 Q&A
  cta: string; // short call to action sentence before product cards
};
export type Article = {
  slug: string;
  image: BrandKey;
  products: string[];
  published: string;
  text: Record<Locale, ArticleText>;
};

const OPTIMUM = 'dersut-optimum-rosso-1kg';
const DOMUS = 'dersut-domus-marrone-1kg';

export const ARTICLES: Article[] = [
  /* ------------------------------------------------------------------ */
  /* 1. Kaffeebohnen für Vollautomat                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: 'kaffeebohnen-vollautomat',
    image: 'macchina',
    products: [OPTIMUM, DOMUS],
    published: '2026-10-12',
    text: {
      de: {
        title: 'Kaffeebohnen für Vollautomat: so finden Sie die richtigen',
        metaTitle: 'Kaffeebohnen für Vollautomat: richtig auswählen',
        metaDescription:
          'Welche Kaffeebohnen passen in den Vollautomaten? Röstung, Mahlgrad und Reinigung verständlich erklärt, dazu zwei italienische Espressomischungen im Vergleich.',
        teaser:
          'Röstung, Öligkeit, Mahlgrad: worauf es bei Bohnen für den Vollautomaten ankommt und welche Mischung zu Ihren Gewohnheiten passt.',
        lead:
          'Ein Kaffeevollautomat nimmt Ihnen viel Arbeit ab, doch wie gut der Espresso am Ende schmeckt, entscheidet zu einem grossen Teil die Bohne im Behälter. Wer die passenden Kaffeebohnen für den Vollautomaten wählt, bekommt mehr Crema, ein runderes Aroma und schont gleichzeitig das Mahlwerk. In diesem Ratgeber erfahren Sie, worauf Sie beim Kauf achten sollten, wie Sie den Mahlgrad einstellen und welche Dersut-Mischung zu Ihrem Geschmack passt.',
        sections: [
          {
            h: 'Warum ganze Bohnen statt Pulver?',
            p: [
              'Ein Vollautomat ist dafür gebaut, jede Tasse frisch zu mahlen. Genau darin liegt sein grösster Vorteil: Kaffee verliert seine Aromen sehr schnell, sobald er gemahlen ist. Ganze Bohnen schützen die flüchtigen Duftstoffe und Öle im Inneren, bis das Mahlwerk sie unmittelbar vor dem Brühen freisetzt.',
              'Vorgemahlener Kaffee schmeckt im Vollautomaten deshalb meist flacher und bitterer. Zudem lässt sich bei ganzen Bohnen der Mahlgrad an die Maschine anpassen, was mit fertigem Pulver nicht möglich ist. Wer also schon einen Vollautomaten besitzt, holt mit frischen ganzen Bohnen am meisten aus dem Gerät heraus.',
            ],
          },
          {
            h: 'Röstung und Öligkeit: worauf es ankommt',
            p: [
              'Für den Vollautomaten eignen sich Bohnen, die sorgfältig und gleichmässig geröstet sind. Sehr dunkel geröstete Bohnen mit glänzend öliger Oberfläche können im Bohnenbehälter verkleben, schlecht nachrutschen und mit der Zeit Rückstände im Mahlwerk hinterlassen. Ideal sind Bohnen mit eher matter Oberfläche und einem ausgewogenen Röstprofil.',
              'Bei Dersut in Conegliano wird in zwei Stufen geröstet: eine Vorröstung bei 150 °C, danach die Hauptröstung bei 210 bis 220 °C, gefolgt von einer Kühlung mit Luft. Anschliessend prüft eine elektronische Farbsortierung jede einzelne Bohne. Das Ergebnis ist eine gleichmässige Röstung, die sich im Vollautomaten verlässlich verarbeiten lässt.',
            ],
            list: [
              'Ganze Bohnen in einer gut verschliessbaren Packung kaufen',
              'Auf eine gleichmässige Röstfarbe ohne starken Ölfilm achten',
              'Espressomischungen wählen, die für Crema und Körper entwickelt wurden',
              'Lieber eine Packung nach der anderen öffnen als mehrere gleichzeitig',
            ],
          },
          {
            h: 'Den richtigen Mahlgrad einstellen',
            p: [
              'Für Espresso aus dem Vollautomaten empfiehlt sich ein mittelfeiner bis feiner Mahlgrad. Ist das Pulver zu grob, läuft das Wasser zu schnell durch: Der Espresso wird dünn, sauer und hat kaum Crema. Ist es zu fein, wird die Extraktion zu lang und der Kaffee schmeckt bitter.',
              'Verstellen Sie den Mahlgrad bei den meisten Geräten nur bei laufendem Mahlwerk und immer in kleinen Schritten. Nach jeder Änderung sollten Sie zwei bis drei Tassen beziehen, bevor Sie beurteilen, ob der Geschmack besser geworden ist. Ein guter Richtwert: Ein einfacher Espresso von rund 25 bis 30 ml sollte in etwa 20 bis 30 Sekunden durchlaufen.',
            ],
          },
          {
            h: 'Reinigung und Pflege nicht vergessen',
            p: [
              'Auch die beste Bohne schmeckt nicht, wenn Brühgruppe und Leitungen verschmutzt sind. Alte Kaffeeöle werden ranzig und geben jedem Espresso eine unangenehme Note. Halten Sie sich deshalb an die Reinigungs- und Entkalkungsprogramme Ihres Herstellers und spülen Sie die Brühgruppe, falls sie herausnehmbar ist, regelmässig unter klarem Wasser ab.',
              'Füllen Sie den Bohnenbehälter nur mit so vielen Bohnen, wie Sie in wenigen Tagen verbrauchen, und verschliessen Sie die Packung danach gut. Bewahren Sie den Rest kühl, trocken und dunkel auf. So bleiben die Aromen länger erhalten und der Behälter bleibt sauber.',
            ],
          },
          {
            h: 'Welche Dersut-Mischung passt zu Ihrem Vollautomaten?',
            p: [
              'Beide Dersut-Mischungen sind für den Vollautomaten geeignet, sie unterscheiden sich aber im Charakter. Der [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg) ist der Allrounder: eine Mischung aus beliebten Arabica- und Robusta-Sorten mit lang anhaltender Crema, ausgewogenem Körper, Noten von Kakao und Gebäck, geringer Säure und langem Abgang. Mit Intensität 4 von 5 überzeugt er pur als Espresso und ebenso im Cappuccino oder Latte macchiato.',
              'Der [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg) ist die kräftigere Wahl mit Intensität 5 von 5. Er bietet ein sehr intensives Aroma, einen runden Körper, einen Hauch von Backwaren und einen Abgang von getrockneten Früchten. Wer seinen Espresso vollmundig und stark mag, liegt hier richtig.',
            ],
          },
        ],
        faq: [
          [
            'Kann ich jede Espressobohne im Vollautomaten verwenden?',
            'Grundsätzlich ja, doch sehr ölige, extrem dunkle Röstungen können das Mahlwerk verkleben. Gleichmässig geröstete Espressomischungen sind die sicherere Wahl.',
          ],
          [
            'Welcher Mahlgrad ist für den Vollautomaten richtig?',
            'Mittelfein bis fein. Verstellen Sie den Mahlgrad in kleinen Schritten und testen Sie nach jeder Änderung zwei bis drei Tassen.',
          ],
          [
            'Wie lange halten geöffnete Kaffeebohnen?',
            'Am besten verbrauchen Sie eine geöffnete Packung innert weniger Wochen. Gut verschlossen, kühl, trocken und dunkel gelagert bleibt das Aroma am längsten erhalten.',
          ],
          [
            'Optimum oder Domus für Milchgetränke?',
            'Für Cappuccino und Latte macchiato ist der Optimum Rosso dank Crema und Kakaonoten ideal. Wer es auch mit Milch sehr kräftig mag, greift zum Domus Marrone.',
          ],
        ],
        cta: 'Finden Sie die passende Bohne für Ihren Vollautomaten, beide Mischungen in der 1-kg-Originalpackung:',
      },
      fr: {
        title: 'Grains de café pour machine automatique : bien les choisir',
        metaTitle: 'Grains de café pour machine automatique : le guide',
        metaDescription:
          'Quels grains de café pour une machine automatique ? Torréfaction, mouture et entretien expliqués simplement, avec deux mélanges espresso italiens comparés.',
        teaser:
          'Torréfaction, huile, mouture : ce qui compte vraiment pour les grains d’une machine automatique et quel mélange choisir.',
        lead:
          'Une machine à café automatique vous simplifie la vie, mais la qualité de l’espresso dépend en grande partie des grains que vous versez dans le réservoir. Bien choisir ses grains de café pour machine automatique, c’est obtenir plus de crème, un arôme plus rond et un moulin qui dure plus longtemps. Ce guide vous explique quoi regarder à l’achat, comment régler la mouture et quel mélange Dersut correspond à vos goûts.',
        sections: [
          {
            h: 'Pourquoi des grains entiers plutôt que du café moulu ?',
            p: [
              'Une machine automatique est conçue pour moudre chaque tasse à la minute. C’est son principal atout : le café perd très vite ses arômes une fois moulu. Les grains entiers protègent les huiles et les composés aromatiques jusqu’au moment où le moulin les libère, juste avant l’extraction.',
              'Le café prémoulu donne donc souvent un résultat plus plat et plus amer dans une machine automatique. Avec des grains entiers, vous pouvez en outre adapter la mouture à votre appareil, ce qui est impossible avec une poudre déjà prête.',
            ],
          },
          {
            h: 'Torréfaction et aspect huileux',
            p: [
              'Pour une machine automatique, privilégiez des grains torréfiés avec soin et de manière homogène. Les grains très foncés à la surface brillante et huileuse peuvent coller dans le réservoir, mal descendre vers le moulin et laisser des résidus avec le temps. L’idéal : des grains plutôt mats, au profil de torréfaction équilibré.',
              'Chez Dersut, à Conegliano, la torréfaction se fait en deux étapes : une pré-torréfaction à 150 °C, puis la torréfaction principale entre 210 et 220 °C, suivie d’un refroidissement à l’air. Une sélection électronique contrôle ensuite la couleur de chaque grain. Le résultat est une torréfaction régulière, fiable dans une machine automatique.',
            ],
            list: [
              'Acheter des grains entiers dans un paquet bien refermable',
              'Vérifier une couleur de torréfaction homogène, sans film d’huile marqué',
              'Choisir un mélange espresso pensé pour la crème et le corps',
              'Ouvrir un paquet après l’autre plutôt que plusieurs à la fois',
            ],
          },
          {
            h: 'Régler la bonne mouture',
            p: [
              'Pour un espresso en machine automatique, une mouture moyennement fine à fine est recommandée. Trop grossière, l’eau passe trop vite : l’espresso est léger, acide et presque sans crème. Trop fine, l’extraction s’allonge et le café devient amer.',
              'Sur la plupart des appareils, on modifie la mouture uniquement moulin en marche et par petits crans. Après chaque réglage, préparez deux ou trois tasses avant de juger le goût. Un bon repère : un espresso simple d’environ 25 à 30 ml devrait couler en 20 à 30 secondes.',
            ],
          },
          {
            h: 'Nettoyage et entretien',
            p: [
              'Même les meilleurs grains perdent leur saveur si le groupe d’infusion et les conduits sont encrassés. Les vieilles huiles de café rancissent et donnent un goût désagréable. Suivez les programmes de nettoyage et de détartrage du fabricant et rincez régulièrement le groupe à l’eau claire s’il est amovible.',
              'Ne remplissez le réservoir qu’avec la quantité consommée en quelques jours et refermez bien le paquet. Conservez le reste au frais, au sec et à l’abri de la lumière : les arômes tiennent plus longtemps et le réservoir reste propre.',
            ],
          },
          {
            h: 'Quel mélange Dersut pour votre machine ?',
            p: [
              'Les deux mélanges Dersut conviennent aux machines automatiques, avec des caractères différents. Le [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg) est le polyvalent : un mélange de variétés Arabica et Robusta appréciées, une crème persistante, un corps équilibré, des notes de cacao et de pâtisserie, une faible acidité et une longue finale. Intensité 4 sur 5, parfait en espresso comme en cappuccino.',
              'Le [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg) est le choix plus corsé, intensité 5 sur 5 : arôme très intense, corps rond, une touche de viennoiserie et une finale de fruits secs. Idéal si vous aimez un espresso puissant et généreux.',
            ],
          },
        ],
        faq: [
          [
            'Peut-on utiliser n’importe quel grain dans une machine automatique ?',
            'En principe oui, mais les torréfactions très foncées et huileuses peuvent encrasser le moulin. Un mélange espresso torréfié de façon homogène est plus sûr.',
          ],
          [
            'Quelle mouture pour une machine automatique ?',
            'Moyennement fine à fine. Modifiez-la par petits crans et goûtez deux ou trois tasses après chaque réglage.',
          ],
          [
            'Combien de temps se conservent des grains ouverts ?',
            'Idéalement, consommez un paquet ouvert en quelques semaines, bien refermé et stocké au frais, au sec et à l’abri de la lumière.',
          ],
          [
            'Optimum ou Domus pour les boissons lactées ?',
            'Pour cappuccino et latte macchiato, l’Optimum Rosso est idéal grâce à sa crème et ses notes de cacao. Pour un goût très corsé même avec du lait, choisissez le Domus Marrone.',
          ],
        ],
        cta: 'Trouvez le grain idéal pour votre machine automatique, en paquet original de 1 kg :',
      },
      it: {
        title: 'Caffè in grani per macchina automatica: come sceglierlo',
        metaTitle: 'Caffè in grani per macchina automatica: la guida',
        metaDescription:
          'Quale caffè in grani per la macchina automatica? Tostatura, macinatura e pulizia spiegate in modo semplice, con due miscele espresso italiane a confronto.',
        teaser:
          'Tostatura, oleosità, macinatura: cosa conta davvero nei chicchi per la macchina automatica e quale miscela scegliere.',
        lead:
          'Una macchina da caffè automatica fa gran parte del lavoro, ma il gusto dell’espresso dipende soprattutto dai chicchi nel contenitore. Scegliere il caffè in grani giusto per la macchina automatica significa più crema, un aroma più rotondo e un macinino che dura di più. In questa guida scoprirà cosa guardare all’acquisto, come regolare la macinatura e quale miscela Dersut fa al caso suo.',
        sections: [
          {
            h: 'Perché chicchi interi e non caffè macinato?',
            p: [
              'La macchina automatica è pensata per macinare ogni tazza al momento. È il suo grande vantaggio: una volta macinato, il caffè perde gli aromi molto in fretta. Il chicco intero protegge oli e sostanze aromatiche fino a quando la macina li libera, subito prima dell’estrazione.',
              'Il caffè già macinato, nella macchina automatica, risulta quindi spesso piatto e più amaro. Con i chicchi interi, inoltre, si può adattare la macinatura all’apparecchio, cosa impossibile con una polvere già pronta.',
            ],
          },
          {
            h: 'Tostatura e oleosità',
            p: [
              'Per la macchina automatica sono ideali chicchi tostati con cura e in modo uniforme. I chicchi molto scuri, lucidi e oleosi possono incollarsi nel contenitore, scendere male verso la macina e lasciare residui col tempo. Meglio chicchi dall’aspetto piuttosto opaco e dal profilo di tostatura equilibrato.',
              'Da Dersut, a Conegliano, la tostatura avviene in due fasi: una pre-tostatura a 150 °C e la tostatura principale tra 210 e 220 °C, seguita dal raffreddamento ad aria. Una selezione elettronica controlla poi il colore di ogni singolo chicco. Il risultato è una tostatura regolare, affidabile anche in macchina automatica.',
            ],
            list: [
              'Acquistare chicchi interi in una confezione ben richiudibile',
              'Verificare un colore di tostatura uniforme, senza una pellicola d’olio evidente',
              'Scegliere una miscela espresso pensata per crema e corpo',
              'Aprire una confezione alla volta invece di più insieme',
            ],
          },
          {
            h: 'Regolare la macinatura giusta',
            p: [
              'Per l’espresso dalla macchina automatica si consiglia una macinatura medio-fine o fine. Se è troppo grossa, l’acqua passa troppo in fretta: l’espresso risulta acquoso, acido e quasi senza crema. Se è troppo fine, l’estrazione si allunga e il caffè diventa amaro.',
              'Sulla maggior parte degli apparecchi la macinatura si regola solo con la macina in funzione e a piccoli scatti. Dopo ogni modifica prepari due o tre tazze prima di giudicare il gusto. Un buon riferimento: un espresso singolo di circa 25-30 ml dovrebbe scendere in 20-30 secondi.',
            ],
          },
          {
            h: 'Pulizia e manutenzione',
            p: [
              'Anche il chicco migliore perde sapore se il gruppo infusore e i condotti sono sporchi. I vecchi oli di caffè irrancidiscono e danno un retrogusto sgradevole. Segua i programmi di pulizia e decalcificazione del produttore e sciacqui regolarmente il gruppo sotto l’acqua corrente, se è estraibile.',
              'Riempia il contenitore solo con i chicchi che consuma in pochi giorni e richiuda bene la confezione. Conservi il resto in un luogo fresco, asciutto e al buio: gli aromi durano più a lungo e il contenitore resta pulito.',
            ],
          },
          {
            h: 'Quale miscela Dersut per la sua macchina?',
            p: [
              'Entrambe le miscele Dersut sono adatte alla macchina automatica, ma hanno caratteri diversi. Il [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg) è il tuttofare: una miscela di pregiate varietà Arabica e Robusta, crema persistente, corpo equilibrato, note di cacao e pasticceria, bassa acidità e finale lungo. Intensità 4 su 5, ottimo come espresso e nel cappuccino.',
              'Il [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg) è la scelta più decisa, intensità 5 su 5: aroma molto intenso, corpo rotondo, un accenno di prodotti da forno e un finale di frutta secca. Perfetto per chi ama l’espresso corposo e forte.',
            ],
          },
        ],
        faq: [
          [
            'Si può usare qualsiasi chicco nella macchina automatica?',
            'In linea di massima sì, ma le tostature molto scure e oleose possono intasare la macina. Una miscela espresso tostata in modo uniforme è la scelta più sicura.',
          ],
          [
            'Quale macinatura per la macchina automatica?',
            'Medio-fine o fine. La regoli a piccoli scatti e assaggi due o tre tazze dopo ogni modifica.',
          ],
          [
            'Quanto durano i chicchi dopo l’apertura?',
            'L’ideale è consumare una confezione aperta entro poche settimane, ben richiusa e conservata in luogo fresco, asciutto e al buio.',
          ],
          [
            'Optimum o Domus per le bevande con latte?',
            'Per cappuccino e latte macchiato l’Optimum Rosso è ideale grazie alla crema e alle note di cacao. Chi lo vuole molto deciso anche con il latte sceglie il Domus Marrone.',
          ],
        ],
        cta: 'Trovi il chicco giusto per la sua macchina automatica, nella confezione originale da 1 kg:',
      },
      en: {
        title: 'Coffee beans for bean-to-cup machines: how to choose',
        metaTitle: 'Coffee beans for bean-to-cup machines: a guide',
        metaDescription:
          'Which coffee beans suit a fully automatic machine? Roast, grind setting and cleaning explained simply, plus two Italian espresso blends compared side by side.',
        teaser:
          'Roast, oiliness, grind: what really matters when choosing beans for a fully automatic machine, and which blend fits you.',
        lead:
          'A fully automatic coffee machine does most of the work for you, but how good your espresso tastes depends largely on the beans in the hopper. Choosing the right coffee beans for a bean-to-cup machine means more crema, a rounder aroma and a grinder that lasts longer. This guide explains what to look for when buying, how to set the grind and which Dersut blend suits your taste.',
        sections: [
          {
            h: 'Why whole beans instead of ground coffee?',
            p: [
              'A fully automatic machine is built to grind every cup fresh. That is its biggest advantage: coffee loses its aroma very quickly once it is ground. Whole beans protect the oils and aromatic compounds inside until the grinder releases them right before brewing.',
              'Pre-ground coffee therefore usually tastes flatter and more bitter in a bean-to-cup machine. Whole beans also let you adjust the grind to your machine, which is impossible with ready-made powder.',
            ],
          },
          {
            h: 'Roast and oiliness: what matters',
            p: [
              'For a fully automatic machine, choose beans that are roasted carefully and evenly. Very dark beans with a shiny, oily surface can stick together in the hopper, feed poorly into the grinder and leave residue over time. Ideally, look for beans with a rather matt surface and a balanced roast profile.',
              'At Dersut in Conegliano, coffee is roasted in two stages: a pre-roast at 150 °C, then the main roast at 210 to 220 °C, followed by air cooling. Electronic colour sorting then checks every single bean. The result is an even roast that runs reliably in a bean-to-cup machine.',
            ],
            list: [
              'Buy whole beans in a pack that reseals well',
              'Look for an even roast colour without a heavy oily film',
              'Choose espresso blends designed for crema and body',
              'Open one pack at a time rather than several at once',
            ],
          },
          {
            h: 'Setting the right grind',
            p: [
              'For espresso from a fully automatic machine, a medium-fine to fine grind is recommended. If it is too coarse, the water runs through too fast: the espresso turns thin, sour and has hardly any crema. If it is too fine, extraction takes too long and the coffee tastes bitter.',
              'On most machines, change the grind only while the grinder is running and always in small steps. After each change, brew two or three cups before judging the taste. A useful benchmark: a single espresso of about 25 to 30 ml should take roughly 20 to 30 seconds.',
            ],
          },
          {
            h: 'Do not forget cleaning and care',
            p: [
              'Even the best beans will not taste good if the brewing unit and pipes are dirty. Old coffee oils turn rancid and give every espresso an unpleasant note. Follow your manufacturer’s cleaning and descaling programmes and rinse the brewing unit under clean water regularly if it is removable.',
              'Only fill the hopper with as many beans as you will use in a few days, and close the pack tightly afterwards. Store the rest somewhere cool, dry and dark. This keeps the aroma intact for longer and the hopper clean.',
            ],
          },
          {
            h: 'Which Dersut blend suits your machine?',
            p: [
              'Both Dersut blends work well in fully automatic machines, but they differ in character. [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg) is the all-rounder: a blend of popular Arabica and Robusta varieties with long-lasting crema, balanced body, notes of cocoa and pastry, low acidity and a long finish. With intensity 4 out of 5, it shines as a straight espresso and in a cappuccino or latte macchiato.',
              '[Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg) is the bolder choice at intensity 5 out of 5. It offers a very intense aroma, round body, a hint of baked goods and a finish of dried fruit. If you like your espresso full-bodied and strong, this is the one.',
            ],
          },
        ],
        faq: [
          [
            'Can I use any espresso beans in a fully automatic machine?',
            'In principle yes, but very oily, extremely dark roasts can clog the grinder. Evenly roasted espresso blends are the safer choice.',
          ],
          [
            'What grind setting is right for a bean-to-cup machine?',
            'Medium-fine to fine. Adjust it in small steps and test two or three cups after each change.',
          ],
          [
            'How long do opened coffee beans keep?',
            'Ideally, use an opened pack within a few weeks. Closed tightly and stored cool, dry and dark, the aroma lasts longest.',
          ],
          [
            'Optimum or Domus for milk drinks?',
            'For cappuccino and latte macchiato, Optimum Rosso is ideal thanks to its crema and cocoa notes. If you want a very strong taste even with milk, go for Domus Marrone.',
          ],
        ],
        cta: 'Find the right beans for your fully automatic machine, both blends in the original 1 kg pack:',
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* 2. Espresso zubereiten                                             */
  /* ------------------------------------------------------------------ */
  {
    slug: 'espresso-zubereiten',
    image: 'tazze',
    products: [OPTIMUM, DOMUS],
    published: '2026-10-12',
    text: {
      de: {
        title: 'Espresso zubereiten: der perfekte Espresso zu Hause',
        metaTitle: 'Espresso zubereiten: so gelingt er zu Hause',
        metaDescription:
          'Espresso zubereiten wie in Italien: Menge, Mahlgrad, Temperatur und Brühzeit für Siebträger, Moka und Vollautomat. Mit klaren Richtwerten für jede Tasse.',
        teaser:
          'Siebträger, Moka oder Vollautomat: mit diesen Richtwerten für Menge, Temperatur und Brühzeit gelingt Ihr Espresso wie in der Bar.',
        lead:
          'Ein guter Espresso ist kein Zufall. Er entsteht aus wenigen, aber wichtigen Faktoren: frisch gemahlene Bohnen, die richtige Menge, passendes Wasser und die richtige Brühzeit. Ob Sie einen Siebträger, eine Moka-Kanne oder einen Vollautomaten verwenden, mit den folgenden Richtwerten bereiten Sie den perfekten Espresso zu Hause zu, so wie man ihn in Italien kennt.',
        sections: [
          {
            h: 'Die Grundregeln für einen italienischen Espresso',
            p: [
              'Ein klassischer Espresso ist klein, konzentriert und trägt eine haselnussbraune Crema. Damit er gelingt, braucht es ein Zusammenspiel von Menge, Mahlgrad, Temperatur und Zeit. Wer diese vier Grössen kennt, kann jeden Fehler gezielt korrigieren.',
            ],
            list: [
              'Kaffeemenge: rund 7 g für einen einfachen, rund 14 g für einen doppelten Espresso',
              'Brühzeit: 20 bis 30 Sekunden',
              'Menge in der Tasse: etwa 25 bis 30 ml pro einfachem Espresso',
              'Wassertemperatur: 90 bis 94 °C',
              'Mahlgrad: fein, unmittelbar vor der Zubereitung gemahlen',
            ],
          },
          {
            h: 'Mit dem Siebträger: volle Kontrolle',
            p: [
              'Die Siebträgermaschine ist die Königsdisziplin. Mahlen Sie die Bohnen frisch und fein, füllen Sie die Menge in das Sieb und verteilen Sie das Pulver gleichmässig. Danach wird mit dem Tamper waagrecht und mit gleichbleibendem Druck angepresst. Ein schiefer oder lockerer Kaffeepuck führt dazu, dass das Wasser sich den leichtesten Weg sucht und der Espresso ungleichmässig extrahiert wird.',
              'Spannen Sie den Siebträger ein und starten Sie den Bezug sofort, damit das Pulver nicht auf der heissen Brühgruppe "verbrennt". Läuft der Espresso schneller als 20 Sekunden, mahlen Sie feiner. Dauert es deutlich länger als 30 Sekunden, mahlen Sie etwas gröber. Wärmen Sie zudem die Tassen vor, denn ein kalter Porzellanrand kühlt den Espresso sofort ab.',
            ],
          },
          {
            h: 'Mit der Moka-Kanne: der italienische Klassiker',
            p: [
              'In vielen italienischen Haushalten steht die Moka auf dem Herd. Sie erzeugt weniger Druck als eine Espressomaschine und liefert einen kräftigen, aromatischen Kaffee mit eigenem Charakter. Füllen Sie das untere Gefäss mit Wasser bis knapp unter das Ventil. Mit bereits heissem Wasser verkürzen Sie die Zeit auf dem Herd und vermeiden einen bitteren Geschmack.',
              'Den Trichter locker und randvoll mit Kaffee füllen, aber nicht anpressen. Für die Moka mahlt man etwas gröber als für den Siebträger. Stellen Sie die Kanne bei mittlerer Hitze auf und nehmen Sie sie vom Herd, sobald der Kaffee zu blubbern beginnt. So bleibt der Geschmack rund und angenehm.',
            ],
          },
          {
            h: 'Mit dem Vollautomaten: bequem und konstant',
            p: [
              'Der Vollautomat übernimmt Mahlen, Dosieren und Brühen. Damit der Espresso trotzdem italienisch schmeckt, stellen Sie den Mahlgrad mittelfein bis fein ein, wählen eine kleine Tassenmenge von etwa 25 bis 30 ml und eine hohe Kaffeestärke. Viele Geräte sind ab Werk auf grössere Mengen eingestellt, was den Espresso verwässert.',
              'Weitere Tipps zur Bohnenwahl und zur Einstellung lesen Sie in unserem Ratgeber [Kaffeebohnen für Vollautomat](/ratgeber/kaffeebohnen-vollautomat).',
            ],
          },
          {
            h: 'Frisch mahlen und richtig lagern',
            p: [
              'Der wichtigste Tipp für jede Zubereitungsart: Mahlen Sie erst kurz vor dem Brühen. Gemahlener Kaffee verliert innert Minuten einen grossen Teil seiner Aromen. Kaufen Sie deshalb ganze Bohnen und lagern Sie die Packung gut verschlossen, kühl, trocken und dunkel. Der Kühlschrank ist wegen der Feuchtigkeit und fremder Gerüche keine gute Wahl.',
              'Auch die Bohne selbst macht den Unterschied. Der [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg) mit Intensität 4 von 5 liefert eine lang anhaltende Crema, Noten von Kakao und Gebäck und eignet sich für Espresso und Cappuccino gleichermassen. Wer es kräftiger mag, wählt den [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg) mit Intensität 5 von 5, sehr intensivem Aroma und rundem Körper. Beide passen zu Siebträger, Moka und Vollautomat.',
            ],
          },
        ],
        faq: [
          [
            'Wie viel Kaffee braucht ein Espresso?',
            'Rund 7 g für einen einfachen und rund 14 g für einen doppelten Espresso. In der Tasse ergibt das etwa 25 bis 30 ml pro einfachem Espresso.',
          ],
          [
            'Warum ist mein Espresso sauer?',
            'Meist ist der Mahlgrad zu grob oder das Wasser zu kühl, sodass der Kaffee zu schnell durchläuft. Mahlen Sie feiner und achten Sie auf 90 bis 94 °C.',
          ],
          [
            'Warum schmeckt mein Espresso bitter?',
            'Häufig ist das Pulver zu fein, die Brühzeit zu lang oder die Maschine nicht sauber. Mahlen Sie etwas gröber und reinigen Sie Brühgruppe und Sieb regelmässig.',
          ],
          [
            'Welche Bohnen eignen sich für die Moka?',
            'Beide Dersut-Mischungen eignen sich für die Moka. Mahlen Sie dafür etwas gröber als für den Siebträger.',
          ],
        ],
        cta: 'Mit der richtigen Bohne beginnt der perfekte Espresso. Unsere Mischungen aus Conegliano:',
      },
      fr: {
        title: 'Préparer un espresso : l’espresso parfait à la maison',
        metaTitle: 'Préparer un espresso parfait à la maison',
        metaDescription:
          'Préparer un espresso comme en Italie : dose, mouture, température et temps d’extraction pour machine à levier, moka et automatique. Des repères clairs.',
        teaser:
          'Porte-filtre, moka ou machine automatique : avec ces repères de dose, de température et de temps, votre espresso sera digne d’un bar italien.',
        lead:
          'Un bon espresso n’est jamais le fruit du hasard. Il repose sur quelques facteurs essentiels : des grains fraîchement moulus, la bonne dose, une eau à la bonne température et un temps d’extraction maîtrisé. Que vous utilisiez une machine à porte-filtre, une cafetière moka ou une machine automatique, voici comment préparer un espresso parfait à la maison, comme en Italie.',
        sections: [
          {
            h: 'Les règles de base de l’espresso italien',
            p: [
              'Un espresso classique est court, concentré et coiffé d’une crème noisette. Pour le réussir, il faut faire jouer ensemble la dose, la mouture, la température et le temps. En connaissant ces quatre paramètres, vous pouvez corriger chaque défaut de façon ciblée.',
            ],
            list: [
              'Dose : environ 7 g pour un espresso simple, environ 14 g pour un double',
              'Temps d’extraction : 20 à 30 secondes',
              'Volume en tasse : environ 25 à 30 ml par espresso simple',
              'Température de l’eau : 90 à 94 °C',
              'Mouture : fine, moulue juste avant la préparation',
            ],
          },
          {
            h: 'Avec le porte-filtre : le contrôle total',
            p: [
              'La machine à porte-filtre est la discipline reine. Moulez les grains finement et à la minute, versez la dose dans le filtre et répartissez la mouture de manière homogène. Tassez ensuite bien à plat, avec une pression constante. Une galette inclinée ou trop lâche laisse l’eau emprunter le chemin le plus facile et l’extraction devient irrégulière.',
              'Fixez le porte-filtre et lancez l’extraction aussitôt, pour que la mouture ne chauffe pas inutilement sur le groupe. Si l’espresso coule en moins de 20 secondes, moulez plus fin. S’il dépasse nettement 30 secondes, moulez un peu plus gros. Pensez aussi à préchauffer les tasses : une porcelaine froide refroidit l’espresso immédiatement.',
            ],
          },
          {
            h: 'Avec la moka : le grand classique italien',
            p: [
              'Dans de nombreux foyers italiens, la moka trône sur la cuisinière. Elle produit moins de pression qu’une machine à espresso et donne un café corsé et aromatique, au caractère bien à lui. Remplissez la base d’eau jusqu’à juste sous la soupape. Avec de l’eau déjà chaude, vous réduisez le temps sur le feu et évitez l’amertume.',
              'Remplissez l’entonnoir de café à ras bord, sans tasser. Pour la moka, la mouture doit être un peu plus grossière que pour le porte-filtre. Placez la cafetière sur feu moyen et retirez-la dès que le café commence à gargouiller : le goût reste rond et agréable.',
            ],
          },
          {
            h: 'Avec la machine automatique : simple et régulier',
            p: [
              'La machine automatique se charge de moudre, doser et extraire. Pour un goût vraiment italien, réglez la mouture moyennement fine à fine, choisissez un petit volume d’environ 25 à 30 ml et une intensité élevée. Beaucoup d’appareils sont réglés d’usine sur des volumes plus grands, ce qui dilue l’espresso.',
              'Pour aller plus loin sur le choix des grains et les réglages, lisez notre guide [grains de café pour machine automatique](/ratgeber/kaffeebohnen-vollautomat).',
            ],
          },
          {
            h: 'Moudre frais et bien conserver',
            p: [
              'Le conseil le plus important, quelle que soit la méthode : moulez juste avant l’extraction. Le café moulu perd une grande partie de ses arômes en quelques minutes. Achetez donc des grains entiers et conservez le paquet bien fermé, au frais, au sec et à l’abri de la lumière. Le réfrigérateur n’est pas idéal à cause de l’humidité et des odeurs.',
              'Le grain fait lui aussi la différence. Le [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg), intensité 4 sur 5, offre une crème persistante, des notes de cacao et de pâtisserie et convient aussi bien à l’espresso qu’au cappuccino. Si vous l’aimez plus corsé, choisissez le [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg), intensité 5 sur 5, à l’arôme très intense et au corps rond. Les deux conviennent au porte-filtre, à la moka et à la machine automatique.',
            ],
          },
        ],
        faq: [
          [
            'Combien de café pour un espresso ?',
            'Environ 7 g pour un simple et environ 14 g pour un double. En tasse, cela donne environ 25 à 30 ml par espresso simple.',
          ],
          [
            'Pourquoi mon espresso est-il acide ?',
            'Le plus souvent, la mouture est trop grossière ou l’eau pas assez chaude, et le café coule trop vite. Moulez plus fin et visez 90 à 94 °C.',
          ],
          [
            'Pourquoi mon espresso est-il amer ?',
            'Souvent, la mouture est trop fine, l’extraction trop longue ou la machine pas assez propre. Moulez un peu plus gros et nettoyez régulièrement groupe et filtre.',
          ],
          [
            'Quels grains pour la moka ?',
            'Les deux mélanges Dersut conviennent à la moka. Choisissez simplement une mouture un peu plus grossière que pour le porte-filtre.',
          ],
        ],
        cta: 'L’espresso parfait commence par le bon grain. Nos mélanges de Conegliano :',
      },
      it: {
        title: 'Preparare l’espresso: l’espresso perfetto a casa',
        metaTitle: 'Preparare l’espresso perfetto a casa',
        metaDescription:
          'Preparare l’espresso come al bar: dose, macinatura, temperatura e tempo di estrazione per macchina a leva, moka e automatica. Con valori chiari per ogni tazza.',
        teaser:
          'Portafiltro, moka o macchina automatica: con questi valori di dose, temperatura e tempo il suo espresso sarà come al bar.',
        lead:
          'Un buon espresso non nasce per caso. Dipende da pochi fattori, ma decisivi: chicchi macinati al momento, la dose giusta, acqua alla temperatura corretta e un tempo di estrazione preciso. Che usi una macchina a portafiltro, una moka o una macchina automatica, ecco come preparare l’espresso perfetto a casa, proprio come in Italia.',
        sections: [
          {
            h: 'Le regole base dell’espresso italiano',
            p: [
              'Un espresso classico è corto, concentrato e ricoperto da una crema color nocciola. Per ottenerlo servono dose, macinatura, temperatura e tempo in equilibrio. Conoscendo questi quattro parametri si può correggere ogni difetto in modo mirato.',
            ],
            list: [
              'Dose: circa 7 g per un espresso singolo, circa 14 g per un doppio',
              'Tempo di estrazione: da 20 a 30 secondi',
              'Quantità in tazza: circa 25-30 ml per espresso singolo',
              'Temperatura dell’acqua: da 90 a 94 °C',
              'Macinatura: fine, appena prima della preparazione',
            ],
          },
          {
            h: 'Con il portafiltro: il massimo controllo',
            p: [
              'La macchina a portafiltro è la regina. Macini i chicchi fini e al momento, versi la dose nel filtro e distribuisca la polvere in modo uniforme. Poi pressi con il tamper, ben in piano e con pressione costante. Una pastiglia inclinata o troppo lenta lascia all’acqua la via più facile e l’estrazione diventa irregolare.',
              'Agganci il portafiltro e avvii subito l’erogazione, così la polvere non resta a scaldarsi sul gruppo. Se l’espresso scende in meno di 20 secondi, macini più fine; se supera di molto i 30 secondi, macini un po’ più grosso. Ricordi anche di scaldare le tazzine: la porcellana fredda raffredda subito l’espresso.',
            ],
          },
          {
            h: 'Con la moka: il classico di casa',
            p: [
              'In molte case italiane la moka è sempre sul fornello. Lavora con meno pressione di una macchina espresso e regala un caffè intenso e aromatico, con un carattere tutto suo. Riempia la caldaia d’acqua fino appena sotto la valvola. Usando acqua già calda si accorcia il tempo sul fuoco e si evita l’amaro.',
              'Riempia il filtro di caffè fino all’orlo, senza pressare. Per la moka la macinatura deve essere un po’ più grossa che per il portafiltro. Metta la moka su fuoco medio e la tolga appena il caffè inizia a borbottare: il gusto resta rotondo e piacevole.',
            ],
          },
          {
            h: 'Con la macchina automatica: comoda e costante',
            p: [
              'La macchina automatica macina, dosa ed estrae da sola. Per un gusto davvero italiano, regoli la macinatura medio-fine o fine, scelga una quantità ridotta di circa 25-30 ml e un’intensità alta. Molti apparecchi sono impostati di fabbrica su quantità maggiori, che diluiscono l’espresso.',
              'Altri consigli su chicchi e regolazioni li trova nella nostra guida [caffè in grani per macchina automatica](/ratgeber/kaffeebohnen-vollautomat).',
            ],
          },
          {
            h: 'Macinare fresco e conservare bene',
            p: [
              'Il consiglio più importante, con qualsiasi metodo: macini solo poco prima dell’estrazione. Il caffè macinato perde gran parte degli aromi in pochi minuti. Acquisti quindi chicchi interi e conservi la confezione ben chiusa, in luogo fresco, asciutto e al buio. Il frigorifero non è adatto per via dell’umidità e degli odori.',
              'Anche il chicco fa la differenza. Il [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg), intensità 4 su 5, offre una crema persistente, note di cacao e pasticceria ed è adatto sia all’espresso sia al cappuccino. Chi lo preferisce più deciso sceglie il [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg), intensità 5 su 5, dall’aroma molto intenso e dal corpo rotondo. Entrambi vanno bene per portafiltro, moka e macchina automatica.',
            ],
          },
        ],
        faq: [
          [
            'Quanto caffè serve per un espresso?',
            'Circa 7 g per un singolo e circa 14 g per un doppio. In tazza si ottengono circa 25-30 ml per espresso singolo.',
          ],
          [
            'Perché il mio espresso è acido?',
            'Di solito la macinatura è troppo grossa o l’acqua non abbastanza calda, e il caffè scende troppo in fretta. Macini più fine e punti a 90-94 °C.',
          ],
          [
            'Perché il mio espresso è amaro?',
            'Spesso la polvere è troppo fine, l’estrazione troppo lunga o la macchina poco pulita. Macini un po’ più grosso e pulisca regolarmente gruppo e filtro.',
          ],
          [
            'Quali chicchi per la moka?',
            'Entrambe le miscele Dersut sono adatte alla moka. Basta macinare un po’ più grosso che per il portafiltro.',
          ],
        ],
        cta: 'L’espresso perfetto inizia dal chicco giusto. Le nostre miscele di Conegliano:',
      },
      en: {
        title: 'How to make espresso: the perfect espresso at home',
        metaTitle: 'How to make perfect espresso at home',
        metaDescription:
          'Make espresso like in Italy: dose, grind, temperature and brew time for portafilter, moka pot and bean-to-cup machine. Clear benchmarks for every single cup.',
        teaser:
          'Portafilter, moka pot or bean-to-cup machine: with these benchmarks for dose, temperature and time, your espresso will taste like an Italian bar.',
        lead:
          'A good espresso is never an accident. It comes down to a few key factors: freshly ground beans, the right dose, water at the right temperature and a controlled brew time. Whether you use a portafilter machine, a moka pot or a fully automatic machine, here is how to make the perfect espresso at home, just as it is made in Italy.',
        sections: [
          {
            h: 'The basic rules of Italian espresso',
            p: [
              'A classic espresso is short, concentrated and topped with a hazelnut-coloured crema. Getting it right means balancing dose, grind, temperature and time. Once you know these four variables, you can fix any problem in a targeted way.',
            ],
            list: [
              'Dose: about 7 g for a single, about 14 g for a double espresso',
              'Brew time: 20 to 30 seconds',
              'Volume in the cup: about 25 to 30 ml per single espresso',
              'Water temperature: 90 to 94 °C',
              'Grind: fine, ground right before brewing',
            ],
          },
          {
            h: 'With a portafilter: full control',
            p: [
              'The portafilter machine is the master class. Grind your beans fine and fresh, put the dose into the basket and distribute the grounds evenly. Then tamp level, with consistent pressure. A tilted or loose puck lets the water find the easiest path and the espresso extracts unevenly.',
              'Lock in the portafilter and start brewing straight away so the grounds do not sit on the hot group head. If the espresso runs faster than 20 seconds, grind finer. If it takes well over 30 seconds, grind a little coarser. Warm your cups too: a cold porcelain rim cools the espresso instantly.',
            ],
          },
          {
            h: 'With a moka pot: the Italian classic',
            p: [
              'In many Italian homes, the moka pot sits on the stove. It builds less pressure than an espresso machine and makes a strong, aromatic coffee with a character of its own. Fill the bottom chamber with water to just below the valve. Using water that is already hot shortens the time on the stove and helps avoid bitterness.',
              'Fill the funnel with coffee to the brim, but do not press it down. Grind a little coarser for the moka than for a portafilter. Place the pot on medium heat and take it off as soon as the coffee starts to gurgle. That keeps the taste round and pleasant.',
            ],
          },
          {
            h: 'With a bean-to-cup machine: easy and consistent',
            p: [
              'A fully automatic machine grinds, doses and brews for you. For a truly Italian taste, set the grind to medium-fine or fine, choose a small cup volume of about 25 to 30 ml and a high strength setting. Many machines come set to larger volumes from the factory, which waters the espresso down.',
              'For more tips on choosing beans and adjusting settings, read our guide [coffee beans for bean-to-cup machines](/ratgeber/kaffeebohnen-vollautomat).',
            ],
          },
          {
            h: 'Grind fresh and store properly',
            p: [
              'The most important tip for every method: grind only shortly before brewing. Ground coffee loses much of its aroma within minutes. So buy whole beans and keep the pack tightly closed, cool, dry and dark. The fridge is not a good place because of moisture and other smells.',
              'The bean itself makes a difference too. [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg), intensity 4 out of 5, delivers long-lasting crema and notes of cocoa and pastry, and works equally well for espresso and cappuccino. If you like it stronger, choose [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg), intensity 5 out of 5, with a very intense aroma and round body. Both suit portafilter, moka pot and bean-to-cup machine.',
            ],
          },
        ],
        faq: [
          [
            'How much coffee do I need for one espresso?',
            'About 7 g for a single and about 14 g for a double. That gives roughly 25 to 30 ml in the cup per single espresso.',
          ],
          [
            'Why does my espresso taste sour?',
            'Usually the grind is too coarse or the water is not hot enough, so the coffee runs through too fast. Grind finer and aim for 90 to 94 °C.',
          ],
          [
            'Why does my espresso taste bitter?',
            'Often the grind is too fine, the brew time too long or the machine not clean. Grind a little coarser and clean the group head and basket regularly.',
          ],
          [
            'Which beans work in a moka pot?',
            'Both Dersut blends work well in a moka pot. Just grind a little coarser than for a portafilter.',
          ],
        ],
        cta: 'The perfect espresso starts with the right beans. Our blends from Conegliano:',
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* 3. Optimum oder Domus                                              */
  /* ------------------------------------------------------------------ */
  {
    slug: 'optimum-oder-domus',
    image: 'caffe',
    products: [OPTIMUM, DOMUS],
    published: '2026-10-12',
    text: {
      de: {
        title: 'Dersut Optimum oder Domus? Espressobohnen im Vergleich',
        metaTitle: 'Dersut Optimum oder Domus: Espressobohnen im Vergleich',
        metaDescription:
          'Dersut Optimum Rosso oder Domus Marrone? Geschmack, Intensität, Preis und Eignung für Cappuccino oder puren Espresso im Vergleich. So wählen Sie richtig.',
        teaser:
          'Ausgewogener Allrounder oder kräftiger Charakter: der direkte Vergleich der beiden Dersut-Mischungen hilft Ihnen bei der Wahl.',
        lead:
          'Optimum Rosso und Domus Marrone sind die beiden Klassiker unter den Dersut-Espressomischungen in der 1-kg-Packung. Beide stammen aus der Familienrösterei in Conegliano, die seit 1947 Kaffee röstet, und beide eignen sich für Vollautomat, Siebträger und Moka. Trotzdem schmecken sie deutlich verschieden. Dieser Vergleich zeigt, welche Bohne zu Ihnen passt.',
        sections: [
          {
            h: 'Gemeinsamkeiten: gleiche Herkunft, gleiche Sorgfalt',
            p: [
              'Beide Mischungen werden in Conegliano im Veneto in zwei Stufen geröstet: zuerst eine Vorröstung bei 150 °C, dann die Hauptröstung bei 210 bis 220 °C, gefolgt von einer Kühlung mit Luft. Eine elektronische Farbsortierung prüft jede Bohne einzeln. Dersut trägt die Zertifizierungen "Espresso Italiano Certificato" und "Espresso Italiano di Qualità".',
              'Beide werden als ganze Bohnen in der Originalpackung zu 1 kg verkauft und eignen sich für alle gängigen Zubereitungsarten. Im Vollautomaten empfiehlt sich ein mittelfeiner bis feiner Mahlgrad.',
            ],
          },
          {
            h: 'Dersut Optimum Rosso: der ausgewogene Allrounder',
            p: [
              'Der Optimum Rosso ist eine Mischung aus beliebten Arabica- und Robusta-Sorten. Er überzeugt mit lang anhaltender Crema, ausgewogenem Körper und Noten von Kakao und Gebäck. Die Säure ist gering, der Abgang lang. Mit Intensität 4 von 5 ist er kräftig genug für einen echten italienischen Espresso, bleibt aber harmonisch.',
              'Seine Stärke ist die Vielseitigkeit: Pur als Espresso schmeckt er rund, im Cappuccino oder Latte macchiato setzt er sich dank Crema und Kakaonoten gut gegen die Milch durch. Wer im Haushalt unterschiedliche Vorlieben hat, liegt mit dem [Optimum Rosso](/shop/dersut-optimum-rosso-1kg) fast immer richtig.',
            ],
          },
          {
            h: 'Dersut Domus Marrone: kräftig und entschieden',
            p: [
              'Der Domus Marrone ist eine Mischung aus Robusta und Arabica mit sehr intensivem Aroma. Er hat einen runden Körper, einen Hauch von Backwaren und einen Abgang von getrockneten Früchten. Sein Charakter ist stark und entschieden, die Intensität liegt bei 5 von 5.',
              'Er richtet sich an alle, die ihren Espresso vollmundig und kräftig mögen, so wie er in vielen Bars in Italien serviert wird. Auch als Ristretto oder im Macchiato mit wenig Milch kommt sein Charakter gut zur Geltung. Zudem ist der [Domus Marrone](/shop/dersut-domus-marrone-1kg) die etwas günstigere der beiden Mischungen.',
            ],
          },
          {
            h: 'Der Vergleich auf einen Blick',
            p: ['Die wichtigsten Unterschiede zwischen den beiden Espressobohnen im Überblick:'],
            list: [
              'Mischung: Optimum Rosso aus beliebten Arabica- und Robusta-Sorten; Domus Marrone aus Robusta und Arabica',
              'Intensität: Optimum 4 von 5; Domus 5 von 5',
              'Aroma: Optimum mit Kakao und Gebäck; Domus sehr intensiv mit Backwaren und getrockneten Früchten',
              'Körper und Säure: Optimum ausgewogen mit geringer Säure; Domus rund und kräftig',
              'Ideal für: Optimum für Espresso und Milchgetränke; Domus für starken, puren Espresso',
              'Preis: Optimum CHF 29.90 pro kg; Domus CHF 26.90 pro kg',
            ],
          },
          {
            h: 'Welche Bohne passt zu Ihnen?',
            p: [
              'Trinken Sie oft Cappuccino, Latte macchiato oder Café crème, oder teilen sich mehrere Personen mit unterschiedlichem Geschmack eine Maschine, dann ist der Optimum Rosso die sichere Wahl. Er ist ausgewogen, mild in der Säure und trotzdem ausdrucksstark.',
              'Trinken Sie vor allem kurzen, puren Espresso und darf es richtig kräftig sein, dann wählen Sie den Domus Marrone. Unser Tipp: Wer unsicher ist, bestellt beide Sorten und probiert sie direkt nebeneinander. Mit vier Packungen erreichen Sie zudem die Grenze für den kostenlosen Versand innerhalb der Schweiz.',
            ],
          },
        ],
        faq: [
          [
            'Welche Dersut-Bohne ist stärker?',
            'Der Domus Marrone ist mit Intensität 5 von 5 die kräftigere Mischung. Der Optimum Rosso liegt bei 4 von 5.',
          ],
          [
            'Welche Mischung ist besser für Cappuccino?',
            'Der Optimum Rosso, dank lang anhaltender Crema, ausgewogenem Körper und Noten von Kakao und Gebäck. Wer es auch mit Milch sehr intensiv mag, kann den Domus nehmen.',
          ],
          [
            'Sind beide Sorten für den Vollautomaten geeignet?',
            'Ja. Beide eignen sich für Vollautomat, Siebträger und Moka. Im Vollautomaten empfiehlt sich ein mittelfeiner bis feiner Mahlgrad.',
          ],
          [
            'Was kosten die beiden Sorten?',
            'Der Optimum Rosso kostet CHF 29.90, der Domus Marrone CHF 26.90, jeweils für 1 kg ganze Bohnen.',
          ],
        ],
        cta: 'Entscheiden Sie selbst oder probieren Sie beide im direkten Vergleich:',
      },
      fr: {
        title: 'Dersut Optimum ou Domus ? Comparatif des grains espresso',
        metaTitle: 'Dersut Optimum ou Domus : comparatif grains espresso',
        metaDescription:
          'Dersut Optimum Rosso ou Domus Marrone ? Goût, intensité, prix et usage pour cappuccino ou espresso pur comparés côte à côte. Choisissez le bon mélange.',
        teaser:
          'Polyvalent équilibré ou caractère corsé : ce comparatif des deux mélanges Dersut vous aide à faire le bon choix.',
        lead:
          'L’Optimum Rosso et le Domus Marrone sont les deux classiques parmi les mélanges espresso Dersut en paquet de 1 kg. Tous deux viennent de la torréfaction familiale de Conegliano, active depuis 1947, et conviennent à la machine automatique, au porte-filtre et à la moka. Leur goût est pourtant bien différent. Ce comparatif vous montre lequel vous correspond.',
        sections: [
          {
            h: 'Points communs : même origine, même soin',
            p: [
              'Les deux mélanges sont torréfiés à Conegliano, en Vénétie, en deux étapes : une pré-torréfaction à 150 °C, puis la torréfaction principale entre 210 et 220 °C, suivie d’un refroidissement à l’air. Une sélection électronique contrôle la couleur de chaque grain. Dersut est certifié "Espresso Italiano Certificato" et "Espresso Italiano di Qualità".',
              'Les deux sont vendus en grains entiers, en paquet original de 1 kg, et conviennent à toutes les préparations courantes. En machine automatique, une mouture moyennement fine à fine est recommandée.',
            ],
          },
          {
            h: 'Dersut Optimum Rosso : le polyvalent équilibré',
            p: [
              'L’Optimum Rosso est un mélange de variétés Arabica et Robusta appréciées. Il séduit par une crème persistante, un corps équilibré et des notes de cacao et de pâtisserie. L’acidité est faible, la finale longue. Avec une intensité de 4 sur 5, il est assez corsé pour un véritable espresso italien tout en restant harmonieux.',
              'Sa force, c’est la polyvalence : en espresso, il est rond ; en cappuccino ou en latte macchiato, sa crème et ses notes de cacao s’affirment face au lait. Si plusieurs goûts cohabitent à la maison, l’[Optimum Rosso](/shop/dersut-optimum-rosso-1kg) met presque tout le monde d’accord.',
            ],
          },
          {
            h: 'Dersut Domus Marrone : corsé et affirmé',
            p: [
              'Le Domus Marrone est un mélange de Robusta et d’Arabica à l’arôme très intense. Il offre un corps rond, une touche de viennoiserie et une finale de fruits secs. Son caractère est fort et décidé, avec une intensité de 5 sur 5.',
              'Il s’adresse à ceux qui aiment l’espresso généreux et puissant, comme dans de nombreux bars en Italie. En ristretto ou en macchiato avec peu de lait, son caractère ressort très bien. De plus, le [Domus Marrone](/shop/dersut-domus-marrone-1kg) est le moins cher des deux mélanges.',
            ],
          },
          {
            h: 'Le comparatif en un coup d’œil',
            p: ['Les principales différences entre les deux grains espresso :'],
            list: [
              'Mélange : Optimum Rosso, variétés Arabica et Robusta appréciées ; Domus Marrone, Robusta et Arabica',
              'Intensité : Optimum 4 sur 5 ; Domus 5 sur 5',
              'Arômes : Optimum cacao et pâtisserie ; Domus très intense, viennoiserie et fruits secs',
              'Corps et acidité : Optimum équilibré, faible acidité ; Domus rond et puissant',
              'Idéal pour : Optimum pour l’espresso et les boissons lactées ; Domus pour un espresso pur et corsé',
              'Prix : Optimum CHF 29.90 le kg ; Domus CHF 26.90 le kg',
            ],
          },
          {
            h: 'Quel grain vous convient ?',
            p: [
              'Vous buvez souvent cappuccino, latte macchiato ou café crème, ou plusieurs personnes aux goûts différents partagent la même machine ? L’Optimum Rosso est le choix sûr : équilibré, peu acide et pourtant expressif.',
              'Vous buvez surtout des espressos courts et purs, et vous les aimez vraiment corsés ? Optez pour le Domus Marrone. Notre conseil : en cas de doute, commandez les deux et goûtez-les côte à côte. Avec quatre paquets, vous atteignez en plus le seuil de livraison gratuite en Suisse.',
            ],
          },
        ],
        faq: [
          [
            'Quel grain Dersut est le plus corsé ?',
            'Le Domus Marrone, avec une intensité de 5 sur 5. L’Optimum Rosso se situe à 4 sur 5.',
          ],
          [
            'Quel mélange pour le cappuccino ?',
            'L’Optimum Rosso, grâce à sa crème persistante, son corps équilibré et ses notes de cacao et de pâtisserie. Pour un goût très intense même avec du lait, le Domus convient aussi.',
          ],
          [
            'Les deux conviennent-ils à une machine automatique ?',
            'Oui. Tous deux conviennent à la machine automatique, au porte-filtre et à la moka. En machine automatique, choisissez une mouture moyennement fine à fine.',
          ],
          [
            'Quel est le prix des deux mélanges ?',
            'L’Optimum Rosso coûte CHF 29.90 et le Domus Marrone CHF 26.90, pour 1 kg de grains entiers.',
          ],
        ],
        cta: 'Faites votre choix ou goûtez les deux côte à côte :',
      },
      it: {
        title: 'Dersut Optimum o Domus? Confronto tra caffè in grani',
        metaTitle: 'Dersut Optimum o Domus: confronto caffè in grani',
        metaDescription:
          'Dersut Optimum Rosso o Domus Marrone? Gusto, intensità, prezzo e uso per cappuccino o espresso puro a confronto diretto. Ecco come scegliere la miscela giusta.',
        teaser:
          'Tuttofare equilibrato o carattere deciso: il confronto diretto tra le due miscele Dersut la aiuta a scegliere.',
        lead:
          'L’Optimum Rosso e il Domus Marrone sono i due classici tra le miscele espresso Dersut in confezione da 1 kg. Entrambe nascono nella torrefazione di famiglia di Conegliano, attiva dal 1947, ed entrambe sono adatte a macchina automatica, portafiltro e moka. Eppure il gusto è molto diverso. Questo confronto le mostra quale fa per lei.',
        sections: [
          {
            h: 'Cosa le accomuna: stessa origine, stessa cura',
            p: [
              'Entrambe le miscele sono tostate a Conegliano, in Veneto, in due fasi: una pre-tostatura a 150 °C e la tostatura principale tra 210 e 220 °C, seguita dal raffreddamento ad aria. Una selezione elettronica controlla il colore di ogni chicco. Dersut ha le certificazioni "Espresso Italiano Certificato" ed "Espresso Italiano di Qualità".',
              'Entrambe sono vendute in grani interi, nella confezione originale da 1 kg, e sono adatte a tutti i metodi di preparazione più diffusi. In macchina automatica si consiglia una macinatura medio-fine o fine.',
            ],
          },
          {
            h: 'Dersut Optimum Rosso: il tuttofare equilibrato',
            p: [
              'L’Optimum Rosso è una miscela di pregiate varietà Arabica e Robusta. Convince con una crema persistente, un corpo equilibrato e note di cacao e pasticceria. L’acidità è bassa, il finale lungo. Con intensità 4 su 5 è abbastanza deciso per un vero espresso italiano, restando armonioso.',
              'Il suo punto di forza è la versatilità: come espresso è rotondo, nel cappuccino o nel latte macchiato la crema e le note di cacao si fanno sentire anche con il latte. Se in casa ci sono gusti diversi, l’[Optimum Rosso](/shop/dersut-optimum-rosso-1kg) mette d’accordo quasi tutti.',
            ],
          },
          {
            h: 'Dersut Domus Marrone: deciso e corposo',
            p: [
              'Il Domus Marrone è una miscela di Robusta e Arabica dall’aroma molto intenso. Ha un corpo rotondo, un accenno di prodotti da forno e un finale di frutta secca. Il carattere è forte e deciso, con intensità 5 su 5.',
              'È pensato per chi ama l’espresso corposo e forte, come lo servono tanti bar in Italia. Anche come ristretto o nel macchiato con poco latte esprime bene il suo carattere. Inoltre il [Domus Marrone](/shop/dersut-domus-marrone-1kg) è la più conveniente delle due miscele.',
            ],
          },
          {
            h: 'Il confronto in breve',
            p: ['Le differenze principali tra i due caffè in grani:'],
            list: [
              'Miscela: Optimum Rosso con pregiate varietà Arabica e Robusta; Domus Marrone con Robusta e Arabica',
              'Intensità: Optimum 4 su 5; Domus 5 su 5',
              'Aroma: Optimum con cacao e pasticceria; Domus molto intenso, con prodotti da forno e frutta secca',
              'Corpo e acidità: Optimum equilibrato, bassa acidità; Domus rotondo e deciso',
              'Ideale per: Optimum per espresso e bevande con latte; Domus per espresso puro e forte',
              'Prezzo: Optimum CHF 29.90 al kg; Domus CHF 26.90 al kg',
            ],
          },
          {
            h: 'Quale chicco fa per lei?',
            p: [
              'Beve spesso cappuccino, latte macchiato o caffè crema, oppure più persone con gusti diversi usano la stessa macchina? Allora l’Optimum Rosso è la scelta sicura: equilibrato, poco acido e comunque espressivo.',
              'Beve soprattutto espresso corto e puro, e lo vuole davvero forte? Scelga il Domus Marrone. Il nostro consiglio: se è indeciso, ordini entrambe le miscele e le assaggi una accanto all’altra. Con quattro confezioni raggiunge anche la soglia per la spedizione gratuita in Svizzera.',
            ],
          },
        ],
        faq: [
          [
            'Quale chicco Dersut è più forte?',
            'Il Domus Marrone, con intensità 5 su 5. L’Optimum Rosso si colloca a 4 su 5.',
          ],
          [
            'Quale miscela è migliore per il cappuccino?',
            'L’Optimum Rosso, grazie alla crema persistente, al corpo equilibrato e alle note di cacao e pasticceria. Chi lo vuole molto intenso anche con il latte può scegliere il Domus.',
          ],
          [
            'Entrambe sono adatte alla macchina automatica?',
            'Sì. Entrambe vanno bene per macchina automatica, portafiltro e moka. In macchina automatica si consiglia una macinatura medio-fine o fine.',
          ],
          [
            'Quanto costano le due miscele?',
            'L’Optimum Rosso costa CHF 29.90, il Domus Marrone CHF 26.90, entrambi per 1 kg di chicchi interi.',
          ],
        ],
        cta: 'Scelga la sua miscela o le assaggi entrambe a confronto:',
      },
      en: {
        title: 'Dersut Optimum or Domus? Espresso beans compared',
        metaTitle: 'Dersut Optimum vs Domus: espresso beans compared',
        metaDescription:
          'Dersut Optimum Rosso or Domus Marrone? Taste, intensity, price and suitability for cappuccino or straight espresso compared side by side, so you choose right.',
        teaser:
          'Balanced all-rounder or bold character: a direct comparison of the two Dersut blends to help you decide.',
        lead:
          'Optimum Rosso and Domus Marrone are the two classics among Dersut’s espresso blends in 1 kg packs. Both come from the family roastery in Conegliano, roasting coffee since 1947, and both work in bean-to-cup machines, portafilter machines and moka pots. Yet they taste noticeably different. This comparison shows which beans suit you.',
        sections: [
          {
            h: 'What they share: same origin, same care',
            p: [
              'Both blends are roasted in Conegliano in the Veneto region in two stages: a pre-roast at 150 °C, then the main roast at 210 to 220 °C, followed by air cooling. Electronic colour sorting checks every bean individually. Dersut holds the certifications "Espresso Italiano Certificato" and "Espresso Italiano di Qualità".',
              'Both are sold as whole beans in the original 1 kg pack and suit all common brewing methods. In a fully automatic machine, a medium-fine to fine grind is recommended.',
            ],
          },
          {
            h: 'Dersut Optimum Rosso: the balanced all-rounder',
            p: [
              'Optimum Rosso is a blend of popular Arabica and Robusta varieties. It impresses with long-lasting crema, balanced body and notes of cocoa and pastry. Acidity is low and the finish is long. At intensity 4 out of 5, it is strong enough for a genuine Italian espresso while staying harmonious.',
              'Its strength is versatility: as a straight espresso it tastes round, and in a cappuccino or latte macchiato its crema and cocoa notes hold their own against the milk. If your household has different tastes, [Optimum Rosso](/shop/dersut-optimum-rosso-1kg) is almost always the right call.',
            ],
          },
          {
            h: 'Dersut Domus Marrone: bold and decisive',
            p: [
              'Domus Marrone is a blend of Robusta and Arabica with a very intense aroma. It has a round body, a hint of baked goods and a finish of dried fruit. Its character is strong and decisive, with intensity 5 out of 5.',
              'It is made for anyone who likes espresso full-bodied and strong, the way many bars in Italy serve it. Its character also comes through well as a ristretto or in a macchiato with a little milk. On top of that, [Domus Marrone](/shop/dersut-domus-marrone-1kg) is the slightly more affordable of the two blends.',
            ],
          },
          {
            h: 'The comparison at a glance',
            p: ['The key differences between the two espresso beans:'],
            list: [
              'Blend: Optimum Rosso, popular Arabica and Robusta varieties; Domus Marrone, Robusta and Arabica',
              'Intensity: Optimum 4 out of 5; Domus 5 out of 5',
              'Aroma: Optimum with cocoa and pastry; Domus very intense with baked goods and dried fruit',
              'Body and acidity: Optimum balanced with low acidity; Domus round and powerful',
              'Best for: Optimum for espresso and milk drinks; Domus for strong, straight espresso',
              'Price: Optimum CHF 29.90 per kg; Domus CHF 26.90 per kg',
            ],
          },
          {
            h: 'Which beans are right for you?',
            p: [
              'If you often drink cappuccino, latte macchiato or café crème, or several people with different tastes share one machine, Optimum Rosso is the safe choice. It is balanced, low in acidity and still expressive.',
              'If you mostly drink short, straight espresso and like it really strong, choose Domus Marrone. Our tip: if you are unsure, order both and taste them side by side. With four packs you also reach the threshold for free shipping within Switzerland.',
            ],
          },
        ],
        faq: [
          [
            'Which Dersut beans are stronger?',
            'Domus Marrone is the bolder blend at intensity 5 out of 5. Optimum Rosso sits at 4 out of 5.',
          ],
          [
            'Which blend is better for cappuccino?',
            'Optimum Rosso, thanks to its long-lasting crema, balanced body and notes of cocoa and pastry. If you want a very intense taste even with milk, Domus works too.',
          ],
          [
            'Are both blends suitable for bean-to-cup machines?',
            'Yes. Both suit fully automatic machines, portafilter machines and moka pots. In a bean-to-cup machine, use a medium-fine to fine grind.',
          ],
          [
            'How much do the two blends cost?',
            'Optimum Rosso costs CHF 29.90 and Domus Marrone CHF 26.90, each for 1 kg of whole beans.',
          ],
        ],
        cta: 'Make your choice, or taste both side by side:',
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* 4. Kaffeebohnen kaufen Schweiz                                     */
  /* ------------------------------------------------------------------ */
  {
    slug: 'kaffeebohnen-kaufen-schweiz',
    image: 'tostatura',
    products: [OPTIMUM, DOMUS],
    published: '2026-10-12',
    text: {
      de: {
        title: 'Kaffeebohnen online kaufen in der Schweiz: darauf achten',
        metaTitle: 'Kaffeebohnen online kaufen Schweiz: Ratgeber',
        metaDescription:
          'Kaffeebohnen online kaufen in der Schweiz: worauf Sie bei Frische, Herkunft und Händler achten sollten, plus Versand, Kosten und Zahlung einfach erklärt.',
        teaser:
          'Frische, Herkunft, offizieller Vertrieb: so erkennen Sie gute Espressobohnen online, und so funktionieren Versand und Zahlung bei uns.',
        lead:
          'Italienischer Kaffee hat in der Schweiz viele Liebhaber, doch nicht jede Packung im Netz hält, was sie verspricht. Wer Kaffeebohnen online kaufen möchte, sollte auf Frische, Herkunft und einen vertrauenswürdigen Händler achten. In diesem Ratgeber erfahren Sie, woran Sie gute Espressobohnen erkennen und wie Bestellung, Versand und Zahlung bei Dersut Kaffee in der Schweiz funktionieren.',
        sections: [
          {
            h: 'Worauf Sie beim Kauf von Espressobohnen achten sollten',
            p: [
              'Kaffee ist ein Naturprodukt, das nach der Röstung langsam an Aroma verliert. Ein seriöser Shop verkauft deshalb Ware in gut verschlossenen Originalpackungen und gibt klar an, woher der Kaffee stammt. Achten Sie auf diese Punkte:',
            ],
            list: [
              'Ganze Bohnen statt Pulver: Sie bleiben länger aromatisch und lassen sich passend zur Maschine mahlen',
              'Klare Herkunft: Rösterei und Ort sollten genannt sein',
              'Originalpackungen: keine umgefüllte Ware unbekannter Herkunft',
              'Offizieller Vertrieb: Sie wissen, dass der Kaffee direkt vom Hersteller kommt',
              'Transparente Preise und Versandkosten in Franken, ohne Zollüberraschungen',
            ],
          },
          {
            h: 'Italienischer Kaffee aus Conegliano',
            p: [
              'Dersut Caffè ist eine Familienrösterei aus Conegliano im Veneto, die seit 1947 Kaffee röstet. Die Bohnen werden in zwei Stufen geröstet: Vorröstung bei 150 °C, Hauptröstung bei 210 bis 220 °C und anschliessende Kühlung mit Luft. Eine elektronische Farbsortierung prüft jede Bohne einzeln. Dersut ist mit "Espresso Italiano Certificato" und "Espresso Italiano di Qualità" zertifiziert.',
              'Die Dersut Kaffee GmbH in Basel ist der offizielle Vertrieb für die Schweiz. Sie erhalten also Originalpackungen direkt aus der Rösterei, ohne Umweg über Zwischenhändler im Ausland.',
            ],
          },
          {
            h: 'Vier Mischungen für jeden Geschmack',
            p: [
              'Im Shop finden Sie vier Espressomischungen als ganze Bohnen in der 1-kg-Packung, darunter die mit Gold prämierten [Dersut Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg) aus 100 % Arabica und [Dersut Plus Oro](/shop/dersut-plus-oro-1kg). Der [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg) für CHF 29.90 ist der Allrounder mit lang anhaltender Crema, Noten von Kakao und Gebäck und Intensität 4 von 5, ideal für Espresso und Cappuccino. Der [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg) für CHF 26.90 hat mit Intensität 5 von 5 ein sehr intensives Aroma und einen starken, entschiedenen Charakter.',
              'Beide eignen sich für Vollautomat, Siebträger und Moka. Für den Vollautomaten stellen Sie einen mittelfeinen bis feinen Mahlgrad ein.',
            ],
          },
          {
            h: 'Versand in der ganzen Schweiz',
            p: [
              'Wir versenden mit der Schweizerischen Post in die ganze Schweiz. Ihre Bestellung geht innert 1 bis 2 Werktagen nach Zahlungseingang auf den Weg. Der Versand kostet pauschal {ship}. Ab einem Warenwert von {free} liefern wir kostenlos, das entspricht zum Beispiel vier Packungen.',
              'Gerade wer regelmässig Espresso trinkt, profitiert davon: Mit vier Kilogramm sind Sie für einige Zeit versorgt, und dank der gut verschlossenen Originalpackungen bleibt jede ungeöffnete Packung frisch, bis Sie sie brauchen. Lagern Sie sie kühl, trocken und dunkel.',
            ],
          },
          {
            h: 'Einfach bezahlen mit QR-Rechnung',
            p: [
              'Bezahlt wird per Vorauskasse mit Banküberweisung. Sie erhalten eine Schweizer QR-Rechnung, die Sie bequem mit Ihrer Banking-App scannen. Eine Kreditkarte brauchen Sie nicht. Sobald die Zahlung eingegangen ist, versenden wir Ihre Bestellung.',
            ],
          },
          {
            h: 'Angebote für Gastronomie und Firmen',
            p: [
              'Sie führen ein Restaurant, ein Hotel oder ein Café oder möchten Ihr Büro mit italienischem Espresso versorgen? Für Gastronomie und Firmen haben wir eigene Angebote. Mehr dazu lesen Sie auf den Seiten Gastronomie und Firmen, oder Sie schreiben uns direkt über die [Kontaktseite](/kontakt).',
            ],
          },
        ],
        faq: [
          [
            'Wie schnell wird geliefert?',
            'Wir versenden innert 1 bis 2 Werktagen nach Zahlungseingang mit der Schweizerischen Post.',
          ],
          [
            'Was kostet der Versand?',
            'Pauschal {ship} in die ganze Schweiz. Ab {free} Warenwert, zum Beispiel vier Packungen, ist der Versand kostenlos.',
          ],
          [
            'Wie kann ich bezahlen?',
            'Per Vorauskasse mit Banküberweisung über eine Schweizer QR-Rechnung. Eine Kreditkarte ist nicht nötig.',
          ],
          [
            'Sind es Originalpackungen?',
            'Ja. Die Dersut Kaffee GmbH in Basel ist der offizielle Vertrieb von Dersut Caffè in der Schweiz und verkauft ausschliesslich Originalpackungen.',
          ],
        ],
        cta: 'Bestellen Sie italienischen Espresso direkt beim offiziellen Schweizer Vertrieb:',
      },
      fr: {
        title: 'Acheter du café en grains en ligne en Suisse : nos conseils',
        metaTitle: 'Acheter du café en grains en ligne en Suisse',
        metaDescription:
          'Acheter du café en grains en ligne en Suisse : fraîcheur, origine et revendeur à vérifier, plus livraison, frais et paiement expliqués simplement. À lire.',
        teaser:
          'Fraîcheur, origine, distributeur officiel : comment reconnaître de bons grains espresso en ligne, et comment fonctionnent livraison et paiement chez nous.',
        lead:
          'Le café italien compte de nombreux amateurs en Suisse, mais tous les paquets vendus en ligne ne tiennent pas leurs promesses. Pour acheter du café en grains en ligne, mieux vaut vérifier la fraîcheur, l’origine et le sérieux du vendeur. Ce guide vous explique comment reconnaître de bons grains espresso et comment se passent commande, livraison et paiement chez Dersut Kaffee en Suisse.',
        sections: [
          {
            h: 'Ce qu’il faut vérifier avant d’acheter',
            p: [
              'Le café est un produit naturel qui perd peu à peu ses arômes après la torréfaction. Une boutique sérieuse vend donc des paquets originaux bien fermés et indique clairement la provenance du café. Vérifiez ces points :',
            ],
            list: [
              'Des grains entiers plutôt que du moulu : ils restent aromatiques plus longtemps et se moulent selon votre machine',
              'Une origine claire : la torréfaction et le lieu doivent être indiqués',
              'Des paquets originaux : pas de marchandise reconditionnée d’origine inconnue',
              'Un distributeur officiel : le café vient directement du fabricant',
              'Des prix et frais de port transparents en francs, sans surprise de douane',
            ],
          },
          {
            h: 'Du café italien de Conegliano',
            p: [
              'Dersut Caffè est une torréfaction familiale de Conegliano, en Vénétie, qui torréfie du café depuis 1947. Les grains sont torréfiés en deux étapes : pré-torréfaction à 150 °C, torréfaction principale entre 210 et 220 °C, puis refroidissement à l’air. Une sélection électronique contrôle la couleur de chaque grain. Dersut est certifié "Espresso Italiano Certificato" et "Espresso Italiano di Qualità".',
              'Dersut Kaffee GmbH, à Bâle, est le distributeur officiel pour la Suisse. Vous recevez des paquets originaux venus directement de la torréfaction, sans passer par des intermédiaires à l’étranger.',
            ],
          },
          {
            h: 'Quatre mélanges pour tous les goûts',
            p: [
              'La boutique propose quatre mélanges espresso en grains entiers, en paquet de 1 kg, dont les médaillés d’or [Dersut Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg) 100 % Arabica et [Dersut Plus Oro](/shop/dersut-plus-oro-1kg). Le [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg), à CHF 29.90, est le polyvalent : crème persistante, notes de cacao et de pâtisserie, intensité 4 sur 5, idéal en espresso comme en cappuccino. Le [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg), à CHF 26.90, intensité 5 sur 5, offre un arôme très intense et un caractère fort et affirmé.',
              'Les deux conviennent à la machine automatique, au porte-filtre et à la moka. En machine automatique, réglez une mouture moyennement fine à fine.',
            ],
          },
          {
            h: 'Livraison dans toute la Suisse',
            p: [
              'Nous expédions avec La Poste suisse dans toute la Suisse. Votre commande part dans un délai de 1 à 2 jours ouvrables après réception du paiement. Les frais de port sont forfaitaires : {ship}. Dès {free} de marchandise, la livraison est offerte, soit par exemple quatre paquets.',
              'Si vous buvez de l’espresso régulièrement, c’est intéressant : avec quatre kilos, vous êtes servi pour un bon moment, et les paquets originaux bien fermés restent frais jusqu’à leur ouverture. Conservez-les au frais, au sec et à l’abri de la lumière.',
            ],
          },
          {
            h: 'Paiement simple par facture QR',
            p: [
              'Le paiement se fait d’avance, par virement bancaire. Vous recevez une facture QR suisse à scanner directement dans votre application bancaire. Aucune carte de crédit n’est nécessaire. Dès réception du paiement, nous expédions votre commande.',
            ],
          },
          {
            h: 'Offres pour la gastronomie et les entreprises',
            p: [
              'Vous tenez un restaurant, un hôtel ou un café, ou souhaitez offrir un vrai espresso italien à votre bureau ? Nous avons des offres dédiées à la gastronomie et aux entreprises. Découvrez-les sur les pages Gastronomie et Entreprises, ou écrivez-nous directement via la [page de contact](/kontakt).',
            ],
          },
        ],
        faq: [
          [
            'Quels sont les délais de livraison ?',
            'Nous expédions avec La Poste suisse dans un délai de 1 à 2 jours ouvrables après réception du paiement.',
          ],
          [
            'Combien coûte la livraison ?',
            '{ship} forfaitaires dans toute la Suisse. Dès {free} de marchandise, par exemple quatre paquets, la livraison est gratuite.',
          ],
          [
            'Comment puis-je payer ?',
            'D’avance, par virement bancaire avec une facture QR suisse. Pas besoin de carte de crédit.',
          ],
          [
            'S’agit-il de paquets originaux ?',
            'Oui. Dersut Kaffee GmbH, à Bâle, est le distributeur officiel de Dersut Caffè en Suisse et ne vend que des paquets originaux.',
          ],
        ],
        cta: 'Commandez votre espresso italien directement chez le distributeur officiel suisse :',
      },
      it: {
        title: 'Comprare caffè in grani online in Svizzera: cosa sapere',
        metaTitle: 'Comprare caffè in grani online in Svizzera',
        metaDescription:
          'Comprare caffè in grani online in Svizzera: cosa controllare su freschezza, origine e venditore, con spedizione, costi e pagamento spiegati in modo semplice.',
        teaser:
          'Freschezza, origine, distributore ufficiale: come riconoscere un buon caffè in grani online e come funzionano spedizione e pagamento da noi.',
        lead:
          'Il caffè italiano ha tanti estimatori in Svizzera, ma non tutte le confezioni vendute online mantengono ciò che promettono. Chi vuole comprare caffè in grani online dovrebbe controllare freschezza, origine e affidabilità del venditore. In questa guida scoprirà come riconoscere un buon caffè per espresso e come funzionano ordine, spedizione e pagamento presso Dersut Kaffee in Svizzera.',
        sections: [
          {
            h: 'Cosa controllare prima di acquistare',
            p: [
              'Il caffè è un prodotto naturale che dopo la tostatura perde lentamente aroma. Un negozio serio vende quindi confezioni originali ben chiuse e indica chiaramente la provenienza del caffè. Controlli questi punti:',
            ],
            list: [
              'Chicchi interi invece di caffè macinato: restano aromatici più a lungo e si macinano secondo la macchina',
              'Origine chiara: torrefazione e luogo devono essere indicati',
              'Confezioni originali: niente merce riconfezionata di provenienza sconosciuta',
              'Distributore ufficiale: il caffè arriva direttamente dal produttore',
              'Prezzi e spese di spedizione trasparenti in franchi, senza sorprese doganali',
            ],
          },
          {
            h: 'Caffè italiano da Conegliano',
            p: [
              'Dersut Caffè è una torrefazione di famiglia di Conegliano, in Veneto, che tosta caffè dal 1947. I chicchi sono tostati in due fasi: pre-tostatura a 150 °C, tostatura principale tra 210 e 220 °C e raffreddamento ad aria. Una selezione elettronica controlla il colore di ogni chicco. Dersut è certificata "Espresso Italiano Certificato" ed "Espresso Italiano di Qualità".',
              'Dersut Kaffee GmbH, con sede a Basilea, è il distributore ufficiale per la Svizzera. Riceve quindi confezioni originali direttamente dalla torrefazione, senza passare da intermediari all’estero.',
            ],
          },
          {
            h: 'Quattro miscele per ogni gusto',
            p: [
              'Nel negozio trova quattro miscele espresso in grani interi, in confezione da 1 kg, tra cui le medaglie d’oro [Dersut Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg) 100 % Arabica e [Dersut Plus Oro](/shop/dersut-plus-oro-1kg). Il [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg), a CHF 29.90, è il tuttofare: crema persistente, note di cacao e pasticceria, intensità 4 su 5, ideale per espresso e cappuccino. Il [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg), a CHF 26.90, intensità 5 su 5, ha un aroma molto intenso e un carattere forte e deciso.',
              'Entrambi sono adatti a macchina automatica, portafiltro e moka. In macchina automatica imposti una macinatura medio-fine o fine.',
            ],
          },
          {
            h: 'Spedizione in tutta la Svizzera',
            p: [
              'Spediamo con la Posta Svizzera in tutta la Svizzera. Il suo ordine parte entro 1-2 giorni lavorativi dal ricevimento del pagamento. La spedizione costa {ship} forfettari. Da {free} di merce la consegna è gratuita, per esempio con quattro confezioni.',
              'Per chi beve espresso tutti i giorni è un vantaggio: con quattro chili è a posto per un bel po’, e le confezioni originali ben chiuse restano fresche fino all’apertura. Le conservi in luogo fresco, asciutto e al buio.',
            ],
          },
          {
            h: 'Pagare in modo semplice con la QR-fattura',
            p: [
              'Il pagamento avviene anticipato tramite bonifico bancario. Riceve una QR-fattura svizzera da scansionare comodamente con l’app della sua banca. Non serve la carta di credito. Appena ricevuto il pagamento, spediamo l’ordine.',
            ],
          },
          {
            h: 'Offerte per gastronomia e aziende',
            p: [
              'Gestisce un ristorante, un hotel o un bar, oppure vuole offrire un vero espresso italiano in ufficio? Abbiamo offerte dedicate alla gastronomia e alle aziende. Le trova nelle pagine Gastronomia e Aziende, oppure ci scriva direttamente tramite la [pagina contatti](/kontakt).',
            ],
          },
        ],
        faq: [
          [
            'Quali sono i tempi di consegna?',
            'Spediamo con la Posta Svizzera entro 1-2 giorni lavorativi dal ricevimento del pagamento.',
          ],
          [
            'Quanto costa la spedizione?',
            '{ship} forfettari in tutta la Svizzera. Da {free} di merce, per esempio quattro confezioni, la spedizione è gratuita.',
          ],
          [
            'Come posso pagare?',
            'In anticipo tramite bonifico bancario con una QR-fattura svizzera. Non serve la carta di credito.',
          ],
          [
            'Sono confezioni originali?',
            'Sì. Dersut Kaffee GmbH di Basilea è il distributore ufficiale di Dersut Caffè in Svizzera e vende solo confezioni originali.',
          ],
        ],
        cta: 'Ordini il suo espresso italiano direttamente dal distributore ufficiale svizzero:',
      },
      en: {
        title: 'Buying coffee beans online in Switzerland: what to know',
        metaTitle: 'Buy coffee beans online in Switzerland: a guide',
        metaDescription:
          'Buying coffee beans online in Switzerland: what to check on freshness, origin and seller, plus shipping, costs and payment explained in plain terms. Read on.',
        teaser:
          'Freshness, origin, official distributor: how to spot good espresso beans online, and how shipping and payment work with us.',
        lead:
          'Italian coffee has many fans in Switzerland, but not every pack sold online lives up to its promise. If you want to buy coffee beans online, it pays to check freshness, origin and how trustworthy the seller is. This guide explains how to recognise good espresso beans and how ordering, shipping and payment work at Dersut Kaffee in Switzerland.',
        sections: [
          {
            h: 'What to look for when buying espresso beans',
            p: [
              'Coffee is a natural product that slowly loses aroma after roasting. A reputable shop therefore sells well-sealed original packs and states clearly where the coffee comes from. Check these points:',
            ],
            list: [
              'Whole beans instead of ground coffee: they stay aromatic longer and can be ground to suit your machine',
              'Clear origin: the roastery and its location should be named',
              'Original packs: no repacked goods of unknown origin',
              'Official distributor: you know the coffee comes straight from the producer',
              'Transparent prices and shipping costs in Swiss francs, with no customs surprises',
            ],
          },
          {
            h: 'Italian coffee from Conegliano',
            p: [
              'Dersut Caffè is a family roastery in Conegliano in the Veneto region that has been roasting coffee since 1947. The beans are roasted in two stages: a pre-roast at 150 °C, a main roast at 210 to 220 °C and then air cooling. Electronic colour sorting checks every bean individually. Dersut holds the certifications "Espresso Italiano Certificato" and "Espresso Italiano di Qualità".',
              'Dersut Kaffee GmbH in Basel is the official distributor for Switzerland. That means you receive original packs straight from the roastery, without detours via middlemen abroad.',
            ],
          },
          {
            h: 'Four blends for every taste',
            p: [
              'The shop offers four espresso blends as whole beans in 1 kg packs, including the gold-medal winners [Dersut Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg), 100 % Arabica, and [Dersut Plus Oro](/shop/dersut-plus-oro-1kg). [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg) at CHF 29.90 is the all-rounder, with long-lasting crema, notes of cocoa and pastry and intensity 4 out of 5, ideal for espresso and cappuccino. [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg) at CHF 26.90 has intensity 5 out of 5, a very intense aroma and a strong, decisive character.',
              'Both suit bean-to-cup machines, portafilter machines and moka pots. For a fully automatic machine, set a medium-fine to fine grind.',
            ],
          },
          {
            h: 'Shipping all over Switzerland',
            p: [
              'We ship with Swiss Post all over Switzerland. Your order goes out within 1 to 2 working days after we receive payment. Shipping costs a flat {ship}. From {free} in goods value, delivery is free, which is for example four packs.',
              'If you drink espresso regularly, this pays off: four kilos keep you supplied for quite a while, and the well-sealed original packs stay fresh until you open them. Store them somewhere cool, dry and dark.',
            ],
          },
          {
            h: 'Easy payment with a QR bill',
            p: [
              'Payment is made in advance by bank transfer. You receive a Swiss QR bill that you simply scan with your banking app. No credit card is needed. As soon as your payment arrives, we ship your order.',
            ],
          },
          {
            h: 'Offers for hospitality and businesses',
            p: [
              'Do you run a restaurant, hotel or café, or want to serve real Italian espresso in your office? We have dedicated offers for hospitality and businesses. Find out more on our Gastronomy and Business pages, or write to us directly via the [contact page](/kontakt).',
            ],
          },
        ],
        faq: [
          [
            'How fast is delivery?',
            'We ship with Swiss Post within 1 to 2 working days after receiving payment.',
          ],
          [
            'How much does shipping cost?',
            'A flat {ship} anywhere in Switzerland. From {free} in goods value, for example four packs, shipping is free.',
          ],
          [
            'How can I pay?',
            'In advance by bank transfer using a Swiss QR bill. No credit card is required.',
          ],
          [
            'Are these original packs?',
            'Yes. Dersut Kaffee GmbH in Basel is the official distributor of Dersut Caffè in Switzerland and sells original packs only.',
          ],
        ],
        cta: 'Order your Italian espresso directly from the official Swiss distributor:',
      },
    },
  },
  /* ------------------------------------------------------------------ */
  /* 5. Kaffee für Firmen und Gastronomie                               */
  /* ------------------------------------------------------------------ */
  {
    slug: 'kaffee-fuer-firmen-gastronomie',
    image: 'tazze',
    products: ['dersut-non-plus-ultra-1kg', 'dersut-plus-oro-1kg', OPTIMUM, DOMUS],
    published: '2026-11-01',
    text: {
      de: {
        title: 'Kaffee für Firmen und Gastronomie: den richtigen Kaffeelieferanten finden',
        metaTitle: 'Kaffee für Firmen & Gastronomie: Lieferant Schweiz',
        metaDescription:
          'Kaffee fürs Büro, Restaurant oder Hotel: worauf Firmen bei Kaffeebohnen, Menge und Lieferant achten sollten. Mit Mengenpreisen vom offiziellen Dersut-Vertrieb.',
        teaser:
          'Bürokaffee, Bar oder Hotel: welche Bohnen passen, wie viel Kaffee Sie brauchen und worauf es bei einem Kaffeelieferanten in der Schweiz ankommt.',
        lead:
          'Guter Kaffee ist im Büro ein kleines Stück Wertschätzung und in Restaurant, Bar oder Hotel oft der letzte Eindruck, den Gäste mitnehmen. Wer Kaffee für die Firma oder den Betrieb einkauft, braucht deshalb mehr als irgendeine Packung aus dem Regal: verlässliche Qualität, die richtige Menge zum richtigen Preis und einen Lieferanten, der erreichbar ist. Dieser Ratgeber zeigt, worauf es ankommt.',
        sections: [
          {
            h: 'Ganze Bohnen statt Kapseln: was sich für Firmen lohnt',
            p: [
              'Kapseln sind bequem, aber pro Tasse teuer und erzeugen viel Abfall. Ein Vollautomat oder eine Siebträgermaschine mit ganzen Bohnen liefert dagegen frisch gemahlenen Espresso und Cappuccino zu deutlich tieferen Kosten pro Tasse. Mit einem Kilogramm Bohnen lassen sich rund 120 bis 140 Espressi zubereiten.',
              'Für Firmen mit einem Vollautomaten im Pausenraum und für Betriebe mit Siebträgermaschine sind 1-kg-Packungen ganzer Espressobohnen deshalb die wirtschaftlichste Lösung.',
            ],
          },
          {
            h: 'Welche Mischung passt zu Büro, Bar und Restaurant?',
            p: [
              'Im Büro trinken viele Mitarbeitende Kaffee mit Milch. Eine ausgewogene Mischung wie der [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg) mit Kakaonoten und lang anhaltender Crema passt hier besonders gut. Wer es kräftig mag, wählt den [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg) mit Intensität 5 von 5.',
              'In Bar, Restaurant und Hotel zählt der pure Espresso. Hier überzeugen die mit Gold prämierten Mischungen [Dersut Plus Oro](/shop/dersut-plus-oro-1kg) und [Dersut Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg) aus 100 % Arabica, beide ausgezeichnet beim International Coffee Tasting 2025.',
            ],
          },
          {
            h: 'Wie viel Kaffee braucht eine Firma?',
            p: [
              'Als Faustregel trinkt eine Person im Büro zwei bis drei Tassen pro Arbeitstag. Ein Team von zehn Personen braucht damit etwa drei bis vier Kilogramm Kaffeebohnen im Monat. In der Gastronomie hängt der Bedarf stark von der Zahl der Gäste ab, eine kleine Bar kommt schnell auf zehn Kilogramm und mehr pro Woche.',
            ],
            list: [
              'Bis 10 Personen: rund 3 bis 4 kg pro Monat',
              '10 bis 30 Personen: rund 4 bis 12 kg pro Monat',
              'Café, Bar oder Restaurant: Bedarf nach Gästezahl, gerne berechnen wir ihn mit Ihnen',
            ],
          },
          {
            h: 'Worauf Sie bei einem Kaffeelieferanten achten sollten',
            p: [
              'Ein guter Kaffeelieferant liefert nicht nur Bohnen, sondern Verlässlichkeit. Achten Sie auf diese Punkte:',
            ],
            list: [
              'Gleichbleibende Qualität aus einer bekannten Rösterei',
              'Originalware mit klarer Herkunft, kein Graumarkt',
              'Preise in Franken und Rechnung aus der Schweiz',
              'Persönlicher Ansprechpartner, der schnell antwortet',
              'Lieferung nach Plan, damit nie der Kaffee ausgeht',
            ],
          },
          {
            h: 'Dersut für Ihre Firma oder Ihren Betrieb',
            p: [
              'Dersut Caffè röstet seit 1947 in Conegliano und beliefert über 4’000 Bars und Geschäfte. Die Dersut Kaffee GmbH in Basel ist der offizielle Vertrieb für die Schweiz. Für Firmen und Gastronomie bieten wir Mengenpreise, Lieferung nach Plan und Rechnung in Franken.',
              'Fragen Sie unverbindlich an: für Restaurants, Bars und Hotels auf der Seite [Gastronomie](/gastronomie), für Büros, Praxen und Kanzleien auf der Seite [Firmen & Büro](/firmen). Wir melden uns innert 24 Stunden.',
            ],
          },
        ],
        faq: [
          ['Gibt es Mengenpreise für Firmen?', 'Ja. Für Firmen und Gastronomie erstellen wir ein Angebot nach Ihrem Bedarf. Fragen Sie einfach unverbindlich auf der Seite Gastronomie oder Firmen an.'],
          ['Wie viel Kaffee braucht ein Büro mit 10 Personen?', 'Etwa drei bis vier Kilogramm Kaffeebohnen pro Monat, bei zwei bis drei Tassen pro Person und Arbeitstag.'],
          ['Welche Kaffeebohnen eignen sich für den Vollautomaten im Büro?', 'Ganze Espressobohnen mit gleichmässiger Röstung, zum Beispiel Dersut Optimum Rosso für Kaffee mit Milch oder Domus Marrone für einen kräftigen Espresso.'],
          ['Liefern Sie in die ganze Schweiz?', 'Ja, wir liefern mit der Schweizerischen Post in die ganze Schweiz. Ab {free} Warenwert ist der Versand gratis.'],
        ],
        cta: 'Bestellen Sie direkt oder fragen Sie Ihr Firmenangebot an:',
      },
      fr: {
        title: 'Café pour entreprises et restaurants : bien choisir son fournisseur',
        metaTitle: 'Café pour entreprises et restaurants en Suisse',
        metaDescription:
          'Café pour le bureau, le restaurant ou l’hôtel : grains, quantités et fournisseur, nos conseils. Avec des prix de quantité du distributeur officiel Dersut.',
        teaser:
          'Bureau, bar ou hôtel : quels grains choisir, quelle quantité prévoir et ce qui compte chez un fournisseur de café en Suisse.',
        lead:
          'Un bon café est au bureau une petite marque d’attention, et au restaurant, au bar ou à l’hôtel souvent la dernière impression laissée aux clients. Acheter du café pour une entreprise demande donc plus qu’un paquet pris au hasard : une qualité constante, la bonne quantité au bon prix et un fournisseur joignable. Voici ce qui compte.',
        sections: [
          {
            h: 'Grains entiers plutôt que capsules',
            p: [
              'Les capsules sont pratiques, mais chères à la tasse et génèrent beaucoup de déchets. Une machine automatique ou à porte-filtre avec des grains entiers offre un espresso fraîchement moulu à un coût par tasse nettement plus bas. Un kilogramme de grains donne environ 120 à 140 espressos.',
              'Pour une entreprise avec une machine automatique en salle de pause comme pour un établissement avec porte-filtre, les paquets de 1 kg de grains d’espresso sont la solution la plus économique.',
            ],
          },
          {
            h: 'Quel mélange pour le bureau, le bar et le restaurant ?',
            p: [
              'Au bureau, beaucoup boivent leur café avec du lait. Un mélange équilibré comme le [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg), aux notes de cacao et à la crème persistante, convient parfaitement. Pour plus de caractère, choisissez le [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg), intensité 5 sur 5.',
              'Au bar, au restaurant et à l’hôtel, c’est l’espresso pur qui compte. Les mélanges médaillés d’or [Dersut Plus Oro](/shop/dersut-plus-oro-1kg) et [Dersut Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg) 100 % Arabica, primés à l’International Coffee Tasting 2025, font la différence.',
            ],
          },
          {
            h: 'Combien de café pour une entreprise ?',
            p: [
              'En règle générale, une personne boit deux à trois tasses par jour de travail. Une équipe de dix personnes a donc besoin d’environ trois à quatre kilogrammes de grains par mois. En restauration, tout dépend du nombre de clients : un petit bar atteint vite dix kilogrammes et plus par semaine.',
            ],
            list: [
              'Jusqu’à 10 personnes : environ 3 à 4 kg par mois',
              '10 à 30 personnes : environ 4 à 12 kg par mois',
              'Café, bar ou restaurant : selon la fréquentation, nous le calculons volontiers avec vous',
            ],
          },
          {
            h: 'Ce qui compte chez un fournisseur de café',
            p: ['Un bon fournisseur livre non seulement du café, mais aussi de la fiabilité :'],
            list: [
              'Une qualité constante d’une torréfaction reconnue',
              'Des produits originaux d’origine claire, pas de marché gris',
              'Des prix en francs et une facture suisse',
              'Un interlocuteur personnel qui répond vite',
              'Des livraisons planifiées pour ne jamais manquer de café',
            ],
          },
          {
            h: 'Dersut pour votre entreprise ou votre établissement',
            p: [
              'Dersut Caffè torréfie à Conegliano depuis 1947 et fournit plus de 4’000 bars et commerces. Dersut Kaffee GmbH à Bâle est le distributeur officiel pour la Suisse. Pour les entreprises et la restauration, nous proposons des prix de quantité, des livraisons planifiées et une facture en francs.',
              'Demandez une offre sans engagement : pour restaurants, bars et hôtels sur la page [Restauration](/gastronomie), pour bureaux, cabinets et études sur la page [Entreprises & bureau](/firmen). Réponse sous 24 heures.',
            ],
          },
        ],
        faq: [
          ['Proposez-vous des prix de quantité aux entreprises ?', 'Oui. Pour les entreprises et la restauration, nous établissons une offre selon vos besoins. Demandez-la sans engagement sur la page Restauration ou Entreprises.'],
          ['Combien de café pour un bureau de 10 personnes ?', 'Environ trois à quatre kilogrammes de grains par mois, pour deux à trois tasses par personne et par jour de travail.'],
          ['Quels grains pour la machine automatique du bureau ?', 'Des grains d’espresso entiers à torréfaction régulière, par exemple Dersut Optimum Rosso pour le café au lait ou Domus Marrone pour un espresso corsé.'],
          ['Livrez-vous dans toute la Suisse ?', 'Oui, nous livrons avec La Poste dans toute la Suisse. Dès {free} d’achat, la livraison est gratuite.'],
        ],
        cta: 'Commandez directement ou demandez votre offre entreprise :',
      },
      it: {
        title: 'Caffè per aziende e gastronomia: scegliere il fornitore giusto',
        metaTitle: 'Caffè per aziende e ristoranti in Svizzera',
        metaDescription:
          'Caffè per ufficio, ristorante o hotel: chicchi, quantità e fornitore, i nostri consigli. Con prezzi per quantità dal distributore ufficiale Dersut in Svizzera.',
        teaser:
          'Ufficio, bar o hotel: quali chicchi scegliere, quanta quantità prevedere e cosa conta in un fornitore di caffè in Svizzera.',
        lead:
          'Un buon caffè in ufficio è un piccolo gesto di attenzione, e in ristorante, bar o hotel spesso l’ultima impressione che resta agli ospiti. Chi acquista caffè per un’azienda ha bisogno quindi di più di una confezione qualsiasi: qualità costante, la quantità giusta al prezzo giusto e un fornitore raggiungibile. Ecco cosa conta.',
        sections: [
          {
            h: 'Chicchi interi invece delle capsule',
            p: [
              'Le capsule sono comode, ma care per tazza e producono molti rifiuti. Una macchina automatica o a leva con chicchi interi offre invece espresso macinato al momento a un costo per tazza molto più basso. Con un chilogrammo di chicchi si preparano circa 120-140 espressi.',
              'Per un’azienda con una macchina automatica in sala pausa come per un locale con macchina a leva, le confezioni da 1 kg di caffè in grani sono la soluzione più conveniente.',
            ],
          },
          {
            h: 'Quale miscela per ufficio, bar e ristorante?',
            p: [
              'In ufficio molti bevono il caffè con il latte. Una miscela equilibrata come il [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg), con note di cacao e crema persistente, è ideale. Per un gusto più deciso c’è il [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg), intensità 5 su 5.',
              'In bar, ristorante e hotel conta l’espresso puro. Qui convincono le miscele premiate con l’oro [Dersut Plus Oro](/shop/dersut-plus-oro-1kg) e [Dersut Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg) 100 % Arabica, entrambe premiate all’International Coffee Tasting 2025.',
            ],
          },
          {
            h: 'Quanto caffè serve a un’azienda?',
            p: [
              'Come regola generale, una persona beve due o tre tazze per giorno lavorativo. Un team di dieci persone ha quindi bisogno di circa tre o quattro chilogrammi di chicchi al mese. Nella gastronomia dipende dal numero di ospiti: un piccolo bar arriva presto a dieci chilogrammi e più alla settimana.',
            ],
            list: [
              'Fino a 10 persone: circa 3-4 kg al mese',
              'Da 10 a 30 persone: circa 4-12 kg al mese',
              'Caffè, bar o ristorante: secondo il numero di ospiti, lo calcoliamo volentieri con voi',
            ],
          },
          {
            h: 'Cosa conta in un fornitore di caffè',
            p: ['Un buon fornitore non consegna solo caffè, ma affidabilità:'],
            list: [
              'Qualità costante da una torrefazione affermata',
              'Prodotti originali di provenienza chiara, niente mercato grigio',
              'Prezzi in franchi e fattura svizzera',
              'Un referente personale che risponde in fretta',
              'Consegne programmate, per non restare mai senza caffè',
            ],
          },
          {
            h: 'Dersut per la vostra azienda o il vostro locale',
            p: [
              'Dersut Caffè tosta a Conegliano dal 1947 e rifornisce oltre 4’000 bar e negozi. Dersut Kaffee GmbH a Basilea è il distributore ufficiale per la Svizzera. Per aziende e gastronomia offriamo prezzi per quantità, consegne programmate e fattura in franchi.',
              'Richiedete un’offerta senza impegno: per ristoranti, bar e hotel alla pagina [Gastronomia](/gastronomie), per uffici, studi e cabinet alla pagina [Aziende e ufficio](/firmen). Rispondiamo entro 24 ore.',
            ],
          },
        ],
        faq: [
          ['Ci sono prezzi per quantità per le aziende?', 'Sì. Per aziende e gastronomia prepariamo un’offerta secondo il vostro fabbisogno. Richiedetela senza impegno alla pagina Gastronomia o Aziende.'],
          ['Quanto caffè serve a un ufficio di 10 persone?', 'Circa tre o quattro chilogrammi di chicchi al mese, con due o tre tazze per persona e giorno lavorativo.'],
          ['Quali chicchi per la macchina automatica in ufficio?', 'Caffè in grani interi con tostatura uniforme, ad esempio Dersut Optimum Rosso per il caffè con latte o Domus Marrone per un espresso deciso.'],
          ['Consegnate in tutta la Svizzera?', 'Sì, consegniamo con La Posta in tutta la Svizzera. Da {free} di merce la spedizione è gratuita.'],
        ],
        cta: 'Ordinate subito o richiedete la vostra offerta aziendale:',
      },
      en: {
        title: 'Coffee for companies and hospitality: choosing the right supplier',
        metaTitle: 'Coffee for Offices & Restaurants in Switzerland',
        metaDescription:
          'Coffee for the office, restaurant or hotel: beans, quantities and supplier explained. With volume pricing from the official Dersut distributor in Switzerland.',
        teaser:
          'Office, bar or hotel: which beans suit you, how much coffee you need and what matters in a coffee supplier in Switzerland.',
        lead:
          'Good coffee at the office is a small sign of appreciation, and in a restaurant, bar or hotel it is often the last impression guests take home. Buying coffee for a business therefore takes more than any pack off the shelf: consistent quality, the right quantity at the right price and a supplier you can reach. Here is what matters.',
        sections: [
          {
            h: 'Whole beans instead of capsules',
            p: [
              'Capsules are convenient but expensive per cup and create a lot of waste. A bean-to-cup or portafilter machine with whole beans gives you freshly ground espresso at a much lower cost per cup. One kilogram of beans makes around 120 to 140 espressos.',
              'For a company with a bean-to-cup machine in the break room and for venues with a portafilter machine, 1 kg packs of whole espresso beans are the most economical choice.',
            ],
          },
          {
            h: 'Which blend for office, bar and restaurant?',
            p: [
              'At the office, many people drink coffee with milk. A balanced blend such as [Dersut Optimum Rosso](/shop/dersut-optimum-rosso-1kg), with cocoa notes and a long-lasting crema, is ideal. For a bolder cup, choose [Dersut Domus Marrone](/shop/dersut-domus-marrone-1kg) with intensity 5 of 5.',
              'In bars, restaurants and hotels, the pure espresso counts. Here the gold-medal blends [Dersut Plus Oro](/shop/dersut-plus-oro-1kg) and [Dersut Non Plus Ultra](/shop/dersut-non-plus-ultra-1kg) (100 % Arabica), both awarded at the International Coffee Tasting 2025, stand out.',
            ],
          },
          {
            h: 'How much coffee does a company need?',
            p: [
              'As a rule of thumb, one person drinks two to three cups per working day. A team of ten therefore needs about three to four kilograms of beans per month. In hospitality it depends on your guests: a small bar quickly reaches ten kilograms or more per week.',
            ],
            list: [
              'Up to 10 people: around 3 to 4 kg per month',
              '10 to 30 people: around 4 to 12 kg per month',
              'Café, bar or restaurant: based on guest numbers, we are happy to work it out with you',
            ],
          },
          {
            h: 'What matters in a coffee supplier',
            p: ['A good supplier delivers not only coffee but reliability:'],
            list: [
              'Consistent quality from a renowned roastery',
              'Original products of clear origin, no grey market',
              'Prices in Swiss francs and a Swiss invoice',
              'A personal contact who replies quickly',
              'Scheduled deliveries so you never run out',
            ],
          },
          {
            h: 'Dersut for your company or venue',
            p: [
              'Dersut Caffè has been roasting in Conegliano since 1947 and supplies more than 4,000 bars and shops. Dersut Kaffee GmbH in Basel is the official distributor for Switzerland. For companies and hospitality we offer volume pricing, scheduled delivery and invoicing in Swiss francs.',
              'Ask for a free quote: for restaurants, bars and hotels on the [Hospitality](/gastronomie) page, for offices, practices and law firms on the [Companies & offices](/firmen) page. We reply within 24 hours.',
            ],
          },
        ],
        faq: [
          ['Do you offer volume pricing for companies?', 'Yes. For companies and hospitality we prepare a quote based on your needs. Just ask on the Hospitality or Companies page, with no obligation.'],
          ['How much coffee does an office of 10 people need?', 'About three to four kilograms of beans per month, based on two to three cups per person per working day.'],
          ['Which beans suit the office bean-to-cup machine?', 'Whole espresso beans with an even roast, for example Dersut Optimum Rosso for milk drinks or Domus Marrone for a bold espresso.'],
          ['Do you deliver throughout Switzerland?', 'Yes, we deliver with Swiss Post throughout Switzerland. Shipping is free from {free} in goods value.'],
        ],
        cta: 'Order directly or request your business quote:',
      },
    },
  },
];

export const RATGEBER_PAGE: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    title: string;
    lead: string;
    readMore: string;
    crumb: string;
    related: string;
  }
> = {
  de: {
    metaTitle: 'Kaffee-Ratgeber: Espresso, Bohnen und Zubereitung',
    metaDescription:
      'Kaffee-Ratgeber für die Schweiz: Bohnen für den Vollautomaten, Espresso zubereiten, Optimum und Domus im Vergleich und Tipps zum Kaffeebohnen kaufen online.',
    title: 'Ratgeber rund um Espresso',
    lead:
      'Praktische Tipps für besseren Espresso zu Hause: von der Wahl der richtigen Bohnen für den Vollautomaten über die Zubereitung mit Siebträger und Moka bis zum Einkauf von italienischem Kaffee in der Schweiz.',
    readMore: 'Weiterlesen',
    crumb: 'Ratgeber',
    related: 'Passende Ratgeber',
  },
  fr: {
    metaTitle: 'Conseils café : espresso, grains et préparation',
    metaDescription:
      'Nos conseils café pour la Suisse : grains pour machine automatique, préparer un espresso, Optimum et Domus comparés et acheter du café en grains en ligne.',
    title: 'Conseils autour de l’espresso',
    lead:
      'Des conseils pratiques pour un meilleur espresso à la maison : du choix des grains pour votre machine automatique à la préparation au porte-filtre et à la moka, jusqu’à l’achat de café italien en Suisse.',
    readMore: 'Lire la suite',
    crumb: 'Conseils',
    related: 'Conseils associés',
  },
  it: {
    metaTitle: 'Guida al caffè: espresso, chicchi e preparazione',
    metaDescription:
      'Guida al caffè per la Svizzera: chicchi per macchina automatica, come preparare l’espresso, Optimum e Domus a confronto e consigli per comprare online.',
    title: 'Guida all’espresso',
    lead:
      'Consigli pratici per un espresso migliore a casa: dalla scelta dei chicchi per la macchina automatica alla preparazione con portafiltro e moka, fino all’acquisto di caffè italiano in Svizzera.',
    readMore: 'Continua a leggere',
    crumb: 'Guida',
    related: 'Guide correlate',
  },
  en: {
    metaTitle: 'Coffee guides: espresso, beans and brewing tips',
    metaDescription:
      'Coffee guides for Switzerland: beans for bean-to-cup machines, how to make espresso, Optimum vs Domus compared and tips for buying coffee beans online.',
    title: 'Espresso guides',
    lead:
      'Practical tips for better espresso at home: from choosing the right beans for your bean-to-cup machine to brewing with a portafilter or moka pot, and buying Italian coffee in Switzerland.',
    readMore: 'Read more',
    crumb: 'Guides',
    related: 'Related guides',
  },
};

/** Zahlungstexte, sobald Online-Zahlung (Payrexx) aktiv ist: ersetzt die Vorauskasse-Sätze wörtlich */
const ONLINE_PAY: Record<string, string> = {
  'Einfach bezahlen mit QR-Rechnung': 'Einfach bezahlen: online oder mit QR-Rechnung',
  'Bezahlt wird per Vorauskasse mit Banküberweisung. Sie erhalten eine Schweizer QR-Rechnung, die Sie bequem mit Ihrer Banking-App scannen. Eine Kreditkarte brauchen Sie nicht. Sobald die Zahlung eingegangen ist, versenden wir Ihre Bestellung.':
    'Sie bezahlen direkt online über unseren Schweizer Zahlungspartner Payrexx, dann versenden wir sofort. Lieber per Überweisung? Dann erhalten Sie eine Schweizer QR-Rechnung, die Sie bequem mit Ihrer Banking-App scannen, und wir versenden nach Zahlungseingang.',
  'Per Vorauskasse mit Banküberweisung über eine Schweizer QR-Rechnung. Eine Kreditkarte ist nicht nötig.':
    'Online oder per Vorauskasse mit Banküberweisung über eine Schweizer QR-Rechnung.',
  'Paiement simple par facture QR': 'Paiement simple en ligne ou par facture QR',
  'Le paiement se fait d’avance, par virement bancaire. Vous recevez une facture QR suisse à scanner directement dans votre application bancaire. Aucune carte de crédit n’est nécessaire. Dès réception du paiement, nous expédions votre commande.':
    'Vous payez directement en ligne via notre partenaire de paiement suisse Payrexx, et nous expédions aussitôt. Vous préférez le virement ? Vous recevez alors une facture QR suisse à scanner dans votre application bancaire, et nous expédions dès réception du paiement.',
  'D’avance, par virement bancaire avec une facture QR suisse. Pas besoin de carte de crédit.':
    'En ligne, ou d’avance par virement bancaire avec une facture QR suisse.',
  'Pagare in modo semplice con la QR-fattura': 'Pagare in modo semplice online o con QR-fattura',
  'Il pagamento avviene anticipato tramite bonifico bancario. Riceve una QR-fattura svizzera da scansionare comodamente con l’app della sua banca. Non serve la carta di credito. Appena ricevuto il pagamento, spediamo l’ordine.':
    'Pagate direttamente online tramite il nostro partner di pagamento svizzero Payrexx, e spediamo subito. Preferite il bonifico? Riceve allora una QR-fattura svizzera da scansionare con l’app della sua banca, e spediamo appena ricevuto il pagamento.',
  'In anticipo tramite bonifico bancario con una QR-fattura svizzera. Non serve la carta di credito.':
    'Online, oppure in anticipo tramite bonifico bancario con una QR-fattura svizzera.',
  'Easy payment with a QR bill': 'Easy payment online or with a QR bill',
  'Payment is made in advance by bank transfer. You receive a Swiss QR bill that you simply scan with your banking app. No credit card is needed. As soon as your payment arrives, we ship your order.':
    'Pay directly online via our Swiss payment partner Payrexx, and we ship right away. Prefer a bank transfer? Then you receive a Swiss QR bill to scan with your banking app, and we ship as soon as your payment arrives.',
  'In advance by bank transfer using a Swiss QR bill. No credit card is required.':
    'Online, or in advance by bank transfer using a Swiss QR bill.',
};

export function withOnlinePayment(x: ArticleText): ArticleText {
  const r = (s: string) => ONLINE_PAY[s] ?? s;
  return {
    ...x,
    sections: x.sections.map((s) => ({ ...s, h: r(s.h), p: s.p.map(r) })),
    faq: x.faq.map(([q, a]) => [q, r(a)] as [string, string]),
  };
}
