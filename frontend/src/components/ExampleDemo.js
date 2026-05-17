"use client";

import Link from "next/link";
import MathDisplay from "@/components/MathDisplay";

export default function ExampleDemo() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">See It In Action</h2>
          <p className="mt-3 text-muted">A quick preview of what CalculusSim can do.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Integration example */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-accent text-xs font-semibold">
                Integration
              </span>
            </div>
            <div className="font-mono text-sm bg-section-bg rounded-lg p-4 mb-4">
              <p className="text-muted text-xs mb-1">Input:</p>
              <p className="font-semibold">∫ <MathDisplay value="x^2" /> dx</p>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-muted text-xs mb-1">Result:</p>
                <p className="font-semibold text-accent">
                  <MathDisplay value="(1/3)*x^3 + C" />
                </p>
              </div>
            </div>
            <Link
              href="/integration"
              className="text-sm text-accent font-medium hover:underline"
            >
              Try it yourself →
            </Link>
          </div>

          {/* Differentiation example */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
                Differentiation
              </span>
            </div>
            <div className="font-mono text-sm bg-section-bg rounded-lg p-4 mb-4">
              <p className="text-muted text-xs mb-1">Input:</p>
              <p className="font-semibold">d/dx (<MathDisplay value="sin(x) + x^3" />)</p>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-muted text-xs mb-1">Result:</p>
                <p className="font-semibold text-emerald-600">
                  <MathDisplay value="cos(x) + 3*x^2" />
                </p>
              </div>
            </div>
            <Link
              href="/differentiation"
              className="text-sm text-emerald-600 font-medium hover:underline"
            >
              Try it yourself →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
