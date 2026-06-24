import {
  AlertCircle, Bell, Bot, CalendarDays, Check, ChevronRight, Clock,
  FileText, Inbox, Link as LinkIcon, Mail, MapPin, Navigation, Package,
  PencilLine, Plus, Search, Settings, ShieldCheck, Sparkles, TimerReset,
  Truck, UserRound, Wand2, X,
} from "lucide-react";
import { useState } from "react";
import {
  assistantDeliveries, assistantEmails, assistantEvents, assistantSummary,
  assistantTasks, connectedAccounts, extractSuggestionsFromEmails,
  type AssistantCategory, type AssistantDelivery, type AssistantEmail, type AssistantEvent,
  type AssistantPriority, type AssistantSuggestion, type AssistantTask,
} from "../data/assistantDemo";

type AssistantTab = "dashboard" | "focus" | "timeline" | "calendar" | "tasks" | "emails" | "deliveries" | "settings";
type DetailItem =
  | { kind: "Termin"; item: AssistantEvent }
  | { kind: "Aufgabe"; item: AssistantTask }
  | { kind: "E-Mail"; item: AssistantEmail }
  | { kind: "Lieferung"; item: AssistantDelivery }
  | null;

const tabs: { id: AssistantTab; label: string; icon: typeof CalendarDays }[] = [
  { id: "dashboard", label: "Dashboard", icon: CalendarDays },
  { id: "focus", label: "Fokus", icon: Sparkles },
  { id: "timeline", label: "Timeline", icon: TimerReset },
  { id: "calendar", label: "Kalender", icon: Clock },
  { id: "tasks", label: "Aufgaben", icon: Check },
  { id: "emails", label: "E-Mails", icon: Mail },
  { id: "deliveries", label: "Lieferungen", icon: Package },
  { id: "settings", label: "Einstellungen", icon: Settings },
];

const today = "2026-06-24";
const tomorrow = "2026-06-25";
const thisWeekEnd = "2026-07-01";

function priorityStyle(priority: AssistantPriority) {
  return priority === "dringend" ? "bg-coral/12 text-coral border-coral/20"
    : priority === "hoch" ? "bg-amber/14 text-amber border-amber/25"
      : priority === "mittel" ? "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-300"
        : "bg-sage/10 text-sage border-sage/20";
}

function sameOrBefore(date: string, end: string) {
  return date <= end;
}

