import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { PageHero } from '@/components/PageHero';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Qualität & Röstung',
  description: 'Wie Dersut Caffè in Conegliano Rohkaffee auswählt, zweistufig röstet, kontrolliert und mischt.',
};

const STEPS = [
  ['Kaffeegürtel', 'Anbau in den besten Regionen zwischen den Wendekreisen.'],
  ['Ernte', 'Die Kirschen werden geerntet und von Blättern, Steinen und Erde befreit.'],
  ['Aufbereitung', 'Die Bohnen werden trocken oder nass vom Fruchtfleisch getrennt.'],
  ['Verschiffung', 'Der Rohkaffee reist in Säcken aus Polypropylen nach Europa.'],
  ['Ankunft in Conegliano', 'Im Werk in Conegliano wird jede Lieferung eingelagert und geprüft.'],
  ['Röstung', 'Zweistufig: Vorröstung bei 150 °C, Hauptröstung bei 210 bis 220 °C.'],
  ['Abkühlung', 'Mit Luft gekühlt, damit die Aromen erhalten bleiben.'],
  ['Mischung', 'Die Sorten werden in einem rotierenden Trommelmischer zur Rezeptur vereint.'],
  ['Verpackung', 'Verpackt und unter kontrollierten Klimabedingungen gelagert.'],
];

export default function Qualitaet() {
  return (
    <>
      <PageHero img={brand('tostatura')} crumb="Qualität & Röstung" eyebrow="Qualità Dersut" title={<>Vom Kaffeegürtel<br /><em>in Ihre Tasse</em></>} lead="Neun Schritte, ein Anspruch: Jede Bohne, die Conegliano verlässt, soll den italienischen Espresso in seiner besten Form zeigen." />

      <section className="section section--white">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">Herkunft</p>
            <h2 className="h2">Ausgewählte Bohnen aus dem Kaffeegürtel</h2>
            <p className="lead">Dersut bezieht Rohkaffee aus dem Gürtel zwischen den Wendekreisen des Krebses und des Steinbocks. Jede Herkunft bringt ihren eigenen Charakter in die Mischung.</p>
          </header>
          <div className="features">
            <div className="feature"><Icon name="bean" /><h3>Santos, Brasilien</h3><p>Weiches, volles Aroma mit einem Nachklang von Schokolade.</p></div>
            <div className="feature"><Icon name="bean" /><h3>Limu, Äthiopien</h3><p>Ein Zusammenspiel von Säure und Süsse mit Noten von Jasmin und Zitrus.</p></div>
            <div className="feature"><Icon name="bean" /><h3>El Salvador</h3><p>Arabica mit wenig Koffein, zartem und leicht würzigem Aroma.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">Die Wertschöpfungskette</p>
            <h2 className="h2">Neun Schritte bis zur perfekten Bohne</h2>
          </header>
          <div className="features">
            {STEPS.map(([h, t], i) => (
              <div className="feature" key={h}><span className="step__no">{String(i + 1).padStart(2, '0')}</span><h3>{h}</h3><p>{t}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="split split--navy">
        <div className="wrap split__inner">
          <div className="split__media frame frame--gold"><Img src={brand('tostatura')} alt="Doppeltrommel-Röster bei Dersut" /></div>
          <div className="split__text">
            <p className="eyebrow eyebrow--gold">Röstung</p>
            <h2 className="h2">240&nbsp;kg in 12 Minuten. Jedes Mal gleich gut.</h2>
            <p>Das Herz der Rösterei ist ein Doppeltrommel-Röster, der 240&nbsp;kg Kaffee in zwölf Minuten röstet. Die zweistufige Röstung sorgt dafür, dass jede Charge den gleichen Charakter hat, Tag für Tag.</p>
            <ul className="checks">
              <li><Icon name="check" /> Vorröstung bei 150&nbsp;°C</li>
              <li><Icon name="check" /> Hauptröstung bei 210 bis 220&nbsp;°C</li>
              <li><Icon name="check" /> Luftkühlung zum Schutz der Aromen</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="split">
        <div className="wrap split__inner split__inner--rev">
          <div className="split__media frame"><Img src={brand('selezione')} alt="Elektronische Selektion der Kaffeebohnen" /></div>
          <div className="split__text">
            <p className="eyebrow">Qualitätskontrolle</p>
            <h2 className="h2">Bohne für Bohne geprüft</h2>
            <p>Eine elektronische polychromatische Selektion überwacht jede einzelne Bohne auf Farbe und Röstgrad. Was nicht dem Standard entspricht, wird aussortiert.</p>
            <p>Diese Sorgfalt ist die Grundlage für die Zertifizierung «Espresso Italiano Certificato» und das Qualitätszeichen «Espresso Italiano di Qualità».</p>
            <Link className="link-arrow" href="/zertifizierungen">Zu den Zertifizierungen <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">Zuhause wie in der Bar</p>
            <h2 className="h2">So gelingt Ihr Espresso</h2>
          </header>
          <div className="features">
            <div className="feature"><Icon name="bean" /><h3>Frisch mahlen</h3><p>Mahlen Sie die Bohnen erst unmittelbar vor der Zubereitung. So bleibt das volle Aroma erhalten.</p></div>
            <div className="feature"><Icon name="clock" /><h3>Richtig dosieren</h3><p>Als Richtwert gelten rund 7 g Kaffee für einen Espresso und eine Extraktion von 20 bis 30 Sekunden.</p></div>
            <div className="feature"><Icon name="box" /><h3>Gut lagern</h3><p>Die Packung nach dem Öffnen gut verschliessen und kühl, trocken und lichtgeschützt aufbewahren.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
