"use client";

import { useState, useEffect } from "react";
import MathDisplay from "@/components/MathDisplay";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * HistoryPanel — Shows recent calculations fetched from the backend.
 */
export default function HistoryPanel() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch(`${API}/api/history`);
        const json = await res.json();
        if (json.success) setHistory(json.data || []);
      } catch {
        // silently fail — history is non-critical
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Calculations</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-section-bg rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!history.length) {
    return (
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Recent Calculations</h3>
        <p className="text-sm text-muted">No calculations yet. Try solving an equation!</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Recent Calculations</h3>
      <ul className="space-y-3 max-h-96 overflow-y-auto">
        {history.map((item) => (
          <li
            key={item._id}
            className="p-3 rounded-lg bg-section-bg text-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  item.type === "integration"
                    ? "bg-blue-50 text-accent"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                {item.type === "integration" ? "∫" : "d/dx"}
              </span>
              <span className="font-mono text-xs text-muted truncate"><MathDisplay value={item.expression} /></span>
            </div>
            <p className="font-mono text-xs font-medium truncate">= <MathDisplay value={item.result} /></p>
          </li>
        ))}
      </ul>
    </div>
  );
}
