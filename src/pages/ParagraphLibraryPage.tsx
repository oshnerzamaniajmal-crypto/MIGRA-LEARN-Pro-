import {
  AlertTriangle, BookOpenCheck, CheckCircle2, ChevronRight, ExternalLink, FileCheck2,
  FileText, Filter, Gavel, Landmark, Layers3, ListChecks, Search, ShieldAlert,
  Sparkles, Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  paragraphProfiles,
  paragraphTargetAudiences,
  type LegalParagraphProfile,
} from "../data/paragraphProfiles";

const targetAudiences = ["Alle Zielgruppen", ...paragraphTargetAudiences] as const;
type AudienceFilter = (typeof targetAudiences)[number];

function Badge({ children, tone = "sage" }: { children: React.ReactNode; tone?: "sage" | "amber" | "red" | "blue" | "coral" }) {
  const style = {
    sage: "border-sage/20 bg-sage/[.10] text-sage",
    amber: "border-amber/25 bg-amber/[.12] text-amber-800 dark:text-amber",
    red: "border-red-500/20 bg-red-500/[.10] text-red-700 dark:text-red-300",
    blue: "border-blue-500/20 bg-blue-500/[.10] text-blue-700 dark:text-blue-300",
    coral: "border-coral/20 bg-coral/[.10] text-coral",
  }[tone];
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${style}`}>{children}</span>;
}

function ProfessionalParagraphView({ profile }: { profile: LegalParagraphProfile }) {
  const paragraph = profile.raw;
  const source = profile.source;
  const mandatory = profile.requirements.mandatory;
  const caseSpecific = profile.requirements.caseSpecific;

  return <article className="space-y-5">
    <section className="card-premium overflow-hidden">
      <div className="premium-hero p-6 text-white sm:p-8">
        <div className="flex flex-wrap gap-2">
          <Badge tone="amber"><Gavel size={13} />{profile.law} · {profile.paragraph}</Badge>
          <Badge tone="blue">{profile.category}</Badge>
          <Badge tone="coral">{profile.difficulty}</Badge>
          <Badge tone={profile.reviewStatus === "aktuell" ? "sage" : profile.reviewStatus === "veraltet" ? "red" : "amber"}>{profile.reviewStatus}</Badge>
        </div>
        <h2 className="mt-5 font-display text-4xl sm:text-5xl">{profile.title}</h2>
        <p className="mt-4 max-w-4xl leading-7 text-white/70">{profile.overview}</p>
        <p className="mt-4 rounded-2xl border border-white/12 bg-white/[.08] p-4 text-sm leading-6 text-white/72">{paragraph.legalStatus} · Quelle: {profile.sourceTitle} · geprüft: {profile.lastCheckedAt}</p>
      </div>
      <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-3">
        <InfoCard icon={Sparkles} title="Kurze Übersicht" text={profile.simpleSummary} accent />
        <InfoCard icon={Landmark} title="Rechtlicher Kontext" text={profile.legalContext} />
        <InfoCard icon={ShieldAlert} title="Orientierung, keine Rechtsberatung" text={profile.disclaimer} danger />
      </div>
    </section>

    <section className="grid gap-5 lg:grid-cols-2">
      <InfoCard icon={FileText} title="Zweck des Paragraphen" text={profile.purpose} accent />
      <div className="rounded-3xl border border-black/[.06] bg-white p-5 dark:border-white/[.08] dark:bg-white/[.035]">
        <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-sand text-forest dark:bg-white/[.08] dark:text-amber"><Users size={19} /></span><h3 className="font-bold">Für wen gilt diese Regel?</h3></div>
        <div className="mt-4 flex flex-wrap gap-2">{profile.targetAudiences.map((audience) => <Badge key={audience}>{audience}</Badge>)}</div>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-ink/58 dark:text-white/50">{profile.appliesTo.map((item) => <li key={item}>• {item}</li>)}</ul>
      </div>
    </section>

    <section className="grid gap-5 lg:grid-cols-3">
      <ListCard title="Zwingende Voraussetzungen" items={mandatory} good />
      <ListCard title="Einzelfallabhängige Punkte" items={caseSpecific.length ? caseSpecific : ["Ausnahmen, Ermessen oder Spezialnormen prüfen", "Sachverhalt und Nachweise dokumentieren"]} />
      <ListCard title="Mögliche Ausschluss- oder Problemgründe" items={paragraph.examination.refusalReasons} danger />
    </section>

    <section className="card-premium p-5 sm:p-6">
      <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-sand text-forest dark:bg-white/[.08] dark:text-amber"><FileCheck2 size={19} /></span><div><p className="eyebrow">Dokumente</p><h3 className="font-display text-3xl">Welche Unterlagen sind wichtig?</h3></div></div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {profile.documents.map((document) => {
          return <div key={document.name} className="rounded-3xl border border-black/[.06] p-5 dark:border-white/[.08]">
            <p className="font-bold text-sage">{document.name}</p>
            <p className="mt-3 text-sm leading-6"><strong>Warum:</strong> {document.whyNeeded}</p>
            <p className="mt-2 text-sm leading-6"><strong>Woher:</strong> {document.whereToGet}</p>
            <p className="mt-2 text-sm leading-6 text-ink/55 dark:text-white/48"><strong>Achtung:</strong> {document.attention}</p>
          </div>;
        })}
      </div>
    </section>

    <section className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
      <div className="rounded-[1.7rem] border border-sage/20 bg-sage/[.06] p-5 sm:p-6">
        <p className="eyebrow">Verfahren</p>
        <h3 className="mt-2 font-display text-3xl">Ablauf Schritt für Schritt</h3>
        <div className="mt-5 space-y-3">{profile.procedureSteps.map((step, index) => <div key={`${step.step}-${step.action}`} className="flex gap-3 rounded-2xl bg-white/75 p-4 dark:bg-white/[.055]">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-sage text-sm font-bold text-white">{index + 1}</span>
          <div>
            <p className="text-sm font-bold">{step.step} · {step.responsibleParty}</p>
            <p className="mt-1 text-sm leading-6">{step.action}</p>
            {step.warning && <p className="mt-1 text-xs leading-5 text-coral">{step.warning}</p>}
          </div>
        </div>)}</div>
      </div>
      <div className="space-y-5">
        <ListCard title="Wenn Voraussetzungen erfüllt sind" items={profile.legalConsequences.ifRequirementsMet} good />
        <ListCard title="Wenn etwas fehlt" items={profile.legalConsequences.ifRequirementsMissing} danger />
      </div>
    </section>

    <section className="grid gap-5 lg:grid-cols-2">
      <InfoCard icon={BookOpenCheck} title="Einfache Sprache" text={paragraph.everydayMeaning} accent />
      <InfoCard icon={Layers3} title="Fachsprache / juristische Einordnung" text={profile.professionalSummary} />
    </section>

    <section className="card-premium p-5 sm:p-6">
      <p className="eyebrow">Kommentar und praktische Einordnung</p>
      <h3 className="mt-2 font-display text-3xl">Wie wirkt die Norm in der Praxis?</h3>
      <p className="mt-4 leading-7 text-ink/65 dark:text-white/55">{profile.practicalCommentary}</p>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ListCard title="Behördenperspektive" items={profile.authorityPerspective} good />
        <ListCard title="Beratungsperspektive" items={profile.counselingPerspective} />
      </div>
    </section>

    <section>
      <h3 className="font-display text-3xl">Beispiele aus der Praxis</h3>
      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        {profile.practiceExamples.map((example) => <div key={example.label} className="rounded-3xl border border-black/[.06] bg-white p-4 dark:border-white/[.08] dark:bg-white/[.035]">
          <p className="text-xs font-bold uppercase tracking-wider text-coral">{example.label}</p>
          <p className="mt-2 text-sm leading-6">{example.text}</p>
        </div>)}
      </div>
    </section>

    <section className="grid gap-5 lg:grid-cols-2">
      <ListCard title="Häufige Fehler" items={profile.commonMistakes} danger />
      <ListCard title="Checkliste: Was ist als Nächstes zu tun?" items={profile.checklist} good />
    </section>

    <section className="card-premium p-5 sm:p-6">
      <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-sand text-forest dark:bg-white/[.08] dark:text-amber"><ListChecks size={19} /></span><div><p className="eyebrow">Kontrollfragen</p><h3 className="font-display text-3xl">Selbst prüfen</h3></div></div>
      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {paragraph.learning.openQuestions.map((question) => <p key={question} className="rounded-2xl bg-sand/70 p-4 text-sm leading-6 dark:bg-white/[.05]">{question}</p>)}
      </div>
    </section>

    <section className="rounded-[1.7rem] border border-amber/20 bg-amber/[.07] p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="eyebrow">Quellen und Aktualität</p>
          <h3 className="mt-2 font-display text-3xl">{profile.sourceTitle}</h3>
          <p className="mt-3 text-sm leading-6 text-ink/60 dark:text-white/52">{`${profile.sourcePublisher} · Stand: ${profile.sourceDate} · geprüft: ${profile.lastCheckedAt} · Vertrauensstufe ${profile.sourceTrust}`}</p>
          <p className="mt-2 text-sm leading-6 text-ink/55 dark:text-white/48">{source?.note}</p>
        </div>
        {profile.sourceUrl && <a href={profile.sourceUrl} target="_blank" rel="noreferrer" className="btn-secondary shrink-0">Quelle öffnen <ExternalLink size={16} /></a>}
      </div>
    </section>
  </article>;
}

function InfoCard({ icon: Icon, title, text, accent, danger }: { icon: typeof FileText; title: string; text: string; accent?: boolean; danger?: boolean }) {
  return <section className={`rounded-3xl border p-5 ${danger ? "border-red-500/20 bg-red-500/[.06]" : accent ? "border-sage/20 bg-sage/[.07]" : "border-black/[.06] bg-white dark:border-white/[.08] dark:bg-white/[.035]"}`}>
    <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-sand text-forest dark:bg-white/[.08] dark:text-amber"><Icon size={19} /></span><h3 className="font-bold">{title}</h3></div>
    <p className="mt-4 leading-7 text-ink/64 dark:text-white/55">{text}</p>
  </section>;
}

function ListCard({ title, items, good, danger }: { title: string; items: string[]; good?: boolean; danger?: boolean }) {
  return <section className={`rounded-3xl border p-5 ${good ? "border-emerald-500/20 bg-emerald-500/[.06]" : danger ? "border-red-500/20 bg-red-500/[.05]" : "border-black/[.06] bg-white dark:border-white/[.08] dark:bg-white/[.035]"}`}>
    <h3 className="font-display text-2xl">{title}</h3>
    <ul className="mt-4 space-y-3">{items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6"><CheckCircle2 className={`mt-0.5 shrink-0 ${danger ? "text-red-500" : good ? "text-emerald-600" : "text-coral"}`} size={17} />{item}</li>)}</ul>
  </section>;
}

export function ParagraphLibraryPage() {
  const [query, setQuery] = useState("");
  const [law, setLaw] = useState("Alle Gesetze");
  const [area, setArea] = useState("Alle Bereiche");
  const [audience, setAudience] = useState<AudienceFilter>("Alle Zielgruppen");
  const [activeId, setActiveId] = useState(paragraphProfiles[0]?.id ?? "");

  const laws = useMemo(() => ["Alle Gesetze", ...Array.from(new Set(paragraphProfiles.map((profile) => profile.law))).sort()], []);
  const areas = useMemo(() => ["Alle Bereiche", ...Array.from(new Set(paragraphProfiles.map((profile) => profile.area))).sort()], []);
  const sourceCount = useMemo(() => new Set(paragraphProfiles.map((profile) => profile.sourceTitle)).size, []);
  const filtered = useMemo(() => paragraphProfiles.filter((profile) => {
    return (law === "Alle Gesetze" || profile.law === law)
      && (area === "Alle Bereiche" || profile.area === area)
      && (audience === "Alle Zielgruppen" || profile.targetAudiences.includes(audience))
      && profile.searchText.includes(query.toLowerCase());
  }), [area, audience, law, query]);
  const active = paragraphProfiles.find((profile) => profile.id === activeId) ?? filtered[0] ?? paragraphProfiles[0];

  return <div className="space-y-6">
    <section className="premium-hero overflow-hidden rounded-[2rem] p-6 text-white sm:p-9">
      <div className="grid gap-7 xl:grid-cols-[1fr_360px] xl:items-end">
        <div>
          <Badge tone="amber"><Gavel size={14} /> Paragraphenbibliothek</Badge>
          <h1 className="mt-5 max-w-5xl font-display text-4xl sm:text-6xl">99+ Normen wieder sichtbar – als professionelle Rechts- und Beratungsebene.</h1>
          <p className="mt-4 max-w-3xl leading-7 text-white/68">Die Bibliothek erklärt Zweck, Zielgruppe, Voraussetzungen, Dokumente, Verfahren, Rechtsfolgen, Praxisprobleme, Fehler, Checklisten und Quellenstand. Sie ergänzt Akademie und Lernpfad, ersetzt aber keine individuelle Rechtsberatung.</p>
        </div>
        <div className="rounded-3xl border border-white/12 bg-white/[.07] p-5">
          <div className="text-5xl font-bold text-amber">{paragraphProfiles.length}</div>
          <p className="mt-1 text-xs uppercase tracking-wider text-white/52">Paragraphen & Rechtskarten</p>
          <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-white/62">
            <span>{laws.length - 1} Gesetze</span>
            <span>{areas.length - 1} Bereiche</span>
            <span>{sourceCount} Quellen</span>
            <span>Stand sichtbar</span>
          </div>
        </div>
      </div>
    </section>

    <div className="grid gap-6 xl:grid-cols-[370px_1fr]">
      <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
        <section className="card-premium p-4">
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/35 dark:text-white/35" size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Paragraph, Thema, Dokument, Begriff suchen …" className="field pl-11" />
          </label>
          <div className="mt-3 grid gap-3">
            <label className="relative block"><Filter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/35 dark:text-white/35" size={17} /><select value={law} onChange={(event) => setLaw(event.target.value)} className="field appearance-none pl-11">{laws.map((item) => <option key={item}>{item}</option>)}</select></label>
            <select value={area} onChange={(event) => setArea(event.target.value)} className="field">{areas.map((item) => <option key={item}>{item}</option>)}</select>
            <select value={audience} onChange={(event) => setAudience(event.target.value as AudienceFilter)} className="field">{targetAudiences.map((item) => <option key={item}>{item}</option>)}</select>
          </div>
          <p className="mt-4 text-xs leading-5 text-ink/45 dark:text-white/40">{filtered.length} Treffer · alle Inhalte bleiben sichtbar, Filter helfen bei Orientierung.</p>
        </section>

        <section className="max-h-[70vh] space-y-2 overflow-y-auto pr-1">
          {filtered.length ? filtered.map((paragraph) => {
            return <button key={paragraph.id} onClick={() => setActiveId(paragraph.id)} className={`w-full rounded-3xl border p-4 text-left transition hover:-translate-y-0.5 ${active.id === paragraph.id ? "border-coral/35 bg-coral/[.07] shadow-soft" : "border-black/[.05] bg-white dark:border-white/[.07] dark:bg-white/[.04]"}`}>
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sand text-forest dark:bg-white/[.08] dark:text-amber"><Gavel size={18} /></span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-coral">{paragraph.law} · {paragraph.paragraph}</p>
                  <p className="mt-1 font-bold">{paragraph.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-ink/48 dark:text-white/42">{paragraph.area} · Quelle {paragraph.sourceTrust} · {paragraph.reviewStatus}</p>
                </div>
              </div>
            </button>;
          }) : <div className="card-premium p-5 text-sm leading-6 text-ink/55 dark:text-white/48">Keine Paragraphen gefunden. Filter zurücksetzen oder Suchbegriff ändern.</div>}
        </section>
      </aside>

      <main className="min-w-0">
        {active ? <ProfessionalParagraphView profile={active} /> : <section className="card-premium p-8 text-center"><AlertTriangle className="mx-auto text-amber" size={36} /><h2 className="mt-4 font-display text-3xl">Noch keine Paragraphen verfügbar</h2><p className="mt-2 text-sm text-ink/50 dark:text-white/45">Sobald Daten in legalParagraphs.ts vorhanden sind, erscheinen sie hier.</p></section>}
      </main>
    </div>
  </div>;
}
