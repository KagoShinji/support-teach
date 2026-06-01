import React from "react";
import { cn } from "../../lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export const Card = ({ children, className, dark = false }: CardProps) => {
  return (
    <div className={cn(
      "w-full h-full rounded-xl border-[1.5px] border-black p-6 relative overflow-hidden",
      dark ? "bg-[#FFD147] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
      "transition-all duration-200 cursor-pointer hover:-translate-y-1 text-black",
      dark ? "hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" : "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
      className
    )}>
      {children}
    </div>
  );
};
