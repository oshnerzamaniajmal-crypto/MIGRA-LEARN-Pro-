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

export interface LegalParagraph {
  id: string;
  law: string;
  paragraph: string;
  title: string;
  area: string;
  sourceId: string;
  legalStatus: string;
  originalNotice: string;
  structure: {
    level: "Absatz" | "Satz" | "Nummer" | "Buchstabe" | "Normkern";
    reference: string;
    text: string;
    emphasis: string[];
  }[];
  shortSummary: string;
  simpleExplanation: string;
  everydayMeaning: string;
  difficultTerms: { term: string; explanation: string; example: string }[];
  purpose: string;
  systemPosition: string;
  requirements: string[];
  legalConsequence: string[];
  discretion: string;
  interpretation: string[];
  relationToOtherNorms: string[];
  commentary: {
    shortCommentary: string;
    disputes: string[];
    authorityPractice: string[];
    counselorPerspective: string[];
    humanMeaning: string;
    hardshipCases: string[];
  };
  examination: {
    steps: string[];
    checklist: string[];
    documents: string[];
    refusalReasons: string[];
    remedies: string[];
  };
  practiceCases: {
    simple: string;
    complex: string;
    authority: string;
    jobcenter: string;
    counseling: string;
  };
  learning: {
    flashcards: { front: string; back: string }[];
    quiz: { question: string; options: string[]; correct: number; explanation: string }[];
    openQuestions: string[];
    cloze: string;
    casePrompt: string;
  };
  linkedParagraphs: string[];
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
    legalBasis: string[];
    decision: string[];
    risk: string[];
    priority: string[];
  };
  solution: {
    status: string;
    authority: string;
    benefit: string;
    work: string;
    legalBasis: string;
    decision: string;
    risk: string;
    priority: string;
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

export type LessonStatus = "not-started" | "started" | "reading" | "quiz-passed" | "completed" | "review-recommended";
export type LessonDifficulty = "Basis" | "Aufbau" | "Praxis" | "Fortgeschritten";
export type ReviewStatus = "aktuell" | "muss-geprüft-werden" | "veraltet" | "quelle-fehlt" | "unvollständig";
export type LessonSourceType = "official" | "legal" | "authority" | "recognized" | "learning";

export interface LessonSourceMeta {
  sourceTitle: string;
  sourceUrl: string;
  sourcePublisher: string;
  sourceType: LessonSourceType;
  sourceDate: string;
  lastCheckedAt: string;
  legalStatusRelevant: boolean;
  needsRegularReview: boolean;
  confidenceLevel: "hoch" | "mittel" | "niedrig";
  contentReviewerNote: string;
}

export interface LearningQuizQuestion {
  id: string;
  type: "Multiple Choice" | "Richtig/Falsch" | "Begriff erklären" | "Praxisfall verstehen" | "Fehler erkennen";
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: LessonDifficulty;
  sourceReference: string;
}

export interface LearningModule {
  id: string;
  moduleOrder: number;
  title: string;
  shortTitle: string;
  description: string;
  learningOutcome: string;
  estimatedMinutes: number;
  color: string;
}

export interface LearningLesson {
  id: string;
  moduleId: string;
  moduleOrder: number;
  lessonOrder: number;
  globalLessonNumber: number;
  title: string;
  slug: string;
  description: string;
  learningObjective: string;
  estimatedMinutes: number;
  difficultyLevel: LessonDifficulty;
  prerequisiteLessonIds: string[];
  previousLessonId?: string;
  nextLessonId?: string;
  recommendedAfter?: string;
  isCoreLesson: boolean;
  isOptionalLesson: boolean;
  isLegalSensitive: boolean;
  requiresSourceReview: boolean;
  whyImportant: string;
  simpleExplanation: string;
  deepExplanation: string;
  everydayExample: string;
  authorityExample: string;
  workStudyExample: string;
  keyTerms: { term: string; simple: string; detailed: string; example: string; related: string[] }[];
  commonMistakes: string[];
  checklist: string[];
  miniSummary: string;
  quiz: LearningQuizQuestion[];
  reflectionQuestion: string;
  sources: LessonSourceMeta[];
  sourceStand: string;
  legalReviewNote: string;
  reviewStatus: ReviewStatus;
  createdAt: string;
  updatedAt: string;
}

export interface GlossaryEntry {
  id: string;
  term: string;
  simpleExplanation: string;
  detailedExplanation: string;
  example: string;
  relatedTerms: string[];
  source: LessonSourceMeta;
  lastCheckedAt: string;
}

export interface LessonProgress {
  status: LessonStatus;
  openedAt?: string;
  completedAt?: string;
  readPercent: number;
  quizScore?: number;
  quizTotal?: number;
  lastActivityAt: string;
  difficultTopics: string[];
  reviewRecommended: boolean;
}

export interface ProgressState {
  version: number;
  completedTasks: string[];
  completedTopics: string[];
  currentLessonId?: string;
  lessonProgress: Record<string, LessonProgress>;
  difficultLessonIds: string[];
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
