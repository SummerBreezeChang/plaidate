"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MOCK_PLAIDATES } from "../../../lib/mock";

// count RSVPs saved in localStorage for any event (works for mocks and drafts)
const countRsvps = (id: string) => {
  const key = `plaidate_rsvps_${id}`;
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  return Array.isArray(list) ? list.length : 0;
};

type Item = (typeof MOCK_PLAIDATES)[number];

export default function Detail({ params }: { params: { id: string } }) {
  // 1) try mock data
  const fromMock = useMemo(
    () => MOCK_PLAIDATES.find((x) => x.id === params.id),
    [params.id]
  );
  const [pd, setPd] = useState<Item | undefined>(fromMock);
  const [checkedDrafts, setCheckedDrafts] = useState(false);

  // 2) if not in mocks, try drafts created via /app/create
  useEffect(() => {
    if (!fromMock) {
      const drafts: Item[] = JSON.parse(
        localStorage.getItem("plaidate_drafts") || "[]"
      );
      setPd(drafts.find((x) => x.id === params.id));
    }
    setCheckedDrafts(true);
  }, [fromMock, params.id]);

  if (!pd && !checkedDrafts)
    return <div className="p-4 text-sm text-gray-500">Loading…</div>;
  if (!pd) {
    return (
      <div className="p-4">
        <div className="text-sm text-gray-600">Plaidate not found.</div>
        <p className="mt-2 text-sm">
          Go back to{" "}
          <Link href="/app" className="underline">
            Home
          </Link>
          .
        </p>
      </div>
    );
  }

  // dynamic spots: original spots minus local RSVPs
  const spotsLeft = Math.max(0, (pd.spots ?? 0) - countRsvps(pd.id));
  const full = spotsLeft <= 0;

  const addToCalendar = () => {
    const dtstamp =
      new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const desc =
      "Agenda: " +
      pd.agenda.map((a) => `${a.time} ${a.title} @ ${a.place}`).join(" | ");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Plaidate//EN",
      "BEGIN:VEVENT",
      `UID:${pd.id}@plaidate`,
      `DTSTAMP:${dtstamp}`,
      `SUMMARY:${pd.title}`,
      `LOCATION:${pd.city}`,
      `DESCRIPTION:${desc}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `plaidate-${pd.id}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">{pd.title}</h1>

      <div className="rounded-xl border p-4 space-y-2">
        <div className="text-sm text-gray-600">
          {pd.when} • {pd.city}
        </div>

        <div className="flex gap-2 text-sm">
          <span className="rounded-full border px-2 py-0.5">Age {pd.age}</span>
          <span
            className={`rounded-full border px-2 py-0.5 ${
              full
                ? "text-red-700 border-red-300"
                : "text-green-700 border-green-300"
            }`}
          >
            {full ? "Full" : `${spotsLeft} spots left`}
          </span>
        </div>

        <div className="mt-2">
          <div className="text-sm font-medium">Agenda</div>
          <ul className="mt-1 space-y-1">
            {pd.agenda.slice(0, 3).map((a, i) => (
              <li key={i} className="text-sm text-gray-700">
                <span className="font-medium">{a.time}</span> — {a.title} @{" "}
                {a.place}{" "}
                <a
                  className="underline text-gray-600"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/search/?q=${encodeURIComponent(
                    a.place + " " + pd.city
                  )}`}
                >
                  Open in Maps
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
<Link
  href={`/app/rsvp/${pd.id}`}
  prefetch={false}
  className="rounded-md border px-2 py-2 text-center text-sm"
>
  RSVP
</Link>

          <button
            onClick={addToCalendar}
            className="rounded-md border px-2 py-2 text-center text-sm"
          >
            Add to Calendar
          </button>
          <Link
            href={`/app/chat/${pd.id}`}
            className="rounded-md border px-2 py-2 text-center text-sm"
          >
            Open Chat
          </Link>
        </div>
      </div>
    </div>
  );
}
