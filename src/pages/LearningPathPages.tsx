import {
  AlertTriangle, ArrowRight, BookMarked, BookOpenCheck, CheckCircle2, ChevronLeft,
  ChevronRight, CircleDot, ClipboardCheck, ExternalLink, FileText, GraduationCap,
  Layers3, LibraryBig, ListChecks, RotateCcw, Search, ShieldAlert, Sparkles, Target,
} from "lucide-react";
import { useMemo, useState } from "react";
import { getFirstOpenLesson, getLessonById, getModuleLessons, glossaryEntries, learningLessons, learningModules } from "../data/learningPath";
import type { LearningLesson, ProgressState } from "../types";
import type { Page } from "../components/Layout";

type LearningActions = {
  openLesson: (lessonId: string, title: string) => void;
  updateLessonReading: (lessonId: string, percent: number) => void;
  completeLesson: (lessonId: string, title: string, nextLessonId?: string) => void;
  saveLessonQuiz: (lessonId: string, title: string, score: number, total: number, difficultTopics: string[]) => void;
};

const statusLabel: Record<string, string> = {
  "not-started": "nicht begonnen",
  started: "begonnen",
  reading: "in Bearbeitung",
  "quiz-passed": "Quiz bestanden",
  completed: "abgeschlossen",
  "review-recommended": "Wiederholung empfohlen",
};

function lessonStatus(state: ProgressState, lesson: LearningLesson) {
  if (state.completedTopics.includes(lesson.id)) return "completed";
  return state.lessonProgress[lesson.id]?.status ?? "not-started";
}

function courseStats(state: ProgressState) {
  const completed = learningLessons.filter((lesson) => state.completedTopics.includes(lesson.id)).length;
  const started = learningLessons.filter((lesson) => state.lessonProgress[lesson.id]).length;
  const review = learningLessons.filter((lesson) => state.lessonProgress[lesson.id]?.reviewRecommended || state.difficultLessonIds.includes(lesson.id));
  const current = getFirstOpenLesson(state.completedTopics, state.currentLessonId);
  return {
    completed,
    started,
    review,
    current,
    next: getLessonById(current.nextLessonId),
    percent: Math.round((completed / learningLessons.length) * 100),
  };
}

