import { legalParagraphs } from "./legalParagraphs";
import { legalSources } from "./legalKnowledge";
import type { LegalParagraph, LegalSource } from "../types";

export const paragraphTargetAudiences = [
  "Migrantinnen und Migranten",
  "Studierende",
  "Arbeitnehmer",
  "Geflüchtete",
  "Familien",
  "Beratungsstellen",
  "Sachbearbeitung",
] as const;

export type ParagraphTargetAudience = (typeof paragraphTargetAudiences)[number];
export type ParagraphDifficulty = "Aufbau" | "Fortgeschritten" | "Experte";
export type ParagraphRelevance = "Grundlage" | "hoch" | "sehr hoch";
export type ParagraphReviewStatus = "aktuell" | "prüfen" | "veraltet" | "quelle-fehlt";

export interface ParagraphDocument {
  name: string;
  whyNeeded: string;
  whereToGet: string;
  attention: string;
}

export interface ParagraphProcedureStep {
  step: string;
  action: string;
  responsibleParty: string;
  warning?: string;
}

export interface ParagraphRequirements {
  mandatory: string[];
  optional: string[];
  caseSpecific: string[];
}

export interface ParagraphConsequences {
  ifRequirementsMet: string[];
  ifRequirementsMissing: string[];
  possibleResults: string[];
}

export interface LegalParagraphProfile {
  id: string;
  originalId: string;
  law: string;
  paragraph: string;
  title: string;
  area: string;
  category: string;
  targetAudiences: ParagraphTargetAudience[];
  difficulty: ParagraphDifficulty;
  relevance: ParagraphRelevance;
  responsibleAuthorities: string[];
  source?: LegalSource;
  sourceTrust: LegalSource["trust"] | "D";
  sourceTitle: string;
  sourceUrl?: string;
  sourcePublisher: string;
  sourceDate: string;
  lastCheckedAt: string;
  reviewStatus: ParagraphReviewStatus;
  legalSensitivity: boolean;
  overview: string;
  simpleSummary: string;
  professionalSummary: string;
  legalContext: string;
  purpose: string;
  appliesTo: string[];
  requirements: ParagraphRequirements;
  documents: ParagraphDocument[];
  procedureSteps: ParagraphProcedureStep[];
  legalConsequences: ParagraphConsequences;
  practicalCommentary: string;
  authorityPerspective: string[];
  counselingPerspective: string[];
  practiceExamples: { label: string; text: string }[];
  commonMistakes: string[];
  checklist: string[];
  nextSteps: string[];
  relatedParagraphs: string[];
  disclaimer: string;
  searchText: string;
  raw: LegalParagraph;
}

function sourceFor(paragraph: LegalParagraph): LegalSource | undefined {
  return legalSources.find((source) => source.id === paragraph.sourceId);
}

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items.filter(Boolean)));
}

function lawGroup(paragraph: LegalParagraph) {
  if (paragraph.law.includes("AufenthG")) return "Aufenthaltsrecht";
  if (paragraph.law.includes("Asyl")) return "Asyl & Schutz";
  if (paragraph.law.includes("SGB") || paragraph.law.includes("AsylbLG")) return "Sozialleistungen";
  if (paragraph.law.includes("StAG")) return "Einbürgerung";
  if (paragraph.law.includes("Vw")) return "Verwaltungsverfahren";
  if (paragraph.law.includes("Freizüg")) return "EU-Freizügigkeit";
  if (paragraph.law.includes("BeschV")) return "Arbeit";
  if (paragraph.law.includes("IntV")) return "Integration & Sprache";
  return paragraph.area;
}

function inferAudiences(paragraph: LegalParagraph): ParagraphTargetAudience[] {
  const text = `${paragraph.law} ${paragraph.title} ${paragraph.area} ${paragraph.shortSummary} ${paragraph.requirements.join(" ")} ${paragraph.linkedParagraphs.join(" ")}`.toLowerCase();
  const audiences = new Set<ParagraphTargetAudience>(["Beratungsstellen", "Sachbearbeitung"]);

  if (text.includes("studium") || text.includes("hochschule") || text.includes("bafög")) audiences.add("Studierende");
  if (text.includes("arbeit") || text.includes("beschäftigung") || text.includes("fachkraft") || text.includes("ausbildung") || text.includes("chancenkarte")) audiences.add("Arbeitnehmer");
  if (text.includes("asyl") || text.includes("schutz") || text.includes("duldung") || text.includes("gestattung") || text.includes("abschieb")) audiences.add("Geflüchtete");
  if (text.includes("familie") || text.includes("kind") || text.includes("ehe") || text.includes("nachzug")) audiences.add("Familien");
  if (text.includes("einbürger") || text.includes("niederlassung") || text.includes("daueraufenthalt")) audiences.add("Migrantinnen und Migranten");

  return Array.from(audiences);
}

