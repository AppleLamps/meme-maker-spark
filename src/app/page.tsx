"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TEMPLATES } from "@/lib/templates";

export default function HomePage() {
  const samples = TEMPLATES.slice(0, 3);

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8"
    >
      <h1 className="max-w-2xl text-center text-4xl font-extrabold md:text-6xl">
        Make Memes in Seconds
      </h1>
      <p className="max-w-2xl text-center text-base text-[var(--muted)] md:text-lg">
        Pick a meme template, add your text, tune the typography, and export a clean PNG in one flow.
      </p>
      <Link
        href="/editor"
        className="rounded-2xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
      >
        Open Editor →
      </Link>
      <section className="grid w-full gap-4 md:grid-cols-3">
        {samples.map((template) => (
          <article
            key={template.id}
            className="overflow-hidden rounded-2xl border border-white/20 bg-black/20 p-2"
          >
            <div className="relative h-52 overflow-hidden rounded-xl bg-black/40">
              <Image
                src={template.src}
                alt={template.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-center text-sm text-[var(--muted)]">
              {template.name}
            </p>
          </article>
        ))}
      </section>
    </motion.main>
  );
}
