import React from "react";
import { cn } from "../../lib/utils";
import { ArrowRight } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  showIcon?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", showIcon, children, ...props }, ref) => {
    
    const baseStyles = "group relative inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium transition-colors duration-200";
    
    const variants = {
      primary: "bg-brand-coral text-white hover:bg-[#A16D03] shadow-lg shadow-brand-coral/20",
      secondary: "bg-brand-indigo text-white hover:bg-brand-indigo/90 shadow-md",
      ghost: "bg-transparent text-brand-text hover:bg-black/5",
      outline: "border border-brand-indigo/20 text-brand-indigo hover:bg-brand-indigo/5"
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        <span>{children}</span>
        {showIcon && (
          <span className={cn(
            "ml-3 flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-200",
            "group-hover:translate-x-1",
            variant === "ghost" ? "bg-black/5" : variant === "primary" ? "bg-black/20" : "bg-white/20"
          )}>
            <ArrowRight className="h-3 w-3" />
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
