import { useTranslations } from "next-intl";

/** Local relevance statement (§12): words, not decoration. No flag/mountains. */
export function LocalProof() {
  const t = useTranslations("landing.localProof");

  return (
    <section className="section-y">
      <div className="container-narrow text-center">
        <div className="reveal mx-auto mb-8 flex items-center justify-center gap-3" aria-hidden>
          <span className="h-px w-10 bg-slate-300" />
          <span className="inline-block h-2.5 w-2.5 rotate-45 border border-blue-500" />
          <span className="h-px w-10 bg-slate-300" />
        </div>
        <h2 className="reveal text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-slate-900">
          {t("title")}
        </h2>
        <p
          className="reveal mx-auto mt-4 max-w-[560px] text-lead text-slate-700"
          data-stagger="80"
        >
          {t("description")}
        </p>
      </div>
    </section>
  );
}
