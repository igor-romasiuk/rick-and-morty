export interface LoginModalProps {
  onClose?: () => void
  initialMode?: "login" | "register"
  hideToggle?: boolean
}

export interface FormErrors {
  email?: string
  password?: string
  confirmPassword?: string
  name?: string
} 