import React, { useState } from "react";
import api from "../lib/api";

type ReactionType = "LIKE" | "LOVE" | "HAHA" | "WOW" | "SAD" | "ANGRY";
const REACTIONS: ReactionType[] = ["LIKE", "LOVE", "HAHA", "WOW", "SAD", "ANGRY"];

export default function ReactionBar({
  postId,
  initialCount = 0,
  myReaction = null,
  onChange,
}: {
  postId: number;
  initialCount?: number;
  myReaction?: ReactionType | null;
  onChange?: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [current, setCurrent] = useState<ReactionType | null>(myReaction);
  const [count, setCount] = useState(initialCount);

  async function handleClick(type: ReactionType) {
    if (busy) return;
    setBusy(true);
    try {
      if (current === type) {
        await api.delete(`/posts/${postId}/react`);
        setCurrent(null);
        setCount((c) => Math.max(0, c - 1));
      } else {
        const had = !!current;
        await api.post(`/posts/${postId}/react`, { type });
        setCurrent(type);
        setCount((c) => (had ? c : c + 1));
      }
      onChange?.();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
      <strong>{count}</strong>
      {REACTIONS.map((r) => (
        <button
          key={r}
          onClick={() => handleClick(r)}
          disabled={busy}
          style={{
            padding:"6px 10px",
            borderRadius:8,
            border:"1px solid #ddd",
            background: current === r ? "#eee" : "#fff",
            cursor:"pointer",
          }}
          title={r}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
