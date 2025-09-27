"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { updateClosureImage, updatePageContent, saveClosureData, deleteClosureData } from "@/app/admin/actions"
import { createClient } from "@/lib/supabase/client"
import { Plus, Edit, Trash2, Upload, Eye, Shield, Wind, Thermometer } from "lucide-react"
import { Switch } from "@/components/ui/switch"

const iconMap = {
  Eye: Eye,
  Shield: Shield,
  Wind: Wind,
  Thermometer: Thermometer,
}

export default function AdminChiusurePerimetraliPage() {
  const [pageContent, setPageContent] = useState({
    hero_title: "",
    hero_description: "",
    intro_title: "",
    intro_description: "",
    intro_image: "",
    intro_generated_query: "",
    intro_is_generated: false,
    types_title: "",
    types_description: "",
    advantages_title: "",
    cta_title: "",
    cta_description: "",
  })
  const [closures, setClosures] = useState([])
  const [editingClosure, setEditingClosure] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("content")
  const [loadingImages, setLoadingImages] = useState({})

  const supabase = createClient()

  const deleteClosure = async (closureId) => {
    try {
      await deleteClosureData(closureId)
      await loadData()
      alert("Chiusura eliminata con successo!")
    } catch (error) {
      console.error("Error deleting closure:", error)
      alert("Errore nell'eliminazione della chiusura")
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
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

      const { data: closuresData } = await supabase.from("closures").select("*").order("display_order")

      if (closuresData) {
        setClosures(closuresData)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const savePageContent = async () => {
    try {
      for (const [key, value] of Object.entries(pageContent)) {
        await updatePageContent("chiusure_perimetrali", key, value)
      }
      alert("Contenuto salvato con successo!")
    } catch (error) {
      console.error("Error saving content:", error)
      alert("Errore nel salvataggio")
    }
  }

  const saveClosure = async (closureData) => {
    try {
      const { generated_query, is_generated, ...validClosureData } = closureData

      const dataToSave = {
        ...validClosureData,
        updated_at: new Date().toISOString(),
      }

      await saveClosureData(dataToSave)
      await loadData()
      setEditingClosure(null)
      alert("Chiusura salvata con successo!")
    } catch (error) {
      console.error("Error saving closure:", error)
      alert("Errore nel salvataggio")
    }
  }

  const savePageContentWithGeneratedImage = async (key, value) => {
    try {
      await updatePageContent("chiusure_perimetrali", key, value)
    } catch (error) {
      console.error("Error saving content with generated image:", error)
      alert("Errore nel salvataggio")
    }
  }

  const compressImage = (file: File, maxSizeMB = 5): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions (max 1920x1080)
        let { width, height } = img
        const maxWidth = 1920
        const maxHeight = 1080

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width *= ratio
          height *= ratio
        }

        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              })
              console.log(
                `[v0] Image compressed: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`,
              )
              resolve(compressedFile)
            } else {
              resolve(file)
            }
          },
          "image/jpeg",
          0.8,
        )
      }

      img.src = URL.createObjectURL(file)
    })
  }

  const handleImageUpload = async (file, type, closureId = null) => {
    try {
      console.log(`[v0] Starting image upload: ${file.name}, size: ${(file.size / 1024 / 1024).toFixed(2)}MB`)

      let processedFile = file
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        console.log("[v0] File too large, compressing...")
        processedFile = await compressImage(file, 5)
      }

      const formData = new FormData()
      formData.append("file", processedFile)
      formData.append("type", type)
      if (closureId) {
        formData.append("closureId", closureId.toString())
      }

      const uploadResponse = await fetch("/api/upload-closure-image", {
        method: "POST",
        body: formData,
      })

      const uploadResult = await uploadResponse.json()

      if (!uploadResult.success) {
        throw new Error(uploadResult.error || "Failed to upload image")
      }

      const publicUrl = uploadResult.supabaseUrl

      if (type === "page") {
        setPageContent((prev) => ({ ...prev, intro_image: publicUrl }))
        await savePageContentWithGeneratedImage("intro_image", publicUrl)
      } else if (type === "closure" && closureId) {
        setEditingClosure((prev) => ({ ...prev, image_name: publicUrl }))
        await loadData()
      }

      console.log(`[v0] Image uploaded successfully: ${publicUrl}`)
      return publicUrl
    } catch (error) {
      console.error("Error uploading image:", error)
      alert(`Errore nel caricamento dell'immagine: ${error.message}`)
      throw error
    }
  }

  const generateImageForClosure = (closure) => {
    const imageQueries = {
      Eye: "modern glass perimeter closure system for outdoor spaces, transparent glass panels with aluminum frame",
      Shield: "PVC perimeter closure panels, white or colored PVC sliding panels for terrace protection",
      Wind: "fabric perimeter closure system, weather-resistant textile panels for outdoor protection",
      Thermometer: "thermal insulated perimeter closure, energy efficient panels with thermal insulation",
    }

    const defaultQuery = "modern perimeter closure system for outdoor terrace protection"
    return imageQueries[closure.icon_name] || defaultQuery
  }

  const handleAutoGenerateImage = async (closure) => {
    try {
      setLoadingImages((prev) => ({ ...prev, [closure.id || "new"]: true }))

      const query = generateImageForClosure(closure)
      const imageUrl = `/placeholder.jpg?height=400&width=600&query=${encodeURIComponent(query)}`
      const timestampedUrl = `${imageUrl}&t=${Date.now()}`

      setEditingClosure((prev) => ({
        ...prev,
        image_name: imageUrl,
      }))

      console.log("[v0] Generating image for closure:", { query, imageUrl: timestampedUrl })

      try {
        const fileName = `closure-${closure.icon_name?.toLowerCase() || "default"}-${Date.now()}.jpg`
        const uploadResponse = await fetch("/api/upload-closure-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl: timestampedUrl,
            fileName,
            closureId: closure.id,
          }),
        })

        const uploadResult = await uploadResponse.json()

        if (uploadResult.success && uploadResult.supabaseUrl) {
          const permanentImageData = {
            image_name: uploadResult.supabaseUrl,
            updated_at: new Date().toISOString(),
          }

          setEditingClosure((prev) => ({
            ...prev,
            ...permanentImageData,
          }))

          if (closure.id) {
            await updateClosureImage(closure.id, uploadResult.supabaseUrl)

            setClosures((prev) =>
              prev.map((c) => (c.id === closure.id ? { ...c, image_name: uploadResult.supabaseUrl } : c)),
            )
          }

          console.log("[v0] Image uploaded to Supabase:", uploadResult.supabaseUrl)
        } else {
          console.error("[v0] Failed to upload to Supabase:", uploadResult.error)
          if (closure.id) {
            await updateClosureImage(closure.id, imageUrl)

            setClosures((prev) => prev.map((c) => (c.id === closure.id ? { ...c, image_name: imageUrl } : c)))
          }
        }
      } catch (uploadError) {
        console.error("[v0] Upload error:", uploadError)
        if (closure.id) {
          await updateClosureImage(closure.id, imageUrl)

          setClosures((prev) => prev.map((c) => (c.id === closure.id ? { ...c, image_name: imageUrl } : c)))
        }
      }
    } catch (error) {
      console.error("Error generating image:", error)
      alert("Errore nella generazione dell'immagine")
    } finally {
      setLoadingImages((prev) => ({ ...prev, [closure.id || "new"]: false }))
    }
  }

  const handleAutoGenerateIntroImage = async () => {
    try {
      setLoadingImages((prev) => ({ ...prev, intro: true }))

      const query =
        "modern perimeter closure systems showcase, elegant outdoor terrace with glass and PVC closure panels, professional architectural photography"
      const imageUrl = `/placeholder.jpg?height=400&width=800&query=${encodeURIComponent(query)}`
      const timestampedUrl = `${imageUrl}&t=${Date.now()}`

      setPageContent((prev) => ({
        ...prev,
        intro_image: imageUrl,
        intro_generated_query: query,
        intro_is_generated: true,
      }))

      console.log("[v0] Generating intro image:", { query, imageUrl: timestampedUrl })

      try {
        const fileName = `chiusure-intro-${Date.now()}.jpg`
        const uploadResponse = await fetch("/api/upload-closure-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl: timestampedUrl,
            fileName,
          }),
        })

        const uploadResult = await uploadResponse.json()

        if (uploadResult.success && uploadResult.supabaseUrl) {
          setPageContent((prev) => ({
            ...prev,
            intro_image: uploadResult.supabaseUrl,
            intro_generated_query: query,
            intro_is_generated: true,
          }))

          await updatePageContent("chiusure_perimetrali", "intro_image", uploadResult.supabaseUrl)
          await updatePageContent("chiusure_perimetrali", "intro_generated_query", query)
          await updatePageContent("chiusure_perimetrali", "intro_is_generated", "true")

          console.log("[v0] Intro image uploaded to Supabase:", uploadResult.supabaseUrl)
        } else {
          console.error("[v0] Failed to upload intro image to Supabase:", uploadResult.error)
          await updatePageContent("chiusure_perimetrali", "intro_image", imageUrl)
        }
      } catch (uploadError) {
        console.error("[v0] Intro upload error:", uploadError)
        await updatePageContent("chiusure_perimetrali", "intro_image", imageUrl)
      }
    } catch (error) {
      console.error("Error generating intro image:", error)
      alert("Errore nella generazione dell'immagine di introduzione")
    } finally {
      setLoadingImages((prev) => ({ ...prev, intro: false }))
    }
  }

  if (loading) {
    return <div className="p-6">Caricamento...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestione Chiusure Perimetrali</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="content">Contenuti Pagina</TabsTrigger>
          <TabsTrigger value="closures">Tipologie Chiusure</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Contenuto Pagina Chiusure Perimetrali</CardTitle>
              <CardDescription>Gestisci tutti i contenuti della pagina chiusure perimetrali</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hero Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Sezione Hero</h3>
                <div>
                  <Label htmlFor="hero-title">Titolo Hero</Label>
                  <Input
                    id="hero-title"
                    value={pageContent.hero_title}
                    onChange={(e) => setPageContent({ ...pageContent, hero_title: e.target.value })}
                    placeholder="Titolo principale della pagina"
                  />
                </div>
                <div>
                  <Label htmlFor="hero-description">Descrizione Hero</Label>
                  <Textarea
                    id="hero-description"
                    value={pageContent.hero_description}
                    onChange={(e) => setPageContent({ ...pageContent, hero_description: e.target.value })}
                    placeholder="Descrizione principale della pagina"
                    rows={3}
                  />
                </div>
              </div>

              {/* Introduction Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Sezione Introduzione</h3>
                <div>
                  <Label htmlFor="intro-title">Titolo Introduzione</Label>
                  <Input
                    id="intro-title"
                    value={pageContent.intro_title}
                    onChange={(e) => setPageContent({ ...pageContent, intro_title: e.target.value })}
                    placeholder="Titolo sezione introduzione"
                  />
                </div>
                <div>
                  <Label htmlFor="intro-description">Descrizione Introduzione</Label>
                  <Textarea
                    id="intro-description"
                    value={pageContent.intro_description}
                    onChange={(e) => setPageContent({ ...pageContent, intro_description: e.target.value })}
                    placeholder="Descrizione introduzione"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="intro-image">Immagine Introduzione</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="intro-image"
                      value={pageContent.intro_image}
                      onChange={(e) => setPageContent({ ...pageContent, intro_image: e.target.value })}
                      placeholder="Nome file immagine"
                    />
                    <Button variant="outline" onClick={() => document.getElementById("intro-image-upload").click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Carica
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleAutoGenerateIntroImage}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                      disabled={loadingImages.intro}
                    >
                      {loadingImages.intro ? "🔄 Generando..." : "✨ Genera Auto"}
                    </Button>
                    <input
                      id="intro-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload(file, "page")
                      }}
                    />
                  </div>
                  {pageContent.intro_image && (
                    <div className="mt-4">
                      <Label className="text-sm font-medium">Anteprima Immagine:</Label>
                      <div className="relative mt-2 border-4 border-blue-200 rounded-lg p-4 bg-blue-50">
                        <img
                          src={pageContent.intro_image || "/placeholder.jpg"}
                          alt="Anteprima"
                          className="h-64 w-full object-cover rounded-lg shadow-lg"
                          onLoad={() => {
                            console.log("[v0] Intro image loaded successfully")
                            setLoadingImages((prev) => ({ ...prev, intro: false }))
                          }}
                          onError={() => {
                            console.log("[v0] Intro image failed to load")
                            setLoadingImages((prev) => ({ ...prev, intro: false }))
                          }}
                        />
                        {loadingImages.intro && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                            <div className="text-white text-center">
                              <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
                              <span className="text-lg font-medium">Generando immagine...</span>
                              <p className="text-sm mt-2">Attendere qualche secondo</p>
                            </div>
                          </div>
                        )}
                        {pageContent.intro_is_generated && !loadingImages.intro && (
                          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
                            ✓ Immagine Generata Automaticamente
                          </div>
                        )}
                      </div>
                      {pageContent.intro_generated_query && (
                        <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded-lg">
                          <strong className="text-green-800">Query utilizzata per la generazione:</strong>
                          <p className="text-green-700 text-sm mt-1">{pageContent.intro_generated_query}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Types Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Sezione Tipologie</h3>
                <div>
                  <Label htmlFor="types-title">Titolo Tipologie</Label>
                  <Input
                    id="types-title"
                    value={pageContent.types_title}
                    onChange={(e) => setPageContent({ ...pageContent, types_title: e.target.value })}
                    placeholder="Titolo sezione tipologie"
                  />
                </div>
                <div>
                  <Label htmlFor="types-description">Descrizione Tipologie</Label>
                  <Textarea
                    id="types-description"
                    value={pageContent.types_description}
                    onChange={(e) => setPageContent({ ...pageContent, types_description: e.target.value })}
                    placeholder="Descrizione tipologie"
                    rows={3}
                  />
                </div>
              </div>

              {/* CTA Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Sezione Call to Action</h3>
                <div>
                  <Label htmlFor="cta-title">Titolo CTA</Label>
                  <Input
                    id="cta-title"
                    value={pageContent.cta_title}
                    onChange={(e) => setPageContent({ ...pageContent, cta_title: e.target.value })}
                    placeholder="Titolo call to action"
                  />
                </div>
                <div>
                  <Label htmlFor="cta-description">Descrizione CTA</Label>
                  <Textarea
                    id="cta-description"
                    value={pageContent.cta_description}
                    onChange={(e) => setPageContent({ ...pageContent, cta_description: e.target.value })}
                    placeholder="Descrizione call to action"
                    rows={3}
                  />
                </div>
              </div>

              <Button onClick={savePageContent} className="w-full">
                Salva Contenuti Pagina
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="closures">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Tipologie di Chiusure</h2>
              <Button
                onClick={() =>
                  setEditingClosure({
                    title: "",
                    description: "",
                    icon_name: "Shield",
                    image_name: "",
                    features: [],
                    benefits: [],
                    display_order: closures.length + 1,
                    is_active: true,
                  })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Aggiungi Chiusura
              </Button>
            </div>

            {/* Closures List */}
            <div className="grid gap-4">
              {closures.map((closure) => {
                const IconComponent = iconMap[closure.icon_name] || Shield
                return (
                  <Card key={closure.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-accent/10 rounded-full">
                            <IconComponent className="h-6 w-6 text-accent" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{closure.title}</h3>
                            <p className="text-muted-foreground mb-4">{closure.description}</p>

                            <div className="space-y-3">
                              <div>
                                <h4 className="font-medium mb-2">Vantaggi:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {closure.benefits?.map((benefit, index) => (
                                    <Badge key={index} variant="secondary">
                                      {benefit}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Caratteristiche:</h4>
                                <ul className="text-sm text-muted-foreground">
                                  {closure.features?.slice(0, 3).map((feature, index) => (
                                    <li key={index}>• {feature}</li>
                                  ))}
                                  {closure.features?.length > 3 && <li>... e altre {closure.features.length - 3}</li>}
                                </ul>
                              </div>
                            </div>
                          </div>

                          {closure.image_name && (
                            <div className="relative">
                              <div className="border-4 border-blue-200 rounded-lg p-4 bg-blue-50">
                                <img
                                  src={closure.image_name || "/placeholder.jpg"}
                                  alt={closure.title}
                                  className="h-64 w-full object-cover rounded-lg shadow-lg"
                                  onLoad={() => {
                                    console.log("[v0] Closure image loaded successfully")
                                    setLoadingImages((prev) => ({ ...prev, [closure.id || "new"]: false }))
                                  }}
                                  onError={() => {
                                    console.log("[v0] Closure image failed to load")
                                    setLoadingImages((prev) => ({ ...prev, [closure.id || "new"]: false }))
                                  }}
                                />
                                {loadingImages[closure.id || "new"] && (
                                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                    <div className="text-white text-center">
                                      <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
                                      <span className="text-lg font-medium">Generando immagine...</span>
                                      <p className="text-sm mt-2">Attendere qualche secondo</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                                onClick={() => {
                                  setEditingClosure(closure)
                                  handleAutoGenerateImage(closure)
                                }}
                              >
                                ✨
                              </Button>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant={closure.is_active ? "default" : "secondary"}>
                            {closure.is_active ? "Attivo" : "Inattivo"}
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => setEditingClosure(closure)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => deleteClosure(closure.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Edit Closure Modal */}
            {editingClosure && (
              <Card className="border-2 border-accent">
                <CardHeader>
                  <CardTitle>{editingClosure.id ? "Modifica Chiusura" : "Nuova Chiusura"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="closure-title">Titolo</Label>
                      <Input
                        id="closure-title"
                        value={editingClosure.title}
                        onChange={(e) => setEditingClosure({ ...editingClosure, title: e.target.value })}
                        placeholder="Nome della chiusura"
                      />
                    </div>
                    <div>
                      <Label htmlFor="closure-icon">Icona</Label>
                      <Select
                        value={editingClosure.icon_name}
                        onValueChange={(value) => setEditingClosure({ ...editingClosure, icon_name: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Eye">Occhio (Vetro)</SelectItem>
                          <SelectItem value="Shield">Scudo (PVC)</SelectItem>
                          <SelectItem value="Wind">Vento (Tessuto)</SelectItem>
                          <SelectItem value="Thermometer">Termometro (Termiche)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="closure-description">Descrizione</Label>
                    <Textarea
                      id="closure-description"
                      value={editingClosure.description}
                      onChange={(e) => setEditingClosure({ ...editingClosure, description: e.target.value })}
                      placeholder="Descrizione della chiusura"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="closure-image">Immagine</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="closure-image"
                        value={editingClosure.image_name}
                        onChange={(e) => setEditingClosure({ ...editingClosure, image_name: e.target.value })}
                        placeholder="Nome file immagine"
                      />
                      <Button variant="outline" onClick={() => document.getElementById("closure-image-upload").click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Carica
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleAutoGenerateImage(editingClosure)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                        disabled={loadingImages[editingClosure.id || "new"]}
                      >
                        {loadingImages[editingClosure.id || "new"] ? "🔄 Generando..." : "✨ Genera Auto"}
                      </Button>
                      <input
                        id="closure-image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleImageUpload(file, "closure", editingClosure.id)
                        }}
                      />
                    </div>
                    {editingClosure.image_name && (
                      <div className="mt-4">
                        <Label className="text-sm font-medium">Anteprima Immagine:</Label>
                        <div className="relative mt-2 border-4 border-blue-200 rounded-lg p-4 bg-blue-50">
                          <img
                            src={editingClosure.image_name || "/placeholder.jpg"}
                            alt="Anteprima"
                            className="h-64 w-full object-cover rounded-lg shadow-lg"
                            onLoad={() => {
                              console.log("[v0] Closure image loaded successfully")
                              setLoadingImages((prev) => ({ ...prev, [editingClosure.id || "new"]: false }))
                            }}
                            onError={() => {
                              console.log("[v0] Closure image failed to load")
                              setLoadingImages((prev) => ({ ...prev, [editingClosure.id || "new"]: false }))
                            }}
                          />
                          {loadingImages[editingClosure.id || "new"] && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                              <div className="text-white text-center">
                                <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
                                <span className="text-lg font-medium">Generando immagine...</span>
                                <p className="text-sm mt-2">Attendere qualche secondo</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="closure-benefits">Vantaggi (uno per riga)</Label>
                    <Textarea
                      id="closure-benefits"
                      value={editingClosure.benefits?.join("\n") || ""}
                      onChange={(e) =>
                        setEditingClosure({
                          ...editingClosure,
                          benefits: e.target.value.split("\n").filter((b) => b.trim()),
                        })
                      }
                      placeholder="Massima luminosità\nProtezione dal vento\nDesign moderno"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="closure-features">Caratteristiche (uno per riga)</Label>
                    <Textarea
                      id="closure-features"
                      value={editingClosure.features?.join("\n") || ""}
                      onChange={(e) =>
                        setEditingClosure({
                          ...editingClosure,
                          features: e.target.value.split("\n").filter((f) => f.trim()),
                        })
                      }
                      placeholder="Vetro temperato di sicurezza\nProfili in alluminio\nApertura scorrevole"
                      rows={6}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="closure-order">Ordine di visualizzazione</Label>
                      <Input
                        id="closure-order"
                        type="number"
                        value={editingClosure.display_order}
                        onChange={(e) =>
                          setEditingClosure({ ...editingClosure, display_order: Number.parseInt(e.target.value) })
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="closure-active"
                        checked={editingClosure.is_active}
                        onCheckedChange={(checked) => setEditingClosure({ ...editingClosure, is_active: checked })}
                      />
                      <Label htmlFor="closure-active">Attivo</Label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={() => saveClosure(editingClosure)} className="flex-1">
                      Salva Chiusura
                    </Button>
                    <Button variant="outline" onClick={() => setEditingClosure(null)}>
                      Annulla
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
