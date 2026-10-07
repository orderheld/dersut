import type { Metadata } from 'next';
import { Fragment } from 'react';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import { PageHero } from '@/components/PageHero';
import { config } from '@/lib/config';
import { companyAddressLines } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontakt zu Dersut Kaffee GmbH, dem offiziellen Vertrieb von Dersut Caffè in der Schweiz.',
};

export default async function Kontakt({ searchParams }: { searchParams: Promise<{ thema?: string }> }) {
  const { thema = '' } = await searchParams;
  const phone = config.company.phone;
  return (
    <>
      <PageHero crumb="Kontakt" eyebrow="Contatti" title={<>Wir sind <em>für Sie da</em></>} lead="Fragen zu Produkten, Bestellungen oder Angeboten für die Gastronomie? Schreiben Sie uns, wir antworten persönlich." />
      <section className="section">
        <div className="wrap contact-grid">
          <div className="contact-cards">
            <a className="ccard" href={`mailto:${config.email.info}`}><Icon name="mail" /><div><strong>E-Mail</strong><span>{config.email.info}</span><small>Bestellungen, Beratung, Gastronomie und alle weiteren Anliegen</small></div></a>
            {phone && <a className="ccard" href={`tel:${phone.replace(/[^+\d]/g, '')}`}><Icon name="phone" /><div><strong>Telefon</strong><span>{phone}</span></div></a>}
            <div className="ccard"><Icon name="pin" /><div><strong>Adresse</strong><small style={{ fontSize: 14.5, color: 'var(--text)' }}>{companyAddressLines().map((l, i) => <Fragment key={i}>{i > 0 && <br />}{l}</Fragment>)}</small></div></div>
          </div>
          <div className="form-card" style={{ margin: 0 }}>
            <ContactForm topic={thema} />
          </div>
        </div>
      </section>
    </>
  );
}
