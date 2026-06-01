import React from "react";
import { cn } from "../../lib/utils";
import { ArrowRight } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  showIcon?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", showIcon, children, ...props }, ref) => {
    
    const baseStyles = "group relative inline-flex items-center justify-center rounded-full px-8 py-3.5 text-[15px] font-bold transition-all duration-200 border-[1.5px] border-black hover:-translate-y-[2px] active:translate-y-[2px] active:shadow-none";
    
    const variants = {
      primary: "bg-[#21C57D] text-black shadow-[3px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)]",
      secondary: "bg-[#FFD147] text-black shadow-[3px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)]",
      ghost: "bg-transparent text-black border-transparent shadow-none hover:bg-black/5 hover:-translate-y-0 hover:shadow-none active:translate-y-0",
      outline: "bg-white text-black shadow-[3px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)]"
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
            "ml-3 flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-200 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]",
            "group-hover:translate-x-1 group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
            variant === "ghost" ? "bg-white" : "bg-white"
          )}>
            <ArrowRight className="h-3 w-3 text-black" />
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
