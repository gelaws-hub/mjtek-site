import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  const roleRoutes = {
    buyer: [
      /^\/cart(\/.*)?$/,
      /^\/favorite(\/.*)?$/,
      /^\/transactions(\/.*)?$/,
    ],
    admin: [/^\/admin(\/.*)?$/],
  };

  const pathname = req.nextUrl.pathname;

  if (token) {
    try {
      const payload = jwtDecode(token) as any;
      const role = payload.role_name;

      console.log(`accessing ${pathname} as ${role}`, payload);

      const allowedRoutes = roleRoutes[role as "buyer" | "admin"];
      const isAuthorized = allowedRoutes?.some((route) => route.test(pathname));

      if (isAuthorized) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/unauthorized", req.url));
    } catch (err) {
      console.error("JWT Verification failed:", err);
      return NextResponse.redirect(
        new URL("/login?callbackUrl=" + encodeURIComponent(pathname), req.url),
      );
    }
  }

  return NextResponse.redirect(
    new URL("/login?callbackUrl=" + encodeURIComponent(pathname), req.url),
  );
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/favorite/:path*",
    "/transactions/:path*",
    "/admin/:path*",
  ],
};
