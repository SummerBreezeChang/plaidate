import { LandingPage } from "./page.client";
import { connection } from "next/server";
import { getNotionDatabaseRowCount } from "~/lib/utils";

export const dyamic = "force-dynamic";

export default async function Home() {
  // Use a fallback count if Notion is not configured
  let waitlistPeople = 0;
  
  try {
    if (process.env.NOTION_SECRET && process.env.NOTION_DB) {
      waitlistPeople = await getNotionDatabaseRowCount(process.env.NOTION_DB);
    }
  } catch (error) {
    console.log("Notion not configured, using fallback count");
    waitlistPeople = 42; // Fallback count
  }

  return <LandingPage waitlistPeople={waitlistPeople} />;
}
