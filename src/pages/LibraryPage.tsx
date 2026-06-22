import { Copy, Edit3, FileText, Plus, Save, Search, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { templates } from "../data/templates";
import type { Category, Note, ProgressState } from "../types";

export function TemplatesPage() {
  const [category, setCategory] = useState("Alle");
  const [simple, setSimple] = useState(false);
  const [copied, setCopied] = useState("");
  const categories = ["Alle", ...Array.from(new Set(templates.map((t) => t.category)))];
  const filtered = templates.filter((item) => category === "Alle" || item.category === category);
  const copy = async (id: string, text: string) => { await navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(""), 1400); };
  return <div className="space-y-7">
    <div><p className="text-xs font-bold uppercase tracking-[.2em] text-sage">Professionell formulieren</p><h1 className="font-display text-4xl sm:text-5xl">Mustertexte</h1><p className="mt-3 opacity-60">Textbausteine sind Gerüste. Passen Sie Inhalt, Frist, Aktenzeichen und Empfänger immer an.</p></div>
    <div className="flex flex-col gap-3 sm:flex-row"><select className="field sm:max-w-sm" value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((c) => <option key={c}>{c}</option>)}</select><div className="flex rounded-2xl bg-white p-1 shadow-sm dark:bg-white/5"><button onClick={() => setSimple(false)} className={`flex-1 rounded-xl px-4 py-2 text-sm font-bold ${!simple ? "bg-forest text-white dark:bg-amber dark:text-ink" : ""}`}>Formell</button><button onClick={() => setSimple(true)} className={`flex-1 rounded-xl px-4 py-2 text-sm font-bold ${simple ? "bg-forest text-white dark:bg-amber dark:text-ink" : ""}`}>Einfach</button></div></div>
    <div className="grid gap-5 lg:grid-cols-2">{filtered.map((item) => <article key={item.id} className="card flex flex-col"><div className="flex items-start justify-between gap-4"><div><span className="chip bg-sand text-forest dark:bg-white/10 dark:text-white">{item.category}</span><h2 className="mt-4 text-xl font-bold">{item.title}</h2><p className="mt-1 text-sm opacity-50">{item.situation}</p></div><FileText className="shrink-0 text-sage" /></div><pre className="mt-5 flex-1 whitespace-pre-wrap rounded-2xl bg-cloud p-4 font-sans text-sm leading-7 text-ink dark:bg-black/15 dark:text-white/80">{simple ? item.simple : item.formal}</pre><div className="mt-4"><p className="text-xs font-bold uppercase tracking-wider text-sage">Darauf achten</p><p className="mt-1 text-sm opacity-60">{item.tips.join(" · ")}</p></div><button onClick={() => copy(item.id, simple ? item.simple : item.formal)} className="btn-secondary mt-5 self-start"><Copy size={16} />{copied === item.id ? "Kopiert" : "Text kopieren"}</button></article>)}</div>
  </div>;
}

