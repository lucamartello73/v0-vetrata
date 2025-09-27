"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg">
      {/* Top contact bar */}
      <div className="bg-primary/90 py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Icons.Phone className="h-4 w-4" />
              <span>0185-41793</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.Mail className="h-4 w-4" />
              <span>info@martello1930.net</span>
            </div>
            <a
              href="https://wa.me/39018541793?text=Ciao,%20vorrei%20informazioni%20sui%20vostri%20prodotti"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
          <div className="hidden md:block">
            <span>Idee qualità e passione dal 1930</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Martello 1930
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/prodotti" className="hover:text-accent transition-colors">
              Prodotti
            </Link>
            <Link href="/realizzazioni" className="hover:text-accent transition-colors">
              Realizzazioni
            </Link>
            <Link href="/chiusure-perimetrali" className="hover:text-accent transition-colors">
              Chiusure Perimetrali
            </Link>
            <Link href="/contatti" className="hover:text-accent transition-colors">
              Contatti
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/contatti">
              <Button variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Preventivo Gratuito
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <Icons.X className="h-6 w-6" /> : <Icons.Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-primary-foreground/20">
            <div className="flex flex-col space-y-4 pt-4">
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <Link href="/prodotti" className="hover:text-accent transition-colors">
                Prodotti
              </Link>
              <Link href="/realizzazioni" className="hover:text-accent transition-colors">
                Realizzazioni
              </Link>
              <Link href="/chiusure-perimetrali" className="hover:text-accent transition-colors">
                Chiusure Perimetrali
              </Link>
              <Link href="/contatti" className="hover:text-accent transition-colors">
                Contatti
              </Link>
              <Link href="/contatti">
                <Button variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full">
                  Preventivo Gratuito
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
