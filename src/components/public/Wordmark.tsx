import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

/**
 * TenderX wordmark (§9): "Tender" in slate ink, "X" in primary blue.
 * Monogram: the official TX brand mark, kept on a white chip so it reads
 * cleanly on both light and dark surfaces.
 */
export function Wordmark({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const tender = tone === "light" ? "text-slate-900" : "text-white";
  const x = tone === "light" ? "text-blue-500" : "text-blue-300";

  return (
    <span
      className={`inline-flex items-baseline text-[19px] font-extrabold leading-none tracking-[-0.02em] ${className}`}
    >
      <span className={tender}>Tender</span>
      <span className={x}>X</span>
    </span>
  );
}

export function Monogram({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span
      aria-hidden
      className={`relative inline-flex h-8 items-center justify-center overflow-hidden rounded-[9px] bg-white px-1.5 ${
        tone === "light" ? "ring-1 ring-slate-200" : "ring-1 ring-white/25"
      }`}
    >
      <Image
        src="/logo.png"
        alt="TenderX"
        width={321}
        height={211}
        priority
        className="h-5 w-auto"
      />
    </span>
  );
}

export function BrandLockup({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Monogram tone={tone} />
      <Wordmark tone={tone} />
    </span>
  );
}

export function BrandLink({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const locale = useLocale();
  return (
    <Link href={`/${locale}`} className={`rounded-sm ${className}`} aria-label="TenderX — home">
      <BrandLockup tone={tone} />
    </Link>
  );
}
