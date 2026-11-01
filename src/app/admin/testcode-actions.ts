'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin';
import { saveTestCode } from '@/lib/testcode';
import type { FormState } from '@/components/admin/ActionForm';

/** Testcode für Probebestellungen zu CHF 0.05 ein- oder ausschalten bzw. neu erzeugen. */
export async function testCodeAction(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const op = String(fd.get('op') ?? '');
  if (op === 'on') await saveTestCode(true, false);
  else if (op === 'off') await saveTestCode(false, false);
  else if (op === 'renew') await saveTestCode(true, true);
  else return { error: 'Unbekannte Aktion.' };
  revalidatePath('/admin/shop');
  return {
    ok: op === 'off' ? 'Testcode ausgeschaltet. Bestehende Testlinks wirken nicht mehr.' : op === 'renew' ? 'Neuer Testlink erzeugt. Der alte wirkt nicht mehr.' : 'Testcode eingeschaltet.',
  };
}