export function AssistantPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<AssistantTab>("dashboard");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"Alle" | AssistantCategory>("Alle");
  const [detail, setDetail] = useState<DetailItem>(null);
  const [tasks, setTasks] = useState(assistantTasks);
  const [suggestions, setSuggestions] = useState<AssistantSuggestion[]>(extractSuggestionsFromEmails(assistantEmails));
  const [manualTitle, setManualTitle] = useState("");
  const [manualDueDate, setManualDueDate] = useState(today);
  const [manualCategory, setManualCategory] = useState<AssistantCategory>("Privat");

  const allCategories = Array.from(new Set([...assistantEmails.map((item) => item.category), ...tasks.map((item) => item.category), ...assistantEvents.map((item) => item.category), ...assistantDeliveries.map((item) => item.category)]));
  const visibleEmails = assistantEmails.filter((email) => (category === "Alle" || email.category === category) && `${email.subject} ${email.from} ${email.body}`.toLowerCase().includes(query.toLowerCase()));
  const visibleTasks = tasks.filter((task) => (category === "Alle" || task.category === category) && `${task.title} ${task.description} ${task.category}`.toLowerCase().includes(query.toLowerCase()));
  const visibleEvents = assistantEvents.filter((event) => (category === "Alle" || event.category === category) && `${event.title} ${event.organizer} ${event.reason} ${event.location ?? ""}`.toLowerCase().includes(query.toLowerCase()));
  const visibleDeliveries = assistantDeliveries.filter((delivery) => (category === "Alle" || delivery.category === category) && `${delivery.provider} ${delivery.product} ${delivery.carrier} ${delivery.orderNumber}`.toLowerCase().includes(query.toLowerCase()));
  const todayTasks = tasks.filter((task) => task.dueDate <= today && task.status !== "erledigt");
  const tomorrowItems = [...assistantEvents.filter((event) => event.date === tomorrow), ...assistantDeliveries.filter((delivery) => delivery.expectedDate === tomorrow)];
  const weekDeadlines = tasks.filter((task) => sameOrBefore(task.dueDate, thisWeekEnd) && task.status !== "erledigt");
  const needsReply = assistantEmails.filter((email) => email.needsReply);
  const unclear = suggestions.filter((item) => item.status === "neu").slice(0, 5);
  const nextEvent = assistantEvents[0];
  const nextTask = todayTasks[0] ?? tasks.find((task) => task.status !== "erledigt");
  const urgentRisks = [
    ...tasks.filter((task) => task.priority === "dringend" && task.status !== "erledigt").map((task) => `Frist: ${task.title} bis ${task.dueDate}`),
    ...assistantEmails.filter((email) => email.needsReply && email.priority !== "niedrig").map((email) => `Antwort offen: ${email.subject}`),
    ...assistantEvents.filter((event) => !event.address && !event.onlineLink).map((event) => `Unklarer Termin: ${event.title} ohne Adresse/Link`),
  ];
  const timelineItems = [
    { time: "08:00", type: "Aufgabe", title: "Unterlagen prüfen", detail: "Pass, Meldebescheinigung, Krankenversicherung", tone: "sage" },
    { time: "10:00", type: "Termin", title: nextEvent.title, detail: nextEvent.location ?? "Online", tone: "amber" },
    { time: "13:00", type: "E-Mail", title: "Antwort vorbereiten", detail: needsReply[0]?.subject ?? "Keine offene Antwort", tone: "coral" },
    { time: "15:00", type: "Lieferung", title: assistantDeliveries[0]?.provider ?? "Keine Lieferung", detail: assistantDeliveries[0]?.status ?? "ruhig", tone: "blue" },
    { time: "18:00", type: "Erinnerung", title: "Morgen prüfen", detail: "Route, Unterlagen, Kalender", tone: "sage" },
  ];

  const addManualTask = () => {
    if (!manualTitle.trim()) return;
    setTasks((current) => [{
      id: `manual-${Date.now()}`,
      title: manualTitle.trim(),
      description: "Manuell erstellt",
      dueDate: manualDueDate,
      priority: "mittel",
      category: manualCategory,
      status: "offen",
      source: "Manuell",
      notes: "",
      subtasks: [],
      reminders: ["am Fälligkeitstag"],
    }, ...current]);
    setManualTitle("");
  };
  const updateSuggestion = (id: string, status: AssistantSuggestion["status"]) => setSuggestions((current) => current.map((item) => item.id === id ? { ...item, status } : item));
  const markTaskDone = (id: string) => setTasks((current) => current.map((item) => item.id === id ? { ...item, status: "erledigt" } : item));

  const stats = [
    { label: "Heute offen", value: todayTasks.length, icon: Bell },
    { label: "Antworten", value: needsReply.length, icon: Mail },
    { label: "Fristen Woche", value: weekDeadlines.length, icon: TimerReset },
    { label: "Lieferungen", value: assistantDeliveries.length, icon: Truck },
  ];

  if (!loggedIn) return <AssistantLogin onLogin={() => setLoggedIn(true)} />;

  return <div className="space-y-6">
    <section className="premium-hero overflow-hidden rounded-[2rem] p-6 text-white sm:p-9">
      <div className="grid gap-7 xl:grid-cols-[1fr_360px] xl:items-end">
        <div>
          <span className="chip border border-white/10 bg-white/10 text-[#f2d8a6]"><Bot size={14} /> Etappe 1 · Demo-App mit Beispiel-Daten</span>
          <h1 className="mt-5 max-w-5xl font-display text-4xl sm:text-6xl">Dein Tagesassistent für Termine, Aufgaben, E-Mails und Lieferungen.</h1>
          <p className="mt-4 max-w-3xl leading-7 text-white/65">Diese erste Etappe ist die sichtbare Grundstruktur: Login, Dashboard, Kalender, Aufgaben, E-Mails, Lieferungen und Einstellungen. Alles läuft mit Beispiel-Daten – noch ohne echte Gmail-/Outlook-Verbindung.</p>
        </div>
        <div className="rounded-3xl border border-white/12 bg-white/[.07] p-5">
          <p className="text-xs uppercase tracking-widest text-white/45">Datenschutzstatus</p>
          <div className="mt-3 flex items-center gap-3"><ShieldCheck className="text-amber" /><div><p className="font-bold">Demo lokal</p><p className="text-sm text-white/52">Keine echten Konten verbunden · OAuth vorbereitet</p></div></div>
        </div>
      </div>
    </section>

    <section className="grid gap-3 lg:grid-cols-[1fr_auto]">
      <label className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/35 dark:text-white/35" size={18} />
        <input className="field pl-11" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Suchen: Termin Oberkochen, DHL, Bewerbung Ulm, Frist diese Woche …" />
      </label>
      <select className="field lg:w-56" value={category} onChange={(event) => setCategory(event.target.value as "Alle" | AssistantCategory)}>
        <option>Alle</option>
        {allCategories.map((item) => <option key={item}>{item}</option>)}
      </select>
    </section>

    <nav className="overflow-x-auto">
      <div className="flex min-w-max gap-2 rounded-3xl border border-black/[.05] bg-white p-2 dark:border-white/[.08] dark:bg-white/[.04]">
        {tabs.map((item) => {
          const Icon = item.icon;
          return <button key={item.id} onClick={() => setTab(item.id)} className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${tab === item.id ? "bg-forest text-white dark:bg-amber dark:text-forest" : "text-ink/50 hover:bg-sand dark:text-white/45 dark:hover:bg-white/[.06]"}`}><Icon size={17} />{item.label}</button>;
        })}
      </div>
    </nav>

    {tab === "dashboard" && <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <div className="metric-card" key={stat.label}><stat.icon className="text-sage" /><div className="mt-5 text-3xl font-bold">{stat.value}</div><p className="mt-1 text-sm text-ink/45 dark:text-white/40">{stat.label}</p></div>)}</section>
      <section className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
        <div className="overflow-hidden rounded-[2rem] border border-coral/15 bg-gradient-to-br from-white to-coral/[.055] p-5 shadow-[0_20px_60px_rgba(25,52,47,.08)] dark:border-coral/20 dark:from-white/[.055] dark:to-coral/[.06] sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="chip bg-coral/[.10] text-coral"><Sparkles size={14} />Was ist jetzt wichtig?</span>
            <button onClick={() => setTab("focus")} className="rounded-2xl bg-forest px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 dark:bg-amber dark:text-forest">Fokusmodus öffnen</button>
          </div>
          <h2 className="mt-5 font-display text-4xl">Als Nächstes: {nextEvent.title}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-ink/60 dark:text-white/50">{nextEvent.date} um {nextEvent.startTime}. {nextEvent.location ? `Ort: ${nextEvent.location}.` : "Online-Termin."} Bereite diese Unterlagen vor: {nextEvent.requiredDocuments.join(", ")}.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <QuickAction icon={Navigation} label="Navigation" />
            <QuickAction icon={Mail} label="Antwort" />
            <QuickAction icon={Bell} label="Erinnern" />
          </div>
        </div>
        <div className="rounded-[2rem] border border-amber/20 bg-amber/[.07] p-5 sm:p-7">
          <span className="chip bg-amber/[.15] text-amber"><AlertCircle size={14} />Achtung</span>
          <h2 className="mt-4 font-display text-3xl">Risiken & offene Punkte</h2>
          <div className="mt-4 space-y-3">{urgentRisks.slice(0, 4).map((risk) => <p key={risk} className="rounded-2xl bg-white/75 p-3 text-sm leading-6 dark:bg-white/[.055]">{risk}</p>)}</div>
        </div>
      </section>
      <section className="grid gap-5 xl:grid-cols-[1.05fr_.95fr]">
        <Panel title="Heute vorbereiten" subtitle="Termine, Aufgaben, Antworten und Dokumente" icon={Sparkles}>
          <div className="space-y-3">
            {todayTasks.map((task) => <TaskRow key={task.id} task={task} onOpen={() => setDetail({ kind: "Aufgabe", item: task })} onDone={() => markTaskDone(task.id)} />)}
            {needsReply.slice(0, 2).map((email) => <EmailRow key={email.id} email={email} onOpen={() => setDetail({ kind: "E-Mail", item: email })} />)}
          </div>
        </Panel>
        <Panel title="Morgen & diese Woche" subtitle="Fristen, Lieferungen, Termine" icon={CalendarDays}>
          <div className="space-y-3">
            {tomorrowItems.map((item) => "expectedDate" in item ? <DeliveryRow key={item.id} delivery={item} onOpen={() => setDetail({ kind: "Lieferung", item })} /> : <EventRow key={item.id} event={item} onOpen={() => setDetail({ kind: "Termin", item })} />)}
            {weekDeadlines.slice(0, 3).map((task) => <TaskRow key={task.id} task={task} onOpen={() => setDetail({ kind: "Aufgabe", item: task })} onDone={() => markTaskDone(task.id)} />)}
          </div>
        </Panel>
      </section>
      <section className="grid gap-5 lg:grid-cols-3">
        <Panel title="Inbox-Zentrale" subtitle="KI-Vorschläge prüfen" icon={Inbox}>{unclear.map((item) => <SuggestionCard key={item.id} item={item} onUpdate={updateSuggestion} />)}</Panel>
        <Panel title="Wichtige Anhänge" subtitle="Dokumente aus E-Mails" icon={FileText}>{assistantEmails.flatMap((email) => email.attachments.map((attachment) => <p key={`${email.id}-${attachment}`} className="rounded-2xl bg-sand p-3 text-sm dark:bg-white/[.06]">{attachment}<span className="block text-xs text-ink/45 dark:text-white/40">{email.subject}</span></p>))}</Panel>
        <Panel title="Manuell hinzufügen" subtitle="Schneller To-do-Eintrag" icon={Plus}>
          <div className="space-y-3">
            <input className="field" value={manualTitle} onChange={(event) => setManualTitle(event.target.value)} placeholder="Neue Aufgabe …" />
            <input className="field" type="date" value={manualDueDate} onChange={(event) => setManualDueDate(event.target.value)} />
            <select className="field" value={manualCategory} onChange={(event) => setManualCategory(event.target.value as AssistantCategory)}>{allCategories.map((item) => <option key={item}>{item}</option>)}</select>
            <button className="btn-primary w-full" onClick={addManualTask}><Plus size={18} />Aufgabe erstellen</button>
          </div>
        </Panel>
      </section>
      <section className="grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
        <Panel title="Tages-Timeline" subtitle="ruhiger Überblick mit Uhrzeiten" icon={TimerReset}>
          <Timeline items={timelineItems} />
        </Panel>
        <Panel title="Intelligente Hilfe" subtitle="kurze Antworten statt langer Suche" icon={Wand2}>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Was soll ich jetzt tun?", "Warum ist diese E-Mail wichtig?", "Welche Unterlagen brauche ich?", "Wie antworte ich höflich?"].map((question) => <button key={question} className="rounded-2xl border border-black/[.06] bg-white p-4 text-left text-sm font-bold transition hover:-translate-y-0.5 hover:border-sage/30 dark:border-white/[.08] dark:bg-white/[.035]">{question}<span className="mt-2 block text-xs font-normal leading-5 text-ink/45 dark:text-white/40">Demo-Antwort: App zeigt den nächsten Schritt und passende Vorbereitung.</span></button>)}
          </div>
        </Panel>
      </section>
    </div>}

    {tab === "focus" && <FocusMode event={nextEvent} task={nextTask} risks={urgentRisks} onBack={() => setTab("dashboard")} />}
    {tab === "timeline" && <Panel title="Timeline-Ansicht" subtitle="Tagesablauf ohne Überforderung" icon={TimerReset}><Timeline items={timelineItems} large /></Panel>}
    {tab === "calendar" && <ListGrid>{visibleEvents.map((event) => <EventRow key={event.id} event={event} onOpen={() => setDetail({ kind: "Termin", item: event })} />)}</ListGrid>}
    {tab === "tasks" && <ListGrid>{visibleTasks.map((task) => <TaskRow key={task.id} task={task} onOpen={() => setDetail({ kind: "Aufgabe", item: task })} onDone={() => markTaskDone(task.id)} />)}</ListGrid>}
    {tab === "emails" && <ListGrid>{visibleEmails.map((email) => <EmailRow key={email.id} email={email} onOpen={() => setDetail({ kind: "E-Mail", item: email })} />)}</ListGrid>}
    {tab === "deliveries" && <ListGrid>{visibleDeliveries.map((delivery) => <DeliveryRow key={delivery.id} delivery={delivery} onOpen={() => setDetail({ kind: "Lieferung", item: delivery })} />)}</ListGrid>}
    {tab === "settings" && <SettingsPanel />}

    {detail && <DetailDrawer detail={detail} onClose={() => setDetail(null)} />}
  </div>;
}

function AssistantLogin({ onLogin }: { onLogin: () => void }) {
  return <div className="grid min-h-[72vh] place-items-center">
    <section className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-black/[.05] bg-white shadow-[0_24px_80px_rgba(25,52,47,.12)] dark:border-white/[.08] dark:bg-[#10211f] lg:grid-cols-[1fr_420px]">
      <div className="premium-hero p-7 text-white sm:p-10">
        <span className="chip border border-white/10 bg-white/10 text-[#f2d8a6]"><ShieldCheck size={14} /> Sicherer Demo-Login</span>
        <h1 className="mt-5 font-display text-4xl sm:text-6xl">Willkommen im Assistant.</h1>
        <p className="mt-4 max-w-2xl leading-7 text-white/64">Etappe 1 nutzt nur Beispiel-Daten. Es werden keine echten E-Mails gelesen, keine Passwörter gespeichert und keine Nachrichten versendet.</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {["Heute sehen", "Kalender prüfen", "Aufgaben sortieren", "Lieferungen verfolgen"].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[.07] p-4 text-sm font-semibold">{item}</div>)}
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <p className="eyebrow">Login</p>
        <h2 className="mt-2 font-display text-3xl">Demo starten</h2>
        <p className="mt-3 text-sm leading-6 text-ink/55 dark:text-white/45">Später kommen Gmail- und Outlook-Login per OAuth dazu. Jetzt kannst du die App sofort mit Demo-Daten testen.</p>
        <div className="mt-6 space-y-3">
          <label className="block text-sm font-bold">E-Mail</label>
          <input className="field" value="demo@assistant.local" readOnly />
          <label className="block text-sm font-bold">Passwort</label>
          <input className="field" value="••••••••" readOnly type="password" />
          <button onClick={onLogin} className="btn-primary w-full"><ShieldCheck size={18} />Demo öffnen</button>
          <button className="btn-secondary w-full" disabled><Mail size={18} />Gmail verbinden · Etappe 3</button>
          <button className="btn-secondary w-full" disabled><Settings size={18} />Outlook verbinden · Etappe 4</button>
        </div>
        <p className="mt-5 rounded-2xl bg-sage/[.08] p-4 text-xs leading-5 text-ink/50 dark:text-white/42">Hinweis: Dieser Login ist nur ein Frontend-Demo-Zustand. Echte Authentifizierung folgt erst nach Datenbank und OAuth-Backend.</p>
      </div>
    </section>
  </div>;
}

function Panel({ title, subtitle, icon: Icon, children }: { title: string; subtitle: string; icon: typeof CalendarDays; children: React.ReactNode }) {
  return <section className="card-premium p-5"><div className="mb-5 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-sand text-forest dark:bg-white/[.08] dark:text-amber"><Icon size={20} /></span><div><h2 className="font-display text-2xl">{title}</h2><p className="text-xs text-ink/45 dark:text-white/40">{subtitle}</p></div></div><div className="space-y-3">{children}</div></section>;
}

function QuickAction({ icon: Icon, label }: { icon: typeof CalendarDays; label: string }) {
  return <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-black/[.06] bg-white/80 px-4 py-3 text-sm font-bold text-forest transition hover:-translate-y-0.5 hover:border-coral/30 hover:text-coral dark:border-white/[.08] dark:bg-white/[.055] dark:text-white"><Icon size={17} />{label}</button>;
}

function Timeline({ items, large = false }: { items: { time: string; type: string; title: string; detail: string; tone: string }[]; large?: boolean }) {
  const toneClass = (tone: string) => tone === "coral" ? "bg-coral" : tone === "amber" ? "bg-amber" : tone === "blue" ? "bg-blue-500" : "bg-sage";
  return <div className="relative space-y-3">
    <div className="absolute bottom-4 left-[3.7rem] top-4 w-px bg-black/10 dark:bg-white/10" />
    {items.map((item) => <div key={`${item.time}-${item.title}`} className={`relative grid grid-cols-[4.2rem_1fr] gap-3 rounded-3xl border border-black/[.045] bg-white p-4 transition hover:-translate-y-0.5 dark:border-white/[.08] dark:bg-white/[.035] ${large ? "sm:p-5" : ""}`}>
      <p className="pt-1 text-sm font-bold text-ink/45 dark:text-white/40">{item.time}</p>
      <div className="relative">
        <span className={`absolute -left-[1.18rem] top-2 h-3 w-3 rounded-full ring-4 ring-white dark:ring-[#10211f] ${toneClass(item.tone)}`} />
        <p className="text-xs font-bold uppercase tracking-wider text-sage">{item.type}</p>
        <h3 className={`${large ? "text-xl" : "text-base"} font-bold`}>{item.title}</h3>
        <p className="mt-1 text-sm leading-6 text-ink/50 dark:text-white/42">{item.detail}</p>
      </div>
    </div>)}
  </div>;
}

function FocusMode({ event, task, risks, onBack }: { event: AssistantEvent; task?: AssistantTask; risks: string[]; onBack: () => void }) {
  return <section className="mx-auto max-w-4xl space-y-5">
    <div className="rounded-[2.25rem] border border-sage/20 bg-gradient-to-br from-sage/[.10] to-white p-6 text-center shadow-[0_24px_70px_rgba(25,52,47,.10)] dark:from-white/[.055] dark:to-sage/[.06] sm:p-10">
      <span className="chip bg-sage/[.12] text-sage"><Sparkles size={14} />Fokusmodus</span>
      <h2 className="mt-5 font-display text-5xl">Nur das Nächste.</h2>
      <p className="mx-auto mt-4 max-w-2xl leading-7 text-ink/58 dark:text-white/48">Keine volle Inbox. Keine langen Listen. Nur die wichtigste Sache, die nächste Aufgabe und der konkrete nächste Schritt.</p>
    </div>
    <div className="grid gap-5 md:grid-cols-2">
      <div className="card-premium p-6">
        <p className="eyebrow">Nächster Termin</p>
        <h3 className="mt-2 font-display text-3xl">{event.title}</h3>
        <p className="mt-3 leading-7 text-ink/55 dark:text-white/45">{event.date} · {event.startTime} · {event.location ?? "Online"}</p>
        <DetailBlock title="Jetzt vorbereiten" items={event.checklist} />
      </div>
      <div className="card-premium p-6">
        <p className="eyebrow">Nächste Aufgabe</p>
        <h3 className="mt-2 font-display text-3xl">{task?.title ?? "Keine offene Aufgabe"}</h3>
        <p className="mt-3 leading-7 text-ink/55 dark:text-white/45">{task ? `Frist: ${task.dueDate}` : "Du bist gerade ruhig."}</p>
        <DetailBlock title="Warum wichtig?" items={task ? [task.description, `Priorität: ${task.priority}`] : ["Keine direkte Handlung nötig."]} />
      </div>
    </div>
    <div className="rounded-[1.8rem] border border-coral/20 bg-coral/[.055] p-5">
      <p className="eyebrow text-coral">Achtung</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">{risks.slice(0, 4).map((risk) => <p key={risk} className="rounded-2xl bg-white/80 p-3 text-sm dark:bg-white/[.055]">{risk}</p>)}</div>
    </div>
    <div className="flex flex-wrap justify-center gap-3"><button onClick={onBack} className="btn-secondary">Zurück zum Dashboard</button><button className="btn-primary"><Check size={17} />Nächste Sache erledigen</button></div>
  </section>;
}

function ListGrid({ children }: { children: React.ReactNode }) {
  return <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">{children}</section>;
}

function Pill({ children, priority }: { children: React.ReactNode; priority: AssistantPriority }) {
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${priorityStyle(priority)}`}>{children}</span>;
}

function EventRow({ event, onOpen }: { event: AssistantEvent; onOpen: () => void }) {
  return <button onClick={onOpen} className="w-full rounded-3xl border border-black/[.06] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-sage/25 dark:border-white/[.08] dark:bg-white/[.035]"><div className="flex items-start justify-between gap-3"><div><p className="font-bold">{event.title}</p><p className="mt-1 text-sm text-ink/50 dark:text-white/42">{event.date} · {event.startTime} · {event.location ?? "Online"}</p></div><Pill priority={event.priority}>{event.priority}</Pill></div><p className="mt-3 text-sm leading-6 text-ink/55 dark:text-white/45">{event.summary}</p></button>;
}

function TaskRow({ task, onOpen, onDone }: { task: AssistantTask; onOpen: () => void; onDone: () => void }) {
  return <div className="rounded-3xl border border-black/[.06] bg-white p-4 dark:border-white/[.08] dark:bg-white/[.035]"><div className="flex gap-3"><button onClick={onDone} className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl border ${task.status === "erledigt" ? "border-sage bg-sage text-white" : "border-black/10 dark:border-white/15"}`}><Check size={16} /></button><button onClick={onOpen} className="min-w-0 flex-1 text-left"><div className="flex items-start justify-between gap-3"><p className={`font-bold ${task.status === "erledigt" ? "line-through opacity-45" : ""}`}>{task.title}</p><Pill priority={task.priority}>{task.priority}</Pill></div><p className="mt-1 text-sm text-ink/50 dark:text-white/42">Frist: {task.dueDate} · {task.category}</p><p className="mt-2 text-sm leading-6 text-ink/55 dark:text-white/45">{task.description}</p></button></div></div>;
}

