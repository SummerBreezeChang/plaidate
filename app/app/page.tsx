"use client";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { MOCK_PLAIDATES } from "../lib/mock";

type Item = (typeof MOCK_PLAIDATES)[number];
const countRsvps = (id: string) => {
  const key = `plaidate_rsvps_${id}`;
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  return Array.isArray(list) ? list.length : 0;
};

export default function AppHome() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const load = () => {
      const drafts: Item[] = JSON.parse(localStorage.getItem("plaidate_drafts") || "[]");
      setItems([...MOCK_PLAIDATES, ...drafts]);
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  const rows = useMemo(
    () =>
      items.map(x => {
        const spotsLeft = Math.max(0, (x.spots ?? 0) - countRsvps(x.id));
        return { ...x, spotsLeft };
      }),
    [items]
  );

  if (rows.length === 0) {
    return <div className="p-4 text-sm text-gray-500">No plaidates yet. Tap Create.</div>;
  }

  return (
    <div className="p-4 space-y-3 bg-primary-foreground">
      
      {rows.map(x => (
        <Link key={x.id} href={`/app/p/${x.id}`} className="block rounded-xl border p-4 bg-card">
          <div className="font-medium">{x.title}</div>
          <div className="text-sm text-gray-600">{x.when} • {x.city} • Age {x.age}</div>
          <div className="mt-1 text-xs text-gray-500">
            {x.agenda.slice(0,3).map(a=>a.title).join(" · ")} • {x.spotsLeft>0 ? `${x.spotsLeft} spots left` : "Full"}
          </div>
        </Link>
      ))}
    </div>
  );
}
