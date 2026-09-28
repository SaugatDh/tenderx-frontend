import { useTranslations } from "next-intl";
import { Building2, FileText, Signature } from "lucide-react";
import { BrandLockup } from "@/components/public/Wordmark";

/**
 * Auth story panel (§20): deep navy, static document rows,
 * one-time entrance only — no looping motion on login.
 */
export function AuthStoryPanel() {
  const t = useTranslations("publicAuth");
  const tp = useTranslations("landing.preview");

  const rows = [
    { icon: Building2, label: t("rows.partner"), detail: tp("partners.profileReady") },
    { icon: Signature, label: t("rows.signature"), detail: tp("partners.stamp") },
    { icon: FileText, label: t("rows.document"), detail: tp("documents.ready") },
  ];

  return (
    <aside className="relative hidden w-[46%] shrink-0 overflow-hidden bg-blue-800 px-12 py-14 text-white lg:flex lg:flex-col">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 70% at 30% 40%, #000 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 30% 40%, #000 20%, transparent 75%)",
        }}
        aria-hidden
      />

      <div className="relative animate-rise">
        <BrandLockup tone="dark" />
      </div>

      <div className="relative mt-auto animate-rise pt-16">
        <h2 className="text-[clamp(2rem,3.4vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
          {t("storyTitle")}
          <br />
          <span className="text-blue-200">{t("storyAccent")}</span>
        </h2>
        <p className="mt-5 max-w-[380px] text-[17px] leading-relaxed text-white/75">
          {t("storyDescription")}
        </p>

        <ul className="mt-10 space-y-3">
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <li
                key={row.label}
                className="flex items-center gap-3 rounded-md border border-white/15 bg-white/10 px-4 py-3"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-white/15">
                  <Icon size={17} strokeWidth={1.75} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-white">{row.label}</p>
                  <p className="text-[12px] text-white/65">{row.detail}</p>
                </div>
                <span
                  className="ms-auto h-2 w-2 shrink-0 rounded-pill bg-blue-300"
                  aria-hidden
                />
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
