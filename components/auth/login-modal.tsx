"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { useAuth } from "@/components/auth/auth-provider"

interface LoginModalProps {
  onClose?: () => void
  initialMode?: "login" | "register"
  hideToggle?: boolean
}

export function LoginModal({ onClose, initialMode = "login", hideToggle = false }: LoginModalProps) {
  const { login, register } = useAuth()
  const [isLogin, setIsLogin] = useState(initialMode === "login")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
  }>({})

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function validatePassword(password: string): boolean {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password) && 
           /[^A-Za-z0-9]/.test(password)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setFormErrors({})
    
    let hasErrors = false
    const newFormErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
      name?: string;
    } = {}

    try {
      const formData = new FormData(event.currentTarget)
      const email = formData.get("email") as string
      const password = formData.get("password") as string
      
      if (!validateEmail(email)) {
        newFormErrors.email = "Please enter a valid email address"
        hasErrors = true
      }
      
      if (!isLogin && !validatePassword(password)) {
        newFormErrors.password = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
        hasErrors = true
      } else if (isLogin && password.length < 6) {
        newFormErrors.password = "Password must be at least 6 characters"
        hasErrors = true
      }
      
      if (!isLogin) {
        const confirmPassword = formData.get("confirm-password") as string
        const name = formData.get("name") as string
        
        if (name.length < 2) {
          newFormErrors.name = "Name must be at least 2 characters"
          hasErrors = true
        }
        
        if (password !== confirmPassword) {
          newFormErrors.confirmPassword = "Passwords do not match"
          hasErrors = true
        }
        
        if (hasErrors) {
          setFormErrors(newFormErrors)
          setIsLoading(false)
          return
        }
        
        try {
          const result = await register(name, email, password);
          
          if (result?.success) {
            if (result.message?.includes("Please log in")) {
              setIsLogin(true);
              setError(result.message);
              setIsLoading(false);
            } else if (onClose) {
              onClose();
            }
          } else {
            setError(result?.error || "Registration failed. Please try again.");
          }
          
          return;
        } catch (registrationError) {
          setError("Registration failed. Please try again.");
          setIsLoading(false);
          return;
        }
      }
      
      if (hasErrors) {
        setFormErrors(newFormErrors)
        setIsLoading(false)
        return
      }

      try {
        const result = await login(email, password)
        
        if (result?.success) {
          if (onClose) {
            onClose()
          }
        } else {
          setError("Invalid email or password. Please try again.")
        }
      } catch (error) {
        setError("Login failed. Please check your credentials and try again.")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-6 rounded-lg border border-green-500/30 bg-black/90 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/20 via-transparent to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-green-500/10 animate-spin-slow"></div>
      </div>

      <div className="relative z-10">
        {error && (
          <div className={`mb-4 p-3 rounded text-sm ${error.includes("successful") || error.includes("created") ? "bg-green-500/20 border border-green-500 text-green-400" : "bg-red-500/20 border border-red-500 text-red-400"}`}>
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-green-400">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                className="bg-black/50 border-green-500/50 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20"
                autoCapitalize="words"
                autoComplete="name"
                disabled={isLoading}
                required
              />
              {formErrors.name && (
                <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>
              )}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-green-400">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="rick@example.com"
              className="bg-black/50 border-green-500/50 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
            {formErrors.email && (
              <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-green-400">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="bg-black/50 border-green-500/50 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20"
              autoComplete={isLogin ? "current-password" : "new-password"}
              disabled={isLoading}
              required
            />
            {formErrors.password && (
              <p className="text-red-400 text-xs mt-1">{formErrors.password}</p>
            )}
            {!isLogin && (
              <p className="text-green-400/70 text-xs mt-1">
                Password must be at least 8 characters and include uppercase, lowercase, number, and special character
              </p>
            )}
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-green-400">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="Confirm your password"
                className="bg-black/50 border-green-500/50 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20"
                autoComplete="new-password"
                disabled={isLoading}
                required
              />
              {formErrors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">{formErrors.confirmPassword}</p>
              )}
            </div>
          )}

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
              isLogin ? "Login" : "Sign Up"
            )}
          </Button>
        </form>

        {!hideToggle && (
          <div className="mt-4 text-center">
            <button 
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setError(null)
                setFormErrors({})
              }} 
              className="text-green-400 hover:text-green-300 text-sm"
              disabled={isLoading}
            >
              {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            {isLogin
              ? "Wubba Lubba Dub Dub! Login to access all dimensions."
              : "Sign up to join Rick and Morty on interdimensional adventures!"}
          </p>
        </div>
      </div>
    </div>
  )
}
