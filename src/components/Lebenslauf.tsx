import React from "react";

const CvPage: React.FC = () => {
  return (
    <html lang="de">
      <head>
        <title>Mein Lebenslauf</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://www.w3schools.com/w3css/4/w3.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <style>{`
          html, body, h1, h2, h3, h4, h5, h6 {
            font-family: "Roboto", sans-serif;
          }
        `}</style>
      </head>

      <body className="w3-light-grey">
        {/* Header */}
        <header
          className="w3-display-container w3-content w3-center"
          style={{ maxWidth: "1500px" }}
        >
          <div
            className="w3-bar w3-light-grey w3-round w3-display-bottommiddle w3-hide-small"
            style={{ bottom: "-16px" }}
          >
          </div>
        </header>

        {/* Navbar on small screens */}
        <div className="w3-center w3-light-grey w3-padding-16 w3-hide-large w3-hide-medium">
          <div className="w3-bar w3-light-grey">
            <a href="#" className="w3-bar-item w3-button">
              Home
            </a>
            <a href="../../../index.html" className="w3-bar-item w3-button">
              Home
            </a>
            <a href="cv.html" className="w3-bar-item w3-button">
              Lebenslauf
            </a>
          </div>
        </div>

        {/* Page Container */}
        <div className="w3-content w3-margin-top" style={{ maxWidth: "1400px" }}>
          <div className="w3-row-padding">
            {/* Left Column */}
            <div className="w3-third">
              <div className="w3-white w3-text-grey w3-card-4">
                <div className="w3-display-container">
                  <img
                    src="./foto.JPG"
                    style={{ width: "100%" }}
                    alt="Avatar"
                  />
                  <div className="w3-display-bottomleft w3-container w3-text-black">
                    <h2>Mustafa Özdemir</h2>
                  </div>
                </div>
                <div className="w3-container">
                  <p>
                    <i className="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal"></i>
                    Anwendungsentwickler
                  </p>
                  <p>
                    <i className="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i>
                    Marburg, DE
                  </p>
                  <p>
                    <i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>
                    mustafa.ozdemir1408gmail.com
                  </p>
                  <p>
                    <i className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>
                    017693153406
                  </p>
                  <hr />

                  <p className="w3-large">
                    <b>
                      <i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>
                      Skills
                    </b>
                  </p>
                  {skill("HTML", 99)}
                  {skill("CSS", 99)}
                  {skill("JavaScript", 99)}
                  {skill("TypeScript", 100)}
                  {skill("React", 100)}
                  {skill("Golang", 95)}
                  {skill("Java", 95)}

                  <br />
                  <p className="w3-large w3-text-theme">
                    <b>
                      <i className="fa fa-globe fa-fw w3-margin-right w3-text-teal"></i>
                      Languages
                    </b>
                  </p>
                  {lang("English", 90)}
                  {lang("Deutsch", 90)}
                  {lang("Türkisch", 100)}
                  <br />
                </div>
              </div>
              <br />
            </div>

            {/* Right Column */}
            <div className="w3-twothird">
              <div className="w3-container w3-card w3-white w3-margin-bottom">
                <h2 className="w3-text-grey w3-padding-16">
                  <i className="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>
                  Berufliche Werdegang
                </h2>
                <div className="w3-container">
                  <h5 className="w3-opacity">
                    <b>Praktikum / Universität Marburg, Marburg</b>
                  </h5>
                  <h6 className="w3-text-teal">
                    <i className="fa fa-calendar fa-fw w3-margin-right"></i>
                    11/2024 - 06/2025
                  </h6>
                  <p>Praktikum in der Universitätsstadt Marburg (Deutschland)</p>
                  <hr />

                  <h5 className="w3-opacity">
                    <b>Umschuler / Firma iad GmbH, Marburg</b>
                  </h5>
                  <h6 className="w3-text-teal">
                    <i className="fa fa-calendar fa-fw w3-margin-right"></i>
                    07/2023 -
                    <span className="w3-tag w3-teal w3-round">Aktuel</span>
                  </h6>
                  <p>
                    Derzeit mache ich eine Umschulung zum Fachinformatiker für
                    Anwendungsentwicklung.
                  </p>
                  <hr />
                </div>
                <div className="w3-container">
                  <h5 className="w3-opacity">
                    <b>
                      Wirtschaftsingenieur mit Schwerpunkt Prozessplanung / Firma
                      CBF, Tolat, Türkei
                    </b>
                  </h5>
                  <h6 className="w3-text-teal">
                    <i className="fa fa-calendar fa-fw w3-margin-right"></i>
                    12/2012 – 03/2019
                  </h6>
                  <ul>
                    <li>Koordination von 650 Mitarbeiter*innen</li>
                    <li>
                      Prozessplanung für die Produktion von diversen
                      Kleidungsstücken
                    </li>
                    <li>Erstellen der Tagesistatiken</li>
                    <li>
                      Überprüfen der Fristen zum Einhalten der Lieferketten
                    </li>
                  </ul>
                  <hr />
                </div>
              </div>

              <div className="w3-container w3-card w3-white w3-margin-bottom">
                <h2 className="w3-text-grey w3-padding-16">
                  <i className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>
                  Bildungsweg
                </h2>
                <div className="w3-container">
                  <h5 className="w3-opacity">
                    <b>Deutschkurs (Level: B2) / VHS, Marburg</b>
                  </h5>
                  <h6 className="w3-text-teal">
                    <i className="fa fa-calendar fa-fw w3-margin-right"></i>
                    09/2021 – 05/2023
                  </h6>
                  <ul>
                    <li>Dort habe ich berufliche Deutsckentnisse gelernt.</li>
                  </ul>
                  <br />
                </div>
                <div className="w3-container">
                  <h5 className="w3-opacity">
                    <b>Industrial Engineer, Izmir</b>
                  </h5>
                  <h6 className="w3-text-teal">
                    <i className="fa fa-calendar fa-fw w3-margin-right"></i>
                    09/2012 – 12/2014
                  </h6>
                  <ul>
                    <li>Absolvierung der Ausbildung zum Piloten</li>
                  </ul>
                  <br />
                </div>
                <div className="w3-container">
                  <h5 className="w3-opacity">
                    <b>
                      Studium des Wirtschaftsingeniuerwesenschafts / Türkische
                      Nationale Verteidigungsuniversität, Istanbul
                    </b>
                  </h5>
                  <h6 className="w3-text-teal">
                    <i className="fa fa-calendar fa-fw w3-margin-right"></i>
                    12/2008 – 08/2012
                  </h6>
                  <ul>
                    <li>
                      <b>Abschluss</b>: Diplom Wirtschaftsingenieurwesen
                    </li>
                    <li>
                      <b>Schwerpunkt</b>: Prozessplanung, Lieferung & Logistik,
                      Verwaltung
                    </li>
                  </ul>
                  <br />
                </div>
              </div>

              <div className="w3-container w3-card w3-white w3-margin-bottom">
                <h2 className="w3-text-grey w3-padding-16">
                  <span className="fa fa-fw w3-margin-right w3-xxlarge w3-text-teal">
                    &#128506;
                  </span>
                  Soziales Engagement
                </h2>
                <p>
                  Seit Januar 2023 engagiere ich mich ehrenamtlich in
                  verschiedenen Vereinen. Diese Tätigkeit hat meine
                  Kommunikationsfähigkeiten und mein Verantwortungsbewusstsein
                  gestärkt. Außerdem bin ich Mitglied im Interkulturellen
                  Gärtnerverein.
                </p>
                <hr />
                <div className="w3-container">
                  <h5 className="w3-opacity">
                    <b>Bürgerhelfer / Neustadt</b>
                  </h5>
                  <h6 className="w3-text-teal">
                    <i className="fa fa-calendar fa-fw w3-margin-right"></i>
                    09/2021 -
                    <span className="w3-tag w3-teal w3-round">Aktuel</span>
                  </h6>
                  <ul>
                    <li>Begleitung und Unterstützung von älteren Menschen</li>
                  </ul>
                  <br />
                </div>
                <div className="w3-container">
                  <h5 className="w3-opacity">
                    <b>Ehrenamtliche Tätigkeit / Johanniter, Marburg</b>
                  </h5>
                  <h6 className="w3-text-teal">
                    <i className="fa fa-calendar fa-fw w3-margin-right"></i>
                    06/2022 – 09/2023
                  </h6>
                  <ul>
                    <li>
                      Besuch und Unterstützung von älteren Menschen im Alltag bei
                      sich zu Hause
                    </li>
                  </ul>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="w3-container w3-teal w3-center w3-margin-top">
          <p>Finden Sie mich in den sozialen Medien.</p>
         
          <a
            href="https://www.linkedin.com/in/mustafa-oezdemir/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-linkedin w3-hover-opacity"></i>
          </a>
          <p>
            Powered by{" "}
            <a href="#" target="_blank" rel="noreferrer">
              Mustafa
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
};

// Yardımcı progress bar fonksiyonları
function skill(name: string, percent: number) {
  return (
    <>
      <p>{name}</p>
      <div className="w3-light-grey w3-round-xlarge w3-small">
        <div
          className="w3-container w3-center w3-round-xlarge w3-teal"
          style={{ width: `${percent}%` }}
        >
          {percent}%
        </div>
      </div>
    </>
  );
}

function lang(name: string, percent: number) {
  return (
    <>
      <p>{name}</p>
      <div className="w3-light-grey w3-round-xlarge">
        <div
          className="w3-round-xlarge w3-teal"
          style={{ height: "24px", width: `${percent}%` }}
        ></div>
      </div>
    </>
  );
}

export default CvPage;
