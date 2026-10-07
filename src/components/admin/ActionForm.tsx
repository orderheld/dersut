'use client';

import { startTransition, useActionState, useRef, type ReactNode } from 'react';

export type FormState = { error?: string; ok?: string; n?: number };

/**
 * Formular für eine Server-Aktion mit Rückmeldung (Fehler oder Erfolg).
 * Mit «confirm» wird vor dem Absenden nachgefragt.
 */
export function ActionForm({
  action,
  children,
  className,
  confirm,
  resetOnOk,
  id,
  hidden,
}: {
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
  children: ReactNode;
  className?: string;
  confirm?: string;
  resetOnOk?: boolean;
  id?: string;
  hidden?: boolean;
}) {
  const ref = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<FormState, FormData>(async (prev, fd) => {
    const next = await action(prev, fd);
    if (next.ok && resetOnOk) ref.current?.reset();
    return next;
  }, {});
  return (
    <form
      ref={ref}
      id={id}
      hidden={hidden}
      action={formAction}
      className={className}
      aria-busy={pending}
      onSubmit={(e) => {
        // Selbst absenden, damit React die Eingaben bei einem Fehler nicht zurücksetzt
        e.preventDefault();
        if (confirm && !window.confirm(confirm)) return;
        const fd = new FormData(e.currentTarget, (e.nativeEvent as SubmitEvent).submitter);
        startTransition(() => formAction(fd));
      }}
    >
      {state.error && <div className="flash flash--error" role="alert">{state.error}</div>}
      {state.ok && <div className="flash" role="status">{state.ok}</div>}
      {children}
    </form>
  );
}
