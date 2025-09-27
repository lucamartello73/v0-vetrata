import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BackToHomeButton } from "@/components/back-to-home-button"
import { TreePine, Wrench, Zap, Car, ArrowLeft, Check, Star, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

const productIcons = {
  TreePine: TreePine,
  Wrench: Wrench,
  Zap: Zap,
  Car: Car,
}

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch product from database
  const { data: product } = await supabase.from("products").select("*").eq("name", slug).single()

  if (!product) {
    notFound()
  }

  const IconComponent = productIcons[product.icon_name as keyof typeof productIcons] || TreePine

  return (
    <main className="min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <section className="py-6 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-accent">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/prodotti" className="text-muted-foreground hover:text-accent">
                Prodotti
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">{product.title}</span>
            </div>
            <BackToHomeButton variant="ghost" />
          </div>
        </div>
      </section>

      {/* Product Hero */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={
                  product.image_name?.startsWith("http") ? product.image_name : "/placeholder.svg?height=500&width=700"
                }
                alt={product.title}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute top-6 left-6 bg-accent text-accent-foreground p-3 rounded-full">
                <IconComponent className="h-8 w-8" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  <Star className="h-4 w-4 mr-1 fill-current" />
                  Premium Quality
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-balance">{product.title}</h1>

              <p className="text-xl text-muted-foreground">{product.description}</p>

              {/* Features */}
              {product.features && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Caratteristiche Principali</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link href="/contatti" className="flex-1">
                  <div className="relative">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
                      style={{
                        boxShadow: "0 0 20px rgba(249, 115, 22, 0.4), 0 10px 25px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      🚀 PREVENTIVO IMMEDIATO
                    </Button>
                    {/* Badge "2 MIN" che fa bounce */}
                    <div className="absolute -top-2 -right-2 bg-orange-800 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                      2 MIN
                    </div>
                  </div>
                </Link>
                {product.configurator_url && (
                  <Link href={product.configurator_url} className="flex-1">
                    <div className="relative">
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 animate-pulse"
                        style={{
                          boxShadow: "0 0 20px rgba(249, 115, 22, 0.4), 0 10px 25px rgba(0, 0, 0, 0.2)",
                          animationDuration: "3s",
                        }}
                      >
                        ⚡ CONFIGURATORE GRATUITO
                      </Button>
                      {/* Badge "GRATIS" in alto a destra */}
                      <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                        GRATIS
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Check className="h-6 w-6 text-accent" />
                  Garanzia Qualità
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tutti i nostri prodotti sono coperti da garanzia completa e realizzati con materiali di prima qualità.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Wrench className="h-6 w-6 text-accent" />
                  Installazione Professionale
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Il nostro team di esperti si occupa dell'installazione completa con la massima precisione e cura.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-accent" />
                  Assistenza Dedicata
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Supporto continuo post-vendita e assistenza tecnica specializzata per ogni esigenza.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Interessato a {product.title}?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contattaci per una consulenza gratuita e un preventivo personalizzato per il tuo progetto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contatti">
              <div className="relative">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
                  style={{
                    boxShadow: "0 0 20px rgba(249, 115, 22, 0.4), 0 10px 25px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Mail className="mr-2 h-5 w-5" />🚀 RICHIEDI INFORMAZIONI
                </Button>
                {/* Badge "2 MIN" che fa bounce */}
                <div className="absolute -top-2 -right-2 bg-orange-800 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                  2 MIN
                </div>
              </div>
            </Link>
            <Link href="tel:+39123456789">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                <Phone className="mr-2 h-5 w-5" />
                Chiamaci Ora
                <div className="text-xs opacity-75 ml-2">(Risposta in 30 sec)</div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Back to Products */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Link href="/prodotti">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Torna ai Prodotti
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
