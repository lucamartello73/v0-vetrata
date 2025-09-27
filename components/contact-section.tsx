"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock } from "@/components/icons"

export function ContactSection() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    prodotto: "",
    messaggio: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        console.log("[v0] Form submitted successfully:", formData)
        setSubmitMessage(
          "Grazie per il tuo interesse! Ti contatteremo presto. Controlla anche la tua email per la conferma.",
        )
        setFormData({
          nome: "",
          cognome: "",
          email: "",
          telefono: "",
          prodotto: "",
          messaggio: "",
        })
      } else {
        throw new Error(result.message || "Errore nell'invio")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitMessage("Si è verificato un errore nell'invio dell'email. Riprova più tardi o contattaci direttamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Contattaci per un Preventivo</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Siamo qui per aiutarti a realizzare il tuo progetto. Contattaci per una consulenza gratuita e un preventivo
            personalizzato.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Richiedi Informazioni</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome *</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => handleInputChange("nome", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cognome">Cognome *</Label>
                    <Input
                      id="cognome"
                      value={formData.cognome}
                      onChange={(e) => handleInputChange("cognome", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefono">Telefono</Label>
                    <Input
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) => handleInputChange("telefono", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="prodotto">Prodotto di Interesse</Label>
                  <Select value={formData.prodotto} onValueChange={(value) => handleInputChange("prodotto", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona un prodotto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pergole-legno">Pergole in Legno</SelectItem>
                      <SelectItem value="pergole-ferro">Pergole in Ferro</SelectItem>
                      <SelectItem value="pergole-bioclimatiche">Pergole Bioclimatiche</SelectItem>
                      <SelectItem value="coperture-auto">Coperture Auto</SelectItem>
                      <SelectItem value="chiusure-perimetrali">Chiusure Perimetrali</SelectItem>
                      <SelectItem value="altro">Altro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="messaggio">Messaggio</Label>
                  <Textarea
                    id="messaggio"
                    rows={4}
                    value={formData.messaggio}
                    onChange={(e) => handleInputChange("messaggio", e.target.value)}
                    placeholder="Descrivi il tuo progetto o le tue esigenze..."
                  />
                </div>

                {submitMessage && (
                  <div
                    className={`p-4 rounded-lg ${submitMessage.includes("errore") ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent"}`}
                  >
                    {submitMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Invio in corso..." : "Invia Richiesta"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Sede Principale</h3>
                    <p className="text-muted-foreground">
                      Via Traversaro, 13
                      <br />
                      16039 Sestri Levante (GE)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Sede Espositiva</h3>
                    <p className="text-muted-foreground">
                      Via Aurelia
                      <br />
                      Sestri Levante (GE)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Telefono</h3>
                    <p className="text-muted-foreground">0185-41793</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground">info@martello1930.net</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Orari di Apertura</h3>
                    <div className="text-muted-foreground space-y-1">
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
    </section>
  )
}
