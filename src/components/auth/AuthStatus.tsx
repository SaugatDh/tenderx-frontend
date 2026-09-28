"use client";

import { AlertCircle, Check } from "lucide-react";

/** Loading spinner that keeps button width stable (§27). */
export function Spinner({ className = "" }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block h-4 w-4 animate-spin-slow rounded-pill border-2 border-current border-t-transparent ${className}`}
    />
  );
}

/** Server/global form error — assertive live region, no field shake. */
export function AuthError({ message }: { message: string }) {
  return (
    <p
      role="alert"
      aria-live="assertive"
      className="mb-5 flex items-start gap-2 rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-[14px] font-medium text-danger"
    >
      <AlertCircle size={17} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

/** Neutral notice (e.g. reset-link sent) — never leaks account existence. */
export function AuthNotice({ message }: { message: string }) {
  return (
    <p
      role="status"
      aria-live="polite"
      className="mb-5 flex items-start gap-2 rounded-md border border-slate-200 bg-slate-100 px-4 py-3 text-[14px] font-medium text-slate-700"
    >
      {message}
    </p>
  );
}

/** Blue check in soft blue circle for verification success (§25). */
export function SuccessMark({ label }: { label: string }) {
  return (
    <span className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-pill bg-blue-50 text-blue-600">
      <span className="sr-only">{label}</span>
      <Check size={28} strokeWidth={2} aria-hidden />
    </span>
  );
}
