import { User } from "./api"

export interface MobileMenuProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
  menuHeight: string
  user: User | null
  handleLogout: () => void
}

export interface UserMenuProps {
  user: User | null
  handleLogout: () => void
} 