const STEPS = [
  {
    number: "1",
    title: "Enter Your Equation",
    description: "Type any mathematical expression using standard notation like x^2, sin(x), or e^x.",
  },
  {
    number: "2",
    title: "Choose Operation",
    description: "Select integration or differentiation, set variables, limits, or derivative order.",
  },
  {
    number: "3",
    title: "Get Results Instantly",
    description: "View step-by-step solutions with interactive graphs and copy results to clipboard.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-section-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="mt-3 text-muted">Three simple steps to solve any calculus problem.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent text-white flex items-center justify-center text-lg font-bold">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
