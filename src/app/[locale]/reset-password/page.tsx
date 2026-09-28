"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { api, ApiError, setToken } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordField } from "@/components/auth/AuthField";
import { AuthError, AuthNotice, Spinner } from "@/components/auth/AuthStatus";

/** Reset password (§24): loading / invalid-link / success states. */
export default function ResetPasswordPage() {
  const t = useTranslations("auth");
  const tPublic = useTranslations("publicAuth.reset");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { refreshUser } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError("");
    setIsSubmitting(true);
    try {
      const { access_token } = await api.post<{ access_token: string }>("/auth/reset-password", {
        token,
        new_password: newPassword,
      });
      setToken(access_token);
      await refreshUser();
      setSuccess(true);
      window.setTimeout(() => router.push("/bid"), 1200);
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
      headerSlot={
        <div className="mt-6">
          {error && <AuthError message={error} />}
          {success && <AuthNotice message={t("passwordResetSuccess")} />}
        </div>
      }
      footer={
        <Link href="/login" className="btn-text">
          {t("backToLogin")}
        </Link>
      }
    >
      {!token ? (
        <div className="grid gap-4">
          <AuthError message={tPublic("missingLink")} />
          <Link href="/forgot-password" className="btn-secondary w-full">
            {t("sendResetLink")}
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="grid gap-5">
          <PasswordField
            label={t("newPassword")}
            value={newPassword}
            onChange={setNewPassword}
            autoComplete="new-password"
            minLength={8}
            required
            hint={tPublic("passwordHint")}
          />
          <button type="submit" disabled={isSubmitting} className="btn-primary mt-3 w-full">
            {isSubmitting ? <Spinner /> : null}
            <span>{isSubmitting ? tCommon("loading") : t("resetPassword")}</span>
          </button>
        </form>
      )}
    </AuthShell>
  );
}
