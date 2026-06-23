import type { CaseFile } from "../types";
import { additionalCases } from "./additionalCases";

const allOptions = {
  status: ["Duldung", "Aufenthaltsgestattung", "Aufenthaltserlaubnis", "Fiktionsbescheinigung", "Niederlassungserlaubnis", "EU-Freizügigkeit", "Visum / nationales Visum", "unklare gemischte Dokumentenlage"],
  authority: ["Ausländerbehörde", "Jobcenter", "Sozialamt / Leistungsbehörde AsylbLG", "BAMF", "Agentur für Arbeit", "Anerkennungsstelle / Kammer", "Auslandsvertretung", "Verwaltungsgericht / Rechtsberatung", "mehrere Stellen getrennt prüfen"],
  benefit: ["Bürgergeld grundsätzlich prüfbar", "Leistungen nach AsylbLG grundsätzlich prüfbar", "Keine Leistung ohne Einzelfallprüfung", "Arbeitslosengeld nach SGB III prüfen", "Bildungs-/Sprachförderung prüfen"],
  work: ["Grundsätzlich erlaubt; Nebenbestimmung prüfen", "Nur nach behördlicher Erlaubnis / Nebenbestimmung", "Aktuell nicht geklärt", "Keine Erwerbstätigkeit vorgesehen", "Selbstständigkeit gesondert prüfen", "BA-Zustimmung / Beschäftigungsbedingungen prüfen"],
  legalBasis: ["AufenthG – passende Spezialnorm prüfen", "AsylG / EU-Schutzrecht prüfen", "SGB II / SGB X prüfen", "AsylbLG prüfen", "SGB III / Arbeitsförderung prüfen", "Anerkennungsrecht / DeuFöV prüfen", "Familiennachzug §§ 27 ff. AufenthG prüfen", "Mehrere Rechtsgrundlagen getrennt prüfen"],
  decision: ["Bewilligung / Erteilung fachlich naheliegend", "Ablehnung fachlich naheliegend", "Weitere Prüfung / Nachforderung vor Entscheidung", "Unzuständigkeit feststellen und weiterleiten", "Frist sichern und Eilprüfung veranlassen", "Verweis an Fachberatung / Rechtsberatung erforderlich"],
  risk: ["geringes Risiko bei vollständiger Akte", "Frist oder Rechtsverlust möglich", "Arbeitsaufnahme ohne Erlaubnis riskant", "Leistungsunterbrechung / existenzielles Risiko", "Aufenthaltsbeendigung oder Sperre möglich", "Datenschutz / Beratungsgrenze beachten"],
  priority: ["Sofort: Frist oder existenzielles Risiko", "hoch: fehlende Nachweise zeitnah anfordern", "normal: reguläre Sachprüfung", "zuerst Zuständigkeit klären", "zuerst Status und Nebenbestimmung klären", "zuerst Sicherheit / Krise stabilisieren"],
};

type Draft = Omit<CaseFile, "id" | "number" | "options" | "solution" | "terms"> & {
  terms?: string[];
  solution: Omit<CaseFile["solution"], "note" | "email" | "mistakes" | "learningTip" | "legalBasis" | "decision" | "risk" | "priority"> & Partial<Pick<CaseFile["solution"], "note" | "email" | "mistakes" | "learningTip" | "legalBasis" | "decision" | "risk" | "priority">>;
};

const categoryTerms: Record<CaseFile["category"], string[]> = {
  Ausländerbehörde: ["Aufenthaltsstatus", "Nebenbestimmung", "Identitätsklärung", "Mitwirkung", "Frist"],
  Jobcenter: ["Leistungsberechtigung", "Bedarfsgemeinschaft", "Mitwirkung", "Einkommen", "Verwaltungsakt"],
  Integration: ["Sprachförderkette", "Anerkennung", "Qualifizierung", "Kooperationsplan", "Arbeitsmarktintegration"],
  Migrationsberatung: ["Clearing", "Fristenprüfung", "Verweisberatung", "Datenschutz", "Hilfe zur Selbsthilfe"],
  Abschluss: ["Fallanalyse", "Zuständigkeit", "Aktenlage", "Priorisierung", "Behördenkommunikation"],
};

const makeCase = (draft: Draft, index: number): CaseFile => ({
  ...draft,
  id: `case-${index + 1}`,
  number: index + 1,
  terms: draft.terms ?? categoryTerms[draft.category],
  options: allOptions,
  solution: {
    ...draft.solution,
    legalBasis: draft.solution.legalBasis ?? (
      draft.category === "Jobcenter" ? "SGB II / SGB X prüfen"
        : draft.category === "Integration" ? "Anerkennungsrecht / DeuFöV prüfen"
          : draft.category === "Migrationsberatung" ? "Mehrere Rechtsgrundlagen getrennt prüfen"
            : draft.category === "Abschluss" ? "Mehrere Rechtsgrundlagen getrennt prüfen"
              : draft.person.status === "Aufenthaltsgestattung" ? "AsylG / EU-Schutzrecht prüfen"
                : draft.person.status === "Duldung" ? "AufenthG – passende Spezialnorm prüfen"
                  : "AufenthG – passende Spezialnorm prüfen"
    ),
    decision: draft.solution.decision ?? "Weitere Prüfung / Nachforderung vor Entscheidung",
    risk: draft.solution.risk ?? (
      draft.facts.toLowerCase().includes("frist") || draft.person.issue.toLowerCase().includes("läuft") ? "Frist oder Rechtsverlust möglich"
        : draft.category === "Migrationsberatung" && draft.facts.toLowerCase().includes("krise") ? "Datenschutz / Beratungsgrenze beachten"
          : draft.solution.work.includes("Nur nach") ? "Arbeitsaufnahme ohne Erlaubnis riskant"
            : "geringes Risiko bei vollständiger Akte"
    ),
    priority: draft.solution.priority ?? (
      draft.facts.toLowerCase().includes("frist") || draft.person.issue.toLowerCase().includes("läuft") ? "Sofort: Frist oder existenzielles Risiko"
        : draft.solution.work.includes("Nur nach") ? "zuerst Status und Nebenbestimmung klären"
          : draft.category === "Migrationsberatung" && draft.facts.toLowerCase().includes("krise") ? "zuerst Sicherheit / Krise stabilisieren"
            : "hoch: fehlende Nachweise zeitnah anfordern"
    ),
    note: draft.solution.note ?? `Anliegen geklärt. Status und Dokumente wurden geprüft. Zuständigkeit: ${draft.solution.authority}. Nächster Schritt: ${draft.solution.nextStep}`,
    email: draft.solution.email ?? `Sehr geehrte Damen und Herren,\n\nbitte prüfen Sie den dargestellten Sachverhalt. Die vorhandenen Unterlagen sind beigefügt. Bitte teilen Sie mit, welche weiteren Nachweise erforderlich sind.\n\nMit freundlichen Grüßen`,
    mistakes: draft.solution.mistakes ?? ["Nur auf die mündliche Schilderung vertrauen", "Frist oder Nebenbestimmung übersehen", "Eine Leistung ohne Einzelfallprüfung zusagen"],
    learningTip: draft.solution.learningTip ?? "Lesen Sie zuerst Dokument, Gültigkeit und Nebenbestimmung. Ordnen Sie erst danach Leistung und nächsten Schritt zu.",
  },
});

