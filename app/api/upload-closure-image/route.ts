import { type NextRequest, NextResponse } from "next/server"
import { uploadImageToSupabase } from "@/lib/supabase/storage"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    let imageUrl: string
    let fileName: string
    let closureId: string | null = null

    const contentType = request.headers.get("content-type") || ""

    console.log(`[v0] Request content-type: ${contentType}`)

    let isFormData = false
    let formData: FormData | null = null

    try {
      // Try to parse as FormData first
      formData = await request.formData()
      isFormData = true
      console.log(`[v0] Successfully parsed as FormData`)
    } catch (formDataError) {
      // If FormData parsing fails, it's likely JSON
      console.log(`[v0] FormData parsing failed, trying JSON`)
      isFormData = false
    }

    if (isFormData && formData) {
      // Handle file upload via FormData
      const file = formData.get("file") as File
      const type = formData.get("type") as string
      const closureIdForm = formData.get("closureId") as string

      console.log(`[v0] FormData received - file: ${file?.name}, type: ${type}, closureId: ${closureIdForm}`)

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 })
      }

      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        return NextResponse.json(
          {
            error: `File too large. Maximum size is ${maxSize / 1024 / 1024}MB`,
          },
          { status: 400 },
        )
      }

      console.log(`[v0] Processing file upload: ${file.name}, size: ${(file.size / 1024 / 1024).toFixed(2)}MB`)

      const buffer = await file.arrayBuffer()
      const fileExt = file.name.split(".").pop() || "jpg"
      fileName = `closure-${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      closureId = closureIdForm || null

      // Upload directly to Supabase Storage
      const supabase = createAdminClient()
      const { data, error } = await supabase.storage.from("images").upload(`closures/${fileName}`, buffer, {
        contentType: file.type,
        upsert: true,
      })

      if (error) {
        console.error("[v0] Storage upload error:", {
          message: error.message || "Unknown error",
          statusCode: error.statusCode || "Unknown",
        })
        return NextResponse.json({ error: "Failed to upload image to storage" }, { status: 500 })
      }

      const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(`closures/${fileName}`)
      const supabaseUrl = publicUrlData.publicUrl

      // Update closure record if closureId provided
      if (closureId) {
        const { error: updateError } = await supabase
          .from("closures")
          .update({ image_name: supabaseUrl })
          .eq("id", closureId)

        if (updateError) {
          console.error("[v0] Database update error:", updateError)
        }
      }

      console.log(`[v0] File uploaded successfully: ${supabaseUrl}`)

      return NextResponse.json({
        success: true,
        supabaseUrl,
        originalUrl: file.name,
      })
    } else {
      const body = await request.json()
      imageUrl = body.imageUrl
      fileName = body.fileName
      closureId = body.closureId || null

      if (!imageUrl || !fileName) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
      }

      console.log(`[v0] Processing generated image: ${fileName}`)

      const supabaseUrl = await uploadImageToSupabase(imageUrl, fileName)

      if (!supabaseUrl) {
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
      }

      if (closureId) {
        const supabase = createAdminClient()
        const { error } = await supabase.from("closures").update({ image_name: supabaseUrl }).eq("id", closureId)

        if (error) {
          console.error("[v0] Database update error:", error)
        }
      }

      console.log(`[v0] Generated image uploaded successfully: ${supabaseUrl}`)

      return NextResponse.json({
        success: true,
        supabaseUrl,
        originalUrl: imageUrl,
      })
    }
  } catch (error) {
    console.error("[v0] API error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      name: error instanceof Error ? error.name : "Unknown",
    })
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
