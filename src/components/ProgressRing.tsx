export function ProgressRing({ value, size = 104, label }: { value: number; size?: number; label?: string }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg className="-rotate-90" viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-forest/10 dark:text-white/10" />
        <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="text-amber transition-all duration-700" />
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-bold">{Math.round(value)}%</div>
        {label && <div className="text-[10px] font-semibold uppercase tracking-wider opacity-55">{label}</div>}
      </div>
    </div>
  );
}