function EmailRow({ email, onOpen }: { email: AssistantEmail; onOpen: () => void }) {
  return <button onClick={onOpen} className="w-full rounded-3xl border border-black/[.06] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-coral/25 dark:border-white/[.08] dark:bg-white/[.035]"><div className="flex items-start justify-between gap-3"><div><p className="font-bold">{email.subject}</p><p className="mt-1 text-xs text-ink/45 dark:text-white/38">{email.from}</p></div><Pill priority={email.priority}>{email.needsReply ? "Antwort" : email.priority}</Pill></div><p className="mt-3 text-sm leading-6 text-ink/55 dark:text-white/45">{assistantSummary(email)}</p></button>;
}

function DeliveryRow({ delivery, onOpen }: { delivery: AssistantDelivery; onOpen: () => void }) {
  return <button onClick={onOpen} className="w-full rounded-3xl border border-black/[.06] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-amber/25 dark:border-white/[.08] dark:bg-white/[.035]"><div className="flex items-start justify-between gap-3"><div><p className="font-bold">{delivery.provider}: {delivery.product}</p><p className="mt-1 text-sm text-ink/50 dark:text-white/42">{delivery.carrier} · {delivery.expectedDate}</p></div><Package className="text-amber" /></div><p className="mt-3 text-sm leading-6 text-ink/55 dark:text-white/45">Status: {delivery.status} · Bestellung {delivery.orderNumber}</p></button>;
}

