import { NextRequest, NextResponse } from "next/server";

// This is just to set the cookie to my next server
export async function POST(req: NextRequest) {
  try {
    // Forward the login request to your backend API
    const { email, password } = await req.json(); // Assuming you send email and password in the body
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Include credentials with the request
    });

    if (!backendResponse.ok) {
      const error = await backendResponse.json();
      return NextResponse.json(error, { status: backendResponse.status });
    }

    console.log("Login successful: ", backendResponse);

    // Forward the Set-Cookie header from backend to the client
    const accessToken = backendResponse.headers.get("accessToken");

    if (accessToken) {
      // Set the cookies on the response
      return NextResponse.json(await backendResponse.json(), {
        status: 200,
        headers: {
          "accessToken": accessToken,
        },
      });
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
