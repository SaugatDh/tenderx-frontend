"use client";

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";

export type FieldProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  hint?: string;
  invalid?: boolean;
  error?: string;
  inputRef?: React.Ref<HTMLInputElement>;
};

/** Text input (§26): 48px, 12px radius, green focus ring, inline error. */
export function AuthField({
  label,
  type = "text",
  value,
  onChange,
  autoComplete,
  required,
  minLength,
  hint,
  invalid,
  error,
  inputRef,
}: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[14px] font-semibold text-slate-900">
        {label}
        {required && (
          <span className="ms-1 text-danger" aria-hidden>
            *
          </span>
        )}
      </label>

      <input
        id={id}
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        aria-invalid={invalid || undefined}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={`input-base ${invalid ? "border-danger focus:border-danger focus:shadow-none" : ""}`}
      />

      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-[13px] font-medium text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-2 text-[13px] text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Password input with 40px show/hide toggle and switching accessible name. */
export function PasswordField(
  props: Omit<FieldProps, "type"> & { labelAction?: React.ReactNode },
) {
  const tCommon = useTranslations("common");
  const [visible, setVisible] = useState(false);
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-[14px] font-semibold text-slate-900">
          {props.label}
          {props.required && (
            <span className="ms-1 text-danger" aria-hidden>
              *
            </span>
          )}
        </label>
        {props.labelAction}
      </div>

      <div className="relative">
        <input
          id={id}
          ref={props.inputRef}
          type={visible ? "text" : "password"}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          autoComplete={props.autoComplete}
          required={props.required}
          minLength={props.minLength}
          aria-invalid={props.invalid || undefined}
          aria-describedby={props.error ? errorId : undefined}
          className={`input-base pe-14 ${
            props.invalid ? "border-danger focus:border-danger focus:shadow-none" : ""
          }`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? tCommon("hidePassword") : tCommon("showPassword")}
          className="absolute end-1 top-1 inline-flex h-10 w-10 items-center justify-center rounded-sm text-slate-500 transition hover:text-slate-800"
        >
          {visible ? (
            <EyeOff size={18} strokeWidth={1.75} aria-hidden />
          ) : (
            <Eye size={18} strokeWidth={1.75} aria-hidden />
          )}
        </button>
      </div>

      {props.error ? (
        <p id={errorId} role="alert" className="mt-2 text-[13px] font-medium text-danger">
          {props.error}
        </p>
      ) : props.hint ? (
        <p className="mt-2 text-[13px] text-slate-500">{props.hint}</p>
      ) : null}
    </div>
  );
}
