import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowDown, ArrowRight, Grid2x2 } from "lucide-react";
import { HeroBidAnimation } from "./HeroBidAnimation";

/** Hero (§11.1): 5-col copy + 7-col bid-assembling visual, ≥760px desktop. */
export function Hero() {
  const t = useTranslations("landing.hero");

  return (
    <section className="relative overflow-hidden pt-20">
      {/* drafting grid, faded to the right-side visual (§11.3) */}
      <div
        className="drafting-grid pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 78% 42%, #000 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 78% 42%, #000 20%, transparent 78%)",
        }}
        aria-hidden
      />

      <div className="container-x relative grid items-center gap-14 pb-20 pt-12 lg:min-h-[760px] lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-0">
        <div className="lg:col-span-5">
          <span className="inline-flex items-center gap-2 rounded-pill border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-blue-700">
            <Grid2x2 size={14} strokeWidth={1.75} aria-hidden />
            {t("eyebrow")}
          </span>

          <h1 className="mt-6 text-[clamp(2.75rem,7vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.03em] text-slate-900">
            {t("titleLine1")}
            <br />
            <span className="text-blue-500">{t("titleLine2")}</span>
          </h1>

          <p className="mt-6 max-w-[600px] text-lead text-slate-700">{t("description")}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/register" className="btn-primary group">
              {t("primaryCta")}
              <ArrowRight
                size={17}
                strokeWidth={2}
                aria-hidden
                className="transition-transform duration-180 group-hover:translate-x-[3px]"
              />
            </Link>
            <a href="#how-it-works" className="btn-ghost group">
              <ArrowDown
                size={17}
                strokeWidth={2}
                aria-hidden
                className="transition-transform duration-180 group-hover:translate-y-[3px]"
              />
              {t("secondaryCta")}
            </a>
          </div>

          <p className="mt-5 text-small text-slate-500">{t("trustNote")}</p>
        </div>

        <div className="lg:col-span-7">
          <HeroBidAnimation />
        </div>
      </div>
    </section>
  );
}
