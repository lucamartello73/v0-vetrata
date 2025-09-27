import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Inter, JetBrains_Mono } from "next/font/google"
import UrgencyBanner from "@/components/urgency-banner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Martello 1930 - Pergole e Coperture di Qualità",
  description:
    "Dal 1930, esperti nella realizzazione di pergole in legno, ferro e bioclimatiche, coperture auto e chiusure perimetrali. Qualità artigianale italiana.",
  keywords: "pergole, coperture, legno, ferro, bioclimatiche, outdoor, giardino, terrazza, Italia",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="font-sans">
        <UrgencyBanner />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
