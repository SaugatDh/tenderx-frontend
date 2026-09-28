"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(next: string) {
    const segments = pathname.split("/");
    const isLocaleSegment = segments[1] === "en" || segments[1] === "ne";
    if (isLocaleSegment) segments[1] = next;
    else segments.splice(1, 0, next);
    router.push(segments.join("/") || "/");
  }

  return (
    <div className="inline-flex items-center rounded-sm border border-slate-200 bg-slate-50 p-0.5 text-xs font-semibold">
      {(["en", "ne"] as const).map((code) => (
        <button
          key={code}
          onClick={() => switchTo(code)}
          className={`rounded-xs px-2.5 py-1.5 transition-colors ${
            locale === code ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          {code === "en" ? t("english") : t("nepali")}
        </button>
      ))}
    </div>
  );
}
