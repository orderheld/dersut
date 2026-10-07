export function Intensity({ value, label = true }: { value: number; label?: boolean }) {
  return (
    <div className="intensity" aria-label={`Intensität ${value} von 5`}>
      {label && <span className="intensity__label">Intensität</span>}
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`intensity__dot${i <= value ? ' is-on' : ''}`} />
      ))}
    </div>
  );
}
