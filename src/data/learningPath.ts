import type { GlossaryEntry, LearningLesson, LearningModule, LessonDifficulty, LessonSourceMeta } from "../types";

const CHECKED_AT = "30.06.2026";
const SOURCE_STAND = "Juni 2026";

const officialSources = {
  bamfIntegration: {
    sourceTitle: "Integrationskurse",
    sourceUrl: "https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/integrationskurse-node.html",
    sourcePublisher: "Bundesamt für Migration und Flüchtlinge",
    sourceType: "authority",
    sourceDate: "laufende Informationsseite",
    lastCheckedAt: CHECKED_AT,
    legalStatusRelevant: false,
    needsRegularReview: true,
    confidenceLevel: "hoch",
    contentReviewerNote: "Offizielle Informationsseite zum Integrationskurs; Details und Teilnahmeberechtigung regelmäßig prüfen.",
  },
  aufenthg: {
    sourceTitle: "Aufenthaltsgesetz (AufenthG)",
    sourceUrl: "https://www.gesetze-im-internet.de/aufenthg_2004/",
    sourcePublisher: "Bundesministerium der Justiz / Bundesamt für Justiz",
    sourceType: "legal",
    sourceDate: "laufende Fassung",
    lastCheckedAt: CHECKED_AT,
    legalStatusRelevant: true,
    needsRegularReview: true,
    confidenceLevel: "hoch",
    contentReviewerNote: "Amtliche Normquelle; Auslegung und Einzelfallprüfung bleiben erforderlich.",
  },
  asylg: {
    sourceTitle: "Asylgesetz (AsylG)",
    sourceUrl: "https://www.gesetze-im-internet.de/asylvfg_1992/",
    sourcePublisher: "Bundesministerium der Justiz / Bundesamt für Justiz",
    sourceType: "legal",
    sourceDate: "laufende Fassung",
    lastCheckedAt: CHECKED_AT,
    legalStatusRelevant: true,
    needsRegularReview: true,
    confidenceLevel: "hoch",
    contentReviewerNote: "Amtliche Normquelle für Asylverfahren; GEAS-Änderungen und Übergänge regelmäßig prüfen.",
  },
  bamfAsyl: {
    sourceTitle: "Ablauf des deutschen Asylverfahrens",
    sourceUrl: "https://www.bamf.de/DE/Themen/AsylFluechtlingsschutz/AblaufAsylverfahrens/ablaufasylverfahrens-node.html",
    sourcePublisher: "Bundesamt für Migration und Flüchtlinge",
    sourceType: "authority",
    sourceDate: "laufende Informationsseite",
    lastCheckedAt: CHECKED_AT,
    legalStatusRelevant: true,
    needsRegularReview: true,
    confidenceLevel: "hoch",
    contentReviewerNote: "Offizielle BAMF-Übersicht; individuelle Bescheide und Fristen benötigen Beratung.",
  },
  makeIt: {
    sourceTitle: "Make it in Germany",
    sourceUrl: "https://www.make-it-in-germany.com/de/",
    sourcePublisher: "Bundesregierung / Fachkräfteportal",
    sourceType: "official",
    sourceDate: "laufende Informationsseite",
    lastCheckedAt: CHECKED_AT,
    legalStatusRelevant: true,
    needsRegularReview: true,
    confidenceLevel: "hoch",
    contentReviewerNote: "Offizielles Portal für Fachkräfteeinwanderung; dynamische Gehalts- und Visumswerte stets aktuell prüfen.",
  },
  anerkennung: {
    sourceTitle: "Anerkennung in Deutschland",
    sourceUrl: "https://www.anerkennung-in-deutschland.de/html/de/index.php",
    sourcePublisher: "Bundesinstitut für Berufsbildung / BMBF",
    sourceType: "official",
    sourceDate: "laufende Informationsseite",
    lastCheckedAt: CHECKED_AT,
    legalStatusRelevant: true,
    needsRegularReview: true,
    confidenceLevel: "hoch",
    contentReviewerNote: "Offizielles Anerkennungsportal; zuständige Stelle und Referenzberuf bleiben einzelfallabhängig.",
  },
  ba: {
    sourceTitle: "Bundesagentur für Arbeit",
    sourceUrl: "https://www.arbeitsagentur.de/",
    sourcePublisher: "Bundesagentur für Arbeit",
    sourceType: "authority",
    sourceDate: "laufende Informationsseite",
    lastCheckedAt: CHECKED_AT,
    legalStatusRelevant: true,
    needsRegularReview: true,
    confidenceLevel: "hoch",
    contentReviewerNote: "Offizielle Quelle für Arbeit, Ausbildung und Leistungsinformationen; lokale Zuständigkeit beachten.",
  },
  bafög: {
    sourceTitle: "BAföG Digital",
    sourceUrl: "https://www.bafoeg-digital.de/",
    sourcePublisher: "Bund und Länder",
    sourceType: "official",
    sourceDate: "laufende Informationsseite",
    lastCheckedAt: CHECKED_AT,
    legalStatusRelevant: true,
    needsRegularReview: true,
    confidenceLevel: "hoch",
    contentReviewerNote: "Offizielles BAföG-Portal; Anspruch hängt stark vom Einzelfall ab.",
  },
  bpb: {
    sourceTitle: "Bundeszentrale für politische Bildung",
    sourceUrl: "https://www.bpb.de/",
    sourcePublisher: "Bundeszentrale für politische Bildung",
    sourceType: "recognized",
    sourceDate: "laufende Informationsseite",
    lastCheckedAt: CHECKED_AT,
    legalStatusRelevant: false,
    needsRegularReview: false,
    confidenceLevel: "hoch",
    contentReviewerNote: "Anerkannte Bildungsquelle für Demokratie, Gesellschaft und politische Grundbildung.",
  },
  grundgesetz: {
    sourceTitle: "Grundgesetz für die Bundesrepublik Deutschland",
    sourceUrl: "https://www.gesetze-im-internet.de/gg/",
    sourcePublisher: "Bundesministerium der Justiz / Bundesamt für Justiz",
    sourceType: "legal",
    sourceDate: "laufende Fassung",
    lastCheckedAt: CHECKED_AT,
    legalStatusRelevant: true,
    needsRegularReview: true,
    confidenceLevel: "hoch",
    contentReviewerNote: "Amtliche Normquelle für Grundrechte; konkrete Rechtsdurchsetzung bleibt einzelfallabhängig.",
  },
  stagt: {
    sourceTitle: "Staatsangehörigkeitsgesetz (StAG)",
    sourceUrl: "https://www.gesetze-im-internet.de/stag/",
    sourcePublisher: "Bundesministerium der Justiz / Bundesamt für Justiz",
    sourceType: "legal",
    sourceDate: "laufende Fassung",
    lastCheckedAt: CHECKED_AT,
    legalStatusRelevant: true,
    needsRegularReview: true,
    confidenceLevel: "hoch",
    contentReviewerNote: "Einbürgerungsrecht ist rechtlich sensibel und politisch dynamisch; Stand regelmäßig prüfen.",
  },
  destatis: {
    sourceTitle: "Migration und Integration",
    sourceUrl: "https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Migration-Integration/_inhalt.html",
    sourcePublisher: "Statistisches Bundesamt",
    sourceType: "official",
    sourceDate: "laufende Statistikseite",
    lastCheckedAt: CHECKED_AT,
    legalStatusRelevant: false,
    needsRegularReview: true,
    confidenceLevel: "hoch",
    contentReviewerNote: "Offizielle Statistikquelle; Zahlen ändern sich regelmäßig.",
  },
} satisfies Record<string, LessonSourceMeta>;

