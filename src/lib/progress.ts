import { cases } from "../data/cases";
import { flashcards } from "../data/flashcards";
import { weeks } from "../data/weeks";
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
  return Math.round((tasks * .34 + solvedCases * .28 + cards * .16 + quizRounds * .12 + exam * .1) * 100);
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
    { id: "start", name: "Erster Schritt", description: "Erste Lernaufgabe abgeschlossen", earned: state.completedTasks.length >= 1, target: 1, current: state.completedTasks.length },
    { id: "status", name: "Status-Profi", description: "Woche 1 vollständig gemeistert", earned: state.completedTasks.filter((id) => id.startsWith("w1")).length === 6, target: 6, current: state.completedTasks.filter((id) => id.startsWith("w1")).length },
    { id: "sgb", name: "SGB-II-Kompass", description: "Woche 3 vollständig gemeistert", earned: state.completedTasks.filter((id) => id.startsWith("w3")).length === 6, target: 6, current: state.completedTasks.filter((id) => id.startsWith("w3")).length },
    { id: "akten", name: "Aktenroutine", description: "10 Fälle gelöst", earned: solved >= 10, target: 10, current: solved },
    { id: "quality", name: "Prüfqualität", description: "Fall-Durchschnitt mindestens 80 Punkte", earned: solved >= 3 && avgCase >= 80, target: 80, current: Math.round(avgCase) },
    { id: "cards", name: "Begriffssicher", description: "50 Karteikarten beherrscht", earned: state.learnedCards.length >= 50, target: 50, current: state.learnedCards.length },
    { id: "streak", name: "Dranbleiber", description: "7 Tage Lernserie", earned: streak >= 7, target: 7, current: streak },
    { id: "exam", name: "Praxisbereit", description: "Abschlussprüfung mit mindestens 80 %", earned: (state.examScore ?? 0) >= 80, target: 80, current: state.examScore ?? 0 },
  ];
}
