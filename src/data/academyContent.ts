export type AcademyAudience = "Anfänger" | "Fortgeschritten" | "Experte" | "Sachbearbeitung" | "Beratung" | "Prüfung";

export type AcademyModule = {
  id: string;
  title: string;
  area: string;
  level: AcademyAudience;
  duration: string;
  short: string;
  learningGoal: string;
  legalBasis: string[];
  introduction: string;
  purpose: string;
  system: string;
  keyTerms: { term: string; simple: string; expert: string; example: string }[];
  requirements: string[];
  discretion: string[];
  practiceProblems: string[];
  applicantErrors: string[];
  staffErrors: string[];
  deadlines: string[];
  documents: string[];
  criteria: string[];
  refusalReasons: string[];
  remedies: string[];
  authorityExample: string;
  counsellingExample: string;
  expertTips: string[];
  summary: string;
  controlQuestions: string[];
  reflectionQuestions: string[];
  quiz: { question: string; answer: string; why: string }[];
  flashcards: { front: string; back: string }[];
};

export type LearningPath = {
  id: string;
  title: string;
  subtitle: string;
  audience: AcademyAudience;
  promise: string;
  moduleIds: string[];
  checkpoint: string;
};

export type ExpertScheme = {
  id: string;
  title: string;
  area: string;
  useWhen: string;
  steps: { title: string; questions: string[]; evidence: string[]; warning: string }[];
  decisionNote: string;
};

export type DecisionTree = {
  id: string;
  title: string;
  area: string;
  startQuestion: string;
  nodes: { question: string; yes: string; no: string; unsure: string }[];
  result: string;
  redFlags: string[];
};

export type PremiumDossier = {
  id: string;
  title: string;
  category: string;
  difficulty: "mittel" | "schwer";
  overview: string;
  person: {
    name: string;
    country: string;
    entry: string;
    status: string;
    family: string;
    work: string;
    income: string;
    housing: string;
  };
  facts: string;
  documents: string[];
  tasks: string[];
  modelSolution: string[];
  typicalErrors: string[];
  score: { label: string; points: number; expectation: string }[];
  learningHint: string;
  terms: string[];
};

const generalRefusal = [
  "entscheidungserhebliche Tatsachen bleiben trotz Mitwirkung unklar",
  "zwingende Spezialvoraussetzung der Norm fehlt",
  "Sperren, Sicherheitsbedenken oder Ausweisungsinteressen sind nicht ausgeräumt",
  "beantragter Zweck passt nicht zur vorgelegten Tatsachengrundlage",
];

const generalRemedies = [
  "Bescheid und Rechtsbehelfsbelehrung vollständig lesen",
  "Zustelldatum, Fristbeginn und Fristende notieren",
  "fehlende Nachweise geordnet nachreichen, wenn das Verfahren noch offen ist",
  "bei Ablehnung rechtzeitig qualifizierte Rechtsberatung oder Migrationsfachdienst einschalten",
];

const baseStaffErrors = [
  "vom Dokumentennamen direkt auf die Rechtsfolge schließen",
  "Ausnahmen und atypische Härten nicht dokumentieren",
  "Zuständigkeiten von BAMF, Ausländerbehörde, Jobcenter und Sozialamt vermischen",
  "Ermessen behaupten, ohne Ermessenserwägungen aktenkundig zu machen",
];

