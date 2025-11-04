"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_PLAIDATES } from "../../lib/mock";

type Item = (typeof MOCK_PLAIDATES)[number];

const countRsvps = (id: string) => {
  try {
    const l = JSON.parse(localStorage.getItem(`plaidate_rsvps_${id}`) || "[]");
    return Array.isArray(l) ? l.length : 0;
  } catch { return 0; }
};

export default function CalendarPage() {
  const sp = useSearchParams();
  const added = sp.get("added");

  const [all, setAll] = useState<Item[]>([]);
  const [tab, setTab] = useState<"hosting"|"joining">("hosting");

  useEffect(() => {
    const load = () => {
      const drafts: Item[] = JSON.parse(localStorage.getItem("plaidate_drafts") || "[]");
      setAll([...MOCK_PLAIDATES, ...drafts]);
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  const hosting = useMemo(() => all.filter(x => x.hosting), [all]);
  const hostingIds = useMemo(() => new Set(hosting.map(x => x.id)), [hosting]);

  const joining = useMemo(
    () => all
      .filter(x => !hostingIds.has(x.id))
      .filter(x => countRsvps(x.id) > 0)
      .sort((a,b) => String(a.when).localeCompare(String(b.when))),
    [all, hostingIds]
  );

  const list = tab === "hosting" ? hosting : joining;

  useEffect(() => {
    if (!added) return;
    const el = document.getElementById(`evt-${added}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [added, tab, list.length]);

  return (
    <div className="p-4 space-y-4">
      {/* segmented control */}
      <div className="grid grid-cols-2 rounded-lg border p-1 text-sm">
        <button
          onClick={() => setTab("hosting")}
          className={`rounded-md py-2 ${tab==="hosting" ? "bg-gray-900 text-white" : ""}`}
        >
          Hosting ({hosting.length})
        </button>
        <button
          onClick={() => setTab("joining")}
          className={`rounded-md py-2 ${tab==="joining" ? "bg-gray-900 text-white" : ""}`}
        >
          Joining ({joining.length})
        </button>
      </div>

      {list.length === 0 ? (
        <div className="text-sm text-gray-500">No plaidates in this view.</div>
      ) : (
        <div className="space-y-2">
          {list.map(x => (
            <Link key={x.id} id={`evt-${x.id}`} href={`/app/p/${x.id}`}
              className={`block rounded-xl border p-4 ${added===x.id ? "ring-2 ring-green-600" : ""}`}>
              <div className="font-medium">{x.title}</div>
              <div className="text-sm text-gray-600">{x.when} — {x.city}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
