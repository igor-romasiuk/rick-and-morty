import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/utils/styles"

interface SciFiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger"
  size?: "sm" | "md" | "lg"
  glowing?: boolean
}

export const SciFiButton = forwardRef<HTMLButtonElement, SciFiButtonProps>(
  ({ className, variant = "primary", size = "md", glowing = false, children, ...props }, ref) => {
    const variantClasses = {
      primary:
        "bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-500 text-black font-bold border-green-300",
      secondary:
        "bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-black font-bold border-blue-300",
      outline:
        "bg-transparent hover:bg-green-500/10 text-green-500 dark:text-green-400 border-green-500 dark:border-green-400",
      danger:
        "bg-gradient-to-r from-red-500 to-red-400 hover:from-red-400 hover:to-red-500 text-white font-bold border-red-300",
    }

    const sizeClasses = {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-4 py-2",
      lg: "text-base px-6 py-3",
    }

    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-md border-2 transition-all duration-300 shadow-md",
          variantClasses[variant],
          sizeClasses[size],
          glowing && "animate-pulse shadow-lg",
          glowing && variant === "primary" && "shadow-green-500/50",
          glowing && variant === "secondary" && "shadow-blue-500/50",
          glowing && variant === "danger" && "shadow-red-500/50",
          className,
        )}
        {...props}
      >
        {glowing && <span className="absolute inset-0 rounded-md bg-gradient-to-r opacity-30 blur-sm" />}
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      </button>
    )
  },
)

SciFiButton.displayName = "SciFiButton"

