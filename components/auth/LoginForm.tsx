"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Icons } from "@/components/ui/Icons"
import { useAuth } from "@/hooks/useAuth"
import { FormErrors } from "@/types/auth"
import { handleLoginSubmit } from "../../utils/formHandlers"

interface LoginFormProps {
  onClose?: () => void
}

export function LoginForm({ onClose }: LoginFormProps) {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true)
    setError(null)
    setFormErrors({})
    
    const result = await handleLoginSubmit(event, login, onClose)
    
    setError(result.error)
    setFormErrors(result.formErrors)
    setIsLoading(false)
  }

  return (
    <div className="w-full max-w-md p-6 rounded-lg border border-green-500/30 dark:bg-black/90 bg-white/90 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/20 via-transparent to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-green-500/10 animate-spin-slow"></div>
      </div>

      <div className="relative z-10">
        {error && (
          <div className="mb-4 p-3 rounded text-sm bg-red-500/20 border border-red-500 text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-green-700 dark:text-green-400">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              className={formErrors.email ? "border-red-500" : "bg-white/50 dark:bg-black/50 border-green-500/50 text-gray-900 dark:text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20"}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
            {formErrors.email && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-green-700 dark:text-green-400">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className={formErrors.password ? "border-red-500" : "bg-white/50 dark:bg-black/50 border-green-500/50 text-gray-900 dark:text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20"}
              autoComplete="current-password"
              disabled={isLoading}
              required
            />
            {formErrors.password && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1">{formErrors.password}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-600 dark:text-gray-500">
          <p>Wubba Lubba Dub Dub! Login to access all dimensions.</p>
        </div>
      </div>
    </div>
  )
} 