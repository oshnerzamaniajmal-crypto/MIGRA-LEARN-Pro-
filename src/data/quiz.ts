import type { QuizQuestion } from "../types";
import { flashcards } from "./flashcards";

const distractor = (index: number, offset: number) =>
  flashcards[(index + offset) % flashcards.length].explanation;

export const quizQuestions: QuizQuestion[] = flashcards.slice(0, 100).map((card, index) => {
  const type = index % 5 === 0 ? "Richtig/Falsch" : index % 5 === 1 ? "Mini-Fall" : "Multiple Choice";
  if (type === "Richtig/Falsch") {
    const correctStatement = index % 10 === 0;
    return {
      id: `q-${index + 1}`,
      category: card.category,
      difficulty: card.difficulty,
      type,
      question: correctStatement
        ? `Richtig oder falsch? ${card.term}: ${card.explanation}`
        : `Richtig oder falsch? „${card.term}“ bedeutet dasselbe wie „${flashcards[(index + 17) % flashcards.length].term}“.`,
      options: ["Richtig", "Falsch"],
      correct: correctStatement ? 0 : 1,
      explanation: card.explanation,
    };
  }
  if (type === "Mini-Fall") {
    return {
      id: `q-${index + 1}`,
      category: card.category,
      difficulty: card.difficulty,
      type,
      question: `In einer Akte taucht der Begriff „${card.term}“ auf. Welche Einordnung ist fachlich am passendsten?`,
      options: [card.explanation, distractor(index, 23), distractor(index, 41), distractor(index, 67)],
      correct: 0,
      explanation: `Entscheidend ist die präzise Einordnung: ${card.explanation}`,
    };
  }
  return {
    id: `q-${index + 1}`,
    category: card.category,
    difficulty: card.difficulty,
    type,
    question: `Welche Erklärung passt zu „${card.term}“?`,
    options: [distractor(index, 31), card.explanation, distractor(index, 53), distractor(index, 79)],
    correct: 1,
    explanation: card.explanation,
  };
});
