import {
  BookOpen, BookOpenCheck, BriefcaseBusiness, ClipboardCheck, Database, FileCheck2,
  FileText, GitBranch, GraduationCap, Home, Inbox, Library, Menu, Moon, NotebookPen,
  Scale, ShieldCheck, Sun, X,
} from "lucide-react";
import { useState } from "react";

export type Page = "dashboard" | "assistant" | "academy" | "learn" | "schemas" | "decisions" | "cases" | "quiz" | "documents" | "sources" | "plan" | "cards" | "templates" | "notes" | "exam";

const items: { id: Page; label: string; short: string; icon: typeof Home }[] = [
  { id: "dashboard", label: "Dashboard", short: "Start", icon: Home },
  { id: "assistant", label: "Termin- & Mail-Assistant", short: "Assist", icon: Inbox },
  { id: "academy", label: "Akademie / Module", short: "Module", icon: GraduationCap },
  { id: "learn", label: "Aktiv lernen", short: "Lernen", icon: BookOpenCheck },
  { id: "schemas", label: "Prüfschemata", short: "Schema", icon: GitBranch },
  { id: "decisions", label: "Entscheidungsboxen", short: "Prüfen", icon: Scale },
  { id: "cases", label: "Falltrainer", short: "Fälle", icon: BriefcaseBusiness },
  { id: "quiz", label: "Quiz", short: "Quiz", icon: ClipboardCheck },
  { id: "documents", label: "Dokumente & Checklisten", short: "Dokumente", icon: FileCheck2 },
  { id: "sources", label: "Quellen", short: "Quellen", icon: Database },
  { id: "plan", label: "6-Wochen-Plan", short: "Plan", icon: GraduationCap },
  { id: "cards", label: "Karteikarten", short: "Karten", icon: Library },
  { id: "templates", label: "Mustertexte", short: "Texte", icon: FileText },
  { id: "notes", label: "Notizen", short: "Notizen", icon: NotebookPen },
  { id: "exam", label: "Abschlussprüfung", short: "Prüfung", icon: BookOpen },
];

const mobileItems = items.filter((item) => ["dashboard", "academy", "learn", "cases", "quiz"].includes(item.id));

export function Layout({ page, setPage, dark, setDark, children }: { page: Page; setPage: (page: Page) => void; dark: boolean; setDark: (dark: boolean) => void; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const navigate = (target: Page) => { setPage(target); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const active = items.find((item) => item.id === page);
  return (
    <div className="min-h-screen bg-cloud text-ink transition-colors duration-300 dark:bg-[#091615] dark:text-[#edf5f0]">
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[286px] flex-col border-r border-white/[.06] bg-[#123a36] p-5 text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 dark:bg-[#071f1d] ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-8 flex items-center justify-between">
          <button onClick={() => navigate("dashboard")} className="flex items-center gap-3 text-left">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber to-[#e9bd6d] text-forest shadow-lg shadow-black/15"><ShieldCheck size={24} /></span>
            <span><span className="block font-display text-xl leading-tight">Migration &</span><span className="block text-[10px] font-bold uppercase tracking-[.2em] text-[#e7d5b4]/65">Verwaltung Lerntrainer</span></span>
          </button>
          <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 lg:hidden" aria-label="Menü schließen"><X size={20} /></button>
        </div>
        <nav className="min-h-0 flex-1 space-y-1.5 overflow-y-auto" aria-label="Hauptnavigation">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => navigate(item.id)} aria-current={page === item.id ? "page" : undefined} className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition ${page === item.id ? "bg-white text-forest shadow-lg shadow-black/10" : "text-white/62 hover:bg-white/[.08] hover:text-white"}`}>
                <Icon size={19} className={page === item.id ? "text-coral" : "transition group-hover:text-amber"} />{item.label}
                {page === item.id && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-coral" />}
              </button>
            );
          })}
        </nav>
        <div className="mt-5 rounded-2xl border border-white/[.08] bg-white/[.055] p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#f0d7a4]"><ShieldCheck size={15} /> Lokal & datensparsam</div>
          <p className="mt-2 text-[11px] leading-5 text-white/45">Ihr Fortschritt bleibt ausschließlich in diesem Browser.</p>
        </div>
      </aside>
      {open && <button className="fixed inset-0 z-40 bg-[#051110]/70 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} aria-label="Menü schließen" />}
      <div className="lg:pl-[286px]">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-black/[.045] bg-cloud/86 px-4 backdrop-blur-xl dark:border-white/[.07] dark:bg-[#091615]/88 sm:h-[72px] sm:px-7">
          <button onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-2xl border border-black/[.04] bg-white shadow-sm dark:border-white/[.06] dark:bg-white/[.07] lg:hidden" aria-label="Menü öffnen"><Menu size={20} /></button>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-sage">Lernbereich</p>
            <p className="truncate text-sm font-bold">{active?.label}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden rounded-full bg-sage/[.1] px-3 py-1.5 text-xs font-semibold text-sage sm:inline-flex">Speicherung aktiv</span>
            <button onClick={() => setDark(!dark)} className="grid h-11 w-11 place-items-center rounded-2xl border border-black/[.04] bg-white shadow-sm transition hover:-translate-y-0.5 dark:border-white/[.06] dark:bg-white/[.07]" aria-label={dark ? "Helles Farbschema aktivieren" : "Dunkles Farbschema aktivieren"}>{dark ? <Sun size={19} /> : <Moon size={19} />}</button>
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] p-4 pb-32 sm:p-7 sm:pb-28 lg:p-9 lg:pb-16">{children}</main>
      </div>
      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t border-black/[.06] bg-white/94 px-2 pb-[max(.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_35px_rgba(14,43,39,.12)] backdrop-blur-xl dark:border-white/[.08] dark:bg-[#0c1c1a]/96 lg:hidden" aria-label="Mobile Navigation">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          return <button key={item.id} onClick={() => navigate(item.id)} aria-current={page === item.id ? "page" : undefined} className={`relative flex min-h-[54px] min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[10px] font-bold transition active:scale-95 ${page === item.id ? "bg-coral/[.09] text-coral dark:bg-coral/[.12]" : "text-ink/45 dark:text-white/40"}`}><Icon size={21} strokeWidth={page === item.id ? 2.6 : 2} /><span className="truncate">{item.short}</span>{page === item.id && <span className="absolute -top-2 h-1 w-7 rounded-full bg-coral" />}</button>;
        })}
      </nav>
    </div>
  );
}
