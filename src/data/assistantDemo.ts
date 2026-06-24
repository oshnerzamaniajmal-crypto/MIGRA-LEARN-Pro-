export type AssistantCategory =
  | "Arbeit" | "Studium" | "Behörde" | "Bewerbung" | "Gesundheit" | "Familie"
  | "Finanzen" | "Lieferung" | "Veranstaltung" | "Reisen" | "Kurse" | "Projektarbeit" | "Privat" | "Dringend";

export type AssistantPriority = "niedrig" | "mittel" | "hoch" | "dringend";
export type AssistantStatus = "offen" | "in Arbeit" | "erledigt" | "verschoben";

export interface AssistantEmail {
  id: string;
  subject: string;
  from: string;
  to: string;
  receivedAt: string;
  body: string;
  category: AssistantCategory;
  priority: AssistantPriority;
  needsReply: boolean;
  attachments: string[];
  links: string[];
}

export interface AssistantEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime?: string;
  duration: string;
  location?: string;
  address?: string;
  onlineLink?: string;
  organizer: string;
  reason: string;
  source: "E-Mail" | "Kalender" | "Manuell";
  category: AssistantCategory;
  priority: AssistantPriority;
  requiredDocuments: string[];
  checklist: string[];
  contact?: string;
  phone?: string;
  email?: string;
  summary: string;
}

export interface AssistantTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: AssistantPriority;
  category: AssistantCategory;
  status: AssistantStatus;
  source: "E-Mail" | "Kalender" | "Manuell" | "KI-Vorschlag";
  linkedEventId?: string;
  notes: string;
  subtasks: string[];
  reminders: string[];
}

export interface AssistantDelivery {
  id: string;
  provider: string;
  product: string;
  orderNumber: string;
  carrier: string;
  trackingLink?: string;
  status: string;
  expectedDate: string;
  address: string;
  pickupCode?: string;
  returnDeadline?: string;
  category: AssistantCategory;
}

export interface AssistantSuggestion {
  id: string;
  type: "Termin" | "Aufgabe" | "Frist" | "Lieferung" | "Antwort";
  title: string;
  summary: string;
  date?: string;
  priority: AssistantPriority;
  category: AssistantCategory;
  sourceEmailId?: string;
  status: "neu" | "akzeptiert" | "ignoriert" | "später";
}

export interface AssistantProject {
  id: string;
  title: string;
  category: AssistantCategory;
  summary: string;
  contacts: string[];
  nextStep: string;
  linkedItems: string[];
}

export const assistantEmails: AssistantEmail[] = [
  {
    id: "mail-oberkochen",
    subject: "Termin Oberkochen – Vorbereitung Jugendforum",
    from: "Nina Schneider <nina@example.org>",
    to: "Ajmal",
    receivedAt: "2026-06-24T08:15:00",
    body: "Hallo Ajmal, unser Termin ist am 01.07.2026 um 10:00 Uhr in Oberkochen. Bitte bringe die bisherigen Notizen, die Agenda und den letzten Entwurf mit. Gib mir bitte kurz Bescheid, ob du teilnehmen kannst.",
    category: "Projektarbeit",
    priority: "hoch",
    needsReply: true,
    attachments: ["Agenda_Jugendforum.pdf"],
    links: [],
  },
  {
    id: "mail-dhl",
    subject: "DHL Paket 003404341 erwartete Zustellung morgen",
    from: "DHL Paket <noreply@dhl.de>",
    to: "Ajmal",
    receivedAt: "2026-06-24T07:42:00",
    body: "Ihr Paket von Amazon kommt voraussichtlich am 25.06.2026. Sendungsnummer 003404341. Zustellung an Ihre Adresse. Tracking: https://dhl.de/tracking/003404341",
    category: "Lieferung",
    priority: "mittel",
    needsReply: false,
    attachments: [],
    links: ["https://dhl.de/tracking/003404341"],
  },
  {
    id: "mail-behoerde",
    subject: "Bitte Unterlagen bis Freitag nachreichen",
    from: "Ausländerbehörde <service@example.de>",
    to: "Ajmal",
    receivedAt: "2026-06-24T09:10:00",
    body: "Bitte senden Sie uns bis Freitag, 26.06.2026, eine Kopie des Passes, aktuelle Meldebescheinigung und Nachweis der Krankenversicherung. Ohne Unterlagen kann der Vorgang nicht weiterbearbeitet werden.",
    category: "Behörde",
    priority: "dringend",
    needsReply: true,
    attachments: ["Nachforderung.pdf"],
    links: [],
  },
  {
    id: "mail-meet",
    subject: "Online Meeting Bewerbung Stadt Ulm",
    from: "Recruiting Stadt Ulm <jobs@example.de>",
    to: "Ajmal",
    receivedAt: "2026-06-23T15:25:00",
    body: "Wir laden Sie am 27.06.2026 um 14:30 Uhr zum Online-Gespräch ein. Der Teams-Link lautet https://teams.microsoft.com/l/meetup-join/demo. Bitte halten Sie Lebenslauf und Zeugnisse bereit.",
    category: "Bewerbung",
    priority: "hoch",
    needsReply: true,
    attachments: ["Einladung.pdf"],
    links: ["https://teams.microsoft.com/l/meetup-join/demo"],
  },
];

