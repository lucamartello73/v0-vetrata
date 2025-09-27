import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { BarChart3, TrendingUp, Users, Eye, MousePointer } from "lucide-react"

export default async function AdminAnalyticsPage() {
  const supabase = await createClient()

  // Fetch analytics data
  const { data: interactions } = await supabase
    .from("user_interactions")
    .select("*")
    .order("timestamp", { ascending: false })

  // Process analytics data
  const totalInteractions = interactions?.length || 0
  const uniqueUsers = new Set(interactions?.map((i) => i.session_id)).size
  const pageViews = interactions?.filter((i) => i.action === "page_view").length || 0
  const productViews = interactions?.filter((i) => i.action === "product_view").length || 0

  // Most viewed pages
  const pageViewCounts = interactions?.reduce((acc: Record<string, number>, interaction) => {
    if (interaction.action === "page_view") {
      acc[interaction.page_url] = (acc[interaction.page_url] || 0) + 1
    }
    return acc
  }, {})

  const topPages = Object.entries(pageViewCounts || {})
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 10)

  // Most viewed products
  const productViewCounts = interactions?.reduce((acc: Record<string, number>, interaction) => {
    if (interaction.action === "product_view" && interaction.product) {
      acc[interaction.product] = (acc[interaction.product] || 0) + 1
    }
    return acc
  }, {})

  const topProducts = Object.entries(productViewCounts || {})
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Analisi del traffico e comportamento degli utenti</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interazioni Totali</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInteractions}</div>
            <p className="text-xs text-muted-foreground">Tutte le interazioni</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utenti Unici</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueUsers}</div>
            <p className="text-xs text-muted-foreground">Sessioni uniche</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizzazioni Pagina</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pageViews}</div>
            <p className="text-xs text-muted-foreground">Pagine visualizzate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prodotti Visti</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productViews}</div>
            <p className="text-xs text-muted-foreground">Visualizzazioni prodotti</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Pagine Più Visitate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPages.map(([page, count], index) => (
                <div key={page} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium truncate">{page}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{count} visite</span>
                </div>
              ))}
              {topPages.length === 0 && (
                <p className="text-muted-foreground text-center py-4">Nessun dato disponibile</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Prodotti Più Visti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map(([product, count], index) => (
                <div key={product} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium">{product}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{count} visualizzazioni</span>
                </div>
              ))}
              {topProducts.length === 0 && (
                <p className="text-muted-foreground text-center py-4">Nessun dato disponibile</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Attività Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {interactions?.slice(0, 20).map((interaction) => (
              <div
                key={interaction.id}
                className="flex items-center justify-between text-sm border-b border-border pb-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="font-medium capitalize">{interaction.action.replace("_", " ")}</span>
                  <span className="text-muted-foreground">{interaction.page_url}</span>
                  {interaction.product && <span className="text-accent">({interaction.product})</span>}
                </div>
                <span className="text-muted-foreground">{new Date(interaction.timestamp).toLocaleString("it-IT")}</span>
              </div>
            ))}
            {(!interactions || interactions.length === 0) && (
              <p className="text-muted-foreground text-center py-4">Nessuna attività registrata</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
