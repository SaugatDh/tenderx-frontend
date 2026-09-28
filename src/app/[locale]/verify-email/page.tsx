"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthNotice, Spinner, SuccessMark } from "@/components/auth/AuthStatus";

type Status = "pending" | "verifying" | "success" | "error";

/** Email verification (§25): pending / verifying / success / failure. */
export default function VerifyEmailPage() {
  const t = useTranslations("publicAuth.verify");
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { user, refreshUser } = useAuth();
  const [status, setStatus] = useState<Status>(token ? "verifying" : "pending");
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);
  const [resendError, setResendError] = useState("");
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    api
      .post("/auth/verify-email", { token })
      .then(async () => {
        if (cancelled) return;
        await refreshUser();
        if (!cancelled) setStatus("success");
      })
      .catch((err) => {
        if (cancelled) return;
        setStatus("error");
        setError(err instanceof ApiError ? err.message : t("failBody"));
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function handleResend() {
    setResendError("");
    setIsResending(true);
    try {
      await api.post("/auth/resend-verification", { locale });
      setResent(true);
    } catch (err) {
      setResendError(err instanceof ApiError ? err.message : tCommon("somethingWrong"));
    } finally {
      setIsResending(false);
    }
  }

  if (status === "verifying") {
    return (
      <AuthShell title={t("title")} subtitle={t("supporting")}>
        <p
          role="status"
          aria-live="polite"
          className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-4 text-[15px] font-medium text-slate-700"
        >
          <Spinner className="text-blue-500" />
          {t("verifying")}
        </p>
      </AuthShell>
    );
  }

  if (status === "success") {
    return (
      <AuthShell title={t("successTitle")} subtitle={t("successBody")}>
        <div className="text-center">
          <SuccessMark label={t("successTitle")} />
        </div>
        <Link href="/bid" className="btn-primary w-full">
          {t("goToWorkspace")}
        </Link>
      </AuthShell>
    );
  }

  if (status === "error") {
    return (
      <AuthShell
        title={t("failTitle")}
        subtitle={error || t("failBody")}
        headerSlot={resendError ? <div className="mt-6"><AuthNotice message={resendError} /></div> : null}
        footer={
          <Link href="/login" className="btn-text">
            {tAuth("backToLogin")}
          </Link>
        }
      >
        <div className="grid gap-4">
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="btn-primary w-full"
          >
            {isResending ? <Spinner /> : null}
            <span>{isResending ? tCommon("loading") : t("resend")}</span>
          </button>
          {resent && <AuthNotice message={t("supporting")} />}
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={t("title")}
      subtitle={t("message", { email: user?.email ?? "" })}
      headerSlot={<p className="mt-4 text-body text-slate-700">{t("supporting")}</p>}
      footer={
        <Link href="/" className="btn-text">
          {t("backHome")}
        </Link>
      }
    >
      <div className="grid gap-4">
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="btn-primary w-full"
        >
          {isResending ? <Spinner /> : null}
          <span>{isResending ? tCommon("loading") : t("resend")}</span>
        </button>
        {resent && <AuthNotice message={t("supporting")} />}
        {resendError && <AuthNotice message={resendError} />}
      </div>
    </AuthShell>
  );
}
