import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  // Remove complex Supabase auth handling that was causing import issues
  return NextResponse.next({
    request,
  })
}
