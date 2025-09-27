import { Card, CardContent } from "@/components/ui/card"
import { Users, Hammer, TreePine, Star } from "@/components/icons"

interface AboutSectionProps {
  aboutContent?: {
    image?: string
    title?: string
    description?: string
  }
}

export function AboutSection({ aboutContent }: AboutSectionProps) {
  console.log("[v0] AboutSection received props:", aboutContent)

  const imageUrl = aboutContent?.image || "/italian-craftsman-working-on-wooden-pergola-in-wor.jpg"
  const title = aboutContent?.title || "Tradizione e Innovazione"
  const description =
    aboutContent?.description ||
    "Ogni pergola che realizziamo racconta una storia di passione e dedizione. I nostri maestri artigiani uniscono tecniche tradizionali tramandate di generazione in generazione con le più moderne tecnologie di lavorazione."

  console.log("[v0] Using image URL:", imageUrl)

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">La Nostra Storia di Eccellenza</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Dal 1930, la famiglia Martello si dedica alla creazione di spazi esterni unici, combinando tradizione
            artigianale e innovazione tecnologica per offrire soluzioni di qualità superiore.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Artigiano al lavoro"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">{title}</h3>
            <p className="text-lg text-muted-foreground">{description}</p>
            <p className="text-lg text-muted-foreground">
              Utilizziamo solo materiali di prima qualità, selezionati per resistere alle intemperie e mantenere la loro
              bellezza nel tempo, garantendo protezione e comfort in ogni stagione.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-accent mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">❤️</div>
              <div className="text-muted-foreground">Clienti Soddisfatti</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Hammer className="h-12 w-12 text-accent mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">90+</div>
              <div className="text-muted-foreground">Anni di Esperienza</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <TreePine className="h-12 w-12 text-accent mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Materiali Naturali</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Star className="h-12 w-12 text-accent mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">5</div>
              <div className="text-muted-foreground">Stelle di Qualità</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
