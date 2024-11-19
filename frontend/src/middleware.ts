import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";

async function checkLogin(token: string | undefined, requestUrl: string) {
  if (!token) {
    return NextResponse.redirect(new URL("/login", requestUrl));
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    return NextResponse.redirect(new URL("/login", requestUrl));
  }

  return NextResponse.next();
}

export async function middleware(request: NextRequest) {
  const token = Cookies.get("accessToken");
  return checkLogin(token, request.url);
}

export const config = {
  matcher: ["/admin:path*"],
};