function Pill({ children, tone = "sage" }: { children: React.ReactNode; tone?: "sage" | "amber" | "coral" | "blue" | "red" }) {
  const style = {
    sage: "bg-sage/[.10] text-sage border-sage/15",
    amber: "bg-amber/[.14] text-amber-800 border-amber/20 dark:text-amber",
    coral: "bg-coral/[.10] text-coral border-coral/15",
    blue: "bg-blue-500/[.10] text-blue-700 border-blue-500/15 dark:text-blue-300",
    red: "bg-red-500/[.10] text-red-700 border-red-500/15 dark:text-red-300",
  }[tone];
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${style}`}>{children}</span>;
}

function ProgressBar({ value }: { value: number }) {
  return <div className="h-2.5 overflow-hidden rounded-full bg-forest/[.08] dark:bg-white/[.08]"><div className="h-full rounded-full bg-gradient-to-r from-sage to-amber transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>;
}

export function AcademyPage({
  state, setPage, openLesson,
}: {
  state: ProgressState;
  setPage: (page: Page) => void;
  openLesson: LearningActions["openLesson"];
}) {
  const [query, setQuery] = useState("");
  const [activeModuleId, setActiveModuleId] = useState(learningModules[0].id);
  const stats = courseStats(state);
  const activeModule = learningModules.find((module) => module.id === activeModuleId) ?? learningModules[0];
  const moduleLessons = getModuleLessons(activeModule.id);
  const filteredModules = learningModules.filter((module) => `${module.title} ${module.description} ${module.learningOutcome}`.toLowerCase().includes(query.toLowerCase()));

  const startLesson = (lesson: LearningLesson) => {
    openLesson(lesson.id, lesson.title);
    setPage("learn");
  };

  return <div className="space-y-6">
    <section className="premium-hero overflow-hidden rounded-[2rem] p-6 text-white sm:p-9">
      <div className="grid gap-7 xl:grid-cols-[1fr_360px] xl:items-end">
        <div>
          <Pill tone="amber"><GraduationCap size={14} /> Akademie = Kursstruktur</Pill>
          <h1 className="mt-5 max-w-5xl font-display text-4xl sm:text-6xl">Migra Learn als klarer Lernpfad von Lektion 1 bis 120.</h1>
          <p className="mt-4 max-w-3xl leading-7 text-white/68">Alle Module sind sichtbar, aber die empfohlene Reihenfolge ist fest: Grundlagen → Deutschland → Aufenthalt → Asyl → Behörden → Sprache → Arbeit → Studium → Familie → Rechte → Einbürgerung → Praxis.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => startLesson(stats.current)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-amber px-5 py-3 font-bold text-forest shadow-lg shadow-black/10 transition hover:-translate-y-0.5">
              {stats.started ? "Weiterlernen" : "Mit Lektion 1 beginnen"} <ArrowRight size={18} />
            </button>
            <button onClick={() => setPage("learn")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/15">
              Lern-Dashboard öffnen
            </button>
          </div>
        </div>
        <div className="rounded-3xl border border-white/12 bg-white/[.07] p-5">
          <div className="flex items-end justify-between gap-4">
            <div><div className="text-5xl font-bold text-amber">{stats.percent}%</div><p className="mt-1 text-xs uppercase tracking-wider text-white/52">Gesamtkurs</p></div>
            <div className="text-right text-sm text-white/58"><strong className="text-white">{stats.completed}</strong><br />von {learningLessons.length} Lektionen</div>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-amber" style={{ width: `${stats.percent}%` }} /></div>
          <p className="mt-4 text-xs leading-5 text-white/55">Nächster Schritt: Lektion {stats.current.globalLessonNumber} · {stats.current.title}</p>
        </div>
      </div>
    </section>

    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <aside className="space-y-4">
        <div className="card-premium p-4">
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/35 dark:text-white/35" size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Module suchen …" className="field pl-11" />
          </label>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl bg-sand/50 p-3 dark:bg-white/[.05]"><p className="text-xl font-bold">{learningModules.length}</p><p className="text-[10px] font-bold uppercase text-ink/45 dark:text-white/40">Module</p></div>
            <div className="rounded-2xl bg-sand/50 p-3 dark:bg-white/[.05]"><p className="text-xl font-bold">{learningLessons.length}</p><p className="text-[10px] font-bold uppercase text-ink/45 dark:text-white/40">Lektionen</p></div>
            <div className="rounded-2xl bg-sand/50 p-3 dark:bg-white/[.05]"><p className="text-xl font-bold">{stats.review.length}</p><p className="text-[10px] font-bold uppercase text-ink/45 dark:text-white/40">Review</p></div>
          </div>
        </div>
        <div className="space-y-2">
          {(query ? filteredModules : learningModules).map((module) => {
            const lessons = getModuleLessons(module.id);
            const completed = lessons.filter((lesson) => state.completedTopics.includes(lesson.id)).length;
            const progress = Math.round((completed / lessons.length) * 100);
            return <button key={module.id} onClick={() => setActiveModuleId(module.id)} className={`w-full rounded-3xl border p-4 text-left transition hover:-translate-y-0.5 ${activeModule.id === module.id ? "border-sage/35 bg-sage/[.08] shadow-soft" : "border-black/[.05] bg-white dark:border-white/[.07] dark:bg-white/[.04]"}`}>
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white" style={{ backgroundColor: module.color }}><Layers3 size={19} /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-sage">Modul {module.moduleOrder}</p>
                  <p className="mt-1 font-bold">{module.shortTitle}</p>
                  <p className="mt-1 text-xs leading-5 text-ink/48 dark:text-white/42">{completed}/{lessons.length} Lektionen</p>
                  <div className="mt-3"><ProgressBar value={progress} /></div>
                </div>
              </div>
            </button>;
          })}
        </div>
      </aside>

      <section className="space-y-5">
        <article className="card-premium p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Pill>Modul {activeModule.moduleOrder}</Pill>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl">{activeModule.title}</h2>
              <p className="mt-3 max-w-3xl text-ink/58 dark:text-white/50">{activeModule.description}</p>
              <div className="mt-5 rounded-3xl border border-sage/15 bg-sage/[.06] p-5">
                <p className="eyebrow">Lernziel des Moduls</p>
                <p className="mt-2 leading-7">{activeModule.learningOutcome}</p>
              </div>
            </div>
            <button onClick={() => startLesson(moduleLessons.find((lesson) => !state.completedTopics.includes(lesson.id)) ?? moduleLessons[0])} className="btn-primary shrink-0">Modul starten <ArrowRight size={17} /></button>
          </div>
        </article>

        <div className="grid gap-3">
          {moduleLessons.map((lesson) => {
            const status = lessonStatus(state, lesson);
            const progress = state.lessonProgress[lesson.id]?.readPercent ?? (status === "completed" ? 100 : 0);
            return <article key={lesson.id} className={`rounded-3xl border bg-white p-4 shadow-sm dark:bg-[#10211f] sm:p-5 ${status === "completed" ? "border-sage/20" : status === "review-recommended" ? "border-amber/30" : "border-black/[.05] dark:border-white/[.07]"}`}>
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="flex gap-4">
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-bold ${status === "completed" ? "bg-sage text-white" : "bg-sand text-forest dark:bg-white/[.07] dark:text-amber"}`}>
                    {status === "completed" ? <CheckCircle2 size={20} /> : lesson.globalLessonNumber}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-2">
                      <Pill tone={status === "review-recommended" ? "amber" : status === "completed" ? "sage" : "blue"}>{statusLabel[status]}</Pill>
                      {lesson.isLegalSensitive && <Pill tone="red"><ShieldAlert size={13} /> sensibel</Pill>}
                      {lesson.isCoreLesson && <Pill tone="coral">Kernlektion</Pill>}
                    </div>
                    <h3 className="mt-3 font-display text-2xl">{lesson.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink/55 dark:text-white/48">{lesson.description}</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
                      <ProgressBar value={progress} />
                      <span className="text-xs font-bold text-ink/45 dark:text-white/40">{progress}% gelesen · {lesson.estimatedMinutes} Min.</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => startLesson(lesson)} className={status === "completed" ? "btn-secondary" : "btn-primary"}>
                  {status === "not-started" ? "Starten" : status === "completed" ? "Wiederholen" : "Weiter"} <ArrowRight size={17} />
                </button>
              </div>
            </article>;
          })}
        </div>
      </section>
    </div>
  </div>;
}

export function LearnPage({
  state, setPage, openLesson, updateLessonReading, completeLesson, saveLessonQuiz,
}: {
  state: ProgressState;
  setPage: (page: Page) => void;
} & LearningActions) {
  const stats = courseStats(state);
  const [activeLessonId, setActiveLessonId] = useState(stats.current.id);
  const [view, setView] = useState<"lesson" | "quiz" | "review" | "glossary">("lesson");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const lesson = getLessonById(activeLessonId) ?? stats.current;
  const module = learningModules.find((item) => item.id === lesson.moduleId) ?? learningModules[0];
  const progress = state.lessonProgress[lesson.id];
  const status = lessonStatus(state, lesson);
  const difficultLessons = stats.review.length ? stats.review : learningLessons.filter((item) => item.isCoreLesson && !state.completedTopics.includes(item.id)).slice(0, 5);
  const moduleLessons = getModuleLessons(module.id);
  const moduleCompleted = moduleLessons.filter((item) => state.completedTopics.includes(item.id)).length;
  const moduleProgress = Math.round((moduleCompleted / moduleLessons.length) * 100);

  const selectLesson = (next: LearningLesson, targetView: typeof view = "lesson") => {
    setActiveLessonId(next.id);
    setView(targetView);
    openLesson(next.id, next.title);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const markRead = () => updateLessonReading(lesson.id, 85);
  const finish = () => {
    completeLesson(lesson.id, lesson.title, lesson.nextLessonId);
    const next = getLessonById(lesson.nextLessonId);
    if (next) selectLesson(next, "lesson");
  };
  const submitQuiz = () => {
    const score = lesson.quiz.reduce((sum, question) => sum + (answers[question.id] === question.correct ? 1 : 0), 0);
    const difficult = lesson.quiz.filter((question) => answers[question.id] !== question.correct).map((question) => question.question);
    saveLessonQuiz(lesson.id, lesson.title, score, lesson.quiz.length, difficult);
  };
  const quizSubmitted = state.lessonProgress[lesson.id]?.quizTotal === lesson.quiz.length;

  return <div className="space-y-6">
    <section className="premium-hero overflow-hidden rounded-[2rem] p-6 text-white sm:p-9">
      <div className="grid gap-7 xl:grid-cols-[1fr_340px] xl:items-end">
        <div>
          <Pill tone="amber"><Sparkles size={14} /> Lernen = persönlicher Modus</Pill>
          <h1 className="mt-5 max-w-4xl font-display text-4xl sm:text-6xl">{stats.started ? "Willkommen zurück. Weiter geht es mit deinem nächsten Lernschritt." : "Willkommen bei Migra Learn. Starte mit Lektion 1."}</h1>
          <p className="mt-4 max-w-3xl leading-7 text-white/68">Du bist bei Lektion {lesson.globalLessonNumber} von {learningLessons.length}. Nach jeder Lektion folgen Quiz, Feedback, Wiederholung und die nächste Empfehlung.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => selectLesson(stats.current)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-amber px-5 py-3 font-bold text-forest shadow-lg shadow-black/10">
              Weiterlernen <ArrowRight size={18} />
            </button>
            <button onClick={() => setPage("academy")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 font-bold text-white">
              Alle Module ansehen
            </button>
          </div>
        </div>
        <div className="rounded-3xl border border-white/12 bg-white/[.07] p-5">
          <div className="text-5xl font-bold text-amber">{stats.percent}%</div>
          <p className="mt-1 text-xs uppercase tracking-wider text-white/52">Kurs abgeschlossen</p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-amber" style={{ width: `${stats.percent}%` }} /></div>
          <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-white/60">
            <span>{stats.completed} abgeschlossen</span>
            <span>{learningLessons.length - stats.completed} offen</span>
            <span>{stats.review.length} Wiederholung</span>
            <span>Modul {module.moduleOrder}: {moduleProgress}%</span>
          </div>
        </div>
      </div>
    </section>

    <div className="grid gap-6 xl:grid-cols-[330px_1fr]">
      <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
        <section className="card-premium p-5">
          <p className="eyebrow">Heute weiterlernen</p>
          <h2 className="mt-2 font-display text-3xl">Lektion {stats.current.globalLessonNumber}</h2>
          <p className="mt-2 text-sm leading-6 text-ink/55 dark:text-white/48">{stats.current.title}</p>
          <button onClick={() => selectLesson(stats.current)} className="btn-primary mt-5 w-full">Aktuelle Lektion öffnen</button>
        </section>
        <section className="card-premium p-5">
          <p className="eyebrow">Navigation</p>
          <div className="mt-4 grid gap-2">
            {(["lesson", "quiz", "review", "glossary"] as const).map((item) => <button key={item} onClick={() => setView(item)} className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 text-left text-sm font-bold transition ${view === item ? "bg-forest text-white dark:bg-amber dark:text-forest" : "bg-sand/60 text-ink/58 hover:bg-sand dark:bg-white/[.05] dark:text-white/52"}`}>
              {item === "lesson" && <BookOpenCheck size={18} />}
              {item === "quiz" && <ClipboardCheck size={18} />}
              {item === "review" && <RotateCcw size={18} />}
              {item === "glossary" && <LibraryBig size={18} />}
              {item === "lesson" ? "Aktuelle Lektion" : item === "quiz" ? "Quiz & Feedback" : item === "review" ? "Wiederholen" : "Glossar"}
            </button>)}
          </div>
        </section>
        <section className="card-premium p-5">
          <p className="eyebrow">Nächste Empfehlung</p>
          {stats.next ? <button onClick={() => selectLesson(stats.next!)} className="mt-3 w-full rounded-2xl border border-sage/15 bg-sage/[.06] p-4 text-left">
            <p className="text-xs font-bold text-sage">Lektion {stats.next.globalLessonNumber}</p>
            <p className="mt-1 font-bold">{stats.next.title}</p>
          </button> : <p className="mt-3 text-sm leading-6">Du bist am Ende des Kurses. Öffne Modul 12 zur Abschlusswiederholung.</p>}
        </section>
      </aside>

      <main className="min-w-0 space-y-5">
        {view === "lesson" && <LessonDetail lesson={lesson} module={module} status={status} progress={progress?.readPercent ?? 0} onMarkRead={markRead} onFinish={finish} onPrevious={() => lesson.previousLessonId && selectLesson(getLessonById(lesson.previousLessonId)!)} onNext={() => lesson.nextLessonId && selectLesson(getLessonById(lesson.nextLessonId)!)} onQuiz={() => setView("quiz")} />}
        {view === "quiz" && <QuizPanel lesson={lesson} answers={answers} setAnswers={setAnswers} onSubmit={submitQuiz} submitted={quizSubmitted} progress={progress} onFinish={finish} />}
        {view === "review" && <ReviewPanel lessons={difficultLessons} selectLesson={selectLesson} state={state} />}
        {view === "glossary" && <GlossaryPanel lesson={lesson} />}
      </main>
    </div>
  </div>;
}

