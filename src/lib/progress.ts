import { cases } from "../data/cases";
import { flashcards } from "../data/flashcards";
import { weeks } from "../data/weeks";
import { learningLessons } from "../data/learningPath";
import type { Category, ProgressState } from "../types";

export const competencyCategories: Category[] = [
  "Ausländerrecht",
  "Jobcenter / SGB II",
  "Integration",
  "Beratung",
  "Behördenkommunikation",
];

const caseCategoryMap: Record<string, Category> = {
  Ausländerbehörde: "Ausländerrecht",
  Jobcenter: "Jobcenter / SGB II",
  Integration: "Integration",
  Migrationsberatung: "Beratung",
  Abschluss: "Behördenkommunikation",
};

export function totalProgress(state: ProgressState) {
  const tasks = state.completedTasks.length / 36;
  const solvedCases = Object.keys(state.caseScores).length / cases.length;
  const cards = state.learnedCards.length / flashcards.length;
  const quizRounds = Math.min(state.quizHistory.length / 10, 1);
  const exam = state.examScore ? state.examScore / 100 : 0;
  const topics = learningLessons.filter((lesson) => state.completedTopics.includes(lesson.id)).length / learningLessons.length;
  return Math.round((topics * .28 + tasks * .24 + solvedCases * .22 + cards * .11 + quizRounds * .09 + exam * .06) * 100);
}

export function competencyScores(state: ProgressState) {
  return competencyCategories.map((category) => {
    const categoryWeeks = weeks.filter((week) => week.category === category);
    const taskIds = categoryWeeks.flatMap((week) => week.tasks.map((task) => task.id));
    const taskScore = taskIds.length ? taskIds.filter((id) => state.completedTasks.includes(id)).length / taskIds.length * 100 : 0;

    const categoryCases = cases.filter((item) => caseCategoryMap[item.category] === category);
    const caseScore = categoryCases.length
      ? categoryCases.reduce((sum, item) => sum + (state.caseScores[item.id] ?? 0), 0) / categoryCases.length
      : 0;

    const quizzes = state.quizHistory.filter((quiz) => quiz.category === category || quiz.category === "Alle");
    const quizScore = quizzes.length
      ? quizzes.reduce((sum, quiz) => sum + quiz.score / quiz.total * 100, 0) / quizzes.length
      : 0;

    const categoryCards = flashcards.filter((card) => card.category === category);
    const cardScore = categoryCards.length
      ? categoryCards.filter((card) => state.learnedCards.includes(card.id)).length / categoryCards.length * 100
      : 0;

    return { category, value: Math.round(taskScore * .35 + caseScore * .35 + quizScore * .2 + cardScore * .1) };
  });
}

export function earnedBadges(state: ProgressState, streak: number) {
  const solved = Object.keys(state.caseScores).length;
  const avgCase = solved ? Object.values(state.caseScores).reduce((a, b) => a + b, 0) / solved : 0;
  return [
    { id: "start", name: "Erster Schritt", description: "Erstes Rechtsthema gelernt", earned: state.completedTopics.length >= 1, target: 1, current: state.completedTopics.length },
    { id: "status", name: "Status-Profi", description: "Woche 1 vollständig gemeistert", earned: state.completedTasks.filter((id) => id.startsWith("w1")).length === 6, target: 6, current: state.completedTasks.filter((id) => id.startsWith("w1")).length },
    { id: "sgb", name: "SGB-II-Kompass", description: "Woche 3 vollständig gemeistert", earned: state.completedTasks.filter((id) => id.startsWith("w3")).length === 6, target: 6, current: state.completedTasks.filter((id) => id.startsWith("w3")).length },
    { id: "akten", name: "Aktenroutine", description: "10 Fälle gelöst", earned: solved >= 10, target: 10, current: solved },
    { id: "quality", name: "Prüfqualität", description: "Fall-Durchschnitt mindestens 80 Punkte", earned: solved >= 3 && avgCase >= 80, target: 80, current: Math.round(avgCase) },
    { id: "cards", name: "Begriffssicher", description: "50 Karteikarten beherrscht", earned: state.learnedCards.length >= 50, target: 50, current: state.learnedCards.length },
    { id: "streak", name: "Dranbleiber", description: "7 Tage Lernserie", earned: streak >= 7, target: 7, current: streak },
    { id: "exam", name: "Praxisbereit", description: "Abschlussprüfung mit mindestens 80 %", earned: (state.examScore ?? 0) >= 80, target: 80, current: state.examScore ?? 0 },
  ];
}

