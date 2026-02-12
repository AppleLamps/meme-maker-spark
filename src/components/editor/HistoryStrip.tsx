"use client";

import { useEffect, useState } from "react";

export function HistoryStrip() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("meme-history");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed.slice(0, 6));
      }
    } catch {
      setItems([]);
    }
  }, []);

  if (!items.length) return null;

  return (
    <section>
      <p className="mb-2 text-xs uppercase tracking-wide text-[var(--muted)]">
        Recent Memes
      </p>
      <div className="grid grid-cols-6 gap-2">
        {items.map((item) => (
          <img
            key={item}
            src={item}
            alt="Previous meme"
            className="h-16 w-full rounded-md object-cover"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
