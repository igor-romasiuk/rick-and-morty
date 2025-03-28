import type { ButtonHTMLAttributes, ReactNode } from "react"

export interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  query?: Record<string, string>
}

export interface PortalCardProps {
  children: ReactNode
  className?: string
  variant?: "green" | "blue" | "purple"
}

export interface ThemeProviderProps {
  children: ReactNode
}

export interface ThemeContextType {
  theme: "light" | "dark"
  toggleTheme: () => void
}

export interface SciFiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "success"
  size?: "sm" | "md" | "lg"
  glowing?: boolean
  asChild?: boolean
} 