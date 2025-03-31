"use client"

import { useState } from "react"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"
import { LoginModalProps } from "@/types/auth"

export function LoginModal({ onClose, initialMode = "login" }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(initialMode === "login")

  return isLogin ? (
    <LoginForm onClose={onClose} />
  ) : (
    <RegisterForm 
      onClose={onClose} 
      onSwitchToLogin={() => setIsLogin(true)} 
    />
  )
}
