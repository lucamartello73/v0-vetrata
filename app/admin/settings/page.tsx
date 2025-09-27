"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save, Globe, Mail, Shield, Database } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Martello 1930",
    siteDescription: "Idee qualità e passione dal 1930",
    contactEmail: "info@martello1930.net",
    supportEmail: "info@martello1930.net",
    enableNotifications: true,
    enableAnalytics: true,
    maintenanceMode: false,
    allowRegistrations: true,
  })

  const handleSave = () => {
    // Here you would save to your database
    console.log("[v0] Saving settings:", settings)
    alert("Impostazioni salvate con successo!")
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Impostazioni</h1>
        <p className="text-gray-600">Configura le impostazioni del sistema</p>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <CardTitle>Impostazioni Generali</CardTitle>
            </div>
            <CardDescription>Configura le informazioni di base del sito</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nome del Sito</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email di Contatto</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Descrizione del Sito</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <CardTitle>Impostazioni Email</CardTitle>
            </div>
            <CardDescription>Configura le email del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Email di Supporto</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <CardTitle>Impostazioni Sistema</CardTitle>
            </div>
            <CardDescription>Configura le funzionalità del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifiche</Label>
                <p className="text-sm text-gray-600">Abilita le notifiche del sistema</p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, enableNotifications: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Analytics</Label>
                <p className="text-sm text-gray-600">Abilita il tracciamento analytics</p>
              </div>
              <Switch
                checked={settings.enableAnalytics}
                onCheckedChange={(checked) => setSettings({ ...settings, enableAnalytics: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Registrazioni</Label>
                <p className="text-sm text-gray-600">Permetti nuove registrazioni utenti</p>
              </div>
              <Switch
                checked={settings.allowRegistrations}
                onCheckedChange={(checked) => setSettings({ ...settings, allowRegistrations: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modalità Manutenzione</Label>
                <p className="text-sm text-gray-600">Attiva la modalità manutenzione del sito</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              <CardTitle>Database</CardTitle>
            </div>
            <CardDescription>Informazioni e operazioni sul database</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button variant="outline">Backup Database</Button>
              <Button variant="outline">Ottimizza Database</Button>
              <Button variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                Reset Database
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" />
            Salva Impostazioni
          </Button>
        </div>
      </div>
    </div>
  )
}
