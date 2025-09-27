import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BackToHomeButtonProps {
  variant?: "default" | "outline" | "ghost"
  className?: string
}

export function BackToHomeButton({ variant = "outline", className = "" }: BackToHomeButtonProps) {
  return (
    <Link href="/">
      <Button variant={variant} className={`${className}`}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Torna alla Home
      </Button>
    </Link>
  )
}