function difficultyFor(paragraph: LegalParagraph): ParagraphDifficulty {
  const score = paragraph.requirements.length + paragraph.interpretation.length + paragraph.linkedParagraphs.length + paragraph.examination.steps.length;
  if (score > 24) return "Experte";
  if (score > 15) return "Fortgeschritten";
  return "Aufbau";
}

function relevanceFor(paragraph: LegalParagraph): ParagraphRelevance {
  const category = lawGroup(paragraph);
  if (["Aufenthaltsrecht", "Asyl & Schutz", "Sozialleistungen", "Verwaltungsverfahren"].includes(category)) return "sehr hoch";
  if (paragraph.requirements.length >= 6 || paragraph.examination.steps.length >= 6) return "hoch";
  return "Grundlage";
}

function reviewStatusFor(source?: LegalSource): ParagraphReviewStatus {
  if (!source) return "quelle-fehlt";
  if (source.outdated) return "veraltet";
  if (source.trust === "A") return "aktuell";
  return "prüfen";
}

function authoritiesFor(paragraph: LegalParagraph): string[] {
  const law = paragraph.law;
  if (law.includes("AufenthG")) return ["Ausländerbehörde", "deutsche Auslandsvertretung", "gegebenenfalls Bundesagentur für Arbeit"];
  if (law.includes("Asyl")) return ["BAMF", "Ausländerbehörde", "Verwaltungsgericht bei Rechtsbehelfen"];
  if (law.includes("SGB II")) return ["Jobcenter"];
  if (law.includes("SGB III")) return ["Agentur für Arbeit"];
  if (law.includes("SGB XII")) return ["Sozialamt"];
  if (law.includes("AsylbLG")) return ["Leistungsbehörde nach AsylbLG", "Kommunalverwaltung"];
  if (law.includes("StAG")) return ["Einbürgerungsbehörde"];
  if (law.includes("Freizüg")) return ["Ausländerbehörde", "Freizügigkeitsbehörde"];
  if (law.includes("Vw")) return ["zuständige Behörde", "Verwaltungsgericht bei Rechtsbehelfen"];
  if (law.includes("IntV")) return ["BAMF", "Kursträger", "Ausländerbehörde oder Jobcenter je nach Zugang"];
  return ["zuständige Behörde"];
}

function documentDetails(name: string): ParagraphDocument {
  const lower = name.toLowerCase();
  if (lower.includes("pass") || lower.includes("identität")) {
    return {
      name,
      whyNeeded: "Identität, Staatsangehörigkeit und Schreibweise müssen nachvollziehbar sein.",
      whereToGet: "Passbehörde, Botschaft, Ausländerbehörde oder vorhandene Originalunterlagen.",
      attention: "Gültigkeit, Schreibweise, Übersetzung, Vorder-/Rückseite und vollständige Kopie prüfen.",
    };
  }
  if (lower.includes("antrag") || lower.includes("schreiben")) {
    return {
      name,
      whyNeeded: "Die Behörde braucht eine klare Willenserklärung und einen prüfbaren Vorgang.",
      whereToGet: "Online-Portal, Formularservice, Behörde oder eigenes Anschreiben.",
      attention: "Aktenzeichen, Datum, Unterschrift, gewünschtes Ziel und Nachweis des Eingangs sichern.",
    };
  }
  if (lower.includes("titel") || lower.includes("aufenthalt") || lower.includes("gestattung") || lower.includes("duldung")) {
    return {
      name,
      whyNeeded: "Der aktuelle Status entscheidet über Zuständigkeit, Rechte, Fristen und mögliche Anschlussprüfung.",
      whereToGet: "Ausländerbehörde, BAMF-Unterlagen oder vorhandenes Aufenthaltsdokument.",
      attention: "Vorderseite, Rückseite, Zusatzblatt, Nebenbestimmungen und Ablaufdatum lesen.",
    };
  }
  if (lower.includes("lohn") || lower.includes("einkommen") || lower.includes("miet") || lower.includes("konto")) {
    return {
      name,
      whyNeeded: "Lebensunterhalt, Wohnraum, Bedarf oder Leistungsanspruch müssen belegt werden.",
      whereToGet: "Arbeitgeber, Vermieter, Bank, Jobcenter, Finanzamt oder Steuerunterlagen.",
      attention: "Aktualität, Zeitraum, vollständige Seiten und nachvollziehbare Beträge beachten.",
    };
  }
  if (lower.includes("vertrag") || lower.includes("arbeit") || lower.includes("zulassung")) {
    return {
      name,
      whyNeeded: "Der konkrete Zweck, zum Beispiel Arbeit, Ausbildung oder Studium, muss nachweisbar sein.",
      whereToGet: "Arbeitgeber, Ausbildungsbetrieb, Hochschule, Schule oder zuständige Fachstelle.",
      attention: "Beginn, Dauer, Stundenumfang, Vergütung und fachliche Passung prüfen.",
    };
  }
  return {
    name,
    whyNeeded: "Dieses Dokument hilft, den Sachverhalt prüfbar und nachvollziehbar zu machen.",
    whereToGet: "Zuständige Stelle, Arbeitgeber, Hochschule, Behörde oder eigene Unterlagen.",
    attention: "Nur vollständige, lesbare und aktuelle Nachweise verwenden.",
  };
}

