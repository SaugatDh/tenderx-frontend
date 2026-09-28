import { useTranslations } from "next-intl";
import { Check, FileText } from "lucide-react";
import { DocumentRows, PartnerRows } from "./TenderWorkspace";

export function WorkspaceModules() {
  const d = useTranslations("desk");
  const t = useTranslations("landing.preview");
  const p = useTranslations("project");
  return <section className="desk-section desk-modules-section"><div className="container-x"><div className="desk-section-heading"><p className="desk-eyebrow">03 / {d("workspaceSubtitle")}</p><h2>{d("oneWorkspace")}</h2></div><div className="desk-modules">
    <article className="desk-module-card"><p className="desk-micro"><FileText size={16} />{t("tabs.project")}<span>01</span></p><h3>{t("project.projectName")}</h3><dl><div><dt>{p("ifbNumber")}</dt><dd>TX / SAMPLE / 024</dd></div><div><dt>{p("bidType")}</dt><dd>{t("project.bidType")}</dd></div><div><dt>{p("bidValidity")}</dt><dd>{d("validity")}</dd></div></dl><span className="desk-paper-status"><Check size={13} />{d("projectReady")}</span></article>
    <article className="desk-module-card"><p className="desk-micro">{t("tabs.partners")}<span>02</span></p><PartnerRows /><div className="desk-ownership" aria-label="40%, 35%, 25%"><span /><span /><span /></div><small>{d("ownership")} · 100%</small></article>
    <article className="desk-module-card"><p className="desk-micro">{t("tabs.documents")}<span>03</span></p><DocumentRows /><small>{d("sampleOnly")}</small></article>
    <article className="desk-module-card desk-rail-card"><p className="desk-micro">{d("readiness")}<span>04</span></p><div className="desk-rails">{[t("tabs.project"), t("tabs.partners"), t("partners.signature"), t("tabs.documents")].map((label, i) => <div key={label}><span>{label}</span><i style={{ width: `${35 + i * 20}%` }} /><Check size={13} /></div>)}</div><div className="desk-ready-total"><span>{d("ready")}</span><strong>100<span>%</span></strong></div></article>
  </div></div></section>;
}
