"use client"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import type React from "react"

import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Caricamento...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <>{children}</> // Mostra la pagina di login
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex h-[calc(100vh-80px)]">
        <AdminSidebar />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  )
}
