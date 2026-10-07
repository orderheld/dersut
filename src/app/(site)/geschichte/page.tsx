import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { PageHero } from '@/components/PageHero';
import { brand, type BrandKey } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Geschichte – seit 1947',
  description: 'Die Geschichte von Dersut Caffè: von der Gründung 1947 über die Familie Caballini bis zum neuen Hauptsitz in Conegliano.',
};

const MILESTONES: [string, BrandKey, string, React.ReactNode][] = [
  ['1947', 'history_0', 'Die Gründung', <>Die Triestiner Marcello De Rosa und Giovanni Suttora gründen das Unternehmen mit Sitz in Trieste und Betrieb in Conegliano. Aus den Anfangssilben ihrer Namen, <strong>De</strong> Rosa und <strong>Sut</strong>tora, entsteht der Name Dersut.</>],
  ['1949', 'history_1', 'Die Familie Caballini übernimmt', 'Die Familie Caballini aus Sassoferrato übernimmt das Unternehmen. Vincenzo Caballini wird zur prägenden Figur und führt Dersut zum Erfolg auf dem Markt.'],
  ['1954', 'history_2', 'Mitbegründer des Röster-Verbands', 'Dersut ist Gründungsmitglied der Gruppe der Kaffeeröster des Triveneto, die die Regionen Venetien, Trentino-Südtirol und Friaul-Julisch Venetien umfasst.'],
  ['1960', 'history_3', 'Cavaliere al Merito', 'Vincenzo Caballini wird für seine unternehmerischen Leistungen zum Ritter des Verdienstordens der Italienischen Republik ernannt.'],
  ['1971', 'history_4', 'Die nächste Generation', 'Giorgio Caballini, Sohn von Vincenzo, tritt in das Unternehmen ein und führt die Familientradition weiter.'],
  ['2002', 'history_5', 'Die erste Bottega del Caffè', 'Die erste Dersut-Kaffeeboutique eröffnet. Ein Monomarken-Konzept, das die Welt von Dersut direkt erlebbar macht.'],
  ['2010', 'history_6', 'Das Museo del Caffè', 'In Conegliano wird das Kaffeemuseum eröffnet: 600 m² Geschichte des Unternehmens, der Branche und der Region, mit historischen Maschinen, Mühlen und Röstern.'],
  ['2014', 'history_7', 'Schutz des italienischen Espresso', 'Dersut gründet in Conegliano das Konsortium zum Schutz des traditionellen italienischen Espresso mit, das die Anerkennung des Espresso als UNESCO-Kulturerbe anstrebt.'],
  ['2019', 'img_3', 'Aufbruch nach Europa', 'Die Kaffeeboutiquen werden strategisch neu gestaltet, um das Konzept auf europäische Märkte zu bringen.'],
  ['2024', 'nuova_sede', 'Der neue Hauptsitz', 'An der Via San Giuseppe in Conegliano eröffnet der neue Hauptsitz: ausgelegt auf Effizienz, Qualität und Nachhaltigkeit.'],
];

export default function Geschichte() {
  return (
    <>
      <PageHero img={brand('storia')} crumb="Geschichte" eyebrow="Dal 1947" title={<>Über 75 Jahre<br /><em>Leidenschaft für Espresso</em></>} lead="Von zwei Triestinern gegründet, von der Familie Caballini über Generationen geprägt: die Geschichte von Dersut Caffè aus Conegliano." />

      <section className="section section--tight section--white">
        <div className="wrap quote">
          <blockquote>«Svolgiamo il lavoro con passione per far sorridere chi beve il nostro caffè.»</blockquote>
          <p className="lead" style={{ margin: '0 auto 16px' }}>Wir arbeiten mit Leidenschaft, damit alle, die unseren Kaffee trinken, lächeln.</p>
          <cite>Leitsatz von Dersut Caffè</cite>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">Meilensteine</p>
            <h2 className="h2">Eine italienische Erfolgsgeschichte</h2>
          </header>
          <div className="tl">
            {MILESTONES.map(([year, img, h, txt]) => (
              <article className="tl__item" key={year}>
                <div className="tl__media"><Img src={brand(img)} alt={`${h} ${year}`} /></div>
                <div className="tl__text">
                  <div className="tl__year">{year.slice(0, 2)}<em>{year.slice(2)}</em></div>
                  <h3>{h}</h3>
                  <p>{txt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="split">
        <div className="wrap split__inner split__inner--rev">
          <div className="split__media frame"><Img src={brand('vincenzo')} alt="Vincenzo Caballini, prägende Figur von Dersut Caffè" /></div>
          <div className="split__text">
            <p className="eyebrow">La famiglia</p>
            <h2 className="h2">Vincenzo Caballini</h2>
            <p>Mit der Übernahme durch die Familie Caballini 1949 begann der Aufstieg von Dersut. Vincenzo Caballini prägte das Unternehmen über Jahrzehnte, 1960 wurde er für seine Leistungen zum Cavaliere al Merito della Repubblica Italiana ernannt.</p>
            <p>Bis heute führt die Familie Caballini Dersut in dritter Generation und verbindet Tradition mit modernem Unternehmertum.</p>
          </div>
        </div>
      </section>

      <section className="split split--cream">
        <div className="wrap split__inner">
          <div className="split__media frame"><Img src={brand('museo')} alt="Museo del Caffè Dersut in Conegliano" /></div>
          <div className="split__text">
            <p className="eyebrow">Museo del Caffè</p>
            <h2 className="h2">Kaffeekultur zum Anfassen</h2>
            <p>Seit Oktober 2010 zeigt das Museo del Caffè Dersut in Conegliano auf 600&nbsp;m² und in vier Bereichen eine reiche Sammlung historischer Kaffeemaschinen, Espressomaschinen, Mühlen und Röster: die Reise des Kaffees von der Pflanze bis in die Tasse.</p>
            <p>Das Museum ist Mitglied im Netzwerk der Museen von Treviso und seit 2018 Teil von Museimpresa, dem Verband italienischer Unternehmensmuseen.</p>
          </div>
        </div>
      </section>

      <section className="split">
        <div className="wrap split__inner split__inner--rev">
          <div className="split__media frame"><Img src={brand('img_2')} alt="Barista-Ausbildung an der Accademia ABCD Dersut" /></div>
          <div className="split__text">
            <p className="eyebrow">Accademia ABCD</p>
            <h2 className="h2">Wissen, das man schmeckt</h2>
            <p>Mit der Accademia ABCD hat Dersut ein eigenes Ausbildungszentrum geschaffen, um die Exzellenz des italienischen Espresso weiterzugeben. Baristas und Gastronomen lernen dort alles vom Grundkurs bis zur Latte Art für Fortgeschrittene.</p>
            <ul className="checks">
              <li><Icon name="check" /> Barista-Kurse für Einsteiger und Profis</li>
              <li><Icon name="check" /> IIAC-Verkostungszertifikat und «Espresso Italiano Specialist»</li>
              <li><Icon name="check" /> Beratung vor und nach der Eröffnung eines Lokals</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap cta-box">
          <div>
            <p className="eyebrow">Jetzt probieren</p>
            <h2 className="h3">75 Jahre Erfahrung in jeder Tasse</h2>
            <p>Entdecken Sie Optimum und Domus, direkt vom offiziellen Vertrieb in der Schweiz.</p>
          </div>
          <Link className="btn btn--primary btn--lg" href="/shop">Zum Shop <Icon name="arrow" /></Link>
        </div>
      </section>
    </>
  );
}
