import type { Metadata } from 'next';
import { settingsReady } from '@/lib/db';
import { B2BPage } from '@/components/B2BPage';
import { B2B } from '@/content/b2b';
import { asLocale } from '@/lib/i18n';
import { pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await settingsReady();
  const lang = asLocale((await params).lang);
  const t = B2B.gastro[lang];
  return pageMeta(lang, '/gastronomie', t.metaTitle, t.metaDescription);
}

export default async function Gastronomie({ params }: Props) {
  await settingsReady();
  return <B2BPage kind="gastro" lang={asLocale((await params).lang)} />;
}
