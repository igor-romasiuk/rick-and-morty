import { FormErrors } from "@/types/auth"

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string, isLogin: boolean = false): boolean {
  if (isLogin) {
    return password.length >= 6
  }
  
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[a-z]/.test(password) && 
         /[0-9]/.test(password) && 
         /[^A-Za-z0-9]/.test(password)
}

export function getPasswordErrorMessage(isLogin: boolean = false): string {
  if (isLogin) {
    return "Password must be at least 6 characters"
  }
  return "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
}

export function validateRegistrationForm(form: HTMLFormElement): FormErrors {
  const formData = new FormData(form)
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirm-password") as string
  const name = formData.get("name") as string
  
  const errors: FormErrors = {}
  
  if (!validateEmail(email)) {
    errors.email = "Please enter a valid email address"
  }
  
  if (!validatePassword(password)) {
    errors.password = getPasswordErrorMessage()
  }
  
  if (name.length < 2) {
    errors.name = "Name must be at least 2 characters"
  }
  
  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match"
  }
  
  return errors
}

export function validateLoginForm(form: HTMLFormElement): FormErrors {
  const formData = new FormData(form)
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  
  const errors: FormErrors = {}
  
  if (!validateEmail(email)) {
    errors.email = "Please enter a valid email address"
  }
  
  if (!validatePassword(password, true)) {
    errors.password = getPasswordErrorMessage(true)
  }
  
  return errors
} 