"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { lenses, type Lens, TenderWorkspace } from "./TenderWorkspace";

export function ProductLens() {
  const [active, setActive] = useState<Lens>("project");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const d = useTranslations("desk");
  const t = useTranslations("landing.preview");

  return (
    <section className="editorial-product" id="workspace" aria-labelledby="product-title">
      <div className="container-x">
        <div className="editorial-product-heading">
          <div><p className="editorial-kicker">01 / {d("product")}</p><h2 id="product-title">{d("comesTogether")}</h2></div>
          <p>{d("comesTogetherBody")}</p>
        </div>
        <div className="editorial-product-tour">
          <div className="editorial-tour-bar">
            <div role="tablist" aria-label={d("product")} onKeyDown={event => {
              const current = lenses.indexOf(active);
              const next = event.key === "ArrowRight" ? (current + 1) % 3 : event.key === "ArrowLeft" ? (current + 2) % 3 : event.key === "Home" ? 0 : event.key === "End" ? 2 : -1;
              if (next >= 0) { event.preventDefault(); setActive(lenses[next]); refs.current[next]?.focus(); }
            }}>
              {lenses.map((key, index) => (
                <button key={key} ref={element => { refs.current[index] = element; }} role="tab" id={`lens-tab-${key}`} aria-controls="lens-panel" aria-selected={active === key} tabIndex={active === key ? 0 : -1} onClick={() => setActive(key)}>
                  <span>0{index + 1}</span>{t(`tabs.${key}`)}
                </button>
              ))}
            </div>
            <span className="editorial-tour-id">TX / 024</span>
          </div>
          <div role="tabpanel" id="lens-panel" aria-labelledby={`lens-tab-${active}`} tabIndex={0}>
            <TenderWorkspace active={active} />
          </div>
          <div className="editorial-tour-caption"><ArrowRight size={18} aria-hidden="true" /><p>{d(`lens.${active}`)}</p><span>{t("samplePill")}</span></div>
        </div>
      </div>
    </section>
  );
}
