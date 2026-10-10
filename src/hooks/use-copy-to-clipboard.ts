import * as React from "react";
import toast from "react-hot-toast";

export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  const copy = React.useCallback(async (text: string, label?: string) => {
    if (!navigator?.clipboard) {
      toast.error("Clipboard not supported in this browser");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      toast.success(label ? `${label} copied to clipboard!` : "Copied to clipboard!");
      setTimeout(() => setCopiedText(null), 2000);
      return true;
    } catch {
      toast.error("Failed to copy to clipboard");
      return false;
    }
  }, []);

  return { copiedText, copy, isCopied: Boolean(copiedText) };
}
