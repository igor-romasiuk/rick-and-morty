"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Icons } from "@/components/ui/Icons"
import { useAuth } from "@/hooks/useAuth"
import { FormErrors } from "@/types/auth"
import { handleRegisterSubmit } from "../../utils/formHandlers"

interface RegisterFormProps {
  onClose?: () => void
  onSwitchToLogin?: () => void
}

export function RegisterForm({ onClose, onSwitchToLogin }: RegisterFormProps) {
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true)
    setError(null)
    setFormErrors({})
    
    const result = await handleRegisterSubmit(event, register, onClose, onSwitchToLogin)
    
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
          <div className={`mb-4 p-3 rounded text-sm ${error.includes("successful") || error.includes("created") ? "bg-green-500/20 border border-green-500 text-green-700 dark:text-green-400" : "bg-red-500/20 border border-red-500 text-red-700 dark:text-red-400"}`}>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              disabled={isLoading}
              className={formErrors.name ? "border-red-500" : ""}
            />
            {formErrors.name && (
              <p className="text-sm text-red-500">{formErrors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              disabled={isLoading}
              className={formErrors.email ? "border-red-500" : ""}
            />
            {formErrors.email && (
              <p className="text-sm text-red-500">{formErrors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              disabled={isLoading}
              className={formErrors.password ? "border-red-500" : ""}
            />
            {formErrors.password && (
              <p className="text-sm text-red-500">{formErrors.password}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              disabled={isLoading}
              className={formErrors.confirmPassword ? "border-red-500" : ""}
            />
            {formErrors.confirmPassword && (
              <p className="text-sm text-red-500">{formErrors.confirmPassword}</p>
            )}
          </div>
          <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold" disabled={isLoading}>
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button 
            type="button"
            onClick={onSwitchToLogin}
            className="text-green-700 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 text-sm"
            disabled={isLoading}
          >
            Already have an account? Login
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-gray-600 dark:text-gray-500">
          <p>Sign up to join Rick and Morty on interdimensional adventures!</p>
        </div>
      </div>
    </div>
  )
} 