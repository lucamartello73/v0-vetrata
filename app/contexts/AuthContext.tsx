"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Controlla sessione esistente all'avvio
    const session = localStorage.getItem("admin_session")
    if (session) {
      try {
        const data = JSON.parse(session)
        const now = Date.now()
        if (data.authenticated && now - data.loginTime < 24 * 60 * 60 * 1000) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem("admin_session")
        }
      } catch {
        localStorage.removeItem("admin_session")
      }
    }
    setLoading(false)
  }, [])

  const login = (password: string): boolean => {
    if (password === "admin123") {
      const sessionData = {
        authenticated: true,
        loginTime: Date.now(),
      }
      localStorage.setItem("admin_session", JSON.stringify(sessionData))
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("admin_session")
    setIsAuthenticated(false)
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth deve essere usato dentro AuthProvider")
  return context
}
