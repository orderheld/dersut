/**
 * Dekoration hinter freigestellten Packungen: ein paar ausgeschüttete Kaffeebohnen und ein kleines Blatt
 * (ausgeschnitten aus dem Originalbild «foglie» von Dersut, public/deco/beans.webp) und ein weicher Bodenschatten.
 */
export function PackDeco() {
  return (
    <span className="pack-deco" aria-hidden="true">
      <span className="pack-deco__floor" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/deco/beans.webp" alt="" className="pack-deco__beans" width={1000} height={300} loading="lazy" decoding="async" />
    </span>
  );
}
