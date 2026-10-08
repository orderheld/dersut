import Link from 'next/link';
import { B2B, B2B_PATH, type B2BKind } from '@/content/b2b';
import { brand } from '@/lib/brand';
import { lp, type Locale } from '@/lib/i18n';
import { absolute, breadcrumbLd, faqLd, jsonLd } from '@/lib/seo';
import { B2BForm } from './B2BForm';
import { Icon } from './Icon';
import { Img } from './Img';
import { PageHero } from './PageHero';
import { RegionLinks } from './RegionLinks';

/** Infoseite für Geschäftskunden (Gastronomie oder Firmen) mit Anfrageformular. */
export function B2BPage({ kind, lang }: { kind: B2BKind; lang: Locale }) {
  const t = B2B[kind][lang];
  const other: B2BKind = kind === 'gastro' ? 'office' : 'gastro';
  const path = B2B_PATH[kind];
  const url = absolute(lp(lang, path));
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: t.metaTitle,
      description: t.metaDescription,
      serviceType: kind === 'gastro' ? 'Kaffeelieferung für Gastronomie' : 'Bürokaffee für Firmen',
      provider: { '@id': absolute('/#organization') },
      areaServed: { '@type': 'Country', name: 'Switzerland' },
      audience: { '@type': 'BusinessAudience' },
      url,
    },
    breadcrumbLd(lang, [[t.crumb, path]]),
    faqLd(t.faq),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)} />
      <PageHero
        lang={lang}
        img={brand(kind === 'gastro' ? 'macchina' : 'tazze')}
        crumb={t.crumb}
        eyebrow={t.eyebrow}
        title={<>{t.title[0]}<br /><em>{t.title[1]}</em></>}
        lead={<>{t.lead}<span className="page-hero__cta"><a className="btn btn--gold btn--lg" href="#anfrage">{t.heroCta} <Icon name="arrow" /></a></span></>}
      />

      <section className="section section--white">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">{t.segEyebrow}</p>
            <h2 className="h2">{t.segTitle}</h2>
          </header>
          <div className="features">
            {t.segments.map(([icon, h, p]) => (
              <div className="feature" key={h}><Icon name={icon} /><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="split split--cream">
        <div className="wrap split__inner">
          <div className="split__media frame"><Img src={brand(kind === 'gastro' ? 'img_2' : 'img_3')} alt={t.imgAlt} sizes="(max-width: 900px) 100vw, 50vw" /></div>
          <div className="split__text">
            <p className="eyebrow">{t.whyEyebrow}</p>
            <h2 className="h2">{t.whyTitle}</h2>
            <p>{t.whyText}</p>
            <ul className="checks">
              {t.why.map((c) => <li key={c}><Icon name="check" /> {c}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">{t.stepsEyebrow}</p>
            <h2 className="h2">{t.stepsTitle}</h2>
          </header>
          <ol className="howto">
            {t.steps.map(([h, p], i) => (
              <li key={h}><span className="howto__icon"><Icon name={['mail', 'award', 'truck'][i]} /></span><h3>{h}</h3><p>{p}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--cream" id="anfrage">
        <div className="wrap b2b-form">
          <div className="b2b-form__intro">
            <p className="eyebrow">{t.formEyebrow}</p>
            <h2 className="h2">{t.formTitle}</h2>
            <p>{t.formText}</p>
            <ul className="checks">
              {t.why.slice(0, 3).map((c) => <li key={c}><Icon name="check" /> {c}</li>)}
            </ul>
          </div>
          <div className="form-card">
            <B2BForm kind={kind} lang={lang} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="section__head section__head--center"><h2 className="h2">{t.faqTitle}</h2></header>
          <div className="faq">
            {t.faq.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <div>{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RegionLinks lang={lang} />

      <section className="section section--tight">
        <div className="wrap cta-box">
          <div>
            <h2 className="h3">{t.crossTitle}</h2>
            <p>{t.crossText}</p>
          </div>
          <Link className="btn btn--outline btn--lg" href={lp(lang, B2B_PATH[other])}>{t.crossLink} <Icon name="arrow" /></Link>
        </div>
      </section>
    </>
  );
}
