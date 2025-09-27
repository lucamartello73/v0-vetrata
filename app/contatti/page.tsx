import { ContactSection } from "@/components/contact-section"
import { BackToHomeButton } from "@/components/back-to-home-button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contatti - Martello 1930 | Pergole e Coperture",
  description:
    "Contatta Martello 1930 per preventivi gratuiti su pergole in legno, ferro, bioclimatiche e coperture auto. Esperienza dal 1930.",
  keywords: "contatti, preventivo pergole, Martello 1930, pergole Torino, coperture auto",
}

export default function ContattiPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <BackToHomeButton />
          </div>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Contattaci</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Siamo qui per trasformare i tuoi spazi esterni. Dal 1930, la nostra esperienza è al tuo servizio per
              creare soluzioni su misura che proteggono e valorizzano la tua casa.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Additional Info Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Perché Scegliere Martello 1930?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Oltre 90 anni di esperienza nella realizzazione di pergole e coperture di qualità
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">90+</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Anni di Esperienza</h3>
              <p className="text-muted-foreground">
                Dal 1930 realizziamo pergole e coperture con la massima qualità e professionalità
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">24h</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Risposta Rapida</h3>
              <p className="text-muted-foreground">
                Ti rispondiamo entro 24 ore per fornirti tutte le informazioni di cui hai bisogno
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">100%</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Preventivo Gratuito</h3>
              <p className="text-muted-foreground">
                Offriamo sempre preventivi gratuiti e senza impegno per tutti i nostri servizi
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
