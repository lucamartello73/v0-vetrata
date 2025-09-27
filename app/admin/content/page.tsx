"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Edit, Trash2, FileText, ImageIcon, Video } from "lucide-react"

interface Content {
  id: string
  title: string
  type: "article" | "image" | "video"
  status: "published" | "draft" | "archived"
  created_at: string
  author: string
}

export default function ContentPage() {
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulated data - replace with actual Supabase query
    setTimeout(() => {
      setContents([
        {
          id: "1",
          title: "Guida ai Prodotti Martello 1930",
          type: "article",
          status: "published",
          created_at: "2024-01-20",
          author: "Admin",
        },
        {
          id: "2",
          title: "Video Presentazione Aziendale",
          type: "video",
          status: "draft",
          created_at: "2024-02-15",
          author: "Marketing Team",
        },
        {
          id: "3",
          title: "Galleria Prodotti 2024",
          type: "image",
          status: "published",
          created_at: "2024-03-01",
          author: "Design Team",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="w-4 h-4" />
      case "image":
        return <ImageIcon className="w-4 h-4" />
      case "video":
        return <Video className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return "Pubblicato"
      case "draft":
        return "Bozza"
      case "archived":
        return "Archiviato"
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contenuti</h1>
          <p className="text-gray-600">Gestisci articoli, immagini e video</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nuovo Contenuto
        </Button>
      </div>

      <div className="grid gap-4">
        {contents.map((content) => (
          <Card key={content.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded">{getTypeIcon(content.type)}</div>
                  <div>
                    <CardTitle className="text-lg">{content.title}</CardTitle>
                    <CardDescription>
                      Autore: {content.author} • {new Date(content.created_at).toLocaleDateString("it-IT")}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(content.status)}>{getStatusText(content.status)}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Visualizza
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifica
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Elimina
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {contents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">Nessun contenuto trovato</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Crea il primo contenuto
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
