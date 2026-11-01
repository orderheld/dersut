'use client';

/** Druckt Dokumente für alle angehakten Bestellungen der Liste (öffnet die Druckansicht in einem neuen Tab). */
export function PrintSelected() {
  const open = (doc: string) => {
    const ids = [...document.querySelectorAll<HTMLInputElement>('input[name="ids"]:checked')].map((c) => c.value);
    if (!ids.length) {
      alert('Bitte zuerst Bestellungen anhaken.');
      return;
    }
    window.open(`/admin/druck?doc=${doc}&ids=${ids.join(',')}`, '_blank');
  };
  return (
    <span className="printsel">
      <span>Drucken:</span>
      <button type="button" className="btn btn--ghost btn--sm" onClick={() => open('lieferschein')}>Lieferscheine</button>
      <button type="button" className="btn btn--ghost btn--sm" onClick={() => open('rechnung')}>Rechnungen</button>
      <button type="button" className="btn btn--ghost btn--sm" onClick={() => open('etikett')}>Adressetiketten</button>
    </span>
  );
}
