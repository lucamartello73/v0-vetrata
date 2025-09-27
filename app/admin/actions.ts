"use server"

import { createClient } from "@supabase/supabase-js"

// Server action with admin privileges using service role key
async function createAdminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export async function updateClosureImage(closureId: number, imageUrl: string) {
  try {
    const supabase = await createAdminClient()

    const { data, error } = await supabase
      .from("closures")
      .update({ image_name: imageUrl })
      .eq("id", closureId)
      .select()
      .single()

    if (error) {
      console.error("[v0] Database update error:", error)
      throw new Error(`Database update failed: ${error.message}`)
    }

    console.log("[v0] Closure image updated successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Server action error:", error)
    throw error
  }
}

export async function updatePageContent(section: string, contentKey: string, contentValue: string) {
  try {
    const supabase = await createAdminClient()

    const { data, error } = await supabase
      .from("site_content")
      .upsert(
        {
          section,
          content_key: contentKey,
          content_value: contentValue,
          content_type: "text",
        },
        {
          onConflict: "section,content_key",
        },
      )
      .select()
      .single()

    if (error) {
      console.error("[v0] Page content update error:", error)
      throw new Error(`Page content update failed: ${error.message}`)
    }

    console.log("[v0] Page content updated successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Server action error:", error)
    throw error
  }
}

export async function saveClosureData(closureData: any) {
  try {
    const supabase = await createAdminClient()

    let result
    if (closureData.id) {
      // Update existing closure
      const { data, error } = await supabase
        .from("closures")
        .update(closureData)
        .eq("id", closureData.id)
        .select()
        .single()

      result = { data, error }
    } else {
      // Insert new closure
      const { data, error } = await supabase.from("closures").insert([closureData]).select().single()

      result = { data, error }
    }

    if (result.error) {
      console.error("[v0] Closure save error:", result.error)
      throw new Error(`Closure save failed: ${result.error.message}`)
    }

    console.log("[v0] Closure saved successfully:", result.data)
    return { success: true, data: result.data }
  } catch (error) {
    console.error("[v0] Server action error:", error)
    throw error
  }
}

export async function deleteClosureData(closureId: number) {
  try {
    const supabase = await createAdminClient()

    const { data, error } = await supabase.from("closures").delete().eq("id", closureId).select().single()

    if (error) {
      console.error("[v0] Closure delete error:", error)
      throw new Error(`Closure delete failed: ${error.message}`)
    }

    console.log("[v0] Closure deleted successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Server action error:", error)
    throw error
  }
}