const generatedCaseBlueprints = [
  ["Ausländerbehörde", "mittel", 1, "Amira Haddad", "Libanon", "Aufenthaltserlaubnis", "Titel läuft ab und Arbeitgeberwechsel", "Amira hat den Arbeitgeber gewechselt. Der neue Vertrag beginnt in drei Wochen; die Verlängerung ist noch nicht beantragt.", ["Aufenthaltstitel", "Arbeitsvertrag", "Pass", "alte Lohnabrechnungen"], "Welche Frist-, Zweck- und Beschäftigungsfragen sind vor Arbeitsbeginn zu klären?", "AufenthG – passende Spezialnorm prüfen", "Frist sichern und Eilprüfung veranlassen"],
  ["Ausländerbehörde", "schwer", 2, "Jamal Osman", "Somalia", "Duldung", "fehlender Pass und Ausbildungsplatz", "Jamal hat einen Ausbildungsvertrag, aber seine Identitätsklärung ist nur teilweise dokumentiert.", ["Duldung", "Ausbildungsvertrag", "Botschaftskorrespondenz"], "Welche Mitwirkungs- und Beschäftigungsfragen müssen zuerst geprüft werden?", "AufenthG – passende Spezialnorm prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Ausländerbehörde", "mittel", 1, "Valeria Rusu", "Moldau", "Aufenthaltserlaubnis", "möchte selbstständig arbeiten", "Valeria arbeitet angestellt und möchte zusätzlich ein Gewerbe anmelden. Die Nebenbestimmung erwähnt nur Beschäftigung.", ["Aufenthaltstitel", "Zusatzblatt", "Gewerbekonzept"], "Ist die geplante Selbstständigkeit vom Titel umfasst?", "AufenthG – passende Spezialnorm prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Ausländerbehörde", "schwer", 2, "Hassan N.", "Irak", "Fiktionsbescheinigung", "Familiennachzug und unklare Fortgeltung", "Hassan hat rechtzeitig verlängert. Gleichzeitig läuft ein Antrag auf Nachzug seiner Ehefrau.", ["Fiktionsbescheinigung", "alter Titel", "Heiratsurkunde", "BAMF-Bescheid"], "Welche Wirkungen und Nachzugsvoraussetzungen sind getrennt zu prüfen?", "Familiennachzug §§ 27 ff. AufenthG prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Ausländerbehörde", "mittel", 2, "Ibrahim T.", "Gambia", "Aufenthaltserlaubnis", "Pass läuft während Verlängerung ab", "Ibrahims Pass läuft in zwei Monaten ab. Er beantragt dennoch Verlängerung und hat einen Botschaftstermin.", ["Pass", "Aufenthaltstitel", "Terminbestätigung"], "Wie sind Passpflicht, Mitwirkung und Verlängerung zu dokumentieren?", "AufenthG – passende Spezialnorm prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Ausländerbehörde", "leicht", 1, "Ana Silva", "Brasilien", "Niederlassungserlaubnis", "längerer Auslandsaufenthalt", "Ana möchte neun Monate im Ausland bleiben und fragt nach Folgen für ihren Titel.", ["Niederlassungserlaubnis", "Reiseplanung"], "Was muss vor Ausreise schriftlich geklärt werden?", "AufenthG – passende Spezialnorm prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Ausländerbehörde", "schwer", 2, "Mahdi R.", "Iran", "Aufenthaltserlaubnis", "Straftat im Verlängerungsverfahren", "Mahdi legt einen Verlängerungsantrag vor. In der Akte befindet sich ein aktueller Strafbefehl.", ["Aufenthaltstitel", "Strafbefehl", "Arbeitsvertrag"], "Welche Sicherheits- und Ausweisungsfragen sind zu prüfen?", "AufenthG – passende Spezialnorm prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Ausländerbehörde", "mittel", 1, "Oksana P.", "Ukraine", "Aufenthaltserlaubnis", "Wohnsitzauflage und Umzug", "Oksana möchte wegen einer Arbeitsstelle in ein anderes Bundesland ziehen. Eine Wohnsitzauflage ist eingetragen.", ["Aufenthaltstitel", "Zusatzblatt", "Arbeitsangebot"], "Welche Reihenfolge ist vor dem Umzug einzuhalten?", "AufenthG – passende Spezialnorm prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Jobcenter", "mittel", 3, "Noor Alami", "Marokko", "Aufenthaltserlaubnis", "schwankendes Einkommen und Bürgergeld", "Noor hat wechselnde Schichten. Lohnzuflüsse unterscheiden sich von den Abrechnungen.", ["Lohnabrechnungen", "Kontoauszüge", "Bewilligungsbescheid"], "Wie werden Zufluss, Freibeträge und vorläufige Berechnung geprüft?", "SGB II / SGB X prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Jobcenter", "leicht", 3, "Petro Danylo", "Ukraine", "Aufenthaltserlaubnis", "Weiterbewilligung zu spät", "Petro stellt erst nach Ende des Bewilligungszeitraums fest, dass kein Geld eingegangen ist.", ["alter Bescheid", "Kontoauszug", "Weiterbewilligungsformular"], "Was ist sofort zu tun und welche Monate sind betroffen?", "SGB II / SGB X prüfen", "Frist sichern und Eilprüfung veranlassen"],
  ["Jobcenter", "schwer", 3, "Selma B.", "Bosnien", "EU-Freizügigkeit", "unklarer Freizügigkeitsgrund", "Selma lebt mit ihrem Partner zusammen. Ihre letzte Beschäftigung endete vor drei Monaten.", ["Meldebescheinigung", "Kündigung", "Arbeitsvertrag"], "Welche aufenthalts- und leistungsrechtlichen Tatsachen sind entscheidend?", "SGB II / SGB X prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Jobcenter", "mittel", 3, "Farid Q.", "Afghanistan", "Aufenthaltserlaubnis", "Umzug ohne Zusicherung", "Farid hat einen neuen Mietvertrag bereits unterschrieben. Die Miete liegt über dem bisherigen Betrag.", ["neuer Mietvertrag", "alter Mietvertrag", "Bescheid"], "Welche Folgen hat der unterschriebene Vertrag für Unterkunftskosten?", "SGB II / SGB X prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Jobcenter", "mittel", 3, "Marta Ionescu", "Rumänien", "EU-Freizügigkeit", "Kindergeld und Teilzeitjob", "Marta erhält Kindergeld, arbeitet Teilzeit und beantragt ergänzend Bürgergeld.", ["Arbeitsvertrag", "Kindergeldbescheid", "Kontoauszüge"], "Wie werden Einkommen, Kindergeld und Bedarfsgemeinschaft eingeordnet?", "SGB II / SGB X prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Jobcenter", "schwer", 3, "Rami Khalil", "Syrien", "Aufenthaltserlaubnis", "Selbstständigkeit mit Verlust", "Rami betreibt ein Kleingewerbe. Einnahmen und Ausgaben sind unsortiert.", ["EKS", "Geschäftskonto", "Quittungen"], "Wie wird das Einkommen aus Selbstständigkeit vorläufig geprüft?", "SGB II / SGB X prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Jobcenter", "leicht", 3, "Amina W.", "Eritrea", "Aufenthaltserlaubnis", "Mehrbedarf Schwangerschaft", "Amina ist schwanger und fragt, ob sie zusätzliche Leistungen erhalten kann.", ["Mutterpass", "Bescheid", "Mietvertrag"], "Welche Bedarfe und Nachweise sind zu prüfen?", "SGB II / SGB X prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Jobcenter", "mittel", 3, "Viktor L.", "Ukraine", "Aufenthaltserlaubnis", "Nebenkostenrückzahlung", "Viktor erhält eine Betriebskostenrückzahlung und weiß nicht, ob er sie melden muss.", ["Abrechnung", "Kontoauszug", "Bescheid"], "Wie wird die Rückzahlung leistungsrechtlich eingeordnet?", "SGB II / SGB X prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Integration", "mittel", 4, "Sofia Chen", "China", "Aufenthaltserlaubnis", "Anerkennung Pflegeabschluss", "Sofia hat Pflegeerfahrung, aber unvollständige Ausbildungsnachweise.", ["Diplom", "Arbeitszeugnisse", "B1-Zertifikat"], "Wie wird ein realistischer Anerkennungs- und Sprachplan erstellt?", "Anerkennungsrecht / DeuFöV prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Integration", "schwer", 4, "Khalil B.", "Syrien", "Aufenthaltserlaubnis", "Kursabbrüche wegen Trauma", "Khalil bricht wiederholt Kurse ab und berichtet von Schlafproblemen.", ["Kursbescheinigungen", "Arzttermin", "Jobcenter-Schreiben"], "Wie werden Sprachförderung und gesundheitliche Stabilisierung verbunden?", "Anerkennungsrecht / DeuFöV prüfen", "Verweis an Fachberatung / Rechtsberatung erforderlich"],
  ["Integration", "leicht", 4, "Elena V.", "Ukraine", "Aufenthaltserlaubnis", "Berufssprachkurs B2", "Elena hat B1 bestanden und möchte in den medizinischen Bereich wechseln.", ["B1-Zertifikat", "Lebenslauf", "Kursangebot"], "Welche nächsten Sprach- und Berufsorientierungsschritte passen?", "Anerkennungsrecht / DeuFöV prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Integration", "mittel", 4, "Yasin K.", "Türkei", "Aufenthaltserlaubnis", "Ausbildung oder Helferjob", "Yasin kann sofort arbeiten, möchte aber langfristig einen Berufsabschluss.", ["Schulzeugnis", "Jobangebot", "B1-Zertifikat"], "Wie wird zwischen schneller Arbeit und nachhaltiger Ausbildung abgewogen?", "SGB III / Arbeitsförderung prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Integration", "schwer", 4, "Mariam A.", "Äthiopien", "Aufenthaltserlaubnis", "Kinderbetreuung blockiert Kurs", "Mariam kann wegen Kita-Zeiten keinen Vollzeitkurs besuchen.", ["Kita-Bescheinigung", "Kursangebot", "Bescheid"], "Welche Kursform und Unterstützung sind realistisch?", "Anerkennungsrecht / DeuFöV prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Integration", "mittel", 4, "Dmytro S.", "Ukraine", "Aufenthaltserlaubnis", "Meisterqualifikation unklar", "Dmytro war Handwerker, kennt aber die zuständige Kammer nicht.", ["Arbeitszeugnisse", "Diplom", "Lebenslauf"], "Wie wird der Referenzberuf und die Anerkennungsstelle bestimmt?", "Anerkennungsrecht / DeuFöV prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Integration", "leicht", 4, "Lina M.", "Marokko", "Aufenthaltserlaubnis", "Praktikum zur Orientierung", "Lina möchte ein Praktikum im Büro machen und fragt nach Förderung.", ["Lebenslauf", "Praktikumsangebot", "Sprachzertifikat"], "Welche Ziele und Rahmenbedingungen sind vorher zu klären?", "SGB III / Arbeitsförderung prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Integration", "mittel", 4, "Artem H.", "Ukraine", "Aufenthaltserlaubnis", "IT-Kurs ohne Arbeitsmarktbezug", "Artem möchte einen teuren Online-Kurs, hat aber kein klares Berufsziel.", ["Kursangebot", "Lebenslauf", "Bescheid"], "Wie wird die Eignung der Maßnahme geprüft?", "SGB III / Arbeitsförderung prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Migrationsberatung", "mittel", 5, "Rana H.", "Irak", "Aufenthaltserlaubnis", "drei Behördenbriefe mit Fristen", "Rana bringt Briefe von Ausländerbehörde, Jobcenter und Familienkasse. Zwei Fristen laufen in derselben Woche.", ["Behördenschreiben", "Umschläge", "Aufenthaltstitel"], "Wie wird die Fristenmatrix erstellt?", "Mehrere Rechtsgrundlagen getrennt prüfen", "Frist sichern und Eilprüfung veranlassen"],
  ["Migrationsberatung", "schwer", 5, "Samuel O.", "Nigeria", "Duldung", "Wohnungsverlust und Krise", "Samuel hat Mietschulden, wirkt psychisch stark belastet und öffnet Behördenpost nicht mehr.", ["Mahnung", "Duldung", "ungeöffnete Post"], "Welche Sicherheits- und Weiterleitungsschritte haben Vorrang?", "Mehrere Rechtsgrundlagen getrennt prüfen", "Verweis an Fachberatung / Rechtsberatung erforderlich"],
  ["Migrationsberatung", "leicht", 5, "Nesrin Y.", "Türkei", "Aufenthaltserlaubnis", "möchte Termin selbst führen", "Nesrin will den nächsten Behördentermin ohne Begleitung wahrnehmen.", ["Terminbestätigung", "Aufenthaltstitel", "Fragenliste"], "Wie wird Hilfe zur Selbsthilfe konkret vorbereitet?", "Mehrere Rechtsgrundlagen getrennt prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Migrationsberatung", "mittel", 5, "Hassan D.", "Libanon", "Niederlassungserlaubnis", "digitale Weiterbewilligung", "Hassan hat keinen Scanner und möchte seine Zugangsdaten an die Beratung geben.", ["Bescheid", "Papierunterlagen", "Ausweis"], "Wie werden Datenschutz und digitale Hilfe sauber getrennt?", "Mehrere Rechtsgrundlagen getrennt prüfen", "Verweis an Fachberatung / Rechtsberatung erforderlich"],
  ["Migrationsberatung", "schwer", 5, "Zahra M.", "Afghanistan", "Aufenthaltserlaubnis", "Familiennachzug mit Frist", "Zahra hat eine E-Mail der Botschaft, versteht aber die Dokumentenanforderungen nicht.", ["E-Mail", "BAMF-Bescheid", "Familienunterlagen"], "Was kann Beratung leisten und wann muss weiterverwiesen werden?", "Familiennachzug §§ 27 ff. AufenthG prüfen", "Verweis an Fachberatung / Rechtsberatung erforderlich"],
  ["Migrationsberatung", "mittel", 5, "Omar B.", "Syrien", "Aufenthaltserlaubnis", "Schulden und Jobcenter-Sanktion", "Omar hat Mahnungen und ein Anhörungsschreiben wegen versäumtem Termin.", ["Mahnung", "Anhörung", "Bescheid"], "Welche Frist und welche Fachstelle sind zuerst wichtig?", "Mehrere Rechtsgrundlagen getrennt prüfen", "Frist sichern und Eilprüfung veranlassen"],
  ["Migrationsberatung", "leicht", 5, "Iryna Z.", "Ukraine", "Aufenthaltserlaubnis", "Kita, Sprachkurs und Briefe", "Iryna versteht den Sprachkursträgerbrief nicht und hat Betreuungsprobleme.", ["Kursbrief", "Kita-Bescheinigung", "Jobcenter-Brief"], "Wie wird der Brief in einfache nächste Schritte übersetzt?", "Mehrere Rechtsgrundlagen getrennt prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Migrationsberatung", "schwer", 5, "Bekele T.", "Äthiopien", "Aufenthaltsgestattung", "BAMF-Bescheid zugestellt", "Bekele bringt einen ablehnenden Bescheid mit. Der Zustellumschlag liegt vor.", ["BAMF-Bescheid", "Umschlag", "Aufenthaltsgestattung"], "Welche Fristensicherung ist sofort erforderlich?", "AsylG / EU-Schutzrecht prüfen", "Verweis an Fachberatung / Rechtsberatung erforderlich"],
  ["Abschluss", "schwer", 6, "Familie Yildiz", "Türkei", "gemischte Dokumentenlage", "Aufenthalt, Schule und Bürgergeld", "Die Mutter hat eine Aufenthaltserlaubnis, der Sohn eine Fiktionsbescheinigung. Ein Jobcenter-Brief setzt Frist.", ["Titel", "Fiktionsbescheinigung", "Schulbescheinigung", "Jobcenter-Brief"], "Wie werden Personen, Fristen und Zuständigkeiten getrennt?", "Mehrere Rechtsgrundlagen getrennt prüfen", "Frist sichern und Eilprüfung veranlassen"],
  ["Abschluss", "schwer", 6, "Daniel K.", "Ghana", "Duldung", "Jobangebot und AsylbLG", "Daniel hat ein Jobangebot, aber seine Duldung enthält keine klare Arbeitserlaubnis.", ["Duldung", "Jobangebot", "Leistungsbescheid"], "Welche falschen Automatismen müssen vermieden werden?", "Mehrere Rechtsgrundlagen getrennt prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Abschluss", "schwer", 6, "Leila S.", "Iran", "Aufenthaltserlaubnis", "Anerkennung, Kinderbetreuung und Minijob", "Leila möchte Ingenieurin werden, arbeitet im Minijob und hat nur Vormittagsbetreuung.", ["Diplom", "Lohnabrechnung", "Kita-Nachweis"], "Wie entsteht ein realistischer Integrationsplan?", "Mehrere Rechtsgrundlagen getrennt prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Abschluss", "schwer", 6, "Oleh K.", "Ukraine", "Aufenthaltserlaubnis", "Selbstständigkeit und Bürgergeld", "Oleh möchte ein Gewerbe anmelden und erhält ergänzend Bürgergeld.", ["Aufenthaltstitel", "Zusatzblatt", "Businessplan", "Bescheid"], "Welche Prüfungen kommen vor der Gründung?", "Mehrere Rechtsgrundlagen getrennt prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Abschluss", "schwer", 6, "Huda N.", "Syrien", "Aufenthaltserlaubnis", "Trennung und Wohnungssicherung", "Huda trennt sich, die Wohnung ist zu teuer und der Titel läuft bald ab.", ["Aufenthaltstitel", "Mietvertrag", "Trennungsnachweis", "Bescheid"], "Welche Risiken müssen parallel priorisiert werden?", "Mehrere Rechtsgrundlagen getrennt prüfen", "Frist sichern und Eilprüfung veranlassen"],
  ["Abschluss", "schwer", 6, "Nadia E.", "Eritrea", "Niederlassungserlaubnis", "Pflege, Gesundheit und Arbeitslosigkeit", "Nadia pflegt ihre Mutter, hat gesundheitliche Beschwerden und beantragt Bürgergeld.", ["Kündigung", "Pflegeunterlagen", "Arztbericht"], "Wie werden Leistungsfähigkeit und Zumutbarkeit geprüft?", "Mehrere Rechtsgrundlagen getrennt prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Abschluss", "schwer", 6, "Arman P.", "Armenien", "Duldung", "Ausbildung, Identität und Schulden", "Arman hat einen Ausbildungsplatz, Schulden und unvollständige Identitätsnachweise.", ["Duldung", "Ausbildungsvertrag", "Mahnungen", "Identitätskopien"], "Welche Reihenfolge schützt Aufenthalt und Stabilisierung?", "Mehrere Rechtsgrundlagen getrennt prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
  ["Abschluss", "schwer", 6, "Irina M.", "Moldau", "Aufenthaltserlaubnis", "Pflegeanerkennung und ergänzende Leistungen", "Irina arbeitet als Pflegehilfskraft und möchte ihren Abschluss anerkennen lassen.", ["Aufenthaltstitel", "Arbeitsvertrag", "Diplom", "Bescheid"], "Wie werden Einkommen, Anerkennung und Förderung verbunden?", "Mehrere Rechtsgrundlagen getrennt prüfen", "Weitere Prüfung / Nachforderung vor Entscheidung"],
] as const;

const generatedCases: Draft[] = generatedCaseBlueprints.map(([category, difficulty, week, name, country, status, issue, facts, documents, question, legalBasis, decision], index) => ({
  category: category as CaseFile["category"],
  difficulty: difficulty as CaseFile["difficulty"],
  week: week as number,
  person: {
    name,
    age: 22 + (index % 31),
    country,
    family: index % 3 === 0 ? "verheiratet" : index % 3 === 1 ? "ledig" : "alleinerziehend / Familie im Haushalt",
    language: index % 4 === 0 ? "Deutsch A2" : index % 4 === 1 ? "Deutsch B1" : index % 4 === 2 ? "Deutsch B2" : "Deutsch C1",
    status,
    authority: category === "Jobcenter" ? "Jobcenter" : category === "Integration" ? "Jobcenter" : category === "Migrationsberatung" ? "Beratungsstelle / mehrere Stellen" : category === "Abschluss" ? "mehrere Stellen" : "Ausländerbehörde",
    issue,
  },
  facts,
  documents: [...documents],
  question,
  terms: categoryTerms[category as CaseFile["category"]],
  solution: {
    status: status === "gemischte Dokumentenlage" ? "Fiktionsbescheinigung" : status,
    authority: category === "Jobcenter" ? "Jobcenter" : category === "Integration" ? "Anerkennungsstelle / Kammer" : category === "Migrationsberatung" ? "Ausländerbehörde" : category === "Abschluss" ? "mehrere Stellen getrennt prüfen" : "Ausländerbehörde",
    benefit: category === "Jobcenter" || category === "Abschluss" ? "Bürgergeld grundsätzlich prüfbar" : status === "Duldung" || status === "Aufenthaltsgestattung" ? "Leistungen nach AsylbLG grundsätzlich prüfbar" : category === "Integration" ? "Bildungs-/Sprachförderung prüfen" : "Keine Leistung ohne Einzelfallprüfung",
    work: status === "Duldung" || status === "Aufenthaltsgestattung" ? "Nur nach behördlicher Erlaubnis / Nebenbestimmung" : issue.toLowerCase().includes("selbst") ? "Selbstständigkeit gesondert prüfen" : "Grundsätzlich erlaubt; Nebenbestimmung prüfen",
    legalBasis,
    decision,
    risk: decision === "Frist sichern und Eilprüfung veranlassen" ? "Frist oder Rechtsverlust möglich" : status === "Duldung" || status === "Aufenthaltsgestattung" ? "Arbeitsaufnahme ohne Erlaubnis riskant" : category === "Jobcenter" ? "Leistungsunterbrechung / existenzielles Risiko" : "geringes Risiko bei vollständiger Akte",
    priority: decision === "Frist sichern und Eilprüfung veranlassen" ? "Sofort: Frist oder existenzielles Risiko" : status === "Duldung" ? "zuerst Status und Nebenbestimmung klären" : "hoch: fehlende Nachweise zeitnah anfordern",
    missing: ["vollständige Dokumente", "Rechtsgrundlage und Nebenbestimmung", "aktuelle Nachweise zum konkreten Anliegen"],
    nextStep: "Sachverhalt nach Personen, Zuständigkeit, Frist und Nachweisen ordnen; fehlende Unterlagen konkret anfordern und keine verbindliche Zusage vor Abschluss der Prüfung machen.",
    reasoning: "Der Fall darf nicht über eine einzelne Information entschieden werden. Entscheidend sind Status, zuständige Stelle, Rechtsgrundlage, Frist, Nachweise und die passende nächste Handlung.",
    mistakes: ["nur nach Bauchgefühl entscheiden", "Zuständigkeit und Rechtsgrundlagen vermischen", "eine Bewilligung oder Ablehnung ohne vollständige Nachweise formulieren"],
    learningTip: "Bei komplexen Fällen zuerst sortieren: Person, Status, Frist, Rechtsgebiet, Nachweise, Entscheidung.",
  },
}));

const drafts: Draft[] = [
  {
    category: "Ausländerbehörde", difficulty: "mittel", week: 1,
    person: { name: "Ahmad Rahimi", age: 21, country: "Afghanistan", family: "ledig", language: "Deutsch A2", status: "Duldung", authority: "Ausländerbehörde", issue: "möchte eine Ausbildung beginnen" },
    facts: "Ahmad hat einen unterschriebenen Ausbildungsvertrag. Auf seiner Duldung steht keine eindeutige Beschäftigungserlaubnis. Einen gültigen Pass besitzt er nicht; Nachweise zu Bemühungen um Identitätsklärung sind teilweise vorhanden.",
    documents: ["Duldung", "Ausbildungsvertrag", "Schulzeugnis", "einige Identitätsnachweise"],
    question: "Welche Stelle muss vor Ausbildungsbeginn prüfen und welche Unterlagen fehlen?",
    solution: { status: "Duldung", authority: "Ausländerbehörde", benefit: "Leistungen nach AsylbLG grundsätzlich prüfbar", work: "Nur nach behördlicher Erlaubnis / Nebenbestimmung", missing: ["vollständige Identitätsnachweise", "Nachweise zur Passbeschaffung", "aktuelle Nebenbestimmung"], nextStep: "Beschäftigungserlaubnis und mögliche aufenthaltsrechtliche Perspektive bei der Ausländerbehörde prüfen lassen.", reasoning: "Die Duldung ist kein Aufenthaltstitel. Ausbildung und Beschäftigung dürfen nicht ohne Prüfung der Nebenbestimmung begonnen werden." },
  },
  {
    category: "Ausländerbehörde", difficulty: "mittel", week: 1,
    person: { name: "Mina Karimi", age: 34, country: "Iran", family: "verheiratet", language: "Deutsch B2", status: "Fiktionsbescheinigung", authority: "Ausländerbehörde", issue: "fragt, ob sie weiterarbeiten darf" },
    facts: "Mina hat vor Ablauf ihrer Aufenthaltserlaubnis einen Verlängerungsantrag gestellt. Die Fiktionsbescheinigung und der alte Titel liegen vor. Ihr Arbeitgeber verlangt eine schriftliche Bestätigung.",
    documents: ["Fiktionsbescheinigung", "abgelaufene Aufenthaltserlaubnis", "Arbeitsvertrag"],
    question: "Wie wird die Fortgeltung der bisherigen Arbeitserlaubnis geprüft?",
    solution: { status: "Fiktionsbescheinigung", authority: "Ausländerbehörde", benefit: "Keine Leistung ohne Einzelfallprüfung", work: "Aktuell nicht geklärt", missing: ["Vorder- und Rückseite aller Dokumente", "genaue Rechtsgrundlage der Fiktionsbescheinigung"], nextStep: "Fiktionswirkung und Nebenbestimmung anhand der Dokumente prüfen und schriftlich bestätigen lassen.", reasoning: "Nicht jede Fiktionsbescheinigung hat dieselbe Wirkung; Ausgangstitel und bescheinigte Rechtsgrundlage sind entscheidend." },
  },
  {
    category: "Ausländerbehörde", difficulty: "leicht", week: 1,
    person: { name: "Samir Nouri", age: 28, country: "Syrien", family: "ledig", language: "Deutsch B1", status: "Aufenthaltserlaubnis", authority: "Ausländerbehörde", issue: "Titel läuft in zehn Tagen ab" },
    facts: "Samir arbeitet in Vollzeit. Er hat noch keinen Verlängerungsantrag gestellt und ist unsicher, welche Nachweise benötigt werden.",
    documents: ["Aufenthaltserlaubnis", "Arbeitsvertrag", "drei Gehaltsabrechnungen"],
    question: "Was ist wegen der kurzen Restlaufzeit zuerst zu tun?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Ausländerbehörde", benefit: "Keine Leistung ohne Einzelfallprüfung", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["gültiger Pass", "Krankenversicherungsnachweis", "Antragsformular"], nextStep: "Verlängerungsantrag unverzüglich und nachweisbar vor Ablauf stellen.", reasoning: "Die Frist ist vorrangig. Eine rechtzeitige Antragstellung kann für die Übergangswirkung entscheidend sein." },
  },
  {
    category: "Ausländerbehörde", difficulty: "mittel", week: 2,
    person: { name: "Laila Azimi", age: 46, country: "Afghanistan", family: "verwitwet", language: "Deutsch A2", status: "Aufenthaltserlaubnis nach § 22", authority: "Ausländerbehörde", issue: "fragt nach Niederlassungserlaubnis" },
    facts: "Laila lebt seit mehreren Jahren in Deutschland, bezieht ergänzende Leistungen und besucht einen Sprachkurs. Sie möchte wissen, ob sie jetzt einen unbefristeten Titel erhalten kann.",
    documents: ["Aufenthaltserlaubnis", "Leistungsbescheid", "A2-Zertifikat", "Mietvertrag"],
    question: "Welche Voraussetzungen müssen individuell geprüft werden?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Ausländerbehörde", benefit: "Bürgergeld grundsätzlich prüfbar", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["vollständiger Aufenthaltsverlauf", "Renten-/Beschäftigungsnachweise", "aktueller Sprach- und Integrationsnachweis"], nextStep: "Passende Rechtsgrundlage und sämtliche Voraussetzungen der Niederlassungserlaubnis aktuell prüfen.", reasoning: "Die Antwort folgt nicht allein aus der bisherigen Aufenthaltsdauer. Titel, Ausnahmen und weitere Voraussetzungen sind entscheidend." },
  },
  {
    category: "Ausländerbehörde", difficulty: "schwer", week: 2,
    person: { name: "Omar Darwish", age: 32, country: "Syrien", family: "verheiratet, Ehefrau im Ausland", language: "Deutsch B1", status: "Aufenthaltserlaubnis", authority: "Ausländerbehörde", issue: "möchte Ehegattennachzug" },
    facts: "Omar besitzt einen humanitären Aufenthaltstitel. Die Ehe bestand bereits vor der Flucht. Welche Erleichterungen gelten könnten, ist noch nicht geprüft.",
    documents: ["Aufenthaltstitel", "Heiratsurkunde", "Meldebescheinigung"],
    question: "Welche Angaben bestimmen den Weg des Familiennachzugs?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Ausländerbehörde", benefit: "Keine Leistung ohne Einzelfallprüfung", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["genaue Rechtsgrundlage des Titels", "BAMF-Bescheid", "Identitäts- und Personenstandsnachweise"], nextStep: "Titel der Bezugsperson, Fristen und mögliche privilegierte Voraussetzungen prüfen.", reasoning: "Beim Familiennachzug hängen Voraussetzungen und Ausnahmen wesentlich vom Schutzstatus, Zeitpunkt und Familienverhältnis ab." },
  },
  {
    category: "Ausländerbehörde", difficulty: "mittel", week: 2,
    person: { name: "Iryna Kovalenko", age: 26, country: "Ukraine", family: "ledig", language: "Deutsch B1", status: "Aufenthaltserlaubnis nach § 24", authority: "Ausländerbehörde", issue: "möchte Ausbildung beginnen" },
    facts: "Iryna hat einen Ausbildungsplatz gefunden. Ihr Aufenthaltstitel ist gültig; die Nebenbestimmung soll vor Vertragsbeginn geprüft werden.",
    documents: ["Aufenthaltstitel", "Ausbildungsvertrag", "B1-Zertifikat"],
    question: "Welche zwei Prüfungen sind vor Beginn besonders wichtig?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Ausländerbehörde", benefit: "Bürgergeld grundsätzlich prüfbar", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["vollständige Nebenbestimmung", "Nachweis Krankenversicherung"], nextStep: "Erwerbstätigkeit anhand des Dokuments bestätigen und Ausbildungsförderung mit zuständiger Stelle klären.", reasoning: "Der gültige Titel ist Ausgangspunkt; zusätzlich sind Nebenbestimmung und Wechselwirkungen mit Leistungen zu prüfen." },
  },
  {
    category: "Ausländerbehörde", difficulty: "mittel", week: 1,
    person: { name: "Tesfay Berhe", age: 39, country: "Eritrea", family: "verheiratet, zwei Kinder", language: "Deutsch A2", status: "Aufenthaltserlaubnis", authority: "Ausländerbehörde", issue: "kann keinen Nationalpass vorlegen" },
    facts: "Tesfay beantragt die Verlängerung. Er hat alte Dokumente, aber keinen gültigen Nationalpass. Seine bisherigen Bemühungen sind nicht vollständig dokumentiert.",
    documents: ["Aufenthaltserlaubnis", "alte Identitätsdokumente", "Terminbestätigung Botschaft"],
    question: "Wie ist die Pass- und Identitätsfrage sachlich zu bearbeiten?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Ausländerbehörde", benefit: "Keine Leistung ohne Einzelfallprüfung", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["chronologische Nachweise zur Passbeschaffung", "weitere Identitätsdokumente", "Begründung bei Unzumutbarkeit"], nextStep: "Mitwirkung und Zumutbarkeit konkret dokumentieren und im Verlängerungsverfahren prüfen.", reasoning: "Ein fehlender Pass führt nicht automatisch zu einer einzigen Entscheidung; Bemühungen, Identität und Zumutbarkeit müssen differenziert geprüft werden." },
  },
  {
    category: "Ausländerbehörde", difficulty: "leicht", week: 1,
    person: { name: "Nadia El Masri", age: 24, country: "Libanon", family: "ledig", language: "Deutsch C1", status: "Aufenthaltserlaubnis zum Studium", authority: "Ausländerbehörde", issue: "möchte mehr arbeiten" },
    facts: "Nadia studiert und hat ein zusätzliches Jobangebot. Sie kennt die für ihren Titel geltenden Beschäftigungsgrenzen nicht.",
    documents: ["Aufenthaltstitel", "Immatrikulationsbescheinigung", "Jobangebot"],
    question: "Was muss vor Annahme zusätzlicher Arbeit gelesen werden?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Ausländerbehörde", benefit: "Keine Leistung ohne Einzelfallprüfung", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["vollständige Nebenbestimmung", "Umfang der bisherigen Beschäftigung"], nextStep: "Zulässigen Beschäftigungsumfang nach aktueller Rechtslage und Nebenbestimmung prüfen.", reasoning: "Bei Studierenden ist Erwerbstätigkeit möglich, aber nicht grenzenlos; konkrete Regeln können sich ändern." },
  },
  {
    category: "Jobcenter", difficulty: "mittel", week: 3,
    person: { name: "Familie Hassan", age: 37, country: "Syrien", family: "Eltern und zwei Kinder", language: "Deutsch A2/B1", status: "Aufenthaltserlaubnis nach § 25 Abs. 2", authority: "Jobcenter", issue: "beantragt erstmals Bürgergeld" },
    facts: "Der Vater arbeitet geringfügig, die Mutter besucht einen Integrationskurs. Kindergeld wird gezahlt. Die Warmmiete beträgt 980 Euro.",
    documents: ["Aufenthaltstitel", "Mietvertrag", "Arbeitsvertrag", "Kindergeldnachweis"],
    question: "Welche Daten fehlen für die Prüfung der Bedarfsgemeinschaft?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Jobcenter", benefit: "Bürgergeld grundsätzlich prüfbar", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["Kontoauszüge", "aktuelle Lohnabrechnungen", "Krankenversicherung", "Nebenkostenaufstellung"], nextStep: "Vollständigen Antrag und Nachweise einreichen; Bedarf, Einkommen und Unterkunftskosten berechnen.", reasoning: "Der Status eröffnet grundsätzlich die SGB-II-Prüfung. Anspruchshöhe ergibt sich erst aus Bedarf und anrechenbaren Mitteln." },
  },
  {
    category: "Jobcenter", difficulty: "leicht", week: 3,
    person: { name: "Maryam Safi", age: 31, country: "Afghanistan", family: "alleinerziehend, ein Kind", language: "Deutsch B1", status: "Aufenthaltserlaubnis", authority: "Jobcenter", issue: "Brief wegen fehlender Unterlagen" },
    facts: "Maryam versteht die Mitwirkungsaufforderung nicht. Die Frist endet in fünf Tagen. Gefordert werden Nachweise zu Unterhalt und Kinderbetreuungskosten.",
    documents: ["Jobcenter-Schreiben", "Aufenthaltstitel", "Kontoauszüge"],
    question: "Was ist der unmittelbar nächste Schritt?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Jobcenter", benefit: "Bürgergeld grundsätzlich prüfbar", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["Unterhaltsnachweis", "Nachweis Kinderbetreuungskosten"], nextStep: "Frist sichern, Unterlagen einreichen oder begründete Fristverlängerung beantragen.", reasoning: "Die laufende Frist ist zuerst zu behandeln. Der Brief muss in konkrete, nachvollziehbare Aufgaben übersetzt werden." },
  },
  {
    category: "Jobcenter", difficulty: "mittel", week: 3,
    person: { name: "Ali Rezaei", age: 29, country: "Iran", family: "ledig", language: "Deutsch B2", status: "Aufenthaltserlaubnis", authority: "Jobcenter", issue: "hat Minijob und Bürgergeld" },
    facts: "Ali hat erstmals Lohn erhalten und die Abrechnung noch nicht eingereicht. Er möchte wissen, ob der gesamte Lohn abgezogen wird.",
    documents: ["Bewilligungsbescheid", "Arbeitsvertrag", "Lohnabrechnung"],
    question: "Welche Grundbegriffe sind für die Neuberechnung relevant?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Jobcenter", benefit: "Bürgergeld grundsätzlich prüfbar", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["Kontoauszug mit Lohnzufluss", "Angaben zu notwendigen Ausgaben"], nextStep: "Einkommenszufluss melden und Freibeträge nach aktueller Regelung berechnen lassen.", reasoning: "Erwerbseinkommen wird nicht schematisch vollständig abgezogen. Zufluss, Absetzungen und Freibeträge sind zu prüfen." },
  },
  {
    category: "Jobcenter", difficulty: "mittel", week: 3,
    person: { name: "Sofia Petrenko", age: 42, country: "Ukraine", family: "mit Tochter", language: "Deutsch A2", status: "Aufenthaltserlaubnis", authority: "Jobcenter", issue: "möchte in eine teurere Wohnung ziehen" },
    facts: "Sofia hat noch keinen neuen Mietvertrag unterschrieben. Ein Wohnungsangebot liegt vor; die neue Miete ist höher.",
    documents: ["Wohnungsangebot", "aktueller Mietvertrag", "Leistungsbescheid"],
    question: "Welche Reihenfolge schützt vor unnötigem Risiko?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Jobcenter", benefit: "Bürgergeld grundsätzlich prüfbar", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["Begründung des Umzugs", "vollständige Kostenaufstellung", "örtliche Angemessenheitswerte"], nextStep: "Vor Vertragsunterzeichnung die Zusicherung und Kostenübernahme beim Jobcenter klären.", reasoning: "Ein unterschriebener Vertrag kann Fakten schaffen, bevor die Übernahme der neuen Unterkunftskosten geklärt ist." },
  },
  {
    category: "Jobcenter", difficulty: "leicht", week: 3,
    person: { name: "Bekir Yilmaz", age: 51, country: "Türkei", family: "verheiratet", language: "Deutsch B1", status: "Niederlassungserlaubnis", authority: "Jobcenter", issue: "hat einen Termin versäumt" },
    facts: "Bekir war am Termintag krank, hat aber noch keine Bescheinigung eingereicht. Ein Anhörungsschreiben ist eingegangen.",
    documents: ["Niederlassungserlaubnis", "Anhörungsschreiben", "Arztbescheinigung"],
    question: "Wie reagiert er professionell auf die Anhörung?",
    solution: { status: "Niederlassungserlaubnis", authority: "Jobcenter", benefit: "Bürgergeld grundsätzlich prüfbar", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["fristgerechte schriftliche Stellungnahme"], nextStep: "Innerhalb der Anhörungsfrist den wichtigen Grund darlegen und Nachweis einreichen.", reasoning: "Eine Anhörung ist noch nicht die endgültige Entscheidung. Sie eröffnet die Möglichkeit, relevante Tatsachen mitzuteilen." },
  },
  {
    category: "Jobcenter", difficulty: "schwer", week: 3,
    person: { name: "Elena Markovic", age: 38, country: "Serbien", family: "lebt mit Partner", language: "Deutsch B2", status: "Aufenthaltserlaubnis", authority: "Jobcenter", issue: "unklare Bedarfsgemeinschaft" },
    facts: "Elena und ihr Partner wohnen seit acht Monaten zusammen, führen teilweise getrennte Konten und machen widersprüchliche Angaben zum gemeinsamen Wirtschaften.",
    documents: ["Mietvertrag", "Antrag", "Kontoauszüge"],
    question: "Was muss statt einer vorschnellen Einordnung ermittelt werden?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Jobcenter", benefit: "Bürgergeld grundsätzlich prüfbar", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["Angaben zum Einstehen füreinander", "Haushalts- und Finanzaufteilung", "weitere Tatsachen zur Partnerschaft"], nextStep: "Tatsächliche Lebens- und Wirtschaftsgemeinschaft ermitteln und rechtlich würdigen.", reasoning: "Gemeinsames Wohnen allein beantwortet die Frage der Bedarfsgemeinschaft nicht vollständig." },
  },
  {
    category: "Jobcenter", difficulty: "mittel", week: 3,
    person: { name: "Yusuf Saleh", age: 23, country: "Irak", family: "ledig", language: "Deutsch B1", status: "Aufenthaltserlaubnis", authority: "Jobcenter", issue: "möchte Weiterbildung" },
    facts: "Yusuf hat Berufserfahrung in der Logistik, aber keinen deutschen Abschluss. Ein Bildungsträger bietet eine sechsmonatige Qualifizierung an.",
    documents: ["Lebenslauf", "Kursangebot", "Leistungsbescheid"],
    question: "Wie wird aus dem Kurswunsch eine fachliche Förderentscheidung?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Jobcenter", benefit: "Bildungs-/Sprachförderung prüfen", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["Potenzialanalyse", "Arbeitsmarktbezug", "Kosten und Zulassung der Maßnahme"], nextStep: "Ziel, Eignung, Notwendigkeit und Fördervoraussetzungen im Beratungsgespräch prüfen.", reasoning: "Ein Kursangebot allein begründet keine Förderung. Die Maßnahme muss zum Integrationsziel und zu den Voraussetzungen passen." },
  },
  {
    category: "Jobcenter", difficulty: "mittel", week: 3,
    person: { name: "Hana Abdi", age: 35, country: "Somalia", family: "drei Kinder", language: "Deutsch A2", status: "Aufenthaltserlaubnis", authority: "Jobcenter", issue: "kann Termine wegen Betreuung nicht wahrnehmen" },
    facts: "Hana möchte arbeiten, hat aber nur für zwei Kinder einen Betreuungsplatz. Der jüngste Sohn ist zwei Jahre alt.",
    documents: ["Kooperationsplan", "Kita-Absagen", "Aufenthaltstitel"],
    question: "Welche Lebenslage muss die Integrationsplanung berücksichtigen?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Jobcenter", benefit: "Bürgergeld grundsätzlich prüfbar", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["Betreuungszeiten", "berufliche Ausgangslage", "mögliche Unterstützungsangebote"], nextStep: "Realistischen Kooperationsplan mit Betreuung, Sprache und stufenweisem Berufseinstieg entwickeln.", reasoning: "Integration ist nur tragfähig, wenn tatsächliche Betreuungsmöglichkeiten und Zumutbarkeit berücksichtigt werden." },
  },
  {
    category: "Integration", difficulty: "leicht", week: 4,
    person: { name: "Farid Mohammadi", age: 30, country: "Afghanistan", family: "ledig", language: "Deutsch B1", status: "Aufenthaltserlaubnis", authority: "Jobcenter", issue: "möchte einen B2-Berufssprachkurs" },
    facts: "Farid hat B1 bestanden und möchte im Büro arbeiten. Ein Kurs in der Nähe beginnt in sechs Wochen.",
    documents: ["B1-Zertifikat", "Kursinformation", "Lebenslauf"],
    question: "Welche Förderkette ist plausibel?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Jobcenter", benefit: "Bildungs-/Sprachförderung prüfen", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["Teilnahmeberechtigung", "berufliches Ziel", "Einstufung des Trägers"], nextStep: "Zugang zum passenden B2-Kurs und parallele berufliche Orientierung klären.", reasoning: "Sprachförderung sollte an Vorwissen und konkretes Berufsziel anschließen." },
  },
  {
    category: "Integration", difficulty: "mittel", week: 4,
    person: { name: "Dr. Zohra Ahmadi", age: 36, country: "Afghanistan", family: "verheiratet", language: "Deutsch B1", status: "Aufenthaltserlaubnis", authority: "Jobcenter", issue: "möchte im Verwaltungsbereich arbeiten" },
    facts: "Zohra hat einen Bachelor in Politikwissenschaft und mehrjährige Projekterfahrung. Ihre Unterlagen sind übersetzt, aber noch nicht bewertet.",
    documents: ["Diplom und Übersetzung", "Lebenslauf", "B1-Zertifikat"],
    question: "Welche drei Stränge sollten parallel geplant werden?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Anerkennungsstelle / Kammer", benefit: "Bildungs-/Sprachförderung prüfen", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["Zeugnisbewertung", "Kompetenzprofil", "konkrete Stellenanforderungen"], nextStep: "Abschluss einordnen, Deutsch Richtung B2/C1 entwickeln und passende Verwaltungserfahrung aufbauen.", reasoning: "Für nicht reglementierte Tätigkeiten geht es häufig um transparente Einordnung, Sprache und anschlussfähige Praxiserfahrung." },
  },
  {
    category: "Integration", difficulty: "mittel", week: 4,
    person: { name: "Luis Mendoza", age: 27, country: "Kolumbien", family: "ledig", language: "Deutsch A2", status: "Aufenthaltserlaubnis", authority: "Jobcenter", issue: "ausländischer Pflegeabschluss" },
    facts: "Luis möchte als Pflegefachkraft arbeiten. Er hat Berufserfahrung, aber noch keinen Anerkennungsbescheid.",
    documents: ["Diplom", "Arbeitszeugnisse", "A2-Zertifikat"],
    question: "Warum reicht eine allgemeine Bewerbung noch nicht aus?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Anerkennungsstelle / Kammer", benefit: "Bildungs-/Sprachförderung prüfen", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["Anerkennungsantrag", "Sprachnachweis nach Berufsvorgabe", "weitere Fachunterlagen"], nextStep: "Anerkennungsverfahren für den reglementierten Beruf starten und Sprach-/Ausgleichsweg planen.", reasoning: "Die Berufsausübung ist an eine staatliche Anerkennung beziehungsweise Erlaubnis gebunden." },
  },
  {
    category: "Integration", difficulty: "leicht", week: 4,
    person: { name: "Amina Warsame", age: 19, country: "Somalia", family: "bei Verwandten", language: "Deutsch A2", status: "Duldung", authority: "Ausländerbehörde", issue: "sucht Ausbildung und Sprachkurs" },
    facts: "Amina besucht eine Berufsvorbereitung und hat gute Rückmeldungen. Ein Betrieb bietet ein Praktikum an.",
    documents: ["Duldung", "Schulbescheinigung", "Praktikumsangebot"],
    question: "Welche Abstimmung muss vor dem Praktikum erfolgen?",
    solution: { status: "Duldung", authority: "Ausländerbehörde", benefit: "Leistungen nach AsylbLG grundsätzlich prüfbar", work: "Nur nach behördlicher Erlaubnis / Nebenbestimmung", missing: ["Nebenbestimmung", "Praktikumsdetails", "Identitätsnachweise"], nextStep: "Zulässigkeit des Praktikums prüfen und mit Berufsberatung eine Ausbildungskette planen.", reasoning: "Bei Duldung sind aufenthaltsrechtliche Arbeitserlaubnis und Förderzuständigkeit getrennt zu klären." },
  },
  {
    category: "Integration", difficulty: "mittel", week: 4,
    person: { name: "Olena Bondar", age: 44, country: "Ukraine", family: "alleinerziehend", language: "Deutsch A1", status: "Aufenthaltserlaubnis", authority: "Jobcenter", issue: "Kurs kollidiert mit Kinderbetreuung" },
    facts: "Der Integrationskurs beginnt täglich um 8 Uhr, die Kita öffnet erst um 8:30 Uhr. Olena möchte teilnehmen.",
    documents: ["Kurszulassung", "Kursplan", "Kita-Bestätigung"],
    question: "Wie sieht eine realistische Lösungssuche aus?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Jobcenter", benefit: "Bildungs-/Sprachförderung prüfen", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["alternative Kurszeiten", "Unterstützungsangebote zur Betreuung"], nextStep: "Mit Träger und zuständigen Stellen nach Teilzeit-, Eltern- oder Betreuungslösung suchen.", reasoning: "Eine tragfähige Integrationsplanung berücksichtigt Betreuung als reale Teilnahmevoraussetzung." },
  },
  {
    category: "Integration", difficulty: "schwer", week: 4,
    person: { name: "Viktor Novak", age: 47, country: "Bosnien", family: "verheiratet", language: "Deutsch B2", status: "Niederlassungserlaubnis", authority: "Jobcenter", issue: "langjährige Berufserfahrung ohne Abschluss" },
    facts: "Viktor arbeitet seit Jahren informell in handwerklichen Tätigkeiten, besitzt aber keinen Berufsabschluss und ist aktuell arbeitslos.",
    documents: ["Arbeitszeugnisse", "Lebenslauf", "Leistungsbescheid"],
    question: "Welche Wege sollten statt eines beliebigen Kurses geprüft werden?",
    solution: { status: "Niederlassungserlaubnis", authority: "Jobcenter", benefit: "Bildungs-/Sprachförderung prüfen", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["Kompetenzfeststellung", "Zielberuf", "Beratung der zuständigen Kammer"], nextStep: "Validierung vorhandener Kompetenzen und abschlussorientierte Qualifizierung prüfen.", reasoning: "Vorhandene Berufserfahrung ist eine Ressource. Ziel sollte ein verwertbarer, möglichst anerkannter Kompetenznachweis sein." },
  },
  {
    category: "Migrationsberatung", difficulty: "leicht", week: 5,
    person: { name: "Mariam Dawit", age: 33, country: "Eritrea", family: "mit zwei Kindern", language: "Deutsch A2", status: "Aufenthaltserlaubnis", authority: "Jobcenter", issue: "versteht einen Behördenbrief nicht" },
    facts: "Der Brief enthält eine Frist und fordert Kontoauszüge. Mariam fürchtet, sofort alle Leistungen zu verlieren.",
    documents: ["Jobcenter-Brief", "Aufenthaltstitel"],
    question: "Wie führt die Beratung vom Stress zum nächsten Schritt?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Jobcenter", benefit: "Bürgergeld grundsätzlich prüfbar", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["Kontoauszüge für den genannten Zeitraum"], nextStep: "Brief in einfacher Sprache erklären, Frist markieren und sichere Einreichung planen.", reasoning: "Beratung verspricht kein Ergebnis, sondern schafft Verständnis und Handlungsfähigkeit." },
  },
  {
    category: "Migrationsberatung", difficulty: "schwer", week: 5,
    person: { name: "Hamid Najafi", age: 25, country: "Afghanistan", family: "ledig", language: "Deutsch B1", status: "Aufenthaltsgestattung", authority: "BAMF", issue: "BAMF-Ablehnung erhalten" },
    facts: "Hamid bringt einen umfangreichen Bescheid mit. Die Rechtsbehelfsfrist ist möglicherweise sehr kurz. Er bittet die Beratungsstelle, sofort einen Widerspruch zu schreiben.",
    documents: ["BAMF-Bescheid", "Aufenthaltsgestattung"],
    question: "Was darf und muss die Beratungsstelle zuerst tun?",
    solution: { status: "Aufenthaltsgestattung", authority: "BAMF", benefit: "Leistungen nach AsylbLG grundsätzlich prüfbar", work: "Nur nach behördlicher Erlaubnis / Nebenbestimmung", missing: ["genaues Zustellungsdatum", "vollständige Rechtsbehelfsbelehrung"], nextStep: "Frist und Zustellung sofort prüfen und an qualifizierte Rechtsberatung weiterleiten.", reasoning: "Die Beratungsstelle erklärt und vermittelt, übernimmt aber nicht ohne Befugnis die rechtliche Vertretung." },
  },
  {
    category: "Migrationsberatung", difficulty: "mittel", week: 5,
    person: { name: "Roya Ebrahimi", age: 40, country: "Iran", family: "Ehemann im Ausland", language: "Deutsch B2", status: "Aufenthaltserlaubnis", authority: "Ausländerbehörde", issue: "Familiennachzug" },
    facts: "Roya hat widersprüchliche Informationen aus sozialen Medien erhalten und möchte eine Erfolgsgarantie.",
    documents: ["Aufenthaltstitel", "Heiratsurkunde"],
    question: "Wie bleibt die Beratung hilfreich und professionell begrenzt?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Ausländerbehörde", benefit: "Keine Leistung ohne Einzelfallprüfung", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["genaue Rechtsgrundlage des Titels", "Identitäts- und Familiennachweise"], nextStep: "Verlässliche offizielle Informationen und individuelle Fachberatung organisieren; keine Garantie geben.", reasoning: "Eine seriöse Beratung trennt Orientierung, Dokumentensortierung und verbindliche Einzelfallprüfung." },
  },
  {
    category: "Migrationsberatung", difficulty: "mittel", week: 5,
    person: { name: "Abdul Noor", age: 52, country: "Pakistan", family: "verheiratet", language: "Deutsch A1", status: "Aufenthaltserlaubnis", authority: "Jobcenter", issue: "Mietschulden und Räumungsandrohung" },
    facts: "Abdul hat mehrere ungeöffnete Briefe. Neben Mietrückständen gibt es gesundheitliche Belastungen.",
    documents: ["Mahnung Vermieter", "Jobcenter-Bescheid", "ungeöffnete Post"],
    question: "Wie wird die Mehrfachproblemlage priorisiert?",
    solution: { status: "Aufenthaltserlaubnis", authority: "Jobcenter", benefit: "Bürgergeld grundsätzlich prüfbar", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["genaue Mietrückstandshöhe", "Fristen und Gerichtspost", "aktueller Leistungsstatus"], nextStep: "Wohnungsverlust-Frist zuerst klären und unmittelbar an Fachstelle für Wohnungssicherung/Schulden weiterleiten.", reasoning: "Clearing ordnet nach Dringlichkeit. Existenzielle und fristgebundene Risiken haben Vorrang." },
  },
  {
    category: "Migrationsberatung", difficulty: "leicht", week: 5,
    person: { name: "Sara Idris", age: 22, country: "Sudan", family: "ledig", language: "Deutsch B1", status: "Aufenthaltsgestattung", authority: "Sozialamt / Leistungsbehörde AsylbLG", issue: "fragt nach Arbeit und Leistungen" },
    facts: "Sara lebt in einer Unterkunft und hat ein Teilzeitangebot. Auf ihrem Dokument ist keine klare Arbeitserlaubnis erkennbar.",
    documents: ["Aufenthaltsgestattung", "Arbeitsangebot", "Leistungsbescheid"],
    question: "Welche beiden Zuständigkeiten müssen getrennt werden?",
    solution: { status: "Aufenthaltsgestattung", authority: "Sozialamt / Leistungsbehörde AsylbLG", benefit: "Leistungen nach AsylbLG grundsätzlich prüfbar", work: "Nur nach behördlicher Erlaubnis / Nebenbestimmung", missing: ["Nebenbestimmung", "Beschäftigungsdetails"], nextStep: "Leistungszuständigkeit und Beschäftigungserlaubnis jeweils bei der zuständigen Stelle klären.", reasoning: "Leistung und Arbeitserlaubnis werden nicht zwingend von derselben Behörde entschieden." },
  },
  {
    category: "Abschluss", difficulty: "schwer", week: 6,
    person: { name: "Familie Rahmani", age: 41, country: "Afghanistan", family: "Eltern und drei Kinder", language: "A2/B1", status: "gemischte Dokumentenlage", authority: "mehrere Stellen", issue: "Aufenthalt, Bürgergeld und Ausbildung" },
    facts: "Die Eltern haben Aufenthaltserlaubnisse, die älteste Tochter eine Fiktionsbescheinigung. Der Vater arbeitet geringfügig, die Tochter hat einen Ausbildungsplatz. Ein Jobcenter-Schreiben setzt eine Frist.",
    documents: ["mehrere Aufenthaltstitel", "Fiktionsbescheinigung", "Arbeits- und Ausbildungsvertrag", "Jobcenter-Schreiben"],
    question: "Wie strukturieren Sie den Fall ohne die Themen zu vermischen?",
    solution: { status: "Fiktionsbescheinigung", authority: "Ausländerbehörde", benefit: "Bürgergeld grundsätzlich prüfbar", work: "Aktuell nicht geklärt", missing: ["Dokumente jeder Person getrennt", "Nebenbestimmungen", "Einkommensnachweise", "Fristunterlagen"], nextStep: "Zuerst Frist sichern, dann pro Person Status/Arbeit und anschließend den Leistungsfall der Bedarfsgemeinschaft prüfen.", reasoning: "Gemischte Fälle werden beherrschbar, wenn Personen, Rechtsbereiche und Fristen konsequent getrennt werden." },
  },
  {
    category: "Abschluss", difficulty: "schwer", week: 6,
    person: { name: "Leila Moradi", age: 33, country: "Iran", family: "alleinerziehend", language: "Deutsch B2", status: "Aufenthaltserlaubnis", authority: "Jobcenter", issue: "Anerkennung, Arbeit und Betreuung" },
    facts: "Leila ist Ingenieurin, arbeitet in einem Minijob und möchte eine Qualifizierung beginnen. Die Betreuung ihres Kindes ist nur bis 14 Uhr gesichert.",
    documents: ["Diplom", "Lohnabrechnung", "Kita-Bescheinigung", "Kursangebot"],
    question: "Entwerfen Sie einen realistischen statt maximalen Integrationsplan.",
    solution: { status: "Aufenthaltserlaubnis", authority: "Jobcenter", benefit: "Bildungs-/Sprachförderung prüfen", work: "Grundsätzlich erlaubt; Nebenbestimmung prüfen", missing: ["Abschlussbewertung", "Teilzeitoption des Kurses", "Potenzialanalyse"], nextStep: "Anerkennung, finanzierbare Teilzeitqualifizierung und Kinderbetreuung zu einem stufenweisen Plan verbinden.", reasoning: "Gute Planung verbindet berufliches Potenzial mit realen zeitlichen und familiären Bedingungen." },
  },
  {
    category: "Abschluss", difficulty: "schwer", week: 6,
    person: { name: "Daniel Okoro", age: 45, country: "Nigeria", family: "verheiratet", language: "Deutsch B1", status: "Duldung", authority: "Ausländerbehörde", issue: "Jobangebot, fehlender Pass, Leistungswechsel" },
    facts: "Daniel hat ein qualifiziertes Jobangebot, aber keinen Pass. Er bezieht Leistungen nach AsylbLG und glaubt, mit dem Arbeitsvertrag automatisch Bürgergeld zu erhalten.",
    documents: ["Duldung", "Jobangebot", "Leistungsbescheid", "alte Identitätsunterlagen"],
    question: "Welche drei vorschnellen Annahmen müssen vermieden werden?",
    solution: { status: "Duldung", authority: "Ausländerbehörde", benefit: "Leistungen nach AsylbLG grundsätzlich prüfbar", work: "Nur nach behördlicher Erlaubnis / Nebenbestimmung", missing: ["Nachweise Identitätsklärung", "vollständiger Arbeitsvertrag", "Nebenbestimmung"], nextStep: "Arbeitserlaubnis und aufenthaltsrechtliche Optionen prüfen; Leistungszuständigkeit erst danach gesondert klären.", reasoning: "Jobangebot, Aufenthaltstitel und Leistungswechsel folgen jeweils eigenen Voraussetzungen; nichts geschieht automatisch." },
  },
  ...(additionalCases as Draft[]),
  ...generatedCases,
];

export const cases: CaseFile[] = drafts.map(makeCase).slice(0, 100);
