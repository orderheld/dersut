import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { PageHero } from '@/components/PageHero';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Nachhaltigkeit',
  description: 'Solarstrom, Kreislaufwirtschaft und soziale Verantwortung: das Nachhaltigkeitsengagement von Dersut Caffè.',
};

export default function Nachhaltigkeit() {
  return (
    <>
      <PageHero img={brand('foglie')} crumb="Nachhaltigkeit" eyebrow="Sostenibilità" title={<>Verantwortung<br /><em>mit Weitblick</em></>} lead="Dersut gehört zu den ersten italienischen Röstereien, die ihre Umweltauswirkungen konsequent reduziert haben. 2025 wurde das Unternehmen dafür von Il Sole 24 Ore ausgezeichnet." />
      <section className="figures">
        <div className="wrap figures__grid">
          <div className="figure"><span className="figure__num">80&nbsp;%</span><span className="figure__txt">Energie-Eigenversorgung durch Photovoltaik</span></div>
          <div className="figure"><span className="figure__num">90&nbsp;%</span><span className="figure__txt">des Solarstroms wird im eigenen Betrieb genutzt</span></div>
          <div className="figure"><span className="figure__num">10&nbsp;%</span><span className="figure__txt">Zellulose in Papiertüten durch Kaffee-Silberhaut ersetzt</span></div>
          <div className="figure"><span className="figure__num">2025</span><span className="figure__txt">Premio Impresa Sostenibile, Il Sole 24 Ore</span></div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">Umwelt</p>
            <h2 className="h2">Kreislaufwirtschaft rund um die Bohne</h2>
          </header>
          <div className="features">
            <div className="feature"><Icon name="sun" /><h3>Strom von der Sonne</h3><p>Photovoltaikanlagen auf dem Dach und über dem Parkplatz decken rund 80 % des Energiebedarfs des Werks in Conegliano.</p></div>
            <div className="feature"><Icon name="leaf" /><h3>Saubere Luft</h3><p>Rauchgasreiniger, Zyklon und Katalysatoren verhindern, dass Kaffeepartikel in die Atmosphäre gelangen.</p></div>
            <div className="feature"><Icon name="recycle" /><h3>Papier aus Silberhaut</h3><p>Gemeinsam mit der Papierfabrik Favini wird die Silberhaut der Bohne zu umweltfreundlichen Papiertüten verarbeitet.</p></div>
            <div className="feature"><Icon name="cup" /><h3>Farbe aus Kaffeesatz</h3><p>Mit dem Lanificio Bottoli färbt Kaffeesatz edle Textilien wie Kaschmir, Wolle und Seide auf natürliche Weise.</p></div>
            <div className="feature"><Icon name="box" /><h3>Zweites Leben für Aluminium</h3><p>In den Werkstätten von Ricrearti entstehen aus Aluminiumverpackungen neue Gebrauchsgegenstände.</p></div>
            <div className="feature"><Icon name="users" /><h3>Gegen Verschwendung</h3><p>Dersut nimmt an der Plattform Too Good To Go teil und engagiert sich gegen Lebensmittelverschwendung.</p></div>
          </div>
        </div>
      </section>
      <section className="split">
        <div className="wrap split__inner split__inner--rev">
          <div className="split__media frame"><Img src={brand('fiori')} alt="Blüten der Kaffeepflanze" /></div>
          <div className="split__text">
            <p className="eyebrow">Dalla pianta alla tazza</p>
            <h2 className="h2">Respekt vor dem Ursprung</h2>
            <p>Guter Espresso beginnt an der Pflanze. Dersut arbeitet mit langjährigen Partnern in den Anbauländern zusammen und achtet bei der Auswahl des Rohkaffees auf Qualität und verantwortungsvolle Herkunft.</p>
          </div>
        </div>
      </section>
      <section className="split split--cream">
        <div className="wrap split__inner">
          <div className="split__media frame"><Img src={brand('nuova_sede')} alt="Neuer Hauptsitz von Dersut in Conegliano" /></div>
          <div className="split__text">
            <p className="eyebrow">Unternehmensführung</p>
            <h2 className="h2">Transparent nach ESG-Grundsätzen</h2>
            <p>Ein eigener Ethikkodex regelt die Verantwortung von Dersut gegenüber Umwelt, Gesellschaft und guter Unternehmensführung. Seit 2021 veröffentlicht Dersut jährlich einen Nachhaltigkeitsbericht.</p>
            <p>Der 2024 eröffnete Hauptsitz an der Via San Giuseppe in Conegliano wurde von Grund auf auf Effizienz und nachhaltige Abläufe ausgelegt.</p>
          </div>
        </div>
      </section>
      <section className="split">
        <div className="wrap split__inner split__inner--rev">
          <div className="split__media"><Img src={brand('premio_sole')} alt="Premio Impresa Sostenibile 2025 von Il Sole 24 Ore" /></div>
          <div className="split__text">
            <p className="eyebrow">Auszeichnung 2025</p>
            <h2 className="h2">Premio Impresa Sostenibile</h2>
            <p>Am 22. Oktober 2025 wurde Dersut von der Wirtschaftszeitung Il Sole 24 Ore in der Kategorie «Wirtschaftliche Nachhaltigkeit» ausgezeichnet, als Anerkennung für Jahre konsequenter Arbeit an einer verantwortungsvollen Produktion.</p>
          </div>
        </div>
      </section>
    </>
  );
}
