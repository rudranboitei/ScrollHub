import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "default" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "border-black bg-black text-white shadow-sm hover:bg-black/80 hover:shadow-md",
  outline:
    "border-black/5 bg-black/[0.03] text-black hover:border-black/10 hover:bg-black/[0.06]",
  ghost: "text-black/60 hover:bg-black/[0.05] hover:text-black",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-11 gap-2 px-6 text-sm",
  sm: "h-9 gap-1.5 px-3.5 text-xs",
};

export function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-full border font-bold outline-none transition-[color,background-color,border-color,box-shadow,transform] duration-200 select-none hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-black/10 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
