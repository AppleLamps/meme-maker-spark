"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useMemeStore } from "@/hooks/useMemeStore";
import { useCanvas } from "@/hooks/useCanvas";

export function CanvasPreview({
  canvasRef,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 640, height: 480 });
  const topText = useMemeStore((state) => state.topText);
  const bottomText = useMemeStore((state) => state.bottomText);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width || 640;
      const w = Math.max(280, Math.min(720, width));
      setSize({ width: w, height: Math.round(w * 0.75) });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useCanvas(canvasRef, size);

  return (
    <section
      ref={containerRef}
      aria-label={`Meme preview with top text ${topText || "none"} and bottom text ${bottomText ||
        "none"}`}
      className="rounded-2xl border border-white/20 bg-black/40 p-3"
    >
      <canvas
        ref={canvasRef}
        width={size.width * 2}
        height={size.height * 2}
        style={{ width: size.width, height: size.height }}
        className="w-full rounded-xl shadow-2xl"
      />
    </section>
  );
}
