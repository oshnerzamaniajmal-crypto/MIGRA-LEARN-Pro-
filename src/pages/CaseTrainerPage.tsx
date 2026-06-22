import {
  AlertTriangle, ArrowLeft, CheckCircle2, ChevronRight, ClipboardCheck, File,
  FileClock, FolderOpen, Info, Mail, Search, ShieldCheck, Stamp, UserRound, XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cases } from "../data/cases";
import type { ProgressState } from "../types";

type Answers = { status: string; authority: string; benefit: string; work: string; missing: string; nextStep: string; note: string; email: string };
type Breakdown = Record<"status" | "authority" | "documents" | "nextStep" | "communication", number>;
const blank: Answers = { status: "", authority: "", benefit: "", work: "", missing: "", nextStep: "", note: "", email: "" };

const normalizedWords = (value: string) => value.toLowerCase().split(/[\s,.;:()/-]+/).filter((word) => word.length > 5);
const containsRelevant = (answer: string, references: string[]) => {
  const words = references.flatMap(normalizedWords);
  return words.filter((word) => answer.toLowerCase().includes(word)).length >= Math.min(2, words.length);
};

export function CaseTrainerPage({
  state,
  saveCaseScore,
}: {
  state: ProgressState;
  saveCaseScore: (id: string, score: number, breakdown: Breakdown) => void;
}) {
  const [category, setCategory] = useState("Alle");
  const [difficulty, setDifficulty] = useState("Alle");
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answers>(blank);
  const [score, setScore] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<Breakdown | null>(null);
  const [mobileStep, setMobileStep] = useState(0);
  const filtered = useMemo(() => cases.filter((item) =>
    (category === "Alle" || item.category === category) &&
    (difficulty === "Alle" || item.difficulty === difficulty) &&
    `${item.person.name} ${item.person.issue} ${item.person.status}`.toLowerCase().includes(search.toLowerCase())
  ), [category, difficulty, search]);
  const active = cases.find((item) => item.id === activeId);

  const open = (id: string) => { setActiveId(id); setAnswers(blank); setScore(null); setBreakdown(null); setMobileStep(0); window.scrollTo({ top: 0 }); };
  const submit = () => {
    if (!active) return;
    const values: Breakdown = {
      status: answers.status === active.solution.status ? 20 : 0,
      authority: answers.authority === active.solution.authority ? 20 : 0,
      documents: containsRelevant(answers.missing, active.solution.missing) ? 20 : answers.missing.trim().length >= 65 ? 10 : 0,
      nextStep: containsRelevant(answers.nextStep, [active.solution.nextStep]) ? 20 : answers.nextStep.trim().length >= 45 ? 10 : 0,
      communication: answers.note.trim().length >= 90 && answers.email.trim().length >= 100 ? 20 : answers.note.trim().length + answers.email.trim().length >= 120 ? 10 : 0,
    };
    const total = Object.values(values).reduce((sum, value) => sum + value, 0);
    setBreakdown(values);
    setScore(total);
    setMobileStep(4);
    saveCaseScore(active.id, total, values);
  };

  if (!active) {
    const solved = Object.keys(state.caseScores).length;
    const average = solved ? Math.round(Object.values(state.caseScores).reduce((a, b) => a + b, 0) / solved) : 0;
    return (
      <div className="space-y-6 sm:space-y-8">
        <div><p className="eyebrow">Praxislabor</p><h1 className="font-display text-4xl sm:text-5xl">Professioneller Falltrainer</h1><p className="mt-3 max-w-3xl text-ink/55 dark:text-white/48">Bearbeiten Sie anonymisierte Übungsakten wie in der Verwaltung: erst Aktenlage sichern, dann prüfen, erst danach formulieren.</p></div>
        <section className="premium-hero relative overflow-hidden rounded-[1.75rem] p-6 text-white sm:rounded-[2.25rem] sm:p-8">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><span className="chip border border-white/10 bg-white/10 text-[#f2d8a6]"><ShieldCheck size={14} /> Einheitliches Prüfraster</span><h2 className="mt-4 max-w-4xl font-display text-3xl sm:text-4xl">Status → Anspruch → Zuständigkeit → Unterlagen → Entscheidung → nächster Schritt</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/58">Dieses Raster reduziert vorschnelle Aussagen und macht Ihre Bearbeitung nachvollziehbar.</p></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[.07] p-4 text-center"><div className="text-3xl font-bold text-amber">{solved}<span className="text-base text-white/40">/{cases.length}</span></div><p className="mt-1 text-xs text-white/50">bearbeitet</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/[.07] p-4 text-center"><div className="text-3xl font-bold text-amber">{average}</div><p className="mt-1 text-xs text-white/50">Ø Punkte</p></div>
            </div>
          </div>
        </section>
        <div className="grid gap-3 md:grid-cols-[1fr_220px_180px]">
          <label className="relative"><Search className="absolute left-4 top-3.5 text-ink/30 dark:text-white/30" size={18} /><input className="field pl-11" aria-label="Fälle durchsuchen" placeholder="Name, Status oder Problem suchen …" value={search} onChange={(e) => setSearch(e.target.value)} /></label>
          <select aria-label="Kategorie filtern" className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Alle</option><option>Ausländerbehörde</option><option value="Jobcenter">Jobcenter / SGB II</option><option value="Integration">Integration und Sprachförderung</option><option>Migrationsberatung</option><option value="Abschluss">Gemischte Prüfungsfälle</option>
          </select>
          <select aria-label="Schwierigkeit filtern" className="field" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}><option>Alle</option>{["leicht", "mittel", "schwer"].map((c) => <option key={c}>{c}</option>)}</select>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => {
            const result = state.caseScores[item.id];
            const attempts = state.caseAttempts.filter((attempt) => attempt.caseId === item.id).length;
            return <button key={item.id} onClick={() => open(item.id)} className="card-premium group overflow-hidden text-left transition hover:-translate-y-1 hover:border-amber/30">
              <div className="border-b border-black/[.045] bg-[#f8f5ed] px-5 py-3 dark:border-white/[.07] dark:bg-white/[.025]">
                <div className="flex items-center justify-between gap-3"><span className="font-mono text-[11px] font-bold uppercase tracking-widest text-sage">AZ: MVL-{String(item.number).padStart(3, "0")}/26</span><span className={`chip ${item.difficulty === "schwer" ? "bg-coral/10 text-coral" : item.difficulty === "mittel" ? "bg-amber/12 text-amber" : "bg-sage/12 text-sage"}`}>{item.difficulty}</span></div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest text-white dark:bg-amber dark:text-[#132b29]"><FolderOpen size={20} /></span><div><p className="text-xs text-ink/40 dark:text-white/38">Übungsakte {String(item.number).padStart(2, "0")}</p><h2 className="font-bold">{item.person.name}</h2></div></div>
                  {result !== undefined && <span className={`chip ${result >= 80 ? "bg-sage/12 text-sage" : result >= 50 ? "bg-amber/12 text-amber" : "bg-coral/12 text-coral"}`}>{result}/100</span>}
                </div>
                <p className="mt-5 min-h-14 text-lg font-semibold leading-7">{item.person.issue}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-ink/48 dark:text-white/42"><span>{item.person.status}</span><span className="text-right">{item.category}</span></div>
                <div className="mt-5 flex items-center justify-between border-t border-black/[.045] pt-4 text-xs dark:border-white/[.07]"><span>{attempts ? `${attempts} Versuch${attempts > 1 ? "e" : ""}` : result !== undefined ? "Bestwert aus früherem Lernstand" : "Noch nicht bearbeitet"}</span><span className="flex items-center gap-1 font-bold text-coral">Akte öffnen <ChevronRight className="transition group-hover:translate-x-1" size={15} /></span></div>
              </div>
            </button>;
          })}
        </div>
      </div>
    );
  }

  const feedback = score === null ? "" : score >= 85 ? "Sehr sichere Bearbeitung" : score >= 65 ? "Solide mit Verbesserungsbedarf" : score >= 40 ? "Ansatz erkennbar" : "Prüfraster erneut anwenden";
  const criteria = breakdown ? [
    ["Status erkannt", breakdown.status, "Das Aufenthaltsdokument bildet den Ausgangspunkt."],
    ["Zuständigkeit", breakdown.authority, "Leistung, Aufenthalt und Beratung können bei verschiedenen Stellen liegen."],
    ["Unterlagen", breakdown.documents, "Benennen Sie konkrete Nachweise statt nur „weitere Dokumente“."],
    ["Nächster Schritt", breakdown.nextStep, "Die Handlung muss zuständig, realistisch und zeitlich logisch sein."],
    ["Kommunikation", breakdown.communication, "Notiz und E-Mail sollen sachlich, knapp und handlungsorientiert sein."],
  ] as const : [];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button onClick={() => setActiveId(null)} className="btn-secondary"><ArrowLeft size={18} /> Fallübersicht</button>
        <div className="flex items-center gap-2 text-xs text-ink/45 dark:text-white/40"><FileClock size={15} /> Bearbeitungszeit empfohlen: 12–18 Minuten</div>
      </div>

      <section className="overflow-hidden rounded-[1.4rem] border border-black/[.07] bg-white shadow-soft dark:border-white/[.08] dark:bg-[#10211f] lg:hidden">
        <header className="border-b border-black/[.06] p-5 dark:border-white/[.07]">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-sage">MVL-{String(active.number).padStart(3, "0")}/2026</p>
          <h1 className="mt-1 font-display text-3xl">{active.person.name}</h1>
          <p className="mt-1 text-sm opacity-50">{active.person.issue}</p>
          <div className="mt-5 flex items-center gap-2">
            {[0, 1, 2, 3, 4].map((step) => <span key={step} className={`h-1.5 flex-1 rounded-full ${step <= mobileStep ? "bg-amber" : "bg-black/[.07] dark:bg-white/[.09]"}`} />)}
          </div>
          <p className="mt-2 text-xs font-semibold text-sage">Schritt {mobileStep + 1} von 5 · {["Akte lesen", "Einordnen", "Prüfen", "Formulieren", "Feedback"][mobileStep]}</p>
        </header>

        <div className="p-5">
          {mobileStep === 0 && <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3 rounded-2xl bg-sand/35 p-4 text-sm dark:bg-white/[.04]">
              {[["Alter", `${active.person.age} Jahre`], ["Herkunft", active.person.country], ["Status", active.person.status], ["Behörde", active.person.authority]].map(([label, value]) => <div key={label}><p className="text-[10px] font-bold uppercase tracking-wider text-sage">{label}</p><p className="mt-1 font-semibold">{value}</p></div>)}
            </div>
            <div><h2 className="font-bold">Sachverhalt</h2><p className="mt-2 text-base leading-7 opacity-65">{active.facts}</p></div>
            <div><h2 className="font-bold">Dokumente</h2><div className="mt-2 space-y-2">{active.documents.map((doc) => <div key={doc} className="flex min-h-12 items-center gap-3 rounded-xl border border-black/[.05] px-3 text-sm dark:border-white/[.07]"><File size={16} className="text-sage" />{doc}</div>)}</div></div>
            <div className="flex flex-wrap gap-2">{active.terms.map((term) => <span className="chip bg-sage/[.09] text-sage" key={term}>{term}</span>)}</div>
          </div>}

          {mobileStep === 1 && <div>
            <p className="eyebrow">Hauptfrage</p><h2 className="mt-2 font-display text-3xl leading-tight">{active.question}</h2>
            <div className="mt-6 space-y-4">
              {(["status", "authority", "benefit", "work"] as const).map((key) => <label key={key} className="block text-sm font-bold">{({ status: "Aufenthaltsstatus", authority: "Zuständige Stelle", benefit: "Mögliche Leistung", work: "Erwerbstätigkeit" } as const)[key]}<select className="field mt-2" value={answers[key]} onChange={(e) => setAnswers({ ...answers, [key]: e.target.value })}><option value="">Bitte auswählen …</option>{active.options[key].map((option) => <option key={option}>{option}</option>)}</select></label>)}
            </div>
          </div>}

          {mobileStep === 2 && <div className="space-y-5">
            <div><p className="eyebrow">Prüfschritt</p><h2 className="mt-2 font-display text-3xl">Was fehlt — und was passiert als Nächstes?</h2></div>
            <label className="block text-sm font-bold">Fehlende Unterlagen<textarea className="field mt-2 min-h-36" value={answers.missing} onChange={(e) => setAnswers({ ...answers, missing: e.target.value })} placeholder="Konkrete Dokumente oder Nachweise …" /></label>
            <label className="block text-sm font-bold">Nächster Schritt<textarea className="field mt-2 min-h-36" value={answers.nextStep} onChange={(e) => setAnswers({ ...answers, nextStep: e.target.value })} placeholder="Wer veranlasst was — in welcher Reihenfolge?" /></label>
          </div>}

          {mobileStep === 3 && <div className="space-y-5">
            <div><p className="eyebrow">Kommunikation</p><h2 className="mt-2 font-display text-3xl">Dokumentieren und formulieren</h2></div>
            <label className="block text-sm font-bold">Aktennotiz<textarea className="field mt-2 min-h-40" value={answers.note} onChange={(e) => setAnswers({ ...answers, note: e.target.value })} placeholder="Anliegen · Fakten · offene Punkte · Vereinbarung" /></label>
            <label className="block text-sm font-bold">Behörden-E-Mail<textarea className="field mt-2 min-h-44" value={answers.email} onChange={(e) => setAnswers({ ...answers, email: e.target.value })} placeholder="Betreff · Bezug · konkrete Bitte · Abschluss" /></label>
          </div>}

          {mobileStep === 4 && score !== null && <div className="space-y-5">
            <div className={`rounded-2xl p-5 ${score >= 80 ? "bg-sage/[.1]" : score >= 50 ? "bg-amber/[.1]" : "bg-coral/[.09]"}`}>
              <p className="eyebrow">Ergebnis</p><div className="mt-2 flex items-end justify-between gap-4"><h2 className="font-display text-3xl">{feedback}</h2><strong className="text-4xl">{score}<span className="text-base opacity-40">/100</span></strong></div>
            </div>
            <div className="space-y-3">{criteria.map(([label, points, hint]) => <div className="rounded-2xl border border-black/[.06] p-4 dark:border-white/[.08]" key={label}><div className="flex justify-between font-bold"><span>{label}</span><span className={points === 20 ? "text-sage" : points === 10 ? "text-amber" : "text-coral"}>{points}/20</span></div><p className="mt-2 text-sm leading-6 opacity-50">{hint}</p></div>)}</div>
            <details className="rounded-2xl bg-sand/35 p-4 dark:bg-white/[.04]"><summary className="cursor-pointer font-bold">Musterlösung anzeigen</summary><p className="mt-4 text-sm leading-6">{active.solution.reasoning}</p><p className="mt-3 text-sm"><strong>Nächster Schritt:</strong> {active.solution.nextStep}</p></details>
          </div>}
        </div>

        <footer className="sticky bottom-[72px] grid grid-cols-2 gap-3 border-t border-black/[.06] bg-white/95 p-4 backdrop-blur dark:border-white/[.07] dark:bg-[#10211f]/95">
          <button disabled={mobileStep === 0} onClick={() => setMobileStep(Math.max(0, mobileStep - 1))} className="btn-secondary">Zurück</button>
          {mobileStep < 3 && <button disabled={(mobileStep === 1 && (!answers.status || !answers.authority)) || (mobileStep === 2 && answers.nextStep.length < 20)} onClick={() => setMobileStep(mobileStep + 1)} className="btn-primary">Weiter <ChevronRight size={18} /></button>}
          {mobileStep === 3 && <button disabled={answers.note.length < 40 || answers.email.length < 40} onClick={submit} className="btn-primary">Auswerten</button>}
          {mobileStep === 4 && <button onClick={() => setActiveId(null)} className="btn-primary">Nächster Fall</button>}
        </footer>
      </section>

      <section className="hidden overflow-hidden rounded-[1.75rem] border border-black/[.07] bg-[#f9f7f1] shadow-[0_25px_70px_rgba(23,63,58,.11)] dark:border-white/[.09] dark:bg-[#0d1d1b] sm:rounded-[2rem] lg:block">
        <header className="border-b-2 border-forest/15 bg-white px-5 py-5 dark:border-white/[.09] dark:bg-[#10211f] sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest text-white dark:bg-amber dark:text-[#132b29]"><Stamp size={25} /></span><div><p className="font-mono text-[11px] font-bold uppercase tracking-[.18em] text-sage">Aktenzeichen MVL-{String(active.number).padStart(3, "0")}/2026</p><h1 className="mt-1 font-display text-3xl">{active.person.name}</h1><p className="text-sm text-ink/48 dark:text-white/42">{active.person.issue}</p></div></div>
            <div className="flex gap-2"><span className="chip bg-sand text-forest dark:bg-white/[.07] dark:text-white">{active.category}</span><span className={`chip ${active.difficulty === "schwer" ? "bg-coral/12 text-coral" : "bg-amber/12 text-amber"}`}>{active.difficulty}</span></div>
          </div>
        </header>
        <div className="grid xl:grid-cols-[.82fr_1.18fr]">
          <aside className="border-b border-black/[.06] p-5 dark:border-white/[.07] sm:p-7 xl:border-b-0 xl:border-r">
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 rounded-2xl border border-black/[.055] bg-white p-5 text-sm dark:border-white/[.075] dark:bg-[#10211f]">
              {[["Alter", `${active.person.age} Jahre`], ["Herkunft", active.person.country], ["Familie", active.person.family], ["Sprache", active.person.language], ["Status lt. Akte", active.person.status], ["Eingangsstelle", active.person.authority]].map(([label, value]) => <div key={label}><p className="text-[10px] font-bold uppercase tracking-wider text-sage">{label}</p><p className="mt-1 font-semibold leading-5">{value}</p></div>)}
            </div>
            <div className="mt-6">
              <h2 className="flex items-center gap-2 font-bold"><File size={18} /> I. Sachverhalt</h2>
              <p className="mt-3 text-sm leading-7 text-ink/65 dark:text-white/58">{active.facts}</p>
            </div>
            <div className="mt-6">
              <h2 className="flex items-center gap-2 font-bold"><FolderOpen size={18} /> II. Aktenbestand</h2>
              <div className="mt-3 space-y-2">{active.documents.map((doc, index) => <div className="flex items-center gap-3 rounded-xl border border-black/[.045] bg-white px-3 py-2.5 text-sm dark:border-white/[.07] dark:bg-[#10211f]" key={doc}><span className="font-mono text-[10px] text-sage">A{index + 1}</span><CheckCircle2 size={14} className="text-sage" />{doc}</div>)}</div>
            </div>
            <div className="mt-6">
              <h2 className="flex items-center gap-2 font-bold"><Info size={18} /> Passende Fachbegriffe</h2>
              <div className="mt-3 flex flex-wrap gap-2">{active.terms.map((term) => <span className="chip border border-sage/15 bg-sage/[.08] text-sage" key={term}>{term}</span>)}</div>
            </div>
            <div className="mt-6 flex gap-3 rounded-2xl border border-amber/18 bg-amber/[.07] p-4">
              <Info className="mt-0.5 shrink-0 text-amber" size={18} /><p className="text-xs leading-5"><strong>Anfänger-Hinweis:</strong> Verlassen Sie sich nicht auf die Kurzbezeichnung im Aktenkopf. In der Praxis zählen Dokument, Gültigkeit und Nebenbestimmung.</p>
            </div>
          </aside>

          <main className="bg-white p-5 dark:bg-[#10211f] sm:p-8">
            <p className="eyebrow">III. Prüfauftrag</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">{active.question}</h2>
            <div className="mt-5 flex flex-wrap gap-2">{["1 Status", "2 Anspruch", "3 Zuständigkeit", "4 Unterlagen", "5 Entscheidung", "6 Handlung"].map((step) => <span className="chip bg-[#f5f1e7] text-forest dark:bg-white/[.06] dark:text-white/70" key={step}>{step}</span>)}</div>
            <div className="my-7 h-px bg-black/[.06] dark:bg-white/[.08]" />
            <div className="grid gap-4 sm:grid-cols-2">
              {(["status", "authority", "benefit", "work"] as const).map((key) => <label key={key} className="text-sm font-bold">{({ status: "1. Aufenthaltsstatus", authority: "2. Zuständige Stelle", benefit: "3. Mögliche Leistung", work: "4. Erwerbstätigkeit" } as const)[key]}<select disabled={score !== null} className="field mt-2 font-normal" value={answers[key]} onChange={(e) => setAnswers({ ...answers, [key]: e.target.value })}><option value="">Bitte fachlich einordnen …</option>{active.options[key].map((o) => <option key={o}>{o}</option>)}</select></label>)}
            </div>
            <div className="mt-5 space-y-4">
              <label className="block text-sm font-bold">5. Fehlende oder zu prüfende Unterlagen <span className="font-normal text-ink/38 dark:text-white/35">— konkret benennen</span><textarea disabled={score !== null} className="field mt-2 min-h-28 resize-y font-normal" value={answers.missing} onChange={(e) => setAnswers({ ...answers, missing: e.target.value })} placeholder="Beispiel: vollständige Vorder- und Rückseite des Dokuments, Nachweis …" /></label>
              <label className="block text-sm font-bold">6. Nächster rechtssicherer Schritt<textarea disabled={score !== null} className="field mt-2 min-h-28 resize-y font-normal" value={answers.nextStep} onChange={(e) => setAnswers({ ...answers, nextStep: e.target.value })} placeholder="Wer prüft oder veranlasst was — und in welcher Reihenfolge?" /></label>
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="block text-sm font-bold">Aktennotiz<textarea disabled={score !== null} className="field mt-2 min-h-40 resize-y font-normal" value={answers.note} onChange={(e) => setAnswers({ ...answers, note: e.target.value })} placeholder="Anliegen · gesicherte Fakten · offene Punkte · Vereinbarung" /></label>
                <label className="block text-sm font-bold">Behörden-E-Mail<textarea disabled={score !== null} className="field mt-2 min-h-40 resize-y font-normal" value={answers.email} onChange={(e) => setAnswers({ ...answers, email: e.target.value })} placeholder="Betreff, Bezug, konkrete Bitte, Anlagen, Abschluss" /></label>
              </div>
            </div>
            {score === null ? <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"><button onClick={submit} className="btn-primary w-full sm:w-auto" disabled={!answers.status || !answers.authority || answers.nextStep.length < 20}>Prüfung abschließen <ClipboardCheck size={18} /></button><p className="text-xs text-ink/40 dark:text-white/35">Die Auswertung erfolgt nach fünf transparenten Kriterien.</p></div> : (
              <div className="mt-8 space-y-6">
                <section className={`rounded-3xl border p-6 ${score >= 85 ? "border-sage/25 bg-sage/[.08]" : score >= 65 ? "border-amber/25 bg-amber/[.08]" : "border-coral/25 bg-coral/[.07]"}`}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow">Auswertung</p><h3 className="mt-1 font-display text-3xl">{feedback}</h3><p className="mt-2 text-sm text-ink/55 dark:text-white/48">Ihr Versuch wurde gespeichert. Der Bestwert und die Versuchshistorie bleiben erhalten.</p></div><div className="text-5xl font-bold tabular-nums">{score}<span className="text-lg opacity-40">/100</span></div></div>
                </section>
                <section>
                  <h3 className="text-lg font-bold">Kriterienbezogenes Feedback</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {criteria.map(([label, points, hint]) => <div className="rounded-2xl border border-black/[.055] p-4 dark:border-white/[.075]" key={label}><div className="flex items-center justify-between"><span className="font-bold">{label}</span><span className={`chip ${points === 20 ? "bg-sage/12 text-sage" : points === 10 ? "bg-amber/12 text-amber" : "bg-coral/12 text-coral"}`}>{points}/20</span></div><p className="mt-2 text-xs leading-5 text-ink/48 dark:text-white/42">{hint}</p></div>)}
                  </div>
                </section>
                <section className="rounded-3xl border border-sage/20 bg-[#f7faf7] p-5 dark:bg-sage/[.045]">
                  <h3 className="flex items-center gap-2 font-bold"><ShieldCheck size={19} className="text-sage" /> Fachliche Musterlösung</h3>
                  <dl className="mt-5 grid gap-5 text-sm sm:grid-cols-2">
                    <div><dt className="eyebrow">Status</dt><dd className="mt-1 font-semibold">{active.solution.status}</dd></div>
                    <div><dt className="eyebrow">Zuständigkeit</dt><dd className="mt-1 font-semibold">{active.solution.authority}</dd></div>
                    <div className="sm:col-span-2"><dt className="eyebrow">Unterlagen</dt><dd className="mt-1">{active.solution.missing.join(", ")}</dd></div>
                    <div className="sm:col-span-2"><dt className="eyebrow">Nächster Schritt</dt><dd className="mt-1">{active.solution.nextStep}</dd></div>
                    <div className="sm:col-span-2"><dt className="eyebrow">Begründung</dt><dd className="mt-1 leading-6">{active.solution.reasoning}</dd></div>
                  </dl>
                </section>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-3xl bg-[#f6f2e8] p-5 dark:bg-white/[.045]"><h3 className="font-bold">Professionelle Aktennotiz</h3><p className="mt-3 whitespace-pre-line text-sm leading-6 text-ink/62 dark:text-white/54">{active.solution.note}</p></div>
                  <div className="rounded-3xl bg-[#f6f2e8] p-5 dark:bg-white/[.045]"><h3 className="flex items-center gap-2 font-bold"><Mail size={18} /> Formulierungsbeispiel</h3><p className="mt-3 whitespace-pre-line text-sm leading-6 text-ink/62 dark:text-white/54">{active.solution.email}</p></div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_.8fr]">
                  <div><h3 className="font-bold">Typische Fehlentscheidungen</h3><ul className="mt-3 space-y-2 text-sm">{active.solution.mistakes.map((m) => <li className="flex gap-2" key={m}><XCircle size={16} className="mt-0.5 shrink-0 text-coral" />{m}</li>)}</ul></div>
                  <div className="rounded-2xl border border-amber/20 bg-amber/[.07] p-4"><AlertTriangle className="text-amber" size={19} /><p className="mt-2 text-xs font-bold uppercase tracking-wider text-amber">Merksatz</p><p className="mt-1 text-sm leading-6">{active.solution.learningTip}</p></div>
                </div>
                <section>
                  <h3 className="font-bold">Fachbegriffe zum Wiederholen</h3>
                  <div className="mt-3 flex flex-wrap gap-2">{active.terms.map((term) => <span className="chip bg-sand text-forest dark:bg-white/[.06] dark:text-white/70" key={term}>{term}</span>)}</div>
                </section>
                <div className="flex flex-col gap-3 sm:flex-row"><button onClick={() => open(active.id)} className="btn-secondary">Fall erneut bearbeiten</button><button onClick={() => setActiveId(null)} className="btn-primary">Nächste Akte wählen <ChevronRight size={18} /></button></div>
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  );
}
