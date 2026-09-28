import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { DocumentRows, PartnerRows, SignatureInk } from "./TenderWorkspace";

/** Four editorial product chapters, each with a real document fragment. */
export function FeatureGrid() {
  const t = useTranslations("landing.features.items");
  const d = useTranslations("desk");
  const p = useTranslations("partner");
  const preview = useTranslations("landing.preview.partners");
  return <section className="desk-section desk-chapters" id="features"><div className="container-x"><div className="desk-section-heading"><p className="desk-eyebrow">04 / {d("chapterLabel")}</p><h2>{d("chapters")}</h2></div>
    {["one", "two", "three", "four"].map((key, i) => <article className="desk-chapter" key={key}><span className="desk-chapter-number">0{i + 1}</span><div><h3>{t(`${key}.title`)}</h3><p>{t(`${key}.body`)}</p></div><div className="desk-chapter-visual" data-desk-motion>
      {i === 0 && <><p className="desk-micro">{d("savedProfile")}</p><div className="desk-profile-fields"><div><span>{p("partnerName")}</span><strong>{preview("companyOne")}</strong></div><div><span>{p("shortName")}</span><strong>Summit</strong></div><div><span>{p("address")}</span><strong>Kathmandu, Nepal</strong></div><div><span>{p("percentage")}</span><strong>40%</strong></div></div><span className="desk-paper-status"><Check size={13} />{preview("profileReady")}</span></>}
      {i === 1 && <><p className="desk-micro">{preview("signature")} + {preview("stamp")}</p><div className="desk-signature-pair"><SignatureInk /><span className="desk-stamp">TENDERX<br />DEMO</span></div><span className="desk-paper-status"><Check size={13} />{d("savedProfile")}</span></>}
      {i === 2 && <><PartnerRows /><div className="desk-ownership"><span /><span /><span /></div><span className="desk-paper-status">{d("ownership")} · 100%</span></>}
      {i === 3 && <><p className="desk-micro">{d("agreement")}</p><DocumentRows /><span className="desk-paper-status"><Check size={13} />{d("ready")}</span></>}
    </div></article>)}
  </div></section>;
}
