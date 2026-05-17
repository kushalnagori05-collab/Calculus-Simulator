import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-section-bg border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">∫</span>
              <span className="font-semibold tracking-tight">
                Calculus<span className="text-accent">Sim</span>
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Learn calculus visually with step-by-step solutions and interactive graphs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/integration" className="hover:text-accent transition-colors">Integration</Link></li>
              <li><Link href="/differentiation" className="hover:text-accent transition-colors">Differentiation</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="https://en.wikipedia.org/wiki/Integral" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Learn Integration</a></li>
              <li><a href="https://en.wikipedia.org/wiki/Derivative" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Learn Differentiation</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted">
          © {new Date().getFullYear()} CalculusSim. Built for students, by students.
        </div>
      </div>
    </footer>
  );
}
