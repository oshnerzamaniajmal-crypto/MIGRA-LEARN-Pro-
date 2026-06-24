# Migration & Verwaltung Lerntrainer

Eine vollständig lokale React-Lernanwendung für die strukturierte Vorbereitung auf Tätigkeiten in:

- Ausländerbehörden
- Jobcentern und der SGB-II-Sachbearbeitung
- Integrations- und Arbeitsmarktprojekten
- Migrations- und Geflüchtetenberatung

Die Anwendung ist ein Lern- und Trainingssystem. Sie ist kein Rechtsberatungs- oder Entscheidungswerkzeug.

## Neue Lernlogik: erst Recht verstehen, dann Fälle lösen

Die Hauptnavigation folgt einer fachlichen Reihenfolge:

1. **Termin- & Mail-Assistant** – MVP-Modul für Termine, E-Mails, Aufgaben,
   Lieferungen, Inbox-Vorschläge, Suche, Projekte und verbundene Konten
2. **Akademie** – Lernpfade, Expertenmodule, tiefe Erklärungen, Fallakten,
   Kontrollfragen, Reflexion, Mini-Quiz und Karteikarten
3. **Lernen** – Gesetzesgrundlage, einfache Erklärung, Zweck, Systematik,
   Begriffe, Voraussetzungen, Rechtsfolge, Praxis, Fehler und Beispiele
4. **Prüfschemata** – zehn interaktive Prüfschritte vom Sachverhalt bis zum
   nächsten Verfahrensschritt
5. **Entscheidungsboxen** – Entscheidungsbäume und Kriterienchecks für
   nationales Visum, Schutzformen, Familiennachzug, Arbeitserlaubnis und
   Leistungszuständigkeit
6. **Falltrainer** – Anwendung des zuvor gelernten Systems auf 100 Fälle
7. **Quiz und Prüfung** – Wissenskontrolle und berufsnahe Transferaufgaben
8. **Dokumente und Quellen** – Aktenchecklisten, Quellenstufen und sichtbarer
   Rechtsstand

## Neues MVP-Modul: Termin-, E-Mail-, To-do- und Delivery-Assistant

Die App enthält zusätzlich ein neues Modul **Termin- & Mail-Assistant**. Dieses
Modul wird in Etappen entwickelt.

### Etappe 1 – Grundstruktur mit Beispiel-Daten

Fertig in dieser Version:

- Demo-Login ohne echte Konto-Verbindung
- Dashboard mit Heute, Morgen und Wochenüberblick
- Premium-Fokuskarte „Was ist jetzt wichtig?“
- Fokusmodus für die nächste wichtige Sache ohne Ablenkung
- elegante Tages-Timeline mit Uhrzeiten
- Risiko-Karte für Fristen, offene Antworten und unklare Termine
- intelligente Hilfe-Fragen wie „Was soll ich jetzt tun?“
- Kalenderansicht
- Aufgabenansicht mit Beispiel-Aufgaben
- E-Mail-Ansicht mit Beispiel-E-Mails
- Lieferungsansicht mit Beispiel-Lieferung
- Einstellungen / verbundene Konten als vorbereitete Demo-Ansicht
- Suchleiste und Kategorie-Filter
- Detailansichten für Termin, Aufgabe, E-Mail und Lieferung
- manuelle Aufgabe im Dashboard erstellen
- Inbox-Vorschläge im Dashboard als Demo-Bereich
- Datenschutz-Hinweise: keine echte E-Mail wird gelesen, gesendet oder gelöscht

Wichtig: Das Assistant-Modul ist derzeit eine lokale MVP-/UI-Version mit
Demo-Daten. Für echte Gmail-, Outlook- und Kalender-Synchronisierung braucht es
später ein Backend mit OAuth, Token-Speicherung, Verschlüsselung, Audit-Log und
API-Routen.

### Weitere Etappen

- Etappe 2: Prisma-Datenbankmodell mit Tabellen für Nutzer, Konten, E-Mails,
  Termine, Aufgaben, Lieferungen, Projekte, Erinnerungen und Audit-Logs
- Etappe 3: Gmail-Integration mit OAuth
- Etappe 4: Outlook-/Microsoft-Integration mit Microsoft Graph
- Etappe 5: KI-Erkennung für Termine, Aufgaben, Fristen, Lieferungen und
  Antwortbedarf
- Etappe 6: Design-, Sicherheits-, Fehlerbehandlungs- und Deployment-Optimierung

Die Akademie enthält zusätzlich fünf Lernpfade:

- Anfängerpfad
- Sachbearbeiter-Modus
- Berater-Modus
- Expertenmodus
- Prüfungsvorbereitung

