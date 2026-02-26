import React from "react";
import "@/styles/Lebenslauf.css";

const CvPage: React.FC = () => {
  const today = new Date().toLocaleDateString("de-DE");
  return (
    <div className="cv-page">
      <div className="cv-shell">
        <div className="cv-grid">
          <aside className="cv-side">
            <div className="cv-card cv-card--profile">
              <img
                src="/bewerbung.jpg"
                alt="Bewerbungsfoto von Mustafa Özdemir"
                className="cv-avatar"
              />
              <div className="cv-kicker">Kontakt</div>
              <h1 className="cv-name">Mustafa Özdemir</h1>
              <p className="cv-role">Anwendungsentwickler</p>
              <div className="cv-contact">
                <div className="cv-contact-item">
                  <span className="cv-contact-label">Adresse</span>
                  <span className="cv-contact-value">
                    Am Richtsberg 20, 35039 Marburg
                  </span>
                </div>
                <div className="cv-contact-item">
                  <span className="cv-contact-label">E-Mail</span>
                  <a
                    className="cv-contact-value"
                    href="mailto:mustafa.ozdemir1408@gmail.com"
                  >
                    mustafa.ozdemir1408@gmail.com
                  </a>
                </div>
                <div className="cv-contact-item">
                  <span className="cv-contact-label">Telefon</span>
                  <a className="cv-contact-value" href="tel:+4917693153406">
                    +49 176 93153406
                  </a>
                </div>
              </div>
              <div className="cv-divider" />
              <div className="cv-personal">
                <div className="cv-personal-row">
                  <span className="cv-personal-label">Geburtsdatum</span>
                  <span className="cv-personal-value">25.11.1990</span>
                </div>
                <div className="cv-personal-row">
                  <span className="cv-personal-label">Geburtsort</span>
                  <span className="cv-personal-value">Gerze (Türkei)</span>
                </div>
                <div className="cv-personal-row">
                  <span className="cv-personal-label">Familienstand</span>
                  <span className="cv-personal-value">verheiratet</span>
                </div>
                <div className="cv-personal-row">
                  <span className="cv-personal-label">Nationalität</span>
                  <span className="cv-personal-value">Türkisch</span>
                </div>
              </div>
            </div>
          </aside>

          <main className="cv-main">
            <section className="cv-card">
              <div className="cv-section-head">
                <h2>Berufliche Werdegang</h2>
                <p>Ausbildung, Praktika und berufliche Erfahrung.</p>
              </div>

              <div className="cv-item">
                {/* maßnahme 02/2026 INTEGRAL gGmbH */}
                <div className="cv-item-header">
                  <h3>Maßnahme, INTEGRAL gGmbH, Marburg</h3>
                  <span className="cv-item-meta">02/2026 - aktuell</span>
                </div>
              </div>

                <div className="cv-item">
                <div className="cv-item-header">
                  <h3>Onlinefortbildung IBM Java Developer, IBM, Coursera</h3>
                  <span className="cv-item-meta">12/2025 – 02/2026</span>
                </div>
                <ul className="cv-item-list">
                  <li>IBM Java Developer</li>
                </ul>
                </div>

                <div className="cv-item">
                {/* maßnahme 02/2026 INTEGRAL gGmbH */}
                <div className="cv-item-header">
                  <h3>Maßnahme, INTEGRAL gGmbH, Marburg</h3>
                  <span className="cv-item-meta">02/2026 - aktuell</span>
                </div>
                </div>

              <div className="cv-item">
                <div className="cv-item-header">
                  <h3>
                    Anwendungsentwickler im Praktikum zur Pluginsentwicklung für
                    PRTG &amp; Grafana (Universitätsstadt Marburg)
                  </h3>
                  <span className="cv-item-meta">11/2024 – 06/2025</span>
                </div>
                <ul className="cv-item-list">
                  <li>
                    Ermöglichung des Monitorings der IT-Systeme durch die
                    Entwicklung eines Grafana-Datasource-Plugins für PRTG
                  </li>
                  <li>
                    Implementierung von Authentifizierung, Logging und
                    Monitoring-Funktionalitäten
                  </li>
                  <li>
                    Testen, Dokumentieren und Präsentieren der Ergebnisse im
                    Rahmen des Praktikums
                  </li>
                </ul>
              </div>

              <div className="cv-item">
                <div className="cv-item-header">
                  <h3>
                    Umschulung zum Anwendungsentwickler (IHK), IAD GmbH, Marburg
                  </h3>
                  <span className="cv-item-meta">07/2023 – 11/2025</span>
                </div>
                <ul className="cv-item-list">
                  <li>
                    Praxisorientierte Umschulung mit Fokus auf
                    Softwareentwicklung und -betrieb.
                  </li>
                  <li>
                    Kernthemen: Programmierung (z. B. Java,
                    JavaScript/TypeScript), relationale Datenbanken (SQL),
                    Web‑Technologien und REST‑APIs.
                  </li>
                  <li>
                    Methoden & Tools: Anforderungsanalyse, Testverfahren (inkl.
                    ISTQB‑Grundlagen), Versionsverwaltung (Git) und agile
                    Arbeitsweisen.
                  </li>
                  <li>
                    Abschlussorientiert: Erstellung einer praxisnahen
                    Projektarbeit, Präsentation und Vorbereitung auf die
                    IHK‑Abschlussprüfung (Teil-1 und Teil-2).
                  </li>
                </ul>
              </div>

              <div className="cv-item">
                <div className="cv-item-header">
                  <h3>
                    Wirtschaftsingenieur mit Schwerpunkt Prozessplanung, Firma
                    CBF, Tokat, Türkei
                  </h3>
                  <span className="cv-item-meta">12/2012 – 03/2019</span>
                </div>
                <ul className="cv-item-list">
                  <li>Koordination von 650 Mitarbeiter*innen</li>
                  <li>
                    Prozessplanung für die Produktion von diversen
                    Kleidungsstücken
                  </li>
                  <li>Erstellen der Tagesstatiken</li>
                  <li>Überprüfen der Fristen zum Einhalten der Lieferketten</li>
                </ul>
              </div>
            </section>

            <section className="cv-card">
              <div className="cv-section-head">
                <h2>Bildungsweg</h2>
                <p>Ausbildung, Kurse und Studium.</p>
              </div>

              <div className="cv-item">
                <div className="cv-item-header">
                  <h3>
                    Ausbildung zum Fachinformatiker Anwendungsentwicklung, IAD
                    Marburg
                  </h3>
                  <span className="cv-item-meta">07/2023 – 11/2025</span>
                </div>
              </div>

              <div className="cv-item">
                <div className="cv-item-header">
                  <h3>Deutschkurs mit B2-Zertifikat, VHS Marburg</h3>
                  <span className="cv-item-meta">09/2021 – 05/2023</span>
                </div>
              </div>

              <div className="cv-item">
                <div className="cv-item-header">
                  <h3>
                    Studium des Wirtschafts-Ingenieurwesen / MSÜ, Istanbul
                  </h3>
                  <span className="cv-item-meta">09/2008 – 08/2012</span>
                </div>
                <ul className="cv-item-list">
                  <li>Abschluss: Diplom Wirtschaftsingenieur</li>
                  <li>
                    Schwerpunkt: Prozessplanung, Lieferung &amp; Logistik,
                    Verwaltung
                  </li>
                </ul>
              </div>
            </section>

            <section className="cv-card">
              <div className="cv-section-head">
                <h2>Weitere Kenntnisse</h2>
                <p>Technologien und Fachbereiche im Überblick.</p>
              </div>
              <div className="cv-skill-group">
                <h3>JavaScript / TypeScript / Node.js</h3>
                <ul className="cv-inline-list">
                  <li>JavaScript Grundlagen (Syntax, Grundstrukturen)</li>
                  <li>Prozedurale & objektorientierte Programmierung</li>
                  <li>DOM-Programmierung (dynamischer Seiteninhalt)</li>
                  <li>HTML5 APIs (ausgewählte)</li>
                  <li>TypeScript Grundlagen & OOP mit TypeScript</li>
                  <li>Node.js Basics</li>
                  <li>AJAX (asynchrones Laden von Daten)</li>
                  <li>XML Grundlagen (DTD, Schema)</li>
                  <li>Projektarbeit</li>
                </ul>
              </div>

              <div className="cv-skill-group">
                <h3>HTML5 / CSS3</h3>
                <ul className="cv-inline-list">
                  <li>HTML5 Grundlagen (Semantik, Metadaten, Links, Bilder)</li>
                  <li>Formulare & Tabellen</li>
                  <li>CSS Grundlagen & Layout (Flexbox/Grid)</li>
                  <li>Responsive Design</li>
                  <li>Barrierefreiheit (Accessibility) & UX/Usability</li>
                  <li>SEO & Microdata</li>
                  <li>SASS (SCSS)</li>
                  <li>Tailwind CSS</li>
                  <li>Bootstrap</li>
                  <li>Materialize</li>
                </ul>
              </div>

              <div className="cv-skill-group">
                <h3>C# / .NET</h3>
                <ul className="cv-inline-list">
                  <li>.NET-Plattform im Überblick</li>
                  <li>Entwicklungsumgebung einrichten</li>
                  <li>C# Grundlagen (Syntax, Kontrollstrukturen, Methoden)</li>
                  <li>Fehlerbehandlung mit Exceptions</li>
                  <li>OOP (Klassen, Schnittstellen, Vererbung)</li>
                  <li>Generische Collections & weitere Konzepte</li>
                  <li>Automatische Speicherverwaltung (GC)</li>
                  <li>Asynchrone Programmierung</li>
                  <li>GUI Programmierung mit WPF</li>
                  <li>Entwurfsmuster</li>
                  <li>Netzwerkprogrammierung</li>
                  <li>Test- & Buildmanagement + Projekt</li>
                </ul>
              </div>

              <div className="cv-skill-group">
                <h3>Java</h3>
                <ul className="cv-inline-list">
                  <li>Java Grundlagen (Syntax, Variablen, Operatoren)</li>
                  <li>Kontrollstrukturen (Entscheidungen, Schleifen)</li>
                  <li>Arrays & Objektarbeit</li>
                  <li>Methoden & Methodenüberladung</li>
                  <li>OOP (Kapselung, Konstruktoren, Konzepte)</li>
                  <li>Fehlerbehandlung (Exceptions)</li>
                  <li>Dateien & Datenströme (I/O)</li>
                  <li>Ausgewählte Klassen (Core API)</li>
                  <li>Lambda-Ausdrücke</li>
                  <li>GUI mit Swing</li>
                </ul>
              </div>

              <div className="cv-skill-group">
                <h3>Microsoft SQL Server / T-SQL / Azure Data (DP-900)</h3>
                <ul className="cv-inline-list">
                  <li>SQL-Datenbanken & Datenbankgrundlagen</li>
                  <li>Datenmodellierung, Normalisierung & Beziehungen</li>
                  <li>Datenbankobjekte & Performance-Grundlagen</li>
                  <li>T-SQL Querying (SELECT, Filtern, Sortieren)</li>
                  <li>Funktionen, Gruppierung & Aggregationen</li>
                  <li>Unterabfragen & Set-Operatoren</li>
                  <li>
                    Azure Data Fundamentals (DP-900): relational /
                    non-relational
                  </li>
                  <li>Data Warehouse & Analytics Grundlagen (Azure)</li>
                  <li>Projekt: praktische Anwendung</li>
                </ul>
              </div>

              <div className="cv-skill-group">
                <h3>Go (Golang)</h3>
                <ul className="cv-inline-list">
                  <li>REST API (Gin)</li>
                  <li>Datenbankzugriff & ORM (GORM)</li>
                  <li>Logging &amp; Monitoring</li>
                  <li>Cache</li>
                  <li>Schnittstellenprogrammierung</li>
                </ul>
              </div>

              <div className="cv-skill-group">
                <h3>PHP</h3>
                <ul className="cv-inline-list">
                  <li>PHP Grundlagen & OOP</li>
                  <li>Symfony (MVC, Routing, Doctrine, Twig)</li>
                  <li>Laravel (Eloquent, Blade, Artisan, Routing)</li>
                  <li>REST APIs</li>
                  <li>Datenbankanbindung (MySQL) & Migrationen</li>
                  <li>Validierung, Authentifizierung & Middleware</li>
                  <li>Testing (PHPUnit) & Debugging</li>
                </ul>
              </div>
              {/* Python */}
              <div className="cv-skill-group">
                <h3>Python</h3>
                <ul className="cv-inline-list">
                  <li>Python Grundlagen (Development / Data Science / AI)</li>
                  <li>AI Applications mit Python</li>
                  <li>Flask (Web / REST APIs)</li>
                  <li>Django (ORM, SQL & Databases)</li>
                  <li>Scripting & Automatisierung</li>
                </ul>
              </div>
            </section>

            <section className="cv-card">
              <div className="cv-section-head">
                <h2>Sprachkenntnisse</h2>
                <p>Sprachliche Kompetenzen.</p>
              </div>
              <ul className="cv-list">
                <li>Türkisch – Muttersprache</li>
                <li>Deutsch – gut in Wort und Schrift</li>
                <li>Englisch – gut in Wort und Schrift</li>
              </ul>
            </section>

            <section className="cv-card">
              <div className="cv-section-head">
                <h2>Interessen</h2>
                <p>Was mich zusätzlich motiviert.</p>
              </div>
              <ul className="cv-tag-list">
                <li>Coding und Software-Architektur</li>
                <li>Wandern gehen</li>
                <li>Bücher lesen</li>
                <li>Handwerk &amp; Reparatur</li>
                <li>Aktives Mitglied bei Interkulturellen Garten</li>
              </ul>
            </section>

            <section className="cv-card">
              <div className="cv-section-head">
                <h2>Soziales Engagement</h2>
                <p>Freiwillige Tätigkeiten und Ehrenamt.</p>
              </div>
              <div className="cv-item">
                <div className="cv-item-header">
                  <h3>Bürgerhelfer (Bürgerhilfe, Neustadt, Deutschland)</h3>
                  <span className="cv-item-meta">09/2021 – aktuell</span>
                </div>
                <ul className="cv-item-list">
                  <li>Begleitung und Unterstützung von älteren Menschen</li>
                </ul>
              </div>
              <div className="cv-item">
                <div className="cv-item-header">
                  <h3>
                    Ehrenamtliche Tätigkeit (Johanniter, Marburg, Deutschland)
                  </h3>
                  <span className="cv-item-meta">06/2022 – 09/2023</span>
                </div>
                <ul className="cv-item-list">
                  <li>
                    Besuch und Unterstützung von älteren Menschen im Alltag bei
                    sich zu Hause
                  </li>
                </ul>
              </div>
            </section>

            <section className="cv-card">
              <div className="cv-section-head">
                <h2>Referenz</h2>
                <p>Kontakt für Rückfragen.</p>
              </div>
              <div className="cv-item">
                <div className="cv-item-header">
                  <h3>Andrea Fritzsch</h3>
                  <span className="cv-item-meta">
                    Förderung des freiwilligen Engagements
                  </span>
                </div>
                <ul className="cv-item-list">
                  <li>WIR-Vielfaltszentrum der Universitätsstadt Marburg</li>
                  <li>
                    E-Mail:{" "}
                    <a
                      href="mailto:Andrea.Fritzsch@marburg-stadt.de"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Andrea.Fritzsch@marburg-stadt.de
                    </a>
                  </li>
                  <li>
                    Telefon: <a href="tel:064212011861">06421 201-1861</a>
                  </li>
                </ul>
              </div>
            </section>

            <div className="cv-signoff">Marburg, den {today}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CvPage;
