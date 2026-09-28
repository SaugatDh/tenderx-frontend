import { ApiError, getToken } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/** Turns an API error (whose message may be a JSON list of validation errors) into readable text. */
export function errorMessage(err: unknown, fallback: string): string {
  if (err instanceof ApiError) {
    try {
      const parsed = JSON.parse(err.message);
      return Array.isArray(parsed) ? parsed.join("\n") : err.message;
    } catch {
      return err.message;
    }
  }
  return err instanceof Error ? err.message : fallback;
}

/** Fetches an authenticated file from the API and saves it in the browser. */
export async function downloadBlob(
  path: string,
  filename: string,
  downloadFailedMessage: string,
  method: "GET" | "POST" = "GET"
) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error(downloadFailedMessage);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
