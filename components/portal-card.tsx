import type { ReactNode } from "react"
import { cn } from "@/utils/styles"

interface PortalCardProps {
  children: ReactNode
  className?: string
  variant?: "green" | "blue" | "purple"
}

export function PortalCard({ children, className, variant = "green" }: PortalCardProps) {
  const colorVariants = {
    green: "from-green-500/20 via-green-400/5 to-transparent border-green-500/30 dark:border-green-500/30",
    blue: "from-blue-500/20 via-blue-400/5 to-transparent border-blue-500/30 dark:border-blue-500/30",
    purple: "from-purple-500/20 via-purple-400/5 to-transparent border-purple-500/30 dark:border-purple-500/30",
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border bg-white/40 dark:bg-black/40 backdrop-blur-sm transition-all duration-300",
        colorVariants[variant],
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))]" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