function SuggestionCard({ item, onUpdate }: { item: AssistantSuggestion; onUpdate: (id: string, status: AssistantSuggestion["status"]) => void }) {
  return <article className="rounded-3xl border border-black/[.06] bg-white p-4 dark:border-white/[.08] dark:bg-white/[.035]"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wider text-sage">{item.type} · {item.category}</p><h3 className="mt-1 font-bold">{item.title}</h3></div><Pill priority={item.priority}>{item.priority}</Pill></div><p className="mt-3 text-sm leading-6 text-ink/55 dark:text-white/45">{item.summary}</p>{item.date && <p className="mt-2 text-xs font-semibold text-coral">Datum/Frist: {item.date}</p>}<div className="mt-4 grid grid-cols-3 gap-2"><button onClick={() => onUpdate(item.id, "akzeptiert")} className="rounded-xl bg-sage px-3 py-2 text-xs font-bold text-white">Akzeptieren</button><button onClick={() => onUpdate(item.id, "später")} className="rounded-xl bg-sand px-3 py-2 text-xs font-bold text-forest dark:bg-white/[.07] dark:text-white/70">Später</button><button onClick={() => onUpdate(item.id, "ignoriert")} className="rounded-xl bg-coral/10 px-3 py-2 text-xs font-bold text-coral">Ignorieren</button></div><p className="mt-3 text-xs text-ink/40 dark:text-white/35">Status: {item.status}</p></article>;
}

