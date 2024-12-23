import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function checkLogin(token: string | undefined, request: NextRequest) {
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userData = await res.json();
  const roleName = userData.role_name;

  // Define role-based access
  const url = request.nextUrl.pathname;
  if (roleName === "buyer" && !["/favorite", "/cart"].includes(url)) {
    return NextResponse.redirect(new URL("/403", request.url)); // Redirect unauthorized buyers
  }

  if (roleName === "admin" && !url.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/403", request.url)); // Redirect unauthorized admins
  }

  return NextResponse.next();
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value; // Correct way to get cookies in middleware
  return checkLogin(token, request);
}

export const config = {
  matcher: ["/favorite", "/cart", "/admin/:path*"], // Define paths to match
};
