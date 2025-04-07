import { cn } from "@/utils/styles"
import { SciFiButtonProps } from "@/types/common"

export function SciFiButton({
  children,
  className,
  variant = "primary",
  size = "md",
  glowing = false,
  ...props
}: SciFiButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg overflow-hidden cursor-pointer"
  
  const variants = {
    primary: "bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700",
    secondary: "bg-purple-500 text-white hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700",
    outline: "bg-transparent hover:bg-green-500/10 text-green-500 dark:text-green-400 border border-green-500 dark:border-green-400",
    danger: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
    success: "bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        glowing && "animate-pulse shadow-lg",
        glowing && variant === "primary" && "shadow-green-500/50",
        glowing && variant === "secondary" && "shadow-purple-500/50",
        glowing && variant === "danger" && "shadow-red-500/50",
        glowing && variant === "success" && "shadow-green-500/50",
        "hover:scale-105",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200",
        "cursor-pointer",
        "w-full",
        className
      )}
      {...props}
    >
      <span className="relative z-10 w-full flex text-center items-center gap-2">{children}</span>
    </button>
  )
}
