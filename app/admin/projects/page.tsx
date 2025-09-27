"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Edit, Trash2 } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "paused"
  created_at: string
  client: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulated data - replace with actual Supabase query
    setTimeout(() => {
      setProjects([
        {
          id: "1",
          name: "Sito Web Aziendale",
          description: "Sviluppo del nuovo sito web corporate",
          status: "active",
          created_at: "2024-01-15",
          client: "ABC Corp",
        },
        {
          id: "2",
          name: "App Mobile",
          description: "Applicazione mobile per gestione ordini",
          status: "completed",
          created_at: "2024-02-01",
          client: "XYZ Ltd",
        },
        {
          id: "3",
          name: "E-commerce Platform",
          description: "Piattaforma e-commerce personalizzata",
          status: "paused",
          created_at: "2024-03-10",
          client: "Shop Online",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Attivo"
      case "completed":
        return "Completato"
      case "paused":
        return "In Pausa"
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
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
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
          <h1 className="text-3xl font-bold">Progetti</h1>
          <p className="text-gray-600">Gestisci tutti i progetti aziendali</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nuovo Progetto
        </Button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <CardDescription className="mt-1">
                    Cliente: {project.client} • Creato il {new Date(project.created_at).toLocaleDateString("it-IT")}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{project.description}</p>
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

      {projects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">Nessun progetto trovato</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Crea il primo progetto
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