export const academyModules: AcademyModule[] = [
  {
    id: "system-aufenthaltsrecht",
    title: "System des Aufenthaltsrechts",
    area: "Aufenthaltsrecht",
    level: "Anfänger",
    duration: "75 Min.",
    short: "Erst Struktur, dann Einzelfall.",
    learningGoal: "Du kannst Aufenthaltstitel, Gestattung, Duldung und Nebenbestimmungen sicher unterscheiden und weißt, warum die allgemeine Prüfung vor der Spezialnorm steht.",
    legalBasis: ["§§ 3–5 AufenthG", "§ 4 AufenthG", "§ 7 AufenthG", "§ 12 AufenthG"],
    introduction: "Das Aufenthaltsrecht wirkt kompliziert, weil viele Menschen zuerst mit Dokumenten und Einzelschicksalen arbeiten. Fachlich beginnt die Prüfung aber abstrakter: Wer ist die Person, welcher Status liegt vor, welcher Zweck wird verfolgt, welche Norm ist einschlägig und welche allgemeinen Voraussetzungen gelten?",
    purpose: "Das System soll Aufenthalt, Einreise, Erwerbstätigkeit und Aufenthaltsbeendigung steuerbar machen, ohne jeden Einzelfall in eine einzige starre Schablone zu pressen.",
    system: "Allgemeine Vorschriften bilden den Rahmen. Die Spezialnorm entscheidet, ob ein Anspruch, eine Soll-Regelung oder Ermessen vorliegt. Dokumente sind Beweise und Rechtsakte, aber sie ersetzen nicht die Prüfung der Rechtsgrundlage.",
    keyTerms: [
      { term: "Aufenthaltstitel", simple: "Erlaubnis für Aufenthalt oder Einreise.", expert: "Gesetzlich vorgesehene Form der Aufenthaltsberechtigung, etwa Visum, Aufenthaltserlaubnis, Blaue Karte EU oder Niederlassungserlaubnis.", example: "Eine Aufenthaltserlaubnis nach § 25 AufenthG ist ein befristeter Aufenthaltstitel." },
      { term: "Duldung", simple: "Abschiebung ist vorübergehend ausgesetzt.", expert: "Kein Aufenthaltstitel, sondern Aussetzung der Abschiebung mit eigenem Rechtsfolgensystem.", example: "Eine Person mit Duldung kann nicht automatisch arbeiten; Nebenbestimmung und Erlaubnis sind zu prüfen." },
      { term: "Nebenbestimmung", simple: "Zusatzregel auf dem Dokument.", expert: "Auflage, Bedingung oder sonstige Regelung, die Reichweite und Pflichten des Titels konkretisieren kann.", example: "„Erwerbstätigkeit erlaubt“ verändert die praktische Lage erheblich." },
    ],
    requirements: ["Statusdokument vollständig lesen", "Rechtsgrundlage und Gültigkeit notieren", "Aufenthaltszweck bestimmen", "allgemeine Voraussetzungen prüfen", "besondere Voraussetzungen der Spezialnorm prüfen", "Nebenbestimmungen auswerten"],
    discretion: ["Ermessen entsteht nur, wenn die Norm Spielraum eröffnet.", "Auch beim Ermessen müssen Zweck der Ermächtigung, Gleichbehandlung und Verhältnismäßigkeit beachtet werden.", "Absehen von Regelvoraussetzungen muss begründet werden."],
    practiceProblems: ["unvollständige Dokumente", "abgelaufene Titel", "unklare Identität", "falsche Beratungsversprechen", "mehrere parallel laufende Verfahren"],
    applicantErrors: ["Fristen ignorieren", "nur Fotos von Dokumenten vorlegen", "Titel und Duldung verwechseln", "Änderungen von Adresse, Arbeit oder Familie nicht melden"],
    staffErrors: baseStaffErrors,
    deadlines: ["vor Ablauf des Dokuments handeln", "Rechtsbehelfsfristen nach Bescheid sofort prüfen", "Wiedervorlage für fehlende Unterlagen setzen"],
    documents: ["Pass/Passersatz", "aktuelles Aufenthaltsdokument", "Zusatzblatt", "Antrag", "Nachweis zum Aufenthaltszweck", "Krankenversicherung", "Meldebescheinigung"],
    criteria: ["Identität", "Passpflicht", "Lebensunterhalt", "kein entgegenstehendes Ausweisungsinteresse", "korrektes Visumverfahren", "Spezialvoraussetzungen"],
    refusalReasons: generalRefusal,
    remedies: generalRemedies,
    authorityExample: "Eine Sachbearbeiterin prüft zuerst den alten Titel, die Gültigkeit, die Nebenbestimmung und die beantragte Verlängerung. Erst danach bewertet sie Einkommen und Spezialnorm.",
    counsellingExample: "In der Beratung wird der Brief der Behörde in Aufgaben übersetzt: Frist sichern, Unterlagen sortieren, konkrete Rückfrage formulieren.",
    expertTips: ["Nie ohne Rechtsgrundlage beraten.", "Dokumente immer vollständig sehen: Vorderseite, Rückseite, Zusatzblatt.", "Die beste Entscheidung ist nicht die schnellste, sondern die nachvollziehbar dokumentierte."],
    summary: "Aufenthaltsrecht ist ein Prüfungssystem. Wer Dokument, Norm, Zweck und Nebenbestimmung sauber trennt, vermeidet die meisten Anfängerfehler.",
    controlQuestions: ["Warum ist eine Duldung kein Aufenthaltstitel?", "Welche allgemeinen Voraussetzungen prüfst du vor der Spezialnorm?", "Was sagt eine Nebenbestimmung praktisch aus?"],
    reflectionQuestions: ["Wann kann eine schnelle mündliche Auskunft gefährlich werden?", "Wie erklärst du einer Anfängerin den Unterschied zwischen Status und Aufenthaltszweck?"],
    quiz: [
      { question: "Ist die Duldung ein Aufenthaltstitel?", answer: "Nein.", why: "Sie setzt die Abschiebung aus, verleiht aber keinen Aufenthaltstitel." },
      { question: "Darf man nur wegen eines gültigen Dokuments die Erwerbstätigkeit bejahen?", answer: "Nein.", why: "Die Nebenbestimmung und Rechtsgrundlage müssen gelesen werden." },
    ],
    flashcards: [
      { front: "Prüfreihenfolge im Aufenthaltsrecht", back: "Person → Dokument → Rechtsgrundlage → Zweck → allgemeine Voraussetzungen → Spezialnorm → Nebenbestimmung → Entscheidung." },
      { front: "Duldung", back: "Kein Aufenthaltstitel; Abschiebung ist vorübergehend ausgesetzt." },
    ],
  },
  {
    id: "visum-einreise",
    title: "Visum, Einreise und Botschaftsverfahren",
    area: "Visum",
    level: "Fortgeschritten",
    duration: "90 Min.",
    short: "Warum der richtige Weg oft vor der Einreise beginnt.",
    learningGoal: "Du kannst Schengen-Visum, nationales Visum D und spätere Aufenthaltserlaubnis unterscheiden und typische Ablehnungsgründe fachlich erklären.",
    legalBasis: ["§ 5 Abs. 2 AufenthG", "§ 6 AufenthG", "Schengener Grenzkodex", "Visa-Handbuch der Auslandsvertretungen"],
    introduction: "Das Visumverfahren ist kein Formalismus am Rand. Es ist häufig der Ort, an dem Zweck, Identität, Finanzierung, Urkunden und Zustimmungen erstmals geprüft werden.",
    purpose: "Vor der Einreise soll geklärt werden, ob der beabsichtigte langfristige Aufenthalt rechtlich tragfähig ist und ob beteiligte Behörden zustimmen müssen.",
    system: "Schengen-Visa betreffen Kurzaufenthalte. Nationale Visa D dienen langfristigen Zwecken und führen häufig nach Einreise zu einer Aufenthaltserlaubnis. Ein falscher Einreiseweg kann später ein erhebliches Problem werden.",
    keyTerms: [
      { term: "Schengen-Visum", simple: "Kurzaufenthalt bis grundsätzlich 90 Tage.", expert: "Visum für kurzfristige Aufenthalte im Schengenraum; nicht der normale Weg für langfristigen Aufenthalt.", example: "Besuch einer Messe oder Familie für kurze Zeit." },
      { term: "Nationales Visum D", simple: "Visum für längeren Aufenthalt.", expert: "Nationaler Aufenthaltstitel zur Einreise für einen konkreten längerfristigen Aufenthaltszweck.", example: "Einreise für Studium, Ausbildung, Arbeit oder Familiennachzug." },
      { term: "Remonstration", simple: "Überprüfung einer Visumentscheidung.", expert: "Je nach Verfahrensstand und aktueller Praxis möglicher außergerichtlicher Überprüfungsweg; Fristen und Zuständigkeit genau prüfen.", example: "Nach Ablehnung verlangt die Person eine erneute Begründungsprüfung." },
    ],
    requirements: ["zuständige Auslandsvertretung", "konkreter Aufenthaltszweck", "gültiger Pass", "Finanzierung", "Krankenversicherung", "zweckspezifische Nachweise", "gegebenenfalls Zustimmung der Ausländerbehörde oder BA"],
    discretion: ["Absehen vom Visumverfahren ist eng und einzelfallbezogen zu prüfen.", "Humanitäre oder familiäre Konstellationen können besondere Abwägungen auslösen.", "Erleichterungen ersetzen nicht die Prüfung der Grundtatsachen."],
    practiceProblems: ["lange Terminwartezeiten", "Urkundenprüfung", "unterschiedliche Merkblätter je Auslandsvertretung", "unklare Finanzierung", "falscher Zweck im Antrag"],
    applicantErrors: ["Touristenvisum für Daueraufenthalt nutzen wollen", "Unterlagenlisten nicht beachten", "Flugticket als Erfolgsgarantie verstehen", "Zweck im Interview anders schildern als im Antrag"],
    staffErrors: ["Visum D und Aufenthaltserlaubnis vermischen", "Zustimmung als Visumerteilung darstellen", "Urkundenprobleme vorschnell als Täuschung werten", "Ausnahmeprüfung nicht dokumentieren"],
    deadlines: ["Terminbuchung früh planen", "Gültigkeit des Visums und Einreisezeitraum prüfen", "nach Einreise rechtzeitig Folgetitel beantragen", "Rechtsbehelfsfrist bei Ablehnung sofort notieren"],
    documents: ["Pass", "Visumantrag", "Foto", "Zwecknachweis", "Finanzierungsnachweis", "Krankenversicherung", "Urkunden mit Übersetzung/Legalisation, soweit verlangt"],
    criteria: ["Zweck plausibel", "Unterlagen vollständig", "Finanzierung tragfähig", "Rückkehr-/Sicherheitsfragen geprüft", "Spezialnorm erfüllbar"],
    refusalReasons: ["unklarer Aufenthaltszweck", "fehlende Finanzierung", "unvollständige oder zweifelhafte Urkunden", "Sperre oder Sicherheitsbedenken", "Spezialvoraussetzungen fehlen"],
    remedies: generalRemedies,
    authorityExample: "Die Ausländerbehörde erhält eine Beteiligungsanfrage zum Familiennachzug und prüft Status der Referenzperson, Wohnraum, Einkommen, Frist und Urkundenlage.",
    counsellingExample: "Die Beratungsstelle erstellt mit der Person eine Visum-Mappe: Zweck, Dokumente, Übersetzungen, Fristen, Interviewvorbereitung.",
    expertTips: ["Immer mit dem Merkblatt der konkreten Auslandsvertretung arbeiten.", "Zweckkonsistenz ist zentral: Antrag, Unterlagen und Gespräch müssen zusammenpassen.", "Bei Familiennachzug nie ohne Status der Referenzperson prüfen."],
    summary: "Visumrecht ist Vorprüfung plus Zweckprüfung. Der spätere Aufenthaltstitel wird schon im Visumverfahren vorbereitet.",
    controlQuestions: ["Wann ist ein nationales Visum D typisch?", "Warum reicht ein Schengen-Visum nicht für einen geplanten Daueraufenthalt?", "Welche Stellen können beteiligt sein?"],
    reflectionQuestions: ["Wie erklärst du Wartezeiten ohne falsche Versprechen?", "Welche Unterlagen würdest du immer zuerst sortieren?"],
    quiz: [{ question: "Ist ein nationales Visum D dasselbe wie ein Schengen-Visum?", answer: "Nein.", why: "Beide haben unterschiedliche Zwecke, Reichweiten und Verfahren." }],
    flashcards: [{ front: "Visum D", back: "Nationales Visum für längerfristige Aufenthaltszwecke." }, { front: "Zweckkonsistenz", back: "Antrag, Unterlagen und Erklärung müssen denselben Aufenthaltszweck tragen." }],
  },
  {
    id: "fachkraefte-arbeit",
    title: "Fachkräfteeinwanderung, Arbeit und Blaue Karte EU",
    area: "Erwerbsmigration",
    level: "Experte",
    duration: "110 Min.",
    short: "Qualifikation, Stelle und Gehalt zusammendenken.",
    learningGoal: "Du kannst Erwerbstitel nach Qualifikation, Arbeitsplatz, Anerkennung, Gehalt und BA-Beteiligung strukturieren.",
    legalBasis: ["§§ 18 ff. AufenthG", "§ 18g AufenthG", "BeschV", "Anerkennungsrecht"],
    introduction: "Erwerbsmigration ist kein einzelner Titel, sondern ein Baukasten. Der richtige Titel hängt von Qualifikation, konkretem Job, Gehalt, Anerkennung, Berufszugang und Aufenthaltsweg ab.",
    purpose: "Deutschland will qualifizierte Zuwanderung ermöglichen, zugleich Arbeitsbedingungen, Qualifikationsbezug und öffentliche Interessen sichern.",
    system: "Erst wird geklärt, ob eine Person Fachkraft ist oder über einen besonderen Zugang kommt. Danach werden Arbeitsplatz, Zustimmungserfordernisse, Gehalt, Anerkennung und Zweckwechsel geprüft.",
    keyTerms: [
      { term: "Fachkraft", simple: "Person mit anerkannter beruflicher oder akademischer Qualifikation.", expert: "Qualifikationsstatus mit aufenthaltsrechtlicher Bedeutung; Anerkennung oder Vergleichbarkeit ist oft entscheidend.", example: "Pflegefachkraft mit Anerkennungsbescheid." },
      { term: "Blaue Karte EU", simple: "Titel für bestimmte qualifizierte Beschäftigung.", expert: "Spezialtitel mit Anforderungen an Qualifikation, Beschäftigung und Gehalt; Werte ändern sich dynamisch.", example: "Softwareentwicklerin mit passender Qualifikation und ausreichendem Gehalt." },
      { term: "BA-Zustimmung", simple: "Arbeitsmarktliche Beteiligung.", expert: "Bundesagentur für Arbeit prüft je nach Titel Beschäftigungsbedingungen oder weitere Kriterien.", example: "Ausländerbehörde leitet Beschäftigungsdaten zur Zustimmung weiter." },
    ],
    requirements: ["konkretes Arbeitsplatzangebot", "Qualifikation oder Berufserfahrung", "Passung zwischen Qualifikation und Tätigkeit", "Arbeitsbedingungen", "gegebenenfalls Anerkennung", "gegebenenfalls Gehaltsschwelle", "Visum oder Zweckwechsel"],
    discretion: ["Bei manchen Konstellationen sind Ermessen und Zustimmungserfordernisse relevant.", "Bei Abweichungen vom Normalfall muss die Begründung besonders sauber sein.", "Anerkennungsdefizite können durch Qualifizierungswege überbrückt werden."],
    practiceProblems: ["Jobtitel passt nicht zur Tätigkeit", "ausländischer Abschluss ist nicht bewertet", "Gehaltsschwellen veraltet", "Arbeitsvertrag enthält unklare Stunden", "Probezeit und Befristung werden falsch gewichtet"],
    applicantErrors: ["Anerkennung zu spät starten", "nur Diplom ohne Fächerübersicht einreichen", "Brutto/Netto verwechseln", "Tätigkeit wechseln ohne Nebenbestimmung zu prüfen"],
    staffErrors: ["alte Gehaltsschwelle verwenden", "Jobtitel statt Tätigkeitsinhalt prüfen", "Anerkennung und Vergleichbarkeit gleichsetzen", "BA-Beteiligung vergessen"],
    deadlines: ["Gehaltsschwellen jährlich prüfen", "Titelverlängerung vor Ablauf", "Arbeitgeberwechsel rechtzeitig anzeigen, soweit erforderlich", "Anerkennungsfristen im Verfahren beachten"],
    documents: ["Arbeitsvertrag", "Stellenbeschreibung", "Qualifikationsnachweise", "Anerkennungs-/Bewertungsnachweis", "Gehaltsangaben", "Pass", "Versicherung"],
    criteria: ["Qualifikation verwertbar", "Tätigkeit passend", "Arbeitsbedingungen plausibel", "Gehalt aktuell ausreichend", "Zustimmungserfordernisse geklärt"],
    refusalReasons: ["Qualifikation nicht nachgewiesen", "Tätigkeit nicht qualifikationsangemessen", "Gehalt unterschreitet Schwelle", "Arbeitsbedingungen unplausibel", "erforderliche Zustimmung fehlt"],
    remedies: generalRemedies,
    authorityExample: "Eine Stelle prüft nicht nur den Vertrag, sondern lässt die tatsächlichen Aufgaben beschreiben und dokumentiert die Passung zum Abschluss.",
    counsellingExample: "Die Beratung erstellt einen Anerkennungsfahrplan: Referenzberuf, zuständige Stelle, Kosten, Sprachziel, Zwischenbeschäftigung.",
    expertTips: ["Dynamische Werte nie auswendig entscheiden.", "Qualifikation, Tätigkeit und Gehalt sind ein Dreieck.", "Für Menschen ist der schnellste Job nicht immer der stabilste Aufenthaltspfad."],
    summary: "Erwerbsmigration verlangt präzise Subsumtion: Wer ist qualifiziert, welche Stelle liegt vor, welche Norm passt, welche Nachweise tragen das Ergebnis?",
    controlQuestions: ["Was ist bei der Blauen Karte EU immer aktuell zu prüfen?", "Warum reicht ein Arbeitsvertrag allein nicht?", "Wann ist Anerkennung zentral?"],
    reflectionQuestions: ["Wie erklärst du einer Person, dass ein besser bezahlter, aber fachfremder Job aufenthaltsrechtlich problematisch sein kann?", "Welche Rolle spielt Sprache für nachhaltige Integration?"],
    quiz: [{ question: "Reicht ein Hochschulabschluss allein für die Blaue Karte EU?", answer: "Nein.", why: "Tätigkeit, Qualifikationsbezug und Gehalt müssen zusammenpassen." }],
    flashcards: [{ front: "Qualifikationsangemessene Beschäftigung", back: "Tätigkeit und Qualifikation müssen fachlich zusammenpassen." }, { front: "Dynamische Schwelle", back: "Gehaltsschwellen jährlich amtlich prüfen." }],
  },
  {
    id: "familiennachzug-tief",
    title: "Familiennachzug und Schutz der Familie",
    area: "Familie",
    level: "Fortgeschritten",
    duration: "105 Min.",
    short: "Immer zuerst: Nachzug zu wem?",
    learningGoal: "Du kannst Ehegatten-, Kinder- und Elternnachzug nach Referenzperson, Status, Frist und Nachweisen trennen.",
    legalBasis: ["§§ 27–36a AufenthG", "Art. 6 GG", "§ 5 AufenthG"],
    introduction: "Familiennachzug ist emotional und rechtlich anspruchsvoll. Eine falsche Auskunft kann Monate oder Jahre kosten. Deshalb muss zuerst geklärt werden, zu welcher Person in Deutschland der Nachzug erfolgen soll.",
    purpose: "Familie soll geschützt werden, zugleich prüft das Aufenthaltsrecht Identität, Echtheit der Beziehung, Lebensunterhalt, Wohnraum, Sprache und statusbezogene Ausnahmen.",
    system: "Die Referenzperson bestimmt den Prüfpfad. Nachzug zu Deutschen, zu Fachkräften, zu Schutzberechtigten oder subsidiär Schutzberechtigten hat unterschiedliche Voraussetzungen.",
    keyTerms: [
      { term: "Referenzperson", simple: "Person in Deutschland, zu der jemand nachziehen will.", expert: "Status und Rechtsgrundlage der Referenzperson bestimmen die Voraussetzungen des Nachzugs.", example: "Ehegattennachzug zu einer Person mit Flüchtlingsstatus." },
      { term: "Kernfamilie", simple: "Ehegatte und minderjährige Kinder.", expert: "Enger Familienkreis mit besonderer aufenthaltsrechtlicher Bedeutung; Sonderfälle sind gesondert zu prüfen.", example: "Minderjähriges lediges Kind möchte zu Eltern nachziehen." },
      { term: "Privilegierung", simple: "Erleichterung bei bestimmten Fällen.", expert: "Status- und fristabhängige Erleichterung, etwa bei Schutzberechtigten, wenn Voraussetzungen vorliegen.", example: "Fristgerechter Antrag nach Schutzanerkennung." },
    ],
    requirements: ["Status der Referenzperson", "wirksames Familienverhältnis", "Identität", "Urkunden", "gegebenenfalls Sprache", "Lebensunterhalt und Wohnraum", "Frist", "Visumverfahren"],
    discretion: ["Härtefälle und humanitäre Gesichtspunkte können relevant sein.", "Nachzug außerhalb der Kernfamilie ist besonders begründungsbedürftig.", "Unmöglichkeit der Dokumentenbeschaffung muss sorgfältig gewürdigt werden."],
    practiceProblems: ["fehlende Urkunden", "unterschiedliche Schreibweisen", "Kind wird volljährig", "Frist versäumt", "Botschaftstermin zu spät", "A1-Nachweis fraglich"],
    applicantErrors: ["Frist nicht dokumentieren", "nur Kopien unklarer Urkunden sammeln", "Status der Referenzperson nicht vorlegen", "Wohnraum/Einkommen pauschal behaupten"],
    staffErrors: ["A1 immer verlangen", "Lebensunterhalt immer verlangen", "subsidiären Schutz wie Flüchtlingsschutz behandeln", "Minderjährigkeit nicht stichtagsbezogen prüfen"],
    deadlines: ["Fristen nach Schutzanerkennung prüfen", "Minderjährigkeit stichtagsbezogen prüfen", "Dokumentenbeschaffung früh starten", "Bescheidfrist bei Ablehnung sofort beachten"],
    documents: ["Pässe", "Heirats-/Geburtsurkunden", "BAMF-Bescheid", "Aufenthaltstitel der Referenzperson", "Wohnraumnachweis", "Einkommensnachweise", "Sprachzertifikat, soweit erforderlich"],
    criteria: ["Beziehung nachgewiesen", "Status eröffnet Nachzugspfad", "Fristlage geklärt", "Ausnahmen geprüft", "Urkundenlage plausibel"],
    refusalReasons: ["Familienverhältnis nicht nachgewiesen", "Voraussetzungen der konkreten Nachzugsnorm fehlen", "Frist-/Statusprivilegierung greift nicht", "Identität ungeklärt"],
    remedies: generalRemedies,
    authorityExample: "Die Akte enthält zunächst eine Matrix: Referenzperson, Titelgrundlage, Familienmitglied, Frist, Urkunden, Sprache, LU/Wohnraum.",
    counsellingExample: "Die Beratung erstellt eine Familiennachzugs-Checkliste und markiert, welche Aussagen nur die Botschaft oder Behörde verbindlich treffen kann.",
    expertTips: ["Status der Referenzperson ist der Schlüssel.", "Bei Kindern immer Datum und Alter aktenkundig machen.", "Urkundenprobleme sind Sachverhaltsprobleme, nicht automatisch Täuschung."],
    summary: "Familiennachzug ist keine Einheitsprüfung. Der richtige Prüfpfad entsteht aus Referenzperson, Beziehung, Status, Zeitpunkt und Nachweisen.",
    controlQuestions: ["Warum beginnt die Prüfung mit der Referenzperson?", "Welche Rolle spielt die Frist nach Schutzanerkennung?", "Warum sind Urkundenprobleme sensibel?"],
    reflectionQuestions: ["Wie kommunizierst du schlechte Nachrichten ohne falsche Hoffnung?", "Wie vermeidest du Druck auf vulnerable Familien?"],
    quiz: [{ question: "Ist Familiennachzug immer gleich zu prüfen?", answer: "Nein.", why: "Status, Beziehung und Frist verändern den Prüfweg." }],
    flashcards: [{ front: "Referenzperson", back: "Person in Deutschland, deren Status den Nachzugspfad bestimmt." }, { front: "Kernfamilie", back: "Typischer enger Familienkreis: Ehegatte und minderjährige ledige Kinder." }],
  },
  {
    id: "asyl-geas-schutz",
    title: "Asyl, GEAS und Schutzformen",
    area: "Asyl und Schutz",
    level: "Experte",
    duration: "120 Min.",
    short: "Schutzformen getrennt prüfen, nicht vermischen.",
    learningGoal: "Du kannst Flüchtlingsschutz, subsidiären Schutz, nationales Abschiebungsverbot und Verfahrensfragen sauber voneinander unterscheiden.",
    legalBasis: ["AsylG", "Verordnung (EU) 2024/1347", "Art. 16a GG", "AufenthG § 25"],
    introduction: "Asylrecht prüft nicht nur Leid, sondern rechtlich definierte Schutzgründe, Gefahrentypen, Akteure, interne Schutzmöglichkeiten und Ausschlussgründe. Seit GEAS sind europäische Grundlagen noch wichtiger.",
    purpose: "Schutz erhalten Menschen, denen bei Rückkehr Verfolgung, ernsthafter Schaden oder eine erhebliche konkrete Gefahr droht und die keinen wirksamen Schutz erhalten.",
    system: "Das BAMF prüft Schutzstatus. Die Ausländerbehörde setzt aufenthaltsrechtliche Folgen um. Gerichtliche Verfahren prüfen BAMF-Bescheide.",
    keyTerms: [
      { term: "Flüchtlingsschutz", simple: "Schutz vor Verfolgung aus bestimmten Gründen.", expert: "Schutz bei begründeter Furcht vor Verfolgung wegen geschützter Merkmale und fehlendem wirksamem Schutz.", example: "Verfolgung wegen politischer Überzeugung." },
      { term: "Subsidiärer Schutz", simple: "Schutz vor ernsthaftem Schaden.", expert: "Schutzform bei drohendem ernsthaften Schaden, wenn Flüchtlingsschutz nicht greift.", example: "Gefahr schwerer Menschenrechtsverletzungen." },
      { term: "Abschiebungsverbot", simple: "Rückführung ist aus bestimmten Gründen unzulässig.", expert: "Nationale Schutzfeststellung, etwa bei erheblicher konkreter Gefahr im Zielstaat.", example: "Schwere Erkrankung und fehlende Behandlungsmöglichkeit im Zielstaat." },
    ],
    requirements: ["individuelle Geschichte", "Herkunftslandlage", "Verfolgung oder Schaden", "Kausalität/Grund", "fehlender Schutz", "keine interne Schutzalternative", "keine Ausschlussgründe"],
    discretion: ["Statusprüfung ist rechtsgebunden, aber Sachverhaltswürdigung erfordert Genauigkeit.", "Glaubhaftigkeit ist Gesamtschau, nicht einzelne Widerspruchssuche.", "Vulnerabilität und besondere Bedürfnisse müssen beachtet werden."],
    practiceProblems: ["Dolmetschfehler", "Trauma und Erinnerungslücken", "fehlende Dokumente", "Dublin-Zuständigkeit", "Fristen nach Bescheid", "GEAS-Übergangsfragen"],
    applicantErrors: ["Anhörung unterschätzen", "Chronologie nicht vorbereiten", "Widersprüche nicht erklären", "wichtige Dokumente spät einreichen"],
    staffErrors: ["allgemeine Unsicherheit als Flüchtlingsschutz werten", "Schutzformen vermischen", "Vulnerabilität übersehen", "Herkunftslage nicht aktuell prüfen"],
    deadlines: ["Anhörungstermin", "Klagefrist nach Bescheid", "Eilverfahren bei bestimmten Ablehnungen", "Fristen im Dublin-Verfahren"],
    documents: ["Identitätsdokumente", "Beweismittel zur Verfolgung", "medizinische Unterlagen", "BAMF-Schreiben", "Zustellnachweise", "Herkunftslandinformationen"],
    criteria: ["Verfolgungshandlung", "Verfolgungsgrund", "ernsthafter Schaden", "individuelle Gefahr", "Schutzfähigkeit des Staates", "interner Schutz"],
    refusalReasons: ["Vortrag nicht schlüssig", "keine individuelle Gefahr", "interner Schutz zumutbar", "Schutz durch Staat erreichbar", "Ausschlussgrund"],
    remedies: generalRemedies,
    authorityExample: "Nach positiver BAMF-Entscheidung prüft die Ausländerbehörde die Erteilung des passenden humanitären Aufenthaltstitels und Dokumentationsfragen.",
    counsellingExample: "Die Beratung hilft bei Anhörungsstruktur, Fristensicherung und Weiterleitung an qualifizierte Asylverfahrensberatung.",
    expertTips: ["Nicht jede Not ist Flüchtlingsschutz, aber jede Not muss respektvoll erfasst werden.", "Anhörungsvorbereitung ist Beweisarbeit.", "GEAS-Rechtsstand immer aktuell prüfen."],
    summary: "Schutzformen haben unterschiedliche Tatbestände. Gute Prüfung trennt Verfolgung, ernsthaften Schaden und nationale Rückkehrgefahr.",
    controlQuestions: ["Was unterscheidet Flüchtlingsschutz von subsidiärem Schutz?", "Welche Rolle spielt interner Schutz?", "Warum ist die Anhörung so wichtig?"],
    reflectionQuestions: ["Wie gehst du mit traumabedingten Erinnerungslücken um?", "Wo endet Beratung und wo beginnt Rechtsvertretung?"],
    quiz: [{ question: "Ist allgemeine Armut automatisch Flüchtlingsschutz?", answer: "Nein.", why: "Flüchtlingsschutz verlangt Verfolgung aus geschütztem Grund." }],
    flashcards: [{ front: "Schutzformen", back: "Flüchtlingsschutz, subsidiärer Schutz, nationales Abschiebungsverbot getrennt prüfen." }, { front: "Interner Schutz", back: "Sichere und zumutbare Schutzalternative in einem Landesteil." }],
  },
  {
    id: "duldung-bleiberecht",
    title: "Duldung, Ausbildungsduldung und Bleibeperspektiven",
    area: "Duldung & Bleiberecht",
    level: "Fortgeschritten",
    duration: "95 Min.",
    short: "Kein Titel, aber oft entscheidender Übergangsstatus.",
    learningGoal: "Du kannst Duldung, Beschäftigung, Identitätsklärung, Ausbildungsduldung, Beschäftigungsduldung und Chancen-Aufenthaltsrecht praxisnah einordnen.",
    legalBasis: ["§ 60a AufenthG", "§ 60c AufenthG", "§ 60d AufenthG", "§ 104c AufenthG"],
    introduction: "Duldung ist fachlich unbequem: Die Person ist ausreisepflichtig, aber Abschiebung wird ausgesetzt. Gleichzeitig können Ausbildung, Arbeit, Identität und Mitwirkung echte Bleibeperspektiven eröffnen.",
    purpose: "Die Duldung löst tatsächliche oder rechtliche Abschiebungshindernisse vorübergehend auf, ohne den Aufenthalt zu legalisieren.",
    system: "Zuerst wird der Duldungsgrund geprüft. Danach Nebenbestimmungen, Beschäftigung, Mitwirkung, Identität, Sperren und mögliche Übergänge in Aufenthaltstitel.",
    keyTerms: [
      { term: "Duldungsgrund", simple: "Warum Abschiebung gerade nicht erfolgt.", expert: "Tatsächliches oder rechtliches Hindernis, das die Abschiebung vorübergehend unmöglich oder unzulässig macht.", example: "Passlosigkeit, Krankheit, familiäre Gründe oder Ausbildungskonstellation." },
      { term: "Mitwirkung", simple: "Person muss zumutbar mithelfen.", expert: "Pflicht, Identität und Passbeschaffung zu unterstützen, soweit rechtlich und tatsächlich zumutbar.", example: "Botschaftstermin dokumentieren." },
      { term: "Ausbildungsduldung", simple: "Duldung während bestimmter Ausbildung.", expert: "Besondere Duldungsform mit Voraussetzungen, Ausschlüssen und Anschlussfragen.", example: "Qualifizierte Berufsausbildung mit geklärter Identitätslage." },
    ],
    requirements: ["Duldungsgrund", "Identitäts- und Passlage", "Nebenbestimmung", "Beschäftigungserlaubnis", "Mitwirkung", "Sperren", "konkrete Ausbildung/Arbeit", "Voraufenthaltszeiten"],
    discretion: ["Zumutbarkeit der Mitwirkung verlangt Einzelfallprüfung.", "Humanitäre Gründe können relevant sein.", "Bei Übergangstiteln sind Stichtage und Nachweise besonders wichtig."],
    practiceProblems: ["Passbeschaffung unmöglich oder gefährlich", "Ausbildungsbeginn ohne Erlaubnis", "ungeklärte Identität", "falsche Hoffnungen auf automatische Aufenthaltserlaubnis"],
    applicantErrors: ["keine Nachweise über Passbemühungen", "Arbeit beginnen ohne Erlaubnis", "Frist für Antrag verpassen", "Duldungsauflagen ignorieren"],
    staffErrors: ["fehlenden Pass automatisch als fehlende Mitwirkung bewerten", "Ausbildung und Beschäftigung rechtlich vermischen", "Nebenbestimmung nicht aktualisieren", "Zumutbarkeit nicht prüfen"],
    deadlines: ["Duldungsgültigkeit beachten", "Ausbildungsbeginn rechtzeitig anzeigen", "Identitätsfristen prüfen", "Übergang nach erfolgreicher Ausbildung planen"],
    documents: ["Duldung", "Zusatzblatt", "Pass-/Identitätsnachweise", "Nachweise Passbeschaffung", "Ausbildungsvertrag", "Arbeitsvertrag", "Schul-/Kammerbestätigung"],
    criteria: ["Duldungsgrund nachvollziehbar", "Mitwirkung dokumentiert", "Ausbildung/Arbeit konkret", "Sperren geprüft", "Anschlussoptionen realistisch"],
    refusalReasons: ["Sperrtatbestand", "fehlende Mitwirkung ohne Entschuldigung", "Ausbildung nicht qualifiziert", "Erlaubnis nicht möglich", "Identität nicht ausreichend geklärt, soweit erforderlich"],
    remedies: generalRemedies,
    authorityExample: "Die Behörde fordert konkret nach, welche Nachweise zur Identitätsklärung fehlen, statt pauschal „Pass fehlt“ zu notieren.",
    counsellingExample: "Die Beratung erstellt eine Passbemühungs-Chronologie mit Datum, Stelle, Nachweis und Ergebnis.",
    expertTips: ["Mitwirkung heißt: konkret, zumutbar, dokumentiert.", "Duldung nie als sicheren Aufenthalt verkaufen.", "Arbeit/Ausbildung immer vor Beginn rechtlich prüfen."],
    summary: "Bei Duldung entscheidet Dokumentation. Wer Identität, Mitwirkung, Duldungsgrund und Perspektive sauber ordnet, kann Risiken realistisch einschätzen.",
    controlQuestions: ["Warum ist die Duldung kein Titel?", "Welche Rolle spielt Mitwirkung?", "Was muss vor Ausbildungsbeginn geprüft werden?"],
    reflectionQuestions: ["Wie sprichst du über Unsicherheit, ohne Hoffnung zu zerstören?", "Wie erkennst du, dass Rechtsberatung notwendig ist?"],
    quiz: [{ question: "Darf eine Person mit Duldung automatisch arbeiten?", answer: "Nein.", why: "Nebenbestimmung und Erlaubnis sind entscheidend." }],
    flashcards: [{ front: "Mitwirkung", back: "Zumutbare Schritte zur Identitätsklärung und Passbeschaffung dokumentieren." }, { front: "Ausbildungsduldung", back: "Besondere Duldungsform für bestimmte Ausbildungskonstellationen." }],
  },
  {
    id: "jobcenter-sgbii",
    title: "Bürgergeld, Jobcenter und Leistungsprüfung",
    area: "Jobcenter / SGB II",
    level: "Fortgeschritten",
    duration: "100 Min.",
    short: "Bedarf, Einkommen, Aufenthalt und Zuständigkeit zusammendenken.",
    learningGoal: "Du kannst die Grundlogik der SGB-II-Prüfung erklären und migrationsbezogene Zuständigkeitsfragen erkennen.",
    legalBasis: ["SGB II", "SGB XII", "AsylbLG", "FreizügG/EU"],
    introduction: "Jobcenter-Fälle scheitern oft nicht an einer Norm, sondern an fehlender Ordnung: Wer gehört zur Bedarfsgemeinschaft, welcher Status liegt vor, welches Einkommen fließt wann zu, welche Unterkunftskosten sind relevant?",
    purpose: "Das Bürgergeld sichert Lebensunterhalt und unterstützt Eingliederung in Arbeit, wenn die gesetzlichen Voraussetzungen erfüllt sind.",
    system: "Persönliche Leistungsberechtigung, Erwerbsfähigkeit, gewöhnlicher Aufenthalt, Hilfebedürftigkeit und Ausschlüsse werden gemeinsam geprüft. Migration beeinflusst vor allem Aufenthaltsrecht, Zuständigkeit und Leistungsausschlüsse.",
    keyTerms: [
      { term: "Bedarfsgemeinschaft", simple: "Menschen, deren Bedarf gemeinsam betrachtet wird.", expert: "Gesetzlich definierter Personenkreis, bei dem Bedarf und Einkommen/Vermögen verbunden geprüft werden.", example: "Eltern und minderjährige Kinder im Haushalt." },
      { term: "Zuflussprinzip", simple: "Geld zählt grundsätzlich, wenn es zufließt.", expert: "Zeitliche Zuordnung von Einkommen im Leistungsrecht.", example: "Lohn wird im Monat der Auszahlung berücksichtigt." },
      { term: "Mitwirkung", simple: "Unterlagen und Änderungen mitteilen.", expert: "Obliegenheit, entscheidungserhebliche Tatsachen nachzuweisen; Grenzen und Folgen sind formal zu beachten.", example: "Kontoauszüge oder Lohnabrechnung einreichen." },
    ],
    requirements: ["Alter/Erwerbsfähigkeit", "gewöhnlicher Aufenthalt", "Aufenthaltsstatus", "Hilfebedürftigkeit", "Bedarfsgemeinschaft", "Einkommen", "Vermögen", "Unterkunftskosten", "Ausschlüsse"],
    discretion: ["Eingliederungsleistungen enthalten oft Ermessen.", "Fristverlängerungen und Nachforderung müssen verhältnismäßig sein.", "Förderinstrumente sollen individuell passen."],
    practiceProblems: ["unvollständige Kontoauszüge", "wechselndes Einkommen", "unklare Bedarfsgemeinschaft", "Umzug ohne Zusicherung", "AsylbLG/SGB-II-Abgrenzung"],
    applicantErrors: ["Arbeitsaufnahme nicht melden", "Briefe ungeöffnet lassen", "Weiterbewilligung zu spät stellen", "Unterkunftsangebot ohne Rücksprache unterschreiben"],
    staffErrors: ["Aufenthaltsstatus nicht prüfen", "Einkommen ohne Zuflussdatum berechnen", "Ausschluss pauschal anwenden", "Sprachbarrieren als fehlende Mitwirkung behandeln"],
    deadlines: ["Antragsmonat sichern", "Mitwirkungsfrist beachten", "Widerspruchsfrist gegen Bescheid", "Weiterbewilligung vor Ende des Bewilligungszeitraums"],
    documents: ["Aufenthaltstitel", "Mietvertrag", "Kontoauszüge", "Einkommensnachweise", "Krankenversicherung", "Geburtsurkunden", "Schul-/Kita-Nachweise"],
    criteria: ["richtige Zuständigkeit", "Leistungsberechtigung", "Bedarf vollständig", "Einkommen korrekt zugeordnet", "Unterkunftskosten geprüft", "Mitwirkung zumutbar"],
    refusalReasons: ["fehlende Mitwirkung", "nicht erfüllte persönliche Voraussetzungen", "vorrangige Zuständigkeit", "fehlende Hilfebedürftigkeit", "gesetzlicher Leistungsausschluss"],
    remedies: generalRemedies,
    authorityExample: "Ein Jobcenter prüft bei einer Familie zuerst Status und Bedarfsgemeinschaft, dann Bedarf, Einkommen, Unterkunft und vorrangige Leistungen.",
    counsellingExample: "Die Beratung übersetzt einen Mitwirkungsbrief in eine konkrete Liste: Was fehlt, bis wann, woher bekommt man es?",
    expertTips: ["Nie nur den Aufenthaltstitel ansehen: Leistungsrecht hat eigene Voraussetzungen.", "Jeder Kontozufluss braucht eine rechtliche Einordnung.", "Fristensicherung ist oft wichtiger als perfekte Begründung im ersten Schritt."],
    summary: "SGB-II-Fälle brauchen Rechenlogik und Statuslogik. Gute Bearbeitung trennt Bedarf, Einkommen, Zuständigkeit und Mitwirkung.",
    controlQuestions: ["Was ist eine Bedarfsgemeinschaft?", "Warum ist das Zuflussdatum wichtig?", "Welche Rolle spielt der Aufenthaltsstatus?"],
    reflectionQuestions: ["Wie machst du einen Jobcenter-Brief in einfacher Sprache verständlich?", "Wann ist eine Fristverlängerung sinnvoll?"],
    quiz: [{ question: "Wird jeder Lohn vollständig vom Bürgergeld abgezogen?", answer: "Nein.", why: "Einkommen, Freibeträge und Absetzungen sind zu prüfen." }],
    flashcards: [{ front: "Zuflussprinzip", back: "Einkommen zählt grundsätzlich im Monat des tatsächlichen Zuflusses." }, { front: "Mitwirkung", back: "Erforderliche Nachweise vorlegen und Änderungen mitteilen." }],
  },
  {
    id: "integration-sprache",
    title: "Integration, Sprache, Anerkennung und Arbeitsmarkt",
    area: "Integration",
    level: "Beratung",
    duration: "95 Min.",
    short: "Sprachziel, Berufsziel und Lebenslage verbinden.",
    learningGoal: "Du kannst Integrationskurs, Berufssprachkurs, Anerkennung, Qualifizierung und Arbeitsmarktintegration in einen realistischen Plan übersetzen.",
    legalBasis: ["AufenthG Integrationskursregelungen", "DeuFöV", "Anerkennungsgesetze Bund/Länder", "SGB II/SGB III Förderlogik"],
    introduction: "Integration ist kein Formular, sondern ein Prozess. Ein guter Plan verbindet Sprache, Beruf, Gesundheit, Familie, Anerkennung, Finanzen und Motivation.",
    purpose: "Menschen sollen sprachlich, beruflich und gesellschaftlich handlungsfähig werden; Verwaltung und Beratung müssen passende Wege eröffnen.",
    system: "Integrationskurs und Berufssprachkurs bauen oft aufeinander auf. Anerkennung, Qualifizierung und Vermittlung müssen zum Zielberuf passen.",
    keyTerms: [
      { term: "Sprachförderkette", simple: "Passende Sprachkurse in sinnvoller Reihenfolge.", expert: "Planung von allgemeinen und berufsbezogenen Sprachangeboten entlang eines konkreten Bildungs- oder Arbeitsziels.", example: "A2 → B1 Integrationskurs → B2 Berufssprache Pflege." },
      { term: "Anerkennung", simple: "Prüfung eines ausländischen Berufsabschlusses.", expert: "Gleichwertigkeitsprüfung gegenüber einem deutschen Referenzberuf mit möglichen Ausgleichsmaßnahmen.", example: "Ingenieurabschluss wird bewertet; Lehrerberuf ist landesrechtlich reglementiert." },
      { term: "Vermittlungshemmnis", simple: "Etwas erschwert Arbeit oder Kurs.", expert: "Individuelle oder strukturelle Hürde, etwa Kinderbetreuung, Gesundheit, Sprache, Mobilität oder fehlende Dokumente.", example: "Kursabbruch wegen fehlender Kinderbetreuung." },
    ],
    requirements: ["Lernstand", "Sprachziel", "Berufsziel", "Anerkennungsbedarf", "Kinderbetreuung", "Gesundheit", "Finanzierung", "Kurszugang", "Motivation und Ressourcen"],
    discretion: ["Förderleistungen sollen individuell geeignet sein.", "Vermittlung darf nicht nur kurzfristig denken.", "Bei Belastungen sind Stabilisierung und Fachstellen wichtiger als Druck."],
    practiceProblems: ["Kursabbrüche", "falscher Referenzberuf", "fehlende Übersetzungen", "lange Anerkennungsdauer", "unrealistische Vermittlung", "Trauma oder Belastung"],
    applicantErrors: ["Zielberuf nicht klären", "Anerkennung ohne Beratung starten", "Sprachlevel überschätzen", "Fristen und Kurszeiten nicht planen"],
    staffErrors: ["nur schnellen Job statt nachhaltigen Weg priorisieren", "Kinderbetreuung ignorieren", "Anerkennung als reine Formsache ansehen", "Trauma als Unmotivation interpretieren"],
    deadlines: ["Kursanmeldung", "Bewilligungszeiträume", "Anerkennungsfristen", "Prüfungstermine", "Förderentscheidungen vor Maßnahmebeginn"],
    documents: ["Zeugnisse", "Übersetzungen", "Lebenslauf", "Sprachzertifikate", "Arbeitszeugnisse", "Aufenthaltstitel", "Kursberechtigung", "Kinderbetreuungsnachweise"],
    criteria: ["Ziel realistisch", "Kurs passend", "Finanzierung geklärt", "Anerkennungspfad bekannt", "Hemmnisse bearbeitet", "nächster Schritt messbar"],
    refusalReasons: ["Fördervoraussetzung fehlt", "Maßnahme nicht geeignet", "Unterlagen fehlen", "vorrangige Stelle zuständig", "Ziel nicht nachvollziehbar"],
    remedies: generalRemedies,
    authorityExample: "Im Kooperationsplan wird nicht nur „Deutsch verbessern“ notiert, sondern: B2 Berufssprache, Kinderbetreuung, Anerkennungsberatung, Praktikum.",
    counsellingExample: "Die Beraterin zeichnet mit der Person eine Roadmap: heutiger Stand, Zielberuf, Sprachlevel, Anerkennung, Zwischenjobs, Risiken.",
    expertTips: ["Gute Integration ist passend, nicht nur schnell.", "Anerkennung ohne Referenzberuf ist Blindflug.", "Kursabbrüche sind Diagnosematerial, kein moralisches Urteil."],
    summary: "Integration gelingt, wenn Fachlichkeit und Lebenslage zusammen geplant werden.",
    controlQuestions: ["Was ist eine Sprachförderkette?", "Warum ist der Referenzberuf wichtig?", "Welche Hemmnisse müssen vor Kursbeginn geklärt werden?"],
    reflectionQuestions: ["Wie vermeidest du Druck, der zu Abbruch führt?", "Wann ist Stabilisierung wichtiger als Vermittlung?"],
    quiz: [{ question: "Ist B1 immer ausreichend für qualifizierte Arbeit?", answer: "Nein.", why: "Viele Berufe benötigen B2, C1 oder Fachsprache." }],
    flashcards: [{ front: "Referenzberuf", back: "Deutscher Beruf, mit dem eine ausländische Qualifikation verglichen wird." }, { front: "Sprachförderkette", back: "Sinnvolle Abfolge von Sprachkursen bis zum beruflichen Ziel." }],
  },
  {
    id: "beratung-menschlich",
    title: "Beratungspraxis, Kommunikation und professionelle Haltung",
    area: "Beratung",
    level: "Beratung",
    duration: "90 Min.",
    short: "Rechtlich korrekt, menschlich verständlich.",
    learningGoal: "Du kannst Beratungsgespräche strukturieren, Grenzen setzen, einfache Sprache nutzen und schwierige Situationen professionell bearbeiten.",
    legalBasis: ["Datenschutzgrundsätze", "Beratungsauftrag", "Schweigepflicht je Kontext", "Rechtsdienstleistungsgesetz beachten"],
    introduction: "Migration ist oft mit Angst, Wartezeit, Verlust, Behördenmacht und Unsicherheit verbunden. Gute Beratung ordnet, erklärt und stärkt, ohne Zuständigkeiten zu überschreiten.",
    purpose: "Menschen sollen verstehen, was passiert, welche Optionen es gibt und was sie selbst als Nächstes tun können.",
    system: "Beratung beginnt mit Auftrag und Dringlichkeit, prüft Fristen, sortiert Dokumente, klärt Zuständigkeiten und endet mit einem konkreten nächsten Schritt.",
    keyTerms: [
      { term: "Clearing", simple: "Probleme sortieren.", expert: "Strukturierte Erstklärung von Anliegen, Dringlichkeit, Zuständigkeit, Risiken und nächsten Schritten.", example: "Drei Briefe werden nach Frist und Risiko geordnet." },
      { term: "Professionelle Distanz", simple: "Empathisch helfen, aber Grenzen behalten.", expert: "Haltung, die Unterstützung ermöglicht, ohne Verantwortung, Rollen oder Datenschutz zu verwischen.", example: "Keine privaten WhatsApp-Kanäle für sensible Dokumente." },
      { term: "Einfache Sprache", simple: "Kurz, klar, ohne unnötige Fachwörter.", expert: "Adressatengerechte Übersetzung komplexer Verwaltungssprache ohne inhaltliche Verfälschung.", example: "„Sie müssen bis Freitag diese drei Nachweise abgeben.“" },
    ],
    requirements: ["Anliegen klären", "Fristen sichern", "Auftrag definieren", "Dokumente sortieren", "Datenschutz beachten", "Grenzen der Beratung erkennen", "Fachstellen einbeziehen"],
    discretion: ["Wie viel Unterstützung sinnvoll ist, hängt von Selbstständigkeit und Krise ab.", "Bei Trauma, Gewalt, Wohnungslosigkeit oder Suizidgedanken haben Schutz und Fachstellen Vorrang.", "Beratung darf nicht zur unerlaubten Rechtsdienstleistung werden."],
    practiceProblems: ["Sprachbarrieren", "Misstrauen", "mehrere Behörden", "akute Krise", "unrealistische Erwartungen", "fehlende digitale Kompetenz"],
    applicantErrors: ["Briefe zu spät zeigen", "mündliche Aussagen ohne Nachweis verlassen", "Unterlagen ungeordnet aufbewahren", "Passwörter weitergeben"],
    staffErrors: ["zu viel Fachsprache", "falsche Sicherheit geben", "Rolle der Beratung überschreiten", "Datenschutz unterschätzen", "Belastungssignale ignorieren"],
    deadlines: ["Frist aus Schreiben zuerst markieren", "Wiedervorlage setzen", "Notfalltermine priorisieren", "Rechtsbehelfsfristen nicht verstreichen lassen"],
    documents: ["Vollmacht/Einwilligung, falls nötig", "Behördenschreiben", "Aufenthaltsdokumente", "Bescheide", "Fristenliste", "Unterlagenmappe"],
    criteria: ["Dringlichkeit", "Zuständigkeit", "Risiko", "Verständlichkeit", "Selbstständigkeit", "Weiterverweis"],
    refusalReasons: ["Beratung kann keine verbindliche Behördenentscheidung ersetzen", "ohne Dokumente ist nur allgemeine Orientierung möglich", "bei Rechtsvertretung ist Fachanwalt/Fachstelle nötig"],
    remedies: ["Anliegen schriftlich klären", "Fachstelle einbeziehen", "Frist sichern", "Person befähigen, selbst handlungsfähig zu bleiben"],
    authorityExample: "Eine Sachbearbeiterin erklärt eine Nachforderung in drei Punkten: Was fehlt, warum es benötigt wird, bis wann es einzureichen ist.",
    counsellingExample: "Die Beratung nutzt eine Ein-Seiten-Übersicht: Heute erledigen, diese Woche erledigen, später erledigen.",
    expertTips: ["Eine gute Beratung endet mit einem klaren nächsten Schritt.", "Einfache Sprache ist keine Vereinfachung der Wahrheit.", "Nicht jedes Problem ist dein Auftrag."],
    summary: "Professionelle Beratung verbindet Empathie, Struktur, Datenschutz und klare Grenzen.",
    controlQuestions: ["Was gehört in ein Clearing?", "Warum ist einfache Sprache fachlich anspruchsvoll?", "Wann muss weiterverwiesen werden?"],
    reflectionQuestions: ["Wie reagierst du auf Angst oder Wut im Gespräch?", "Wie schützt du dich vor Überverantwortung?"],
    quiz: [{ question: "Ist gute Beratung immer stellvertretendes Handeln?", answer: "Nein.", why: "Ziel ist Hilfe zur Selbsthilfe, soweit die Lage es erlaubt." }],
    flashcards: [{ front: "Clearing", back: "Anliegen, Fristen, Zuständigkeit und Risiken sortieren." }, { front: "Professionelle Distanz", back: "Empathisch bleiben, ohne Rollen und Grenzen zu verlieren." }],
  },
];

