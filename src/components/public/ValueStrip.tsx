import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

const ITEMS = ["one", "two", "three"] as const;

/** Value strip (§14): border-top/bottom only, no boxed cards. */
export function ValueStrip() {
  const t = useTranslations("landing.valueStrip");

  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="container-x py-14 md:py-16">
        <h2 className="reveal text-center text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.02em] text-slate-900">
          {t("title")}
        </h2>

        <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          {ITEMS.map((item, i) => (
            <li key={item} className="reveal flex items-start gap-3" data-stagger={i * 80}>
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-pill bg-blue-50 text-blue-600">
                <Check size={14} strokeWidth={2.5} aria-hidden />
              </span>
              <div>
                <p className="tabular text-[12px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  0{i + 1}
                </p>
                <p className="mt-1 text-[17px] font-semibold text-slate-800">
                  {t(`items.${item}`)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