export const learningModules: LearningModule[] = [
  { id: "m1-grundlagen", moduleOrder: 1, title: "Grundlagen von Migration und Integration", shortTitle: "Grundlagen", description: "Begriffe, Ursachen und erste Orientierung.", learningOutcome: "Du kannst Migration, Flucht, Asyl, Integration und Teilhabe sicher unterscheiden.", estimatedMinutes: 260, color: "#6f9b88" },
  { id: "m2-deutschland", moduleOrder: 2, title: "Deutschland verstehen", shortTitle: "Deutschland", description: "Bundesstaat, Behörden, Rechtsstaat und Alltag.", learningOutcome: "Du erkennst Zuständigkeiten, Fristen und typische Kommunikationsregeln.", estimatedMinutes: 250, color: "#748fa5" },
  { id: "m3-aufenthalt", moduleOrder: 3, title: "Aufenthaltsrecht Grundlagen", shortTitle: "Aufenthalt", description: "Visum, Aufenthaltstitel, Duldung, Gestattung und Nebenbestimmungen.", learningOutcome: "Du kannst Statusdokumente lesen und rechtliche Grundbegriffe vorsichtig einordnen.", estimatedMinutes: 330, color: "#c77752" },
  { id: "m4-asyl", moduleOrder: 4, title: "Asyl, Schutzformen und humanitäre Titel", shortTitle: "Asyl & Schutz", description: "Asylverfahren, Schutzstatus, Anhörung und Bescheid.", learningOutcome: "Du verstehst den Ablauf grob und erkennst Beratungsbedarf bei Fristen und Bescheiden.", estimatedMinutes: 360, color: "#987da5" },
  { id: "m5-behoerden", moduleOrder: 5, title: "Behörden, Dokumente und Fristen", shortTitle: "Behörden", description: "Briefe verstehen, Unterlagen ordnen und Fristen sichern.", learningOutcome: "Du kannst Behördenpost in Aufgaben, Fristen und Nachweise übersetzen.", estimatedMinutes: 300, color: "#d7a84d" },
  { id: "m6-sprache", moduleOrder: 6, title: "Sprache, Integrationskurs und Berufssprachkurs", shortTitle: "Sprache", description: "A1 bis C1, Integrationskurs, Berufssprache und Behördenkommunikation.", learningOutcome: "Du kannst Sprachziele planen und passende Lernwege unterscheiden.", estimatedMinutes: 310, color: "#6f9b88" },
  { id: "m7-arbeit", moduleOrder: 7, title: "Arbeit, Ausbildung und Anerkennung", shortTitle: "Arbeit", description: "Arbeitserlaubnis, Ausbildung, Bewerbung, Anerkennung und Jobcenter.", learningOutcome: "Du kannst berufliche Integration praktisch und rechtlich vorsichtig strukturieren.", estimatedMinutes: 340, color: "#c77752" },
  { id: "m8-studium", moduleOrder: 8, title: "Studium, BAföG und Hochschule", shortTitle: "Studium", description: "Hochschule, Prüfungsordnung, BAföG, Fristen und Aufenthalt.", learningOutcome: "Du erkennst wichtige Hochschulbegriffe und typische Verwaltungsprozesse.", estimatedMinutes: 330, color: "#748fa5" },
  { id: "m9-familie", moduleOrder: 9, title: "Familie, Kinder, Schule und Gesundheit", shortTitle: "Familie", description: "Kita, Schule, Gesundheit, Familienleistungen und Familiennachzug.", learningOutcome: "Du kannst Alltagsthemen mit Dokumenten, Zuständigkeiten und Hilfen verbinden.", estimatedMinutes: 290, color: "#987da5" },
  { id: "m10-rechte", moduleOrder: 10, title: "Rechte, Pflichten und Grundgesetz", shortTitle: "Rechte", description: "Grundrechte, Antidiskriminierung, Datenschutz, Pflichten und Hilfe.", learningOutcome: "Du verstehst demokratische Grundregeln und typische Rechte im Alltag.", estimatedMinutes: 300, color: "#6f9b88" },
  { id: "m11-einbuergerung", moduleOrder: 11, title: "Einbürgerung und langfristige Perspektive", shortTitle: "Einbürgerung", description: "Voraussetzungen, Antrag, Dokumente, Test und Planung.", learningOutcome: "Du kannst Einbürgerung als langfristigen Prozess mit Prüfbedarf verstehen.", estimatedMinutes: 300, color: "#d7a84d" },
  { id: "m12-praxis", moduleOrder: 12, title: "Praxisfälle und Wiederholung", shortTitle: "Praxis", description: "Anwendung, Checklisten, Briefe, Fälle und Abschlussübersicht.", learningOutcome: "Du wendest das Wissen auf typische Alltagssituationen und Verwaltungsfälle an.", estimatedMinutes: 360, color: "#c77752" },
];

type LessonSeed = { title: string; objective: string; difficulty?: LessonDifficulty; core?: boolean; legal?: boolean; sourceKeys?: (keyof typeof officialSources)[]; terms?: string[] };

