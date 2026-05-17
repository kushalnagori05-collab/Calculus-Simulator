/**
 * mathEngine.js — Symbolic math processing powered by Nerdamer.
 * Provides differentiation, integration, step generation, and graph data.
 */
const nerdamer = require('nerdamer');
require('nerdamer/Algebra');
require('nerdamer/Calculus');
require('nerdamer/Solve');

// ─── Helpers ────────────────────────────────────────────────

/** Ordinal string for a number (1st, 2nd, 3rd, 4th …) */
function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/** Try to identify which calculus rule applies to a single term */
function identifyDiffRule(term) {
  const t = term.replace(/\s/g, '');
  if (/^-?\d+(\.\d+)?$/.test(t)) return 'Constant Rule';
  if (/sin\(/i.test(t)) return 'Trigonometric Rule';
  if (/cos\(/i.test(t)) return 'Trigonometric Rule';
  if (/tan\(/i.test(t)) return 'Trigonometric Rule';
  if (/sec\(/i.test(t)) return 'Trigonometric Rule';
  if (/csc\(/i.test(t)) return 'Trigonometric Rule';
  if (/cot\(/i.test(t)) return 'Trigonometric Rule';
  if (/e\^/i.test(t) || /exp\(/i.test(t)) return 'Exponential Rule';
  if (/ln\(/i.test(t) || /log\(/i.test(t)) return 'Logarithmic Rule';
  if (/\^/.test(t)) return 'Power Rule';
  return 'Power Rule';
}

function identifyIntRule(term) {
  const t = term.replace(/\s/g, '');
  if (/^-?\d+(\.\d+)?$/.test(t)) return 'Constant Rule';
  if (/sin\(/i.test(t)) return 'Trigonometric Rule';
  if (/cos\(/i.test(t)) return 'Trigonometric Rule';
  if (/tan\(/i.test(t)) return 'Trigonometric Rule';
  if (/e\^/i.test(t) || /exp\(/i.test(t)) return 'Exponential Rule';
  if (/ln\(/i.test(t) || /log\(/i.test(t)) return 'Logarithmic Rule';
  if (/\^/.test(t)) return 'Power Rule';
  return 'Power Rule';
}

/**
 * Split an expression into additive top-level terms.
 * Respects parentheses nesting so "sin(x+1) + x" splits correctly.
 */
function splitTerms(expr) {
  const terms = [];
  let depth = 0;
  let current = '';
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (ch === '(' || ch === '[') depth++;
    if (ch === ')' || ch === ']') depth--;
    if (depth === 0 && (ch === '+' || ch === '-') && i > 0) {
      if (current.trim()) terms.push(current.trim());
      current = ch === '-' ? '-' : '';
      continue;
    }
    current += ch;
  }
  if (current.trim()) terms.push(current.trim());
  return terms;
}

// ─── Public API ─────────────────────────────────────────────

/**
 * Compute derivative with educational step-by-step breakdown.
 */
function computeDerivative(expression, variable = 'x', order = 1) {
  const steps = [];

  steps.push(`Given: f(${variable}) = ${expression}`);
  steps.push(`Find the ${ordinal(order)} derivative with respect to ${variable}`);

  let currentExpr = expression;

  for (let i = 1; i <= order; i++) {
    if (order > 1) steps.push(`── Computing ${ordinal(i)} derivative ──`);

    // Try term-by-term breakdown
    const terms = splitTerms(currentExpr);
    if (terms.length > 1) {
      steps.push('Apply the Sum / Difference Rule: differentiate each term separately.');
      for (const term of terms) {
        try {
          const termResult = nerdamer(`diff(${term}, ${variable})`).toString();
          const rule = identifyDiffRule(term);
          steps.push(`  d/d${variable}(${term}) = ${termResult}   [${rule}]`);
        } catch {
          // skip individual term step on error
        }
      }
    } else {
      const rule = identifyDiffRule(currentExpr);
      steps.push(`Apply ${rule}`);
    }

    const result = nerdamer(`diff(${currentExpr}, ${variable})`).toString();
    const label = order === 1 ? "f'" : `f${"'".repeat(i)}`;
    steps.push(`${label}(${variable}) = ${result}`);
    currentExpr = result;
  }

  const graphData = generateGraphData(expression, currentExpr, variable);

  return {
    result: currentExpr,
    steps,
    graphData,
  };
}

/**
 * Compute integral (definite or indefinite) with step-by-step.
 */
function computeIntegral(expression, variable = 'x', lower = null, upper = null) {
  const isDefinite = lower !== null && upper !== null;
  const steps = [];

  if (isDefinite) {
    steps.push(`Given: ∫ from ${lower} to ${upper} of (${expression}) d${variable}`);
  } else {
    steps.push(`Given: ∫ (${expression}) d${variable}`);
  }

  // Term-by-term breakdown
  const terms = splitTerms(expression);
  if (terms.length > 1) {
    steps.push('Apply the Sum / Difference Rule: integrate each term separately.');
    for (const term of terms) {
      try {
        const termResult = nerdamer(`integrate(${term}, ${variable})`).toString();
        const rule = identifyIntRule(term);
        steps.push(`  ∫(${term}) d${variable} = ${termResult}   [${rule}]`);
      } catch {
        // skip
      }
    }
  } else {
    const rule = identifyIntRule(expression);
    steps.push(`Apply ${rule}`);
  }

  // Compute symbolic result
  const indefiniteResult = nerdamer(`integrate(${expression}, ${variable})`).toString();

  let numericalResult = null;

  if (isDefinite) {
    steps.push(`Indefinite integral: ${indefiniteResult} + C`);
    steps.push(`Evaluate from ${lower} to ${upper}`);

    try {
      const defResult = nerdamer(`defint(${expression}, ${lower}, ${upper}, ${variable})`).toString();
      numericalResult = defResult;

      // Try to get a decimal approximation
      try {
        const approx = nerdamer(defResult).evaluate().text('decimals');
        if (approx !== defResult) {
          steps.push(`F(${upper}) - F(${lower}) = ${defResult} ≈ ${approx}`);
        } else {
          steps.push(`F(${upper}) - F(${lower}) = ${defResult}`);
        }
      } catch {
        steps.push(`F(${upper}) - F(${lower}) = ${defResult}`);
      }
    } catch {
      steps.push('Could not evaluate the definite integral numerically.');
    }
  } else {
    steps.push(`Result: ∫(${expression}) d${variable} = ${indefiniteResult} + C`);
  }

  const graphData = generateGraphData(expression, indefiniteResult, variable);

  return {
    result: isDefinite ? (numericalResult || indefiniteResult) : indefiniteResult + ' + C',
    steps,
    graphData,
    numericalResult,
  };
}

/**
 * Generate graph data points for the original and result expressions.
 */
function generateGraphData(originalExpr, resultExpr, variable = 'x', range = [-10, 10], numPoints = 200) {
  const step = (range[1] - range[0]) / numPoints;
  const points = [];

  for (let i = 0; i <= numPoints; i++) {
    const xVal = range[0] + i * step;
    const point = { x: parseFloat(xVal.toFixed(4)) };

    // Evaluate original
    try {
      const yOrig = nerdamer(originalExpr, { [variable]: xVal }).evaluate().text('decimals');
      const parsed = parseFloat(yOrig);
      point.original = isFinite(parsed) ? parseFloat(parsed.toFixed(6)) : null;
    } catch {
      point.original = null;
    }

    // Evaluate result
    try {
      const yRes = nerdamer(resultExpr, { [variable]: xVal }).evaluate().text('decimals');
      const parsed = parseFloat(yRes);
      point.result = isFinite(parsed) ? parseFloat(parsed.toFixed(6)) : null;
    } catch {
      point.result = null;
    }

    points.push(point);
  }

  return points;
}

module.exports = { computeDerivative, computeIntegral };
