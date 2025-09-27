"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { Plus, Edit, Trash2, Upload, X } from "@/components/icons"

export default function AdminRealizzazioniPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState(null)

  const supabase = createClient()

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase.from("projects").select("*").order("display_order")

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error("Error loading projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async (id) => {
    if (!confirm("Sei sicuro di voler eliminare questa realizzazione?")) return

    try {
      console.log("[v0] Starting project deletion for ID:", id)

      const response = await fetch("/api/admin/projects", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete project")
      }

      console.log("[v0] Successfully deleted project")
      loadProjects()
    } catch (error) {
      console.error("Error deleting project:", error)
      alert("Errore nell'eliminazione")
    }
  }

  if (loading) {
    return <div className="p-6">Caricamento...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestione Realizzazioni</h1>
        <Button onClick={() => setEditingProject({})}>
          <Plus className="h-4 w-4 mr-2" />
          Nuova Realizzazione
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            {project.image_names?.[0] && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${project.image_names[0]}`}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {project.title}
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditingProject(project)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteProject(project.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                {project.location} - {project.year}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.features?.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Ordine: {project.display_order}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingProject && (
        <ProjectEditModal project={editingProject} onClose={() => setEditingProject(null)} onSave={loadProjects} />
      )}
    </div>
  )
}

function ProjectEditModal({ project, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: project.title || "",
    description: project.description || "",
    location: project.location || "",
    year: project.year || new Date().getFullYear(),
    features: project.features?.join(", ") || "",
    display_order: project.display_order || 0,
    image_names: project.image_names || [],
  })

  const compressImage = (file, maxWidth = 1920, maxHeight = 1080, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(resolve, "image/jpeg", quality)
      }

      img.src = URL.createObjectURL(file)
    })
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      console.log("[v0] Original file size:", file.size, "bytes")

      let processedFile = file

      // Compress if file is larger than 2MB or if it's very large dimensions
      if (file.size > 2 * 1024 * 1024) {
        console.log("[v0] Compressing large image...")
        processedFile = await compressImage(file, 1920, 1080, 0.8)
        console.log("[v0] Compressed file size:", processedFile.size, "bytes")

        // If still too large, compress more aggressively
        if (processedFile.size > 4 * 1024 * 1024) {
          console.log("[v0] Still too large, compressing more aggressively...")
          processedFile = await compressImage(file, 1600, 900, 0.6)
          console.log("[v0] Final compressed size:", processedFile.size, "bytes")
        }
      }

      const formData = new FormData()
      formData.append("file", processedFile)
      formData.append("folder", "realizzazioni")

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const { fileName } = await response.json()

      setFormData((prev) => ({
        ...prev,
        image_names: [...prev.image_names, fileName],
      }))
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Errore nel caricamento dell'immagine")
    }
  }

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      image_names: prev.image_names.filter((_, i) => i !== index),
    }))
  }

  const handleSave = async () => {
    try {
      const dataToSave = {
        ...formData,
        features: formData.features
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f),
        year: Number.parseInt(formData.year),
      }

      const response = await fetch("/api/admin/projects", {
        method: project.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project.id ? { id: project.id, ...dataToSave } : dataToSave),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Save failed")
      }

      onSave()
      onClose()
    } catch (error) {
      console.error("Error saving project:", error)
      alert("Errore nel salvataggio")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{project.id ? "Modifica Realizzazione" : "Nuova Realizzazione"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Titolo</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="location">Località</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="year">Anno</Label>
            <Input
              id="year"
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="description">Descrizione</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="features">Caratteristiche (separate da virgola)</Label>
            <Input
              id="features"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Pergola, Bioclimatica, Motorizzata"
            />
          </div>
          <div>
            <Label htmlFor="display_order">Ordine di visualizzazione</Label>
            <Input
              id="display_order"
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: Number.parseInt(e.target.value) })}
            />
          </div>

          <div>
            <Label>Immagini</Label>
            <div className="space-y-4">
              {formData.image_names.map((imageName, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                  <img
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${imageName}`}
                    alt={`Immagine ${index + 1}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span className="flex-1 text-sm">{imageName}</span>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeImage(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Clicca per caricare un'immagine</p>
                  <p className="text-xs text-gray-500 mt-1">Le immagini vengono automaticamente ottimizzate</p>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave}>Salva</Button>
            <Button variant="outline" onClick={onClose}>
              Annulla
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
