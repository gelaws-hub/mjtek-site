import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function checkSession(request: Request) {
    // Access the cookies in the App Router middleware
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
  
    if (!accessToken) {
      return "Unauthorized";
    }
  
    // Call the Express server to validate the session
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/validate-session`, {
      method: 'GET',
      credentials: "include", // To ensure the cookie is sent with the request
    });
  
    if (res.status === 401) {
      return "Unauthorized";
    }
  
    const userData = await res.json();
    const roleName = userData.role_name;
  
    // Define role-based access
    const url = new URL(request.url).pathname;
  
    // Role-based redirect logic
    if (roleName === "buyer" && !["/favorite", "/cart"].includes(url)) {
      return NextResponse.redirect(new URL("/403", request.url)); // Redirect unauthorized buyers
    }
  
    if (roleName === "admin" && !url.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/403", request.url)); // Redirect unauthorized admins
    }
  
    return NextResponse.next();
  }