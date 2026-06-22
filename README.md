# Migration & Verwaltung Lerntrainer

Eine vollständig lokale React-Lernanwendung für die strukturierte Vorbereitung auf Tätigkeiten in:

- Ausländerbehörden
- Jobcentern und der SGB-II-Sachbearbeitung
- Integrations- und Arbeitsmarktprojekten
- Migrations- und Geflüchtetenberatung

Die Anwendung ist ein Lern- und Trainingssystem. Sie ist kein Rechtsberatungs- oder Entscheidungswerkzeug.

## Premium-Funktionsumfang

### Lerncockpit

- gewichteter Gesamtfortschritt
- mobile Fortschrittsringe für alle Kompetenzbereiche
- Fortschritt aller sechs Lernwochen
- Kompetenzprofil für fünf Fachbereiche
- stärkster und schwächster Lernbereich
- situationsbezogene Lernempfehlung
- Fall- und Quizdurchschnitt
- Lernserie und Aktivitätsverlauf
- acht motivierende Badges mit sichtbaren Zwischenständen

### Sechs-Wochen-Plan

- 36 Tagesaufgaben
- Lernziele, Themen und Fachbegriffe
- wöchentliche Reflexion
- Wochenprüfungen
- Verknüpfung mit passenden Fällen

### Professioneller Falltrainer

- exakt 60 anonymisierte Übungsfälle
- Aktenzeichen und verwaltungsähnlicher Aktenkopf
- Personendaten, Sachverhalt und Aktenbestand
- einheitliches Prüfraster:

```text
Status → Anspruch → Zuständigkeit → Unterlagen → Entscheidung → nächster Schritt
```

- Eingabefelder für Einordnung, Aktennotiz und Behörden-E-Mail
- transparente Bewertung in fünf Kriterien mit je 20 Punkten
- Versuchshistorie und persönlicher Bestwert
- kriteriumsbezogenes Feedback
- Musterlösung, Begründung und typische Fehler
- konkrete Lernhinweise für Anfänger
- passende Fachbegriffe zu jeder einzelnen Fallakte
- mobiler Fünf-Schritte-Assistent für Akte, Einordnung, Prüfung, Kommunikation und Feedback

Verteilung der Fallakten:

| Bereich | Fälle |
|---|---:|
| Ausländerbehörde | 15 |
| Jobcenter / SGB II | 15 |
| Integration und Sprachförderung | 10 |
| Migrationsberatung | 10 |
| Gemischte Prüfungsfälle | 10 |

### Weitere Lernwerkzeuge

- 120 Karteikarten mit Kategorie und Schwierigkeitsgrad
- swipe-ähnliche Karteikartenbedienung auf Touch-Geräten
- 100 Quizfragen mit unmittelbaren Erklärungen
- große mobile Antwortflächen
- Wiederholung schwieriger Karten
- professionelle Mustertexte in formeller und einfacher Sprache
- lokale Notizen mit Suche und Kategorien
- Schnellnotizen und mobiles Bearbeitungsfenster

### Berufsnahe Abschlussprüfung

- fünf ausführliche Fallanalysen
- 20 Wissensfragen
- zehn Fachbegriffe
- zwei Behörden-E-Mails
- eine Aktennotiz
- automatische lokale Entwurfsspeicherung
- gewichtete Auswertung nach Prüfungsbereichen
- Kompetenzprofil mit Stärke und Wiederholungsempfehlung

## Technik

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide Icons
- keine Datenbank
- kein Backend
- keine Anmeldung
- vollständig lokal im Browser

## Installation

Voraussetzung: Node.js 18 oder neuer.

```bash
npm install
npm run dev
```

Vite zeigt danach die lokale Adresse an, üblicherweise:

```text
http://localhost:5173
```

Produktions-Build:

```bash
npm run build
npm run preview
```

Alternativ mit pnpm:

```bash
pnpm install
pnpm dev
```

