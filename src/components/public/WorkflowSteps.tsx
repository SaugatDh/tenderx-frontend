import { useTranslations } from "next-intl";
import { Building2, ClipboardCheck, FileCheck2, FileText } from "lucide-react";

export function WorkflowSteps() {
  const t = useTranslations("landing.workflow");
  const d = useTranslations("desk");
  const steps = [{ title: t("steps.one.title"), body: t("steps.one.body"), Icon: Building2 }, { title: t("steps.two.title"), body: t("steps.two.body"), Icon: FileText }, { title: d("reviewTitle"), body: d("reviewBody"), Icon: ClipboardCheck }, { title: d("generateTitle"), body: d("generateBody"), Icon: FileCheck2 }];
  return <section className="desk-section desk-workflow" id="how-it-works"><div className="container-x"><div className="desk-section-heading"><p className="desk-eyebrow">05 / {d("workflow")}</p><h2>{t("titleLine1")}<br />{t("titleLine2")}</h2></div><ol className="desk-workflow-steps" data-desk-motion>{steps.map(({ title, body, Icon }, i) => <li key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p><Icon className="desk-workflow-icon" size={24} strokeWidth={1.5} /></li>)}</ol></div></section>;
}
