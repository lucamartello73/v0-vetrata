import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { Package, FolderOpen, Mail, BarChart3, TrendingUp } from "@/components/icons"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch dashboard stats
  const [{ count: productsCount }, { count: projectsCount }, { count: leadsCount }, { count: totalInteractions }] =
    await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }),
      supabase.from("user_interactions").select("*", { count: "exact", head: true }),
    ])

  // Fetch recent leads
  const { data: recentLeads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  // Fetch recent interactions
  const { data: recentInteractions } = await supabase
    .from("user_interactions")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(10)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Panoramica generale del sito</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prodotti</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productsCount || 0}</div>
            <p className="text-xs text-muted-foreground">Prodotti attivi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progetti</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsCount || 0}</div>
            <p className="text-xs text-muted-foreground">Realizzazioni</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lead</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadsCount || 0}</div>
            <p className="text-xs text-muted-foreground">Richieste totali</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interazioni</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInteractions || 0}</div>
            <p className="text-xs text-muted-foreground">Interazioni utenti</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Lead Recenti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads?.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">
                      {lead.nome} {lead.cognome}
                    </p>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                    <p className="text-xs text-muted-foreground">Prodotto: {lead.prodotto || "Non specificato"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium capitalize">{lead.status}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString("it-IT")}
                    </p>
                  </div>
                </div>
              ))}
              {(!recentLeads || recentLeads.length === 0) && (
                <p className="text-muted-foreground text-center py-4">Nessun lead recente</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Attività Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentInteractions?.map((interaction) => (
                <div key={interaction.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium capitalize">{interaction.action}</p>
                    <p className="text-muted-foreground">{interaction.page_url}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(interaction.timestamp).toLocaleString("it-IT")}
                  </p>
                </div>
              ))}
              {(!recentInteractions || recentInteractions.length === 0) && (
                <p className="text-muted-foreground text-center py-4">Nessuna attività recente</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