const extraAreas = [
  ["studium-ausbildung", "Studium, Ausbildung und Zweckwechsel", "Erwerbsmigration", "Fortgeschritten", "Bildungswege rechtlich und praktisch planen."],
  ["humanitaere-titel", "Humanitäre Aufenthaltstitel §§ 22–25 AufenthG", "Aufenthaltsrecht", "Experte", "Schutzentscheidung und Aufenthaltstitel sauber verbinden."],
  ["niederlassung-daueraufenthalt", "Niederlassungserlaubnis und Daueraufenthalt-EU", "Aufenthaltsverfestigung", "Fortgeschritten", "Unbefristete Perspektiven mit Voraussetzungen und Ausnahmen prüfen."],
  ["wohnraum-lebensunterhalt", "Lebensunterhalt, Wohnraum und Krankenversicherung", "Querschnitt", "Sachbearbeitung", "Die häufigsten Regelerteilungsvoraussetzungen sicher prüfen."],
  ["identitaet-passpflicht", "Identität, Passpflicht und Mitwirkung", "Querschnitt", "Sachbearbeitung", "Sachverhalt aufklären, ohne pauschal zu bewerten."],
  ["bescheid-anhoerung", "Anhörung, Bescheid und Begründung", "Behördenkommunikation", "Sachbearbeitung", "Verwaltungsentscheidungen nachvollziehbar vorbereiten."],
  ["dublin-verfahren", "Dublin, Zuständigkeit und europäische Verfahren", "Asyl und Schutz", "Experte", "Zuständigkeit, Fristen und Rechtsfolgen verstehen."],
  ["jobcenter-fallmanagement", "Case Management im Jobcenter", "Jobcenter / SGB II", "Beratung", "Kooperationsplan, Potenzialanalyse und Förderentscheidung verbinden."],
  ["krisen-und-verweisberatung", "Krise, Trauma und Verweisberatung", "Beratung", "Beratung", "Belastung erkennen und fachlich sicher weiterleiten."],
  ["pruefungstraining", "Prüfungstraining: Subsumtion und Gutachtenstil", "Prüfung", "Prüfung", "Fälle strukturiert, begründet und punktesicher lösen."],
] as const;