function LessonDetail({
  lesson, module, status, progress, onMarkRead, onFinish, onPrevious, onNext, onQuiz,
}: {
  lesson: LearningLesson;
  module: ReturnType<typeof learningModules.find> extends infer T ? NonNullable<T> : never;
  status: string;
  progress: number;
  onMarkRead: () => void;
  onFinish: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onQuiz: () => void;
}) {
  return <article className="card-premium overflow-hidden">
    <header className="border-b border-black/[.06] p-6 dark:border-white/[.07] sm:p-8">
      <div className="flex flex-wrap gap-2">
        <Pill>Modul {module.moduleOrder}: {module.shortTitle}</Pill>
        <Pill tone="blue">Lektion {lesson.globalLessonNumber} von {learningLessons.length}</Pill>
        <Pill tone={status === "completed" ? "sage" : status === "review-recommended" ? "amber" : "coral"}>{statusLabel[status]}</Pill>
        {lesson.isLegalSensitive && <Pill tone="red"><ShieldAlert size={13} /> rechtlich sensibel</Pill>}
      </div>
      <h2 className="mt-5 font-display text-4xl sm:text-5xl">{lesson.title}</h2>
      <p className="mt-3 max-w-3xl text-lg text-ink/56 dark:text-white/50">{lesson.description}</p>
      <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_220px] lg:items-center">
        <ProgressBar value={progress} />
        <span className="text-sm font-bold text-ink/48 dark:text-white/42">{progress}% gelesen · {lesson.estimatedMinutes} Min.</span>
      </div>
    </header>
    <div className="grid gap-5 p-6 sm:p-8">
      <InfoBlock icon={Target} title="Lernziel" text={lesson.learningObjective} accent />
      <InfoBlock icon={CircleDot} title="Warum ist dieses Thema wichtig?" text={lesson.whyImportant} />
      <InfoBlock icon={BookMarked} title="Einfache Erklärung" text={lesson.simpleExplanation} accent />
      <InfoBlock icon={FileText} title="Vertiefende Erklärung" text={lesson.deepExplanation} />
      <section className="grid gap-4 lg:grid-cols-3">
        <ExampleCard title="Alltag" text={lesson.everydayExample} />
        <ExampleCard title="Behörde" text={lesson.authorityExample} />
        <ExampleCard title="Arbeit / Studium" text={lesson.workStudyExample} />
      </section>
      <section>
        <h3 className="font-display text-3xl">Wichtige Begriffe</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {lesson.keyTerms.map((term) => <div key={term.term} className="rounded-3xl border border-black/[.06] p-5 dark:border-white/[.08]">
            <p className="font-bold text-sage">{term.term}</p>
            <p className="mt-2 text-sm leading-6">{term.simple}</p>
            <p className="mt-2 text-sm leading-6 text-ink/55 dark:text-white/48">{term.detailed}</p>
          </div>)}
        </div>
      </section>
      <section className="grid gap-5 lg:grid-cols-2">
        <ListBlock title="Häufige Fehler" items={lesson.commonMistakes} danger />
        <ListBlock title="Checkliste" items={lesson.checklist} good />
      </section>
      <section className="rounded-3xl border border-amber/20 bg-amber/[.08] p-5">
        <h3 className="font-display text-3xl">Mini-Zusammenfassung</h3>
        <p className="mt-3 leading-7">{lesson.miniSummary}</p>
        <p className="mt-4 rounded-2xl bg-white/65 p-4 text-sm leading-6 dark:bg-white/[.05]"><strong>Reflexionsfrage:</strong> {lesson.reflectionQuestion}</p>
      </section>
      {lesson.isLegalSensitive && <div className="flex gap-3 rounded-3xl border border-red-500/20 bg-red-500/[.06] p-5 text-sm leading-6 text-red-800 dark:text-red-200"><AlertTriangle className="mt-0.5 shrink-0" size={20} />{lesson.legalReviewNote}</div>}
      <SourcesBox lesson={lesson} />
    </div>
    <footer className="flex flex-col gap-3 border-t border-black/[.06] p-5 dark:border-white/[.07] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-2">
        <button onClick={onPrevious} disabled={!lesson.previousLessonId} className="btn-secondary"><ChevronLeft size={17} /> Vorherige</button>
        <button onClick={onNext} disabled={!lesson.nextLessonId} className="btn-secondary">Nächste <ChevronRight size={17} /></button>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button onClick={onMarkRead} className="btn-secondary">Als gelesen markieren</button>
        <button onClick={onQuiz} className="btn-secondary">Quiz starten</button>
        <button onClick={onFinish} className="btn-primary">Als abgeschlossen markieren <CheckCircle2 size={17} /></button>
      </div>
    </footer>
  </article>;
}

