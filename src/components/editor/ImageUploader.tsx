"use client";

import { useRef } from "react";
import { DragDropZone } from "@/components/ui/DragDropZone";
import { useMemeStore } from "@/hooks/useMemeStore";
import { Button } from "@/components/ui/Button";

export function ImageUploader({ onUploaded }: { onUploaded?: () => void }) {
  const setCustomImage = useMemeStore((state) => state.setCustomImage);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCustomImage(reader.result);
        onUploaded?.();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-2xl border border-white/20 bg-black/30 p-3">
      <DragDropZone onFiles={handleFiles}>
        <p className="pb-2 text-sm text-[var(--muted)]">
          Drag and drop or click to upload an image.
        </p>
        <Button variant="primary" onClick={() => inputRef.current?.click()}>
          Browse Image
        </Button>
      </DragDropZone>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) =>
          handleFiles(Array.from(event.currentTarget.files || []))
        }
      />
    </div>
  );
}