export const extendedAcademyModules: AcademyModule[] = [
  ...academyModules,
  ...extraAreas.map(([id, title, area, level, short], index): AcademyModule => ({
    id,
    title,
    area,
    level: level as AcademyAudience,
    duration: index % 2 === 0 ? "80 Min." : "95 Min.",
    short,
    learningGoal: `Du kannst ${title.toLowerCase()} in einem echten Verwaltungs- oder Beratungsfall strukturiert prüfen, erklären und dokumentieren.`,
    legalBasis: area.includes("Jobcenter") ? ["SGB II", "SGB III", "SGB X"] : area.includes("Asyl") ? ["AsylG", "AufenthG", "EU-Recht"] : ["AufenthG", "VwVfG", "einschlägige Spezialnormen"],
    introduction: `${title} ist ein Vertiefungsmodul der Akademie. Es trainiert nicht nur Begriffe, sondern Entscheidungssicherheit: Welche Tatsache ist wichtig, welche Norm ist einschlägig, welche Nachweise fehlen und wie wird das Ergebnis verständlich kommuniziert?`,
    purpose: "Die Regelungen sollen rechtssichere, nachvollziehbare und verhältnismäßige Entscheidungen ermöglichen.",
    system: "Beginne mit Zuständigkeit und Sachverhalt. Danach folgen Normauswahl, Tatbestandsmerkmale, Nachweise, Rechtsfolge, Ermessen und Kommunikation.",
    keyTerms: [
      { term: "Tatbestandsmerkmal", simple: "Ein Punkt, der erfüllt sein muss.", expert: "Gesetzliche Voraussetzung, die anhand konkreter Tatsachen subsumiert wird.", example: "Lebensunterhalt gesichert oder nicht?" },
      { term: "Subsumtion", simple: "Fakten unter die Norm einordnen.", expert: "Begründete Zuordnung des Sachverhalts zu den gesetzlichen Voraussetzungen.", example: "Das Einkommen deckt den Bedarf nicht, deshalb ist die Voraussetzung offen." },
      { term: "Wiedervorlage", simple: "Später wieder prüfen.", expert: "Organisierter Kontrollzeitpunkt für Fristen, Nachweise oder Folgeentscheidungen.", example: "Nachforderung mit Frist und Wiedervorlage in zwei Wochen." },
    ],
    requirements: ["Zuständigkeit klären", "Sachverhalt vollständig erfassen", "Norm bestimmen", "Nachweise prüfen", "Ausnahmen erkennen", "Rechtsfolge formulieren"],
    discretion: ["Ermessen nur dort, wo das Gesetz es zulässt.", "Erwägungen müssen dokumentiert werden.", "Gleichbehandlung und Verhältnismäßigkeit sind mitzudenken."],
    practiceProblems: ["unvollständige Akten", "Zeitdruck", "Sprachbarrieren", "widersprüchliche Unterlagen", "mehrere Behörden beteiligt"],
    applicantErrors: ["Fristen versäumen", "Unterlagen unvollständig vorlegen", "Änderungen nicht mitteilen", "mündliche Auskunft als Bescheid verstehen"],
    staffErrors: baseStaffErrors,
    deadlines: ["Antragsfrist", "Nachreichfrist", "Rechtsbehelfsfrist", "Wiedervorlage", "Ablaufdatum des Dokuments"],
    documents: ["Antrag", "Identitätsdokument", "Statusdokument", "Nachweise zum Zweck", "Einkommen/Wohnraum/Versicherung", "behördliche Schreiben"],
    criteria: ["vollständige Tatsachen", "passende Rechtsgrundlage", "Nachweise ausreichend", "Risiken geklärt", "Ergebnis verständlich"],
    refusalReasons: generalRefusal,
    remedies: generalRemedies,
    authorityExample: "Der Vorgang wird mit einem Prüfvermerk abgeschlossen: Sachverhalt, Rechtsgrundlage, offene Punkte, Entscheidung und nächste Schritte.",
    counsellingExample: "Die Beratung erstellt eine Aufgabenliste in einfacher Sprache und markiert, welche Stelle verbindlich entscheidet.",
    expertTips: ["Wenn du die Norm nicht nennen kannst, ist die Antwort noch nicht reif.", "Dokumentation schützt die Person und die Behörde.", "Komplexe Fälle brauchen Reihenfolge, nicht Geschwindigkeit."],
    summary: `${title} verlangt sichere Struktur: Sachverhalt, Norm, Nachweis, Entscheidung, Kommunikation.`,
    controlQuestions: ["Welche Norm ist einschlägig?", "Welche Tatsachen fehlen?", "Welche Stelle ist zuständig?"],
    reflectionQuestions: ["Wo besteht Risiko für falsche Sicherheit?", "Wie lässt sich der nächste Schritt einfach erklären?"],
    quiz: [{ question: "Was kommt zuerst: Ergebnis oder Rechtsgrundlage?", answer: "Rechtsgrundlage.", why: "Ohne Norm ist die Entscheidung nicht nachvollziehbar." }],
    flashcards: [{ front: title, back: short }, { front: "Aktenlogik", back: "Tatsachen → Norm → Nachweise → Rechtsfolge → Kommunikation." }],
  })),
];

