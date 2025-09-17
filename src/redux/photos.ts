export type Photo = {
  src: string;
  title: string;
  description?: string;
};

export const gardenPhotos: Photo[] = [
  {
    src: "/blätter_herbst.jpg",
    title: "Sonbahar Yaprakları",
    description: "Ein Blick auf den Herbst in meinem Garten.",
  },
  {
    src: "/ernte.JPG",
    title: "Hasat",
    description: "Frische Produkte, die ich aus meinem Garten geerntet habe.",
  },
  {
    src: "/foto.JPG",
    title: "Bahçeden Bir Kare",
    description: "Ein Foto, das bei Sonnenuntergang aufgenommen wurde.",
  },
  {
    src: "/sonnen_blumen.jpeg",
    title: "Ayçiçekleri",
    description: "Sonnenblumen, die sich der Sonne zuwenden.",
  },
];

export const fotografiePhotos: Photo[] = [
  {
    src: "/foto/apfelblumen.png",
    title: "Günün Fotoğrafı",
    description: "Eine Aufnahme aus der Natur.",
  },
  {
    src: "/foto/herbst.png",
    title: "Herbstfarben",
    description: "Die Farben des Herbstes.",
  },
  {
    src: "/foto/licht.png",
    title: "Sonnenblumen",
    description: "Blumen, die der Sonne folgen.",
  },
  {
    src: "/foto/raps.png",
    title: "Regentropfen",
    description: "Eine Nahaufnahme von Regentropfen.",
  },
  {
    src: "/foto/wolke.png",
    title: "Waldweg",
    description: "Ein Wanderweg im Wald.",
  },
  {
    src: "/foto/tulpe.png",
    title: "Waldweg",
    description: "Ein Wanderweg im Wald.",
  },
];
