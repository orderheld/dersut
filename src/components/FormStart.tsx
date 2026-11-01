'use client';

import { useEffect, useState } from 'react';

/** Merkt sich, wann das Formular geöffnet wurde (Spamschutz: Bots schicken sofort ab oder ganz ohne Browser). */
export function FormStart() {
  const [t, setT] = useState('');
  useEffect(() => setT(String(Date.now())), []);
  return <input type="hidden" name="started" value={t} />;
}
