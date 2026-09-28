"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Building2, Check, FileText, Signature } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Wordmark } from "./Wordmark";

const ROW_TOP = [28, 120, 212] as const;

/**
 * "Bid package assembling" (§13–24): as the hero scrolls into view, partner
 * profile → signature/stamp → tender sheet glide onto the workspace board;
 * checks pop, the signature draws, the stamp presses, and progress runs
 * 72% → 100%. Driven by Framer Motion scroll progress. reduced-motion — and
 * the server/first-paint render — show the final assembled state, so there is
 * no hydration mismatch.
 */
export function HeroBidAnimation() {
  const t = useTranslations("landing.preview");
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Enable scroll-linked motion only after mount: the server and the first
  // client render both show the final state, so hydration matches exactly.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const animate = mounted && !reduce;

  // Progress advances as the visual travels through the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center 0.35"],
  });

  const rows = [
    {
      icon: Building2,
      eyebrow: t("partners.header"),
      title: t("partners.companyOne"),
      detail: t("partners.profileReady"),
      range: [0.0, 0.28] as const,
      tilt: "-rotate-[1.2deg]",
    },
    {
      icon: Signature,
      eyebrow: t("partners.signature"),
      title: t("partners.stamp"),
      detail: t("partners.reusable"),
      range: [0.18, 0.46] as const,
      tilt: "rotate-[1.4deg]",
    },
    {
      icon: FileText,
      eyebrow: t("documents.header"),
      title: t("documents.bidDocument"),
      detail: t("documents.ready"),
      range: [0.36, 0.64] as const,
      tilt: "-rotate-[0.6deg]",
    },
  ] as const;

  // Progress bar 72% → 100% and the crossfading label.
  const barWidth = useTransform(scrollYProgress, [0.5, 0.9], ["72%", "100%"]);
  const labelOutOpacity = useTransform(scrollYProgress, [0.5, 0.66], [1, 0]);
  const labelInOpacity = useTransform(scrollYProgress, [0.62, 0.8], [0, 1]);
  const signatureDraw = useTransform(scrollYProgress, [0.42, 0.72], [0, 1]);
  const stampOpacity = useTransform(scrollYProgress, [0.6, 0.82], [0, 1]);
  const stampScale = useTransform(scrollYProgress, [0.6, 0.82], [0.7, 1]);

  return (
    <div
      ref={ref}
      className="relative h-[440px] w-full sm:h-[540px] lg:h-[600px]"
      style={{ position: "relative" }}
      aria-hidden="true"
    >
      {/* soft blue glow behind the board (§11.3) */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle, rgba(21,94,239,.10), transparent 64%)",
        }}
      />

      {/* loose drifting sheets behind the board (desktop only, ≤2.5° tilt) */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <div className="absolute left-0 top-[18%] h-[132px] w-[104px] animate-driftA rounded-md border border-slate-200 bg-white/80 shadow-card-blue" />
        <div className="absolute right-0 top-[8%] h-[148px] w-[116px] animate-driftB rounded-md border border-slate-200 bg-white/70 shadow-card-blue" />
        <div className="absolute bottom-[2%] left-[6%] h-[120px] w-[92px] animate-driftC rounded-md border border-slate-200 bg-white/60 shadow-card-blue" />
      </div>

      {/* workspace board */}
      <div className="absolute inset-x-2 bottom-0 top-[8%] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-preview sm:inset-x-6">
        <div className="absolute inset-x-0 top-0 h-1 bg-blue-500" />
        <div className="flex items-center justify-between px-4 pt-4 sm:px-5">
          <Wordmark />
          <span className="rounded-pill border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
            {t("samplePill")}
          </span>
        </div>

        <div className="absolute inset-x-3 bottom-4 top-[76px] sm:inset-x-5">
          {rows.map((row, i) => (
            <div
              key={row.eyebrow}
              className="absolute inset-x-0 flex h-[76px] flex-col justify-center rounded-md border border-dashed border-slate-300 px-4"
              style={{ top: ROW_TOP[i] }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                {row.eyebrow}
              </span>
              <span className="mt-1 h-2 w-24 rounded-full bg-slate-100" />
            </div>
          ))}

          <div className="absolute inset-x-0 bottom-0">
            <div className="mb-2 flex items-center justify-between text-[12px] font-semibold text-slate-500">
              <span>{t("project.progressLabel")}</span>
              <span className="tabular relative h-4 w-12 text-end text-blue-600">
                <motion.span
                  className="absolute end-0"
                  style={{ opacity: animate ? labelOutOpacity : 0 }}
                >
                  72%
                </motion.span>
                <motion.span
                  className="absolute end-0"
                  style={{ opacity: animate ? labelInOpacity : 1 }}
                >
                  {t("project.progressValue")}
                </motion.span>
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-pill bg-slate-100">
              <motion.div
                className="h-full rounded-pill bg-blue-500"
                style={{ width: animate ? barWidth : "100%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* assembling papers */}
      <div className="absolute inset-x-2 bottom-0 top-[8%] sm:inset-x-6">
        {rows.map((row, i) => {
          const Icon = row.icon;
          const isSignature = row.icon === Signature;
          return (
            <AssemblingRow
              key={row.title}
              scrollYProgress={scrollYProgress}
              range={row.range}
              animate={animate}
              top={ROW_TOP[i]}
              tilt={row.tilt}
            >
              <div className="flex items-center gap-3">
                <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-blue-50 text-blue-600">
                  <Icon size={18} strokeWidth={1.75} />
                  {isSignature && (
                    <svg
                      className="absolute inset-0 h-full w-full"
                      viewBox="0 0 36 36"
                      fill="none"
                    >
                      <motion.path
                        d="M7 24c4-9 6 3 9-3s4 5 8-4"
                        stroke="#155eef"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        style={{ pathLength: animate ? signatureDraw : 1 }}
                      />
                    </svg>
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-slate-900">{row.title}</p>
                  <p className="mt-0.5 truncate text-[11px] text-slate-500">{row.detail}</p>
                </div>
                <CheckBadge
                  scrollYProgress={scrollYProgress}
                  at={row.range[1]}
                  animate={animate}
                />
              </div>
            </AssemblingRow>
          );
        })}

        {/* approval stamp pressing onto the package */}
        <motion.div
          className="absolute right-6 top-[6px] inline-flex h-14 w-14 -rotate-[8deg] items-center justify-center rounded-pill border-2 border-blue-500/70 text-[9px] font-extrabold uppercase tracking-[0.14em] text-blue-500/80 sm:right-10"
          style={{
            opacity: animate ? stampOpacity : 1,
            scale: animate ? stampScale : 1,
          }}
        >
          {t("samplePill")}
        </motion.div>
      </div>
    </div>
  );
}

function AssemblingRow({
  scrollYProgress,
  range,
  animate,
  top,
  tilt,
  children,
}: {
  scrollYProgress: MotionValue<number>;
  range: readonly [number, number];
  animate: boolean;
  top: number;
  tilt: string;
  children: React.ReactNode;
}) {
  const opacity = useTransform(scrollYProgress, [range[0], range[1]], [0, 1]);
  const y = useTransform(scrollYProgress, [range[0], range[1]], [26, 0]);

  return (
    <motion.div
      className={`absolute inset-x-3 h-[76px] rounded-md border border-slate-200 bg-white p-3 shadow-md-blue sm:inset-x-5 ${tilt}`}
      style={{
        top,
        opacity: animate ? opacity : 1,
        y: animate ? y : 0,
      }}
    >
      {children}
    </motion.div>
  );
}

function CheckBadge({
  scrollYProgress,
  at,
  animate,
}: {
  scrollYProgress: MotionValue<number>;
  at: number;
  animate: boolean;
}) {
  const opacity = useTransform(scrollYProgress, [at - 0.05, at + 0.02], [0, 1]);
  const scale = useTransform(scrollYProgress, [at - 0.05, at + 0.02], [0.6, 1]);

  return (
    <motion.span
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-pill bg-blue-500 text-white"
      style={{ opacity: animate ? opacity : 1, scale: animate ? scale : 1 }}
    >
      <Check size={14} strokeWidth={2.5} />
    </motion.span>
  );
}

