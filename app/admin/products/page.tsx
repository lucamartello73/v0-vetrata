"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Package, Edit, Trash2, Plus, TreePine, Wrench, Zap, Car, Save, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

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
  created_at: string
  updated_at: string
}

const iconOptions = [
  { value: "TreePine", label: "Albero (Legno)", icon: TreePine },
  { value: "Wrench", label: "Chiave (Ferro)", icon: Wrench },
  { value: "Zap", label: "Fulmine (Bioclimatico)", icon: Zap },
  { value: "Car", label: "Auto (Coperture)", icon: Car },
]

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    features: [""],
    image_name: "",
    icon_name: "TreePine",
    configurator_url: "",
    display_order: 1,
  })
  const [uploading, setUploading] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*").order("display_order", { ascending: true })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Errore nel caricamento dei prodotti")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProduct = async () => {
    try {
      const productData = {
        ...formData,
        features: formData.features.filter((f) => f.trim() !== ""),
        configurator_url: formData.configurator_url || null,
      }

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update({ ...productData, updated_at: new Date().toISOString() })
          .eq("id", editingProduct.id)

        if (error) throw error
        toast.success("Prodotto aggiornato con successo")
      } else {
        const { error } = await supabase.from("products").insert([productData])

        if (error) throw error
        toast.success("Prodotto creato con successo")
      }

      setIsDialogOpen(false)
      setEditingProduct(null)
      resetForm()
      fetchProducts()
    } catch (error) {
      console.error("Error saving product:", error)
      toast.error("Errore nel salvataggio del prodotto")
    }
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Sei sicuro di voler eliminare questo prodotto?")) return

    try {
      const { error } = await supabase.from("products").delete().eq("id", id)

      if (error) throw error
      toast.success("Prodotto eliminato con successo")
      fetchProducts()
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("Errore nell'eliminazione del prodotto")
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      title: product.title,
      description: product.description,
      features: product.features.length > 0 ? product.features : [""],
      image_name: product.image_name,
      icon_name: product.icon_name,
      configurator_url: product.configurator_url || "",
      display_order: product.display_order,
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      description: "",
      features: [""],
      image_name: "",
      icon_name: "TreePine",
      configurator_url: "",
      display_order: 1,
    })
  }

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }

  const updateFeature = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((f, i) => (i === index ? value : f)),
    }))
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find((opt) => opt.value === iconName)
    return iconOption ? iconOption.icon : TreePine
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

  const uploadImage = async (file: File, section: string, key: string) => {
    try {
      setUploading(true)
      console.log("[v0] Starting image upload:", { file: file.name, section, key })

      let fileToUpload = file
      if (file.type === "image/avif") {
        console.log("[v0] Converting AVIF to WebP...")
        try {
          fileToUpload = await convertAvifToWebP(file)
          console.log("[v0] AVIF converted to WebP successfully")
        } catch (conversionError) {
          console.error("[v0] AVIF conversion failed:", conversionError)
          toast.error(
            "Errore nella conversione del file AVIF. Prova a convertire il file manualmente in formato WebP, JPEG o PNG.",
          )
          return null
        }
      }

      const formData = new FormData()
      formData.append("file", fileToUpload)
      formData.append("section", "products")
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
      toast.error(`Errore nel caricamento dell'immagine: ${error.message}`)
      return null
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p>Caricamento prodotti...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestione Prodotti</h1>
          <p className="text-muted-foreground">Gestisci i prodotti visualizzati sul sito</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => {
                setEditingProduct(null)
                resetForm()
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuovo Prodotto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Modifica Prodotto" : "Nuovo Prodotto"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome (slug)</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="pergole-legno"
                  />
                </div>
                <div>
                  <Label htmlFor="display_order">Ordine</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, display_order: Number.parseInt(e.target.value) }))
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="title">Titolo</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Pergole in Legno Premium"
                />
              </div>

              <div>
                <Label htmlFor="description">Descrizione</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrizione del prodotto..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image_name">Immagine Prodotto</Label>
                  <div className="space-y-4">
                    {formData.image_name && (
                      <div className="relative">
                        <img
                          src={formData.image_name || "/placeholder.svg"}
                          alt="Product Image"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                          onClick={() => setFormData((prev) => ({ ...prev, image_name: "" }))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      id="product-image-upload"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const imageUrl = await uploadImage(file, "products", `product-${Date.now()}`)
                          if (imageUrl) {
                            setFormData((prev) => ({ ...prev, image_name: imageUrl }))
                          }
                        }
                      }}
                      disabled={uploading}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full bg-transparent"
                      disabled={uploading}
                      onClick={() => document.getElementById("product-image-upload")?.click()}
                    >
                      {uploading ? "Caricamento..." : formData.image_name ? "Cambia Immagine" : "Carica Immagine"}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="icon_name">Icona</Label>
                  <Select
                    value={formData.icon_name}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, icon_name: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.icon className="h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="configurator_url">URL Configuratore (opzionale)</Label>
                <Input
                  id="configurator_url"
                  value={formData.configurator_url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, configurator_url: e.target.value }))}
                  placeholder="/configuratore-bioclimatica"
                />
              </div>

              <div>
                <Label>Caratteristiche</Label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="Caratteristica del prodotto"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(index)}
                        disabled={formData.features.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addFeature}>
                    <Plus className="h-4 w-4 mr-2" />
                    Aggiungi Caratteristica
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annulla
                </Button>
                <Button onClick={handleSaveProduct} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Save className="h-4 w-4 mr-2" />
                  {editingProduct ? "Aggiorna" : "Crea"} Prodotto
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const IconComponent = getIconComponent(product.icon_name)

          return (
            <Card key={product.id} className="hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={product.image_name || "/placeholder.svg?height=200&width=400"}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary">#{product.display_order}</Badge>
                </div>
                <div className="absolute top-2 left-2 bg-accent text-accent-foreground p-2 rounded-full">
                  <IconComponent className="h-4 w-4" />
                </div>
              </div>

              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{product.title}</span>
                  <Package className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Caratteristiche:</h4>
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 3).map((feature: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {product.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.features.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Configurator URL */}
                {product.configurator_url && (
                  <div className="text-xs text-muted-foreground">
                    <strong>Configuratore:</strong> {product.configurator_url}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Modifica
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive bg-transparent"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  Aggiornato: {new Date(product.updated_at).toLocaleDateString("it-IT")}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Nessun prodotto trovato</h3>
          <p className="text-muted-foreground mb-4">Inizia creando il tuo primo prodotto</p>
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => {
              setEditingProduct(null)
              resetForm()
              setIsDialogOpen(true)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Crea Primo Prodotto
          </Button>
        </div>
      )}
    </div>
  )
}
