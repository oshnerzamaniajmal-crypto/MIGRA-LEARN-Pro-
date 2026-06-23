import {
  AlertTriangle, BookOpenCheck, Check, CheckCircle2, ChevronRight, CircleHelp,
  ExternalLink, FileCheck2, FileText, Filter, Gavel, GraduationCap, Info,
  Landmark, ListChecks, Printer, Scale, Search, ShieldAlert, ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { documentChecklists, legalSources, legalTopics } from "../data/legalKnowledge";
import type { LegalArea, LegalTopic, ProgressState } from "../types";

const areas: ("Alle" | LegalArea)[] = ["Alle", "Grundlagen", "Visum", "Erwerbsmigration", "Familie", "Schutz", "Duldung & Bleiberecht"];

function StatusBadge({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "yellow" | "red" | "blue" }) {
  const styles = {
    green: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    yellow: "border-amber-500/25 bg-amber-500/12 text-amber-800 dark:text-amber-300",
    red: "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300",
    blue: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  };
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${styles[tone]}`}>{children}</span>;
}

function TopicMeta({ topic }: { topic: LegalTopic }) {
  return (
    <div className="flex flex-wrap gap-2">
      <StatusBadge>{topic.area}</StatusBadge>
      <StatusBadge tone="blue"><Scale size={13} />{topic.legalBasis.join(" · ")}</StatusBadge>
      <StatusBadge tone="yellow">Rechtsstand: {topic.legalStatus.replace("Geprüft am ", "")}</StatusBadge>
    </div>
  );
}

const modes = [
  ["einfach", "Einfach erklärt"],
  ["kommentar", "Kommentar & System"],
  ["pruefung", "Voraussetzungen"],
  ["praxis", "Behördenpraxis"],
  ["faelle", "Beispiele"],
] as const;

export function LearnPage({
  state, toggleTopic,
}: {
  state: ProgressState;
  toggleTopic: (id: string, title: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState<(typeof areas)[number]>("Alle");
  const [activeId, setActiveId] = useState(legalTopics[0].id);
  const [mode, setMode] = useState<(typeof modes)[number][0]>("einfach");
  const filtered = useMemo(() => legalTopics.filter((topic) =>
    (area === "Alle" || topic.area === area) &&
    `${topic.title} ${topic.subtitle} ${topic.legalBasis.join(" ")} ${topic.keyTerms.map((item) => item.term).join(" ")}`
      .toLowerCase().includes(query.toLowerCase()),
  ), [area, query]);
  const topic = legalTopics.find((item) => item.id === activeId) ?? filtered[0] ?? legalTopics[0];
  const complete = state.completedTopics.includes(topic.id);
  const progress = Math.round(state.completedTopics.length / legalTopics.length * 100);

  return <div className="space-y-6">
    <section className="premium-hero overflow-hidden rounded-[2rem] p-6 text-white sm:p-9">
      <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
        <div>
          <StatusBadge tone="yellow"><GraduationCap size={14} />Erst lernen, dann entscheiden</StatusBadge>
          <h1 className="mt-5 max-w-4xl font-display text-4xl sm:text-6xl">Aufenthaltsrecht verstehen – nicht nur Antworten auswendig lernen.</h1>
          <p className="mt-4 max-w-3xl leading-7 text-white/64">Gesetzesnahe Zusammenfassung, didaktischer Kommentar, Zweck, Systematik, Voraussetzungen, Behördenpraxis und Fälle in einer festen Lernreihenfolge.</p>
        </div>
        <div className="min-w-[190px] rounded-3xl border border-white/12 bg-white/[.07] p-5">
          <div className="text-4xl font-bold text-amber">{progress}%</div>
          <div className="mt-1 text-xs uppercase tracking-wider text-white/50">{state.completedTopics.length}/{legalTopics.length} Themen gelernt</div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-amber" style={{ width: `${progress}%` }} /></div>
        </div>
      </div>
    </section>

    <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
      <aside className="space-y-4">
        <div className="card-premium p-4">
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/35 dark:text-white/35" size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Paragraf oder Thema suchen …" className="w-full rounded-2xl border border-black/[.06] bg-white py-3.5 pl-11 pr-4 text-sm outline-none focus:border-sage dark:border-white/[.08] dark:bg-white/[.06]" />
          </label>
          <label className="relative mt-3 block">
            <Filter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/35 dark:text-white/35" size={17} />
            <select value={area} onChange={(event) => setArea(event.target.value as (typeof areas)[number])} className="w-full appearance-none rounded-2xl border border-black/[.06] bg-white py-3.5 pl-11 pr-4 text-sm outline-none dark:border-white/[.08] dark:bg-[#122321]">
              {areas.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <div className="space-y-2">
          {filtered.map((item) => {
            const done = state.completedTopics.includes(item.id);
            return <button key={item.id} onClick={() => setActiveId(item.id)} className={`w-full rounded-2xl border p-4 text-left transition ${topic.id === item.id ? "border-sage/35 bg-sage/[.09] shadow-sm" : "border-black/[.05] bg-white hover:border-sage/25 dark:border-white/[.07] dark:bg-white/[.04]"}`}>
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${done ? "bg-sage text-white" : "bg-sand text-forest dark:bg-white/[.08] dark:text-amber"}`}>{done ? <Check size={17} /> : <BookOpenCheck size={17} />}</span>
                <div className="min-w-0"><p className="font-bold">{item.title}</p><p className="mt-1 text-xs leading-5 text-ink/45 dark:text-white/42">{item.subtitle}</p></div>
              </div>
            </button>;
          })}
        </div>
      </aside>

      <article className="min-w-0 space-y-5">
        <section className="card-premium overflow-hidden">
          <div className="border-b border-black/[.06] p-6 dark:border-white/[.07] sm:p-8">
            <TopicMeta topic={topic} />
            <h2 className="mt-5 font-display text-4xl sm:text-5xl">{topic.title}</h2>
            <p className="mt-3 max-w-3xl text-lg text-ink/55 dark:text-white/50">{topic.subtitle}</p>
            {topic.warning && <div className="mt-5 flex gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/[.09] p-4 text-sm leading-6 text-amber-900 dark:text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={19} /><span>{topic.warning}</span></div>}
          </div>
          <div className="overflow-x-auto border-b border-black/[.05] px-4 dark:border-white/[.07] sm:px-6">
            <div className="flex min-w-max gap-1 py-3">
              {modes.map(([id, label]) => <button key={id} onClick={() => setMode(id)} className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${mode === id ? "bg-forest text-white dark:bg-amber dark:text-forest" : "text-ink/48 hover:bg-sand dark:text-white/45 dark:hover:bg-white/[.06]"}`}>{label}</button>)}
            </div>
          </div>
          <div className="p-6 sm:p-8">
            {mode === "einfach" && <div className="grid gap-5 lg:grid-cols-2">
              <InfoCard icon={FileText} title="Gesetzesnahe Zusammenfassung" text={topic.lawSummary} />
              <InfoCard icon={GraduationCap} title="Einfach erklärt" text={topic.simpleExplanation} accent />
              <InfoCard icon={ShieldCheck} title="Zweck der Regelung" text={topic.purpose} />
              <div className="rounded-3xl bg-forest p-6 text-white"><p className="text-xs font-bold uppercase tracking-[.16em] text-amber">Merksätze</p><ul className="mt-4 space-y-3">{topic.memoryAids.map((item) => <li className="flex gap-3 text-sm leading-6" key={item}><CheckCircle2 className="mt-0.5 shrink-0 text-amber" size={18} />{item}</li>)}</ul></div>
              <div className="lg:col-span-2"><h3 className="font-display text-3xl">Wichtige Begriffe</h3><div className="mt-4 grid gap-3 sm:grid-cols-2">{topic.keyTerms.map((item) => <div key={item.term} className="rounded-2xl border border-black/[.06] p-4 dark:border-white/[.08]"><p className="font-bold text-sage">{item.term}</p><p className="mt-2 text-sm leading-6 text-ink/55 dark:text-white/48">{item.explanation}</p></div>)}</div></div>
            </div>}
            {mode === "kommentar" && <div className="space-y-5">
              <InfoCard icon={Scale} title="Systematische Einordnung" text={topic.systematics} accent />
              <div className="grid gap-5 lg:grid-cols-2"><ListCard title="Rechtsfolge" items={[topic.legalConsequence]} /><ListCard title="Anspruch, Bindung oder Ermessen?" items={[topic.decisionType]} /></div>
              <ListCard title="Didaktischer Kommentar: Worauf es wirklich ankommt" items={topic.practice} />
            </div>}
            {mode === "pruefung" && <div className="grid gap-5 lg:grid-cols-2">
              <ListCard title="Voraussetzungen" items={topic.requirements} good />
              <ListCard title="Ausschlüsse und Probleme" items={topic.exclusions} danger />
              <ListCard title="Typische Nachweise" items={topic.documents} />
              <ListCard title="Behörden und Beteiligte" items={topic.authorities} />
              <div className="lg:col-span-2"><ListCard title="Fristen und Zeitpunkte" items={topic.deadlines} /></div>
            </div>}
            {mode === "praxis" && <div className="grid gap-5 lg:grid-cols-2">
              <ListCard title="Behördenperspektive" items={topic.practice} good />
              <ListCard title="Typische Fehler" items={topic.typicalErrors} danger />
              <div className="lg:col-span-2 rounded-3xl border border-blue-500/20 bg-blue-500/[.07] p-6"><p className="font-bold text-blue-800 dark:text-blue-300">Professionelle Formulierung</p><p className="mt-3 leading-7 text-ink/65 dark:text-white/55">„Nach derzeitigem Aktenstand ist die Voraussetzung noch nicht abschließend geklärt. Zuerst sind Rechtsgrundlage, Originaldokumente und mögliche Ausnahmen zu prüfen. Eine verbindliche Entscheidung trifft die zuständige Behörde.“</p></div>
            </div>}
            {mode === "faelle" && <div className="grid gap-5">
              <ExampleCard tone="green" label="Positiver Lernfall" text={topic.examples.positive} />
              <ExampleCard tone="red" label="Negativer Lernfall" text={topic.examples.negative} />
              <ExampleCard tone="blue" label="Schwieriger Grenzfall" text={topic.examples.borderline} />
            </div>}
          </div>
          <div className="flex flex-col gap-3 border-t border-black/[.06] p-5 dark:border-white/[.07] sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink/40 dark:text-white/38">Lerninhalt mit Quellenkennzeichnung · keine Rechtsberatung</p>
            <button onClick={() => toggleTopic(topic.id, topic.title)} className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold ${complete ? "bg-sage/[.12] text-sage" : "bg-coral text-white"}`}>{complete ? <><CheckCircle2 size={18} />Als gelernt markiert</> : <>Lerneinheit abschließen <ChevronRight size={18} /></>}</button>
          </div>
        </section>
        <SourceStrip topic={topic} />
      </article>
    </div>
  </div>;
}

function InfoCard({ icon: Icon, title, text, accent = false }: { icon: typeof Info; title: string; text: string; accent?: boolean }) {
  return <div className={`rounded-3xl border p-6 ${accent ? "border-sage/20 bg-sage/[.07]" : "border-black/[.06] dark:border-white/[.08]"}`}><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-sand text-forest dark:bg-white/[.08] dark:text-amber"><Icon size={19} /></span><h3 className="font-bold">{title}</h3></div><p className="mt-4 leading-7 text-ink/62 dark:text-white/53">{text}</p></div>;
}

function ListCard({ title, items, good, danger }: { title: string; items: string[]; good?: boolean; danger?: boolean }) {
  return <div className={`rounded-3xl border p-6 ${good ? "border-emerald-500/20 bg-emerald-500/[.06]" : danger ? "border-red-500/20 bg-red-500/[.05]" : "border-black/[.06] dark:border-white/[.08]"}`}><h3 className="font-display text-2xl">{title}</h3><ul className="mt-4 space-y-3">{items.map((item) => <li className="flex gap-3 text-sm leading-6" key={item}><span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${danger ? "bg-red-500" : good ? "bg-emerald-500" : "bg-coral"}`} />{item}</li>)}</ul></div>;
}

function ExampleCard({ tone, label, text }: { tone: "green" | "red" | "blue"; label: string; text: string }) {
  const style = tone === "green" ? "border-emerald-500/20 bg-emerald-500/[.06]" : tone === "red" ? "border-red-500/20 bg-red-500/[.05]" : "border-blue-500/20 bg-blue-500/[.06]";
  return <div className={`rounded-3xl border p-6 ${style}`}><StatusBadge tone={tone}>{label}</StatusBadge><p className="mt-4 leading-7">{text}</p></div>;
}

function SourceStrip({ topic }: { topic: LegalTopic }) {
  const sources = legalSources.filter((source) => topic.sourceIds.includes(source.id));
  return <section className="card-premium p-6"><div className="flex items-center gap-3"><Landmark className="text-sage" /><div><p className="eyebrow">Quellenkontrolle</p><h3 className="font-display text-2xl">{sources.length} zugeordnete Quellen</h3></div></div><div className="mt-5 grid gap-3 md:grid-cols-2">{sources.map((source) => <div className="rounded-2xl border border-black/[.05] p-4 dark:border-white/[.07]" key={source.id}><div className="flex items-start justify-between gap-3"><p className="font-semibold">{source.title}</p><StatusBadge tone={source.trust === "A" ? "green" : source.outdated ? "red" : "blue"}>Stufe {source.trust}</StatusBadge></div><p className="mt-2 text-xs leading-5 text-ink/45 dark:text-white/40">{source.publisher} · geprüft {source.checkedAt}</p></div>)}</div></section>;
}

export function SchemaPage() {
  const [activeId, setActiveId] = useState(legalTopics[0].id);
  const [checked, setChecked] = useState<number[]>([]);
  const topic = legalTopics.find((item) => item.id === activeId) ?? legalTopics[0];
  const toggle = (index: number) => setChecked((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  return <div className="space-y-6">
    <div><p className="eyebrow">Interaktives Prüfraster</p><h1 className="font-display text-4xl sm:text-6xl">Vom Sachverhalt zur begründeten Prüfung</h1><p className="mt-3 max-w-3xl text-ink/55 dark:text-white/48">Das Schema erzwingt die richtige Reihenfolge. Es ersetzt keine rechtliche Subsumtion.</p></div>
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <aside className="card-premium h-fit p-4"><label className="text-xs font-bold uppercase tracking-wider text-sage">Thema auswählen</label><select value={activeId} onChange={(event) => { setActiveId(event.target.value); setChecked([]); }} className="mt-3 w-full rounded-2xl border border-black/[.06] bg-white p-3.5 dark:border-white/[.08] dark:bg-[#122321]">{legalTopics.map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}</select><div className="mt-5 rounded-2xl bg-sand p-4 text-sm leading-6 text-forest dark:bg-white/[.06] dark:text-white/60"><strong>{checked.length}/10 Schritte</strong><br />Haken bedeutet nur: geprüft – nicht automatisch erfüllt.</div></aside>
      <section className="card-premium p-5 sm:p-8"><TopicMeta topic={topic} /><h2 className="mt-5 font-display text-4xl">{topic.title}</h2><div className="mt-7 space-y-3">{topic.scheme.map((step, index) => <button onClick={() => toggle(index)} key={step} className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition ${checked.includes(index) ? "border-sage/25 bg-sage/[.08]" : "border-black/[.06] hover:border-sage/25 dark:border-white/[.08]"}`}><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-bold ${checked.includes(index) ? "bg-sage text-white" : "bg-sand text-forest dark:bg-white/[.08] dark:text-amber"}`}>{checked.includes(index) ? <Check size={18} /> : index + 1}</span><div><p className="font-bold">{step}</p><p className="mt-1 text-xs text-ink/42 dark:text-white/38">Ergebnis und offene Tatsachen in der Akte dokumentieren.</p></div></button>)}</div></section>
    </div>
  </div>;
}

type Answer = "yes" | "no" | "unknown";
type Criterion = { id: string; label: string; hint: string };
const visaCriteria: Criterion[] = [
  { id: "over90", label: "Aufenthalt länger als 90 Tage geplant?", hint: "Dann ist regelmäßig das nationale Visum D der Ausgangspunkt." },
  { id: "purpose", label: "Aufenthaltszweck eindeutig bestimmt?", hint: "Arbeit, Studium, Ausbildung, Familie, Forschung oder anderer Zweck." },
  { id: "passport", label: "Gültiger Pass oder anerkannter Passersatz vorhanden?", hint: "Ausnahmen niemals pauschal annehmen." },
  { id: "livelihood", label: "Lebensunterhalt nach der Zwecknorm geklärt?", hint: "Ausnahmen und besondere Regelungen mitprüfen." },
  { id: "insurance", label: "Ausreichender Krankenversicherungsschutz nachgewiesen?", hint: "Zeitpunkt und Umfang beachten." },
  { id: "coreDoc", label: "Zentraler Zwecknachweis vorhanden?", hint: "Arbeitsvertrag, Zulassung, Ausbildungsvertrag oder Familienurkunde." },
  { id: "authority", label: "Beteiligung von Auslandsvertretung, ABH und ggf. BA geklärt?", hint: "Zuständigkeiten nicht vermischen." },
  { id: "recognition", label: "Erforderliche Qualifikation oder Anerkennung geklärt?", hint: "Nur relevant, soweit der Zweck dies verlangt." },
  { id: "security", label: "Keine erheblichen Sicherheits- oder Ausweisungsfragen bekannt?", hint: "Bei Unsicherheit vertiefte Behördenprüfung." },
  { id: "ban", label: "Keine Einreise- oder Aufenthaltssperre bekannt?", hint: "Sperren müssen vor dem normalen Prüfweg geklärt werden." },
];
const protectionCriteria: Criterion[] = [
  { id: "persecution", label: "Gezielte schwerwiegende Verfolgung schlüssig vorgetragen?", hint: "Nicht nur allgemeine Unsicherheit." },
  { id: "reason", label: "Verfolgungsgrund rechtlich erkennbar?", hint: "Zum Beispiel politische Überzeugung, Religion oder soziale Gruppe." },
  { id: "seriousHarm", label: "Droht unabhängig davon ein ernsthafter Schaden?", hint: "Subsidiären Schutz eigenständig prüfen." },
  { id: "returnRisk", label: "Besteht eine erhebliche konkrete Rückkehrgefahr?", hint: "Nationales Abschiebungsverbot gesondert prüfen." },
  { id: "individual", label: "Individuelle Betroffenheit nachvollziehbar?", hint: "Persönliche Umstände mit Herkunftslage verbinden." },
  { id: "evidence", label: "Aussage und Beweismittel geordnet?", hint: "Glaubhaftigkeit ist eine Gesamtschau." },
  { id: "stateProtection", label: "Kein wirksamer Schutz durch den Herkunftsstaat?", hint: "Schutzfähigkeit und Schutzbereitschaft unterscheiden." },
  { id: "internal", label: "Keine sichere und zumutbare interne Schutzalternative?", hint: "Region, Erreichbarkeit und Lebensbedingungen prüfen." },
  { id: "exclusion", label: "Keine Ausschlussgründe erkennbar?", hint: "Bei Anhaltspunkten professionelle Prüfung." },
  { id: "hearing", label: "Anhörung und Dolmetschsprache vorbereitet?", hint: "Chronologie, Dokumente und besondere Bedürfnisse." },
];

export function DecisionPage() {
  const [tool, setTool] = useState<"visa" | "protection">("visa");
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const criteria = tool === "visa" ? visaCriteria : protectionCriteria;
  const answer = (id: string, value: Answer) => setAnswers((current) => ({ ...current, [id]: value }));
  const unknown = criteria.filter((item) => !answers[item.id] || answers[item.id] === "unknown");
  const negatives = criteria.filter((item) => answers[item.id] === "no");
  const visaBlocker = tool === "visa" && (answers.purpose === "no" || answers.ban === "no" || answers.security === "no");
  const protectionDirection = answers.persecution === "yes" && answers.reason === "yes"
    ? "Flüchtlingsschutz vertieft prüfen"
    : answers.seriousHarm === "yes" ? "Subsidiären Schutz vertieft prüfen"
      : answers.returnRisk === "yes" ? "Nationales Abschiebungsverbot vertieft prüfen" : "Schutzform noch nicht einordenbar";
  const resultTone = visaBlocker ? "red" : unknown.length ? "yellow" : negatives.length ? "blue" : "green";
  const resultTitle = tool === "visa"
    ? visaBlocker ? "Wesentliches Hindernis zuerst klären" : unknown.length ? "Weitere Prüfung und Nachweise nötig" : negatives.length ? "Sonderfall oder Ausnahme prüfen" : "Voraussetzungen erscheinen strukturiert prüfbar"
    : protectionDirection;

  return <div className="space-y-6">
    <section className="premium-hero rounded-[2rem] p-6 text-white sm:p-9"><StatusBadge tone="yellow"><Gavel size={14} />Orientierung, keine Behördenentscheidung</StatusBadge><h1 className="mt-5 font-display text-4xl sm:text-6xl">Entscheidungsboxen mit Begründung</h1><p className="mt-4 max-w-3xl leading-7 text-white/62">Grün bedeutet nicht „bewilligt“. Die Boxen zeigen, ob der Sachverhalt lernlogisch vollständig, problematisch oder offen ist.</p></section>
    <div className="grid gap-3 sm:grid-cols-2">{[["visa", "Nationales Visum D", "Pass, Zweck, Finanzierung, Zuständigkeit"], ["protection", "Schutzformen", "Verfolgung, ernsthafter Schaden, Rückkehrgefahr"]].map(([id, title, desc]) => <button key={id} onClick={() => { setTool(id as typeof tool); setAnswers({}); }} className={`rounded-3xl border p-5 text-left ${tool === id ? "border-sage/30 bg-sage/[.08]" : "border-black/[.06] bg-white dark:border-white/[.08] dark:bg-white/[.04]"}`}><p className="font-display text-2xl">{title}</p><p className="mt-2 text-sm text-ink/48 dark:text-white/42">{desc}</p></button>)}</div>
    <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
      <section className="card-premium p-5 sm:p-7"><h2 className="font-display text-3xl">{tool === "visa" ? "Kriteriencheck Visum D" : "Kriteriencheck Schutz"}</h2><div className="mt-6 space-y-3">{criteria.map((item, index) => <div key={item.id} className="rounded-2xl border border-black/[.06] p-4 dark:border-white/[.08]"><div className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sand text-xs font-bold text-forest dark:bg-white/[.08] dark:text-amber">{index + 1}</span><div><p className="font-semibold">{item.label}</p><p className="mt-1 text-xs leading-5 text-ink/42 dark:text-white/38">{item.hint}</p></div></div><div className="mt-4 grid grid-cols-3 gap-2">{[["yes", "Ja"], ["no", "Nein"], ["unknown", "Unklar"]].map(([value, label]) => <button onClick={() => answer(item.id, value as Answer)} key={value} className={`rounded-xl px-2 py-2.5 text-xs font-bold ${answers[item.id] === value ? value === "yes" ? "bg-emerald-600 text-white" : value === "no" ? "bg-red-600 text-white" : "bg-amber text-forest" : "bg-sand text-ink/55 dark:bg-white/[.06] dark:text-white/55"}`}>{label}</button>)}</div></div>)}</div></section>
      <aside className="h-fit space-y-4 xl:sticky xl:top-24">
        <div className={`rounded-3xl border p-6 ${resultTone === "red" ? "border-red-500/25 bg-red-500/[.08]" : resultTone === "yellow" ? "border-amber-500/25 bg-amber-500/[.09]" : resultTone === "blue" ? "border-blue-500/25 bg-blue-500/[.08]" : "border-emerald-500/25 bg-emerald-500/[.08]"}`}>
          <StatusBadge tone={resultTone}>{resultTone === "green" ? <CheckCircle2 size={14} /> : resultTone === "red" ? <ShieldAlert size={14} /> : <CircleHelp size={14} />}Auswertung</StatusBadge>
          <h2 className="mt-4 font-display text-3xl">{resultTitle}</h2>
          <p className="mt-3 text-sm leading-6 text-ink/58 dark:text-white/50">{unknown.length} Punkte offen · {negatives.length} Punkte mit Problemhinweis.</p>
        </div>
        <ListCard title="Fehlt oder ist unklar" items={unknown.length ? unknown.map((item) => item.label) : ["Keine offenen Kriterien markiert. Originalnachweise trotzdem prüfen."]} />
        <ListCard title="Nächster sinnvoller Schritt" items={tool === "visa" ? ["Zwecknorm bestimmen", "amtliche Unterlagenliste abrufen", "Zuständigkeit und notwendige Beteiligungen klären", "keine Reiseentscheidung vor verbindlicher Visumerteilung"] : ["BAMF-Anhörung und Dokumente strukturieren", "Schutzformen getrennt prüfen", "bei Fristen oder Ablehnung qualifizierte Rechtsberatung einschalten"]} good />
      </aside>
    </div>
  </div>;
}

export function SourcesPage() {
  const [query, setQuery] = useState("");
  const [trust, setTrust] = useState("Alle");
  const filtered = legalSources.filter((source) => (trust === "Alle" || source.trust === trust) && `${source.title} ${source.publisher} ${source.note}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="space-y-6">
    <div><p className="eyebrow">Quellen-Datenbank</p><h1 className="font-display text-4xl sm:text-6xl">Jede Aussage braucht Herkunft und Prüfdatum.</h1><p className="mt-3 max-w-3xl text-ink/55 dark:text-white/48">Amtliche Quellen stehen über Lernunterlagen. Veraltete Dokumente bleiben sichtbar, werden aber gewarnt.</p></div>
    <section className="grid gap-3 sm:grid-cols-4">{[["A", "Amtliches Recht / Behörde"], ["B", "Offizielles Fachportal"], ["C", "Fachliteratur / Lernunterlage"], ["D", "Nur Hinweis, ungeprüft"]].map(([level, text]) => <div className="card-premium p-4" key={level}><div className="text-2xl font-bold text-sage">{level}</div><p className="mt-1 text-xs leading-5 text-ink/45 dark:text-white/40">{text}</p></div>)}</section>
    <div className="card-premium grid gap-3 p-4 sm:grid-cols-[1fr_180px]"><label className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/35" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Quelle, Herausgeber oder Rechtsgebiet …" className="w-full rounded-2xl border border-black/[.06] bg-white py-3.5 pl-11 pr-4 dark:border-white/[.08] dark:bg-white/[.06]" /></label><select value={trust} onChange={(event) => setTrust(event.target.value)} className="rounded-2xl border border-black/[.06] bg-white px-4 dark:border-white/[.08] dark:bg-[#122321]"><option>Alle</option><option>A</option><option>B</option><option>C</option><option>D</option></select></div>
    <div className="grid gap-4 lg:grid-cols-2">{filtered.map((source) => <article className={`card-premium p-6 ${source.outdated ? "ring-1 ring-red-500/20" : ""}`} key={source.id}><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-sage">{source.type}</p><h2 className="mt-2 font-display text-2xl">{source.title}</h2></div><StatusBadge tone={source.trust === "A" ? "green" : source.outdated ? "red" : "blue"}>Stufe {source.trust}</StatusBadge></div><p className="mt-3 text-sm font-semibold">{source.publisher}</p><p className="mt-3 text-sm leading-6 text-ink/55 dark:text-white/48">{source.note}</p><div className="mt-5 flex flex-wrap gap-2 text-xs text-ink/45 dark:text-white/40"><span className="rounded-full bg-sand px-3 py-1.5 dark:bg-white/[.06]">Stand: {source.date}</span><span className="rounded-full bg-sand px-3 py-1.5 dark:bg-white/[.06]">Geprüft: {source.checkedAt}</span>{source.pages && <span className="rounded-full bg-sand px-3 py-1.5 dark:bg-white/[.06]">Seiten: {source.pages}</span>}</div>{source.url ? <a className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-coral" href={source.url} target="_blank" rel="noreferrer">Offizielle Quelle öffnen <ExternalLink size={16} /></a> : <p className="mt-5 text-xs font-semibold text-ink/42 dark:text-white/38">Lokale Datei: {source.fileName}</p>}</article>)}</div>
  </div>;
}

export function DocumentsPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  return <div className="space-y-6 print:bg-white print:text-black">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Dokumente & Checklisten</p><h1 className="font-display text-4xl sm:text-6xl">Akten vollständig und prüfbar machen</h1><p className="mt-3 max-w-3xl text-ink/55 dark:text-white/48">Checklisten sind Arbeitshilfen. Die konkrete Behörde kann weitere Unterlagen verlangen.</p></div><button onClick={() => window.print()} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-forest px-5 py-3.5 font-bold text-white print:hidden"><Printer size={18} />Checkliste drucken</button></div>
    <div className="grid gap-5 lg:grid-cols-2">{documentChecklists.map((list) => <section className="card-premium p-6 print:border print:shadow-none" key={list.title}><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-sand text-forest dark:bg-white/[.08] dark:text-amber"><FileCheck2 /></span><div><p className="eyebrow">{list.area}</p><h2 className="font-display text-2xl">{list.title}</h2></div></div><div className="mt-5 space-y-2">{list.items.map((item) => { const id = `${list.title}-${item}`; return <button key={item} onClick={() => setChecked((current) => ({ ...current, [id]: !current[id] }))} className="flex w-full items-start gap-3 rounded-xl p-2 text-left"><span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border ${checked[id] ? "border-sage bg-sage text-white" : "border-black/15 dark:border-white/20"}`}>{checked[id] && <Check size={14} />}</span><span className={`text-sm leading-6 ${checked[id] ? "text-ink/40 line-through dark:text-white/35" : ""}`}>{item}</span></button>; })}</div></section>)}</div>
    <div className="rounded-3xl border border-amber-500/20 bg-amber-500/[.08] p-6"><div className="flex gap-3"><AlertTriangle className="shrink-0 text-amber-700 dark:text-amber-300" /><div><h2 className="font-bold">Datenschutz</h2><p className="mt-2 text-sm leading-6 text-ink/60 dark:text-white/52">Die Online-App speichert Lernfortschritt lokal. Keine echten Fallakten, Pässe, Gesundheitsdaten oder andere personenbezogene Dokumente in Freitextfelder übertragen.</p></div></div></div>
  </div>;
}
