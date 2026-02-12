import { useCallback } from "react";
import type { RefObject } from "react";

export function useExport(canvasRef: RefObject<HTMLCanvasElement>) {
  const toBlob = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return new Promise<Blob | null>((resolve) =>
      canvas.toBlob((blob) => resolve(blob), "image/png", 1),
    );
  }, [canvasRef]);

  const downloadPNG = useCallback(async () => {
    const blob = await toBlob();
    if (!blob) return false;
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `meme-${Date.now()}.png`;
    anchor.click();
    URL.revokeObjectURL(url);
    return true;
  }, [toBlob]);

  const copyToClipboard = useCallback(async () => {
    const blob = await toBlob();
    if (!blob || !navigator.clipboard || !window.ClipboardItem) return false;
    try {
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      return true;
    } catch {
      return false;
    }
  }, [toBlob]);

  return { downloadPNG, copyToClipboard };
}
