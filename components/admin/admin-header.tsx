"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "@/components/icons"

export function AdminHeader() {
  const [adminUser, setAdminUser] = useState<{ username: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const session = localStorage.getItem("admin_session")
    if (session) {
      const userData = JSON.parse(session)
      setAdminUser(userData)
    } else {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin_session")
    document.cookie = "admin-session=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/"
    router.push("/")
  }

  if (!adminUser) return null

  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pannello Amministrazione - Martello 1930</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{adminUser.username}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Esci
          </Button>
        </div>
      </div>
    </header>
  )
}
