"use client";

import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function TemplateCard({
  name,
  src,
  selected,
  onSelect,
}: {
  name: string;
  src?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Button
      onClick={onSelect}
      variant="ghost"
      className={`group h-auto w-36 overflow-hidden rounded-2xl border-2 p-2 transition-transform hover:scale-105 ${
        selected
          ? "border-blue-400 ring-2 ring-blue-500/70"
          : "border-white/20"
      }`}
    >
      <div className="relative h-20 w-full overflow-hidden rounded-xl bg-black/40">
        {src ? (
          <Image
            src={src}
            alt={name}
            fill
            className="object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-blue-300">
            <ImagePlus className="h-6 w-6" />
          </div>
        )}
      </div>
      <span className="mt-2 block truncate text-left text-xs text-[var(--muted)]">{name}</span>
    </Button>
  );
}
