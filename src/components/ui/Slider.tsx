import type { ChangeEvent } from "react";

export function Slider({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="space-y-1">
      <span className="flex justify-between text-sm text-[var(--muted)]">
        <span>{label}</span>
        <span>{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(Number(event.currentTarget.value))
        }
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10"
      />
    </label>
  );
}
