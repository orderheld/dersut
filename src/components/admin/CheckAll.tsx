'use client';

export function CheckAll({ name }: { name: string }) {
  return (
    <input
      type="checkbox"
      aria-label="Alle auswählen"
      onChange={(e) => {
        const form = e.currentTarget.form;
        form?.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`).forEach((c) => (c.checked = e.currentTarget.checked));
      }}
    />
  );
}
