import { useEffect, useMemo, useState } from "react";
import type { Note, ProgressState } from "../types";

const STORAGE_KEY = "migration-verwaltung-progress-v1";

const initialState: ProgressState = {
  version: 4,
  completedTasks: [],
  completedTopics: [],
  currentLessonId: undefined,
  lessonProgress: {},
  difficultLessonIds: [],
  caseScores: {},
  caseAttempts: [],
  quizHistory: [],
  learnedCards: [],
  difficultCards: [],
  notes: [],
  activities: [],
  streakDates: [],
  examAttempts: [],
};

const localDate = (date = new Date()) => {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
};

const today = () => localDate();

const migrate = (saved: Partial<ProgressState>): ProgressState => ({
  ...initialState,
  ...saved,
  version: 4,
  completedTasks: Array.isArray(saved.completedTasks) ? saved.completedTasks : [],
  completedTopics: Array.isArray(saved.completedTopics) ? saved.completedTopics : [],
  currentLessonId: typeof saved.currentLessonId === "string" ? saved.currentLessonId : undefined,
  lessonProgress: saved.lessonProgress && typeof saved.lessonProgress === "object" ? saved.lessonProgress : {},
  difficultLessonIds: Array.isArray(saved.difficultLessonIds) ? saved.difficultLessonIds : [],
  caseScores: saved.caseScores && typeof saved.caseScores === "object" ? saved.caseScores : {},
  caseAttempts: Array.isArray(saved.caseAttempts) ? saved.caseAttempts : [],
  quizHistory: Array.isArray(saved.quizHistory) ? saved.quizHistory : [],
  learnedCards: Array.isArray(saved.learnedCards) ? saved.learnedCards : [],
  difficultCards: Array.isArray(saved.difficultCards) ? saved.difficultCards : [],
  notes: Array.isArray(saved.notes) ? saved.notes : [],
  activities: Array.isArray(saved.activities) ? saved.activities : [],
  streakDates: Array.isArray(saved.streakDates) ? saved.streakDates : [],
  examAttempts: Array.isArray(saved.examAttempts) ? saved.examAttempts : [],
});

