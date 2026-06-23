import { lazy, Suspense, useEffect, useState } from "react";
import { Layout, type Page } from "./components/Layout";
import { useProgress } from "./hooks/useProgress";
import { ErrorBoundary } from "./components/ErrorBoundary";

const DashboardPage = lazy(() => import("./pages/DashboardPage").then((module) => ({ default: module.DashboardPage })));
const PlanPage = lazy(() => import("./pages/PlanPage").then((module) => ({ default: module.PlanPage })));
const CaseTrainerPage = lazy(() => import("./pages/CaseTrainerPage").then((module) => ({ default: module.CaseTrainerPage })));
const FlashcardsPage = lazy(() => import("./pages/PracticePage").then((module) => ({ default: module.FlashcardsPage })));
const QuizPage = lazy(() => import("./pages/PracticePage").then((module) => ({ default: module.QuizPage })));
const NotesPage = lazy(() => import("./pages/LibraryPage").then((module) => ({ default: module.NotesPage })));
const TemplatesPage = lazy(() => import("./pages/LibraryPage").then((module) => ({ default: module.TemplatesPage })));
const ExamPage = lazy(() => import("./pages/ExamPage").then((module) => ({ default: module.ExamPage })));
const AcademyPage = lazy(() => import("./pages/KnowledgePage").then((module) => ({ default: module.AcademyPage })));
const LearnPage = lazy(() => import("./pages/KnowledgePage").then((module) => ({ default: module.LearnPage })));
const SchemaPage = lazy(() => import("./pages/KnowledgePage").then((module) => ({ default: module.SchemaPage })));
const DecisionPage = lazy(() => import("./pages/KnowledgePage").then((module) => ({ default: module.DecisionPage })));
const SourcesPage = lazy(() => import("./pages/KnowledgePage").then((module) => ({ default: module.SourcesPage })));
const DocumentsPage = lazy(() => import("./pages/KnowledgePage").then((module) => ({ default: module.DocumentsPage })));

const pages: Page[] = ["dashboard", "academy", "learn", "schemas", "decisions", "cases", "quiz", "documents", "sources", "plan", "cards", "templates", "notes", "exam"];
const pageFromHash = (): Page => {
  const value = window.location.hash.replace("#/", "") as Page;
  return pages.includes(value) ? value : "dashboard";
};

export default function App() {
  const [page, setPageState] = useState<Page>(pageFromHash);
  const [dark, setDark] = useState(() => localStorage.getItem("migration-theme") === "dark");
  const progress = useProgress();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("migration-theme", dark ? "dark" : "light");
  }, [dark]);
  useEffect(() => {
    const onHashChange = () => setPageState(pageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const setPage = (next: Page) => {
    setPageState(next);
    if (window.location.hash !== `#/${next}`) window.history.pushState(null, "", `#/${next}`);
  };
  const content = {
    dashboard: <DashboardPage state={progress.state} streak={progress.streak} setPage={setPage} />,
    academy: <AcademyPage state={progress.state} toggleTopic={progress.toggleTopic} />,
    learn: <LearnPage state={progress.state} toggleTopic={progress.toggleTopic} />,
    schemas: <SchemaPage />,
    decisions: <DecisionPage />,
    plan: <PlanPage state={progress.state} toggleTask={progress.toggleTask} />,
    cases: <CaseTrainerPage state={progress.state} saveCaseScore={progress.saveCaseScore} />,
    cards: <FlashcardsPage state={progress.state} markCard={progress.markCard} />,
    quiz: <QuizPage state={progress.state} saveQuiz={progress.saveQuiz} />,
    documents: <DocumentsPage />,
    sources: <SourcesPage />,
    templates: <TemplatesPage />,
    notes: <NotesPage state={progress.state} upsertNote={progress.upsertNote} deleteNote={progress.deleteNote} />,
    exam: <ExamPage state={progress.state} saveExam={progress.saveExam} />,
  }[page];
  return <ErrorBoundary><Layout page={page} setPage={setPage} dark={dark} setDark={setDark}><Suspense fallback={<div className="grid min-h-[55vh] place-items-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-sage/20 border-t-sage" /></div>}>{content}</Suspense></Layout></ErrorBoundary>;
}
