"use client";

import { useTranslations } from "next-intl";
import { Building2, Check, FileText, Folder, Layers, PenLine } from "lucide-react";
import { Wordmark } from "./Wordmark";

export type Lens = "project" | "partners" | "documents";
export const lenses: Lens[] = ["project", "partners", "documents"];

export function SignatureInk() {
  return <svg className="desk-signature" viewBox="0 0 180 55" fill="none" aria-hidden="true"><path pathLength="1" d="M8 40C32 18 53 0 40 26S22 56 53 29s1 29 28 3 3 19 24 2 8 13 25 0l15-10m-88 22 109-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function PartnerRows() {
  const t = useTranslations("landing.preview.partners");
  return <div className="desk-partners">{["One", "Two", "Three"].map((key, i) => <div className="desk-partner" key={key}><span className="desk-avatar">{["SB", "VE", "HI"][i]}</span><div><strong>{t(`company${key}`)}</strong><small>{t(["lead", "first", "second"][i])}</small></div><span className="desk-share">{[40, 35, 25][i]}%</span><Check size={14} className="desk-check" /></div>)}</div>;
}

export function DocumentRows() {
  const t = useTranslations("landing.preview.documents");
  return <div className="desk-documents">{["bidDocument", "signatures", "supporting"].map(key => <div key={key}><FileText size={17} /><span>{t(key)}</span><Check size={14} className="desk-check" /></div>)}</div>;
}

/** A shared, explicitly fictional product specimen used throughout the public story. */
export function TenderWorkspace({ active, progress = 100, compact = false }: { active?: Lens; progress?: number; compact?: boolean }) {
  const t = useTranslations("landing.preview");
  const p = useTranslations("project");
  const d = useTranslations("desk");
  const muted = (key: Lens) => active && active !== key ? " is-muted" : "";
  return <div className={`desk-workspace${compact ? " is-compact" : ""}`}>
    <div className="desk-workspace-top"><Wordmark /><span><span className="desk-dot" />{t("samplePill")}</span></div>
    <div className="desk-workspace-body">
      <aside className="desk-sidebar" aria-hidden="true"><Layers size={19} /><Building2 size={19} /><PenLine size={19} /><Folder size={19} /><span>TX</span></aside>
      <div className="desk-workspace-content">
        <div className={`desk-project${muted("project")}`}><div className="desk-micro">{t("project.header")} <span>TX–024</span></div><h3>{t("project.projectName")}</h3><p>{t("project.jvName")}</p><div className="desk-project-meta"><span>{p("bidType")}<strong>{t("project.bidType")}</strong></span><span>{p("bidValidity")}<strong>{d("validity")}</strong></span></div></div>
        <div className={`desk-module${muted("partners")}`}><div className="desk-micro">{t("partners.header")}<span>03</span></div><PartnerRows /></div>
        <div className={`desk-module${muted("documents")}`}><div className="desk-micro">{t("documents.header")}<span>03</span></div><DocumentRows /></div>
        <div className="desk-readiness"><div><span>{d("readiness")}</span><strong>{progress}%</strong></div><div className="desk-progress"><span style={{ width: `${progress}%` }} /></div><small><Check size={12} />{progress === 100 ? d("ready") : d("assembling")}</small></div>
      </div>
    </div>
  </div>;
}
