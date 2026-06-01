import React from "react";
import { cn } from "../../lib/utils";

export const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] font-mono",
      "bg-brand-violet/10 text-brand-violet ring-1 ring-inset ring-brand-violet/20",
      className
    )}>
      {children}
    </span>
  );
};
