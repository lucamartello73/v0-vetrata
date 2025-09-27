"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { Eye, Trash2, Edit, Search, Filter } from "@/components/icons"
import { cn } from "@/lib/utils"

interface FormSubmission {
  id: string
  created_at: string
  form_type: string
  client_name: string
  client_email: string
  client_phone: string
  message: string
  product_type: string
  dimensions: string
  additional_data: any
  status: string
  admin_notes: string
}

const STATUS_COLORS = {
  new: "bg-red-100 text-red-800 border-red-200",
  contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
  archived: "bg-gray-100 text-gray-800 border-gray-200",
}

const FORM_TYPE_LABELS = {
  preventivo: "Preventivo",
  contatto: "Contatto",
  configuratore: "Configuratore",
}

export default function FormSubmissionsPage() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    formType: "all",
    status: "all",
    search: "",
    dateFrom: "",
    dateTo: "",
  })

  const itemsPerPage = 10
  const supabase = createClient()

  const fetchSubmissions = async () => {
    setLoading(true)

    let query = supabase
      .from("form_submissions")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)

    // Apply filters
    if (filters.formType !== "all") {
      query = query.eq("form_type", filters.formType)
    }
    if (filters.status !== "all") {
      query = query.eq("status", filters.status)
    }
    if (filters.search) {
      query = query.or(`client_name.ilike.%${filters.search}%,client_email.ilike.%${filters.search}%`)
    }
    if (filters.dateFrom) {
      query = query.gte("created_at", filters.dateFrom)
    }
    if (filters.dateTo) {
      query = query.lte("created_at", filters.dateTo + "T23:59:59")
    }

    const { data, error, count } = await query

    if (error) {
      console.error("Error fetching submissions:", error)
    } else {
      setSubmissions(data || [])
      setTotalCount(count || 0)
    }

    setLoading(false)
  }

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("form_submissions").update({ status: newStatus }).eq("id", id)

    if (error) {
      console.error("Error updating status:", error)
    } else {
      fetchSubmissions()
    }
  }

  const deleteSubmission = async (id: string) => {
    if (confirm("Sei sicuro di voler eliminare questa submission?")) {
      const { error } = await supabase.from("form_submissions").delete().eq("id", id)

      if (error) {
        console.error("Error deleting submission:", error)
      } else {
        fetchSubmissions()
      }
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [currentPage, filters])

  const totalPages = Math.ceil(totalCount / itemsPerPage)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Form Submissions</h1>
        <p className="text-muted-foreground">Gestisci tutte le richieste inviate dai form</p>
      </div>

      {/* Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Totale Submissions: {totalCount}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca nome o email..."
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                className="pl-10"
              />
            </div>

            <Select
              value={filters.formType}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, formType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo Form" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i tipi</SelectItem>
                <SelectItem value="preventivo">Preventivo</SelectItem>
                <SelectItem value="contatto">Contatto</SelectItem>
                <SelectItem value="configuratore">Configuratore</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.status}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti gli status</SelectItem>
                <SelectItem value="new">Nuovo</SelectItem>
                <SelectItem value="contacted">Contattato</SelectItem>
                <SelectItem value="archived">Archiviato</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))}
              placeholder="Data da"
            />

            <Input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters((prev) => ({ ...prev, dateTo: e.target.value }))}
              placeholder="Data a"
            />
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Submissions ({submissions.length} di {totalCount})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Data</th>
                    <th className="text-left p-3 font-medium">Cliente</th>
                    <th className="text-left p-3 font-medium">Contatti</th>
                    <th className="text-left p-3 font-medium">Tipo Form</th>
                    <th className="text-left p-3 font-medium">Prodotto</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">
                        <div className="text-sm">{new Date(submission.created_at).toLocaleDateString("it-IT")}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(submission.created_at).toLocaleTimeString("it-IT")}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium">{submission.client_name}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">{submission.client_email}</div>
                        <div className="text-xs text-muted-foreground">{submission.client_phone}</div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline">
                          {FORM_TYPE_LABELS[submission.form_type as keyof typeof FORM_TYPE_LABELS] ||
                            submission.form_type}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">{submission.product_type || "-"}</div>
                        {submission.dimensions && (
                          <div className="text-xs text-muted-foreground">{submission.dimensions}</div>
                        )}
                      </td>
                      <td className="p-3">
                        <Badge
                          className={cn("capitalize", STATUS_COLORS[submission.status as keyof typeof STATUS_COLORS])}
                        >
                          {submission.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" title="Visualizza dettagli">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Select
                            value={submission.status}
                            onValueChange={(value) => updateStatus(submission.id, value)}
                          >
                            <SelectTrigger className="w-auto h-8">
                              <Edit className="h-4 w-4" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">Nuovo</SelectItem>
                              <SelectItem value="contacted">Contattato</SelectItem>
                              <SelectItem value="archived">Archiviato</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteSubmission(submission.id)}
                            className="text-red-600 hover:text-red-700"
                            title="Elimina"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {submissions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">Nessuna submission trovata</div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Pagina {currentPage} di {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Precedente
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Successiva
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
