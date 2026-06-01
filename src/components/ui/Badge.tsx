import React from "react";
import { cn } from "../../lib/utils";

export const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em]",
      "bg-[#FFD147] text-black border-[1.5px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      className
    )}>
      {children}
    </span>
  );
};
