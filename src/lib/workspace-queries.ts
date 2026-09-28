"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { api, getToken } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type DraftSummary = { id: string; name: string; updated_at: string };
export type ProfileSummary = { id: string; name: string; role: string; partner_name: string; updated_at: string };
export type GeneratedDocumentItem = {
  id: string;
  doc_id: string;
  filename: string;
  jv_name: string;
  partner_count: number;
  created_at: string;
  download_url: string;
};

export function useDrafts() {
  return useQuery({ queryKey: ["drafts"], queryFn: () => api.get<DraftSummary[]>("/drafts") });
}

export function useProfiles() {
  return useQuery({ queryKey: ["profiles"], queryFn: () => api.get<ProfileSummary[]>("/profiles") });
}

export function useGenerationHistory() {
  return useQuery({
    queryKey: ["generation-history"],
    queryFn: () => api.get<{ total: number; items: GeneratedDocumentItem[] }>("/generate/history"),
  });
}

export async function downloadHistoryItem(item: GeneratedDocumentItem) {
  const res = await fetch(`${API_URL}${item.download_url}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error(res.statusText);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = item.filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Locale-aware date formatters: "3 hours ago" and "29 Sep 2026, 3:09 PM". */
export function useDateFormat() {
  const locale = useLocale() === "ne" ? "ne-NP" : "en-GB";
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  function relative(iso: string) {
    const diffSec = (new Date(iso).getTime() - Date.now()) / 1000;
    const abs = Math.abs(diffSec);
    if (abs < 60) return rtf.format(Math.round(diffSec), "second");
    if (abs < 3600) return rtf.format(Math.round(diffSec / 60), "minute");
    if (abs < 86400) return rtf.format(Math.round(diffSec / 3600), "hour");
    if (abs < 86400 * 30) return rtf.format(Math.round(diffSec / 86400), "day");
    return date(iso);
  }

  function date(iso: string) {
    return new Date(iso).toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" });
  }

  function dateTime(iso: string) {
    return new Date(iso).toLocaleString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return { relative, date, dateTime };
}
