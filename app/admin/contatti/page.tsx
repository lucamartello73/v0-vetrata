"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { Facebook, Instagram, Mail, Phone, MapPin } from "@/components/icons"

export default function AdminContatti() {
  const [siteSettings, setSiteSettings] = useState({
    site_title: "",
    site_description: "",
    logo_url: "",
    contact_email: "",
    contact_phone: "",
    address: "",
    facebook_url: "",
    instagram_url: "",
    business_hours: "",
    vat_number: "",
    company_name: "",
  })
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    loadSiteSettings()
  }, [])

  const loadSiteSettings = async () => {
    try {
      const { data, error } = await supabase.from("site_settings").select("*").single()

      if (data) {
        setSiteSettings(data)
      }
    } catch (error) {
      console.error("Error loading site settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveSiteSettings = async () => {
    try {
      const { error } = await supabase.from("site_settings").upsert(siteSettings, {
        onConflict: "id",
      })

      if (error) throw error
      alert("Impostazioni salvate con successo!")
    } catch (error) {
      console.error("Error saving settings:", error)
      alert("Errore nel salvataggio")
    }
  }

  const handleLogoUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `logo-${Date.now()}.${fileExt}`

      const { data, error } = await supabase.storage.from("site-assets").upload(fileName, file)

      if (error) throw error

      const {
        data: { publicUrl },
      } = supabase.storage.from("site-assets").getPublicUrl(fileName)

      setSiteSettings({ ...siteSettings, logo_url: publicUrl })
    } catch (error) {
      console.error("Error uploading logo:", error)
      alert("Errore nel caricamento del logo")
    }
  }

  if (loading) {
    return <div className="p-6">Caricamento...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestione Contatti e Impostazioni</h1>
      </div>

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList>
          <TabsTrigger value="company">Dati Aziendali</TabsTrigger>
          <TabsTrigger value="contact">Contatti</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="branding">Logo e Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Aziendali</CardTitle>
              <CardDescription>Gestisci le informazioni principali dell'azienda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="company-name">Nome Azienda</Label>
                <Input
                  id="company-name"
                  value={siteSettings.company_name}
                  onChange={(e) => setSiteSettings({ ...siteSettings, company_name: e.target.value })}
                  placeholder="Martello 1930"
                />
              </div>
              <div>
                <Label htmlFor="site-title">Titolo Sito</Label>
                <Input
                  id="site-title"
                  value={siteSettings.site_title}
                  onChange={(e) => setSiteSettings({ ...siteSettings, site_title: e.target.value })}
                  placeholder="Martello 1930 - Pergole e Coperture"
                />
              </div>
              <div>
                <Label htmlFor="site-description">Descrizione Sito</Label>
                <Textarea
                  id="site-description"
                  value={siteSettings.site_description}
                  onChange={(e) => setSiteSettings({ ...siteSettings, site_description: e.target.value })}
                  placeholder="Descrizione dell'azienda e dei servizi"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="vat-number">Partita IVA</Label>
                <Input
                  id="vat-number"
                  value={siteSettings.vat_number}
                  onChange={(e) => setSiteSettings({ ...siteSettings, vat_number: e.target.value })}
                  placeholder="IT12345678901"
                />
              </div>
              <div>
                <Label htmlFor="business-hours">Orari di Apertura</Label>
                <Textarea
                  id="business-hours"
                  value={siteSettings.business_hours}
                  onChange={(e) => setSiteSettings({ ...siteSettings, business_hours: e.target.value })}
                  placeholder="Lun-Ven: 8:00-18:00, Sab: 8:00-12:00"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni di Contatto</CardTitle>
              <CardDescription>Gestisci email, telefono e indirizzo che appariranno nel sito</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <div className="flex-1">
                  <Label htmlFor="contact-email">Email di Contatto</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={siteSettings.contact_email}
                    onChange={(e) => setSiteSettings({ ...siteSettings, contact_email: e.target.value })}
                    placeholder="info@martello1930.it"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <div className="flex-1">
                  <Label htmlFor="contact-phone">Telefono</Label>
                  <Input
                    id="contact-phone"
                    value={siteSettings.contact_phone}
                    onChange={(e) => setSiteSettings({ ...siteSettings, contact_phone: e.target.value })}
                    placeholder="+39 123 456 7890"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <div className="flex-1">
                  <Label htmlFor="address">Indirizzo</Label>
                  <Textarea
                    id="address"
                    value={siteSettings.address}
                    onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                    placeholder="Via Roma 123, 12345 Città (PR)"
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>
                Gestisci i collegamenti ai social media che appariranno in header e footer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Facebook className="h-4 w-4" />
                <div className="flex-1">
                  <Label htmlFor="facebook-url">URL Facebook</Label>
                  <Input
                    id="facebook-url"
                    value={siteSettings.facebook_url}
                    onChange={(e) => setSiteSettings({ ...siteSettings, facebook_url: e.target.value })}
                    placeholder="https://facebook.com/martello1930"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                <div className="flex-1">
                  <Label htmlFor="instagram-url">URL Instagram</Label>
                  <Input
                    id="instagram-url"
                    value={siteSettings.instagram_url}
                    onChange={(e) => setSiteSettings({ ...siteSettings, instagram_url: e.target.value })}
                    placeholder="https://instagram.com/martello1930"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Logo e Branding</CardTitle>
              <CardDescription>Gestisci il logo aziendale che apparirà in header e footer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="logo-upload">Logo Aziendale</Label>
                <div className="flex items-center gap-4 mt-2">
                  {siteSettings.logo_url && (
                    <img
                      src={siteSettings.logo_url || "/placeholder.svg"}
                      alt="Logo"
                      className="h-16 w-16 object-contain border rounded"
                    />
                  )}
                  <div className="flex-1">
                    <Input id="logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} className="mb-2" />
                    <p className="text-sm text-muted-foreground">Carica un'immagine PNG, JPG o SVG (max 2MB)</p>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="logo-url">URL Logo (alternativo)</Label>
                <Input
                  id="logo-url"
                  value={siteSettings.logo_url}
                  onChange={(e) => setSiteSettings({ ...siteSettings, logo_url: e.target.value })}
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={saveSiteSettings} size="lg">
          Salva Tutte le Impostazioni
        </Button>
      </div>
    </div>
  )
}
