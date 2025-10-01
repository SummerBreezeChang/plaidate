import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 })
    }

    // TODO: Add your email service integration here
    // For now, we'll just log it
    console.log("[v0] New waitlist signup:", email)

    // You can integrate with:
    // - Resend (using RESEND_API_KEY env var)
    // - Notion (using NOTION_SECRET and NOTION_DB env vars)
    // - Or any other service

    return NextResponse.json({ success: true, message: "Successfully joined the waitlist!" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Waitlist error:", error)
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 })
  }
}
