import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  const roleRoutes = {
    buyer: [/^\/cart(\/.*)?$/, /^\/favorite(\/.*)?$/, /^\/cart(\/.*)?$/, /^\/transactions(\/.*)?$/],
    admin: [/^\/admin(\/.*)?$/],
  };

  console.log("Token:", token);

  if (token) {
    try {
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString("utf8"),
      );

      console.log("Payload:", payload);

      const role = payload.role_name;
      const pathname = req.nextUrl.pathname;
      const allowedRoutes = roleRoutes[role as "buyer" | "admin"];
      const isAuthorized = allowedRoutes?.some((route) => route.test(pathname));

      if (isAuthorized) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/unauthorized", req.url));
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/cart/:path*", "/favorite/:path*", "/admin/:path*"],
};
