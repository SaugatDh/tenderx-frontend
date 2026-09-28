import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, Check } from "lucide-react";
import { BrandLink } from "@/components/public/Wordmark";
import { SignatureInk } from "@/components/public/TenderWorkspace";

/** Shared document access desk; the existing auth forms own their state and API calls. */
export function AuthShell({ title, subtitle, children, footer, headerSlot }: { title: string; subtitle: string; children: React.ReactNode; footer?: React.ReactNode; headerSlot?: React.ReactNode }) {
  const common = useTranslations("common");
  const d = useTranslations("desk");
  const t = useTranslations("landing.preview");
  const locale = useLocale();
  return <div className="auth-desk drafting-grid"><header className="container-x auth-desk-header"><BrandLink /><Link href={`/${locale}`}><ArrowLeft size={16} />{common("backToHome")}</Link></header><main className="container-x auth-desk-layout">
    <aside className="auth-desk-story"><div className="auth-paper-stack" aria-hidden="true"><div><p className="desk-micro">01 / {t("partners.header")}</p></div><div><p className="desk-micro">02 / {d("agreement")}</p></div><div><p className="desk-micro">03 / {t("documents.header")}</p><strong>{t("project.jvName")}</strong><div className="desk-paper-rule" /><div className="desk-paper-rule short" /><SignatureInk /><span className="desk-paper-status"><Check size={12} />{d("ready")}</span></div></div><h2>{d("accessBody")}</h2><p>{d("accessNote")}</p></aside>
    <section className="auth-access-card" aria-labelledby="auth-title"><p className="desk-eyebrow">{d("accessLabel")}</p><h1 id="auth-title">{title}</h1><p>{subtitle}</p>{headerSlot}<div className="mt-8">{children}</div>{footer && <div className="auth-access-card-footer">{footer}</div>}</section>
  </main></div>;
}
