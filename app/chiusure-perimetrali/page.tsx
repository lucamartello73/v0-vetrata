"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BackToHomeButton } from "@/components/back-to-home-button"
import { Shield, Wind, Thermometer, Eye, Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"

const iconMap = {
  Eye: Eye,
  Shield: Shield,
  Wind: Wind,
  Thermometer: Thermometer,
}

export default function ClosuresPage() {
  const [pageContent, setPageContent] = useState({})
  const [closures, setClosures] = useState([])
  const [loading, setLoading] = useState(true)
  const [imageLoadingStates, setImageLoadingStates] = useState({})

  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Load page content
      const { data: contentData } = await supabase
        .from("site_content")
        .select("*")
        .eq("section", "chiusure_perimetrali")

      if (contentData) {
        const contentObj = {}
        contentData.forEach((item) => {
          contentObj[item.content_key] = item.content_value
        })
        setPageContent(contentObj)
      }

      // Load closures
      const { data: closuresData } = await supabase
        .from("closures")
        .select("*")
        .eq("is_active", true)
        .order("display_order")

      if (closuresData) {
        setClosures(closuresData)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Caricamento...</div>
  }

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              {pageContent.hero_title || "Chiusure Perimetrali"}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-balance opacity-90">
              {pageContent.hero_description ||
                "Completa la tua pergola con le nostre soluzioni di chiusura perimetrale."}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                {pageContent.intro_title || "Protezione e Comfort in Ogni Stagione"}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {pageContent.intro_description ||
                  "Le chiusure perimetrali trasformano la tua pergola in uno spazio vivibile tutto l'anno."}
              </p>
              <Link href="/preventivo">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Richiedi Consulenza
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="relative">
                <img
                  src={
                    pageContent.intro_image
                      ? pageContent.intro_image.startsWith("/placeholder") ||
                        pageContent.intro_image.startsWith("https://")
                        ? pageContent.intro_image
                        : `/placeholder.jpg?height=400&width=600&query=${encodeURIComponent(pageContent.intro_image)}`
                      : "/modern-perimeter-closure-systems-showcase--elegant.jpg"
                  }
                  alt="Pergola con chiusure perimetrali"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                  onLoad={() => {
                    console.log("[v0] Intro image loaded successfully")
                    setImageLoadingStates((prev) => ({ ...prev, intro: false }))
                  }}
                  onError={() => {
                    console.log("[v0] Intro image failed to load")
                    setImageLoadingStates((prev) => ({ ...prev, intro: false }))
                  }}
                />
                {imageLoadingStates.intro && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                    <div className="text-gray-500">Caricamento immagine...</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closure Types */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">{pageContent.types_title || "Tipologie di Chiusure"}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {pageContent.types_description || "Scegli la soluzione più adatta alle tue esigenze."}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {closures.map((closure) => {
              const IconComponent = iconMap[closure.icon_name] || Shield
              return (
                <Card key={closure.id} className="group hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="relative">
                      <img
                        src={
                          closure.image_name
                            ? closure.image_name.startsWith("/placeholder") || closure.image_name.startsWith("https://")
                              ? closure.image_name
                              : `/placeholder.jpg?height=300&width=500&query=${encodeURIComponent(closure.image_name)}`
                            : `/placeholder.jpg?height=300&width=500&query=modern ${closure.title?.toLowerCase() || "perimeter closure"} system for outdoor terrace protection`
                        }
                        alt={closure.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        onLoad={() => {
                          console.log("[v0] Closure image loaded successfully")
                          setImageLoadingStates((prev) => ({ ...prev, [closure.id]: false }))
                        }}
                        onError={() => {
                          console.log("[v0] Closure image failed to load")
                          setImageLoadingStates((prev) => ({ ...prev, [closure.id]: false }))
                        }}
                      />
                      {imageLoadingStates[closure.id] && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                          <div className="text-gray-500 text-sm">Caricamento...</div>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-6 left-6 bg-accent text-accent-foreground p-3 rounded-full">
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-2xl">{closure.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">{closure.description}</p>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-2">
                      {closure.benefits?.map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="bg-accent/10 text-accent">
                          {benefit}
                        </Badge>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">Caratteristiche:</h4>
                      <ul className="space-y-2">
                        {closure.features?.map((feature, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-accent flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white border-orange-500 hover:border-orange-600 transition-colors"
                      asChild
                    >
                      <Link href="/preventivo">
                        Richiedi Preventivo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Perché Scegliere le Nostre Chiusure</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <Shield className="h-16 w-16 text-accent mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Protezione Totale</h3>
                <p className="text-muted-foreground">
                  Protezione completa da vento, pioggia, neve e temperature rigide per un comfort ottimale.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Thermometer className="h-16 w-16 text-accent mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Controllo Climatico</h3>
                <p className="text-muted-foreground">
                  Mantieni la temperatura ideale nei tuoi spazi esterni durante tutto l'anno.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Eye className="h-16 w-16 text-accent mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Design Elegante</h3>
                <p className="text-muted-foreground">
                  Soluzioni esteticamente raffinate che valorizzano l'architettura della tua pergola.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">{pageContent.cta_title || "Pronto per le Chiusure Perimetrali?"}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {pageContent.cta_description || "Contattaci per una consulenza personalizzata."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/preventivo">
              <Button size="lg" className="bg-orange-500 text-white hover:bg-orange-600">
                Richiedi Preventivo Gratuito
              </Button>
            </Link>
            <Link href="/prodotti">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                Vedi le Pergole
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
