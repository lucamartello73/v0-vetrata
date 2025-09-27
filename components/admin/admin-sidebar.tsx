"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Home, Package, Building, Wrench, Mail, BarChart3, Settings } from "@/components/icons"
import { createBrowserClient } from "@supabase/ssr"

interface SidebarItem {
  title: string
  href: string
  icon: any
  badge?: number
}

const baseSidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Gestione Home",
    href: "/admin/home",
    icon: Home,
  },
  {
    title: "Gestione Prodotti",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Gestione Realizzazioni",
    href: "/admin/realizzazioni",
    icon: Building,
  },
  {
    title: "Chiusure Perimetrali",
    href: "/admin/chiusure-perimetrali",
    icon: Wrench,
  },
  {
    title: "Gestione Contatti",
    href: "/admin/contatti",
    icon: Mail,
  },
  {
    title: "Form Submissions",
    href: "/admin/form-submissions",
    icon: Mail,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Impostazioni",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [newSubmissionsCount, setNewSubmissionsCount] = useState(0)
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>(baseSidebarItems)

  useEffect(() => {
    const fetchNewSubmissionsCount = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        )

        const { count } = await supabase
          .from("form_submissions")
          .select("*", { count: "exact", head: true })
          .eq("status", "new")

        setNewSubmissionsCount(count || 0)

        // Update sidebar items with badge count
        const updatedItems = baseSidebarItems.map((item) =>
          item.href === "/admin/form-submissions" ? { ...item, badge: count || 0 } : item,
        )
        setSidebarItems(updatedItems)
      } catch (error) {
        console.error("Error fetching new submissions count:", error)
      }
    }

    fetchNewSubmissionsCount()

    // Refresh count every 30 seconds
    const interval = setInterval(fetchNewSubmissionsCount, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <aside className="w-64 bg-card border-r border-border h-full">
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
            {item.badge && item.badge > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