const noteCategories: Category[] = ["Ausländerrecht", "Jobcenter / SGB II", "Integration", "Beratung", "Behördenkommunikation"];
export function NotesPage({ state, upsertNote, deleteNote }: { state: ProgressState; upsertNote: (note: Note) => void; deleteNote: (id: string) => void }) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Note | null>(null);
  const [quickNote, setQuickNote] = useState("");
  const [draft, setDraft] = useState({ title: "", content: "", category: noteCategories[0], link: "" });
  const filtered = useMemo(() => state.notes.filter((n) => `${n.title} ${n.content}`.toLowerCase().includes(search.toLowerCase())), [state.notes, search]);
  const startNew = () => { setEditing({ id: crypto.randomUUID(), title: "", content: "", category: noteCategories[0], updatedAt: "" }); setDraft({ title: "", content: "", category: noteCategories[0], link: "" }); };
  const startEdit = (note: Note) => { setEditing(note); setDraft({ title: note.title, content: note.content, category: note.category, link: note.link ?? "" }); };
  const save = () => { if (!draft.title.trim() || !draft.content.trim() || !editing) return; upsertNote({ id: editing.id, ...draft, updatedAt: new Date().toISOString() }); setEditing(null); };
  const saveQuick = () => {
    const content = quickNote.trim();
    if (!content) return;
    upsertNote({ id: crypto.randomUUID(), title: content.split("\n")[0].slice(0, 55), content, category: "Beratung", updatedAt: new Date().toISOString() });
    setQuickNote("");
  };
  return <div className="space-y-7">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-sage">Ihre Lernmappe</p><h1 className="font-display text-4xl sm:text-5xl">Eigene Notizen</h1><p className="mt-3 opacity-60">Keine echten personenbezogenen Daten eintragen.</p></div><button onClick={startNew} className="btn-primary"><Plus size={18} /> Neue Notiz</button></div>
    <section className="card-premium p-4 sm:hidden">
      <label className="text-xs font-bold uppercase tracking-wider text-sage">Schnellnotiz</label>
      <textarea aria-label="Schnellnotiz" className="field mt-2 min-h-28 resize-none" placeholder="Gedanke, Merksatz oder offene Frage …" value={quickNote} onChange={(e) => setQuickNote(e.target.value)} />
      <button disabled={!quickNote.trim()} onClick={saveQuick} className="btn-primary mt-3 w-full"><Save size={17} /> Schnell speichern</button>
    </section>
    <label className="relative block max-w-xl"><Search className="absolute left-4 top-3.5 opacity-35" size={18} /><input className="field pl-11" placeholder="Notizen durchsuchen …" value={search} onChange={(e) => setSearch(e.target.value)} /></label>
    {editing && <div className="fixed inset-0 z-50 flex items-end bg-black/45 sm:static sm:block sm:bg-transparent"><section className="max-h-[88vh] w-full overflow-y-auto rounded-t-[2rem] border-amber/30 bg-white p-5 dark:bg-[#10211f] sm:card sm:max-h-none sm:rounded-3xl"><div className="flex items-center justify-between"><h2 className="font-display text-2xl">{editing.title ? "Notiz bearbeiten" : "Neue Notiz"}</h2><button onClick={() => setEditing(null)} className="grid h-10 w-10 place-items-center rounded-xl bg-black/5 dark:bg-white/10 sm:hidden" aria-label="Notiz schließen"><X size={18} /></button></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold">Titel<input className="field mt-2 font-normal" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></label><label className="text-sm font-bold">Kategorie<select className="field mt-2 font-normal" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value as Category })}>{noteCategories.map((c) => <option key={c}>{c}</option>)}</select></label></div><label className="mt-4 block text-sm font-bold">Notiz<textarea className="field mt-2 min-h-44 font-normal" value={draft.content} onChange={(e) => setDraft({ ...draft, content: e.target.value })} /></label><label className="mt-4 block text-sm font-bold">Verbindung zu Woche oder Fall (optional)<input className="field mt-2 font-normal" placeholder="z. B. Woche 2 oder Fall 04" value={draft.link} onChange={(e) => setDraft({ ...draft, link: e.target.value })} /></label><div className="mt-5 grid grid-cols-2 gap-3"><button onClick={save} className="btn-primary">Speichern</button><button onClick={() => setEditing(null)} className="btn-secondary">Abbrechen</button></div></section></div>}
    {filtered.length === 0 && !editing ? <div className="card py-16 text-center"><FileText className="mx-auto text-sage" size={38} /><h2 className="mt-4 text-xl font-bold">Noch keine Notizen</h2><p className="mt-2 opacity-50">Halten Sie Regeln, Fallmuster und eigene Formulierungen fest.</p></div> :
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((note) => <article className="card" key={note.id}><div className="flex items-start justify-between gap-3"><span className="chip bg-sand text-forest dark:bg-white/10 dark:text-white">{note.category}</span><div className="flex"><button className="p-2 opacity-45 hover:opacity-100" onClick={() => startEdit(note)} aria-label="Bearbeiten"><Edit3 size={17} /></button><button className="p-2 text-coral opacity-45 hover:opacity-100" onClick={() => deleteNote(note.id)} aria-label="Löschen"><Trash2 size={17} /></button></div></div><h2 className="mt-4 text-xl font-bold">{note.title}</h2><p className="mt-3 line-clamp-5 whitespace-pre-line text-sm leading-6 opacity-65">{note.content}</p><div className="mt-5 flex justify-between text-xs opacity-40"><span>{note.link}</span><span>{new Date(note.updatedAt).toLocaleDateString("de-DE")}</span></div></article>)}</div>}
  </div>;
}
