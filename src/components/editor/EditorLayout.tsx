"use client";

import type { ReactNode } from "react";

export function EditorLayout({
  controls,
  preview,
}: {
  controls: ReactNode;
  preview: ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
      <div className="order-2 space-y-4 lg:order-1">{controls}</div>
      <div className="order-1 lg:sticky lg:top-24 lg:order-2 self-start">
        {preview}
      </div>
    </div>
  );
}
