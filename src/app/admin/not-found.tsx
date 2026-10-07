import Link from 'next/link';

export default function AdminNotFound() {
  return (
    <div className="card empty">
      <p>Diese Seite gibt es im Admin nicht.</p>
      <Link className="btn btn--ghost" href="/admin">Zur Übersicht</Link>
    </div>
  );
}
