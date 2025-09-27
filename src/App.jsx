import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { CheckCircle, Home, Car, Users, Building, Palette, Coffee } from 'lucide-react'
import livingImage from './assets/20250926_1947_UnaStanzanelBosco_remix_01k63j3w36em488haxcq46f9fn.png'
import garageImage from './assets/20250926_2117_GarageMotoconPorta_remix_01k63q7e22fdmbjvg2ryhwe9hx.png'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    utilizzo: '',
    modello: '',
    budget: '',
    messaggio: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Per ora solo log dei dati - Supabase sarà configurato dopo
    console.log('Form data:', formData)
    alert('Grazie per il tuo interesse! Ti ricontatteremo presto.')
    
    // Reset form
    setFormData({
      nome: '',
      email: '',
      telefono: '',
      utilizzo: '',
      modello: '',
      budget: '',
      messaggio: ''
    })
  }

  const utilizzi = [
    { id: 'ufficio', title: 'Ufficio nella Natura', icon: Home, desc: 'Smart working con vista panoramica' },
    { id: 'relax', title: 'Spazio Relax', icon: Coffee, desc: 'Yoga, meditazione, lettura' },
    { id: 'arte', title: 'Studio Artistico', icon: Palette, desc: 'Pittura, creatività, ispirazione' },
    { id: 'eventi', title: 'Sala Eventi', icon: Users, desc: 'Cene, feste, celebrazioni' },
    { id: 'garage', title: 'Garage Vetrina', icon: Car, desc: 'Showroom per moto di pregio' },
    { id: 'turismo', title: 'Turismo & Hospitality', icon: Building, desc: 'Camere esclusive, glamping' }
  ]

  const modelli = [
    { id: 'mini', name: 'Natura Cube Mini', size: '2x2m', desc: 'Angolo lettura e relax' },
    { id: 'studio', name: 'Natura Cube Studio', size: '3x3m', desc: 'Ufficio e studio artistico' },
    { id: 'living', name: 'Natura Cube Living', size: '4x4m', desc: 'Eventi e spazi ampi' },
    { id: 'garage', name: 'Natura Cube Garage', size: '2.5x4m', desc: 'Showroom per moto' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-900 to-amber-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <Badge className="mb-6 bg-green-600 hover:bg-green-700">Beta Test - Prodotto Innovativo</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-200 to-amber-200 bg-clip-text text-transparent">
            Natura Cube
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
            Il tuo spazio personale nella natura. Scopri un nuovo modo di vivere i tuoi ambienti con strutture modulari in legno che si adattano alle tue passioni.
          </p>
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg" 
            onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Richiedi Informazioni
          </Button>
        </div>
      </section>

      {/* Utilizzi Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Uno Spazio, Infinite Possibilità</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Natura Cube si adatta alle tue esigenze. Scegli come vivere il tuo spazio personale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {utilizzi.map((utilizzo) => {
              const Icon = utilizzo.icon
              return (
                <Card key={utilizzo.id} className="hover:shadow-lg transition-shadow border-green-100 hover:border-green-300">
                  <CardHeader className="text-center">
                    <Icon className="w-12 h-12 mx-auto mb-4 text-green-600" />
                    <CardTitle className="text-green-900">{utilizzo.title}</CardTitle>
                    <CardDescription>{utilizzo.desc}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Vedi Natura Cube in Azione</h2>
            <p className="text-xl text-gray-600">Immergiti nella natura senza rinunciare al comfort</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src={livingImage} 
                alt="Spazio Living Trasparente" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-green-900">Spazio Living Trasparente</h3>
              <p className="text-lg text-gray-700">
                Lavora, rilassati o crea in uno spazio luminoso e aperto dove la natura diventa parte del tuo ambiente. 
                La parete completamente vetrata offre una vista mozzafiato e un'esperienza senza confini.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Vista panoramica a 180°</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Materiali naturali certificati</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Isolamento termico superiore</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 lg:order-2">
              <h3 className="text-3xl font-bold text-amber-900">Garage Vetrina</h3>
              <p className="text-lg text-gray-700">
                La tua moto non è solo un mezzo di trasporto, è una passione. Esponila come un'opera d'arte, 
                protetta e sempre visibile, con possibilità di illuminazione notturna per un effetto scenografico unico.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-600" />
                  <span>Protezione completa dalle intemperie</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-600" />
                  <span>Sistema di illuminazione integrato</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-600" />
                  <span>Accesso facilitato</span>
                </li>
              </ul>
            </div>
            <div className="lg:order-1">
              <img 
                src={garageImage} 
                alt="Garage Vetrina per Moto" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modelli Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">I Nostri Modelli</h2>
            <p className="text-xl text-gray-600">Quattro soluzioni progettate per ogni esigenza</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modelli.map((modello) => (
              <Card key={modello.id} className="hover:shadow-lg transition-shadow border-green-100 hover:border-green-300">
                <CardHeader>
                  <CardTitle className="text-green-900">{modello.name}</CardTitle>
                  <Badge variant="outline" className="w-fit">{modello.size}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{modello.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" className="py-20 bg-gradient-to-br from-green-50 to-amber-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Richiedi Informazioni</h2>
            <p className="text-xl text-gray-600">
              Siamo in fase di beta test. Compila il form per essere tra i primi a scoprire Natura Cube.
            </p>
          </div>

          <Card className="shadow-2xl border-green-100">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nome">Nome *</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      required
                      className="border-green-200 focus:border-green-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="border-green-200 focus:border-green-400"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="telefono">Telefono</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    className="border-green-200 focus:border-green-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="utilizzo">Utilizzo Previsto *</Label>
                    <Select value={formData.utilizzo} onValueChange={(value) => handleInputChange('utilizzo', value)}>
                      <SelectTrigger className="border-green-200 focus:border-green-400">
                        <SelectValue placeholder="Seleziona utilizzo" />
                      </SelectTrigger>
                      <SelectContent>
                        {utilizzi.map((utilizzo) => (
                          <SelectItem key={utilizzo.id} value={utilizzo.id}>
                            {utilizzo.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="modello">Modello di Interesse</Label>
                    <Select value={formData.modello} onValueChange={(value) => handleInputChange('modello', value)}>
                      <SelectTrigger className="border-green-200 focus:border-green-400">
                        <SelectValue placeholder="Seleziona modello" />
                      </SelectTrigger>
                      <SelectContent>
                        {modelli.map((modello) => (
                          <SelectItem key={modello.id} value={modello.id}>
                            {modello.name} ({modello.size})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="budget">Budget Orientativo</Label>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                    <SelectTrigger className="border-green-200 focus:border-green-400">
                      <SelectValue placeholder="Seleziona range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5k-10k">€5.000 - €10.000</SelectItem>
                      <SelectItem value="10k-20k">€10.000 - €20.000</SelectItem>
                      <SelectItem value="20k-30k">€20.000 - €30.000</SelectItem>
                      <SelectItem value="30k+">€30.000+</SelectItem>
                      <SelectItem value="da-definire">Da definire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="messaggio">Messaggio Aggiuntivo</Label>
                  <Textarea
                    id="messaggio"
                    value={formData.messaggio}
                    onChange={(e) => handleInputChange('messaggio', e.target.value)}
                    placeholder="Raccontaci di più sul tuo progetto..."
                    className="border-green-200 focus:border-green-400"
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg"
                >
                  Richiedi Informazioni
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Natura Cube</h3>
          <p className="text-green-200 mb-6">Il tuo spazio personale nella natura</p>
          <Badge className="bg-green-600">Beta Test - Prodotto in Sviluppo</Badge>
          <p className="text-sm text-green-300 mt-6">
            © 2024 Natura Cube. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
