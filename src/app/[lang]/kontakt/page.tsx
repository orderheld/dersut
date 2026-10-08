import type { Metadata } from 'next';
import { Fragment } from 'react';
import { ContactFormAuto } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import { PageHero } from '@/components/PageHero';
import { getDict } from '@/i18n';
import { config } from '@/lib/config';
import { companyAddressLines } from '@/lib/format';
import { asLocale } from '@/lib/i18n';
import { pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const t = getDict(lang).contact;
  return pageMeta(lang, '/kontakt', t.metaTitle, t.metaDescription);
}

export default async function Kontakt({ params }: Props) {
  const lang = asLocale((await params).lang);
  const T = getDict(lang);
  const t = T.contact;
  const phone = config.company.phone;
  return (
    <>
      <PageHero lang={lang} crumb={T.nav.contact} eyebrow={t.eyebrow} title={<span dangerouslySetInnerHTML={{ __html: t.heading }} />} lead={t.lead} />
      <section className="section">
        <div className="wrap contact-grid">
          <div className="contact-cards">
            <a className="ccard" href={`mailto:${config.email.info}`}><Icon name="mail" /><div><strong>{t.emailTitle}</strong><span>{config.email.info}</span><small>{t.emailSub}</small></div></a>
            {phone && <a className="ccard" href={`tel:${phone.replace(/[^+\d]/g, '')}`}><Icon name="phone" /><div><strong>{t.phone}</strong><span>{phone}</span></div></a>}
            <div className="ccard"><Icon name="pin" /><div><strong>{t.addressTitle}</strong><small style={{ fontSize: 14.5, color: 'var(--text)' }}>{companyAddressLines(T.common.country).map((l, i) => <Fragment key={i}>{i > 0 && <br />}{l}</Fragment>)}</small></div></div>
          </div>
          <div className="form-card" style={{ margin: 0 }}>
            <ContactFormAuto lang={lang} />
          </div>
        </div>
      </section>
    </>
  );
}
