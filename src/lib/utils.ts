import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { notion } from "./notion";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getNotionDatabaseRowCount(databaseId: string) {
  try {
    let allResults: any[] = [];
    let hasMore = true;
    let startCursor;

    // Fetch all pages from the database (handling pagination)
    while (hasMore) {
      const response = await notion.databases.query({
        database_id: databaseId,
        start_cursor: startCursor as any,
        page_size: 100,
      });

      allResults = allResults.concat(response.results);
      hasMore = response.has_more;
      startCursor = response.next_cursor;
    }

    return allResults.length;
  } catch (error) {
    console.error("Error fetching database rows:", error);
    throw error;
  }
}
