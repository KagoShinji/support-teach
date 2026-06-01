import React from "react";
import { cn } from "../../lib/utils";

export const SectionLabel = ({ children, className, center = false }: { children: React.ReactNode, className?: string, center?: boolean }) => {
  return (
    <div className={cn("flex items-center gap-3", center && "justify-center", className)}>
      <span className="font-dm text-[12px] font-bold uppercase tracking-[0.15em] text-black bg-[#21C57D] px-4 py-1.5 rounded-full border-[1.5px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {children}
      </span>
    </div>
  );
};
