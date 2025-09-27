import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BackToHomeButton } from "@/components/back-to-home-button"
import { TreePine, Wrench, Zap, Car, ArrowRight, Check, Star } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

const productIcons = {
  TreePine: TreePine,
  Wrench: Wrench,
  Zap: Zap,
  Car: Car,
}

export default async function ProductsPage() {
  const supabase = await createClient()

  // Fetch products from database
  const { data: products } = await supabase.from("products").select("*").order("display_order", { ascending: true })

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">I Nostri Prodotti</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-balance opacity-90">
              Scopri la nostra gamma completa di pergole e coperture, progettate per offrire protezione, comfort e stile
              in ogni stagione dell'anno.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {products?.map((product) => {
              const IconComponent = productIcons[product.icon_name as keyof typeof productIcons] || TreePine

              return (
                <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={
                        product.image_name?.startsWith("http")
                          ? product.image_name
                          : "/placeholder.svg?height=400&width=600"
                      }
                      alt={product.title}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-6 left-6 bg-accent text-accent-foreground p-3 rounded-full">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div className="absolute top-6 right-6">
                      <Badge variant="secondary" className="bg-white/90 text-primary">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        Premium
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-2xl">{product.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground text-lg">{product.description}</p>

                    {/* Features */}
                    {product.features && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg">Caratteristiche Principali:</h4>
                        <ul className="space-y-2">
                          {product.features.map((feature: string, index: number) => (
                            <li key={index} className="flex items-center gap-3">
                              <Check className="h-5 w-5 text-accent flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Link href={`/prodotti/${product.name}`} className="flex-1">
                        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                          Scopri di Più
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      {product.configurator_url && (
                        <Link href={product.configurator_url} className="flex-1">
                          <div className="relative">
                            <Button
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
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Hai Bisogno di una Consulenza?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            I nostri esperti sono a tua disposizione per aiutarti a scegliere la soluzione perfetta per le tue esigenze.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contatti">
              <div className="relative">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
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
            <Link href="tel:+39123456789">
              <Button size="lg" variant="outline">
                Chiamaci Ora
                <div className="text-xs text-muted-foreground ml-2">(Risposta in 30 sec)</div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
