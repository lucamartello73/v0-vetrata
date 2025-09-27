import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    const projectData = await request.json()
    const supabase = createAdminClient()

    const { error } = await supabase.from("projects").insert([projectData])

    if (error) {
      console.error("Database insert error:", error)
      return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in projects POST API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...projectData } = await request.json()
    const supabase = createAdminClient()

    const { error } = await supabase.from("projects").update(projectData).eq("id", id)

    if (error) {
      console.error("Database update error:", error)
      return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in projects PUT API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const supabase = createAdminClient()

    // First delete related images
    const { error: imagesError } = await supabase.from("site_images").delete().eq("project_id", id)

    if (imagesError) {
      console.error("Error deleting related images:", imagesError)
      return NextResponse.json({ error: "Failed to delete related images" }, { status: 500 })
    }

    // Then delete the project
    const { error: projectError } = await supabase.from("projects").delete().eq("id", id)

    if (projectError) {
      console.error("Error deleting project:", projectError)
      return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in projects DELETE API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