function QuizPanel({
  lesson, answers, setAnswers, onSubmit, submitted, progress, onFinish,
}: {
  lesson: LearningLesson;
  answers: Record<string, number>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  onSubmit: () => void;
  submitted: boolean;
  progress?: ProgressState["lessonProgress"][string];
  onFinish: () => void;
}) {
  const score = lesson.quiz.reduce((sum, question) => sum + (answers[question.id] === question.correct ? 1 : 0), 0);
  return <section className="card-premium p-6 sm:p-8">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div><Pill tone="coral"><ClipboardCheck size={14} /> Lernquiz</Pill><h2 className="mt-4 font-display text-4xl">{lesson.title}</h2><p className="mt-2 text-ink/55 dark:text-white/48">Das Quiz hilft dir zu lernen. Falsche Antworten werden erklärt.</p></div>
      {progress?.quizTotal && <div className="rounded-3xl bg-sand p-4 text-center dark:bg-white/[.05]"><p className="text-3xl font-bold">{progress.quizScore}/{progress.quizTotal}</p><p className="text-xs font-bold uppercase text-ink/45 dark:text-white/40">letztes Ergebnis</p></div>}
    </div>
    <div className="mt-7 space-y-5">
      {lesson.quiz.map((question, index) => <article key={question.id} className="rounded-3xl border border-black/[.06] p-5 dark:border-white/[.08]">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-sage">Frage {index + 1} · {question.type}</p>
        <h3 className="mt-2 text-lg font-bold">{question.question}</h3>
        <div className="mt-4 grid gap-2">
          {question.options.map((option, optionIndex) => {
            const selected = answers[question.id] === optionIndex;
            const correct = question.correct === optionIndex;
            const show = submitted;
            return <button key={option} onClick={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))} className={`min-h-12 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${show && correct ? "border-emerald-500/30 bg-emerald-500/[.08]" : show && selected && !correct ? "border-red-500/30 bg-red-500/[.08]" : selected ? "border-sage/30 bg-sage/[.08]" : "border-black/[.06] bg-white hover:border-sage/25 dark:border-white/[.08] dark:bg-white/[.035]"}`}>
              {option}
            </button>;
          })}
        </div>
        {submitted && <div className="mt-4 rounded-2xl bg-sand/70 p-4 text-sm leading-6 dark:bg-white/[.05]"><strong>Erklärung:</strong> {question.explanation}<br /><span className="text-xs text-ink/45 dark:text-white/38">Bezug: {question.sourceReference}</span></div>}
      </article>)}
    </div>
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {submitted ? <p className="rounded-2xl bg-sage/[.08] p-4 text-sm leading-6"><strong>Feedback:</strong> {score / lesson.quiz.length >= .7 ? "Sehr gut. Du kannst zur nächsten Lektion gehen oder diese Lektion abschließen." : "Wiederholung empfohlen. Lies die Erklärung und öffne die Wiederholungsansicht."}</p> : <p className="text-sm text-ink/45 dark:text-white/42">{Object.keys(answers).length}/{lesson.quiz.length} Fragen beantwortet</p>}
      <div className="flex flex-col gap-2 sm:flex-row">
        <button onClick={onSubmit} disabled={Object.keys(answers).length < lesson.quiz.length} className="btn-primary">Quiz auswerten</button>
        <button onClick={onFinish} className="btn-secondary">Lektion abschließen</button>
      </div>
    </div>
  </section>;
}

