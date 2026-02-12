"use client";

import { useEffect } from "react";
import { useImageLoader } from "@/hooks/useImageLoader";
import { TEMPLATES } from "@/lib/templates";
import { wrapText } from "@/lib/utils";
import { useMemeStore } from "@/hooks/useMemeStore";
import type { RefObject } from "react";

export function useCanvas(
  canvasRef: RefObject<HTMLCanvasElement>,
  size: { width: number; height: number },
) {
  const {
    selectedTemplateId,
    customImage,
    topText,
    bottomText,
    fontFamily,
    fontSize,
    textColor,
    strokeColor,
    strokeWidth,
    shadowEnabled,
  } = useMemeStore((state) => state);

  const selectedTemplate = TEMPLATES.find((item) => item.id === selectedTemplateId);
  const image = useImageLoader(customImage ?? selectedTemplate?.src ?? null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !size.width) return;
    const timer = setTimeout(() => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const width = size.width;
      const height = size.height;
      canvas.width = Math.floor(width * 2);
      canvas.height = Math.floor(height * 2);
      ctx.setTransform(2, 0, 0, 2, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, width, height);

      if (!image) {
        ctx.fillStyle = "#666";
        ctx.textAlign = "center";
        ctx.font = "24px Arial";
        ctx.fillText("No image selected", width / 2, height / 2);
        return;
      }

      const imgRatio = image.width / image.height;
      const canvasRatio = width / height;
      const drawWidth = imgRatio > canvasRatio ? height * imgRatio : width;
      const drawHeight = imgRatio > canvasRatio ? height : width / imgRatio;
      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;
      ctx.drawImage(image, x, y, drawWidth, drawHeight);

      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.lineJoin = "round";
      ctx.font = `${fontSize}px ${fontFamily}, Impact, Arial, sans-serif`;
      ctx.fillStyle = textColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.shadowColor = shadowEnabled ? "rgba(0,0,0,0.8)" : "transparent";
      ctx.shadowBlur = shadowEnabled ? 8 : 0;
      ctx.shadowOffsetX = shadowEnabled ? 2 : 0;
      ctx.shadowOffsetY = shadowEnabled ? 2 : 0;

      const padding = width * 0.08;
      const maxTextWidth = width - padding * 2;
      const topLines = wrapText(ctx, topText.toUpperCase(), maxTextWidth);
      const bottomLines = wrapText(ctx, bottomText.toUpperCase(), maxTextWidth);
      const lineHeight = fontSize * 1.1;

      for (let i = 0; i < topLines.length; i++) {
        const yTop = padding + i * lineHeight;
        ctx.beginPath();
        ctx.strokeText(topLines[i], width / 2, yTop);
        ctx.fillText(topLines[i], width / 2, yTop);
      }

      ctx.textBaseline = "bottom";
      for (let i = 0; i < bottomLines.length; i++) {
        const yBottom = height - padding - (bottomLines.length - i) * lineHeight;
        ctx.beginPath();
        ctx.strokeText(bottomLines[i], width / 2, yBottom);
        ctx.fillText(bottomLines[i], width / 2, yBottom);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [
    image,
    selectedTemplateId,
    topText,
    bottomText,
    fontFamily,
    fontSize,
    textColor,
    strokeColor,
    strokeWidth,
    shadowEnabled,
    size,
    canvasRef,
  ]);
}