export function useProgress() {
  const [state, setState] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? migrate(JSON.parse(saved)) : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const log = (text: string, kind: string) => {
    setState((current) => {
      const date = today();
      return {
        ...current,
        activities: [{ date: new Date().toISOString(), text, kind }, ...current.activities].slice(0, 30),
        streakDates: current.streakDates.includes(date) ? current.streakDates : [...current.streakDates, date],
      };
    });
  };

  const toggleTask = (id: string, title: string) => {
    const completed = state.completedTasks.includes(id);
    setState((current) => ({
      ...current,
      completedTasks: completed ? current.completedTasks.filter((item) => item !== id) : [...current.completedTasks, id],
    }));
    if (!completed) log(`Aufgabe erledigt: ${title}`, "Aufgabe");
  };

  const toggleTopic = (id: string, title: string) => {
    const completed = state.completedTopics.includes(id);
    setState((current) => ({
      ...current,
      completedTopics: completed
        ? current.completedTopics.filter((item) => item !== id)
        : [...current.completedTopics, id],
    }));
    if (!completed) log(`Lerneinheit abgeschlossen: ${title}`, "Lernen");
  };

  const openLesson = (lessonId: string, title: string) => {
    setState((current) => {
      const existing = current.lessonProgress[lessonId];
      return {
        ...current,
        currentLessonId: lessonId,
        lessonProgress: {
          ...current.lessonProgress,
          [lessonId]: {
            status: existing?.status === "completed" || existing?.status === "quiz-passed" ? existing.status : "started",
            openedAt: existing?.openedAt ?? new Date().toISOString(),
            completedAt: existing?.completedAt,
            readPercent: Math.max(existing?.readPercent ?? 0, 12),
            quizScore: existing?.quizScore,
            quizTotal: existing?.quizTotal,
            lastActivityAt: new Date().toISOString(),
            difficultTopics: existing?.difficultTopics ?? [],
            reviewRecommended: existing?.reviewRecommended ?? false,
          },
        },
      };
    });
    log(`Lektion geöffnet: ${title}`, "Lernpfad");
  };

  const updateLessonReading = (lessonId: string, percent: number) => {
    setState((current) => {
      const existing = current.lessonProgress[lessonId];
      return {
        ...current,
        lessonProgress: {
          ...current.lessonProgress,
          [lessonId]: {
            status: existing?.status === "completed" || existing?.status === "quiz-passed" ? existing.status : "reading",
            openedAt: existing?.openedAt ?? new Date().toISOString(),
            completedAt: existing?.completedAt,
            readPercent: Math.max(existing?.readPercent ?? 0, Math.min(100, Math.round(percent))),
            quizScore: existing?.quizScore,
            quizTotal: existing?.quizTotal,
            lastActivityAt: new Date().toISOString(),
            difficultTopics: existing?.difficultTopics ?? [],
            reviewRecommended: existing?.reviewRecommended ?? false,
          },
        },
      };
    });
  };

  const completeLesson = (lessonId: string, title: string, nextLessonId?: string) => {
    setState((current) => {
      const existing = current.lessonProgress[lessonId];
      const completedTopics = current.completedTopics.includes(lessonId) ? current.completedTopics : [...current.completedTopics, lessonId];
      return {
        ...current,
        currentLessonId: nextLessonId ?? lessonId,
        completedTopics,
        lessonProgress: {
          ...current.lessonProgress,
          [lessonId]: {
            status: "completed",
            openedAt: existing?.openedAt ?? new Date().toISOString(),
            completedAt: new Date().toISOString(),
            readPercent: 100,
            quizScore: existing?.quizScore,
            quizTotal: existing?.quizTotal,
            lastActivityAt: new Date().toISOString(),
            difficultTopics: existing?.difficultTopics ?? [],
            reviewRecommended: false,
          },
        },
      };
    });
    log(`Lektion abgeschlossen: ${title}`, "Lernpfad");
  };

  const saveLessonQuiz = (lessonId: string, title: string, score: number, total: number, difficultTopics: string[]) => {
    const passed = total > 0 && score / total >= 0.7;
    setState((current) => {
      const existing = current.lessonProgress[lessonId];
      const difficultLessonIds = passed
        ? current.difficultLessonIds.filter((id) => id !== lessonId)
        : Array.from(new Set([...current.difficultLessonIds, lessonId]));
      return {
        ...current,
        difficultLessonIds,
        lessonProgress: {
          ...current.lessonProgress,
          [lessonId]: {
            status: passed ? "quiz-passed" : "review-recommended",
            openedAt: existing?.openedAt ?? new Date().toISOString(),
            completedAt: existing?.completedAt,
            readPercent: Math.max(existing?.readPercent ?? 0, 85),
            quizScore: score,
            quizTotal: total,
            lastActivityAt: new Date().toISOString(),
            difficultTopics,
            reviewRecommended: !passed,
          },
        },
        quizHistory: [...current.quizHistory, { date: new Date().toISOString(), score, total, category: "Lernpfad" }],
      };
    });
    log(`Lektionsquiz ${title}: ${score}/${total} richtig`, "Quiz");
  };

  const saveCaseScore = (
    id: string,
    score: number,
    breakdown: Record<"status" | "authority" | "documents" | "nextStep" | "communication", number>,
  ) => {
    setState((current) => ({
      ...current,
      caseScores: { ...current.caseScores, [id]: Math.max(score, current.caseScores[id] ?? 0) },
      caseAttempts: [...current.caseAttempts, { caseId: id, date: new Date().toISOString(), score, breakdown }],
    }));
    log(`Falltrainer abgeschlossen: ${score}/100 Punkte`, "Fall");
  };

  const saveQuiz = (score: number, total: number, category: string) => {
    setState((current) => ({
      ...current,
      quizHistory: [...current.quizHistory, { date: new Date().toISOString(), score, total, category }],
    }));
    log(`Quiz abgeschlossen: ${score}/${total} richtig`, "Quiz");
  };

  const markCard = (id: string, learned: boolean) => {
    setState((current) => ({
      ...current,
      learnedCards: learned
        ? Array.from(new Set([...current.learnedCards, id]))
        : current.learnedCards.filter((item) => item !== id),
      difficultCards: learned
        ? current.difficultCards.filter((item) => item !== id)
        : Array.from(new Set([...current.difficultCards, id])),
    }));
    log(learned ? "Karteikarte als sicher markiert" : "Karte zur Wiederholung vorgemerkt", "Karte");
  };

  const upsertNote = (note: Note) => {
    setState((current) => ({
      ...current,
      notes: [note, ...current.notes.filter((item) => item.id !== note.id)],
    }));
    log(`Notiz gespeichert: ${note.title}`, "Notiz");
  };

  const deleteNote = (id: string) => {
    setState((current) => ({ ...current, notes: current.notes.filter((note) => note.id !== id) }));
  };

  const saveExam = (score: number, sections: Record<string, number>) => {
    setState((current) => ({
      ...current,
      examScore: Math.max(score, current.examScore ?? 0),
      examAttempts: [...current.examAttempts, { date: new Date().toISOString(), score, sections }],
    }));
    log(`Abschlussprüfung: ${score}%`, "Prüfung");
  };

  const reset = () => setState(initialState);

  const streak = useMemo(() => {
    const dates = new Set(state.streakDates);
    let count = 0;
    const cursor = new Date();
    while (dates.has(cursor.toISOString().slice(0, 10))) {
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    if (count === 0) {
      cursor.setDate(cursor.getDate() - 1);
      while (dates.has(localDate(cursor))) {
        count += 1;
        cursor.setDate(cursor.getDate() - 1);
      }
    }
    return count;
  }, [state.streakDates]);

  return {
    state,
    toggleTask,
    toggleTopic,
    openLesson,
    updateLessonReading,
    completeLesson,
    saveLessonQuiz,
    saveCaseScore,
    saveQuiz,
    markCard,
    upsertNote,
    deleteNote,
    saveExam,
    reset,
    streak,
  };
}