Jedes Akademie-Modul enthält Einführung, Lernziel, Rechtsgrundlagen, Zweck,
Systematik, zentrale Begriffe, Voraussetzungen, Ermessensspielräume,
Praxisprobleme, Fehler von Antragstellern, Fehler von Sachbearbeitern,
Fristen, Unterlagen, Entscheidungskriterien, Ablehnungsgründe, Möglichkeiten
bei Ablehnung, Praxisbeispiele, Expertentipps, Kontrollfragen, Reflexion,
Mini-Quiz und Karteikarten.

Die ersten ausführlichen Lernmodule behandeln:

- Aufenthaltstitel allgemein
- nationales Visum D
- Blaue Karte EU
- Chancenkarte
- Familiennachzug
- Flüchtlingsschutz
- subsidiären Schutz
- nationales Abschiebungsverbot
- Duldung
- Niederlassungserlaubnis

Zusätzlich besitzt die App jetzt eine eigene digitale Paragraphen-Kommentar-
Ebene. Sie ist im Bereich **Lernen → Paragraphen-Kommentar** erreichbar.
Jeder Paragraph ist als eigenes Datenobjekt aufgebaut mit:

- Normstruktur nach Absatz/Satz/Nummer beziehungsweise Normkern
- hervorgehobenen Schlüsselbegriffen
- einfacher Erklärung und Bedeutung im Alltag
- schwierigen juristischen Begriffen mit Beispielen
- Zweck, Systematik, Voraussetzungen und Rechtsfolgen
- Ermessen beziehungsweise gebundener Entscheidung
- Auslegungsproblemen und Verbindung zu anderen Normen
- Kurzkommentar, Streitfragen, Behörden- und Beratungsperspektive
- menschlicher Bedeutung und möglichen Härtefällen
- Prüfungsschema, Dokumentencheckliste und Ablehnungsgründen
- Praxisfällen aus Ausländerbehörde, Jobcenter und Beratung
- Karteikarten, Quiz, offene Fragen, Lückentext und Fallprüfung

Die Paragraphen-Bibliothek umfasst inzwischen rund 100 zentrale Norm- und
Themenkarten, unter anderem aus:

- AufenthG: Passpflicht, Aufenthaltstitel, Erteilungsvoraussetzungen, Visum,
  Aufenthaltserlaubnis, Verlängerung, Niederlassungserlaubnis,
  Erwerbsmigration, Studium, Ausbildung, Chancenkarte, humanitäre Titel,
  Familiennachzug, Duldung, Ausbildungsduldung, Beschäftigungsduldung,
  Aufenthaltsbeendigung und Fiktionswirkung
- AsylG / EU-Schutzrecht: Asylantrag, Antragstellung, Mitwirkung, Anhörung,
  Flüchtlingsschutz, Unzulässigkeit, offensichtlich unbegründete Anträge,
  Abschiebungsanordnung, Aufenthaltsgestattung und Klagefristen
- SGB II / SGB III / SGB XII: Bürgergeld, Hilfebedürftigkeit, Einkommen,
  Vermögen, Unterkunftskosten, Antrag, vorläufige Entscheidung,
  Berufsberatung, Vermittlungsbudget und Sozialhilfe-Abgrenzung
- AsylbLG: Leistungsberechtigte, Grundleistungen, Krankheit,
  Schwangerschaft/Geburt und sonstige Leistungen
- FreizügG/EU: EU-Freizügigkeit, Familienangehörige, Aufenthaltskarte und
  Verlustfeststellung
- StAG: Ermessenseinbürgerung, Anspruchseinbürgerung, Mehrstaatigkeit und
  Einbürgerungsurkunde
- VwVfG / VwGO: Untersuchungsgrundsatz, Anhörung, Verwaltungsakt,
  Begründung, Ermessen, Klagefrist, Eilrechtsschutz und einstweilige Anordnung
- BeschV und IntV: Beschäftigungszustimmung, Integrationskurs,
  Teilnahmeberechtigung und Kostenbeitrag

Jedes Thema trennt gesetzesnahe Zusammenfassung, didaktischen Kommentar,
Behördenpraxis und Fallbeispiel. Dynamische Werte wie Gehaltsschwellen werden
nicht als dauerhaft feste Zahl behandelt, sondern müssen in der jeweils
aktuellen amtlichen Quelle geprüft werden.

## Quellen- und Qualitätsmodell

Die App ordnet Quellen vier Vertrauensstufen zu:

| Stufe | Bedeutung |
|---|---|
| A | amtlicher Gesetzestext, EU-Recht oder zuständige Behörde |
| B | offizielles Fachportal oder Verwaltungshinweis |
| C | Fachliteratur, seriöse Expertise oder eigene Lernunterlage |
| D | ungeprüfter Hinweis, nicht als Entscheidungsgrundlage verwenden |