function ReviewPanel({ lessons, selectLesson, state }: { lessons: LearningLesson[]; selectLesson: (lesson: LearningLesson, view?: "lesson" | "quiz" | "review" | "glossary") => void; state: ProgressState }) {
  return <section className="card-premium p-6 sm:p-8">
    <Pill tone="amber"><RotateCcw size={14} /> Wiederholung</Pill>
    <h2 className="mt-4 font-display text-4xl">Themen, die du wiederholen solltest</h2>
    <p className="mt-2 text-ink/55 dark:text-white/48">Die App empfiehlt Wiederholung bei Fehlern im Lektionsquiz oder bei offenen Kernlektionen.</p>
    <div className="mt-6 grid gap-3">
      {lessons.length ? lessons.map((lesson) => {
        const progress = state.lessonProgress[lesson.id];
        return <button key={lesson.id} onClick={() => selectLesson(lesson, "lesson")} className="rounded-3xl border border-amber/20 bg-amber/[.055] p-5 text-left transition hover:-translate-y-0.5">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[.14em] text-amber-800 dark:text-amber">Lektion {lesson.globalLessonNumber}</p><h3 className="mt-2 font-display text-2xl">{lesson.title}</h3><p className="mt-2 text-sm leading-6 text-ink/52 dark:text-white/45">{progress?.difficultTopics?.[0] ?? lesson.learningObjective}</p></div>
            <ArrowRight className="shrink-0 text-coral" />
          </div>
        </button>;
      }) : <div className="rounded-3xl bg-sand p-6 text-sm dark:bg-white/[.05]">Aktuell gibt es keine Wiederholungsempfehlung.</div>}
    </div>
  </section>;
}

