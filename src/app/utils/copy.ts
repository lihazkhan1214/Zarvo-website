// Frontend-only, safe fallbacks.
export type CopyMethod = "native" | "legacy" | "manual";

export async function copyText(text: string): Promise<CopyMethod> {
  if (typeof window === "undefined") throw new Error("No window");

  const canUseNative = Boolean(
    window.isSecureContext && navigator.clipboard?.writeText
  );
  if (canUseNative) {
    try {
      await navigator.clipboard!.writeText(text);
      return "native";
    } catch {
      /* fall through */
    }
  }

  // Legacy execCommand fallback
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    Object.assign(ta.style, {
      position: "fixed",
      top: "0",
      left: "0",
      opacity: "0",
      pointerEvents: "none",
    });
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    if (ok) return "legacy";
  } catch {
    /* ignore */
  }

  return "manual"; // show manual modal
}
