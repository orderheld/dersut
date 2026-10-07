import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { PageHero } from '@/components/PageHero';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Für Gastronomie & Büro',
  description: 'Dersut Espresso für Bars, Restaurants, Hotels und Büros in der Schweiz.',
};

export default function Gastronomie() {
  return (
    <>
      <PageHero img={brand('macchina')} crumb="Gastronomie & Büro" eyebrow="Horeca · Ufficio" title={<>Dersut für<br /><em>Ihre Gäste</em></>} lead="Bars, Restaurants, Hotels, Bäckereien und Büros: Wir bringen den Espresso, den über 4’000 Betriebe in Italien und weltweit ausschenken, zu Ihnen in die Schweiz." />
      <section className="section section--white">
        <div className="wrap">
          <div className="features">
            <div className="feature"><Icon name="cup" /><h3>Die passende Mischung</h3><p>Wir beraten Sie, welche Dersut-Mischung zu Ihrem Angebot, Ihrer Maschine und Ihren Gästen passt.</p></div>
            <div className="feature"><Icon name="box" /><h3>Mengen &amp; Konditionen</h3><p>Für Geschäftskunden mit regelmässigem Bedarf erstellen wir gerne ein individuelles Angebot.</p></div>
            <div className="feature"><Icon name="award" /><h3>Wissen aus der Accademia</h3><p>Das Know-how der Dersut-Akademie ABCD steht hinter jeder Empfehlung, von der Extraktion bis zur Latte Art.</p></div>
          </div>
        </div>
      </section>
      <section className="split split--cream">
        <div className="wrap split__inner">
          <div className="split__media frame"><Img src={brand('img_2')} alt="Barista bei der Zubereitung von Dersut Espresso" /></div>
          <div className="split__text">
            <p className="eyebrow">Anfrage</p>
            <h2 className="h2">Lassen Sie uns sprechen</h2>
            <p>Erzählen Sie uns kurz von Ihrem Betrieb und Ihrem ungefähren Bedarf. Wir melden uns persönlich bei Ihnen.</p>
            <ul className="checks">
              <li><Icon name="check" /> Unverbindliche Beratung</li>
              <li><Icon name="check" /> Lieferung in die ganze Schweiz</li>
              <li><Icon name="check" /> Original Dersut direkt vom offiziellen Vertrieb</li>
            </ul>
            <Link className="btn btn--primary btn--lg" href="/kontakt?thema=Gastronomie">Angebot anfragen <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
