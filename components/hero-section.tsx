import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Link from "next/link"

interface HeroSectionProps {
  heroContent?: {
    background_image?: string
  }
}

export function HeroSection({ heroContent }: HeroSectionProps) {
  // Added heroContent prop
  const backgroundImage = heroContent?.background_image || "/beautiful-autumn-pergola-with-wooden-structure-and.jpg"

  console.log("[v0] Hero background image URL:", backgroundImage) // Added logging for debugging

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`, // Use dynamic background image
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              ULTIMI 5 PREVENTIVI GRATUITI DI SETTEMBRE
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Trasforma il Tuo Spazio Esterno</h1>
          <p className="text-xl md:text-2xl mb-4 text-balance opacity-90">
            Con l'arrivo dell'autunno, proteggi e valorizza i tuoi momenti all'aperto con le nostre pergole e coperture
            di qualità superiore
          </p>

          <p className="text-orange-300 font-bold text-lg mb-8">⚠️ Prezzi bloccati solo fino al 30 Settembre 2024</p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Icons.Shield className="h-5 w-5 text-accent" />
              <span>Protezione dal Vento</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Icons.Leaf className="h-5 w-5 text-accent" />
              <span>Materiali Naturali</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Icons.Award className="h-5 w-5 text-accent" />
              <span>Dal 1930</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/prodotti">
              <Button size="lg" className="bg-orange-500 text-white hover:bg-orange-600 text-lg px-8 py-4 relative">
                Scopri i Nostri Prodotti
                <Icons.ArrowRight className="ml-2 h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-orange-700 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                  2 MIN
                </span>
              </Button>
            </Link>
            <Link href="/contatti">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4 bg-transparent flex flex-col"
              >
                <span>Preventivo Gratuito</span>
                <span className="text-xs opacity-75">(Risposta in 30 sec)</span>
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
            <div className="flex items-center gap-1">
              <span>⭐⭐⭐⭐⭐</span>
              <span className="text-white/90">4.9/5 da 127 clienti</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/90">23 preventivi richiesti oggi</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🏆</span>
              <span className="text-white/90">Azienda storica dal 1930</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
