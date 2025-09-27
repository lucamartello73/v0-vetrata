import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const SUPPORTED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Upload API called")

    const formData = await request.formData()
    const file = formData.get("file") as File
    const section = formData.get("section") as string
    const key = formData.get("key") as string

    console.log(`[v0] Upload request: file=${file?.name}, section=${section}, key=${key}, type=${file?.type}`)

    if (!file || !section || !key) {
      console.log("[v0] Missing required fields")
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!SUPPORTED_MIME_TYPES.includes(file.type)) {
      console.log(`[v0] Unsupported file type: ${file.type}`)
      return NextResponse.json(
        {
          error: `Unsupported file type: ${file.type}. Please convert AVIF files to JPEG, PNG, or WebP format. Supported types: ${SUPPORTED_MIME_TYPES.join(", ")}`,
        },
        { status: 400 },
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      console.log(`[v0] File too large: ${file.size} bytes (max: ${MAX_FILE_SIZE} bytes)`)
      return NextResponse.json(
        {
          error: `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum allowed size is ${MAX_FILE_SIZE / 1024 / 1024}MB. Please compress your image and try again.`,
        },
        { status: 400 },
      )
    }

    console.log(`[v0] Processing file: ${file.name}, type: ${file.type}, size: ${file.size}`)

    const fileExt = file.name.split(".").pop()
    const fileName = `${section}-${key}-${Date.now()}.${fileExt}`

    let storagePath: string
    if (section === "homepage") {
      storagePath = `homepage/${fileName}`
    } else if (section === "products") {
      storagePath = `products/${fileName}`
    } else {
      // Default to homepage for other sections (hero, about, etc.)
      storagePath = `homepage/${fileName}`
    }

    console.log(`[v0] Uploading to path: ${storagePath}`)

    const uploadOptions = {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    }

    const { error: uploadError } = await supabase.storage.from("images").upload(storagePath, file, uploadOptions)

    if (uploadError) {
      console.error("[v0] Supabase upload error:", uploadError)
      const errorMessage =
        typeof uploadError === "string" ? uploadError : uploadError.message || "Upload failed due to server error"

      return NextResponse.json({ error: `Upload failed: ${errorMessage}` }, { status: 500 })
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(storagePath)

    console.log(`[v0] Upload successful: ${publicUrl}`)
    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error("[v0] API error:", error)
    console.error("[v0] Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })

    let errorMessage = "Internal server error occurred during file upload"
    if (error instanceof Error) {
      if (error.message.includes("Unexpected token")) {
        errorMessage =
          "File upload failed. The file may be too large or in an unsupported format. Please try with a smaller image (under 5MB)."
      } else {
        errorMessage = error.message
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