export const learningPaths: LearningPath[] = [
  {
    id: "beginner",
    title: "Anfängerpfad",
    subtitle: "Vom Nullpunkt zur sicheren Grundstruktur",
    audience: "Anfänger",
    promise: "Du lernst Status, Dokumente, Zuständigkeiten und Grundbegriffe ohne juristische Vorkenntnisse.",
    moduleIds: ["system-aufenthaltsrecht", "visum-einreise", "jobcenter-sgbii", "beratung-menschlich"],
    checkpoint: "Du kannst nach diesem Pfad einen Brief, ein Aufenthaltsdokument und eine einfache Fallfrage strukturiert einordnen.",
  },
  {
    id: "caseworker",
    title: "Sachbearbeiter-Modus",
    subtitle: "Aktenprüfung, Nachforderung, Vermerk, Entscheidung",
    audience: "Sachbearbeitung",
    promise: "Du trainierst den Verwaltungsblick: Zuständigkeit, Nachweise, Fristen, Ermessen und Bescheidlogik.",
    moduleIds: ["system-aufenthaltsrecht", "identitaet-passpflicht", "wohnraum-lebensunterhalt", "bescheid-anhoerung", "duldung-bleiberecht"],
    checkpoint: "Du kannst eine Akte mit Prüfvermerk bearbeiten und typische Fehler vermeiden.",
  },
  {
    id: "advisor",
    title: "Berater-Modus",
    subtitle: "Menschen verstehen, Fälle ordnen, richtig weiterleiten",
    audience: "Beratung",
    promise: "Du lernst einfache Sprache, Clearing, Fristenmatrix, Verweisberatung und Integrationsplanung.",
    moduleIds: ["beratung-menschlich", "integration-sprache", "krisen-und-verweisberatung", "jobcenter-fallmanagement"],
    checkpoint: "Du kannst ein Beratungsgespräch mit konkretem Ergebnis und sauberer Grenze führen.",
  },
  {
    id: "expert",
    title: "Expertenmodus",
    subtitle: "Schutz, Erwerbsmigration, Familiennachzug und Verfestigung",
    audience: "Experte",
    promise: "Du vergleichst Normen, Übergänge, Grenzfälle, Ausschlüsse und Rechtsfolgen auf hohem Niveau.",
    moduleIds: ["asyl-geas-schutz", "fachkraefte-arbeit", "familiennachzug-tief", "humanitaere-titel", "niederlassung-daueraufenthalt"],
    checkpoint: "Du kannst komplexe Fälle mit mehreren Behörden und mehreren Rechtsgebieten priorisieren.",
  },
  {
    id: "exam",
    title: "Prüfungsvorbereitung",
    subtitle: "Punktesicher analysieren und begründen",
    audience: "Prüfung",
    promise: "Du trainierst Prüfungsschemata, Gutachtenlogik, typische Fallen und Musterlösungen.",
    moduleIds: ["pruefungstraining", "system-aufenthaltsrecht", "asyl-geas-schutz", "jobcenter-sgbii", "beratung-menschlich"],
    checkpoint: "Du kannst eine 100-Punkte-Falllösung mit Begründung, Fehleranalyse und Lernhinweis schreiben.",
  },
];

