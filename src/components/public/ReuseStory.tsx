import { useTranslations } from "next-intl";
import { ArrowRight, Check, Layers } from "lucide-react";

export function ReuseStory() {
  const t = useTranslations("landing.reuse");
  const d = useTranslations("desk");
  const p = useTranslations("partner");
  const preview = useTranslations("landing.preview.partners");
  return <section className="desk-section desk-reuse"><div className="container-x desk-reuse-grid"><div className="desk-section-heading"><p className="desk-eyebrow">02 / {d("savedProfile")}</p><h2>{d("reuseTitle")}</h2><p>{t("description")}</p></div><div className="desk-reuse-path" data-desk-motion>
    {[false, true].map((reused, index) => <div key={index} style={{ display: "contents" }}>{reused && <ArrowRight size={23} />}<div className="desk-reuse-sheet"><p className="desk-micro">{d(reused ? "bidB" : "bidA")}</p><strong>{preview("companyOne")}</strong>{[p("address"), p("ceo"), preview("signature"), preview("stamp")].map(field => <div className="desk-reuse-field" key={field}><span>{field}</span>{reused ? <Check size={13} /> : <span>—</span>}</div>)}<span className="desk-paper-status">{reused ? <Check size={12} /> : <Layers size={12} />}{d(reused ? "profileReused" : "savedProfile")}</span></div></div>)}
    <div className="desk-reuse-badge"><Layers size={15} />{d("reuseHint")}</div>
  </div></div></section>;
}
