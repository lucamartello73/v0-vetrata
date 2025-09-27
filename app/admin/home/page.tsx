"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { X } from "@/components/icons"

export default function AdminHomePage() {
  const [heroContent, setHeroContent] = useState({
    title: "",
    subtitle: "",
    description: "",
    background_image: "",
  })

  const [aboutContent, setAboutContent] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
  })

  const [solutionsContent, setSolutionsContent] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    loadHomeContent()
  }, [])

  const loadHomeContent = async () => {
    try {
      const { data: heroData } = await supabase.from("site_content").select("*").eq("section", "hero")

      if (heroData) {
        const heroObj = {}
        heroData.forEach((item) => {
          heroObj[item.content_key] = item.content_value
        })
        setHeroContent(heroObj)
      }

      const { data: aboutData } = await supabase.from("site_content").select("*").eq("section", "about")

      if (aboutData) {
        const aboutObj = {}
        aboutData.forEach((item) => {
          aboutObj[item.content_key] = item.content_value
        })
        setAboutContent(aboutObj)
      }

      // Load products for solutions section
      const { data: productsData } = await supabase.from("products").select("*").order("display_order")

      setSolutionsContent(productsData || [])
    } catch (error) {
      console.error("Error loading home content:", error)
    } finally {
      setLoading(false)
    }
  }

  const convertAvifToWebP = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const convertedFile = new File([blob], file.name.replace(".avif", ".webp"), {
                type: "image/webp",
                lastModified: Date.now(),
              })
              resolve(convertedFile)
            } else {
              reject(new Error("Failed to convert AVIF to WebP"))
            }
          },
          "image/webp",
          0.9,
        )
      }

      img.onerror = () => reject(new Error("Failed to load AVIF image"))
      img.src = URL.createObjectURL(file)
    })
  }

  const compressImage = (file: File, maxSizeMB = 4.5, quality = 0.8): Promise<File> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions to reduce file size
        let { width, height } = img
        const maxDimension = 1920 // Max width/height for web images

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height * maxDimension) / width
            width = maxDimension
          } else {
            width = (width * maxDimension) / height
            height = maxDimension
          }
        }

        canvas.width = width
        canvas.height = height
        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), {
                type: "image/webp",
                lastModified: Date.now(),
              })

              console.log(
                `[v0] Image compressed: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`,
              )

              // If still too large, try with lower quality
              if (compressedFile.size > maxSizeMB * 1024 * 1024 && quality > 0.3) {
                console.log("[v0] Still too large, compressing further...")
                compressImage(file, maxSizeMB, quality - 0.2)
                  .then(resolve)
                  .catch(reject)
              } else {
                resolve(compressedFile)
              }
            } else {
              reject(new Error("Failed to compress image"))
            }
          },
          "image/webp",
          quality,
        )
      }

      img.onerror = () => reject(new Error("Failed to load image for compression"))
      img.src = URL.createObjectURL(file)
    })
  }

  const uploadImage = async (file: File, section: string, key: string) => {
    try {
      setUploading(true)
      console.log("[v0] Starting image upload:", { file: file.name, section, key })

      let fileToUpload = file

      if (file.size > 5 * 1024 * 1024) {
        // If larger than 5MB
        console.log(`[v0] File too large (${(file.size / 1024 / 1024).toFixed(2)}MB), compressing...`)
        try {
          fileToUpload = await compressImage(file)
          console.log("[v0] Image compressed successfully")
        } catch (compressionError) {
          console.error("[v0] Image compression failed:", compressionError)
          alert("Errore nella compressione dell'immagine. Prova con un file più piccolo.")
          return null
        }
      }

      // Handle AVIF conversion
      if (fileToUpload.type === "image/avif") {
        console.log("[v0] Converting AVIF to WebP...")
        try {
          fileToUpload = await convertAvifToWebP(fileToUpload)
          console.log("[v0] AVIF converted to WebP successfully")
        } catch (conversionError) {
          console.error("[v0] AVIF conversion failed:", conversionError)
          alert(
            "Errore nella conversione del file AVIF. Prova a convertire il file manualmente in formato WebP, JPEG o PNG.",
          )
          return null
        }
      }

      const formData = new FormData()
      formData.append("file", fileToUpload)
      formData.append("section", section)
      formData.append("key", key)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const { url } = await response.json()
      console.log("[v0] Upload successful, URL:", url)
      return url
    } catch (error) {
      console.error("[v0] Error uploading image:", error)
      alert(`Errore nel caricamento dell'immagine: ${error.message}`)
      return null
    } finally {
      setUploading(false)
    }
  }

  const handleImageUpload = async (file: File, section: string, key: string) => {
    const imageUrl = await uploadImage(file, section, key)
    if (imageUrl) {
      if (section === "hero") {
        setHeroContent({ ...heroContent, [key]: imageUrl })
        try {
          const response = await fetch("/api/save-content", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              section: "hero",
              content_key: key,
              content_value: imageUrl,
              content_type: "image",
            }),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "Save failed")
          }

          console.log("[v0] Hero image saved successfully to database")
          alert("Immagine caricata e salvata con successo!")
        } catch (error) {
          console.error("[v0] Error saving hero image to database:", error)
          alert(`Errore nel salvataggio dell'immagine: ${error.message}`)
        }
      } else if (section === "about") {
        setAboutContent({ ...aboutContent, [key]: imageUrl })
        try {
          console.log("[v0] Attempting to save about image to database:", { section, key, imageUrl })
          const response = await fetch("/api/save-content", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              section: "about",
              content_key: key,
              content_value: imageUrl,
              content_type: "image",
            }),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "Save failed")
          }

          console.log("[v0] About image saved successfully to database")
          alert("Immagine caricata e salvata con successo!")
        } catch (error) {
          console.error("[v0] Error saving about image to database:", error)
          alert(`Errore nel salvataggio dell'immagine: ${error.message}`)
        }
      }
    } else {
      console.error("[v0] Image upload failed, cannot save to database")
      alert("Errore nel caricamento dell'immagine")
    }
  }

  const saveHeroContent = async () => {
    try {
      for (const [key, value] of Object.entries(heroContent)) {
        const response = await fetch("/api/save-content", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            section: "hero",
            content_key: key,
            content_value: value,
            content_type: key.includes("image") ? "image" : "text",
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Save failed")
        }
      }
      alert("Contenuto hero salvato con successo!")
    } catch (error) {
      console.error("Error saving hero content:", error)
      alert("Errore nel salvataggio")
    }
  }

  const saveAboutContent = async () => {
    try {
      for (const [key, value] of Object.entries(aboutContent)) {
        const response = await fetch("/api/save-content", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            section: "about",
            content_key: key,
            content_value: value,
            content_type: key.includes("image") ? "image" : "text",
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Save failed")
        }
      }
      alert("Contenuto sezione tradizione salvato con successo!")
    } catch (error) {
      console.error("Error saving about content:", error)
      alert("Errore nel salvataggio")
    }
  }

  const updateProduct = async (productId: number, updates: any) => {
    try {
      console.log("[v0] Updating product", productId, "with updates:", updates)

      const { error } = await supabase.from("products").update(updates).eq("id", productId)

      if (error) throw error

      const updatedProducts = solutionsContent.map((p) => (p.id === productId ? { ...p, ...updates } : p))
      setSolutionsContent(updatedProducts)

      console.log("[v0] Product updated successfully in database and local state")
      alert("Prodotto aggiornato con successo!")
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Errore nell'aggiornamento del prodotto")
    }
  }

  if (loading) {
    return <div className="p-6">Caricamento...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestione Homepage</h1>
      </div>

      <Tabs defaultValue="hero" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hero">Sezione Hero</TabsTrigger>
          <TabsTrigger value="about">Tradizione e Innovazione</TabsTrigger>
          <TabsTrigger value="solutions">Le Nostre Soluzioni</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Sezione Hero</CardTitle>
              <CardDescription>Gestisci il contenuto principale e l'immagine di sfondo della homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Immagine di Sfondo Hero</Label>
                <div className="mt-2 space-y-4">
                  {heroContent.background_image && (
                    <div className="relative">
                      <img
                        src={heroContent.background_image || "/placeholder.svg"}
                        alt="Background Hero"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() => setHeroContent({ ...heroContent, background_image: "" })}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload(file, "hero", "background_image")
                      }}
                      disabled={uploading}
                    />
                    {uploading && <span className="text-sm text-muted-foreground">Caricamento...</span>}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="hero-title">Titolo Principale</Label>
                <Input
                  id="hero-title"
                  value={heroContent.title || ""}
                  onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                  placeholder="Trasforma il Tuo Spazio Esterno"
                />
              </div>
              <div>
                <Label htmlFor="hero-subtitle">Sottotitolo</Label>
                <Input
                  id="hero-subtitle"
                  value={heroContent.subtitle || ""}
                  onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                  placeholder="Inserisci il sottotitolo"
                />
              </div>
              <div>
                <Label htmlFor="hero-description">Descrizione</Label>
                <Textarea
                  id="hero-description"
                  value={heroContent.description || ""}
                  onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
                  placeholder="Con l'arrivo dell'autunno, proteggi e valorizza i tuoi momenti all'aperto..."
                  rows={4}
                />
              </div>
              <Button onClick={saveHeroContent} disabled={uploading}>
                Salva Contenuto Hero
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>Sezione Tradizione e Innovazione</CardTitle>
              <CardDescription>Gestisci il contenuto e l'immagine della sezione "La Nostra Storia"</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Immagine Tradizione e Innovazione</Label>
                <div className="mt-2 space-y-4">
                  {aboutContent.image && (
                    <div className="relative">
                      <img
                        src={aboutContent.image || "/placeholder.svg"}
                        alt="Tradizione e Innovazione"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() => setAboutContent({ ...aboutContent, image: "" })}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload(file, "about", "image")
                      }}
                      disabled={uploading}
                    />
                    {uploading && <span className="text-sm text-muted-foreground">Caricamento...</span>}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="about-title">Titolo Sezione</Label>
                <Input
                  id="about-title"
                  value={aboutContent.title || ""}
                  onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                  placeholder="La Nostra Storia di Eccellenza"
                />
              </div>

              <div>
                <Label htmlFor="about-description">Descrizione Introduttiva</Label>
                <Textarea
                  id="about-description"
                  value={aboutContent.description || ""}
                  onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })}
                  placeholder="Dal 1930, la famiglia Martello si dedica alla creazione di spazi esterni unici..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="about-content">Contenuto Principale</Label>
                <Textarea
                  id="about-content"
                  value={aboutContent.content || ""}
                  onChange={(e) => setAboutContent({ ...aboutContent, content: e.target.value })}
                  placeholder="Ogni pergola che realizziamo racconta una storia di passione e dedizione..."
                  rows={6}
                />
              </div>

              <Button onClick={saveAboutContent} disabled={uploading}>
                Salva Contenuto Tradizione
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="solutions">
          <Card>
            <CardHeader>
              <CardTitle>Le Nostre Soluzioni</CardTitle>
              <CardDescription>Gestisci le 4 soluzioni principali mostrate nella homepage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {solutionsContent.map((product) => (
                  <Card key={product.id} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Immagine Prodotto</Label>
                        <div className="mt-2 space-y-4">
                          {product.homepage_image && (
                            <div className="relative">
                              <img
                                src={product.homepage_image || "/placeholder.svg"}
                                alt={product.title}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="absolute top-2 right-2"
                                onClick={() => updateProduct(product.id, { homepage_image: "" })}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            id={`product-image-${product.id}`}
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                const imageUrl = await uploadImage(file, "homepage", `product-${product.id}`)
                                if (imageUrl) {
                                  updateProduct(product.id, { homepage_image: imageUrl })
                                }
                              }
                            }}
                            disabled={uploading}
                          />
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                            disabled={uploading}
                            onClick={() => document.getElementById(`product-image-${product.id}`)?.click()}
                          >
                            {uploading
                              ? "Caricamento..."
                              : product.homepage_image
                                ? "Cambia Immagine"
                                : "Carica Immagine"}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label>Titolo</Label>
                          <Input
                            value={product.title || ""}
                            onChange={(e) => {
                              const updatedProducts = solutionsContent.map((p) =>
                                p.id === product.id ? { ...p, title: e.target.value } : p,
                              )
                              setSolutionsContent(updatedProducts)
                            }}
                            onBlur={() => updateProduct(product.id, { title: product.title })}
                          />
                        </div>

                        <div>
                          <Label>Descrizione</Label>
                          <Textarea
                            value={product.description || ""}
                            onChange={(e) => {
                              const updatedProducts = solutionsContent.map((p) =>
                                p.id === product.id ? { ...p, description: e.target.value } : p,
                              )
                              setSolutionsContent(updatedProducts)
                            }}
                            onBlur={() => updateProduct(product.id, { description: product.description })}
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label>Link Pulsante</Label>
                          <Input
                            value={product.configurator_url || ""}
                            onChange={(e) => {
                              const updatedProducts = solutionsContent.map((p) =>
                                p.id === product.id ? { ...p, configurator_url: e.target.value } : p,
                              )
                              setSolutionsContent(updatedProducts)
                            }}
                            onBlur={(e) => {
                              const currentProduct = solutionsContent.find((p) => p.id === product.id)
                              const newValue = currentProduct?.configurator_url || ""
                              console.log("[v0] Saving configurator_url for product", product.id, "value:", newValue)
                              if (newValue !== (product.configurator_url || "")) {
                                updateProduct(product.id, { configurator_url: newValue })
                              }
                            }}
                            placeholder="https://configuratoreplegno.martello1930.net/configurator/type"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <Button asChild>
                  <a href="/admin/prodotti">Gestisci Tutti i Prodotti</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
