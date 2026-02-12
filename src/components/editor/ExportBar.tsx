"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clipboard } from "lucide-react";
import { useExport } from "@/hooks/useExport";
import { Button } from "@/components/ui/Button";
import type { RefObject } from "react";

export function ExportBar({
  canvasRef,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
}) {
  const { downloadPNG, copyToClipboard } = useExport(canvasRef);
  const [toast, setToast] = useState<string | null>(null);

  const saveHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    try {
      const raw = localStorage.getItem("meme-history");
      const parsed = raw ? JSON.parse(raw) : [];
      const existing = Array.isArray(parsed) ? parsed : [];
      const next = [dataUrl, ...existing.filter((item) => item !== dataUrl)].slice(
        0,
        6,
      );
      localStorage.setItem("meme-history", JSON.stringify(next));
    } catch {
      localStorage.setItem("meme-history", JSON.stringify([dataUrl]));
    }
  };

  const show = (message: string) => {
    setToast(message);
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="sticky bottom-2 rounded-2xl border border-white/20 bg-black/60 p-3 backdrop-blur">
      <div className="flex gap-2">
        <Button
          onClick={async () => {
            const ok = await downloadPNG();
            if (ok) {
              saveHistory();
            if (ok) {
              show("✓ PNG downloaded");
            } else {
              show("Download failed");
            }
          }}
          variant="primary"
          className="flex-1"
        >
          Download PNG
        </Button>
        <Button
          onClick={async () => {
            const ok = await copyToClipboard();
            if (ok) {
              saveHistory();
              show("✓ Copied to clipboard");
            } else {
              show("Clipboard unavailable");
            }
          }}
          variant="ghost"
          className="flex-1"
          aria-label="Copy to Clipboard"
        >
          <Clipboard className="h-4 w-4" />
          Copy
        </Button>
      </div>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute right-4 bottom-14 rounded-lg bg-blue-500 px-3 py-2 text-xs text-white"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
