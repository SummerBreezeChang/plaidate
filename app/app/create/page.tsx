"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Stop = { title: string; time: string; place: string };
type Draft = {
  id: string;
  title: string;
  when: string;
  city: string;
  age: string;
  capacity: number;
  spots: number;
  agenda: Stop[];
  hosting: boolean;
};

const TEMPLATES: Record<string, Draft> = {
  "Park + Snack": {
    id: "",
    title: "Park + Snack",
    when: "Sat 10:00–11:30",
    city: "Oakland",
    age: "6–10",
    capacity: 6,
    spots: 6,
    agenda: [
      { title: "Playground", time: "10:00", place: "" },
      { title: "Snack", time: "11:00", place: "" },
    ],
    hosting: true,
  },
  "Practice + Brunch": {
    id: "",
    title: "Practice + Brunch",
    when: "Sun 09:00–11:00",
    city: "Berkeley",
    age: "6–10",
    capacity: 6,
    spots: 6,
    agenda: [
      { title: "Practice", time: "09:00", place: "" },
      { title: "Brunch", time: "10:15", place: "" },
    ],
    hosting: true,
  },
  "Library + Playground": {
    id: "",
    title: "Library + Playground",
    when: "Sat 14:00–16:00",
    city: "Alameda",
    age: "6–10",
    capacity: 6,
    spots: 6,
    agenda: [
      { title: "Library", time: "14:00", place: "" },
      { title: "Playground", time: "15:00", place: "" },
    ],
    hosting: true,
  },
};

export default function Create() {
  const router = useRouter();
  const qp = useSearchParams();
  const pre = qp.get("prefill") || ""; // optional from “Use in Plaidate”

  const [step, setStep] = useState<"templates" | "form">("templates");
  const [d, setD] = useState<Draft>(() =>
    pre && TEMPLATES[pre] ? structuredClone(TEMPLATES[pre]) : structuredClone(TEMPLATES["Park + Snack"])
  );

  const pick = (name: string) => {
    setD(structuredClone(TEMPLATES[name]));
    setStep("form");
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    // assign an id and persist as “hosting” draft
    const newEvent: Draft = {
      ...d,
      id: `n-${Date.now()}`,
      hosting: true,
      // keep spots <= capacity
      spots: Math.max(0, Math.min(d.spots ?? d.capacity, d.capacity)),
    };
    const key = "plaidate_drafts";
    const list: Draft[] = JSON.parse(localStorage.getItem(key) || "[]");
    list.push(newEvent);
    localStorage.setItem(key, JSON.stringify(list));
    // notify other tabs and jump to detail
    localStorage.setItem("plaidate_ping", String(Date.now()));
    router.replace(`/app/p/${newEvent.id}`);
  };

  if (step === "templates") {
    return (
      <div className="p-4 pb-24 space-y-3">
        <h1 className="text-xl font-semibold">Create Plaidate</h1>
        {Object.keys(TEMPLATES).map((name) => (
          <button
            key={name}
            onClick={() => pick(name)}
            className="w-full rounded-xl border px-4 py-3 text-left"
          >
            {name}
          </button>
        ))}
      </div>
    );
  }

  // form
  return (
    <div className="p-4 pb-24 space-y-4">
      <h1 className="text-xl font-semibold">New Plaidate</h1>
      <form onSubmit={save} className="space-y-3">
        <label className="block">
          <div className="text-sm mb-1">Title</div>
          <input
            className="w-full rounded-md border px-3 py-2"
            value={d.title}
            onChange={(e) => setD({ ...d, title: e.target.value })}
          />
        </label>
        <label className="block">
          <div className="text-sm mb-1">Date / time</div>
          <input
            className="w-full rounded-md border px-3 py-2"
            value={d.when}
            onChange={(e) => setD({ ...d, when: e.target.value })}
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <div className="text-sm mb-1">City</div>
            <input
              className="w-full rounded-md border px-3 py-2"
              value={d.city}
              onChange={(e) => setD({ ...d, city: e.target.value })}
            />
          </label>
          <label className="block">
            <div className="text-sm mb-1">Age band</div>
            <input
              className="w-full rounded-md border px-3 py-2"
              value={d.age}
              onChange={(e) => setD({ ...d, age: e.target.value })}
              placeholder="6–10"
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <div className="text-sm mb-1">Capacity</div>
            <input
              className="w-full rounded-md border px-3 py-2"
              inputMode="numeric"
              value={d.capacity}
              onChange={(e) =>
                setD({ ...d, capacity: Number(e.target.value || 0) })
              }
            />
          </label>
          <label className="block">
            <div className="text-sm mb-1">Spots</div>
            <input
              className="w-full rounded-md border px-3 py-2"
              inputMode="numeric"
              value={d.spots}
              onChange={(e) =>
                setD({ ...d, spots: Number(e.target.value || 0) })
              }
            />
          </label>
        </div>

        {/* simple agenda editor for up to 3 stops */}
        {d.agenda.map((s, i) => (
          <div key={i} className="grid grid-cols-3 gap-3">
            <input
              className="rounded-md border px-3 py-2"
              value={s.title}
              onChange={(e) => {
                const a = [...d.agenda];
                a[i] = { ...a[i], title: e.target.value };
                setD({ ...d, agenda: a });
              }}
              placeholder="Stop title"
            />
            <input
              className="rounded-md border px-3 py-2"
              value={s.time}
              onChange={(e) => {
                const a = [...d.agenda];
                a[i] = { ...a[i], time: e.target.value };
                setD({ ...d, agenda: a });
              }}
              placeholder="10:00"
            />
            <input
              className="rounded-md border px-3 py-2"
              value={s.place}
              onChange={(e) => {
                const a = [...d.agenda];
                a[i] = { ...a[i], place: e.target.value };
                setD({ ...d, agenda: a });
              }}
              placeholder="Place"
            />
          </div>
        ))}

        <button type="submit" className="mt-2 w-full rounded-md border px-3 py-2 font-medium">
          Create
        </button>
      </form>
    </div>
  );
}
