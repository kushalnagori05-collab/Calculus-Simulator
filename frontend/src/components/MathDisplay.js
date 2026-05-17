"use client";

/**
 * MathDisplay — Renders math expressions with proper paper-like notation.
 * Converts x^2 → x², handles multiplication, sqrt, pi, etc.
 */

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatMath(text) {
  if (!text) return "";
  let html = escapeHtml(String(text));

  // ── Powers ────────────────────────────────────────────────
  // x^(expr)  →  x<sup>expr</sup>
  html = html.replace(/([\w)])\^\(([^)]+)\)/g, "$1<sup>$2</sup>");
  // x^12 (multi-digit)  →  x<sup>12</sup>
  html = html.replace(/([\w)])\^(\d{2,})/g, "$1<sup>$2</sup>");
  // x^2 (single digit)  →  x<sup>2</sup>
  html = html.replace(/([\w)])\^(\d)/g, "$1<sup>$2</sup>");

  // ── Special symbols ──────────────────────────────────────
  html = html.replace(/sqrt\(/g, "√(");
  html = html.replace(/\bpi\b/g, "π");
  html = html.replace(/\bInfinity\b/gi, "∞");

  // ── Multiplication ───────────────────────────────────────
  // 3*x  →  3x  (number × variable = implicit)
  html = html.replace(/(\d)\*([a-zA-Z(])/g, "$1$2");
  // )*x  →  )x
  html = html.replace(/\)\*([a-zA-Z(])/g, ")$1");
  // anything else  →  ·
  html = html.replace(/\*/g, "·");

  return html;
}

export default function MathDisplay({ value, className = "" }) {
  if (!value && value !== 0) return null;

  return (
    <span
      className={`math-display ${className}`}
      dangerouslySetInnerHTML={{ __html: formatMath(value) }}
    />
  );
}