export const expertSchemes: ExpertScheme[] = [
  {
    id: "schema-aufenthaltstitel",
    title: "Aufenthaltstitel-Erteilung",
    area: "Aufenthaltsrecht",
    useWhen: "Wenn eine Person einen neuen oder verlängerten Aufenthaltstitel möchte.",
    steps: [
      { title: "Zuständigkeit", questions: ["Inland oder Auslandsvertretung?", "Welche Behörde entscheidet verbindlich?"], evidence: ["Antrag", "Aufenthaltsort", "Aktenzeichen"], warning: "Falsche Zuständigkeit erzeugt falsche Fristen." },
      { title: "Status und Zweck", questions: ["Welches Dokument liegt vor?", "Welcher Zweck wird beantragt?"], evidence: ["Titel", "Zusatzblatt", "Antragsformular"], warning: "Status und Wunschzweck nicht vermischen." },
      { title: "Allgemeine Voraussetzungen", questions: ["Identität?", "Pass?", "Lebensunterhalt?", "Visumverfahren?", "Ausweisungsinteresse?"], evidence: ["Pass", "Einkommen", "Versicherung", "Einreiseweg"], warning: "Ausnahmen müssen benannt werden." },
      { title: "Spezialnorm", questions: ["Welche Norm passt?", "Anspruch, Soll oder Ermessen?"], evidence: ["Arbeitsvertrag", "Urkunden", "BAMF-Bescheid"], warning: "Ohne Spezialnorm keine belastbare Entscheidung." },
      { title: "Rechtsfolge und Kommunikation", questions: ["Erteilen, nachfordern, ablehnen?", "Wie wird es verständlich begründet?"], evidence: ["Prüfvermerk", "Nachforderung", "Bescheid"], warning: "Mündliche Kurzantwort ersetzt keinen dokumentierten Vorgang." },
    ],
    decisionNote: "Eine professionelle Entscheidung enthält Sachverhalt, Rechtsgrundlage, Subsumtion, offene Punkte, Rechtsfolge und nächsten Schritt.",
  },
  {
    id: "schema-schutz",
    title: "Schutzformen trennen",
    area: "Asyl",
    useWhen: "Wenn ein Asyl- oder Schutzsachverhalt analysiert wird.",
    steps: [
      { title: "Verfolgung", questions: ["Welche Handlung?", "Welche Intensität?", "Welcher Akteur?"], evidence: ["Anhörung", "Dokumente", "Herkunftslandlage"], warning: "Allgemeine Unsicherheit genügt nicht automatisch." },
      { title: "Verfolgungsgrund", questions: ["Politik, Religion, Nationalität, soziale Gruppe?", "Verknüpfung erkennbar?"], evidence: ["Vortrag", "Nachweise", "COI"], warning: "Grund und Handlung müssen zusammenhängen." },
      { title: "Ernsthafter Schaden", questions: ["Droht Folter, unmenschliche Behandlung oder konfliktbedingte Gefahr?"], evidence: ["Lageberichte", "medizinische Unterlagen"], warning: "Subsidiärer Schutz ist eigenständig." },
      { title: "Nationale Rückkehrgefahr", questions: ["Individuelle erhebliche Gefahr?", "Gesundheit?", "Existenzminimum?"], evidence: ["Arztberichte", "Landeslage"], warning: "Abschiebungsverbot nicht als Restkategorie ohne Prüfung verwenden." },
      { title: "Schutzalternativen", questions: ["Staatlicher Schutz?", "Interner Schutz?", "Ausschlussgründe?"], evidence: ["Behördenlage", "Familiennetz", "Region"], warning: "Zumutbarkeit ist kein Bauchgefühl." },
    ],
    decisionNote: "Gute Analyse trennt Flüchtlingsschutz, subsidiären Schutz und nationales Abschiebungsverbot, bevor sie eine Empfehlung formuliert.",
  },
  {
    id: "schema-jobcenter",
    title: "Bürgergeld-Grundprüfung",
    area: "Jobcenter",
    useWhen: "Wenn Leistungsanspruch oder Zuständigkeit unklar ist.",
    steps: [
      { title: "Persönliche Voraussetzungen", questions: ["Alter?", "Erwerbsfähigkeit?", "gewöhnlicher Aufenthalt?"], evidence: ["Ausweis", "Aufenthaltsdokument", "Meldebescheinigung"], warning: "Aufenthalt und Leistung nicht automatisch gleichsetzen." },
      { title: "Status und Ausschlüsse", questions: ["Welcher Aufenthaltstitel?", "AsylbLG statt SGB II?", "EU-Sonderfragen?"], evidence: ["Titel", "Gestattung/Duldung", "Freizügigkeitsgrund"], warning: "Zuständigkeit ist oft der Kernfehler." },
      { title: "Bedarf", questions: ["Wer gehört zur Bedarfsgemeinschaft?", "Welche Unterkunftskosten?", "Mehrbedarf?"], evidence: ["Mietvertrag", "Familienstand", "Kinder"], warning: "Haushalt ist nicht automatisch Bedarfsgemeinschaft." },
      { title: "Mittel", questions: ["Einkommen?", "Vermögen?", "Zufluss?"], evidence: ["Kontoauszüge", "Lohnabrechnungen", "Bescheide"], warning: "Nicht jeder Zufluss wird gleich behandelt." },
      { title: "Bescheidlogik", questions: ["Bewilligen, vorläufig entscheiden, nachfordern oder ablehnen?"], evidence: ["Berechnung", "Mitwirkungsschreiben"], warning: "Mitwirkung braucht klare und zumutbare Anforderung." },
    ],
    decisionNote: "SGB-II-Fälle werden sicher, wenn Bedarf, Status, Einkommen und Zuständigkeit getrennt geprüft werden.",
  },
  {
    id: "schema-beratung",
    title: "Beratungsgespräch strukturieren",
    area: "Beratung",
    useWhen: "Bei Erstberatung, Mehrfachproblemen oder unklaren Behördenbriefen.",
    steps: [
      { title: "Anliegen und Krise", questions: ["Was ist heute das wichtigste Problem?", "Gibt es akute Gefahr?"], evidence: ["Schilderung", "Briefe", "Gesundheits-/Wohnlage"], warning: "Bei Krise nicht erst die perfekte Akte bauen." },
      { title: "Fristenmatrix", questions: ["Welche Frist läuft?", "Was passiert bei Fristversäumnis?"], evidence: ["Bescheide", "Umschläge", "E-Mails"], warning: "Frist vor Vollständigkeit." },
      { title: "Zuständigkeit", questions: ["Welche Stelle entscheidet?", "Was kann Beratung leisten?"], evidence: ["Aktenzeichen", "Behörde", "Vollmacht"], warning: "Keine verbindliche Entscheidung versprechen." },
      { title: "Nächster Schritt", questions: ["Was macht die Person selbst?", "Was macht die Beratung?", "Bis wann?"], evidence: ["Aufgabenliste", "Wiedervorlage"], warning: "Ohne nächsten Schritt bleibt Beratung Gefühl, nicht Hilfe." },
    ],
    decisionNote: "Gute Beratung endet mit Klarheit: Frist, Aufgabe, Zuständigkeit, Dokument und Wiedervorlage.",
  },
];

