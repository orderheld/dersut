'use client';

import type { ReactNode } from 'react';

/** Absende-Knopf mit Rückfrage; optional mit eigener Server-Aktion (formAction). */
export function ConfirmButton({
  confirm,
  children,
  className,
  formAction,
  form,
}: {
  confirm: string;
  children: ReactNode;
  className?: string;
  formAction?: (fd: FormData) => void | Promise<void>;
  form?: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      formAction={formAction}
      form={form}
      onClick={(e) => {
        if (!window.confirm(confirm)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