export const assistantEvents: AssistantEvent[] = [
  {
    id: "evt-oberkochen",
    title: "Termin Oberkochen",
    date: "2026-07-01",
    startTime: "10:00",
    endTime: "11:30",
    duration: "90 Minuten",
    location: "Oberkochen",
    address: "Rathaus Oberkochen",
    organizer: "Nina Schneider",
    reason: "Abstimmung zum Jugendforum",
    source: "E-Mail",
    category: "Projektarbeit",
    priority: "hoch",
    requiredDocuments: ["Agenda", "Notizen", "letzter Entwurf"],
    checklist: ["Route prüfen", "Unterlagen als PDF und gedruckt bereitlegen", "kurze Antwort an Nina senden"],
    contact: "Nina Schneider",
    email: "nina@example.org",
    summary: "Präsenztermin zur Vorbereitung des Jugendforums. Antwort und Unterlagen sind wichtig.",
  },
  {
    id: "evt-ulm",
    title: "Online-Gespräch Stadt Ulm",
    date: "2026-06-27",
    startTime: "14:30",
    duration: "ca. 45 Minuten",
    onlineLink: "https://teams.microsoft.com/l/meetup-join/demo",
    organizer: "Recruiting Stadt Ulm",
    reason: "Bewerbungsgespräch",
    source: "E-Mail",
    category: "Bewerbung",
    priority: "hoch",
    requiredDocuments: ["Lebenslauf", "Zeugnisse", "Stellenausschreibung"],
    checklist: ["Teams-Link testen", "Kamera/Mikrofon prüfen", "Antwort vorbereiten", "Fragen zur Stelle notieren"],
    email: "jobs@example.de",
    summary: "Online-Termin mit Teams-Link. Vorbereitung und pünktlicher Login wichtig.",
  },
];

export const assistantTasks: AssistantTask[] = [
  {
    id: "task-pass",
    title: "Unterlagen an Ausländerbehörde senden",
    description: "Passkopie, Meldebescheinigung und Krankenversicherung bis Freitag übermitteln.",
    dueDate: "2026-06-26",
    priority: "dringend",
    category: "Behörde",
    status: "offen",
    source: "E-Mail",
    notes: "Nachforderung aus E-Mail vom 24.06.",
    subtasks: ["Pass scannen", "Meldebescheinigung prüfen", "Krankenversicherung herunterladen", "Antwort-E-Mail formulieren"],
    reminders: ["1 Tag vorher", "Freitag 09:00"],
  },
  {
    id: "task-nina",
    title: "Nina Teilnahme bestätigen",
    description: "Kurz antworten, ob Termin Oberkochen am 01.07. passt.",
    dueDate: "2026-06-24",
    priority: "hoch",
    category: "Projektarbeit",
    status: "offen",
    source: "KI-Vorschlag",
    linkedEventId: "evt-oberkochen",
    notes: "Antwort erforderlich.",
    subtasks: ["Kalender prüfen", "Antwort senden"],
    reminders: ["Heute 17:00"],
  },
];

export const assistantDeliveries: AssistantDelivery[] = [
  {
    id: "del-dhl",
    provider: "Amazon",
    product: "Bestellung aus Amazon",
    orderNumber: "003404341",
    carrier: "DHL",
    trackingLink: "https://dhl.de/tracking/003404341",
    status: "voraussichtlich morgen",
    expectedDate: "2026-06-25",
    address: "Lieferadresse gespeichert",
    category: "Lieferung",
  },
];

