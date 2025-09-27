# Natura Cube - Landing Page

Landing page per il beta test di Natura Cube, strutture modulari in legno per spazi personali nella natura.

## Caratteristiche

- **Design Responsivo**: Ottimizzata per desktop, tablet e mobile
- **Form Avanzato**: Raccolta lead con integrazione Supabase
- **UI Moderna**: Utilizzando Tailwind CSS e shadcn/ui
- **Performance**: Costruita con React e Vite

## Setup del Progetto

### 1. Installazione Dipendenze

```bash
pnpm install
```

### 2. Configurazione Supabase

1. Crea un nuovo progetto su [Supabase](https://supabase.com)
2. Copia il file `.env.example` in `.env`:
   ```bash
   cp .env.example .env
   ```
3. Aggiorna le variabili in `.env` con i tuoi dati Supabase:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 3. Setup Database

Esegui lo script SQL `supabase-schema.sql` nel tuo progetto Supabase per creare la tabella `contacts`.

### 4. Sviluppo

```bash
pnpm run dev
```

La landing page sarà disponibile su `http://localhost:5173`

### 5. Build per Produzione

```bash
pnpm run build
```

## Deployment su Vercel

1. Connetti il repository a Vercel
2. Configura le variabili d'ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy automatico ad ogni push

## Struttura del Progetto

- **Hero Section**: Presentazione principale con CTA
- **Utilizzi**: 6 diverse applicazioni del prodotto
- **Gallery**: Immagini dei modelli con descrizioni
- **Modelli**: 4 configurazioni base
- **Form Contatti**: Raccolta lead completa con opzioni
- **Footer**: Informazioni brand

## Funzionalità Form

Il form raccoglie:
- Dati di contatto (nome, email, telefono)
- Utilizzo previsto (6 opzioni)
- Modello di interesse (4 modelli)
- Opzioni desiderate (5 add-on)
- Budget orientativo (5 range)
- Tempistiche progetto (5 opzioni)
- Messaggio libero

Tutti i dati vengono salvati in Supabase per il follow-up commerciale.

## Tecnologie Utilizzate

- **React 18**: Framework frontend
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Styling
- **shadcn/ui**: Componenti UI
- **Lucide React**: Icone
- **Supabase**: Database e backend
- **Framer Motion**: Animazioni (disponibile)

## Beta Test

Questa landing page è progettata per validare il mercato e raccogliere feedback sul prodotto Natura Cube. Include:

- Badge "Beta Test" prominenti
- Messaging focalizzato sulla novità del prodotto
- Form ottimizzato per la qualificazione dei lead
- Design che trasmette innovazione e qualità
