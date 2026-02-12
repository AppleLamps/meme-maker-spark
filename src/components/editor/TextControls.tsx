"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useMemeStore } from "@/hooks/useMemeStore";

export function TextControls() {
  const topText = useMemeStore((state) => state.topText);
  const bottomText = useMemeStore((state) => state.bottomText);
  const setTopText = useMemeStore((state) => state.setTopText);
  const setBottomText = useMemeStore((state) => state.setBottomText);

  const [topDraft, setTopDraft] = useState(topText);
  const [bottomDraft, setBottomDraft] = useState(bottomText);

  useEffect(() => setTopDraft(topText), [topText]);
  useEffect(() => setBottomDraft(bottomText), [bottomText]);

  useEffect(() => {
    const timer = setTimeout(() => setTopText(topDraft), 100);
    return () => clearTimeout(timer);
  }, [topDraft, setTopText]);

  useEffect(() => {
    const timer = setTimeout(() => setBottomText(bottomDraft), 100);
    return () => clearTimeout(timer);
  }, [bottomDraft, setBottomText]);

  return (
    <section className="space-y-3 rounded-2xl border border-white/20 bg-black/30 p-4">
      <label className="space-y-1 text-sm text-[var(--muted)]">
        <span>Top Text</span>
        <input
          value={topDraft}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setTopDraft(event.currentTarget.value)
          }
          placeholder="TOP TEXT"
          className="w-full rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-sm text-white"
          aria-label="Top text"
        />
      </label>
      <label className="space-y-1 text-sm text-[var(--muted)]">
        <span>Bottom Text</span>
        <input
          value={bottomDraft}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setBottomDraft(event.currentTarget.value)
          }
          placeholder="BOTTOM TEXT"
          className="w-full rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-sm text-white"
          aria-label="Bottom text"
        />
      </label>
    </section>
  );
}
