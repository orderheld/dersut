import type { Locale } from '@/lib/i18n';
import { de, type Dict } from './de';
import { en } from './en';
import { fr } from './fr';
import { it } from './it';

const DICTS: Record<Locale, Dict> = { de, fr, it, en };

export function getDict(lang: Locale): Dict {
  return DICTS[lang];
}

export type { Dict };