function SettingsPanel() {
  return <section className="grid gap-5 lg:grid-cols-2">
    <Panel title="Verbundene Konten" subtitle="OAuth vorbereitet, keine Passwörter speichern" icon={ShieldCheck}>
      {connectedAccounts.map((account) => <div key={account.provider} className="rounded-2xl border border-black/[.06] p-4 dark:border-white/[.08]"><div className="flex items-start justify-between gap-3"><div><p className="font-bold">{account.provider}</p><p className="text-sm text-ink/45 dark:text-white/40">{account.email}</p></div><span className="chip bg-amber/[.12] text-amber">{account.status}</span></div><p className="mt-3 text-xs leading-5 text-ink/45 dark:text-white/38">Berechtigungen: {account.scopes.join(", ")}</p><button className="btn-secondary mt-4 w-full" disabled>OAuth verbinden · Backend erforderlich</button></div>)}
    </Panel>
    <Panel title="Sicherheit & Kontrolle" subtitle="Keine Aktion ohne Bestätigung" icon={AlertCircle}>
      {["Keine E-Mail wird automatisch versendet.", "Keine Termine werden automatisch gelöscht.", "Vorschläge müssen akzeptiert, bearbeitet oder ignoriert werden.", "Später: verschlüsselte Speicherung, Audit-Log und Konto trennen.", "Mehrsprachigkeit: Deutsch vorbereitet, Englisch/Dari/Persisch später ergänzbar."].map((item) => <p className="rounded-2xl bg-sand p-3 text-sm dark:bg-white/[.06]" key={item}>{item}</p>)}
    </Panel>
  </section>;
}

