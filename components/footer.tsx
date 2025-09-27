import Link from "next/link"
import { Icons } from "@/components/icons"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Martello 1930</h3>
            <p className="text-primary-foreground/80">
              Idee qualità e passione dal 1930. Esperti nella realizzazione di pergole, coperture e soluzioni per
              l'outdoor di qualità superiore.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Icons.Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Icons.Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Icons.Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Link Rapidi</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/prodotti" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Prodotti
                </Link>
              </li>
              <li>
                <Link href="/realizzazioni" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Realizzazioni
                </Link>
              </li>
              <li>
                <Link
                  href="/chiusure-perimetrali"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Chiusure Perimetrali
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">I Nostri Prodotti</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/prodotti/pergole-legno"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Pergole in Legno
                </Link>
              </li>
              <li>
                <Link
                  href="/prodotti/pergole-ferro"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Pergole in Ferro
                </Link>
              </li>
              <li>
                <Link
                  href="/prodotti/pergole-bioclimatiche"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Pergole Bioclimatiche
                </Link>
              </li>
              <li>
                <Link
                  href="/prodotti/coperture-auto"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Coperture Auto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contatti</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Icons.MapPin className="h-4 w-4 text-accent mt-1" />
                <div className="text-primary-foreground/80 text-sm">
                  <div className="mb-2">
                    <strong>Sede Principale:</strong>
                    <br />
                    Via Traversaro, 13
                    <br />
                    16039 Sestri Levante (GE)
                  </div>
                  <div>
                    <strong>Sede Espositiva:</strong>
                    <br />
                    Via Aurelia
                    <br />
                    Sestri Levante (GE)
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icons.Phone className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">0185-41793</span>
              </div>
              <div className="flex items-center gap-3">
                <Icons.Mail className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">info@martello1930.net</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-center md:text-left">
              © 2024 Martello 1930. Tutti i diritti riservati. |
              <Link href="/privacy" className="hover:text-accent transition-colors ml-1">
                Privacy Policy
              </Link>{" "}
              |
              <Link href="/cookie" className="hover:text-accent transition-colors ml-1">
                Cookie Policy
              </Link>
            </p>
            <Link
              href="/admin/login"
              className="text-primary-foreground/40 hover:text-accent transition-colors mt-4 md:mt-0 flex items-center gap-2 text-sm"
              title="Area Amministrativa"
            >
              <Icons.Settings className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
