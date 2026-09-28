"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { AuthImageShell as AuthShell } from "@/components/auth/AuthImageShell";
import { AuthField, PasswordField } from "@/components/auth/AuthField";
import { AuthError, Spinner } from "@/components/auth/AuthStatus";

/** Register (§22): name + email + password only. No company fields yet. */
export default function RegisterPage() {
  const t = useTranslations("auth");
  const tPublic = useTranslations("publicAuth.register");
  const tCommon = useTranslations("common");
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await register(email, password, fullName);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : tCommon("somethingWrong"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      title={tPublic("title")}
      subtitle={tPublic("subtitle")}
      headerSlot={error ? <div className="mt-6"><AuthError message={error} /></div> : null}
      footer={
        <>
          {t("haveAccount")}{" "}
          <Link href="/login" className="btn-text">
            {t("login")}
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="grid gap-5">
        <AuthField
          label={t("fullName")}
          value={fullName}
          onChange={setFullName}
          autoComplete="name"
          required
        />
        <AuthField
          label={t("email")}
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />
        <PasswordField
          label={t("password")}
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          minLength={8}
          required
          hint={tPublic("passwordHint")}
        />

        <button type="submit" disabled={isSubmitting} className="btn-primary mt-3 w-full">
          {isSubmitting ? <Spinner /> : null}
          <span>{isSubmitting ? tCommon("loading") : tPublic("submit")}</span>
        </button>

        <p className="text-center text-[13px] text-slate-500">{tPublic("trialNote")}</p>
      </form>
    </AuthShell>
  );
}
