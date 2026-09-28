"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { AuthImageShell as AuthShell } from "@/components/auth/AuthImageShell";
import { AuthField, PasswordField } from "@/components/auth/AuthField";
import { AuthError, Spinner } from "@/components/auth/AuthStatus";

/** Login (§21): email + password, forgot link right-aligned, no-account footer. */
export default function LoginPage() {
  const t = useTranslations("auth");
  const tPublic = useTranslations("publicAuth.login");
  const tCommon = useTranslations("common");
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(email, password);
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
          {t("noAccount")}{" "}
          <Link href="/register" className="btn-text">
            {t("register")}
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="grid gap-5">
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
          autoComplete="current-password"
          required
          labelAction={
            <Link
              href="/forgot-password"
              className="text-[13px] font-semibold text-blue-600 underline-offset-4 hover:underline"
            >
              {t("forgotPassword")}
            </Link>
          }
        />

        <button type="submit" disabled={isSubmitting} className="btn-primary mt-3 w-full">
          {isSubmitting ? <Spinner /> : null}
          <span>{isSubmitting ? tCommon("loading") : t("login")}</span>
        </button>
      </form>
    </AuthShell>
  );
}
