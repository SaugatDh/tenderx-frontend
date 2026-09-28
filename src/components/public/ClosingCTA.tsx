import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export function ClosingCTA() {
  const t = useTranslations("landing.closing");
  const nav = useTranslations("landing.nav");
  const d = useTranslations("desk");
  const locale = useLocale();
  return <section className="desk-final-wrap"><div className="container-x desk-final-page"><p className="desk-eyebrow">{d("finalStep")}</p><h2>{t("title")}</h2><div className="desk-final-actions"><Link className="btn-primary desk-primary" href={`/${locale}/register`}>{d("createWorkspace")}<ArrowRight size={18} /></Link><Link className="btn-ghost" href={`/${locale}/login`}>{nav("logIn")}<ArrowRight size={16} /></Link></div><div className="desk-final-bottom"><span>{t("trialNote")}</span><span>{d("page")}</span></div></div></section>;
}
