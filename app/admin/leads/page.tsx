import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Mail, Phone, Calendar, Package } from "lucide-react"

export default async function AdminLeadsPage() {
  const supabase = await createClient()

  // Fetch all leads
  const { data: leads } = await supabase.from("leads").select("*").order("created_at", { ascending: false })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "nuovo":
        return "bg-blue-100 text-blue-800"
      case "contattato":
        return "bg-yellow-100 text-yellow-800"
      case "in_trattativa":
        return "bg-orange-100 text-orange-800"
      case "chiuso":
        return "bg-green-100 text-green-800"
      case "perso":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestione Lead</h1>
          <p className="text-muted-foreground">Visualizza e gestisci tutte le richieste dei clienti</p>
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid gap-6">
        {leads?.map((lead) => (
          <Card key={lead.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">
                    {lead.nome} {lead.cognome}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(lead.created_at).toLocaleDateString("it-IT")}
                    </div>
                    {lead.prodotto && (
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4" />
                        {lead.prodotto}
                      </div>
                    )}
                  </div>
                </div>
                <Badge className={getStatusColor(lead.status)}>{lead.status.replace("_", " ").toUpperCase()}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${lead.email}`} className="text-accent hover:underline">
                    {lead.email}
                  </a>
                </div>
                {lead.telefono && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${lead.telefono}`} className="text-accent hover:underline">
                      {lead.telefono}
                    </a>
                  </div>
                )}
              </div>

              {/* Message */}
              {lead.messaggio && (
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Messaggio:</h4>
                  <p className="text-sm">{lead.messaggio}</p>
                </div>
              )}

              {/* User Journey */}
              {lead.percorso_utente && (
                <div className="text-xs text-muted-foreground">
                  <strong>Percorso utente:</strong> {JSON.stringify(lead.percorso_utente)}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Contatta
                </Button>
                <Button size="sm" variant="outline">
                  Modifica Status
                </Button>
                <Button size="sm" variant="outline">
                  Note
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {(!leads || leads.length === 0) && (
          <Card>
            <CardContent className="text-center py-12">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nessun lead presente</h3>
              <p className="text-muted-foreground">I lead dei clienti appariranno qui quando verranno inviati.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
