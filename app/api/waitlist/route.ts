import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"

const notion = new Client({
  auth: process.env.NOTION_SECRET,
})

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json()

    if (!name || !email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid name and email address" }, { status: 400 })
    }

    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DB as string,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Email: {
          email: email,
        },
        "Joined Date": {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    })

    console.log("[v0] New waitlist signup added to Notion:", { name, email })

    return NextResponse.json({ success: true, message: "Successfully joined the waitlist!" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Waitlist error:", error)
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 })
  }
}
