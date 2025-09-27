import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BackToHomeButton } from "@/components/back-to-home-button"
import { MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

async function getProjects() {
  const supabase = await createClient()

  console.log("[v0] Fetching realizzazioni from projects table...")

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("year", { ascending: false })
    .order("display_order", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching projects:", error)
    return []
  }

  console.log("[v0] Projects fetched:", projects?.length || 0, "items")
  console.log("[v0] Projects data:", projects)

  return projects || []
}

function getImageUrl(imageName: string | null): string {
  if (!imageName) {
    return "/placeholder.svg?height=300&width=400"
  }

  // If it's already a full URL, return as is
  if (imageName.startsWith("http")) {
    return imageName
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  return `${supabaseUrl}/storage/v1/object/public/images/${imageName}`
}

export default async function RealizationsPage() {
  const projects = await getProjects()

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <BackToHomeButton variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10" />
          </div>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Le Nostre Realizzazioni</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-balance opacity-90">
              Scopri i progetti che abbiamo realizzato con passione e dedizione, trasformando gli spazi esterni dei
              nostri clienti in luoghi unici e accoglienti.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={getImageUrl(project.image_names?.[0]) || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-primary">
                      {project.year}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location}</span>
                  </div>

                  <p className="text-muted-foreground line-clamp-3">{project.description}</p>

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.features.slice(0, 3).map((feature: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {project.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.features.length - 3} altro
                        </Badge>
                      )}
                    </div>
                  )}

                  <Link href={`/realizzazioni/${project.id}`}>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors bg-transparent"
                    >
                      Vedi Dettagli
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Vuoi Realizzare il Tuo Progetto?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Lasciati ispirare dalle nostre realizzazioni e contattaci per trasformare anche il tuo spazio esterno.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contatti">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Richiedi Preventivo
              </Button>
            </Link>
            <Link href="/prodotti">
              <Button size="lg" variant="outline">
                Scopri i Prodotti
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
