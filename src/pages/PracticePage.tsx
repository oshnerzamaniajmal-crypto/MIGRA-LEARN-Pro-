import { Check, ChevronLeft, ChevronRight, Filter, RotateCcw, Sparkles, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { flashcards } from "../data/flashcards";
import { quizQuestions } from "../data/quiz";
import type { Category, ProgressState, QuizQuestion } from "../types";

const categories = ["Alle", "Ausländerrecht", "Jobcenter / SGB II", "Integration", "Beratung", "Behördenkommunikation"];

export function FlashcardsPage({ state, markCard }: { state: ProgressState; markCard: (id: string, learned: boolean) => void }) {
  const [category, setCategory] = useState("Alle");
  const [onlyDifficult, setOnlyDifficult] = useState(false);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [dragX, setDragX] = useState(0);
  const dragStart = useRef<number | null>(null);
  const cards = useMemo(() => flashcards.filter((card) => (category === "Alle" || card.category === category) && (!onlyDifficult || state.difficultCards.includes(card.id))), [category, onlyDifficult, state.difficultCards]);
  const card = cards[index % Math.max(cards.length, 1)];
  const next = () => { setIndex((index + 1) % cards.length); setFlipped(false); };
  const previous = () => { setIndex((index - 1 + cards.length) % cards.length); setFlipped(false); };
  const finishSwipe = () => {
    if (dragX > 70) previous();
    else if (dragX < -70) next();
    setDragX(0);
    dragStart.current = null;
  };
  return (
    <div className="space-y-7">
      <div><p className="text-xs font-bold uppercase tracking-[.2em] text-sage">Aktives Erinnern</p><h1 className="font-display text-4xl sm:text-5xl">120 Karteikarten</h1><p className="mt-3 opacity-60">Tippen zum Umdrehen. Auf dem Handy nach links oder rechts wischen.</p></div>
      <div className="flex flex-col gap-3 sm:flex-row"><select className="field sm:max-w-xs" value={category} onChange={(e) => { setCategory(e.target.value); setIndex(0); }}>{categories.map((c) => <option key={c}>{c}</option>)}</select><button onClick={() => { setOnlyDifficult(!onlyDifficult); setIndex(0); }} className={`btn-secondary ${onlyDifficult ? "!bg-coral !text-white" : ""}`}><Filter size={17} /> Schwierige wiederholen ({state.difficultCards.length})</button></div>
      {!card ? <div className="card text-center"><p>Keine Karten in dieser Auswahl. Markieren Sie zunächst Karten als schwierig.</p><button onClick={() => setOnlyDifficult(false)} className="btn-primary mt-4">Alle Karten zeigen</button></div> : (
        <>
          <div className="mx-auto max-w-3xl">
            <button
              onClick={() => Math.abs(dragX) < 8 && setFlipped(!flipped)}
              onPointerDown={(event) => { dragStart.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }}
              onPointerMove={(event) => { if (dragStart.current !== null) setDragX(event.clientX - dragStart.current); }}
              onPointerUp={finishSwipe}
              onPointerCancel={finishSwipe}
              style={{ transform: `translateX(${dragX * .38}px) rotate(${dragX * .018}deg)` }}
              className={`min-h-[430px] w-full touch-pan-y select-none rounded-[2rem] p-6 text-left shadow-soft transition-[background-color,color,box-shadow] duration-300 sm:min-h-[420px] sm:rounded-[2.25rem] sm:p-12 ${flipped ? "bg-forest text-white" : "border border-black/5 bg-white dark:border-white/10 dark:bg-[#10211f]"}`}
            >
              <div className="flex justify-between"><span className={`chip ${flipped ? "bg-white/10 text-sand" : "bg-sand text-forest dark:bg-white/10 dark:text-white"}`}>{card.category}</span><span className="text-sm opacity-45">{index + 1} / {cards.length}</span></div>
              {!flipped ? <div className="mt-20 text-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-sage">Erklären Sie den Begriff</p><h2 className="mt-4 font-display text-4xl sm:text-6xl">{card.term}</h2><p className="mt-8 text-sm opacity-45">Tippen zum Umdrehen</p><p className="mt-3 text-xs opacity-30">← wischen →</p></div> :
                <div className="mt-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-amber">Kurz erklärt</p><p className="mt-4 text-xl leading-8">{card.explanation}</p><div className="my-7 h-px bg-white/10" /><p className="text-sm font-bold text-sand">Praxisanker</p><p className="mt-2 leading-7 text-white/65">{card.example}</p><p className="mt-6 rounded-2xl bg-white/10 p-4 text-sm italic">{card.question}</p></div>}
            </button>
          </div>
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
            <button onClick={previous} className="btn-secondary hidden sm:inline-flex"><ChevronLeft size={18} /> Zurück</button>
            <button onClick={() => { markCard(card.id, false); next(); }} className="btn-secondary !min-h-14 !border-coral/20 !text-coral"><RotateCcw size={18} /> Wiederholen</button>
            <button onClick={() => { markCard(card.id, true); next(); }} className="btn-primary !min-h-14"><Check size={18} /> Gewusst</button>
            <button onClick={next} className="btn-secondary hidden sm:inline-flex">Weiter <ChevronRight size={18} /></button>
          </div>
        </>
      )}
      <div className="mx-auto max-w-3xl rounded-2xl bg-sand/50 p-4 text-sm dark:bg-white/5"><strong>{state.learnedCards.length} von 120</strong> Karten sicher · {state.difficultCards.length} zur Wiederholung</div>
    </div>
  );
}

export function QuizPage({ state, saveQuiz }: { state: ProgressState; saveQuiz: (score: number, total: number, category: string) => void }) {
  const [category, setCategory] = useState("Alle");
  const [session, setSession] = useState<QuizQuestion[] | null>(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const start = () => {
    const pool = quizQuestions.filter((q) => category === "Alle" || q.category === category);
    setSession([...pool].sort(() => Math.random() - .5).slice(0, 10)); setIndex(0); setSelected(null); setCorrect(0); setFinished(false);
  };
  const next = () => {
    if (!session || selected === null) return;
    const nextCorrect = correct + (selected === session[index].correct ? 1 : 0);
    if (index === session.length - 1) { setCorrect(nextCorrect); setFinished(true); saveQuiz(nextCorrect, session.length, category); }
    else { setCorrect(nextCorrect); setIndex(index + 1); setSelected(null); }
  };
  if (!session) return <div className="space-y-7"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-sage">Wissen prüfen</p><h1 className="font-display text-4xl sm:text-5xl">Quiz & Mini-Fälle</h1><p className="mt-3 opacity-60">100 Fragen mit Erklärung. Jede Runde zieht zehn Fragen aus Ihrer Auswahl.</p></div><div className="grid gap-6 lg:grid-cols-[1fr_.6fr]"><section className="card p-7"><Sparkles className="text-amber" size={30} /><h2 className="mt-4 font-display text-3xl">Neue Quizrunde</h2><label className="mt-6 block text-sm font-bold">Kategorie<select className="field mt-2" value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((c) => <option key={c}>{c}</option>)}</select></label><button onClick={start} className="btn-primary mt-5">10 Fragen starten <ChevronRight size={18} /></button></section><section className="card"><p className="text-xs font-bold uppercase tracking-widest text-sage">Bisher</p><div className="mt-3 text-4xl font-bold">{state.quizHistory.length}</div><p className="opacity-50">abgeschlossene Runden</p><div className="mt-5 space-y-2">{state.quizHistory.slice(-4).reverse().map((q, i) => <div key={i} className="flex justify-between rounded-xl bg-sand/45 p-3 text-sm dark:bg-white/5"><span>{q.category}</span><strong>{q.score}/{q.total}</strong></div>)}</div></section></div></div>;
  if (finished) {
    const percent = Math.round(correct / session.length * 100);
    return <div className="mx-auto max-w-2xl py-10 text-center"><div className="card p-10"><div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-amber/15 text-3xl font-bold text-amber">{percent}%</div><h1 className="mt-6 font-display text-4xl">{percent >= 80 ? "Sehr sicher!" : percent >= 60 ? "Gute Grundlage." : "Noch einmal festigen."}</h1><p className="mt-3 opacity-60">{correct} von {session.length} Fragen richtig beantwortet.</p><div className="mt-7 flex justify-center gap-3"><button onClick={start} className="btn-primary"><RotateCcw size={17} /> Neue Runde</button><button onClick={() => setSession(null)} className="btn-secondary">Zur Übersicht</button></div></div></div>;
  }
  const question = session[index];
  const answered = selected !== null;
  return <div className="mx-auto max-w-3xl space-y-5"><div className="flex items-center justify-between text-sm"><span className="chip bg-sand text-forest dark:bg-white/10 dark:text-white">{question.type}</span><span className="font-bold">Frage {index + 1} / {session.length}</span></div><div className="h-2 overflow-hidden rounded-full bg-black/5 dark:bg-white/10"><div className="h-full bg-amber transition-all" style={{ width: `${(index + 1) / session.length * 100}%` }} /></div><section className="card p-5 sm:p-10"><p className="text-xs font-bold uppercase tracking-widest text-sage">{question.category} · {question.difficulty}</p><h1 className="mt-4 text-2xl font-bold leading-snug sm:text-3xl">{question.question}</h1><div className="mt-6 space-y-3">{question.options.map((option, optionIndex) => { const isCorrect = optionIndex === question.correct; const isSelected = optionIndex === selected; return <button disabled={answered} key={optionIndex} onClick={() => setSelected(optionIndex)} className={`flex min-h-[68px] w-full items-center gap-3 rounded-2xl border p-4 text-left text-base font-medium transition active:scale-[.99] sm:min-h-[60px] sm:text-sm ${answered && isCorrect ? "border-sage bg-sage/10" : answered && isSelected ? "border-coral bg-coral/10" : "border-black/5 hover:border-amber dark:border-white/10"}`}><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sand text-sm font-bold text-forest dark:bg-white/10 dark:text-white">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>{answered && isCorrect && <Check className="ml-auto shrink-0 text-sage" />}{answered && isSelected && !isCorrect && <X className="ml-auto shrink-0 text-coral" />}</button>; })}</div>{answered && <div className="mt-6 rounded-2xl bg-sand/50 p-5 text-sm leading-6 dark:bg-white/5"><strong>Erklärung:</strong> {question.explanation}</div>}<button disabled={!answered} onClick={next} className="btn-primary mt-6 w-full !min-h-14 sm:w-auto">{index === session.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage"} <ChevronRight size={18} /></button></section></div>;
}
