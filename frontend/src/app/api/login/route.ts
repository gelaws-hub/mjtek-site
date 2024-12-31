import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Ensure cookies are sent and received
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ success: false, message: errorData.message }, { status: response.status });
    }

    const data = await response.json();

    // Include logic here if you want to manipulate cookies
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error logging in:", error.message);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
