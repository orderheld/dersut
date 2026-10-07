import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="error-page">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1 className="h1">Diese Seite gibt es nicht</h1>
        <p className="lead" style={{ margin: '0 auto 30px' }}>Vielleicht finden Sie, was Sie suchen, in unserem Shop oder auf der Startseite.</p>
        <Link className="btn btn--primary" href="/">Zur Startseite</Link>{' '}
        <Link className="btn btn--outline" href="/shop">Zum Shop</Link>
      </div>
    </section>
  );
}
