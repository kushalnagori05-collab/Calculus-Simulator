export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="group p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all duration-200">
      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform duration-200">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{description}</p>
    </div>
  );
}
