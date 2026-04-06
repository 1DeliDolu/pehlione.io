



const hobbies = [
  {
    title: "Gartenarbeit",
    detail: "Pflanzenpflege, Gemüseanbau und Landschaftsgestaltung.",
    img: "garten/thumbs/garten.png",
  },
  {
    title: "Fotografie",
    detail: "Natur-, Stadt- und Makroaufnahmen, Bearbeitung und Komposition.",
    img: "foto/thumbs/fotografie.png",
  },
  {
    title: "Musik",
    detail:
      "Ich höre gerne Musik und interessiere mich für verschiedene Genres.",
    img: "foto/thumbs/Musik.png",
  },

  {
    title: "Programmieren",
    detail:
      "Leidenschaft fürs Coden, Neugier auf neue Technologien und Freude daran, mit kleinen Projekten Neues auszuprobieren und stetig dazuzulernen.",
    img: "foto/thumbs/code.png",
  },
];

export default hobbies;





export const subCategories: Record<"foto" | "garten" | "certificates", string[]> = {
  foto: [ "natur", "herbst", "blumen", "frühling", "stadt", "makro", "sommer", "winter" ],
  garten: [ "herbst", "ernte", "gemuese", "frühling", "pflanzen", "werkzeuge", "sommer", "winter" ],
  certificates: [ "Coursera","BTK","Udemy" ],
};

export const hauptKategorien = [ "foto", "garten", "certificates" ] as const;

export const unterKategorien: Record<string, string[]> = {
  foto: [ "natur", "herbst", "blumen", "frühling", "stadt", "makro", "sommer", "winter" ],
  garten: [ "herbst", "ernte", "gemuese", "frühling", "pflanzen", "werkzeuge", "sommer", "winter" ],
  certificates: [ "Coursera","BTK","Udemy","IBM" ],
};
