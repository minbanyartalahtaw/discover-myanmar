import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if it's an admin path
  const isAdminPath = path.startsWith("/admin");

  // Get the token from cookies
  const token = request.cookies.get("admin-token")?.value;
  // Redirect if accessing admin path without token
  if (isAdminPath && !token) {
    // Fix: Redirect to login page instead of admin page when no token
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (isAdminPath && token) {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }
      // Verify the token and handle invalid tokens
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      console.error("Token verification failed:", error);
      // Clear the invalid token and redirect to auth page
      const response = NextResponse.redirect(new URL("/auth", request.url));
      response.cookies.delete("admin-token");
      return response;
    }
  }
  return NextResponse.next();
}

// Configure which paths middleware will run on
export const config = {
  // Fix: Include all admin paths and login path
  matcher: ["/admin/:path*"],
};
