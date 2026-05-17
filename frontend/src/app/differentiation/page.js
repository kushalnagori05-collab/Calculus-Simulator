"use client";

import { useState } from "react";
import MathInput from "@/components/MathInput";
import MathDisplay from "@/components/MathDisplay";
import StepByStep from "@/components/StepByStep";
import GraphPlot from "@/components/GraphPlot";
import HistoryPanel from "@/components/HistoryPanel";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function DifferentiationPage() {
  const [expression, setExpression] = useState("");
  const [variable, setVariable] = useState("x");
  const [order, setOrder] = useState(1);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSolve(e) {
    e.preventDefault();
    if (!expression.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API}/api/differentiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression, variable, order }),
      });

      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Something went wrong.");
      } else {
        setResult(json.data);
      }
    } catch {
      setError("Could not connect to the server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setExpression("");
    setOrder(1);
    setResult(null);
    setError("");
  }

  async function handleCopy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Differentiation Solver</h1>
        <p className="mt-2 text-muted">
          Compute derivatives of any order with step-by-step explanations and graphs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ─── Left: Input Form ─── */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSolve} className="rounded-2xl border border-border bg-white p-6 shadow-sm space-y-5">
            <MathInput
              id="diff-expression"
              label="Enter your function"
              placeholder="e.g. x^3 + 2*x"
              value={expression}
              onChange={setExpression}
            />

            <div className="flex gap-4">
              {/* Variable selector */}
              <div>
                <label htmlFor="diff-variable" className="block text-sm font-medium mb-1.5">
                  Variable
                </label>
                <select
                  id="diff-variable"
                  value={variable}
                  onChange={(e) => setVariable(e.target.value)}
                  className="px-3 py-2.5 rounded-lg border border-border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
                >
                  {["x", "y", "t", "z", "u"].map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              {/* Order selector */}
              <div>
                <label htmlFor="diff-order" className="block text-sm font-medium mb-1.5">
                  Derivative Order
                </label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setOrder(o)}
                      className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        order === o
                          ? "bg-accent text-white shadow-sm"
                          : "bg-section-bg text-muted hover:bg-gray-100"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading || !expression.trim()}
                className="px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-medium shadow-sm hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? "Solving…" : "Solve"}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-6 py-2.5 rounded-xl bg-section-bg text-muted text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Clear
              </button>
            </div>
          </form>

          {/* Error */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Result</h3>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-section-bg text-muted hover:text-accent transition-colors"
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <p className="font-mono text-xl text-accent font-semibold break-all">
                <MathDisplay value={result.result} />
              </p>
            </div>
          )}

          {/* Steps */}
          {result && <StepByStep steps={result.steps} />}

          {/* Graph */}
          {result && (
            <GraphPlot
              data={result.graphData}
              labels={{ original: "f(x)", result: "f'(x)" }}
            />
          )}
        </div>

        {/* ─── Right: History ─── */}
        <div className="hidden lg:block">
          <HistoryPanel />
        </div>
      </div>
    </div>
  );
}
