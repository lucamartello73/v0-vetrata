import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Simple admin protection using session cookie
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login") &&
    !request.nextUrl.pathname.startsWith("/api/admin")
  ) {
    const adminSession = request.cookies.get("admin-session")

    if (!adminSession || adminSession.value !== "authenticated") {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
