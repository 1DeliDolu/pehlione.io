



const hobbies = [
  {
    title: "Gartenarbeit",
    detail: "Pflanzenpflege, Gemüseanbau und Landschaftsgestaltung.",
  },
  {
    title: "Fotografie",
    detail: "Natur-, Stadt- und Makroaufnahmen, Bearbeitung und Komposition.",
  },
  {
    title: "Musik",
    detail:
      "Ich höre gerne Musik und interessiere mich für verschiedene Genres.",
  },

  {
    title: "Programmieren",
    detail:
      "Experimentieren mit Go und Rust für kleine Projekte und Tools sowie moderne Webentwicklung mit TypeScript und React.",
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