export const assistantProjects: AssistantProject[] = [
  {
    id: "proj-ulm",
    title: "Bewerbung Stadt Ulm",
    category: "Bewerbung",
    summary: "Online-Gespräch, Unterlagen und Antwortstatus gesammelt.",
    contacts: ["Recruiting Stadt Ulm"],
    nextStep: "Teams-Link testen und Dokumente bereitlegen.",
    linkedItems: ["evt-ulm", "mail-meet"],
  },
  {
    id: "proj-jugendforum",
    title: "Jugendforum Oberkochen",
    category: "Projektarbeit",
    summary: "Termin, Agenda und To-do zur Bestätigung gehören zusammen.",
    contacts: ["Nina Schneider"],
    nextStep: "Teilnahme bestätigen und Agenda vorbereiten.",
    linkedItems: ["evt-oberkochen", "task-nina", "mail-oberkochen"],
  },
];

export const connectedAccounts = [
  { provider: "Gmail", email: "nicht verbunden", status: "vorbereitet", scopes: ["Mail lesen", "Kalender lesen", "Entwürfe erstellen"] },
  { provider: "Outlook / Microsoft 365", email: "nicht verbunden", status: "vorbereitet", scopes: ["Mail.Read", "Calendars.Read", "Tasks.ReadWrite"] },
  { provider: "ICS Import", email: "lokal", status: "Demo", scopes: ["Kalenderdatei importieren"] },
];

const datePattern = /(\d{2}\.\d{2}\.\d{4})/;
const timePattern = /(\d{1,2}:\d{2})/;
const linkPattern = /(https?:\/\/\S+)/;

export function extractSuggestionsFromEmails(emails: AssistantEmail[]): AssistantSuggestion[] {
  return emails.flatMap((email) => {
    const suggestions: AssistantSuggestion[] = [];
    const lower = `${email.subject} ${email.body}`.toLowerCase();
    const date = email.body.match(datePattern)?.[1];
    const isoDate = date ? date.split(".").reverse().join("-") : undefined;

    if (lower.includes("termin") || lower.includes("meeting") || lower.includes("gespräch")) {
      suggestions.push({
        id: `sug-event-${email.id}`,
        type: "Termin",
        title: email.subject.replace(/^re:\s*/i, ""),
        summary: `Termin erkannt${date ? ` am ${date}` : ""}${email.body.match(timePattern)?.[1] ? ` um ${email.body.match(timePattern)?.[1]} Uhr` : ""}.`,
        date: isoDate,
        priority: email.priority,
        category: email.category,
        sourceEmailId: email.id,
        status: "neu",
      });
    }
    if (lower.includes("bitte") || lower.includes("senden") || lower.includes("antwort") || lower.includes("nachreichen")) {
      suggestions.push({
        id: `sug-task-${email.id}`,
        type: email.needsReply ? "Antwort" : "Aufgabe",
        title: email.needsReply ? `Antwort vorbereiten: ${email.subject}` : `Aufgabe aus E-Mail: ${email.subject}`,
        summary: "Die E-Mail enthält wahrscheinlich eine Handlung oder Antwortpflicht.",
        date: isoDate,
        priority: email.priority,
        category: email.category,
        sourceEmailId: email.id,
        status: "neu",
      });
    }
    if (lower.includes("frist") || lower.includes("bis freitag") || lower.includes("bis ")) {
      suggestions.push({
        id: `sug-deadline-${email.id}`,
        type: "Frist",
        title: `Frist prüfen: ${email.subject}`,
        summary: "Frist oder spätester Abgabetermin erkannt. Bitte bestätigen und Erinnerung setzen.",
        date: isoDate,
        priority: email.priority === "mittel" ? "hoch" : email.priority,
        category: email.category,
        sourceEmailId: email.id,
        status: "neu",
      });
    }
    if (lower.includes("paket") || lower.includes("lieferung") || lower.includes("zustellung") || lower.includes("tracking")) {
      suggestions.push({
        id: `sug-delivery-${email.id}`,
        type: "Lieferung",
        title: `Lieferung erkannt: ${email.subject}`,
        summary: `Tracking/Bestellung erkannt${email.body.match(linkPattern)?.[1] ? " mit Link." : "."}`,
        date: isoDate,
        priority: "mittel",
        category: "Lieferung",
        sourceEmailId: email.id,
        status: "neu",
      });
    }
    return suggestions;
  });
}

export function assistantSummary(email: AssistantEmail) {
  const action = email.needsReply ? "Antwort prüfen oder Entwurf vorbereiten." : "Keine direkte Antwort nötig.";
  const docs = email.attachments.length ? `Anhänge: ${email.attachments.join(", ")}.` : "Keine Anhänge erkannt.";
  return `Was ist passiert? ${email.subject}. Was tun? ${action} Priorität: ${email.priority}. ${docs}`;
}
