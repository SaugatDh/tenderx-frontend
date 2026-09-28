"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";

const OPTIONS = [
  { code: "en", labelKey: "english" },
  { code: "ne", labelKey: "nepali" },
] as const;

/** Compact text language selector (§10, §39). No flags. */
export function LanguageSwitcher({ tone = "light" }: { tone?: "light" | "dark" }) {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    optionRefs.current[OPTIONS.findIndex(option => option.code === locale)]?.focus();
    function onPointerDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, locale]);

  function switchTo(next: string) {
    setOpen(false);
    if (next === locale) { triggerRef.current?.focus(); return; }
    const segments = pathname.split("/");
    if (segments[1] === "en" || segments[1] === "ne") segments[1] = next;
    else segments.splice(1, 0, next);
    document.documentElement.setAttribute("lang", next);
    router.push((segments.join("/") || "/") + window.location.search + window.location.hash);
  }

  const active = OPTIONS.find((o) => o.code === locale) ?? OPTIONS[0];

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`inline-flex h-11 min-w-[104px] items-center justify-between gap-2 rounded-pill border px-3 text-[13px] font-semibold transition duration-180 ${
          tone === "light"
            ? "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100"
            : "border-white/25 bg-white/10 text-white hover:bg-white/15"
        }`}
      >
        <span className="inline-flex items-center gap-1.5">
          <Globe size={15} strokeWidth={1.75} aria-hidden />
          {t(active.labelKey)}
        </span>
        <ChevronDown size={14} strokeWidth={2} aria-hidden className="opacity-60" />
      </button>

      {open && (
        <ul
          role="menu"
          aria-label="Language"
          onKeyDown={event => {
            const current = optionRefs.current.findIndex(option => option === document.activeElement);
            const next = event.key === "ArrowDown" ? (current + 1) % 2 : event.key === "ArrowUp" ? (current + 1) % 2 : event.key === "Home" ? 0 : event.key === "End" ? 1 : -1;
            if (next >= 0) { event.preventDefault(); optionRefs.current[next]?.focus(); }
            if (event.key === "Tab") setOpen(false);
          }}
          className="absolute end-0 z-50 mt-2 w-[164px] overflow-hidden rounded-md border border-slate-200 bg-white py-1 shadow-md-blue"
        >
          {OPTIONS.map((option, index) => {
            const isActive = option.code === locale;
            return (
              <li key={option.code} role="none">
                <button
                  ref={element => { optionRefs.current[index] = element; }}
                  role="menuitemradio"
                  aria-checked={isActive}
                  type="button"
                  onClick={() => switchTo(option.code)}
                  className="flex min-h-11 w-full items-center justify-between px-3 py-2 text-start text-[13px] font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  {t(option.labelKey)}
                  {isActive && (
                    <Check size={15} strokeWidth={2} className="text-blue-600" aria-hidden />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