function GlossaryPanel({ lesson }: { lesson: LearningLesson }) {
  const terms = glossaryEntries.filter((entry) => lesson.keyTerms.some((term) => term.term === entry.term)).slice(0, 12);
  return <section className="card-premium p-6 sm:p-8">
    <Pill><LibraryBig size={14} /> Glossar</Pill>
    <h2 className="mt-4 font-display text-4xl">Begriffe zu dieser Lektion</h2>
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {terms.map((entry) => <article key={entry.id} className="rounded-3xl border border-black/[.06] p-5 dark:border-white/[.08]">
        <h3 className="font-display text-2xl">{entry.term}</h3>
        <p className="mt-2 text-sm leading-6">{entry.simpleExplanation}</p>
        <p className="mt-2 text-sm leading-6 text-ink/55 dark:text-white/48">{entry.detailedExplanation}</p>
        <p className="mt-3 rounded-2xl bg-sand p-3 text-xs leading-5 dark:bg-white/[.05]"><strong>Beispiel:</strong> {entry.example}</p>
        <p className="mt-3 text-xs text-ink/40 dark:text-white/36">Quelle: {entry.source.sourcePublisher} · geprüft {entry.lastCheckedAt}</p>
      </article>)}
    </div>
  </section>;
}

function InfoBlock({ icon: Icon, title, text, accent }: { icon: typeof Target; title: string; text: string; accent?: boolean }) {
  return <section className={`rounded-3xl border p-5 ${accent ? "border-sage/20 bg-sage/[.07]" : "border-black/[.06] dark:border-white/[.08]"}`}><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-sand text-forest dark:bg-white/[.08] dark:text-amber"><Icon size={19} /></span><h3 className="font-bold">{title}</h3></div><p className="mt-4 leading-7 text-ink/64 dark:text-white/55">{text}</p></section>;
}