## Kurzanleitung

### 1. Wie starte ich die App?

Öffnen Sie ein Terminal im Projektordner und installieren Sie beim ersten Start die Abhängigkeiten:

```bash
npm install
```

Starten Sie anschließend den lokalen Entwicklungsserver:

```bash
npm run dev
```

Öffnen Sie die von Vite angezeigte Adresse im Browser, normalerweise
`http://localhost:5173`. Der Server kann mit `Ctrl + C` beendet werden.

### 2. Welche Funktionen gibt es?

- Dashboard mit Gesamtfortschritt, Kompetenzprofil, Lernserie und Badges
- strukturierter Sechs-Wochen-Lernplan
- Falltrainer mit 60 fiktiven Verwaltungsfällen und Bewertung bis 100 Punkte
- 120 Karteikarten und 100 Quizfragen mit direktem Feedback
- Mustertexte für Aktennotizen und Behördenkommunikation
- lokal gespeicherte Notizen
- mehrteilige Abschlussprüfung
- Dark Mode, mobile Bottom Navigation und responsive Ansichten

### 3. Wie funktioniert der Progress?

Erledigte Lernaufgaben, Fallbewertungen, Quizrunden, Karteikarten, Notizen,
Lernserie und Prüfungsergebnisse fließen in den Fortschritt ein. Die App
speichert jede Änderung automatisch im `localStorage` des verwendeten
Browsers. Ein erneuter Seitenaufruf oder Browser-Neustart stellt den Stand
automatisch wieder her.

Der Fortschritt ist an den jeweiligen Browser und das jeweilige Gerät
gebunden. Das Löschen der Browserdaten, ein privates Fenster oder ein anderer
Browser kann deshalb zu einem leeren Lernstand führen.

### 4. Wie nutze ich den Falltrainer?

1. Öffnen Sie über die Navigation **Falltrainer** beziehungsweise mobil **Fälle**.
2. Suchen oder filtern Sie eine Fallakte nach Bereich und Schwierigkeit.
3. Lesen Sie Sachverhalt, Dokumente, Status und Hauptfrage vollständig.
4. Arbeiten Sie die Schritte Einordnung, Prüfung und Kommunikation nacheinander ab.
5. Senden Sie Ihre Bearbeitung zur Bewertung ab.
6. Vergleichen Sie Punktzahl, Kriterienfeedback, Musterlösung, typische Fehler und Lernhinweis.

Der persönliche Bestwert und alle Versuche werden automatisch gespeichert.
Die Fälle enthalten ausschließlich fiktive Übungsdaten; auch in Freitextfeldern
sollten keine echten personenbezogenen Daten verwendet werden.

### 5. Wie kann ich später neue Fälle hinzufügen?

Die Falldaten liegen in:

```text
src/data/cases.ts
src/data/additionalCases.ts
```

Neue Fälle werden am einfachsten als weiteres Objekt im Array von
`src/data/additionalCases.ts` ergänzt. Ein Fall benötigt mindestens:

- `category`: `Ausländerbehörde`, `Jobcenter`, `Integration`, `Migrationsberatung` oder `Abschluss`
- `difficulty`: `leicht`, `mittel` oder `schwer`
- `week`: Lernwoche 1 bis 6
- `person`: fiktiver Name, Alter, Herkunft, Familie, Sprache, Status, Behörde und Anliegen
- `facts`: vollständiger Sachverhalt
- `documents`: vorhandene Dokumente
- `question`: Hauptfrage des Falls
- `solution`: Status, Zuständigkeit, Leistung, Erwerbstätigkeit, fehlende Unterlagen, nächster Schritt und Begründung
- optional `terms`: passende Fachbegriffe

`id`, laufende Fallnummer, Antwortoptionen und Standardtexte werden in
`src/data/cases.ts` automatisch ergänzt. Nach einer Änderung muss

```bash
npm run build
```

