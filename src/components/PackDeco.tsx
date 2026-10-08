import { brand } from '@/lib/brand';
import { Img } from './Img';

/**
 * Bühne hinter freigestellten Packungen: heller Kreis in der Produktfarbe, ein Kaffeezweig
 * mit Bohnen (Originalbild von Dersut) und ein weicher Bodenschatten. Rein dekorativ.
 */
export function PackDeco() {
  return (
    <span className="pack-deco" aria-hidden="true">
      <span className="pack-deco__disc" />
      <Img src={brand('foglie')} alt="" className="pack-deco__leaf" sizes="(max-width: 640px) 45vw, 320px" />
      <span className="pack-deco__floor" />
    </span>
  );
}
