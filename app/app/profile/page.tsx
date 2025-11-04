"use client";
import { useEffect, useState } from "react";

type Me = { parent: string; email: string; child: string; age: number };

export default function ProfilePage() {
  const [me, setMe] = useState<Me>({ parent: "", email: "", child: "", age: 8 });

  useEffect(() => {
    try { const v = JSON.parse(localStorage.getItem("plaidate_me") || "{}"); if (v) setMe({ ...me, ...v }); } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = () => {
    localStorage.setItem("plaidate_me", JSON.stringify(me));
    // broadcast so Home/RSVP can auto-fill
    localStorage.setItem("plaidate_ping", String(Date.now()));
    alert("Saved");
  };

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-xl font-semibold">Profile</h1>

      {[
        ["Parent name", "parent", "text"],
        ["Email", "email", "email"],
        ["Child name", "child", "text"],
      ].map(([label, key, type]) => (
        <label key={key} className="block text-sm">
          {label}
          <input
            type={type as any}
            className="mt-1 w-full rounded border px-3 py-2"
            value={(me as any)[key as any] || ""}
            onChange={(e) => setMe({ ...me, [key as string]: e.target.value })}
          />
        </label>
      ))}

      <label className="block text-sm">
        Child age
        <input
          type="number"
          className="mt-1 w-full rounded border px-3 py-2"
          value={me.age}
          onChange={(e) => setMe({ ...me, age: Number(e.target.value || 0) })}
        />
      </label>

      <button onClick={save} className="mt-2 w-full rounded-md border px-3 py-2">
        Save
      </button>
    </div>
  );
}
