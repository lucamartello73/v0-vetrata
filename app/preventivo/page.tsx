"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { BackToHomeButton } from "@/components/back-to-home-button"
import { CheckCircle, Phone, Mail, MapPin } from "lucide-react"
import { useState } from "react"

export default function PreventivePage() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    prodotto: "Chiusure Perimetrali",
    messaggio: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      console.log("[v0] Submitting quote request:", formData)

      const response = await fetch("/api/preventivo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Errore durante l'invio della richiesta")
      }

      console.log("[v0] Quote request submitted successfully:", result)
      setIsSubmitted(true)
    } catch (err) {
      console.error("[v0] Quote submission error:", err)
      setError("Si è verificato un errore durante l'invio della richiesta. Riprova più tardi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen">
        <Header />

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <BackToHomeButton />
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-green-800 mb-4">Richiesta Inviata con Successo!</h1>
                <p className="text-green-700 mb-6">
                  Grazie per aver richiesto un preventivo. Il nostro team ti contatterà entro 24 ore per discutere le
                  tue esigenze e fornirti un preventivo personalizzato.
                </p>
                <div className="space-y-2 text-sm text-green-600">
                  <p>📧 Riceverai una conferma via email</p>
                  <p>📞 Ti contatteremo al numero fornito</p>
                  <p>⏱️ Risposta entro 24 ore lavorative</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <BackToHomeButton variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">Richiedi Preventivo Gratuito</h1>
            <p className="text-lg max-w-2xl mx-auto text-balance opacity-90">
              Compila il form per ricevere un preventivo personalizzato per le tue chiusure perimetrali
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Dati di Contatto</CardTitle>
                  <p className="text-muted-foreground">Tutti i campi contrassegnati con * sono obbligatori</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome *</Label>
                        <Input
                          id="nome"
                          name="nome"
                          type="text"
                          required
                          value={formData.nome}
                          onChange={handleInputChange}
                          placeholder="Il tuo nome"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cognome">Cognome *</Label>
                        <Input
                          id="cognome"
                          name="cognome"
                          type="text"
                          required
                          value={formData.cognome}
                          onChange={handleInputChange}
                          placeholder="Il tuo cognome"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="la-tua-email@esempio.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefono">Telefono *</Label>
                      <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        required
                        value={formData.telefono}
                        onChange={handleInputChange}
                        placeholder="+39 123 456 7890"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prodotto">Prodotto di Interesse</Label>
                      <select
                        id="prodotto"
                        name="prodotto"
                        value={formData.prodotto}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <option value="Chiusure Perimetrali">Chiusure Perimetrali</option>
                        <option value="Pergole Bioclimatiche">Pergole Bioclimatiche</option>
                        <option value="Tende da Sole">Tende da Sole</option>
                        <option value="Altro">Altro</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="messaggio">Messaggio</Label>
                      <Textarea
                        id="messaggio"
                        name="messaggio"
                        value={formData.messaggio}
                        onChange={handleInputChange}
                        placeholder="Descrivi le tue esigenze, dimensioni desiderate, tempistiche..."
                        rows={4}
                      />
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                    )}

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Invio in corso..." : "Richiedi Preventivo Gratuito"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      I tuoi dati saranno trattati nel rispetto della privacy e utilizzati solo per fornirti il
                      preventivo richiesto.
                    </p>
                  </form>
                </CardContent>
              </Card>

              {/* Info */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Perché Scegliere Noi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Preventivo Gratuito</h4>
                        <p className="text-sm text-muted-foreground">Sopralluogo e preventivo senza impegno</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Esperienza Decennale</h4>
                        <p className="text-sm text-muted-foreground">Oltre 10 anni nel settore delle pergole</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Garanzia Qualità</h4>
                        <p className="text-sm text-muted-foreground">
                          Materiali certificati e installazione professionale
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Risposta Rapida</h4>
                        <p className="text-sm text-muted-foreground">Ti contatteremo entro 24 ore</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Contatti Diretti</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-semibold">Telefono</p>
                        <p className="text-sm text-muted-foreground">0185-41793</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-sm text-muted-foreground">info@martello1930.net</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Sedi</p>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>
                            <strong>Sede Principale:</strong>
                            <br />
                            Via Traversaro, 13
                            <br />
                            16039 Sestri Levante (GE)
                          </p>
                          <p>
                            <strong>Sede Espositiva:</strong>
                            <br />
                            Via Aurelia
                            <br />
                            Sestri Levante (GE)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-5 w-5 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold">⏰</span>
                      </div>
                      <div>
                        <p className="font-semibold">Orari di Apertura</p>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Lunedì - Venerdì: 8:00 - 12:00 / 14:00 - 18:00</p>
                          <p>Sabato: 8:00 - 12:00</p>
                          <p>Domenica: Chiuso</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
