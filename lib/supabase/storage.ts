import { createAdminClient } from "./admin"

export async function uploadImageToSupabase(
  imageUrl: string,
  fileName: string,
  bucket = "images",
): Promise<string | null> {
  try {
    const supabase = createAdminClient()

    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const imageBlob = await response.blob()

    const { data, error } = await supabase.storage.from(bucket).upload(`closures/${fileName}`, imageBlob, {
      contentType: imageBlob.type,
      upsert: true,
    })

    if (error) {
      console.error("Storage upload error:", {
        message: error.message || "Unknown error",
        statusCode: error.statusCode || "Unknown",
        error: error.error || "Unknown",
      })
      return null
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(`closures/${fileName}`)

    return publicUrlData.publicUrl
  } catch (error) {
    console.error("Error uploading image to Supabase:", {
      message: error instanceof Error ? error.message : "Unknown error",
      name: error instanceof Error ? error.name : "Unknown",
    })
    return null
  }
}
