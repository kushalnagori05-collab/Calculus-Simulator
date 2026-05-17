import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] opacity-50" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-accent/10 text-accent text-sm font-medium animate-fade-in-up">
          <span>📐</span> Free &amp; Open Source
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight animate-fade-in-up delay-100">
          Learn Calculus{" "}
          <span className="text-accent">Visually</span> and{" "}
          <span className="text-accent">Easily</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          A modern simulator for solving Integration and Differentiation
          problems step-by-step with beautiful graph visualizations.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <Link
            href="/integration"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-accent text-white font-medium text-sm shadow-sm hover:bg-accent-hover hover:shadow-md transition-all duration-200 w-full sm:w-auto"
          >
            Start Integration →
          </Link>
          <Link
            href="/differentiation"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-foreground font-medium text-sm border border-border shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200 w-full sm:w-auto"
          >
            Start Differentiation →
          </Link>
        </div>
      </div>
    </section>
  );
}