Die bereitgestellten PDF-/DOCX-Unterlagen wurden als Sekundärquellen
ausgewertet. Amtliche Quellen haben Vorrang. Besonders wichtig ist der
GEAS-Stichtag **12. Juni 2026**: § 3 AsylG verweist nun für internationalen
Schutz auf die Verordnung (EU) 2024/1347; § 4 AsylG ist weggefallen. Ältere
Darstellungen werden deshalb nicht ungeprüft übernommen.

## Premium-Funktionsumfang

### Lerncockpit

- gewichteter Gesamtfortschritt
- Akademie-Fortschritt mit vertieften Modulen
- persönlicher Lerncoach aus den letzten Fallversuchen
- Fehler-Tagebuch mit wiederkehrenden Schwächen
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

- exakt 100 anonymisierte Übungsfälle
- drei vollständige Musterbeispiele mit typischer Fehlentscheidung,
  korrekter Entscheidung und Entscheidungsprotokoll
- Aktenzeichen und verwaltungsähnlicher Aktenkopf
- Personendaten, Sachverhalt und Aktenbestand
- Risikoampel pro Fallakte
- Entscheidungsprotokoll mit Status, Rechtsgrundlage, Zuständigkeit,
  Priorität, Risiko, Endentscheidung und nächstem Schritt
- einheitliches Prüfraster:

```text
Status → Rechtsgrundlage → Zuständigkeit → Risiko → Entscheidung → Begründung
```

- Auswahlfelder für Status, Rechtsgrundlage, Zuständigkeit, Leistung,
  Erwerbstätigkeit, Priorität, Risiko und Endentscheidung
- Eingabefelder für fehlende Unterlagen, nächsten Schritt, Aktennotiz und
  Behörden-E-Mail
- transparente Bewertung in fünf Kriterien mit je 20 Punkten
- Versuchshistorie und persönlicher Bestwert
- kriteriumsbezogenes Feedback mit detaillierter Fehleranalyse
- Vergleich: eigene Auswahl, Musterlösung, Korrektheit und ausführliche
  Begründung, warum eine Entscheidung nicht passt
- Musterlösung, Begründung und typische Fehler
- konkrete Lernhinweise für Anfänger
- passende Fachbegriffe zu jeder einzelnen Fallakte
- mobiler Fünf-Schritte-Assistent für Akte, Einordnung, Prüfung, Kommunikation und Feedback

Verteilung der Fallakten:

| Bereich | Fälle |
|---|---:|
| Ausländerbehörde | mindestens 20 |
| Jobcenter / SGB II | mindestens 20 |
| Integration und Sprachförderung | mindestens 15 |
| Migrationsberatung | mindestens 15 |
| Gemischte Prüfungsfälle | mindestens 15 |

### Weitere Lernwerkzeuge

- PWA-Vorbereitung: installierbar auf Handy ohne App Store
- App-Manifest, Icon, Service Worker und Offline-Grundcache
- Paragraphen-Kommentar mit Normstruktur, Auslegung, Praxis, Checklisten,
  Lernfragen und Fallbezug
- vollständige Akademie mit 18 vertieften Modulen
- fünf Lernpfade für verschiedene Rollen und Lernziele
- vier Expertenschemata mit Nachweisen, Warnhinweisen und Entscheidungsnotiz
- fünf Entscheidungsbäume mit Ja/Nein/Unklar-Logik und Red Flags
- vier zusätzliche Premium-Fallakten mit 100-Punkte-Bewertung
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
- Progressive Web App (PWA) mit Manifest und Service Worker
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
- persönlicher Lerncoach mit Fehler-Tagebuch
- installierbare Handy-App/PWA ohne App Store
- Akademie mit Lernpfaden, Vertiefungsmodulen und Premium-Fallakten
- strukturierter Sechs-Wochen-Lernplan
- Prüfschemata und Entscheidungsbäume für typische Verwaltungsfragen
- Falltrainer mit 100 fiktiven Verwaltungsfällen und Bewertung bis 100 Punkte
- detaillierte Fehlerdiagnose nach jeder Fallentscheidung
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
4. Wählen Sie Status, Rechtsgrundlage, Zuständigkeit, Leistung, Arbeit,
   Priorität, Risiko und Endentscheidung.
5. Senden Sie Ihre Bearbeitung zur Bewertung ab.
6. Vergleichen Sie Punktzahl, Kriterienfeedback, Musterlösung, typische Fehler
   und Ihre persönliche Fehleranalyse.

