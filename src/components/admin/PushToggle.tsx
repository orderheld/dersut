'use client';

import { useEffect, useState } from 'react';
import { removePushAction, savePushAction, testPushAction } from '@/app/admin/actions';

type State = 'loading' | 'unsupported' | 'ios-install' | 'denied' | 'off' | 'on';

function keyBytes(base64url: string): Uint8Array {
  const pad = '='.repeat((4 - (base64url.length % 4)) % 4);
  const raw = atob((base64url + pad).replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

function deviceName(): string {
  const ua = navigator.userAgent;
  const os = /iPhone|iPad/.test(ua) ? 'iPhone/iPad' : /Android/.test(ua) ? 'Android' : /Mac/.test(ua) ? 'Mac' : /Windows/.test(ua) ? 'Windows' : 'Gerät';
  const br = /Edg\//.test(ua) ? 'Edge' : /Firefox\//.test(ua) ? 'Firefox' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : '';
  return [os, br].filter(Boolean).join(' · ');
}

async function registration() {
  return navigator.serviceWorker.register('/admin-sw.js', { scope: '/admin' });
}

export function PushToggle({ publicKey }: { publicKey: string }) {
  const [state, setState] = useState<State>('loading');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const ios = /iPhone|iPad/.test(navigator.userAgent);
      const standalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true;
      if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
        setState(ios && !standalone ? 'ios-install' : 'unsupported');
        return;
      }
      if (Notification.permission === 'denied') return setState('denied');
      const sub = await (await registration()).pushManager.getSubscription();
      setState(sub ? 'on' : 'off');
    })().catch(() => setState('unsupported'));
  }, []);

  async function enable() {
    setBusy(true); setMsg('');
    try {
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') { setState(perm === 'denied' ? 'denied' : 'off'); return; }
      const reg = await registration();
      const sub = (await reg.pushManager.getSubscription()) ?? (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyBytes(publicKey) as BufferSource }));
      await savePushAction(sub.toJSON() as { endpoint: string; keys: { p256dh: string; auth: string } }, deviceName());
      setState('on');
      setMsg('Aktiviert. Zum Ausprobieren eine Test-Benachrichtigung senden.');
    } catch (e) {
      setMsg('Aktivieren hat nicht geklappt: ' + (e instanceof Error ? e.message : String(e)));
    } finally { setBusy(false); }
  }

  async function disable() {
    setBusy(true); setMsg('');
    try {
      const sub = await (await registration()).pushManager.getSubscription();
      if (sub) { await removePushAction(sub.endpoint); await sub.unsubscribe(); }
      setState('off');
    } finally { setBusy(false); }
  }

  async function test() {
    setBusy(true); setMsg('');
    try {
      const n = await testPushAction();
      setMsg(n ? `Gesendet an ${n} ${n === 1 ? 'Gerät' : 'Geräte'}.` : 'Kein aktives Gerät gefunden. Bitte erneut aktivieren.');
    } finally { setBusy(false); }
  }

  return (
    <div>
      {state === 'loading' && <p className="muted">Wird geprüft …</p>}
      {state === 'ios-install' && (
        <p className="muted">
          Auf dem iPhone funktionieren Push-Nachrichten nur aus der Admin-App: In Safari unten auf <strong>Teilen</strong> tippen, dann
          <strong> Zum Home-Bildschirm</strong>. Danach die App «Dersut Admin» öffnen und hier aktivieren.
        </p>
      )}
      {state === 'unsupported' && <p className="muted">Dieser Browser unterstützt keine Push-Benachrichtigungen.</p>}
      {state === 'denied' && <p className="muted">Benachrichtigungen sind für diese Seite blockiert. Bitte in den Browser- bzw. Handy-Einstellungen erlauben und die Seite neu laden.</p>}
      {state === 'off' && <button className="btn btn--primary" type="button" onClick={enable} disabled={busy}>Auf diesem Gerät aktivieren</button>}
      {state === 'on' && (
        <p style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <strong style={{ color: 'var(--ok)' }}>✓ Auf diesem Gerät aktiv</strong>
          <button className="btn btn--ghost" type="button" onClick={test} disabled={busy}>Test senden</button>
          <button className="link-btn" type="button" onClick={disable} disabled={busy}>ausschalten</button>
        </p>
      )}
      {msg && <p className="muted small" role="status">{msg}</p>}
    </div>
  );
}