function ExampleCard({ title, text }: { title: string; text: string }) {
  return <article className="rounded-3xl border border-black/[.06] bg-white p-5 dark:border-white/[.08] dark:bg-white/[.035]"><p className="eyebrow">{title}</p><p className="mt-3 text-sm leading-6">{text}</p></article>;
}

function ListBlock({ title, items, good, danger }: { title: string; items: string[]; good?: boolean; danger?: boolean }) {
  return <section className={`rounded-3xl border p-5 ${good ? "border-emerald-500/20 bg-emerald-500/[.06]" : danger ? "border-red-500/20 bg-red-500/[.05]" : "border-black/[.06] dark:border-white/[.08]"}`}><h3 className="font-display text-2xl">{title}</h3><ul className="mt-4 space-y-3">{items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6"><ListChecks className={`mt-0.5 shrink-0 ${danger ? "text-red-500" : good ? "text-emerald-600" : "text-coral"}`} size={17} />{item}</li>)}</ul></section>;
}

function SourcesBox({ lesson }: { lesson: LearningLesson }) {
  return <section className="rounded-3xl border border-black/[.06] p-5 dark:border-white/[.08]">
    <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-sand text-forest dark:bg-white/[.08] dark:text-amber"><LibraryBig size={19} /></span><div><p className="eyebrow">Quellen und Stand</p><h3 className="font-display text-2xl">Stand: {lesson.sourceStand}</h3></div></div>
    <div className="mt-4 grid gap-3 md:grid-cols-2">
      {lesson.sources.map((source) => <a key={`${lesson.id}-${source.sourceTitle}`} href={source.sourceUrl} target="_blank" rel="noreferrer" className="rounded-2xl border border-black/[.05] p-4 transition hover:border-sage/25 dark:border-white/[.07]">
        <div className="flex items-start justify-between gap-3"><p className="font-semibold">{source.sourceTitle}</p><ExternalLink className="shrink-0 text-coral" size={16} /></div>
        <p className="mt-2 text-xs leading-5 text-ink/45 dark:text-white/40">{source.sourcePublisher} · geprüft {source.lastCheckedAt}</p>
      </a>)}
    </div>
    <p className="mt-4 rounded-2xl bg-sand/60 p-4 text-xs leading-5 text-ink/55 dark:bg-white/[.05] dark:text-white/46">{lesson.legalReviewNote}</p>
  </section>;
}