function buildRequirements(paragraph: LegalParagraph): ParagraphRequirements {
  const midpoint = Math.ceil(paragraph.requirements.length / 2);
  return {
    mandatory: paragraph.requirements.slice(0, midpoint),
    optional: paragraph.interpretation.slice(0, 3),
    caseSpecific: paragraph.requirements.slice(midpoint),
  };
}

function buildProcedure(paragraph: LegalParagraph): ParagraphProcedureStep[] {
  const authorities = authoritiesFor(paragraph);
  const steps = paragraph.examination.steps.length
    ? paragraph.examination.steps
    : ["Zuständigkeit klären", "Sachverhalt und Status erfassen", "Unterlagen vollständig prüfen", "Entscheidung oder nächsten Verfahrensschritt dokumentieren"];

  return steps.map((step, index) => ({
    step: `Schritt ${index + 1}`,
    action: step,
    responsibleParty: index === 0 ? "Nutzerin/Nutzer oder Beratung" : authorities[0],
    warning: index === 0 ? "Fristen, Bescheide und Zustellung immer zuerst sichern." : undefined,
  }));
}

function buildConsequences(paragraph: LegalParagraph): ParagraphConsequences {
  return {
    ifRequirementsMet: paragraph.legalConsequence.length
      ? paragraph.legalConsequence
      : ["Erteilung, Verlängerung, Anerkennung oder positive Verfahrensentscheidung kann möglich sein."],
    ifRequirementsMissing: [
      "konkrete Nachforderung oder Anhörung kann erforderlich sein",
      "Frist sichern und fehlende Unterlagen nachvollziehbar nachreichen",
      "Ablehnung, Nebenbestimmung oder anderer Rechtsnachteil kann möglich sein",
      "Rechtsbehelfsbelehrung, Frist und Beratungsmöglichkeit prüfen",
    ],
    possibleResults: unique([
      "Genehmigung oder positive Entscheidung",
      "Nachforderung weiterer Unterlagen",
      "Ablehnung mit Begründung",
      "Nebenbestimmung, Befristung oder Auflage",
      "Rechtsbehelf oder erneute Antragstellung prüfen",
      ...paragraph.examination.remedies.slice(0, 3),
    ]),
  };
}

function practiceExamplesFor(paragraph: LegalParagraph) {
  return Object.entries(paragraph.practiceCases).map(([label, text]) => ({
    label: {
      simple: "Alltag",
      complex: "Komplexer Fall",
      authority: "Behörde",
      jobcenter: "Jobcenter",
      counseling: "Beratung",
    }[label] ?? label,
    text,
  }));
}

function commonMistakesFor(paragraph: LegalParagraph): string[] {
  return unique([
    "Frist, Zustellung oder Rechtsbehelfsbelehrung nicht prüfen",
    "Dokumente unvollständig, unleserlich oder ohne Übersetzung einreichen",
    "Zuständigkeit oder betroffene Behörde verwechseln",
    "Nebenbestimmungen, Zusatzblatt oder Einschränkungen nicht lesen",
    "Einzelfallabhängige Ausnahmen als automatische Regel verstehen",
    ...paragraph.examination.refusalReasons.slice(0, 5),
  ]);
}

