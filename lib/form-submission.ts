import { createAdminClient } from "@/lib/supabase/server"

export async function saveFormSubmission(data: {
  form_type: string
  client_name: string
  client_email: string
  client_phone?: string
  message?: string
  product_type?: string
  dimensions?: string
  additional_data?: any
}) {
  const supabase = createAdminClient()

  const { error } = await supabase.from("form_submissions").insert([data])

  if (error) {
    console.error("Error saving form:", error)
    throw error
  }
}
