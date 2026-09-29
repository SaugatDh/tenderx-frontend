"use client";

import { CheckCircle2, ImageUp, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useBid, type DraftOut } from "@/lib/bid-context";
import { errorMessage } from "@/lib/download";
import { useWorkspace } from "@/lib/workspace-context";

/** Upload tile for a signature/stamp image. Needs a saved draft to attach to. */
export function ImageUpload({ imgKey, label }: { imgKey: string; label: string }) {
  const t = useTranslations("dash.upload");
  const { user } = useAuth();
  const { draftId, images, setImage } = useBid();
  const { notify } = useWorkspace();
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasImage = Boolean(images[imgKey]);
  const canUpload = Boolean(user?.can_upload_signature_stamp);

  if (!canUpload) return null;

  async function handleFile(file: File) {
    if (!draftId) return;
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const draft = await api.put<DraftOut>(`/drafts/${draftId}/images/${imgKey}`, form);
      const updated = draft.images.find((i) => i.img_key === imgKey);
      if (updated) setImage(imgKey, updated.storage_path);
      notify("success", t("uploaded", { label }));
    } catch (err) {
      notify("error", errorMessage(err, t("failed")));
    } finally {
      setIsUploading(false);
    }
  }

  let status: { icon: React.ReactNode; text: string; tone: string };
  if (!draftId) {
    status = { icon: <ImageUp size={16} />, text: t("saveFirst"), tone: "text-slate-400" };
  } else if (isUploading) {
    status = { icon: <Loader2 size={16} className="animate-spin" />, text: t("uploading"), tone: "text-blue-600" };
  } else if (hasImage) {
    status = { icon: <CheckCircle2 size={16} />, text: t("replace"), tone: "text-emerald-600" };
  } else {
    status = { icon: <ImageUp size={16} />, text: t("choose"), tone: "text-blue-600" };
  }

  const disabled = !draftId || isUploading;

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
        className={`flex w-full items-center gap-3 rounded-sm border border-dashed px-3 py-2.5 text-left transition ${
          hasImage ? "border-emerald-300 bg-emerald-50/60" : "border-slate-300 bg-slate-50/60"
        } ${disabled ? "cursor-not-allowed" : "hover:border-blue-400 hover:bg-blue-50/60"}`}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-white shadow-sm ${status.tone}`}
        >
          {status.icon}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-semibold text-slate-800">
            {label}
            {hasImage && <span className="ml-1.5 font-medium text-emerald-600">· {t("done")}</span>}
          </span>
          <span className={`block truncate text-xs ${status.tone}`}>{status.text}</span>
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
