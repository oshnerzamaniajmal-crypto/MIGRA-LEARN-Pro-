import { Check, ChevronDown, Clock, ListChecks, Quote } from "lucide-react";
import { useState } from "react";
import { cases } from "../data/cases";
import { weeks } from "../data/weeks";
import type { ProgressState } from "../types";

export function PlanPage({ state, toggleTask }: { state: ProgressState; toggleTask: (id: string, title: string) => void }) {
  const [active, setActive] = useState(1);
  const week = weeks[active - 1];
  const relatedCases = cases.filter((item) => item.week === active).slice(0, 5);
  const completed = week.tasks.filter((task) => state.completedTasks.includes(task.id)).length;
  return (
    <div className="space-y-7">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.2em] text-sage">Ihr Curriculum</p>
        <h1 className="font-display text-4xl sm:text-5xl">Der 6-Wochen-Lernplan</h1>
        <p className="mt-3 max-w-3xl opacity-60">Jede Woche verbindet Wissen, aktive Wiederholung, Fallarbeit und professionelle Sprache.</p>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {weeks.map((item) => {
          const done = item.tasks.filter((t) => state.completedTasks.includes(t.id)).length;
          return <button key={item.id} onClick={() => setActive(item.id)} className={`rounded-2xl border p-3 text-left transition sm:p-4 ${active === item.id ? "border-forest bg-forest text-white dark:border-amber dark:bg-amber dark:text-ink" : "border-black/5 bg-white hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5"}`}><span className="block text-xs opacity-60">Woche</span><span className="text-xl font-bold">{item.id}</span><span className="mt-2 hidden text-xs sm:block">{done}/6 erledigt</span></button>;
        })}
      </div>
      <section className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-soft dark:border-white/10 dark:bg-white/[.06]">
        <div className="grid gap-6 bg-sand/55 p-6 dark:bg-white/5 sm:p-8 lg:grid-cols-[1fr_auto]">
          <div><span className="chip bg-forest text-white dark:bg-amber dark:text-ink">{week.category}</span><h2 className="mt-4 font-display text-3xl sm:text-4xl">Woche {week.id}: {week.title}</h2><p className="mt-3 max-w-3xl opacity-65">{week.goal}</p></div>
          <div className="flex items-center gap-4"><div className="text-right"><div className="text-3xl font-bold">{Math.round(completed / 6 * 100)}%</div><div className="text-xs opacity-55">Wochenfortschritt</div></div><div className="h-20 w-3 overflow-hidden rounded-full bg-white dark:bg-white/10"><div className="mt-auto w-full rounded-full bg-coral transition-all" style={{ height: `${completed / 6 * 100}%`, transform: `translateY(${100 - completed / 6 * 100}%)` }} /></div></div>
        </div>
        <div className="grid gap-8 p-6 sm:p-8 xl:grid-cols-[1.25fr_.75fr]">
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold"><ListChecks size={20} /> Ihre sechs Lerntage</h3>
            <div className="space-y-3">
              {week.tasks.map((task) => {
                const checked = state.completedTasks.includes(task.id);
                return <button key={task.id} onClick={() => toggleTask(task.id, task.title)} className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${checked ? "border-sage/20 bg-sage/10" : "border-black/5 hover:border-amber dark:border-white/10"}`}>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-bold ${checked ? "bg-forest text-white dark:bg-amber dark:text-ink" : "bg-sand dark:bg-white/10"}`}>{checked ? <Check size={18} /> : task.day}</span>
                  <span className="min-w-0 flex-1"><span className="block text-xs font-bold uppercase tracking-wider text-sage">Tag {task.day} · {task.type}</span><span className={`block font-semibold ${checked ? "line-through opacity-50" : ""}`}>{task.title}</span></span>
                  <span className="hidden items-center gap-1 text-xs opacity-45 sm:flex"><Clock size={14} />{task.duration} Min.</span>
                </button>;
              })}
            </div>
          </div>
          <aside className="space-y-5">
            <div className="rounded-3xl bg-forest p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-sand/60">Themen dieser Woche</p>
              <div className="mt-4 flex flex-wrap gap-2">{week.topics.map((topic) => <span key={topic} className="chip bg-white/10 text-white/80">{topic}</span>)}</div>
            </div>
            <details className="group rounded-3xl border border-black/5 p-5 open:bg-sand/35 dark:border-white/10 dark:open:bg-white/5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold">20 Fachbegriffe <ChevronDown className="transition group-open:rotate-180" size={18} /></summary>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm opacity-70">{week.terms.map((term) => <span key={term}>• {term}</span>)}</div>
            </details>
            <div className="rounded-3xl border border-coral/20 bg-coral/10 p-5"><Quote className="mb-3 text-coral" /><p className="font-display text-xl">{week.reflection}</p></div>
            <div className="rounded-3xl border border-black/5 p-5 dark:border-white/10"><p className="text-xs font-bold uppercase tracking-wider text-sage">5 Übungsfälle</p><ul className="mt-3 space-y-2 text-sm">{relatedCases.map((item) => <li key={item.id}>Fall {item.number}: {item.person.issue}</li>)}</ul><p className="mt-4 text-sm font-bold text-coral">Wochenprüfung: {week.examTitle}</p></div>
          </aside>
        </div>
      </section>
    </div>
  );
}