export const decisionTrees: DecisionTree[] = [
  {
    id: "tree-aufenthaltstitel",
    title: "Welcher Aufenthaltstitel kommt infrage?",
    area: "Aufenthaltsrecht",
    startQuestion: "Geht es um Arbeit, Ausbildung, Familie, Schutz, Studium, Suche oder Verfestigung?",
    nodes: [
      { question: "Liegt ein konkreter Aufenthaltszweck mit Nachweisen vor?", yes: "Spezialnorm zum Zweck prüfen.", no: "Zweckklärung und Dokumentenliste erstellen.", unsure: "Beratung: Ziel, Dokumente und Zeitleiste klären." },
      { question: "Ist die Person bereits in Deutschland?", yes: "Zweckwechsel, Fiktionswirkung und Inlandszuständigkeit prüfen.", no: "Nationales Visum D und Auslandsvertretung prüfen.", unsure: "Einreiseweg dokumentieren." },
      { question: "Sind allgemeine Voraussetzungen problematisch?", yes: "Ausnahmen/Absehen/Sperren prüfen.", no: "Spezialvoraussetzungen vertiefen.", unsure: "Nachforderung zu Pass, LU, Versicherung, Status." },
      { question: "Eröffnet die Norm Anspruch oder Ermessen?", yes: "Gebundene Entscheidung oder Soll-Regelung dokumentieren.", no: "Ermessenserwägungen vollständig notieren.", unsure: "Normtext und Verwaltungspraxis prüfen." },
    ],
    result: "Ergebnis ist kein Titelname allein, sondern ein Prüfpfad mit Norm, Nachweisen, offenen Punkten und nächstem Schritt.",
    redFlags: ["Einreise mit falschem Visum", "ungeklärte Identität", "Ablaufdatum in wenigen Tagen", "Sperre oder Ausweisungsinteresse"],
  },
  {
    id: "tree-familie",
    title: "Ist Familiennachzug möglich?",
    area: "Familie",
    startQuestion: "Zu welcher Referenzperson in Deutschland soll der Nachzug erfolgen?",
    nodes: [
      { question: "Status der Referenzperson bekannt?", yes: "Passende Nachzugsnorm wählen.", no: "BAMF-Bescheid/Titel anfordern.", unsure: "Rechtsgrundlage auf dem Titel prüfen." },
      { question: "Gehört die Person zur Kernfamilie?", yes: "Ehegatten-/Kindernachzug vertiefen.", no: "Härtefall oder Sondernorm prüfen.", unsure: "Familienverhältnis und Alter klären." },
      { question: "Gibt es Fristen oder Minderjährigkeit?", yes: "Stichtage sofort dokumentieren.", no: "Regelvoraussetzungen prüfen.", unsure: "Zustellung, Anerkennung und Geburtsdaten sichern." },
      { question: "Urkunden und Identität ausreichend?", yes: "Visumverfahren vorbereiten.", no: "Urkundenprüfung/Alternativnachweise prüfen.", unsure: "Dokumentenmatrix erstellen." },
    ],
    result: "Familiennachzug wird über Status + Beziehung + Zeitpunkt + Nachweise entschieden.",
    redFlags: ["Kind wird bald volljährig", "Frist nach Schutzanerkennung unklar", "Urkunden nicht beschaffbar", "subsidiärer Schutz ohne Sonderprüfung"],
  },
  {
    id: "tree-schutzform",
    title: "Welche Schutzform kommt infrage?",
    area: "Asyl",
    startQuestion: "Droht Verfolgung, ernsthafter Schaden oder eine konkrete Rückkehrgefahr?",
    nodes: [
      { question: "Gibt es gezielte Verfolgung?", yes: "Flüchtlingsschutz prüfen.", no: "Subsidiären Schutz/Rückkehrgefahr prüfen.", unsure: "Anhörungsbericht strukturieren." },
      { question: "Ist ein geschützter Verfolgungsgrund erkennbar?", yes: "Kausalität und Schutzalternativen prüfen.", no: "Flüchtlingsschutz eher problematisch; andere Schutzformen prüfen.", unsure: "Motiv und Kontext vertiefen." },
      { question: "Droht ernsthafter Schaden?", yes: "Subsidiären Schutz vertiefen.", no: "Nationales Abschiebungsverbot prüfen.", unsure: "Herkunftslandlage aktualisieren." },
      { question: "Gibt es wirksamen staatlichen oder internen Schutz?", yes: "Schutzanspruch kann entfallen.", no: "Statusprüfung vertiefen.", unsure: "Erreichbarkeit, Zumutbarkeit und Schutzfähigkeit prüfen." },
    ],
    result: "Schutzformen werden nacheinander und getrennt geprüft, nicht als allgemeines Mitleidsurteil.",
    redFlags: ["Bescheid zugestellt", "kurze Klagefrist", "Dublin-Hinweis", "akute Abschiebungsgefahr", "besondere Vulnerabilität"],
  },
  {
    id: "tree-jobcenter-sozialamt",
    title: "Jobcenter oder Sozialamt / AsylbLG?",
    area: "Leistungen",
    startQuestion: "Welcher Aufenthaltsstatus und welche Erwerbsfähigkeit liegen vor?",
    nodes: [
      { question: "Aufenthaltsgestattung oder bestimmte Duldungskonstellation?", yes: "AsylbLG/Leistungsbehörde prüfen.", no: "SGB-II-Zugang weiter prüfen.", unsure: "Dokument und Rechtsgrundlage anfordern." },
      { question: "Erwerbsfähigkeit grundsätzlich gegeben?", yes: "Jobcenter kann zuständig sein.", no: "SGB XII/Sozialamt prüfen.", unsure: "Gesundheitliche Leistungsfähigkeit klären." },
      { question: "EU-Freizügigkeit mit Arbeitnehmerstatus?", yes: "SGB-II-Voraussetzungen vertiefen.", no: "Leistungsausschlüsse prüfen.", unsure: "Beschäftigungsverlauf klären." },
      { question: "Hilfebedürftigkeit nachgewiesen?", yes: "Bedarf/Einkommen berechnen.", no: "Ablehnung oder Teilanspruch prüfen.", unsure: "Konto, Lohn, Miete nachfordern." },
    ],
    result: "Zuständigkeit entsteht aus Status, Erwerbsfähigkeit, Aufenthaltsgrund und Hilfebedürftigkeit.",
    redFlags: ["kein Antrag gestellt", "Wohnungsverlust", "fehlende Krankenversicherung", "Minderjährige im Haushalt", "Frist im Mitwirkungsschreiben"],
  },
  {
    id: "tree-arbeitserlaubnis",
    title: "Ist Erwerbstätigkeit erlaubt?",
    area: "Arbeit",
    startQuestion: "Was steht auf dem Titel, der Duldung, Gestattung oder dem Zusatzblatt?",
    nodes: [
      { question: "Steht Erwerbstätigkeit ausdrücklich erlaubt?", yes: "Umfang und Arbeitgeberbindung prüfen.", no: "Erlaubnis- oder Verbotslage klären.", unsure: "Vorder-/Rückseite/Zusatzblatt anfordern." },
      { question: "Geht es um Beschäftigung oder Selbstständigkeit?", yes: "Jeweilige Form getrennt prüfen.", no: "Tätigkeit genauer beschreiben lassen.", unsure: "Arbeitsvertrag/Stellenbeschreibung anfordern." },
      { question: "Ist BA-Zustimmung erforderlich?", yes: "Beschäftigungsdaten weiterleiten.", no: "Dokumentierte Ausnahme festhalten.", unsure: "Norm und BeschV prüfen." },
      { question: "Gibt es Sperren oder Auflagen?", yes: "Vor Arbeitsbeginn klären.", no: "Beginn nach Dokumentenlage möglich.", unsure: "Ausländerbehörde schriftlich anfragen." },
    ],
    result: "Arbeitserlaubnis ist Dokumenten- und Normprüfung, keine Vermutung.",
    redFlags: ["Arbeitsbeginn morgen", "Duldung ohne Nebenbestimmung", "Arbeitgeberwechsel", "Selbstständigkeit bei nur Beschäftigungserlaubnis"],
  },
];