const errorLabels: Record<keyof ProgressState["caseAttempts"][number]["breakdown"], { title: string; topic: string; advice: string; page: string }> = {
  status: {
    title: "Status & Rechtsgrundlage",
    topic: "Aufenthaltstitel, Duldung, Gestattung, Fiktionswirkung",
    advice: "Vor jeder Entscheidung zuerst Dokument, Rechtsgrundlage, Gültigkeit und Nebenbestimmung lesen.",
    page: "learn",
  },
  authority: {
    title: "Zuständigkeit & Priorität",
    topic: "Ausländerbehörde, Jobcenter, BAMF, Sozialamt, Anerkennungsstelle",
    advice: "Trenne Aufenthaltsrecht, Leistungsrecht, Schutzverfahren und Beratung. Eine Stelle entscheidet selten alles.",
    page: "decisions",
  },
  documents: {
    title: "Unterlagen & Sachverhalt",
    topic: "Nachforderung, Aktenbestand, Nachweise, Fristen",
    advice: "Benennen Sie konkret, welcher Nachweis fehlt. Allgemeine Formulierungen wie „weitere Dokumente“ reichen nicht.",
    page: "documents",
  },
  nextStep: {
    title: "Endentscheidung & nächster Schritt",
    topic: "Bewilligen, ablehnen, nachfordern, weiterleiten, Frist sichern",
    advice: "Die Handlung muss zuständig, zeitlich logisch und zur Aktenlage passend sein.",
    page: "schemas",
  },
  communication: {
    title: "Risiko & Behördenkommunikation",
    topic: "Aktennotiz, E-Mail, Risikoampel, Beratungsgrenzen",
    advice: "Kommunikation muss sachlich sein und darf keine Zusage machen, bevor die Prüfung abgeschlossen ist.",
    page: "templates",
  },
};

export function caseErrorDiary(state: ProgressState) {
  const counts = Object.fromEntries(Object.keys(errorLabels).map((key) => [key, 0])) as Record<keyof ProgressState["caseAttempts"][number]["breakdown"], number>;
  const recent = state.caseAttempts.slice(-20);
  recent.forEach((attempt) => {
    Object.entries(attempt.breakdown).forEach(([key, value]) => {
      if (value < 15) counts[key as keyof typeof counts] += 1;
    });
  });
  return Object.entries(counts)
    .map(([key, count]) => ({ key, count, ...errorLabels[key as keyof typeof errorLabels] }))
    .sort((a, b) => b.count - a.count);
}

export function learningCoach(state: ProgressState) {
  const attempts = state.caseAttempts;
  const solved = Object.keys(state.caseScores).length;
  const average = solved ? Math.round(Object.values(state.caseScores).reduce((a, b) => a + b, 0) / solved) : 0;
  const diary = caseErrorDiary(state);
  const mainError = diary[0];

  if (!attempts.length) {
    return {
      title: "Starten Sie mit einer Fallakte",
      message: "Lösen Sie zuerst einen leichten Fall. Danach erkennt der Lerncoach Ihre typischen Fehler und empfiehlt gezielt die nächste Übung.",
      action: "Erste Fallakte bearbeiten",
      page: "cases",
    };
  }
  if (mainError?.count > 0) {
    return {
      title: `Hauptfehler: ${mainError.title}`,
      message: `${mainError.advice} Das kam in den letzten Versuchen ${mainError.count}-mal vor. Wiederholen Sie: ${mainError.topic}.`,
      action: "Passenden Lernbereich öffnen",
      page: mainError.page,
    };
  }
  if (average >= 85) {
    return {
      title: "Sehr stabiler Lernstand",
      message: "Ihre Fallentscheidungen sind aktuell stark. Wechseln Sie in schwerere Akten oder in die Abschlussprüfung.",
      action: "Abschlussprüfung öffnen",
      page: "exam",
    };
  }
  return {
    title: "Guter Fortschritt",
    message: "Die Fehler sind nicht mehr eindeutig konzentriert. Lösen Sie jetzt einen Fall aus einem anderen Rechtsgebiet, um Transferfähigkeit aufzubauen.",
    action: "Nächsten Fall wählen",
    page: "cases",
  };
}
