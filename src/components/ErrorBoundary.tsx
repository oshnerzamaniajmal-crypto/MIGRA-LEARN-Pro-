import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("UI-Fehler im Lerntrainer", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main className="grid min-h-screen place-items-center bg-cloud p-5 text-ink dark:bg-[#091615] dark:text-white">
        <section className="card-premium max-w-lg p-8 text-center">
          <AlertTriangle className="mx-auto text-coral" size={38} />
          <h1 className="mt-5 font-display text-3xl">Diese Ansicht konnte nicht geladen werden.</h1>
          <p className="mt-3 text-sm leading-6 opacity-55">Ihre gespeicherten Lernfortschritte bleiben erhalten. Laden Sie die App neu, um weiterzuarbeiten.</p>
          <button onClick={() => window.location.reload()} className="btn-primary mt-6"><RotateCcw size={17} /> App neu laden</button>
        </section>
      </main>
    );
  }
}
