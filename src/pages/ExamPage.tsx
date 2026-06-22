import {
  Award, BarChart3, CheckCircle2, ChevronRight, ClipboardCheck, Clock3,
  FileSignature, LockKeyhole, Mail, RotateCcw, Save, ShieldCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cases } from "../data/cases";
import { flashcards } from "../data/flashcards";
import { quizQuestions } from "../data/quiz";
import type { ProgressState } from "../types";

const DRAFT_KEY = "migration-verwaltung-exam-draft-v2";
type Draft = {
  step: number;
  caseAnswers: Record<string, string>;
  quizAnswers: Record<string, number>;
  termAnswers: Record<string, string>;
  writing: { email1: string; email2: string; note: string };
};
const emptyDraft: Draft = { step: 0, caseAnswers: {}, quizAnswers: {}, termAnswers: {}, writing: { email1: "", email2: "", note: "" } };

const readDraft = (): Draft => {
  try {
    const value = localStorage.getItem(DRAFT_KEY);
    return value ? { ...emptyDraft, ...JSON.parse(value) } : emptyDraft;
  } catch {
    return emptyDraft;
  }
};

export function ExamPage({
  state,
  saveExam,
}: {
  state: ProgressState;
  saveExam: (score: number, sections: Record<string, number>) => void;
}) {
  const examCases = cases.filter((item) => item.category === "Abschluss").slice(0, 5);
  const questions = useMemo(() => quizQuestions.filter((_, index) => index % 4 === 0).slice(0, 20), []);
  const terms = useMemo(() => flashcards.filter((_, index) => index % 11 === 0).slice(0, 10), []);
  const initial = useMemo(readDraft, []);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(initial.step);
  const [caseAnswers, setCaseAnswers] = useState<Record<string, string>>(initial.caseAnswers);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>(initial.quizAnswers);
  const [termAnswers, setTermAnswers] = useState<Record<string, string>>(initial.termAnswers);
  const [writing, setWriting] = useState(initial.writing);
  const [result, setResult] = useState<{ total: number; sections: Record<string, number> } | null>(null);

  useEffect(() => {
    if (!started || result) return;
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ step, caseAnswers, quizAnswers, termAnswers, writing }));
  }, [started, result, step, caseAnswers, quizAnswers, termAnswers, writing]);

  const completion = [
    examCases.filter((item) => (caseAnswers[item.id] ?? "").trim().length >= 100).length / 5,
    Object.keys(quizAnswers).length / 20,
    terms.filter((term) => (termAnswers[term.id] ?? "").trim().length >= 25).length / 10,
    [writing.email1, writing.email2, writing.note].filter((text) => text.trim().length >= 100).length / 3,
  ];

  const finish = () => {
    const caseQuality = examCases.reduce((sum, item) => {
      const answer = (caseAnswers[item.id] ?? "").toLowerCase();
      const structure = ["status", "zuständig", "unterlag", "nächste", "frist"].filter((word) => answer.includes(word)).length;
      return sum + Math.min(1, answer.length / 300) * .55 + structure / 5 * .45;
    }, 0) / 5 * 100;
    const quiz = questions.filter((q) => quizAnswers[q.id] === q.correct).length / 20 * 100;
    const terminology = terms.reduce((sum, term) => {
      const answer = (termAnswers[term.id] ?? "").trim();
      return sum + Math.min(1, answer.length / 90);
    }, 0) / 10 * 100;
    const communicationTexts = [writing.email1, writing.email2, writing.note];
    const communication = communicationTexts.reduce((sum, text) => {
      const professional = /sehr geehrte|anliegen|frist|nächste|mit freundlichen|vereinbart/i.test(text);
      return sum + Math.min(1, text.length / 260) * .7 + (professional ? .3 : 0);
    }, 0) / 3 * 100;
    const sections = {
      "Fallanalyse": Math.round(caseQuality),
      "Fachwissen": Math.round(quiz),
      "Fachbegriffe": Math.round(terminology),
      "Kommunikation": Math.round(communication),
    };
    const total = Math.round(sections.Fallanalyse * .4 + sections.Fachwissen * .3 + sections.Fachbegriffe * .1 + sections.Kommunikation * .2);
    setResult({ total, sections });
    saveExam(total, sections);
    localStorage.removeItem(DRAFT_KEY);
  };

  const resetExam = () => {
    setResult(null); setStep(0); setCaseAnswers({}); setQuizAnswers({}); setTermAnswers({});
    setWriting({ email1: "", email2: "", note: "" }); localStorage.removeItem(DRAFT_KEY);
  };

  if (!started) {
    const hasDraft = completion.some((value) => value > 0);
    return <div className="space-y-7">
      <div><p className="eyebrow">Kompetenznachweis</p><h1 className="font-display text-4xl sm:text-5xl">Berufsnahe Abschlussprüfung</h1><p className="mt-3 max-w-3xl text-ink/55 dark:text-white/48">Eine strukturierte Selbstprüfung unter praxisnahen Bedingungen — ohne Rechtswirkung, aber mit einem transparenten Kompetenzprofil.</p></div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <section className="premium-hero rounded-[2rem] p-7 text-white sm:p-10">
          <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber text-forest"><ShieldCheck size={24} /></span><span className="chip border border-white/10 bg-white/10 text-white">Prüfmodus</span></div>
          <h2 className="mt-7 max-w-2xl font-display text-4xl sm:text-5xl">Zeigen Sie, dass Sie Fachwissen in Handlung übersetzen können.</h2>
          <p className="mt-5 max-w-xl leading-7 text-white/62">Empfohlene Bearbeitungszeit: 90–120 Minuten. Ihr Entwurf wird während der Bearbeitung automatisch lokal gesichert.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => setStarted(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber px-5 py-3.5 font-bold text-forest">{hasDraft ? "Entwurf fortsetzen" : "Prüfung beginnen"} <ChevronRight size={18} /></button>
            {hasDraft && <button onClick={resetExam} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[.07] px-5 py-3.5 font-bold">Entwurf verwerfen</button>}
          </div>
        </section>
        <section className="card-premium p-6 sm:p-8">
          <div className="flex items-center justify-between"><div><p className="eyebrow">Prüfungsordnung</p><h2 className="font-display text-3xl">Aufbau & Gewichtung</h2></div><LockKeyhole className="text-sage" /></div>
          <div className="mt-6 space-y-4">
            {[["40 %", "5 strukturierte Fallanalysen", "Status, Zuständigkeit, Unterlagen, Handlung"], ["30 %", "20 Wissensfragen", "Fachliche Einordnung"], ["10 %", "10 Fachbegriffe", "Präzision und Praxisbezug"], ["20 %", "2 E-Mails + 1 Aktennotiz", "Adressatengerechte Kommunikation"]].map(([weight, label, detail]) => <div className="grid grid-cols-[58px_1fr] gap-3 rounded-2xl border border-black/[.05] p-4 dark:border-white/[.07]" key={label}><span className="font-bold text-coral">{weight}</span><div><p className="font-semibold">{label}</p><p className="mt-1 text-xs text-ink/42 dark:text-white/38">{detail}</p></div></div>)}
          </div>
          {state.examScore !== undefined && <div className="mt-6 flex items-center justify-between rounded-2xl bg-sage/[.09] p-4"><span className="text-sm font-semibold">Bisheriger Bestwert</span><strong className="text-2xl text-sage">{state.examScore}%</strong></div>}
        </section>
      </div>
    </div>;
  }

  if (result) {
    const readiness = result.total >= 85 ? "Sehr gute Praxisbereitschaft" : result.total >= 70 ? "Solide Praxisbereitschaft" : result.total >= 55 ? "Grundlagen vorhanden" : "Weitere Vorbereitung empfohlen";
    const sorted = Object.entries(result.sections).sort((a, b) => b[1] - a[1]);
    return <div className="mx-auto max-w-5xl space-y-6">
      <section className="premium-hero overflow-hidden rounded-[2rem] p-7 text-white sm:p-10">
        <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
          <div className="grid h-36 w-36 place-items-center rounded-full border-[10px] border-white/10 bg-white/[.06] text-center"><div><div className="text-4xl font-bold text-amber">{result.total}%</div><div className="text-[10px] uppercase tracking-widest text-white/45">Gesamt</div></div></div>
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-amber">Ergebnisbericht</p><h1 className="mt-2 font-display text-5xl">{readiness}</h1><p className="mt-4 max-w-2xl text-white/60">Das Ergebnis ist eine Lernstandseinschätzung. Es ersetzt keine Prüfung durch einen Arbeitgeber oder eine Behörde.</p></div>
        </div>
      </section>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <section className="card-premium p-6 sm:p-8"><p className="eyebrow">Kompetenzprofil</p><h2 className="font-display text-3xl">Ergebnisse nach Prüfungsbereich</h2><div className="mt-7 space-y-5">{Object.entries(result.sections).map(([label, value]) => <div key={label}><div className="mb-2 flex justify-between text-sm"><span className="font-semibold">{label}</span><strong>{value}%</strong></div><div className="h-2.5 overflow-hidden rounded-full bg-black/[.06] dark:bg-white/[.07]"><div className={`h-full rounded-full ${value >= 80 ? "bg-sage" : value >= 60 ? "bg-amber" : "bg-coral"}`} style={{ width: `${value}%` }} /></div></div>)}</div></section>
        <section className="card-premium p-6 sm:p-8"><p className="eyebrow">Auswertung</p><h2 className="font-display text-3xl">Stärke & Lernauftrag</h2><div className="mt-6 rounded-2xl bg-sage/[.08] p-4"><p className="text-xs font-bold uppercase tracking-wider text-sage">Stärkster Bereich</p><p className="mt-1 text-lg font-bold">{sorted[0][0]} · {sorted[0][1]}%</p></div><div className="mt-3 rounded-2xl bg-coral/[.07] p-4"><p className="text-xs font-bold uppercase tracking-wider text-coral">Wiederholen</p><p className="mt-1 text-lg font-bold">{sorted[sorted.length - 1][0]} · {sorted[sorted.length - 1][1]}%</p></div><button onClick={resetExam} className="btn-primary mt-6 w-full"><RotateCcw size={17} /> Prüfung neu starten</button></section>
      </div>
    </div>;
  }

  const stepLabels = ["Fallanalyse", "Wissensprüfung", "Fachbegriffe", "Schreibpraxis"];
  return <div className="space-y-6">
    <section className="card-premium sticky top-[82px] z-20 p-3 sm:p-4">
      <div className="flex items-center gap-2 overflow-x-auto">
        {stepLabels.map((label, index) => <button key={label} onClick={() => setStep(index)} className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition sm:px-4 ${step === index ? "bg-forest text-white dark:bg-amber dark:text-[#132b29]" : "text-ink/45 hover:bg-sand/40 dark:text-white/42 dark:hover:bg-white/[.05]"}`}><span>{index + 1}</span>{label}<span className="opacity-50">{Math.round(completion[index] * 100)}%</span></button>)}
        <span className="ml-auto hidden shrink-0 items-center gap-1 text-xs text-sage sm:flex"><Save size={14} /> automatisch gesichert</span>
      </div>
    </section>

    {step === 0 && <section className="space-y-5"><div><p className="eyebrow">Teil 1 · 40 Prozent</p><h1 className="font-display text-4xl">Strukturierte Fallanalyse</h1><p className="mt-2 text-ink/50 dark:text-white/44">Antworten Sie pro Fall mit klaren Zwischenüberschriften. Umfang: etwa 150–300 Wörter.</p></div>{examCases.map((item, i) => <article className="card-premium overflow-hidden" key={item.id}><header className="border-b border-black/[.05] bg-[#f8f5ed] px-5 py-4 dark:border-white/[.07] dark:bg-white/[.025]"><div className="flex justify-between gap-3"><div><p className="font-mono text-[10px] font-bold uppercase tracking-widest text-sage">Prüfungsakte {i + 1} · AZ P-{String(i + 1).padStart(2, "0")}/26</p><h2 className="mt-1 text-xl font-bold">{item.person.name}: {item.person.issue}</h2></div><ClipboardCheck className="shrink-0 text-sage" /></div></header><div className="p-5 sm:p-7"><p className="text-sm leading-7 text-ink/62 dark:text-white/54">{item.facts}</p><textarea aria-label={`Antwort Prüfungsfall ${i + 1}`} className="field mt-5 min-h-52" placeholder="Status und Ausgangslage: …&#10;Anspruch / rechtliche Grundidee: …&#10;Zuständigkeit: …&#10;Fehlende Unterlagen: …&#10;Frist / Risiko: …&#10;Nächster Schritt: …" value={caseAnswers[item.id] ?? ""} onChange={(e) => setCaseAnswers({ ...caseAnswers, [item.id]: e.target.value })} /><p className="mt-2 text-right text-xs text-ink/35 dark:text-white/30">{(caseAnswers[item.id] ?? "").length} Zeichen</p></div></article>)}<button onClick={() => setStep(1)} className="btn-primary">Weiter zur Wissensprüfung <ChevronRight size={18} /></button></section>}

    {step === 1 && <section><div><p className="eyebrow">Teil 2 · 30 Prozent</p><h1 className="font-display text-4xl">Wissensprüfung</h1><p className="mt-2 text-ink/50 dark:text-white/44">{Object.keys(quizAnswers).length} von 20 Fragen beantwortet.</p></div><div className="mt-6 space-y-4">{questions.map((q, i) => <article className="card-premium p-5 sm:p-6" key={q.id}><p className="eyebrow">Frage {i + 1} · {q.category}</p><h2 className="mt-2 font-bold leading-6">{q.question}</h2><div className="mt-4 grid gap-2 sm:grid-cols-2">{q.options.map((option, oi) => <button key={oi} onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: oi })} className={`rounded-xl border p-3 text-left text-sm transition ${quizAnswers[q.id] === oi ? "border-amber bg-amber/[.09] ring-1 ring-amber/20" : "border-black/[.055] hover:border-sage dark:border-white/[.075]"}`}><span className="mr-2 font-bold text-sage">{String.fromCharCode(65 + oi)}</span>{option}</button>)}</div></article>)}</div><button onClick={() => setStep(2)} className="btn-primary mt-6">Weiter zu Fachbegriffen <ChevronRight size={18} /></button></section>}

    {step === 2 && <section><div><p className="eyebrow">Teil 3 · 10 Prozent</p><h1 className="font-display text-4xl">Fachbegriffe präzise erklären</h1><p className="mt-2 text-ink/50 dark:text-white/44">Definition, Abgrenzung und ein kurzer Praxisbezug.</p></div><div className="mt-6 grid gap-4 md:grid-cols-2">{terms.map((term, i) => <label className="card-premium p-5 text-sm font-bold" key={term.id}><span className="text-sage">{i + 1}.</span> {term.term}<textarea className="field mt-3 min-h-32 font-normal" value={termAnswers[term.id] ?? ""} onChange={(e) => setTermAnswers({ ...termAnswers, [term.id]: e.target.value })} placeholder="Definition und Beispiel …" /></label>)}</div><button onClick={() => setStep(3)} className="btn-primary mt-6">Weiter zur Schreibpraxis <ChevronRight size={18} /></button></section>}

    {step === 3 && <section><div><p className="eyebrow">Teil 4 · 20 Prozent</p><h1 className="font-display text-4xl">Behördenkommunikation</h1><p className="mt-2 text-ink/50 dark:text-white/44">Achten Sie auf Betreff, Bezug, konkrete Bitte, Frist und sachlichen Abschluss.</p></div><div className="mt-6 space-y-5"><label className="card-premium block p-5 font-bold sm:p-7"><span className="flex items-center gap-2"><Mail size={18} className="text-sage" /> E-Mail 1: Fehlende Unterlagen fristgerecht nachreichen</span><textarea aria-label="Prüfungs-E-Mail 1" className="field mt-4 min-h-48 font-normal" value={writing.email1} onChange={(e) => setWriting({ ...writing, email1: e.target.value })} /></label><label className="card-premium block p-5 font-bold sm:p-7"><span className="flex items-center gap-2"><Mail size={18} className="text-sage" /> E-Mail 2: Bearbeitungsstand höflich erfragen</span><textarea aria-label="Prüfungs-E-Mail 2" className="field mt-4 min-h-48 font-normal" value={writing.email2} onChange={(e) => setWriting({ ...writing, email2: e.target.value })} /></label><label className="card-premium block p-5 font-bold sm:p-7"><span className="flex items-center gap-2"><FileSignature size={18} className="text-sage" /> Aktennotiz: Klient versteht Fristbrief nicht</span><textarea aria-label="Prüfungs-Aktennotiz" className="field mt-4 min-h-48 font-normal" value={writing.note} onChange={(e) => setWriting({ ...writing, note: e.target.value })} /></label></div><div className="mt-6 rounded-3xl border border-amber/20 bg-amber/[.07] p-5"><div className="flex items-start gap-3"><Clock3 className="mt-0.5 shrink-0 text-amber" /><div><h2 className="font-bold">Abgabe prüfen</h2><p className="mt-1 text-sm leading-6">Alle Teile können abgegeben werden. Nicht oder sehr kurz bearbeitete Antworten reduzieren nachvollziehbar die Bewertung.</p></div></div><button onClick={finish} className="btn-primary mt-5 w-full sm:w-auto">Prüfung verbindlich auswerten <Award size={18} /></button></div></section>}
  </div>;
}
