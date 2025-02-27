import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  // If the user is logged in, prevent access to /login and /register
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect logged-in users to home
  }

  // If there's no token and the user is accessing a protected route, redirect to login
  const protectedRoutes = [
    /^\/cart(\/.*)?$/, 
    /^\/favorite(\/.*)?$/, 
    /^\/transactions(\/.*)?$/, 
    /^\/admin(\/.*)?$/
  ];
  
  const isProtected = protectedRoutes.some((route) => route.test(pathname));

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login?callbackUrl=" + encodeURIComponent(pathname), req.url));
  }

  // If there's no token and the route is public, allow access
  if (!token) {
    return NextResponse.next();
  }

  // If the user is logged in, verify their role
  try {
    const payload = jwtDecode(token) as any;
    const role = payload.role_name;

    console.log(`Accessing ${pathname} as ${role}`, payload);

    const roleRoutes = {
      buyer: [/^\/cart(\/.*)?$/, /^\/favorite(\/.*)?$/, /^\/transactions(\/.*)?$/],
      admin: [/^\/admin(\/.*)?$/],
      owner: [/^\/admin(\/.*)?$/], // Allow owners to access admin routes
    };

    const allowedRoutes = roleRoutes[role as "buyer" | "admin" | "owner"];
    const isAuthorized = allowedRoutes?.some((route) => route.test(pathname));

    if (isAuthorized) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/unauthorized", req.url));
  } catch (err) {
    console.error("JWT Verification failed:", err);
    return NextResponse.redirect(new URL("/login?callbackUrl=" + encodeURIComponent(pathname), req.url));
  }
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/favorite/:path*",
    "/transactions/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
