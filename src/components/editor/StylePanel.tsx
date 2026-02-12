"use client";

import { FONTS } from "@/lib/fonts";
import { useMemeStore } from "@/hooks/useMemeStore";
import { Slider } from "@/components/ui/Slider";
import { ColorPicker } from "@/components/ui/ColorPicker";
import { Select } from "@/components/ui/Select";

export function StylePanel() {
  const {
    fontFamily,
    fontSize,
    textColor,
    strokeColor,
    strokeWidth,
    shadowEnabled,
    setStyle,
  } = useMemeStore((state) => state);

  return (
    <section className="rounded-2xl border border-white/20 bg-black/30 p-4">
      <details className="group">
        <summary className="cursor-pointer text-sm font-semibold text-white">Style</summary>
        <div className="mt-3 space-y-3">
          <Select
            label="Font Family"
            value={fontFamily}
            options={FONTS}
            onChange={(value) => setStyle({ fontFamily: value })}
          />
          <Slider
            label="Font Size"
            value={fontSize}
            min={24}
            max={96}
            onChange={(value) => setStyle({ fontSize: value })}
          />
          <ColorPicker
            label="Text Color"
            value={textColor}
            onChange={(value) => setStyle({ textColor: value })}
          />
          <ColorPicker
            label="Stroke Color"
            value={strokeColor}
            onChange={(value) => setStyle({ strokeColor: value })}
          />
          <Slider
            label="Stroke Width"
            value={strokeWidth}
            min={0}
            max={8}
            onChange={(value) => setStyle({ strokeWidth: value })}
          />
          <label className="flex items-center justify-between gap-3 text-sm text-[var(--muted)]">
            <span>Text Shadow</span>
            <input
              type="checkbox"
              checked={shadowEnabled}
              onChange={(event) => setStyle({ shadowEnabled: event.currentTarget.checked })}
              className="h-4 w-4 rounded"
            />
          </label>
        </div>
      </details>
    </section>
  );
}
