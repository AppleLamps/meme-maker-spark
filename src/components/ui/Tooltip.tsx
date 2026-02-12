export function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <span className="relative group inline-flex">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
        {text}
      </span>
    </span>
  );
}
