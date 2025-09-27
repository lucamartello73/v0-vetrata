import { createClient } from '@supabase/supabase-js'

// Queste variabili dovranno essere configurate con i valori reali di Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Funzione per salvare i contatti del form
export const saveContact = async (contactData) => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([contactData])
      .select()

    if (error) {
      console.error('Errore nel salvare il contatto:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Errore generale:', err)
    return { success: false, error: 'Errore nel salvare i dati' }
  }
}
