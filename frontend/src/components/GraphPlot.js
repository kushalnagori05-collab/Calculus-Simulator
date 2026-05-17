"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

/**
 * GraphPlot — Renders a Recharts line chart for the original and result curves.
 *
 * Props:
 *   data       – array of { x, original, result }
 *   labels     – { original: string, result: string }
 */
export default function GraphPlot({
  data = [],
  labels = { original: "f(x)", result: "Result" },
}) {
  if (!data.length) return null;

  // Filter out points with null values for cleaner rendering
  const clean = data.filter(
    (p) => p.original !== null || p.result !== null
  );

  if (!clean.length) return null;

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
        Graph Visualization
      </h3>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={clean} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="x"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(v) => (Number.isInteger(v) ? v : v.toFixed(1))}
            />
            <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            />
            <Legend wrapperStyle={{ fontSize: 13 }} />
            <Line
              type="monotone"
              dataKey="original"
              name={labels.original}
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="result"
              name={labels.result}
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
