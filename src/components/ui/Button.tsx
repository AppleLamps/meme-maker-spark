import { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition focus:outline-none";

const variants = {
  primary: "bg-blue-500 text-white hover:bg-blue-400",
  ghost: "border border-white/20 bg-white/5 text-white hover:bg-white/10",
  icon: "border border-white/20 bg-white/5 text-white hover:bg-white/10",
};

type Variant = keyof typeof variants;

export function Button({
  children,
  variant = "primary",
  iconOnly,
  className,
  ...props
}: ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  iconOnly?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        base,
        variants[variant],
        iconOnly && "px-0",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
