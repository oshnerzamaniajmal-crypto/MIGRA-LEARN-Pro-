import {
  ArrowRight, Award, BookOpenCheck, BriefcaseBusiness, CheckCircle2, Clock3,
  BrainCircuit, Download, Flame, GraduationCap, Lightbulb, Smartphone, Sparkles, Target, TrendingUp,
} from "lucide-react";
import { cases } from "../data/cases";
import { flashcards } from "../data/flashcards";
import { weeks } from "../data/weeks";
import { caseErrorDiary, competencyScores, earnedBadges, learningCoach, totalProgress } from "../lib/progress";
import type { ProgressState } from "../types";
import type { Page } from "../components/Layout";
import { ProgressRing } from "../components/ProgressRing";
import { LegalNotice } from "../components/LegalNotice";
import { legalTopics } from "../data/legalKnowledge";
import { extendedAcademyModules } from "../data/academyContent";

const palette = ["bg-[#c77752]", "bg-[#d7a84d]", "bg-[#6f9b88]", "bg-[#748fa5]", "bg-[#987da5]"];

export function DashboardPage({ state, streak, setPage }: { state: ProgressState; streak: number; setPage: (p: Page) => void }) {
  const progress = totalProgress(state);
  const solved = Object.keys(state.caseScores).length;
  const avgQuiz = state.quizHistory.length
    ? Math.round(state.quizHistory.reduce((sum, q) => sum + q.score / q.total * 100, 0) / state.quizHistory.length)
    : 0;
  const avgCase = solved ? Math.round(Object.values(state.caseScores).reduce((a, b) => a + b, 0) / solved) : 0;
  const nextTask = weeks.flatMap((week) => week.tasks).find((task) => !state.completedTasks.includes(task.id));
  const weekProgress = weeks.map((week) => Math.round(week.tasks.filter((t) => state.completedTasks.includes(t.id)).length / 6 * 100));
  const currentWeekIndex = weekProgress.findIndex((value) => value < 100);
  const competencies = competencyScores(state);
  const strongest = [...competencies].sort((a, b) => b.value - a.value)[0];
  const weakest = [...competencies].sort((a, b) => a.value - b.value)[0];
  const badges = earnedBadges(state, streak);
  const earned = badges.filter((badge) => badge.earned);
  const recent = state.activities.slice(0, 4);
  const completedAcademy = extendedAcademyModules.filter((module) => state.completedTopics.includes(`academy-${module.id}`)).length;
  const academyProgress = Math.round((completedAcademy / extendedAcademyModules.length) * 100);
  const coach = learningCoach(state);
  const errorDiary = caseErrorDiary(state).slice(0, 5);
  const recommendation = weakest.value < 35
    ? `Beginnen Sie heute mit ${weakest.category}. Dort entsteht der größte Fortschritt.`
    : avgCase < 70
      ? "Lösen Sie heute einen Fall langsam mit dem vollständigen Prüfraster."
      : state.difficultCards.length > 8
        ? `Wiederholen Sie ${state.difficultCards.length} vorgemerkte Fachbegriffe.`
        : "Ihr Lernstand ist stabil. Setzen Sie mit der nächsten Wochenaufgabe fort.";

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="premium-hero relative overflow-hidden rounded-[1.75rem] p-6 text-white shadow-[0_30px_80px_rgba(8,31,29,.28)] sm:rounded-[2.5rem] sm:p-10">
        <div className="absolute right-[-6rem] top-[-8rem] h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute right-10 top-6 hidden h-52 w-52 rounded-full bg-amber/15 blur-3xl md:block" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_220px]">
          <div>
            <span className="chip mb-5 border border-white/10 bg-white/10 text-[#f7e6c6]"><Sparkles size={14} /> Persönliches Lerncockpit</span>
            <p className="mb-2 text-sm font-semibold text-white/55">Guten Tag — bereit für den nächsten sicheren Prüfschritt?</p>
            <h1 className="max-w-4xl font-display text-[2.15rem] leading-[1.04] min-[370px]:text-[2.55rem] sm:text-6xl">Vom Wissen zur sicheren Fallentscheidung.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/68">Lernen Sie zuerst Gesetz, Zweck und Prüfschema. Danach folgen Entscheidungsboxen, Fälle, Quiz und Prüfung.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setPage("academy")} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber px-5 py-3.5 font-bold text-forest shadow-lg shadow-black/10 transition hover:-translate-y-0.5">
                Akademie starten <ArrowRight size={18} />
              </button>
              <button onClick={() => setPage("decisions")} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/8 px-5 py-3.5 font-bold text-white transition hover:bg-white/15">
                <BriefcaseBusiness size={18} /> Entscheidung üben
              </button>
            </div>
          </div>
          <div className="mx-auto rounded-[2rem] border border-white/10 bg-black/10 p-5 text-center backdrop-blur-md">
            <ProgressRing value={progress} size={165} label="Gesamtstand" />
            <p className="mt-2 text-xs text-white/50">{state.completedTopics.length + state.completedTasks.length + solved + state.learnedCards.length} Lernaktionen erfasst</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          { icon: GraduationCap, value: `${completedAcademy}/${extendedAcademyModules.length}`, label: "Akademie-Module", detail: `${academyProgress}% vertieft`, tone: "text-[#245f58] bg-[#6f9b88]/12" },
          { icon: BookOpenCheck, value: `${state.completedTopics.filter((id) => legalTopics.some((topic) => topic.id === id)).length}/${legalTopics.length}`, label: "Rechtsthemen", detail: "Gesetz vor Fall", tone: "text-[#245f58] bg-[#6f9b88]/12" },
          { icon: BriefcaseBusiness, value: `${solved}/${cases.length}`, label: "Fälle gelöst", detail: `Ø ${avgCase} Punkte`, tone: "text-[#c77752] bg-[#c77752]/10" },
          { icon: Target, value: `${avgQuiz}%`, label: "Quiz-Sicherheit", detail: `${state.quizHistory.length} Runden`, tone: "text-[#6f9b88] bg-[#6f9b88]/12" },
        ].map(({ icon: Icon, value, label, detail, tone }) => (
          <div className="metric-card group" key={label}>
            <div className={`grid h-10 w-10 place-items-center rounded-2xl sm:h-12 sm:w-12 ${tone}`}><Icon size={21} /></div>
            <div className="mt-4 text-2xl font-bold sm:text-3xl">{value}</div>
            <div className="mt-1 text-sm font-semibold">{label}</div>
            <div className="mt-1 text-xs text-ink/45 dark:text-white/42">{detail}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <section className="card-premium p-5 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sage/[.12] text-sage"><BrainCircuit size={23} /></span>
              <div>
                <p className="eyebrow">Persönlicher Lerncoach</p>
                <h2 className="font-display text-3xl">{coach.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/58 dark:text-white/50">{coach.message}</p>
              </div>
            </div>
            <button onClick={() => setPage(coach.page as Page)} className="btn-primary shrink-0">{coach.action} <ArrowRight size={17} /></button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-5">
            {errorDiary.map((item) => <button key={item.key} onClick={() => setPage(item.page as Page)} className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${item.count ? "border-coral/20 bg-coral/[.055]" : "border-sage/15 bg-sage/[.055]"}`}>
              <div className="text-2xl font-bold">{item.count}</div>
              <p className="mt-1 text-xs font-bold leading-4">{item.title}</p>
              <p className="mt-2 text-[11px] leading-4 text-ink/42 dark:text-white/38">{item.count ? "Fehler in letzten Versuchen" : "aktuell stabil"}</p>
            </button>)}
          </div>
        </section>

        <section className="card-premium p-5 sm:p-7">
          <div className="flex items-start gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber/[.14] text-amber"><Smartphone size={23} /></span>
            <div>
              <p className="eyebrow">Handy-App</p>
              <h2 className="font-display text-3xl">Installierbar ohne App Store</h2>
              <p className="mt-3 text-sm leading-6 text-ink/58 dark:text-white/50">Die App besitzt jetzt Manifest, Icon und Offline-Cache. Auf dem Handy können Sie sie über „Zum Home-Bildschirm“ installieren.</p>
              <div className="mt-4 rounded-2xl bg-sand/50 p-4 text-xs leading-5 dark:bg-white/[.05]">
                <strong>iPhone:</strong> Safari öffnen → Teilen → Zum Home-Bildschirm.<br />
                <strong>Android:</strong> Chrome öffnen → Menü → App installieren.
              </div>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2 text-xs font-bold text-sage"><Download size={15} /> PWA vorbereitet · lokale Speicherung bleibt aktiv</div>
        </section>
      </div>

      <section className="-mx-4 overflow-x-auto px-4 pb-1 sm:hidden">
        <div className="flex w-max gap-3">
          {competencies.map((item) => (
            <button key={item.category} onClick={() => setPage("plan")} className="flex w-[132px] flex-col items-center rounded-[1.35rem] border border-black/[.045] bg-white p-4 shadow-sm dark:border-white/[.07] dark:bg-[#10211f]">
              <ProgressRing value={item.value} size={78} />
              <span className="mt-2 line-clamp-2 text-center text-xs font-bold leading-4">{item.category}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
        <section className="card-premium p-5 sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="eyebrow">Kompetenzprofil</p><h2 className="font-display text-3xl">Wo Sie sicher sind — und wo Wachstum liegt</h2></div>
            <span className="chip bg-sage/12 text-sage"><TrendingUp size={14} /> stärkster Bereich: {strongest.category}</span>
          </div>
          <div className="mt-7 space-y-5">
            {competencies.map((item, index) => (
              <div key={item.category}>
                <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                  <span className="font-semibold">{item.category}</span>
                  <span className="tabular-nums font-bold">{item.value}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-forest/[.07] dark:bg-white/[.07]">
                  <div className={`h-full rounded-full ${palette[index]} transition-all duration-700`} style={{ width: `${Math.max(item.value, 2)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-7 flex gap-3 rounded-2xl border border-amber/15 bg-amber/[.08] p-4">
            <Lightbulb className="mt-0.5 shrink-0 text-amber" size={20} />
            <div><p className="text-xs font-bold uppercase tracking-wider text-amber">Lernempfehlung</p><p className="mt-1 text-sm leading-6">{recommendation}</p></div>
          </div>
        </section>

        <section className="card-premium p-5 sm:p-7">
          <div className="flex items-center justify-between"><div><p className="eyebrow">Heute</p><h2 className="font-display text-3xl">Nächster Fokus</h2></div><Clock3 className="text-sage" /></div>
          {nextTask ? (
            <div className="mt-6">
              <span className="chip bg-forest text-white dark:bg-amber dark:text-[#132b29]">{nextTask.type} · {nextTask.duration} Min.</span>
              <h3 className="mt-4 text-xl font-bold">{nextTask.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/55 dark:text-white/50">Eine klar abgegrenzte Einheit. Danach wird Ihr Wochenfortschritt automatisch aktualisiert.</p>
              <button onClick={() => setPage("plan")} className="btn-primary mt-5 w-full">Aufgabe öffnen <ArrowRight size={17} /></button>
            </div>
          ) : <div className="mt-6"><CheckCircle2 className="text-sage" size={34} /><h3 className="mt-3 text-xl font-bold">Lernplan abgeschlossen</h3><button onClick={() => setPage("exam")} className="btn-primary mt-5 w-full">Zur Abschlussprüfung</button></div>}
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="card-premium p-5 sm:p-7">
          <div className="mb-6 flex items-end justify-between">
            <div><p className="eyebrow">Sechs-Wochen-Pfad</p><h2 className="font-display text-3xl">Ihr Lernfahrplan</h2></div>
            <span className="chip bg-sand text-forest dark:bg-white/[.07] dark:text-white">Woche {currentWeekIndex < 0 ? 6 : currentWeekIndex + 1}</span>
          </div>
          <div className="space-y-4">
            {weeks.map((week, index) => (
              <button onClick={() => setPage("plan")} key={week.id} className="group grid w-full grid-cols-[42px_1fr_auto] items-center gap-3 rounded-2xl p-2 text-left transition hover:bg-sand/35 dark:hover:bg-white/[.04]">
                <span className={`grid h-10 w-10 place-items-center rounded-xl text-sm font-bold ${weekProgress[index] === 100 ? "bg-sage text-white" : index === currentWeekIndex ? "bg-amber text-forest" : "bg-sand dark:bg-white/[.07]"}`}>{weekProgress[index] === 100 ? <CheckCircle2 size={17} /> : week.id}</span>
                <div><div className="mb-1.5 flex justify-between gap-3 text-sm font-semibold"><span>{week.shortTitle}</span><span>{weekProgress[index]}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-forest/[.07] dark:bg-white/[.07]"><div className="h-full rounded-full bg-amber" style={{ width: `${weekProgress[index]}%` }} /></div></div>
                <ArrowRight size={16} className="opacity-25 transition group-hover:translate-x-1 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </section>

        <section className="card-premium p-5 sm:p-7">
          <div className="flex items-center justify-between"><div><p className="eyebrow">Erfolge</p><h2 className="font-display text-3xl">Badges mit Bedeutung</h2></div><Award className="text-amber" /></div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {badges.slice(0, 6).map((badge) => (
              <div key={badge.id} className={`relative overflow-hidden rounded-2xl border p-4 ${badge.earned ? "border-amber/25 bg-amber/[.09]" : "border-black/5 bg-black/[.018] dark:border-white/[.07] dark:bg-white/[.025]"}`}>
                <div className={`grid h-9 w-9 place-items-center rounded-xl ${badge.earned ? "bg-amber text-forest" : "bg-black/[.05] text-ink/30 dark:bg-white/[.07] dark:text-white/30"}`}><Award size={17} /></div>
                <p className="mt-3 text-sm font-bold">{badge.name}</p>
                <p className="mt-1 text-[11px] leading-4 text-ink/45 dark:text-white/40">{badge.description}</p>
                {!badge.earned && <div className="mt-3 h-1 overflow-hidden rounded-full bg-black/[.06] dark:bg-white/[.08]"><div className="h-full bg-amber" style={{ width: `${Math.min(100, badge.current / badge.target * 100)}%` }} /></div>}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <section className="card-premium p-5 sm:p-7">
          <p className="eyebrow">Aktivität</p><h2 className="font-display text-3xl">Zuletzt gelernt</h2>
          <div className="mt-5 space-y-4">
            {recent.length ? recent.map((activity) => (
              <div className="flex gap-3" key={`${activity.date}-${activity.text}`}>
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sage/12 text-sage"><BookOpenCheck size={14} /></span>
                <div><p className="text-sm font-semibold">{activity.text}</p><p className="mt-1 text-xs opacity-40">{new Date(activity.date).toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" })}</p></div>
              </div>
            )) : <div className="rounded-2xl bg-sand/35 p-5 text-sm dark:bg-white/[.04]">Ihre ersten Lernaktivitäten erscheinen hier automatisch.</div>}
          </div>
        </section>
        <section className="card-premium overflow-hidden p-0">
          <div className="grid h-full md:grid-cols-[.7fr_1.3fr]">
            <div className="grid min-h-44 place-items-center bg-forest p-7 text-white dark:bg-[#102b29]"><GraduationCap size={62} className="text-amber" /></div>
            <div className="p-6 sm:p-7"><p className="eyebrow">Lernprinzip</p><h2 className="font-display text-3xl">Erst verstehen, dann prüfen.</h2><p className="mt-3 text-sm leading-6 text-ink/58 dark:text-white/50">Gesetz, Zweck, Begriffe und Voraussetzungen kommen vor der Fallentscheidung. So entsteht übertragbares Wissen statt bloßer Antwortmuster.</p><button onClick={() => setPage("academy")} className="mt-5 text-sm font-bold text-coral">Akademie öffnen →</button></div>
          </div>
        </section>
      </div>

      <LegalNotice />
    </div>
  );
}