fehlerfrei durchlaufen. Neue Fälle müssen realistisch, vollständig fiktiv und
fachlich anhand aktueller offizieller Quellen geprüft sein.

## Lokale Speicherung

Der Lernstand wird unter dem Schlüssel

```text
migration-verwaltung-progress-v1
```

in `localStorage` gespeichert. Die interne Datenstruktur besitzt eine Versionsnummer und migriert ältere gespeicherte Daten beim Laden.

Gespeichert werden:

- erledigte Tagesaufgaben
- Fallbestwerte
- sämtliche Fallversuche mit Bewertungsrubrik
- Quizverlauf
- gelernte und schwierige Karteikarten
- Notizen
- Lernaktivitäten
- Tage der Lernserie
- Abschlussprüfungen und Teilbereichsergebnisse

Der Entwurf einer laufenden Abschlussprüfung wird separat gespeichert:

```text
migration-verwaltung-exam-draft-v2
```

Hinweise:

- Browserdaten dürfen nicht gelöscht werden, wenn der Lernstand erhalten bleiben soll.
- Inkognito-Fenster können Daten nach dem Schließen verwerfen.
- Die Daten werden nicht an einen Server übertragen.
- Es sollen keine echten personenbezogenen Daten eingegeben werden.

## Qualitätssicherung

Vor einer Veröffentlichung sollten folgende Befehle erfolgreich laufen:

```bash
npm run build
```

Der Build enthält bereits die TypeScript-Prüfung. Zusätzlich kann TypeScript separat geprüft werden:

```bash
npx tsc -b
```

Manuelle Kernprüfungen:

1. Aufgabe abschließen und Seite neu laden.
2. Fall lösen und prüfen, ob Bestwert und Versuchszahl erhalten bleiben.
3. Quiz abschließen und Dashboard kontrollieren.
4. Abschlussprüfung beginnen, Seite neu laden und Entwurf fortsetzen.
5. Dark Mode und Navigation auf Handybreite prüfen.
6. Browser-Konsole auf Fehler prüfen.

## Navigation und Barrierearmut

- dauerhafte Seitenleiste auf größeren Bildschirmen
- kompakte Bottom Navigation für Start, Fälle, Karten, Quiz und Notizen
- ergänzendes vollständiges Mobilmenü
- sichtbare Fokuszustände
- semantische Beschriftungen für Formulare
- keine horizontale Seitennavigation auf kleinen Displays
- Fehlergrenze mit sicherer Neuladeoption
- Hash-Navigation, damit Bereiche direkt adressierbar sind

## Mobile Leistung

- Seitenbereiche werden per Code-Splitting erst bei Bedarf geladen.
- Es werden keine externen Webfonts geladen.
- Touch-Ziele besitzen mobil mindestens ungefähr 48 Pixel Höhe.
- Die App wurde für 320, 390 und 430 Pixel breite Ansichten geprüft.

Beispiele:

```text
/#/dashboard
/#/cases
/#/exam
```

## Deployment auf Vercel

Die App ist als statische Vite-Anwendung für Vercel vorbereitet. Die Datei
`vercel.json` legt folgende Werte fest:

| Einstellung | Wert |
|---|---|
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Vor jedem Deployment lokal prüfen:

```bash
npm install
npm run build
```

Nach einem erfolgreichen Build muss `dist/index.html` vorhanden sein.
Der Ordner `dist/` wird nicht in Git gespeichert, da Vercel ihn bei jedem
Deployment neu erzeugt.

### Deployment über GitHub

