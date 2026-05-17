import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import HowItWorks from "@/components/HowItWorks";
import ExampleDemo from "@/components/ExampleDemo";

const FEATURES = [
  {
    icon: "📝",
    title: "Step-by-Step Solutions",
    description:
      "See every rule and transformation applied to your equation, making it easy to understand the process.",
  },
  {
    icon: "📊",
    title: "Graph Visualization",
    description:
      "Visualize your functions and their integrals or derivatives on interactive, clean charts.",
  },
  {
    icon: "⚡",
    title: "Instant Calculation",
    description:
      "Powered by a symbolic math engine for fast, accurate results on polynomials, trig, and more.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Features */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Powerful Features</h2>
            <p className="mt-3 text-muted">Everything you need to master calculus concepts.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <ExampleDemo />
    </>
  );
}
