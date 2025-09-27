import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Upload API called")

    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "uploads"

    console.log("[v0] File received:", { name: file?.name, size: file?.size, type: file?.type })

    if (!file) {
      console.log("[v0] No file provided")
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      console.log("[v0] File too large:", file.size)
      return NextResponse.json({ error: "File too large. Maximum size is 5MB." }, { status: 400 })
    }

    const supabase = createAdminClient()
    console.log("[v0] Admin client created")

    const fileExt = file.name.split(".").pop()
    const fileName = `${folder}/project-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

    console.log("[v0] Uploading to:", fileName)

    const { data, error: uploadError } = await supabase.storage.from("images").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (uploadError) {
      console.error("[v0] Storage upload error:", {
        message: uploadError.message || "Unknown error",
        statusCode: uploadError.statusCode || "Unknown status",
      })
      return NextResponse.json(
        {
          error: "Upload failed",
          details: uploadError.message || "Storage error occurred",
        },
        { status: 500 },
      )
    }

    console.log("[v0] Upload successful:", data)
    return NextResponse.json({ fileName, data })
  } catch (error) {
    console.error("[v0] Error in upload API:", {
      message: error instanceof Error ? error.message : "Unknown error",
      name: error instanceof Error ? error.name : "Unknown",
    })
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
