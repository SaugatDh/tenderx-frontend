"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { api, ApiError } from "@/lib/api";
import { AuthImageShell as AuthShell } from "@/components/auth/AuthImageShell";
import { AuthField } from "@/components/auth/AuthField";
import { AuthError, AuthNotice, Spinner } from "@/components/auth/AuthStatus";

/** Forgot password (§23): neutral success, never reveals account existence. */
export default function ForgotPasswordPage() {
  const t = useTranslations("auth");
  const tPublic = useTranslations("publicAuth.forgot");
  const tCommon = useTranslations("common");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
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
        <Link href="/login" className="btn-text">
          {t("backToLogin")}
        </Link>
      }
    >
      {sent ? (
        <AuthNotice message={t("resetLinkSent")} />
      ) : (
        <form onSubmit={handleSubmit} noValidate className="grid gap-5">
          <AuthField
            label={t("email")}
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            required
          />
          <button type="submit" disabled={isSubmitting} className="btn-primary mt-3 w-full">
            {isSubmitting ? <Spinner /> : null}
            <span>{isSubmitting ? tCommon("loading") : t("sendResetLink")}</span>
          </button>
        </form>
      )}
    </AuthShell>
  );
}
