export type Photo = {
  src: string;
  title: string;
  description?: string;
};

export const gardenPhotos: Photo[] = [
  {
    src: "/blätter_herbst.jpg",
    title: "Sonbahar Yaprakları",
    description: "Bahçemde sonbahardan bir görüntü.",
  },
  {
    src: "/ernte.JPG",
    title: "Hasat",
    description: "Bahçeden topladığım taze ürünler.",
  },
  {
    src: "/foto.JPG",
    title: "Bahçeden Bir Kare",
    description: "Gün batımında çekilmiş bir fotoğraf.",
  },
  {
    src: "/sonnen_blumen.jpeg",
    title: "Ayçiçekleri",
    description: "Güneşe dönen ayçiçekleri.",
  },
];

export const fotografiePhotos: Photo[] = [
  {
    src: "/foto/apfelblumen.png",
    title: "Günün Fotoğrafı",
    description: "Doğadan bir kare.",
  },
  {
    src: "/foto/herbst.png",
    title: "Herbstfarben",
    description: "Sonbaharın renkleri.",
  },
  {
    src: "/foto/licht.png",
    title: "Sonnenblumen",
    description: "Güneşi takip eden çiçekler.",
  },
  {
    src: "/foto/raps.png",
    title: "Regentropfen",
    description: "Yağmur damlalarının yakın çekimi.",
  },
  {
    src: "/foto/wolke.png",
    title: "Waldweg",
    description: "Ormanda yürüyüş yolu.",
  },
  {
    src: "/foto/tulpe.png",
    title: "Waldweg",
    description: "Ormanda yürüyüş yolu.",
  },
];
