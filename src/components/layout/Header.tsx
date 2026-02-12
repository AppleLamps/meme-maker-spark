"use client";

import Link from "next/link";
import { Github, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/Button";

export function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme !== "light";

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-black/30 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          MemeSpark
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/editor" className="text-sm text-[var(--muted)] hover:text-white">
            Editor
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-[var(--muted)] transition hover:text-white"
          >
            <Github className="h-5 w-5" />
          </a>
          <Button
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            variant="ghost"
            className="h-10 w-10 px-0"
            iconOnly
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </nav>
      </div>
    </header>
  );
}
