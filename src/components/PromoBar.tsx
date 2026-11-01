'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

type Props = {
  lang: string;
  shopHref: string;
  businessHref: string;
  tel: string;
  text: {
    label: string;
    title: string;
    sub: string;
    order: string;
    orderShort: string;
    business: string;
    businessShort: string;
    call: string;
    close: string;
  };
};

const KEY = 'dersut-promo-closed';
const PAUSE_DAYS = 3;

/** Seiten, auf denen die Leiste stören würde (Kasse) oder doppelt wäre (Anfrageformular) */
const HIDE = /^\/(warenkorb|kasse|bestellung|gastronomie|firmen|kontakt|impressum|datenschutz|agb)(\/|$)/;

/**
 * Dezente Leiste am unteren Rand: «Jetzt bestellen» für Privatkunden und «Für Gastronomie & Büro»
 * für Geschäftskunden. Erscheint erst nach etwas Scrollen, lässt sich schliessen und bleibt dann
 * ein paar Tage weg. Auf der Produktseite am Handy ausgeblendet (dort gibt es die Kaufleiste).
 */
export function PromoBar({ lang, shopHref, businessHref, tel, text }: Props) {
  const pathname = usePathname() || '/';
  const path = lang === 'de' ? pathname : pathname.replace(new RegExp(`^/${lang}(?=/|$)`), '') || '/';
  const hidden = HIDE.test(path);
  const onProduct = /^\/shop\/[^/]+/.test(path);
  const onShop = /^\/shop\/?$/.test(path);
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const t = Number(localStorage.getItem(KEY) || 0);
      setClosed(Date.now() - t < PAUSE_DAYS * 864e5);
    } catch {
      setClosed(false);
    }
  }, []);

  useEffect(() => {
    if (closed || hidden) return;
    const check = () => setShow(window.scrollY > Math.min(600, window.innerHeight * 0.6));
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [closed, hidden]);

  // Platz unten freihalten, damit die Leiste nichts verdeckt
  useEffect(() => {
    const on = show && !closed && !hidden;
    document.body.classList.toggle('promo-on', on);
    if (on && ref.current) document.body.style.setProperty('--promo-h', `${ref.current.offsetHeight}px`);
    return () => document.body.classList.remove('promo-on');
  }, [show, closed, hidden]);

  if (closed || hidden) return null;

  const close = () => {
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {}
    setClosed(true);
  };

  return (
    <div ref={ref} className={`promo${show ? ' is-in' : ''}${onProduct ? ' promo--pd' : ''}`} role="region" aria-label={text.label} aria-hidden={!show}>
      <div className="wrap promo__inner">
        <p className="promo__text">
          <strong>{text.title}</strong>
          <span><Icon name="truck" /> {text.sub}</span>
        </p>
        <div className="promo__actions">
          {!onShop && !onProduct && (
            <Link className="btn btn--gold promo__btn" href={shopHref} tabIndex={show ? 0 : -1}>
              <Icon name="bag" /> <span className="promo__long">{text.order}</span><span className="promo__short">{text.orderShort}</span>
            </Link>
          )}
          <Link className="btn btn--outline-light promo__btn" href={businessHref} tabIndex={show ? 0 : -1}>
            <Icon name="cup" /> <span className="promo__long">{text.business}</span><span className="promo__short">{text.businessShort}</span>
          </Link>
          <a className="promo__call" href={tel} aria-label={text.call} title={text.call} tabIndex={show ? 0 : -1}><Icon name="phone" /></a>
        </div>
        <button type="button" className="promo__close" onClick={close} aria-label={text.close} tabIndex={show ? 0 : -1}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
      </div>
    </div>
  );
}
