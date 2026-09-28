import { useTranslations } from "next-intl";
import { ArrowRight, Check, FileText, Layers } from "lucide-react";
import { SignatureInk } from "./TenderWorkspace";

export function DocumentGenerationStory() {
  const t = useTranslations("landing.docgen");
  const p = useTranslations("landing.preview");
  const d = useTranslations("desk");
  return <section className="desk-section desk-generation"><div className="container-x"><div className="desk-section-heading"><p className="desk-eyebrow">06 / {t("eyebrow")}</p><h2>{t("title")}</h2><p>{t("description")}</p></div><div className="desk-generation-flow" data-desk-motion>
    <div className="desk-generation-sources">{[p("tabs.project"), p("tabs.partners"), p("partners.signature"), p("tabs.documents")].map(label => <div key={label}><Layers size={16} /><span>{label}</span><Check size={14} /></div>)}</div>
    <div className="desk-generation-core" aria-hidden="true"><span /><strong>TX</strong><ArrowRight size={20} /></div>
    <div className="desk-generated-pages">{["one", "two", "three"].map((key, i) => <article key={key} className="desk-generated-page"><div className="desk-micro"><FileText size={16} /><span>PDF / 0{i + 1}</span></div><h3>{t(`docs.${key}`)}</h3><div className="desk-paper-rule" /><div className="desk-paper-rule" /><div className="desk-paper-rule short" /><SignatureInk /><span className="desk-paper-status"><Check size={13} />{t("ready")}</span></article>)}</div>
  </div><p className="desk-generation-note">{d("sampleOnly")}</p></div></section>;
}