function DetailDrawer({ detail, onClose }: { detail: NonNullable<DetailItem>; onClose: () => void }) {
  const title = detail.kind === "Termin" ? detail.item.title : detail.kind === "Aufgabe" ? detail.item.title : detail.kind === "E-Mail" ? detail.item.subject : `${detail.item.provider}: ${detail.item.product}`;
  return <div className="fixed inset-0 z-[80] bg-[#06100f]/65 p-3 backdrop-blur-sm sm:p-6" onClick={onClose}>
    <aside className="ml-auto flex h-full max-w-2xl flex-col overflow-hidden rounded-[2rem] bg-cloud shadow-2xl dark:bg-[#0b1918]" onClick={(event) => event.stopPropagation()}>
      <header className="flex items-start justify-between gap-4 border-b border-black/[.06] p-5 dark:border-white/[.08]"><div><p className="eyebrow">{detail.kind} Detailansicht</p><h2 className="mt-2 font-display text-3xl">{title}</h2></div><button onClick={onClose} className="grid h-11 w-11 place-items-center rounded-2xl bg-white shadow-sm dark:bg-white/[.07]"><X size={19} /></button></header>
      <div className="min-h-0 flex-1 overflow-y-auto p-5">
        {detail.kind === "Termin" && <div className="space-y-4">
          <DetailLine icon={CalendarDays} label="Datum" value={`${detail.item.date} · ${detail.item.startTime} · ${detail.item.duration}`} />
          <DetailLine icon={MapPin} label="Ort" value={detail.item.address ?? detail.item.location ?? "Online"} />
          {detail.item.onlineLink && <DetailLine icon={LinkIcon} label="Online-Link" value={detail.item.onlineLink} />}
          <DetailLine icon={UserRound} label="Ansprechpartner" value={detail.item.contact ?? detail.item.organizer} />
          <DetailBlock title="Zusammenfassung" items={[detail.item.summary]} />
          <DetailBlock title="Benötigte Unterlagen" items={detail.item.requiredDocuments} />
          <DetailBlock title="Checkliste Vorbereitung" items={detail.item.checklist} />
          <div className="grid gap-2 sm:grid-cols-2"><button className="btn-primary"><Navigation size={17} />Navigation starten</button><button className="btn-secondary"><Mail size={17} />Antwort schreiben</button></div>
        </div>}
        {detail.kind === "Aufgabe" && <div className="space-y-4">
          <DetailLine icon={Clock} label="Frist" value={detail.item.dueDate} />
          <DetailLine icon={AlertCircle} label="Priorität" value={detail.item.priority} />
          <DetailLine icon={Inbox} label="Quelle" value={detail.item.source} />
          <DetailBlock title="Beschreibung" items={[detail.item.description]} />
          <DetailBlock title="Unteraufgaben" items={detail.item.subtasks.length ? detail.item.subtasks : ["Keine Unteraufgaben"]} />
          <DetailBlock title="Erinnerungen" items={detail.item.reminders} />
          <button className="btn-primary"><Check size={17} />Erledigt</button>
        </div>}
        {detail.kind === "E-Mail" && <div className="space-y-4">
          <DetailLine icon={Mail} label="Von" value={detail.item.from} />
          <DetailLine icon={Clock} label="Empfangen" value={detail.item.receivedAt} />
          <DetailLine icon={AlertCircle} label="Priorität" value={detail.item.priority} />
          <DetailBlock title="KI-Zusammenfassung" items={[assistantSummary(detail.item)]} />
          <DetailBlock title="Originalauszug" items={[detail.item.body]} />
          <DetailBlock title="Anhänge" items={detail.item.attachments.length ? detail.item.attachments : ["Keine Anhänge"]} />
          <div className="grid gap-2 sm:grid-cols-2"><button className="btn-primary"><PencilLine size={17} />Antwort vorbereiten</button><button className="btn-secondary"><Plus size={17} />In To-do umwandeln</button></div>
        </div>}
        {detail.kind === "Lieferung" && <div className="space-y-4">
          <DetailLine icon={Truck} label="Lieferdienst" value={detail.item.carrier} />
          <DetailLine icon={Package} label="Bestellnummer" value={detail.item.orderNumber} />
          <DetailLine icon={Clock} label="Voraussichtlich" value={detail.item.expectedDate} />
          <DetailLine icon={MapPin} label="Adresse" value={detail.item.address} />
          {detail.item.trackingLink && <DetailLine icon={LinkIcon} label="Tracking" value={detail.item.trackingLink} />}
          <DetailBlock title="Status" items={[detail.item.status]} />
        </div>}
      </div>
    </aside>
  </div>;
}

function DetailLine({ icon: Icon, label, value }: { icon: typeof CalendarDays; label: string; value: string }) {
  return <div className="flex gap-3 rounded-2xl bg-white p-4 dark:bg-white/[.05]"><Icon className="mt-0.5 shrink-0 text-sage" size={18} /><div><p className="text-xs font-bold uppercase tracking-wider text-sage">{label}</p><p className="mt-1 text-sm leading-6">{value}</p></div></div>;
}

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-2xl border border-black/[.06] p-4 dark:border-white/[.08]"><h3 className="font-bold">{title}</h3><ul className="mt-3 space-y-2">{items.map((item) => <li className="flex gap-2 text-sm leading-6" key={item}><ChevronRight className="mt-1 shrink-0 text-coral" size={15} />{item}</li>)}</ul></div>;
}