const lessonPlan: Record<string, LessonSeed[]> = {
  "m1-grundlagen": [
    { title: "Was bedeutet Migration?", objective: "Grundbegriff Migration verstehen und neutral verwenden.", sourceKeys: ["destatis", "bpb"], terms: ["Migration", "Migrant", "Herkunftsland", "Zielland", "internationale Migration"], core: true },
    { title: "Migration, Flucht, Asyl und Integration unterscheiden", objective: "Ähnliche Begriffe fachlich sauber trennen.", sourceKeys: ["bamfAsyl", "bpb"], terms: ["Flucht", "Asyl", "Integration", "Schutz", "Aufenthaltsstatus"], core: true },
    { title: "Binnenmigration und internationale Migration", objective: "Räumliche Formen von Migration unterscheiden.", sourceKeys: ["destatis", "bpb"], terms: ["Binnenmigration", "internationale Migration", "EU-Freizügigkeit", "Drittstaat", "Wohnortwechsel"] },
    { title: "Warum Menschen migrieren", objective: "Migrationsgründe ohne Vorurteile beschreiben.", sourceKeys: ["bpb", "destatis"], terms: ["Push-Faktoren", "Pull-Faktoren", "Familie", "Arbeit", "Schutz"] },
    { title: "Migration in Deutschland: Überblick", objective: "Historische und aktuelle Einordnung verstehen.", sourceKeys: ["destatis", "bpb"], terms: ["Zuwanderung", "Arbeitsmigration", "Fluchtmigration", "Integration", "Statistik"] },
    { title: "Ausländer, Drittstaatsangehörige, EU-Bürger und Geflüchtete", objective: "Personengruppen nicht verwechseln.", sourceKeys: ["aufenthg", "bpb"], terms: ["Ausländer", "Drittstaatsangehörige", "EU-Bürger", "Geflüchtete", "Status"], legal: true },
    { title: "Was bedeutet Integration?", objective: "Integration als Teilhabeprozess verstehen.", sourceKeys: ["bamfIntegration", "bpb"], terms: ["Integration", "Teilhabe", "Sprache", "Arbeit", "Gesellschaft"] },
    { title: "Was bedeutet Teilhabe?", objective: "Teilhabe in Alltag, Bildung und Arbeit erkennen.", sourceKeys: ["bpb"], terms: ["Teilhabe", "Barrieren", "Chancen", "Partizipation", "Zugang"] },
    { title: "Diversität und Zugehörigkeit", objective: "Vielfalt respektvoll und praktisch einordnen.", sourceKeys: ["bpb"], terms: ["Diversität", "Zugehörigkeit", "Diskriminierung", "Identität", "Respekt"] },
    { title: "Häufige Missverständnisse über Migration", objective: "Fehlerhafte Vereinfachungen erkennen.", sourceKeys: ["bpb", "destatis"], terms: ["Vorurteil", "Einzelfall", "Statistik", "Rechtsstatus", "Kontext"] },
  ],
  "m2-deutschland": [
    { title: "Deutschland als Bundesstaat", objective: "Bund, Länder und Kommunen einordnen.", sourceKeys: ["bpb"], terms: ["Bundesstaat", "Bund", "Land", "Kommune", "Zuständigkeit"], core: true },
    { title: "Bund, Länder und Kommunen", objective: "Zuständigkeiten praktisch unterscheiden.", sourceKeys: ["bpb"], terms: ["Bund", "Land", "Kommune", "Verwaltung", "Behörde"] },
    { title: "Welche Behörde macht was?", objective: "Typische Behörden richtig zuordnen.", sourceKeys: ["bamfAsyl", "ba", "bafög"], terms: ["Ausländerbehörde", "BAMF", "Jobcenter", "BAföG-Amt", "Standesamt"] },
    { title: "Warum Wohnort und Zuständigkeit wichtig sind", objective: "Örtliche Zuständigkeit verstehen.", sourceKeys: ["bpb"], terms: ["Wohnort", "Meldeadresse", "Zuständigkeit", "Aktenführung", "Termin"] },
    { title: "Demokratie und Rechtsstaat", objective: "Grundprinzipien erklären.", sourceKeys: ["grundgesetz", "bpb"], terms: ["Demokratie", "Rechtsstaat", "Gewaltenteilung", "Gericht", "Verwaltung"], legal: true },
    { title: "Grundrechte im Alltag", objective: "Grundrechte als Schutz- und Orientierungsrahmen verstehen.", sourceKeys: ["grundgesetz", "bpb"], terms: ["Menschenwürde", "Gleichheit", "Meinungsfreiheit", "Religionsfreiheit", "Datenschutz"], legal: true },
    { title: "Gleichberechtigung und Antidiskriminierung", objective: "Diskriminierungssituationen erkennen.", sourceKeys: ["grundgesetz", "bpb"], terms: ["Gleichberechtigung", "Diskriminierung", "AGG", "Beschwerde", "Beratung"], legal: true },
    { title: "Datenschutz und Privatsphäre", objective: "Sensible Daten schützen.", sourceKeys: ["bpb"], terms: ["Datenschutz", "Einwilligung", "Akteneinsicht", "Privatsphäre", "Datenweitergabe"] },
    { title: "Verträge, Termine und Fristen", objective: "Verbindlichkeit im deutschen Verwaltungskontext verstehen.", sourceKeys: ["bpb"], terms: ["Vertrag", "Termin", "Frist", "Nachweis", "Schriftform"] },
    { title: "Schriftliche Kommunikation in Deutschland", objective: "Sachlich und beweisbar kommunizieren.", sourceKeys: ["bpb"], terms: ["Brief", "E-Mail", "Betreff", "Aktenzeichen", "Eingangsbestätigung"] },
  ],
  "m3-aufenthalt": [
    { title: "Was ist ein Visum?", objective: "Schengen-Visum und nationales Visum unterscheiden.", sourceKeys: ["aufenthg", "makeIt"], terms: ["Visum", "Schengen", "nationales Visum", "Einreise", "Aufenthaltszweck"], legal: true, core: true },
    { title: "Was ist eine Aufenthaltserlaubnis?", objective: "Befristete Aufenthaltstitel verstehen.", sourceKeys: ["aufenthg"], terms: ["Aufenthaltserlaubnis", "Aufenthaltstitel", "Befristung", "Zweck", "Nebenbestimmung"], legal: true, core: true },
    { title: "Was ist eine Niederlassungserlaubnis?", objective: "Dauerhafte Verfestigung grob einordnen.", sourceKeys: ["aufenthg"], terms: ["Niederlassungserlaubnis", "unbefristet", "Lebensunterhalt", "Rentenzeiten", "Integration"], legal: true },
    { title: "Erlaubnis zum Daueraufenthalt-EU", objective: "Daueraufenthalt-EU als besonderen Status erkennen.", sourceKeys: ["aufenthg"], terms: ["Daueraufenthalt-EU", "langfristig", "EU", "Mobilität", "Voraussetzungen"], legal: true },
    { title: "Was bedeutet Aufenthaltszweck?", objective: "Warum Zweck und Titel zusammengehören.", sourceKeys: ["aufenthg"], terms: ["Aufenthaltszweck", "Studium", "Arbeit", "Familie", "humanitär"], legal: true },
    { title: "Nebenbestimmungen verstehen", objective: "Zusatzblatt und Auflagen lesen.", sourceKeys: ["aufenthg"], terms: ["Nebenbestimmung", "Auflage", "Erwerbstätigkeit", "Zusatzblatt", "Bedingung"], legal: true },
    { title: "Erwerbstätigkeit erlaubt oder nicht?", objective: "Arbeitsberechtigung nicht vorschnell annehmen.", sourceKeys: ["aufenthg", "ba"], terms: ["Erwerbstätigkeit", "Beschäftigung", "Selbstständigkeit", "BA-Zustimmung", "Nebenbestimmung"], legal: true },
    { title: "Verlängerung des Aufenthaltstitels", objective: "Fristen und Unterlagen rechtzeitig planen.", sourceKeys: ["aufenthg"], terms: ["Verlängerung", "Fiktionswirkung", "Frist", "Unterlagen", "Termin"], legal: true },
    { title: "Wechsel des Aufenthaltszwecks", objective: "Zweckwechsel als neue Prüfung verstehen.", sourceKeys: ["aufenthg"], terms: ["Zweckwechsel", "neuer Antrag", "Voraussetzungen", "Visumverfahren", "Beratung"], legal: true },
    { title: "Aufenthaltstitel, Duldung und Aufenthaltsgestattung", objective: "Drei zentrale Dokumentgruppen sicher unterscheiden.", sourceKeys: ["aufenthg", "asylg", "bamfAsyl"], terms: ["Duldung", "Aufenthaltsgestattung", "Aufenthaltstitel", "Asylverfahren", "Abschiebung"], legal: true, core: true },
  ],
  "m4-asyl": [
    { title: "Was ist Asyl?", objective: "Asyl als Schutzsystem vorsichtig verstehen.", sourceKeys: ["asylg", "bamfAsyl"], terms: ["Asyl", "Schutz", "Verfolgung", "BAMF", "Grundgesetz"], legal: true, core: true },
    { title: "Was ist ein Asylantrag?", objective: "Antragstellung und Zuständigkeit grob erklären.", sourceKeys: ["asylg", "bamfAsyl"], terms: ["Asylantrag", "BAMF", "Registrierung", "Ankunftsnachweis", "Verfahren"], legal: true },
    { title: "Ablauf des Asylverfahrens", objective: "Verfahrensstationen unterscheiden.", sourceKeys: ["asylg", "bamfAsyl"], terms: ["Antrag", "Anhörung", "Entscheidung", "Bescheid", "Rechtsbehelf"], legal: true, core: true },
    { title: "Persönliche Anhörung", objective: "Bedeutung der Anhörung verstehen.", sourceKeys: ["bamfAsyl"], terms: ["Anhörung", "Dolmetscher", "Chronologie", "Beweise", "Glaubhaftigkeit"], legal: true },
    { title: "Entscheidung des BAMF", objective: "Bescheidarten grob einordnen.", sourceKeys: ["bamfAsyl", "asylg"], terms: ["Bescheid", "Flüchtlingsschutz", "subsidiärer Schutz", "Ablehnung", "Frist"], legal: true },
    { title: "Flüchtlingsschutz", objective: "Schutzgrund und Verfolgung verstehen.", sourceKeys: ["bamfAsyl", "asylg"], terms: ["Flüchtlingsschutz", "Verfolgung", "Schutzgrund", "Herkunftsland", "Ausschluss"], legal: true },
    { title: "Subsidiärer Schutz und Abschiebungsverbot", objective: "Schutzformen sauber trennen.", sourceKeys: ["bamfAsyl", "asylg"], terms: ["subsidiärer Schutz", "ernsthafter Schaden", "Abschiebungsverbot", "Rückkehrgefahr", "Prüfung"], legal: true },
    { title: "Aufenthaltsgestattung und Duldung", objective: "Status während und nach Verfahren unterscheiden.", sourceKeys: ["asylg", "aufenthg"], terms: ["Aufenthaltsgestattung", "Duldung", "Verfahren", "Ausreisepflicht", "Aussetzung"], legal: true },
    { title: "Rechte und Pflichten im Verfahren", objective: "Mitwirkung und Beratungsbedarf erkennen.", sourceKeys: ["asylg", "bamfAsyl"], terms: ["Mitwirkung", "Adresse", "Termin", "Dokumente", "Beratung"], legal: true },
    { title: "Was tun bei einem Bescheid?", objective: "Frist, Beratung und Dokumentation priorisieren.", sourceKeys: ["bamfAsyl", "asylg"], terms: ["Bescheid", "Zustellung", "Klagefrist", "Beratungsstelle", "Anwalt"], legal: true, core: true },
  ],
  "m5-behoerden": [
    { title: "Behördenbriefe verstehen", objective: "Hauptaussage, Frist und Handlung erkennen.", sourceKeys: ["bpb"], terms: ["Betreff", "Aktenzeichen", "Frist", "Nachweis", "Antwort"], core: true },
    { title: "Fristen erkennen", objective: "Fristen markieren und sichern.", sourceKeys: ["bpb"], terms: ["Frist", "Zustellung", "Kalender", "Nachweis", "Wiedervorlage"] },
    { title: "Anhörung, Mitwirkung und Nachreichen", objective: "Drei häufige Behördenbegriffe verstehen.", sourceKeys: ["aufenthg", "asylg"], terms: ["Anhörung", "Mitwirkung", "Nachreichen", "Sachverhalt", "Dokumente"], legal: true },
    { title: "Dokumente sicher speichern", objective: "Persönliche Verwaltungsmappe aufbauen.", sourceKeys: ["bpb"], terms: ["Scan", "Original", "Kopie", "Datenschutz", "Ordner"] },
    { title: "Aufenthaltstitel verlängern: Checkliste", objective: "Unterlagen und Zeitplan vorbereiten.", sourceKeys: ["aufenthg"], terms: ["Verlängerung", "Pass", "Meldebescheinigung", "Einkommen", "Krankenversicherung"], legal: true },
    { title: "Meldebescheinigung, Steuer-ID und Sozialversicherung", objective: "Zentrale Alltagsdokumente unterscheiden.", sourceKeys: ["bpb", "ba"], terms: ["Meldebescheinigung", "Steuer-ID", "Sozialversicherung", "Arbeitgeber", "Wohnsitz"] },
    { title: "Jobcenter-Kommunikation", objective: "Leistungsbriefe vorsichtig bearbeiten.", sourceKeys: ["ba"], terms: ["Jobcenter", "Mitwirkung", "Bewilligung", "Nachforderung", "Widerspruch"], legal: true },
    { title: "Ausländerbehörde-Kommunikation", objective: "Sachlich, vollständig und mit Nachweis schreiben.", sourceKeys: ["aufenthg"], terms: ["Ausländerbehörde", "Aktenzeichen", "Termin", "Unterlagen", "Eingang"], legal: true },
    { title: "BAMF, Hochschule und BAföG-Amt", objective: "Drei Verwaltungswelten trennen.", sourceKeys: ["bamfAsyl", "bafög"], terms: ["BAMF", "Hochschule", "BAföG-Amt", "Prüfungsamt", "Zuständigkeit"] },
    { title: "Checkliste für Behördentermine", objective: "Termine professionell vorbereiten.", sourceKeys: ["bpb"], terms: ["Termin", "Original", "Kopie", "Fragenliste", "Protokoll"] },
  ],
  "m6-sprache": [
    { title: "GER / CEFR: A1 bis C2 verstehen", objective: "Sprachniveaus einordnen.", sourceKeys: ["bamfIntegration"], terms: ["GER", "A1", "B1", "B2", "C1"], core: true },
    { title: "A1 und A2: Alltagssprache aufbauen", objective: "Grundlagenziele planen.", sourceKeys: ["bamfIntegration"], terms: ["A1", "A2", "Alltag", "Wortschatz", "Sprechen"] },
    { title: "B1: Integration und Alltagssicherheit", objective: "B1 als wichtiges Zwischenziel verstehen.", sourceKeys: ["bamfIntegration"], terms: ["B1", "Integrationskurs", "Orientierungskurs", "Alltag", "Prüfung"] },
    { title: "B2 und C1: Arbeit und Studium", objective: "Fortgeschrittene Sprachziele planen.", sourceKeys: ["bamfIntegration"], terms: ["B2", "C1", "Beruf", "Studium", "Fachsprache"] },
    { title: "Integrationskurs: Aufbau und Ziel", objective: "Kursstruktur verstehen.", sourceKeys: ["bamfIntegration"], terms: ["Integrationskurs", "Sprachkurs", "Orientierungskurs", "Abschluss", "BAMF"], core: true },
    { title: "Orientierungskurs und Test Leben in Deutschland", objective: "Politische Grundbildung einordnen.", sourceKeys: ["bamfIntegration", "bpb"], terms: ["Orientierungskurs", "Leben in Deutschland", "Demokratie", "Rechte", "Pflichten"] },
    { title: "Berufssprachkurs", objective: "Deutsch für Arbeit planen.", sourceKeys: ["bamfIntegration"], terms: ["Berufssprachkurs", "Arbeitsplatz", "B2", "Fachsprache", "Zertifikat"] },
    { title: "Deutsch für Behörden", objective: "Formulierungen und typische Briefe verstehen.", sourceKeys: ["bpb"], terms: ["Betreff", "Aktenzeichen", "Frist", "Bitte", "Nachweis"] },
    { title: "Deutsch für Bewerbung und Studium", objective: "Sprachregister unterscheiden.", sourceKeys: ["ba"], terms: ["Bewerbung", "Lebenslauf", "Hochschule", "Hausarbeit", "Fachsprache"] },
    { title: "Wortschatz aktiv wiederholen", objective: "Lernmethoden mit Karteikarten nutzen.", sourceKeys: ["bpb"], terms: ["Wiederholung", "Karteikarte", "Kontext", "Beispiel", "Routine"] },
  ],
  "m7-arbeit": [
    { title: "Arbeitserlaubnis verstehen", objective: "Arbeitszugang nicht pauschal beurteilen.", sourceKeys: ["aufenthg", "ba"], terms: ["Arbeitserlaubnis", "Nebenbestimmung", "Beschäftigung", "Selbstständigkeit", "BA"], legal: true, core: true },
    { title: "Ausbildung in Deutschland", objective: "Ausbildungswege verstehen.", sourceKeys: ["ba"], terms: ["Ausbildung", "dual", "Berufsschule", "Betrieb", "Vertrag"] },
    { title: "Duale Ausbildung", objective: "Betrieb und Schule verbinden.", sourceKeys: ["ba"], terms: ["duale Ausbildung", "Ausbildungsvertrag", "Berufsschule", "Vergütung", "Prüfung"] },
    { title: "Studium oder Ausbildung?", objective: "Entscheidungskriterien vergleichen.", sourceKeys: ["ba", "makeIt"], terms: ["Studium", "Ausbildung", "Praxis", "Karriere", "Sprache"] },
    { title: "Bewerbung in Deutschland", objective: "Bewerbungsmappe vorbereiten.", sourceKeys: ["ba"], terms: ["Bewerbung", "Lebenslauf", "Anschreiben", "Zeugnis", "Vorstellungsgespräch"] },
    { title: "Arbeitsvertrag, Probezeit und Kündigung", objective: "Vertragliche Grundbegriffe erkennen.", sourceKeys: ["ba"], terms: ["Arbeitsvertrag", "Probezeit", "Kündigung", "Arbeitszeit", "Lohn"], legal: true },
    { title: "Anerkennung ausländischer Abschlüsse", objective: "Anerkennungsprozess verstehen.", sourceKeys: ["anerkennung"], terms: ["Anerkennung", "Referenzberuf", "reglementiert", "Gleichwertigkeit", "Bescheid"], legal: true, core: true },
    { title: "Reglementierte und nicht reglementierte Berufe", objective: "Berufszugang unterscheiden.", sourceKeys: ["anerkennung"], terms: ["reglementiert", "nicht reglementiert", "Berufserlaubnis", "Kammer", "Qualifikation"], legal: true },
    { title: "Bundesagentur für Arbeit und Jobcenter", objective: "Beratung und Leistung trennen.", sourceKeys: ["ba"], terms: ["Agentur für Arbeit", "Jobcenter", "Vermittlung", "Leistung", "Beratung"], legal: true },
    { title: "Chancenkarte und Fachkräfteeinwanderung", objective: "Fachkräftewege grob einordnen.", sourceKeys: ["makeIt", "aufenthg"], terms: ["Chancenkarte", "Fachkraft", "Blaue Karte", "Punktesystem", "Anerkennung"], legal: true },
  ],
  "m8-studium": [
    { title: "Hochschulsystem in Deutschland", objective: "Hochschularten unterscheiden.", sourceKeys: ["bafög", "bpb"], terms: ["Universität", "Hochschule", "Pädagogische Hochschule", "Studiengang", "Abschluss"] },
    { title: "Bewerbung, Zulassung und Immatrikulation", objective: "Start ins Studium strukturieren.", sourceKeys: ["bafög"], terms: ["Bewerbung", "Zulassung", "Immatrikulation", "Frist", "Bescheid"], core: true },
    { title: "Semesterbeitrag und Immatrikulationsbescheinigung", objective: "wichtige Nachweise verstehen.", sourceKeys: ["bafög"], terms: ["Semesterbeitrag", "Immatrikulationsbescheinigung", "Rückmeldung", "Studierendenausweis", "Nachweis"] },
    { title: "Prüfungsordnung und Modulhandbuch", objective: "Studienregeln lesen.", sourceKeys: ["bpb"], terms: ["Prüfungsordnung", "Modulhandbuch", "Credit Points", "Frist", "Prüfungsamt"] },
    { title: "Credit Points und Leistungsnachweise", objective: "Studienfortschritt einordnen.", sourceKeys: ["bpb"], terms: ["Credit Points", "ECTS", "Leistungsnachweis", "Modul", "Prüfung"] },
    { title: "Wissenschaftliches Arbeiten", objective: "akademische Grundregeln verstehen.", sourceKeys: ["bpb"], terms: ["Hausarbeit", "Quelle", "Zitat", "Plagiat", "Argument"] },
    { title: "BAföG-Grundlagen", objective: "Förderung vorsichtig einordnen.", sourceKeys: ["bafög"], terms: ["BAföG", "Förderung", "Antrag", "Formblatt", "Amt"], legal: true, core: true },
    { title: "BAföG Digital und Weiterförderungsantrag", objective: "Folgeanträge planen.", sourceKeys: ["bafög"], terms: ["BAföG Digital", "Weiterförderungsantrag", "Formblatt", "Frist", "Nachweis"], legal: true },
    { title: "Kommunikation mit Prüfungsamt und Studierendenservice", objective: "zuständige Stellen anschreiben.", sourceKeys: ["bpb"], terms: ["Prüfungsamt", "Studierendenservice", "Aktenzeichen", "E-Mail", "Frist"] },
    { title: "Studium, Arbeit und Aufenthaltstitel", objective: "Studienalltag mit Aufenthaltsrecht verbinden.", sourceKeys: ["aufenthg", "makeIt"], terms: ["Aufenthaltstitel", "Studium", "Arbeit", "Nebenbestimmung", "Verlängerung"], legal: true },
  ],
  "m9-familie": [
    { title: "Familie in Deutschland", objective: "Familienthemen als Alltag und Verwaltung verstehen.", sourceKeys: ["bpb"], terms: ["Familie", "Ehe", "Kind", "Sorge", "Unterstützung"] },
    { title: "Kindergarten, Kita und Schule", objective: "Bildungswege für Kinder verstehen.", sourceKeys: ["bpb"], terms: ["Kita", "Kindergarten", "Schule", "Schulpflicht", "Elternbrief"] },
    { title: "Elternbriefe verstehen", objective: "Informationen und Handlungsbedarf erkennen.", sourceKeys: ["bpb"], terms: ["Elternbrief", "Termin", "Unterschrift", "Ausflug", "Rückmeldung"] },
    { title: "Krankenversicherung", objective: "Grundprinzip der Absicherung verstehen.", sourceKeys: ["bpb"], terms: ["Krankenversicherung", "gesetzlich", "privat", "Beitrag", "Karte"], legal: true },
    { title: "Hausarzt, Facharzt und Terminvereinbarung", objective: "medizinische Wege ohne Diagnose verstehen.", sourceKeys: ["bpb"], terms: ["Hausarzt", "Facharzt", "Termin", "Überweisung", "Notfall"] },
    { title: "Notfallnummern und akute Hilfe", objective: "Sicherheit im Notfall wissen.", sourceKeys: ["bpb"], terms: ["112", "110", "Notfall", "Bereitschaftsdienst", "Apotheke"] },
    { title: "Schwangerschaft und Geburt: erste Orientierung", objective: "Zuständige Hilfen kennen.", sourceKeys: ["bpb"], terms: ["Schwangerschaft", "Hebamme", "Geburt", "Krankenkasse", "Beratung"] },
    { title: "Familienleistungen Überblick", objective: "Leistungen nur allgemein einordnen.", sourceKeys: ["ba"], terms: ["Kindergeld", "Elterngeld", "Kinderzuschlag", "Antrag", "Nachweis"], legal: true },
    { title: "Wohnen mit Familie", objective: "Wohnungs- und Dokumententhemen erkennen.", sourceKeys: ["bpb"], terms: ["Mietvertrag", "Wohnraum", "Meldebescheinigung", "Nebenkosten", "Kaution"] },
    { title: "Familiennachzug Grundlagen", objective: "Familiennachzug als rechtlich sensiblen Prozess erkennen.", sourceKeys: ["aufenthg"], terms: ["Familiennachzug", "Visum", "Ehe", "Kind", "Lebensunterhalt"], legal: true, core: true },
  ],
  "m10-rechte": [
    { title: "Menschenwürde", objective: "Menschenwürde als Grundprinzip verstehen.", sourceKeys: ["grundgesetz", "bpb"], terms: ["Menschenwürde", "Grundgesetz", "Staat", "Schutz", "Respekt"], legal: true, core: true },
    { title: "Gleichheit vor dem Gesetz", objective: "Gleichbehandlung als Rechtsprinzip verstehen.", sourceKeys: ["grundgesetz", "bpb"], terms: ["Gleichheit", "Diskriminierung", "Gesetz", "Rechtsschutz", "Behörde"], legal: true },
    { title: "Religionsfreiheit und Meinungsfreiheit", objective: "Freiheitsrechte im Alltag einordnen.", sourceKeys: ["grundgesetz", "bpb"], terms: ["Religionsfreiheit", "Meinungsfreiheit", "Grenzen", "Respekt", "Konflikt"], legal: true },
    { title: "Versammlungsfreiheit", objective: "Demokratische Beteiligung verstehen.", sourceKeys: ["grundgesetz", "bpb"], terms: ["Versammlung", "Demonstration", "Anmeldung", "Polizei", "Friedlich"], legal: true },
    { title: "Datenschutz", objective: "Persönliche Daten schützen.", sourceKeys: ["bpb"], terms: ["Datenschutz", "Einwilligung", "Behörde", "Akte", "Privatsphäre"] },
    { title: "Rechte von Kindern und Frauen", objective: "Schutz und Gleichberechtigung verstehen.", sourceKeys: ["grundgesetz", "bpb"], terms: ["Kinderrechte", "Frauenrechte", "Gleichberechtigung", "Schutz", "Hilfe"], legal: true },
    { title: "Antidiskriminierung", objective: "Diskriminierung erkennen und Hilfe finden.", sourceKeys: ["bpb"], terms: ["Antidiskriminierung", "Beschwerde", "Beratung", "Beweis", "Schutz"], legal: true },
    { title: "Pflichten im Alltag", objective: "Mitwirkung, Verträge und Fristen ernst nehmen.", sourceKeys: ["bpb"], terms: ["Pflicht", "Vertrag", "Frist", "Mitwirkung", "Steuer"] },
    { title: "Rechtsstaat, Gerichte und Polizei", objective: "Rollen und Rechte grob verstehen.", sourceKeys: ["grundgesetz", "bpb"], terms: ["Rechtsstaat", "Gericht", "Polizei", "Anwalt", "Rechtsschutz"], legal: true },
    { title: "Beratungsstellen und Hilfe", objective: "Wann Hilfe notwendig ist.", sourceKeys: ["bpb"], terms: ["Beratung", "Anwalt", "Migrationsberatung", "Sozialberatung", "Frist"] },
  ],
  "m11-einbuergerung": [
    { title: "Was bedeutet Einbürgerung?", objective: "Einbürgerung als rechtlichen Statuswechsel verstehen.", sourceKeys: ["stagt"], terms: ["Einbürgerung", "Staatsangehörigkeit", "Antrag", "Rechte", "Pflichten"], legal: true, core: true },
    { title: "Voraussetzungen der Einbürgerung", objective: "Voraussetzungen nur allgemein einordnen.", sourceKeys: ["stagt"], terms: ["rechtmäßiger Aufenthalt", "Sprache", "Lebensunterhalt", "Straffreiheit", "Bekenntnis"], legal: true, core: true },
    { title: "Rechtmäßiger Aufenthalt", objective: "Aufenthaltszeiten und Status vorsichtig prüfen.", sourceKeys: ["stagt", "aufenthg"], terms: ["rechtmäßig", "Aufenthaltszeit", "Status", "Unterbrechung", "Nachweis"], legal: true },
    { title: "Sprachkenntnisse", objective: "Sprachanforderungen grob verstehen.", sourceKeys: ["stagt", "bamfIntegration"], terms: ["B1", "Zertifikat", "Integration", "Nachweis", "Ausnahme"], legal: true },
    { title: "Lebensunterhalt", objective: "Einkommen und Leistungen vorsichtig einordnen.", sourceKeys: ["stagt", "ba"], terms: ["Lebensunterhalt", "Einkommen", "Leistung", "Nachweis", "Einzelfall"], legal: true },
    { title: "Straffreiheit und Identität", objective: "Sensible Ausschluss- und Nachweisthemen erkennen.", sourceKeys: ["stagt"], terms: ["Straffreiheit", "Identität", "Pass", "Urkunde", "Prüfung"], legal: true },
    { title: "Bekenntnis zur freiheitlich-demokratischen Grundordnung", objective: "Bedeutung des Bekenntnisses verstehen.", sourceKeys: ["stagt", "grundgesetz"], terms: ["FDGO", "Bekenntnis", "Demokratie", "Grundgesetz", "Loyalität"], legal: true },
    { title: "Einbürgerungstest", objective: "Test und Vorbereitung einordnen.", sourceKeys: ["stagt", "bamfIntegration"], terms: ["Einbürgerungstest", "Leben in Deutschland", "Fragen", "Vorbereitung", "Nachweis"], legal: true },
    { title: "Antrag stellen und Dokumente sammeln", objective: "Antrag praktisch vorbereiten.", sourceKeys: ["stagt"], terms: ["Antrag", "Dokumente", "Urkunden", "Übersetzung", "Termin"], legal: true },
    { title: "Typische Fehler und langfristige Planung", objective: "Fehler vermeiden und Beratung einplanen.", sourceKeys: ["stagt"], terms: ["Fehler", "Frist", "Dokument", "Beratung", "Planung"], legal: true },
  ],
  "m12-praxis": [
    { title: "Brief von Ausländerbehörde verstehen", objective: "Brief in Frist, Aufgabe und Nachweise zerlegen.", sourceKeys: ["aufenthg"], terms: ["Ausländerbehörde", "Frist", "Nachweis", "Termin", "Antwort"], legal: true, core: true },
    { title: "BAMF-Bescheid grob einordnen", objective: "Bescheid ernst nehmen und Beratung priorisieren.", sourceKeys: ["bamfAsyl", "asylg"], terms: ["BAMF", "Bescheid", "Frist", "Klage", "Beratung"], legal: true, core: true },
    { title: "Jobcenter-Brief verstehen", objective: "Mitwirkung und Leistungsfragen erkennen.", sourceKeys: ["ba"], terms: ["Jobcenter", "Mitwirkung", "Bewilligung", "Sanktion", "Nachweis"], legal: true },
    { title: "BAföG-Antrag vorbereiten", objective: "Formblätter und Fristen ordnen.", sourceKeys: ["bafög"], terms: ["BAföG", "Formblatt", "Frist", "Nachweis", "Antrag"], legal: true },
    { title: "Immatrikulationsbescheinigung nachreichen", objective: "Hochschulnachweise korrekt senden.", sourceKeys: ["bafög"], terms: ["Immatrikulation", "Nachreichen", "Prüfungsamt", "BAföG-Amt", "E-Mail"] },
    { title: "Aufenthaltstitel verlängern", objective: "Verlängerung als Prozess prüfen.", sourceKeys: ["aufenthg"], terms: ["Verlängerung", "Fiktionswirkung", "Pass", "Einkommen", "Termin"], legal: true },
    { title: "Bewerbung schreiben", objective: "Bewerbungsunterlagen strukturieren.", sourceKeys: ["ba"], terms: ["Lebenslauf", "Anschreiben", "Zeugnis", "Stelle", "Vorstellungsgespräch"] },
    { title: "Arzttermin vereinbaren", objective: "Telefonat und Unterlagen vorbereiten.", sourceKeys: ["bpb"], terms: ["Termin", "Versichertenkarte", "Hausarzt", "Notfall", "Symptom"] },
    { title: "Kita-Brief verstehen", objective: "Elternbrief in Handlung übersetzen.", sourceKeys: ["bpb"], terms: ["Kita", "Elternbrief", "Unterschrift", "Termin", "Rückmeldung"] },
    { title: "Einbürgerung vorbereiten und Abschlussübersicht", objective: "Gesamtkurs wiederholen und nächste Schritte planen.", sourceKeys: ["stagt", "grundgesetz"], terms: ["Einbürgerung", "Checkliste", "Wiederholung", "Quellen", "Beratung"], legal: true },
  ],
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[ä]/g, "ae").replace(/[ö]/g, "oe").replace(/[ü]/g, "ue").replace(/[ß]/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function legalNotice(legal: boolean, moduleId: string) {
  if (moduleId === "m9-familie") return "Gesundheitliche Hinweise sind allgemein. Bei Symptomen, Notfällen oder medizinischen Fragen bitte Arzt, ärztlichen Bereitschaftsdienst oder Notruf kontaktieren.";
  if (legal) return "Diese Lektion erklärt das Thema allgemein. Sie ersetzt keine individuelle Rechtsberatung. Bei Fristen, Bescheiden oder Ablehnungen solltest du eine Beratungsstelle oder anwaltliche Hilfe kontaktieren.";
  return "Diese Lektion dient der Bildung und Orientierung. Zuständigkeiten, Formulare und lokale Verfahren können sich unterscheiden.";
}

function makeQuiz(seed: LessonSeed, id: string): LearningLesson["quiz"] {
  const term = seed.terms?.[0] ?? seed.title;
  return [
    {
      id: `${id}-q1`,
      type: "Multiple Choice",
      question: `Welche Aussage passt am besten zu „${seed.title}“?`,
      options: [
        "Das Thema ist nur Theorie und hat keine Bedeutung für Alltag oder Behörden.",
        seed.objective,
        "Alle Fälle werden immer gleich entschieden.",
      ],
      correct: 1,
      explanation: `Richtig ist die lernzielbezogene Aussage: ${seed.objective}. Die App trainiert bewusst Einordnung, Anwendung und Vorsicht im Einzelfall.`,
      difficulty: seed.difficulty ?? "Basis",
      sourceReference: seed.sourceKeys?.[0] ? officialSources[seed.sourceKeys[0]].sourceTitle : "Lektion",
    },
    {
      id: `${id}-q2`,
      type: "Richtig/Falsch",
      question: seed.legal ? "Bei rechtlichen Themen reicht eine allgemeine Information immer für eine endgültige Entscheidung." : "Eine gute Lernantwort verbindet Begriff, Beispiel und praktische Bedeutung.",
      options: ["Richtig", "Falsch"],
      correct: seed.legal ? 1 : 0,
      explanation: seed.legal ? "Falsch. Rechtsfragen hängen häufig von Dokumenten, Fristen, Zuständigkeit und Einzelfall ab." : "Richtig. Verstehen entsteht erst, wenn ein Begriff praktisch angewendet werden kann.",
      difficulty: "Basis",
      sourceReference: "Lernhinweis",
    },
    {
      id: `${id}-q3`,
      type: "Praxisfall verstehen",
      question: `Eine Person fragt dich zu „${term}“. Was ist der beste erste Schritt?`,
      options: [
        "Sofort eine verbindliche Zusage machen.",
        "Begriff erklären, Dokumente/Fristen prüfen und bei sensiblen Fragen Beratung empfehlen.",
        "Die Frage ignorieren, wenn sie kompliziert wirkt.",
      ],
      correct: 1,
      explanation: "Professionelles Lernen bedeutet: erst verstehen, dann prüfen, dann handeln. Bei sensiblen Themen niemals vorschnell entscheiden.",
      difficulty: seed.difficulty ?? "Basis",
      sourceReference: seed.sourceKeys?.[0] ? officialSources[seed.sourceKeys[0]].sourceTitle : "Lektion",
    },
  ];
}

function makeLesson(seed: LessonSeed, module: LearningModule, index: number, globalNumber: number): LearningLesson {
  const id = `l${String(globalNumber).padStart(3, "0")}-${slugify(seed.title)}`;
  const legal = Boolean(seed.legal);
  const termList = seed.terms ?? [seed.title, module.shortTitle, "Frist", "Dokument", "Beratung"];
  const sourceKeys: (keyof typeof officialSources)[] = seed.sourceKeys?.length ? seed.sourceKeys : ["bpb"];
  const sources = sourceKeys.map((key) => officialSources[key]);
  const nextGlobal = globalNumber < 120 ? `l${String(globalNumber + 1).padStart(3, "0")}` : undefined;
  const previousGlobal = globalNumber > 1 ? `l${String(globalNumber - 1).padStart(3, "0")}` : undefined;
  return {
    id,
    moduleId: module.id,
    moduleOrder: module.moduleOrder,
    lessonOrder: index + 1,
    globalLessonNumber: globalNumber,
    title: seed.title,
    slug: slugify(seed.title),
    description: `Diese Lektion ordnet ${seed.title.toLowerCase()} in den Gesamtlernpfad ein und zeigt, was das Thema im Alltag, bei Behörden, in Arbeit oder Studium bedeutet.`,
    learningObjective: seed.objective,
    estimatedMinutes: seed.core ? 35 : 22,
    difficultyLevel: seed.difficulty ?? (module.moduleOrder <= 2 ? "Basis" : module.moduleOrder <= 6 ? "Aufbau" : module.moduleOrder <= 10 ? "Praxis" : "Fortgeschritten"),
    prerequisiteLessonIds: previousGlobal ? [previousGlobal] : [],
    previousLessonId: previousGlobal,
    nextLessonId: nextGlobal,
    recommendedAfter: previousGlobal ? `Empfohlen nach Lektion ${globalNumber - 1}` : "Startlektion – keine Voraussetzung",
    isCoreLesson: Boolean(seed.core),
    isOptionalLesson: false,
    isLegalSensitive: legal,
    requiresSourceReview: legal || sources.some((source) => source.needsRegularReview),
    whyImportant: `${seed.title} ist wichtig, weil falsche Begriffe zu falschen Entscheidungen führen können. Wer dieses Thema versteht, kann Dokumente ruhiger lesen, Zuständigkeiten besser erkennen und schneller entscheiden, wann eigene Handlung möglich ist und wann fachliche Hilfe gebraucht wird.`,
    simpleExplanation: `Einfach gesagt: ${seed.objective} Die Lektion übersetzt Fachsprache in Alltagssprache und zeigt, welche Fragen du dir zuerst stellen solltest.`,
    deepExplanation: `Vertiefend geht es um drei Ebenen: Erstens den Begriff selbst, zweitens seine praktische Wirkung und drittens die Grenze des eigenen Wissens. In Deutschland hängen viele Situationen von Zuständigkeit, Nachweisen, Fristen und Zweck ab. Deshalb reicht es nicht, ein Wort auswendig zu kennen. Du lernst, das Wort in einem Brief, Formular, Termin oder Gespräch wiederzuerkennen. Danach prüfst du: Wer ist zuständig? Welche Dokumente fehlen? Gibt es eine Frist? Ist das Thema rechtlich, sozialrechtlich, gesundheitlich oder akademisch sensibel? So entsteht ein Lernsystem, das nicht nur Fakten sammelt, sondern sichere nächste Schritte vorbereitet.`,
    everydayExample: `Alltag: Eine Person bekommt eine E-Mail oder einen Brief und sieht den Begriff „${termList[0]}“. Statt in Panik zu geraten, markiert sie Betreff, Frist, geforderte Unterlagen und die zuständige Stelle.`,
    authorityExample: `Behörde: In einem Termin wird nicht nur nach Gefühl entschieden. Die Person fragt nach Aktenzeichen, Rechtsgrundlage, fehlenden Nachweisen und schriftlicher Bestätigung.`,
    workStudyExample: `Arbeit/Studium: Das Thema kann relevant werden, wenn ein Arbeitgeber, eine Hochschule oder ein Amt einen Nachweis verlangt. Dann hilft eine geordnete Dokumentenmappe und eine kurze sachliche Antwort.`,
    keyTerms: termList.slice(0, 5).map((term, termIndex) => ({
      term,
      simple: `${term} ist ein Schlüsselwort dieser Lektion.`,
      detailed: `Der Begriff muss im Kontext gelesen werden. Wichtig sind Zweck, Zuständigkeit, Nachweis und mögliche Fristen.`,
      example: termIndex === 0 ? `Im Brief steht „${term}“. Du prüfst: Was wird verlangt und bis wann?` : `Der Begriff „${term}“ taucht in Formularen, Gesprächen oder Checklisten auf.`,
      related: termList.filter((item) => item !== term).slice(0, 3),
    })),
    commonMistakes: [
      "Fachbegriffe nur auswendig lernen, ohne sie in Dokumenten anwenden zu können.",
      "Eine allgemeine Information wie eine verbindliche Einzelfallentscheidung behandeln.",
      "Fristen, Zuständigkeit oder fehlende Nachweise übersehen.",
      "Bei sensiblen rechtlichen Themen zu spät Beratung suchen.",
    ],
    checklist: [
      "Kann ich den Begriff in einem Satz erklären?",
      "Weiß ich, welche Behörde oder Stelle typischerweise zuständig ist?",
      "Gibt es typische Dokumente oder Nachweise?",
      "Gibt es typische Fristen oder Risiken?",
      "Weiß ich, wann ich Beratung oder professionelle Hilfe brauche?",
    ],
    miniSummary: `${seed.title}: ${seed.objective} Merke dir: Begriff verstehen, Beispiel erkennen, Dokumente prüfen, Fristen sichern und bei Einzelfallrisiken Hilfe holen.`,
    quiz: makeQuiz(seed, id),
    reflectionQuestion: `Wo könnte dir das Thema „${seed.title}“ im Alltag, bei einer Behörde, in Arbeit oder Studium konkret begegnen?`,
    sources,
    sourceStand: SOURCE_STAND,
    legalReviewNote: legalNotice(legal, module.id),
    reviewStatus: legal ? "muss-geprüft-werden" : "aktuell",
    createdAt: "2026-06-30",
    updatedAt: "2026-06-30",
  };
}

export const learningLessons: LearningLesson[] = learningModules.flatMap((module) => {
  const seeds = lessonPlan[module.id];
  return seeds.map((seed, index) => makeLesson(seed, module, index, (module.moduleOrder - 1) * 10 + index + 1));
});

const idByPrefix = new Map(learningLessons.map((lesson) => [lesson.id.slice(0, 4), lesson.id]));
learningLessons.forEach((lesson) => {
  if (lesson.previousLessonId) lesson.previousLessonId = idByPrefix.get(lesson.previousLessonId) ?? lesson.previousLessonId;
  if (lesson.nextLessonId) lesson.nextLessonId = idByPrefix.get(lesson.nextLessonId) ?? lesson.nextLessonId;
  lesson.prerequisiteLessonIds = lesson.prerequisiteLessonIds.map((id) => idByPrefix.get(id) ?? id);
});

export const glossaryEntries: GlossaryEntry[] = Array.from(
  new Map(
    learningLessons
      .flatMap((lesson) => lesson.keyTerms.map((term) => [slugify(term.term), { term, lesson }] as const))
      .map(([id, value]) => [
        id,
        {
          id,
          term: value.term.term,
          simpleExplanation: value.term.simple,
          detailedExplanation: value.term.detailed,
          example: value.term.example,
          relatedTerms: value.term.related,
          source: value.lesson.sources[0],
          lastCheckedAt: CHECKED_AT,
        },
      ]),
  ).values(),
);

export function getLessonById(id?: string) {
  return learningLessons.find((lesson) => lesson.id === id);
}

export function getFirstOpenLesson(completedIds: string[], currentLessonId?: string) {
  const current = getLessonById(currentLessonId);
  if (current && !completedIds.includes(current.id)) return current;
  return learningLessons.find((lesson) => !completedIds.includes(lesson.id)) ?? learningLessons[learningLessons.length - 1];
}

export function getModuleLessons(moduleId: string) {
  return learningLessons.filter((lesson) => lesson.moduleId === moduleId).sort((a, b) => a.lessonOrder - b.lessonOrder);
}
