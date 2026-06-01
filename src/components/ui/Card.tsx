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
      "w-full h-full",
      dark ? "glass-card-dark text-white hover:border-white/30" : "glass-card text-brand-text hover:border-black/10",
      "transition-colors duration-200 cursor-pointer",
      className
    )}>
      {children}
    </div>
  );
};
