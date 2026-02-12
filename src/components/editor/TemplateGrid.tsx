"use client";

import { useMemo } from "react";
import { TEMPLATES } from "@/lib/templates";
import { TemplateCard } from "./TemplateCard";
import { useMemeStore } from "@/hooks/useMemeStore";

export function TemplateGrid({
  onUpload,
}: {
  onUpload: () => void;
}) {
  const selectedTemplateId = useMemeStore((state) => state.selectedTemplateId);
  const customImage = useMemeStore((state) => state.customImage);
  const setTemplate = useMemeStore((state) => state.setTemplate);
  const cards = useMemo(() => TEMPLATES, []);

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-max gap-3">
        {cards.map((template) => (
          <TemplateCard
            key={template.id}
            name={template.name}
            src={template.src}
            selected={
              customImage === null && selectedTemplateId === template.id
            }
            onSelect={() => setTemplate(template.id)}
          />
        ))}
        <TemplateCard
          name="Upload Your Own"
          selected={customImage !== null}
          onSelect={onUpload}
        />
      </div>
    </div>
  );
}