export const premiumDossiers: PremiumDossier[] = [
  {
    id: "dossier-1",
    title: "Verlängerung kurz vor Ablauf mit Jobwechsel",
    category: "Ausländerbehörde",
    difficulty: "schwer",
    overview: "Eine Person beantragt sehr spät die Verlängerung, hat gerade den Arbeitgeber gewechselt und kann nur teilweise Nachweise vorlegen.",
    person: { name: "Nour A.", country: "Syrien", entry: "2018", status: "Aufenthaltserlaubnis", family: "verheiratet, ein Kind", work: "neuer Arbeitsvertrag ab nächsten Monat", income: "bisher schwankend", housing: "Mietwohnung" },
    facts: "Der Titel läuft in sechs Tagen ab. Der alte Arbeitgeber hat gekündigt, der neue Vertrag ist unterschrieben, aber erste Lohnabrechnungen fehlen. Die Person bittet um schnelle Bestätigung für den Arbeitgeber.",
    documents: ["Aufenthaltstitel", "neuer Arbeitsvertrag", "Kündigung alter Arbeitgeber", "Mietvertrag", "Krankenversicherungsnachweis", "Passkopie"],
    tasks: ["Rechtsgrundlage und Fristwirkung prüfen", "fehlende Unterlagen bestimmen", "Arbeitserlaubnis/Nebenbestimmung einordnen", "Aktennotiz formulieren", "Zwischennachricht an Person entwerfen"],
    modelSolution: ["Zuerst ist die rechtzeitige Antragstellung vor Ablauf zu sichern.", "Die Fiktionswirkung und bisherige Nebenbestimmung sind anhand der Dokumente zu prüfen.", "Lebensunterhalt kann wegen Jobwechsel offen sein; Nachforderung statt vorschneller Ablehnung.", "Der Arbeitgeber darf keine pauschale Zusage erhalten; möglich ist eine sachliche Bestätigung über Antragseingang und Prüfstand."],
    typicalErrors: ["nur wegen fehlender Lohnabrechnung sofort ablehnen", "Arbeitsbeginn zusagen, ohne Nebenbestimmung zu prüfen", "Ablaufdatum übersehen", "mündliche Arbeitgeberauskunft ohne Aktenvermerk"],
    score: [
      { label: "Frist/Fiktion", points: 20, expectation: "Ablaufdatum, Antragseingang und Fiktionswirkung erkennen." },
      { label: "Norm und Status", points: 20, expectation: "Titelgrundlage und Nebenbestimmung auswerten." },
      { label: "Unterlagen", points: 20, expectation: "konkrete Nachweise nachfordern." },
      { label: "Ermessen/Abwägung", points: 20, expectation: "keine vorschnelle Negativentscheidung bei aufklärbarem Sachverhalt." },
      { label: "Kommunikation", points: 20, expectation: "sachlich, begrenzt und ohne Garantie formulieren." },
    ],
    learningHint: "Kurzfristigkeit erhöht Priorität, ersetzt aber nicht Prüfung. Sicher zuerst die Frist, dann die Nachweise.",
    terms: ["Fiktionswirkung", "Nebenbestimmung", "Lebensunterhalt", "Nachforderung", "Zwischennachricht"],
  },
  {
    id: "dossier-2",
    title: "Familiennachzug mit unvollständigen Urkunden",
    category: "Visum/Familie",
    difficulty: "schwer",
    overview: "Die Referenzperson hat Schutzstatus, die Familie ist im Ausland, Urkunden sind widersprüchlich und eine Frist könnte laufen.",
    person: { name: "Familie K.", country: "Afghanistan", entry: "Referenzperson 2024", status: "Aufenthaltserlaubnis nach Schutzentscheidung", family: "Ehefrau und zwei Kinder im Ausland", work: "Teilzeit", income: "ergänzende Leistungen", housing: "2-Zimmer-Wohnung" },
    facts: "Die Ehe bestand nach Angaben der Referenzperson bereits vor der Flucht. Für ein Kind liegt nur eine alte Schulbescheinigung vor. Die Auslandsvertretung verlangt weitere Unterlagen.",
    documents: ["Aufenthaltstitel", "BAMF-Bescheid", "Heiratsurkunde", "Geburtsurkunde eines Kindes", "E-Mail der Auslandsvertretung"],
    tasks: ["Status der Referenzperson bestimmen", "Fristlage prüfen", "Urkundenmatrix erstellen", "LU/Wohnraum-Ausnahmen prüfen", "Verweis an passende Fachstelle beurteilen"],
    modelSolution: ["Status und genaue Rechtsgrundlage der Referenzperson sind zuerst entscheidend.", "Fristen nach Anerkennung und Termin-/Antragsnachweise müssen gesichert werden.", "Urkundenprobleme sind als Beweisfrage zu behandeln; Alternativnachweise und Zumutbarkeit prüfen.", "Bei komplexem Nachzug ist spezialisierte Beratung sinnvoll."],
    typicalErrors: ["A1/Lebensunterhalt pauschal verlangen", "subsidiären Schutz und Flüchtlingsschutz gleichbehandeln", "Urkundenproblem als automatische Ablehnung verstehen", "Frist nicht sichern"],
    score: [
      { label: "Referenzperson", points: 20, expectation: "Titelgrundlage/BAMF-Bescheid auswerten." },
      { label: "Frist", points: 20, expectation: "Stichtage und Nachweise sichern." },
      { label: "Urkunden", points: 20, expectation: "Dokumentenmatrix und Alternativen benennen." },
      { label: "Voraussetzungen", points: 20, expectation: "Sprache, LU, Wohnraum nur statusbezogen prüfen." },
      { label: "Beratung", points: 20, expectation: "Grenzen und Weiterverweisung erkennen." },
    ],
    learningHint: "Beim Familiennachzug entscheidet der Status der Referenzperson über die gesamte weitere Prüfung.",
    terms: ["Referenzperson", "Kernfamilie", "privilegierter Nachzug", "Urkundenprüfung", "Fristenmatrix"],
  },
  {
    id: "dossier-3",
    title: "Jobcenter: Einkommen, Umzug und Sprachkurs",
    category: "Jobcenter / Integration",
    difficulty: "mittel",
    overview: "Eine alleinerziehende Person hat Minijob, möchte umziehen und soll einen Sprachkurs beginnen.",
    person: { name: "Mina S.", country: "Iran", entry: "2021", status: "Aufenthaltserlaubnis", family: "alleinerziehend", work: "Minijob", income: "Lohn + Bürgergeld", housing: "zu kleine Wohnung" },
    facts: "Ein neues Wohnungsangebot ist teurer. Der Lohn wurde zuletzt verspätet gemeldet. Gleichzeitig liegt eine Einladung zum Berufssprachkurs vor.",
    documents: ["Bewilligungsbescheid", "Lohnabrechnung", "Wohnungsangebot", "Kurseinladung", "Kontoauszüge"],
    tasks: ["Zufluss und Freibeträge einordnen", "Umzug/Zusicherung prüfen", "Sprachkurs in Kooperationsplan einordnen", "fehlende Nachweise benennen"],
    modelSolution: ["Lohn ist nach Zufluss und aktuellen Freibeträgen zu prüfen.", "Vor Umzug ist Zusicherung/Angemessenheit zu klären.", "Sprachkurs kann integrationslogisch sinnvoll sein; Kinderbetreuung und Zeiten prüfen.", "Mitwirkung soll konkret und verständlich verlangt werden."],
    typicalErrors: ["gesamten Lohn abziehen", "Mietvertrag vor Zusicherung unterschreiben lassen", "Sprachkurs ohne Kinderbetreuung planen", "Unterlagen pauschal verlangen"],
    score: [
      { label: "Leistungslogik", points: 25, expectation: "Bedarf, Einkommen, Zufluss trennen." },
      { label: "Unterkunft", points: 20, expectation: "Angemessenheit und Zusicherung erkennen." },
      { label: "Integration", points: 20, expectation: "Kurs realistisch planen." },
      { label: "Mitwirkung", points: 15, expectation: "konkrete Nachweise nennen." },
      { label: "Kommunikation", points: 20, expectation: "einfach und handlungsorientiert erklären." },
    ],
    learningHint: "Jobcenter-Fälle sind selten nur Rechnen: Unterkunft, Sprache, Familie und Arbeit greifen ineinander.",
    terms: ["Zuflussprinzip", "Freibetrag", "Kosten der Unterkunft", "Kooperationsplan", "Kinderbetreuung"],
  },
  {
    id: "dossier-4",
    title: "Schutzfall mit psychischer Belastung und Anhörung",
    category: "Asyl / Beratung",
    difficulty: "schwer",
    overview: "Eine Person muss zur BAMF-Anhörung, ist stark belastet und hat widersprüchliche Dokumente.",
    person: { name: "Samuel T.", country: "Eritrea", entry: "2026", status: "Aufenthaltsgestattung", family: "ledig", work: "keine Beschäftigung", income: "Leistungen nach AsylbLG", housing: "Gemeinschaftsunterkunft" },
    facts: "Samuel berichtet von Haft und Flucht, wirkt aber im Gespräch sprunghaft. Er hat einen ärztlichen Termin und Angst vor der Anhörung.",
    documents: ["Aufenthaltsgestattung", "BAMF-Ladung", "ärztliche Terminbestätigung", "Kopien alter Dokumente"],
    tasks: ["Anhörungsvorbereitung strukturieren", "Schutzformen grob trennen", "besondere Bedürfnisse erkennen", "Weiterleitung an Fachberatung prüfen", "Fristen sichern"],
    modelSolution: ["Zuerst Anhörungstermin, Sprache und besondere Bedürfnisse klären.", "Vortrag chronologisch vorbereiten, ohne Geschichte zu erfinden.", "Psychische Belastung kann fachliche Unterstützung erforderlich machen.", "Schutzformen werden nicht abschließend in allgemeiner Beratung entschieden."],
    typicalErrors: ["Geschichte vorformulieren", "Trauma als Unglaubwürdigkeit behandeln", "Dolmetschsprache nicht prüfen", "Klage-/Bescheidfristen ignorieren"],
    score: [
      { label: "Sicherheit/Vulnerabilität", points: 20, expectation: "Belastung und Fachstellen erkennen." },
      { label: "Anhörung", points: 25, expectation: "Chronologie, Sprache, Dokumente vorbereiten." },
      { label: "Schutzlogik", points: 20, expectation: "Schutzformen getrennt benennen." },
      { label: "Grenzen", points: 15, expectation: "keine unerlaubte Rechtsvertretung." },
      { label: "Fristen", points: 20, expectation: "Termine und spätere Bescheide priorisieren." },
    ],
    learningHint: "Im Asylverfahren ist eine gute Anhörungsvorbereitung oft wichtiger als viele unsortierte Dokumente.",
    terms: ["Anhörung", "Vulnerabilität", "Flüchtlingsschutz", "subsidiärer Schutz", "Verweisberatung"],
  },
];
