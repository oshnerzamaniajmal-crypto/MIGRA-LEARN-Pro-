import { ShieldAlert } from "lucide-react";

export function LegalNotice() {
  return (
    <div className="flex gap-3 rounded-2xl border border-amber/25 bg-amber/10 p-4 text-sm text-ink/80 dark:text-white/80">
      <ShieldAlert className="mt-0.5 shrink-0 text-amber" size={19} />
      <p><strong>Lernhinweis:</strong> Diese App dient nur zu Lernzwecken und ersetzt keine Rechtsberatung. Rechtliche Informationen müssen immer anhand aktueller offizieller Quellen geprüft werden.</p>
    </div>
  );
}
