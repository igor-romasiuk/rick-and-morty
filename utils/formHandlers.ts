import { FormErrors } from "@/types/auth"
import { validateLoginForm, validateRegistrationForm } from "@/utils/formUtils"

interface AuthResponse {
  success: boolean
  message?: string
  error?: string
}

export async function handleLoginSubmit(
  event: React.FormEvent<HTMLFormElement>,
  login: (email: string, password: string) => Promise<AuthResponse | void>,
  onClose?: () => void
): Promise<{
  error: string | null
  formErrors: FormErrors
  isLoading: boolean
}> {
  event.preventDefault()
  const formErrors = validateLoginForm(event.currentTarget)
  
  if (Object.keys(formErrors).length > 0) {
    return {
      error: null,
      formErrors,
      isLoading: false
    }
  }

  try {
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    
    const result = await login(email, password)
    
    if (result?.success) {
      if (onClose) {
        onClose()
      }
      return {
        error: null,
        formErrors: {},
        isLoading: false
      }
    } else {
      return {
        error: "Invalid email or password. Please try again.",
        formErrors: {},
        isLoading: false
      }
    }
  } catch (error: unknown) {
    console.error("Login attempt error:", error)
    return {
      error: "Login failed. Please check your credentials and try again.",
      formErrors: {},
      isLoading: false
    }
  }
}

export async function handleRegisterSubmit(
  event: React.FormEvent<HTMLFormElement>,
  register: (name: string, email: string, password: string) => Promise<AuthResponse | void>,
  onClose?: () => void,
  onSwitchToLogin?: () => void
): Promise<{
  error: string | null
  formErrors: FormErrors
  isLoading: boolean
}> {
  event.preventDefault()
  const formErrors = validateRegistrationForm(event.currentTarget)
  
  if (Object.keys(formErrors).length > 0) {
    return {
      error: null,
      formErrors,
      isLoading: false
    }
  }

  try {
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string
    
    const result = await register(name, email, password)
    
    if (result?.success) {
      if (result.message?.includes("Please log in")) {
        if (onSwitchToLogin) {
          onSwitchToLogin()
        }
        return {
          error: result.message,
          formErrors: {},
          isLoading: false
        }
      } else if (onClose) {
        onClose()
        return {
          error: null,
          formErrors: {},
          isLoading: false
        }
      }
    }
    
    return {
      error: result?.error || "Registration failed. Please try again.",
      formErrors: {},
      isLoading: false
    }
  } catch (error: unknown) {
    console.error("Registration error:", error)
    return {
      error: "Registration failed. Please try again.",
      formErrors: {},
      isLoading: false
    }
  }
} 