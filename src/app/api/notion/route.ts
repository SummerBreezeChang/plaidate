import { NextResponse } from "next/server";

import { notion } from "~/lib/notion";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: `${process.env.NOTION_DB}`,
      },
      properties: {
        "Email Address": {
          type: "email",
          email: body?.email,
        },
        Name: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: body?.name,
              },
            },
          ],
        },
      },
    });

    if (!response) {
      return NextResponse.json(
        { error: "Failed to add email to Notion" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email added to Notion", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add email to Notion", success: false },
      { status: 500 }
    );
  }
}
