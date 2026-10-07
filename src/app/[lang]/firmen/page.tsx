import type { Metadata } from 'next';
import { B2BPage } from '@/components/B2BPage';
import { B2B } from '@/content/b2b';
import { asLocale } from '@/lib/i18n';
import { pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const t = B2B.office[lang];
  return pageMeta(lang, '/firmen', t.metaTitle, t.metaDescription);
}

export default async function Firmen({ params }: Props) {
  return <B2BPage kind="office" lang={asLocale((await params).lang)} />;
}
