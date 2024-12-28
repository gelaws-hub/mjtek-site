import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// First layer of security, check the role based on jwt token
// Even if we can bypass this, we still need to communicate with the server for data fetching
export async function checkSession(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // If there's no access token, allow access to non-matcher pages
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Decode the JWT token
    const decoded = jwt.decode(accessToken) as { role_name: string; [key: string]: any };

    if (!decoded || !decoded.role_name) {
      return NextResponse.redirect(new URL("/403", request.url));
    }

    const roleName = decoded.role_name;
    const url = new URL(request.url).pathname;

    // Check if the role is authorized for the requested URL
    if (roleName === "buyer" && !["/favorite", "/cart"].includes(url)) {
      return NextResponse.redirect(new URL("/403", request.url));
    }

    if (roleName === "admin" && !url.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/403", request.url));
    }

    return NextResponse.next();

  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export function middleware(request: NextRequest) {
  return checkSession(request);
}

export const config = {
  matcher: ["/favorite", "/cart", "/admin/:path*"], // These are the protected paths
};
