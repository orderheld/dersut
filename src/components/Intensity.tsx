import { getDict } from '@/i18n';
import type { Locale } from '@/lib/i18n';

export function Intensity({ value, lang, label = true }: { value: number; lang: Locale; label?: boolean }) {
  const t = getDict(lang);
  return (
    <div className="intensity" role="img" aria-label={t.a11y.intensity(value)}>
      {label && <span className="intensity__label">{t.product.intensity}</span>}
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`intensity__dot${i <= value ? ' is-on' : ''}`} />
      ))}
    </div>
  );
}
