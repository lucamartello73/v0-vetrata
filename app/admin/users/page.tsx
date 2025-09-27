"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Eye, Edit, Trash2, Mail, Phone } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: "admin" | "user" | "moderator"
  status: "active" | "inactive" | "suspended"
  created_at: string
  last_login?: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulated data - replace with actual Supabase query
    setTimeout(() => {
      setUsers([
        {
          id: "1",
          name: "Mario Rossi",
          email: "mario.rossi@email.com",
          phone: "+39 123 456 7890",
          role: "admin",
          status: "active",
          created_at: "2024-01-10",
          last_login: "2024-03-15",
        },
        {
          id: "2",
          name: "Giulia Bianchi",
          email: "giulia.bianchi@email.com",
          role: "user",
          status: "active",
          created_at: "2024-02-05",
          last_login: "2024-03-14",
        },
        {
          id: "3",
          name: "Luca Verdi",
          email: "luca.verdi@email.com",
          phone: "+39 987 654 3210",
          role: "moderator",
          status: "inactive",
          created_at: "2024-01-25",
          last_login: "2024-03-10",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "moderator":
        return "bg-blue-100 text-blue-800"
      case "user":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case "admin":
        return "Amministratore"
      case "moderator":
        return "Moderatore"
      case "user":
        return "Utente"
      default:
        return role
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Attivo"
      case "inactive":
        return "Inattivo"
      case "suspended":
        return "Sospeso"
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
          <h1 className="text-3xl font-bold">Utenti</h1>
          <p className="text-gray-600">Gestisci gli utenti del sistema</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nuovo Utente
        </Button>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{user.name}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </span>
                      {user.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {user.phone}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getRoleColor(user.role)}>{getRoleText(user.role)}</Badge>
                  <Badge className={getStatusColor(user.status)}>{getStatusText(user.status)}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <p>Registrato il {new Date(user.created_at).toLocaleDateString("it-IT")}</p>
                  {user.last_login && <p>Ultimo accesso: {new Date(user.last_login).toLocaleDateString("it-IT")}</p>}
                </div>
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">Nessun utente trovato</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Invita il primo utente
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
