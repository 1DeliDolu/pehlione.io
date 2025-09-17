export type Photo = {
  src: string;
  title: string;
  description?: string;
  category: string;
};

export const gardenPhotos: Photo[] = [
  {
    "src": "/blätter_herbst.jpg",
    "title": "Sonbahar Yaprakları",
    "description": "Ein Blick auf den Herbst in meinem Garten.",
    "category": "garten"
  },
  {
    "src": "/ernte.JPG",
    "title": "Hasat",
    "description": "Frische Produkte, die ich aus meinem Garten geerntet habe.",
    "category": "garten"
  }
];
export const fotografiePhotos: Photo[] = [
  {
    "src": "/foto/apfelblumen.png",
    "title": "Günün Fotoğrafı",
    "description": "Eine Aufnahme aus der Natur.",
    "category": "foto"
  },
  {
    "src": "/foto/herbst.png",
    "title": "Herbstfarben",
    "description": "Die Farben des Herbstes.",
    "category": "foto"
  },
  {
    "src": "/foto/licht.png",
    "title": "Sonnenblumen",
    "description": "Blumen, die der Sonne folgen.",
    "category": "foto"
  }
];
