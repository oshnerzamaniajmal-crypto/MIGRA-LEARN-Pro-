export type Category = "Ausländerrecht" | "Jobcenter / SGB II" | "Integration" | "Beratung" | "Behördenkommunikation";
export type Difficulty = "leicht" | "mittel" | "schwer";
export type LegalArea = "Grundlagen" | "Visum" | "Erwerbsmigration" | "Familie" | "Schutz" | "Duldung & Bleiberecht";
export type SourceTrust = "A" | "B" | "C" | "D";

export interface LegalSource {
  id: string;
  title: string;
  publisher: string;
  type: "Gesetz" | "EU-Recht" | "Behörde" | "Fachportal" | "Lernunterlage";
  trust: SourceTrust;
  date: string;
  checkedAt: string;
  url?: string;
  fileName?: string;
  pages?: string;
  areas: LegalArea[];
  note: string;
  outdated?: boolean;
}

export interface LegalTopic {
  id: string;
  title: string;
  subtitle: string;
  area: LegalArea;
  legalBasis: string[];
  lawSummary: string;
  simpleExplanation: string;
  purpose: string;
  systematics: string;
  keyTerms: { term: string; explanation: string }[];
  requirements: string[];
  legalConsequence: string;
  decisionType: string;
  exclusions: string[];
  documents: string[];
  authorities: string[];
  deadlines: string[];
  practice: string[];
  typicalErrors: string[];
  memoryAids: string[];
  scheme: string[];
  examples: {
    positive: string;
    negative: string;
    borderline: string;
  };
  sourceIds: string[];
  legalStatus: string;
  warning?: string;
}

export interface DayTask {
  id: string;
  day: number;
  title: string;
  duration: number;
  type: "Lesen" | "Fall" | "Karteikarten" | "Schreiben" | "Quiz" | "Prüfung";
}

export interface WeekModule {
  id: number;
  title: string;
  shortTitle: string;
  goal: string;
  category: Category;
  topics: string[];
  tasks: DayTask[];
  terms: string[];
  reflection: string;
  examTitle: string;
}

export interface CaseFile {
  id: string;
  number: number;
  category: "Ausländerbehörde" | "Jobcenter" | "Integration" | "Migrationsberatung" | "Abschluss";
  difficulty: Difficulty;
  week: number;
  person: {
    name: string;
    age: number;
    country: string;
    family: string;
    language: string;
    status: string;
    authority: string;
    issue: string;
  };
  facts: string;
  documents: string[];
  question: string;
  terms: string[];
  options: {
    status: string[];
    authority: string[];
    benefit: string[];
    work: string[];
  };
  solution: {
    status: string;
    authority: string;
    benefit: string;
    work: string;
    missing: string[];
    nextStep: string;
    note: string;
    email: string;
    reasoning: string;
    mistakes: string[];
    learningTip: string;
  };
}

export interface Flashcard {
  id: string;
  term: string;
  explanation: string;
  example: string;
  question: string;
  category: Category;
  difficulty: Difficulty;
}

export interface QuizQuestion {
  id: string;
  category: Category;
  difficulty: Difficulty;
  type: "Multiple Choice" | "Richtig/Falsch" | "Mini-Fall";
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface TextTemplate {
  id: string;
  category: string;
  title: string;
  situation: string;
  formal: string;
  simple: string;
  tips: string[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  category: Category;
  link?: string;
  updatedAt: string;
}

export interface ProgressState {
  version: number;
  completedTasks: string[];
  completedTopics: string[];
  caseScores: Record<string, number>;
  caseAttempts: {
    caseId: string;
    date: string;
    score: number;
    breakdown: Record<"status" | "authority" | "documents" | "nextStep" | "communication", number>;
  }[];
  quizHistory: { date: string; score: number; total: number; category: string }[];
  learnedCards: string[];
  difficultCards: string[];
  notes: Note[];
  activities: { date: string; text: string; kind: string }[];
  streakDates: string[];
  examScore?: number;
  examAttempts: { date: string; score: number; sections: Record<string, number> }[];
}