Der persönliche Bestwert und alle Versuche werden automatisch gespeichert.
Die Fälle enthalten ausschließlich fiktive Übungsdaten; auch in Freitextfeldern
sollten keine echten personenbezogenen Daten verwendet werden.

### 4a. Wie funktioniert der Lerncoach?

Der Lerncoach wertet die letzten Fallversuche lokal im Browser aus. Er erkennt,
ob Fehler häufiger in diesen Bereichen entstehen:

- Status und Rechtsgrundlage
- Zuständigkeit, Leistung und Priorität
- Unterlagen und Sachverhalt
- Endentscheidung und nächster Schritt
- Risiko und Behördenkommunikation

Danach empfiehlt die App automatisch den passenden Lernbereich. Die Auswertung
passiert lokal aus Ihrem Lernstand und sendet keine Daten an einen Server.

### 4b. Wie installiere ich die App auf dem Handy?

Die App ist als PWA vorbereitet.

Auf dem iPhone:

1. Webseite in Safari öffnen.
2. Teilen-Symbol antippen.
3. **Zum Home-Bildschirm** wählen.
4. App-Namen bestätigen.

Auf Android:

1. Webseite in Chrome öffnen.
2. Drei-Punkte-Menü öffnen.
3. **App installieren** oder **Zum Startbildschirm hinzufügen** wählen.

Der Lernstand bleibt im Browser-/App-Speicher des jeweiligen Geräts.

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
- `solution`: Status, Rechtsgrundlage, Zuständigkeit, Leistung,
  Erwerbstätigkeit, Priorität, Risiko, Endentscheidung, fehlende Unterlagen,
  nächster Schritt und Begründung
- optional `terms`: passende Fachbegriffe

`id`, laufende Fallnummer, Antwortoptionen und Standardtexte werden in
`src/data/cases.ts` automatisch ergänzt. Nach einer Änderung muss

```bash
npm run build
```

ausgeführt werden.

### 6. Wie kann ich später neue Akademie-Module hinzufügen?

Die tiefen Akademie-Inhalte liegen in:

```text
src/data/academyContent.ts
```

Dort können neue Inhalte ergänzt werden:

- `extendedAcademyModules`: ausführliche Lernmodule
- `learningPaths`: Lernpfade und Reihenfolge der Module
- `expertSchemes`: Prüfschemata mit Schritten, Nachweisen und Warnungen
- `decisionTrees`: Entscheidungsbäume mit Ja/Nein/Unklar-Logik
- `premiumDossiers`: besonders ausführliche Fallakten mit 100-Punkte-Raster

Wichtig: Rechtliche Inhalte müssen regelmäßig mit amtlichen Quellen geprüft
werden. Dynamische Werte wie Gehaltsschwellen, Fristen, Verfahrenshinweise oder
GEAS-Übergangsregeln sollten nie dauerhaft ungeprüft übernommen werden.

Neue Fälle müssen realistisch, vollständig fiktiv und fachlich anhand aktueller
offizieller Quellen geprüft sein.

### 7. Wie kann ich später neue Paragraphen hinzufügen?

Die Paragraphen-Kommentare liegen in:

```text
src/data/legalParagraphs.ts
```

Ein neuer Paragraph sollte als vollständiges Objekt ergänzt werden. Wichtig
sind insbesondere:

- `law`, `paragraph`, `title`, `area`
- `structure` für Absatz, Satz, Nummer oder Normkern
- `shortSummary`, `simpleExplanation`, `everydayMeaning`
- `difficultTerms`
- `purpose`, `systemPosition`, `requirements`, `legalConsequence`
- `discretion`, `interpretation`, `relationToOtherNorms`
- `commentary` mit Behördenperspektive, Beratungsperspektive und Härtefällen
- `examination` mit Prüfschritten, Dokumenten, Ablehnungsgründen und nächsten
  Schritten
- `practiceCases` für einfache und schwierige Fälle
- `learning` für Karteikarten, Quiz, offene Fragen, Lückentext und Fallprüfung

Wichtig: Wenn echter Gesetzeswortlaut übernommen wird, muss er direkt mit der
amtlichen Quelle geprüft werden. Die App enthält Lernfassungen und
Strukturhilfen; sie ersetzt keine verbindliche Rechtsberatung.

## Lokale Speicherung

Der Lernstand wird unter dem Schlüssel

```text
migration-verwaltung-progress-v1
```

in `localStorage` gespeichert. Die interne Datenstruktur besitzt eine Versionsnummer und migriert ältere gespeicherte Daten beim Laden.

Gespeichert werden:

- erledigte Tagesaufgaben
- abgeschlossene Rechtsthemen
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
