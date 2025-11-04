"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_PLAIDATES } from "../../../lib/mock";

export default function RsvpPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  // optional: show event title/time in the header
  const pd = useMemo(
    () => MOCK_PLAIDATES.find((x) => x.id === params.id),
    [params.id]
  );

  const [parent, setParent] = useState("");
  const [email, setEmail] = useState("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [allergy, setAllergy] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // basic guard so empty submits do nothing
    if (!parent || !email) return;

    const key = `plaidate_rsvps_${params.id}`;
    const list = JSON.parse(localStorage.getItem(key) || "[]");

    const entry = {
      parent,
      email,
      childName,
      childAge,
      allergy,
      ts: Date.now(),
    };

    // avoid duplicate RSVPs by same email
    if (!list.some((x: any) => x.email === entry.email)) {
      list.push(entry);
      localStorage.setItem(key, JSON.stringify(list));
    }

    // notify other pages and jump to Calendar highlighting this event
    localStorage.setItem("plaidate_ping", String(Date.now()));
    router.replace(`/app/calendar?added=${params.id}`);
  };

  return (
    <div className="p-4 pb-24 space-y-4">
      <h1 className="text-xl font-semibold">
        RSVP{pd ? ` — ${pd.title}` : ""}
      </h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <label className="block">
          <div className="text-sm mb-1">Parent name</div>
          <input
            className="w-full rounded-md border px-3 py-2"
            value={parent}
            onChange={(e) => setParent(e.target.value)}
            placeholder="Your name"
          />
        </label>

        <label className="block">
          <div className="text-sm mb-1">Email</div>
          <input
            type="email"
            className="w-full rounded-md border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <label className="block">
          <div className="text-sm mb-1">Child name</div>
          <input
            className="w-full rounded-md border px-3 py-2"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            placeholder="Child’s name"
          />
        </label>

        <label className="block">
          <div className="text-sm mb-1">Child age</div>
          <input
            className="w-full rounded-md border px-3 py-2"
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
            placeholder="8"
            inputMode="numeric"
          />
        </label>

        <label className="block">
          <div className="text-sm mb-1">Allergy notes</div>
          <textarea
            className="w-full rounded-md border px-3 py-2 min-h-[96px]"
            value={allergy}
            onChange={(e) => setAllergy(e.target.value)}
            placeholder="Peanuts, dairy, etc."
          />
        </label>

        <button
          type="submit"
          className="mt-2 w-full rounded-md border px-3 py-2 font-medium"
        >
          Confirm RSVP
        </button>
      </form>
    </div>
  );
}
