"use client";

import MathDisplay from "@/components/MathDisplay";

/**
 * StepByStep — Renders an array of solution steps with proper math notation.
 */
export default function StepByStep({ steps = [] }) {
  if (!steps.length) return null;

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Step-by-Step Solution
      </h3>

      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <span className="font-mono leading-relaxed whitespace-pre-wrap break-all text-foreground/90">
              <MathDisplay value={step} />
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
