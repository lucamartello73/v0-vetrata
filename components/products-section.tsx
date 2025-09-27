"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, TreePine, Wrench, Zap, Car } from "@/components/icons"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface Product {
  id: number
  name: string
  title: string
  description: string
  features: string[]
  image_name: string
  icon_name: string
  configurator_url: string | null
  display_order: number
  homepage_image: string | null
}

const iconMap = {
  TreePine,
  Wrench,
  Zap,
  Car,
}

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("[v0] Fetching products from database...")
        const supabase = createClient()
        const { data, error } = await supabase
          .from("products")
          .select("*, homepage_image")
          .order("display_order", { ascending: true })

        if (error) throw error
        console.log("[v0] Products fetched:", data)
        setProducts(data || [])
      } catch (error) {
        console.error("Error fetching products:", error)
        // Fallback to empty array if database fails
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Le Nostre Soluzioni</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">Caricamento prodotti...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Le Nostre Soluzioni</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Scopri la nostra gamma completa di pergole e coperture, progettate per offrire protezione, comfort e stile
            in ogni stagione dell'anno.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const IconComponent = iconMap[product.icon_name as keyof typeof iconMap] || TreePine

            const imageUrl = product.homepage_image?.startsWith("http")
              ? product.homepage_image
              : product.homepage_image
                ? `/products/${product.homepage_image}`
                : "/placeholder.svg?height=200&width=400"

            console.log("[v0] Product image URL:", {
              productId: product.id,
              imageName: product.homepage_image,
              finalUrl: imageUrl,
            })

            return (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground p-2 rounded-full">
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{product.description}</p>
                  <ul className="space-y-2">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full bg-orange-500 text-white hover:bg-orange-600 transition-colors border-orange-500"
                    asChild
                  >
                    <Link href={`/prodotti/${product.name}`}>
                      Scopri di Più
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/prodotti">
            <Button size="lg" className="bg-orange-500 text-white hover:bg-orange-600">
              Vedi Tutti i Prodotti
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
