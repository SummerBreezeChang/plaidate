"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Chat({ params }: { params: { id: string } }) {
  const key = `plaidate_chat_${params.id}`;
  const [msgs, setMsgs] = useState<{t:number; who:string; text:string}[]>([]);
  const [text, setText] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMsgs(JSON.parse(localStorage.getItem(key) || "[]"));
  }, [key]);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
  }, [msgs.length]);

  const send = () => {
    if (!text.trim()) return;
    const next = [...msgs, { t: Date.now(), who: "me", text: text.trim() }];
    setMsgs(next);
    localStorage.setItem(key, JSON.stringify(next));
    setText("");
  };

  return (
    <div className="p-4 space-y-3">
      <div className="text-sm"><Link href={`/app/p/${params.id}`} className="underline">Back to event</Link></div>
      <h1 className="text-xl font-semibold">Chat</h1>
      <div ref={boxRef} className="h-[60vh] overflow-y-auto rounded border p-3 space-y-2">
        {msgs.map(m => (
          <div key={m.t} className={`max-w-[80%] rounded px-3 py-2 text-sm ${m.who==="me" ? "ml-auto bg-green-50 border" : "bg-gray-50 border"}`}>
            {m.text}
          </div>
        ))}
        {msgs.length === 0 && <div className="text-sm text-gray-500">No messages yet.</div>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border px-3 py-2"
          value={text}
          onChange={e=>setText(e.target.value)}
          placeholder="Message…"
        />
        <button onClick={send} className="rounded border px-3 py-2">Send</button>
      </div>
    </div>
  );
}
