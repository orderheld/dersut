import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { ARTICLES, RATGEBER_PAGE } from '@/content/ratgeber';
import { brand } from '@/lib/brand';
import { lp, type Locale } from '@/lib/i18n';
import { shipText } from '@/lib/shipping-text';

const T: Record<Locale, { eyebrow: string; title: string; all: string }> = {
  de: { eyebrow: 'Ratgeber', title: 'Wissen für besseren Kaffee', all: 'Alle Ratgeber' },
  fr: { eyebrow: 'Conseils', title: 'Tout pour un meilleur café', all: 'Tous les conseils' },
  it: { eyebrow: 'Guida', title: 'Consigli per un caffè migliore', all: 'Tutte le guide' },
  en: { eyebrow: 'Guides', title: 'Know-how for better coffee', all: 'All guides' },
};

/** Drei Ratgeber als Karten (Startseite): stärkt interne Links zu den Ratgebern */
export function GuideTeaser({ lang, slugs = ['dersut-sorten-vergleich', 'kaffeebohnen-vollautomat', 'kaffee-buero-kosten'] }: { lang: Locale; slugs?: string[] }) {
  const t = T[lang];
  const list = slugs.map((s) => ARTICLES.find((a) => a.slug === s)).filter((a) => !!a);
  return (
    <section className="section">
      <div className="wrap">
        <header className="section__head section__head--center">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="h2">{t.title}</h2>
        </header>
        <div className="guides">
          {list.map((a) => {
            const x = shipText(a.text[lang]);
            const href = lp(lang, `/ratgeber/${a.slug}`);
            return (
              <article className="guide-card" key={a.slug}>
                <Link href={href} className="guide-card__img" tabIndex={-1} aria-hidden="true"><Img src={brand(a.image)} alt="" /></Link>
                <div className="guide-card__body">
                  <h3 className="h3"><Link href={href}>{x.title}</Link></h3>
                  <p>{x.teaser}</p>
                  <Link className="link-arrow" href={href}>{RATGEBER_PAGE[lang].readMore} <Icon name="arrow" /></Link>
                </div>
              </article>
            );
          })}
        </div>
        <p className="center" style={{ marginTop: 28 }}><Link className="btn btn--outline" href={lp(lang, '/ratgeber')}>{t.all} <Icon name="arrow" /></Link></p>
      </div>
    </section>
  );
}
