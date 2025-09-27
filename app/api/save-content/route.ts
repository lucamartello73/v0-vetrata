import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { section, content_key, content_value, content_type } = await request.json()

    const supabase = await createClient()

    const { error } = await supabase.from("site_content").upsert(
      {
        section,
        content_key,
        content_value,
        content_type,
      },
      {
        onConflict: "section,content_key",
      },
    )

    if (error) {
      console.error("Database save error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