function nextStepsFor(paragraph: LegalParagraph): string[] {
  return unique([
    "aktuellen Status und Fristen notieren",
    "zuständige Behörde bestimmen",
    "benötigte Dokumente sammeln und lesbar speichern",
    "offene Fragen schriftlich formulieren",
    "bei Ablehnung, Bescheid oder Frist qualifizierte Beratung einholen",
    ...paragraph.examination.remedies.slice(0, 3),
  ]);
}

function buildSearchText(profile: Omit<LegalParagraphProfile, "searchText">) {
  return [
    profile.law,
    profile.paragraph,
    profile.title,
    profile.area,
    profile.category,
    profile.targetAudiences.join(" "),
    profile.overview,
    profile.simpleSummary,
    profile.professionalSummary,
    profile.purpose,
    profile.requirements.mandatory.join(" "),
    profile.requirements.caseSpecific.join(" "),
    profile.documents.map((document) => document.name).join(" "),
    profile.commonMistakes.join(" "),
    profile.relatedParagraphs.join(" "),
    profile.sourceTitle,
  ].join(" ").toLowerCase();
}

function toProfile(paragraph: LegalParagraph): LegalParagraphProfile {
  const source = sourceFor(paragraph);
  const category = lawGroup(paragraph);
  const requirements = buildRequirements(paragraph);
  const rawDocuments = paragraph.examination.documents.length
    ? paragraph.examination.documents
    : ["Identitätsdokument", "Antrag oder Schreiben", "Nachweise zum Zweck", "Fristen und Bescheide"];

  const profileWithoutSearch: Omit<LegalParagraphProfile, "searchText"> = {
    id: paragraph.id,
    originalId: paragraph.id,
    law: paragraph.law,
    paragraph: paragraph.paragraph,
    title: paragraph.title,
    area: paragraph.area,
    category,
    targetAudiences: inferAudiences(paragraph),
    difficulty: difficultyFor(paragraph),
    relevance: relevanceFor(paragraph),
    responsibleAuthorities: authoritiesFor(paragraph),
    source,
    sourceTrust: source?.trust ?? "D",
    sourceTitle: source?.title ?? "Quelle prüfen",
    sourceUrl: source?.url,
    sourcePublisher: source?.publisher ?? "nicht zugeordnet",
    sourceDate: source?.date ?? "unbekannt",
    lastCheckedAt: source?.checkedAt ?? "nicht geprüft",
    reviewStatus: reviewStatusFor(source),
    legalSensitivity: true,
    overview: paragraph.shortSummary,
    simpleSummary: paragraph.simpleExplanation,
    professionalSummary: `${paragraph.discretion} ${paragraph.commentary.shortCommentary}`.trim(),
    legalContext: paragraph.systemPosition,
    purpose: paragraph.purpose,
    appliesTo: [
      `Betroffene Zielgruppen: ${inferAudiences(paragraph).join(", ")}`,
      `Zuständige Stellen: ${authoritiesFor(paragraph).join(", ")}`,
      "Die konkrete Anwendbarkeit hängt vom Aufenthaltsstatus, Sachverhalt, Zeitpunkt und den Nachweisen ab.",
    ],
    requirements,
    documents: rawDocuments.map(documentDetails),
    procedureSteps: buildProcedure(paragraph),
    legalConsequences: buildConsequences(paragraph),
    practicalCommentary: paragraph.commentary.shortCommentary,
    authorityPerspective: paragraph.commentary.authorityPractice,
    counselingPerspective: paragraph.commentary.counselorPerspective,
    practiceExamples: practiceExamplesFor(paragraph),
    commonMistakes: commonMistakesFor(paragraph),
    checklist: paragraph.examination.checklist.length ? paragraph.examination.checklist : paragraph.requirements,
    nextSteps: nextStepsFor(paragraph),
    relatedParagraphs: paragraph.linkedParagraphs,
    disclaimer: "Diese Darstellung dient der allgemeinen Bildung und Orientierung. Sie ersetzt keine individuelle Rechtsberatung. Bei Fristen, Bescheiden, Ablehnungen oder existenziellen Folgen bitte qualifizierte Beratung, anwaltliche Hilfe oder die zuständige Behörde kontaktieren.",
    raw: paragraph,
  };

  return {
    ...profileWithoutSearch,
    searchText: buildSearchText(profileWithoutSearch),
  };
}

export const paragraphProfiles: LegalParagraphProfile[] = legalParagraphs.map(toProfile);

export function getParagraphProfileById(id: string | undefined) {
  return paragraphProfiles.find((profile) => profile.id === id);
}
