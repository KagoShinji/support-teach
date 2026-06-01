import React from "react";
import { cn } from "../../lib/utils";

export const SectionLabel = ({ children, className, center = false }: { children: React.ReactNode, className?: string, center?: boolean }) => {
  return (
    <div className={cn("flex items-center gap-3", center && "justify-center", className)}>
      {!center && <span className="h-px w-6 bg-brand-coral"></span>}
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-brand-coral">
        {children}
      </span>
      {center && <span className="h-px w-6 bg-brand-coral hidden sm:block"></span>}
    </div>
  );
};
