import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"

const notion = new Client({
  auth: process.env.NOTION_SECRET,
})

export async function POST(request: Request) {
  try {
    const { firstName, email } = await request.json()

    if (!firstName || !email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid name and email address" }, { status: 400 })
    }

    if (!process.env.NOTION_SECRET || !process.env.NOTION_DB) {
      console.error("[v0] Missing Notion environment variables")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    console.log("[v0] Attempting to add to Notion database:", process.env.NOTION_DB)

    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DB as string,
      },
      properties: {
        Name: {
          rich_text: [
            {
              text: {
                content: firstName,
              },
            },
          ],
        },
        "Email Address": {
          email: email,
        },
        Created: {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    })

    console.log("[v0] Successfully added to Notion:", { firstName, email })

    return NextResponse.json({ success: true, message: "Successfully joined the waitlist!" }, { status: 200 })
  } catch (error: any) {
    console.error("[v0] Notion API error:", {
      message: error.message,
      code: error.code,
      status: error.status,
    })

    if (error.code === "object_not_found") {
      return NextResponse.json({ error: "Database not found. Please check your Notion database ID." }, { status: 500 })
    }

    if (error.code === "validation_error") {
      return NextResponse.json(
        {
          error:
            "Database properties don't match. Ensure your Notion database has 'Name' (text), 'Email Address' (email), and 'Created' (date) properties.",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({ error: "Failed to join waitlist. Please try again." }, { status: 500 })
  }
}
