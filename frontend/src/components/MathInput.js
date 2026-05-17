"use client";

import MathDisplay from "@/components/MathDisplay";

/**
 * MathInput — A styled math expression input with examples and clear button.
 * Quick-fill examples render with proper notation (superscripts, etc.)
 */
export default function MathInput({
  value,
  onChange,
  placeholder = "e.g. x² + 3x",
  label = "Expression",
  id = "math-input",
}) {
  const examples = ["x^2", "sin(x)", "e^x", "x^3 + 2*x", "cos(x) + x^2", "ln(x)"];

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
          autoComplete="off"
          spellCheck="false"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
            aria-label="Clear input"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Quick examples — display with proper notation, insert raw notation */}
      <div className="mt-2 flex flex-wrap gap-1.5 items-center">
        <span className="text-xs text-muted">Try:</span>
        {examples.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => onChange(ex)}
            className="px-2 py-0.5 rounded-md bg-section-bg text-xs font-mono text-muted hover:text-accent hover:bg-accent/5 transition-colors duration-150"
          >
            <MathDisplay value={ex} />
          </button>
        ))}
      </div>
    </div>
  );
}
