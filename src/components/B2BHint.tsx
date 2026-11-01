import Link from 'next/link';
import { PROMO, phoneLinks } from '@/content/promo';
import { config } from '@/lib/config';
import { lp, type Locale } from '@/lib/i18n';
import { Icon } from './Icon';

/** Hinweis für Geschäftskunden im Shop und auf der Produktseite: Gastronomie, Firmen, Telefon. */
export function B2BHint({ lang, compact = false }: { lang: Locale; compact?: boolean }) {
  const t = PROMO[lang];
  const phone = config.company.phone;
  const links = phone ? phoneLinks(phone) : null;
  return (
    <aside className={`b2bhint${compact ? ' b2bhint--compact' : ''}`} aria-label={t.b2bTitle}>
      <span className="b2bhint__icon"><Icon name="cup" /></span>
      <div className="b2bhint__text">
        <strong>{t.b2bTitle}</strong>
        <span>{t.b2bText}</span>
      </div>
      <div className="b2bhint__actions">
        <Link className="btn btn--primary" href={lp(lang, '/gastronomie#anfrage')}>{t.b2bGastro} <Icon name="arrow" /></Link>
        <Link className="btn btn--outline" href={lp(lang, '/firmen#anfrage')}>{t.b2bOffice} <Icon name="arrow" /></Link>
        {links && !compact && <a className="b2bhint__tel" href={links.tel}><Icon name="phone" /> {phone}</a>}
      </div>
    </aside>
  );
}

/** Direkte Kontaktwege (Telefon, WhatsApp, E-Mail) für die Seiten Gastronomie und Firmen */
export function QuickContact({ lang }: { lang: Locale }) {
  const t = PROMO[lang];
  const phone = config.company.phone;
  if (!phone) return null;
  const { tel, wa } = phoneLinks(phone);
  return (
    <div className="quickcontact">
      <p>{t.b2bQuick}</p>
      <div className="quickcontact__links">
        <a className="btn btn--outline" href={tel}><Icon name="phone" /> {phone}</a>
        <a className="btn btn--outline" href={wa} target="_blank" rel="noopener"><svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z" /></svg> {t.whatsapp}</a>
        <a className="btn btn--outline" href={`mailto:${config.email.info}`}><Icon name="mail" /> {config.email.info}</a>
      </div>
    </div>
  );
}