1. Melden Sie sich bei [Vercel](https://vercel.com/) an.
2. Wählen Sie **Add New → Project**.
3. Verbinden Sie Ihr GitHub-Konto und importieren Sie das Repository.
4. Vercel sollte **Vite**, `npm run build` und `dist` automatisch beziehungsweise
   aus `vercel.json` übernehmen.
5. Wählen Sie **Deploy**.

Jeder spätere Push auf den Produktionsbranch löst ein neues Deployment aus.
Pull Requests können eigene Vorschau-URLs erhalten.

Für diese App sind keine Umgebungsvariablen und kein Backend erforderlich.

## Projekt auf GitHub hochladen

Erstellen Sie auf GitHub zunächst ein neues, leeres Repository. Aktivieren Sie
dort beim Erstellen keine zusätzliche README, `.gitignore`-Datei oder Lizenz,
weil diese Dateien im lokalen Projekt bereits vorhanden sind.

Führen Sie anschließend im Projektordner aus:

```bash
git status
git add .
git commit -m "Initial deployment-ready version"
git remote add origin https://github.com/DEIN-BENUTZERNAME/DEIN-REPOSITORY.git
git branch -M main
git push -u origin main
```

Ersetzen Sie `DEIN-BENUTZERNAME` und `DEIN-REPOSITORY` durch die tatsächlichen
Werte. Prüfen Sie vor `git add .`, dass keine Passwörter, Zugangsdaten oder
echten personenbezogenen Daten im Projekt liegen.

Für spätere Aktualisierungen genügen:

```bash
git add .
git commit -m "Kurze Beschreibung der Änderung"
git push
```

### Verhalten des Lernfortschritts nach dem Deployment

Der Fortschritt bleibt auch auf Vercel im `localStorage` des Browsers
gespeichert. Er gehört immer zur jeweiligen Website-Adresse und wird nicht
über GitHub, Vercel, Geräte oder Browser synchronisiert.

Das bedeutet:

- Ein neues Deployment unter derselben Produktionsdomain behält den lokalen
  Lernstand normalerweise bei.
- Vorschau-URLs und die Produktionsdomain besitzen getrennte Speicherbereiche.
- Ein Domainwechsel beginnt mit einem neuen lokalen Speicher.
- Gelöschte Browserdaten können ohne Export oder Backend nicht wiederhergestellt werden.

## Datenschutz und fachlicher Hinweis

> Diese App dient nur zu Lernzwecken und ersetzt keine Rechtsberatung. Rechtliche Informationen müssen immer anhand aktueller offizieller Quellen geprüft werden.

Empfohlene Ausgangsquellen:

- [Gesetze im Internet](https://www.gesetze-im-internet.de/)
- [Bundesamt für Migration und Flüchtlinge](https://www.bamf.de/)
- [Bundesagentur für Arbeit](https://www.arbeitsagentur.de/)
- [Make it in Germany](https://www.make-it-in-germany.com/)

Gesetze, Verwaltungshinweise und fachliche Vorgaben können sich ändern. Die Beispieldaten der App müssen deshalb regelmäßig fachlich überprüft werden.

## Projektstruktur

```text
src/
  components/
    ErrorBoundary.tsx
    Layout.tsx
    LegalNotice.tsx
    ProgressRing.tsx
  data/
    additionalCases.ts
    cases.ts
    flashcards.ts
    quiz.ts
    templates.ts
    weeks.ts
  hooks/
    useProgress.ts
  lib/
    progress.ts
  pages/
    CaseTrainerPage.tsx
    DashboardPage.tsx
    ExamPage.tsx
    LibraryPage.tsx
    PlanPage.tsx
    PracticePage.tsx
  App.tsx
  index.css
  main.tsx
  types.ts
```

## Inhaltliche Pflege

Neue Inhalte sollten ausschließlich in den Dateien unter `src/data/` ergänzt werden. Dabei ist zu beachten:

- fiktive Namen verwenden
- keine realen Falldaten übernehmen
- keine Erfolgsgarantien formulieren
- unklare Rechtsfolgen als prüfbedürftig kennzeichnen
- offizielle Quellen und aktuelle Gesetzesfassungen prüfen
- zwischen allgemeiner Orientierung und Einzelfallberatung unterscheiden
