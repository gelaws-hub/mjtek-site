import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  if (token) {
    try {
      const payload = jwtDecode(token) as any;
      const role = payload.role_name;
      console.log(`accessing ${pathname} as ${role}`, payload);

      // Handle admin and owner roles together
      if (role === "admin" || role === "owner") {
        if (pathname.startsWith("/admin")) {
          return NextResponse.next();
        }
        // Redirect admin/owner to the admin area if they're accessing a non-admin route
        return NextResponse.redirect(new URL("/admin", req.url));
      }

      // For buyers, only allow specific routes
      if (role === "buyer") {
        const buyerAllowedRoutes = [
          /^\/cart(\/.*)?$/,
          /^\/favorite(\/.*)?$/,
          /^\/transactions(\/.*)?$/,
        ];
        const isAuthorized = buyerAllowedRoutes.some((route) =>
          route.test(pathname),
        );
        if (isAuthorized) {
          return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      // Default to unauthorized for any other role
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
