export const metadata = {
  title: "About — Calculus Simulator",
  description: "Learn about the Calculus Simulator and the technologies behind it.",
};

const TECH_STACK = [
  { name: "Next.js", desc: "React framework for the frontend" },
  { name: "Tailwind CSS", desc: "Utility-first CSS framework" },
  { name: "Express.js", desc: "Backend REST API server" },
  { name: "MongoDB", desc: "Database for calculation history" },
  { name: "Nerdamer", desc: "Symbolic math engine" },
  { name: "Recharts", desc: "Graph visualization library" },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">About Calculus Simulator</h1>
      <p className="text-muted leading-relaxed mb-10">
        Calculus Simulator is a free, open-source educational tool designed to help
        students learn and practice integration and differentiation. Enter any
        expression, get step-by-step solutions, and visualize the results on
        interactive graphs — all in a clean, distraction-free interface.
      </p>

      {/* How to use */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
        <ol className="space-y-4 text-sm text-foreground/90 leading-relaxed">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">1</span>
            <span>Navigate to the <strong>Integration</strong> or <strong>Differentiation</strong> page from the top menu.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">2</span>
            <span>Type a mathematical expression using standard notation: <code className="px-1.5 py-0.5 rounded bg-section-bg font-mono text-xs">x^2</code>, <code className="px-1.5 py-0.5 rounded bg-section-bg font-mono text-xs">sin(x)</code>, <code className="px-1.5 py-0.5 rounded bg-section-bg font-mono text-xs">e^x</code>.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">3</span>
            <span>Configure options (variable, limits, derivative order) and click <strong>Solve</strong>.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">4</span>
            <span>Review the step-by-step solution and graph. Use the <strong>Copy</strong> button to save the result.</span>
          </li>
        </ol>
      </section>

      {/* Supported expressions */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Supported Expressions</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            "x^2, x^n (polynomials)",
            "sin(x), cos(x), tan(x)",
            "e^x, exp(x)",
            "ln(x), log(x)",
            "sqrt(x)",
            "a*x + b (linear)",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              <code className="font-mono text-xs">{item}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TECH_STACK.map((tech) => (
            <div key={tech.name} className="p-4 rounded-xl border border-border bg-white shadow-sm">
              <h3 className="font-semibold text-sm">{tech.name}</h3>
              <p className="text-xs text-muted mt-1">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
