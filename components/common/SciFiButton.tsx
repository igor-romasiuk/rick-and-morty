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
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg overflow-hidden"
  
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700",
    outline: "bg-transparent hover:bg-green-500/10 text-green-500 dark:text-green-400 border-green-500 dark:border-green-400",
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
        glowing && variant === "primary" && "shadow-blue-500/50",
        glowing && variant === "secondary" && "shadow-gray-500/50",
        glowing && variant === "danger" && "shadow-red-500/50",
        glowing && variant === "success" && "shadow-green-500/50",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200" />
    </button>
  )
}

