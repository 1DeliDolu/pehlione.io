import DescriptionIcon from "@mui/icons-material/Description";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import WorkIcon from "@mui/icons-material/Work";
import FolderIcon from "@mui/icons-material/Folder";
import PersonIcon from "@mui/icons-material/Person";
/* import CloudUploadIcon from '@mui/icons-material/CloudUpload'; */



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

export const certificateSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Bootstrap",
  "Node.js",
  "SQL",
  "MySQL",
  "Express.js",
  "MongoDB",
  "REST APIs",
  "GraphQL",
  "Golang",
  "Docker",
  "Rust",
  "PHP",
  "Laravel",
  "Symfony",
  "Git",
  "GitHub",
  "Vite",
  "ESLint",
  "Prettier",
  "Java",
  "C#",
  "Playwright",
  "Grafana",
  "PRTG",
  "Kubernetes",
  "Jenkins",
  "CI/CD",
  "DevOps",
  "Generative AI",
  "LLMs",
];

export const navItems = [
  {
    key: "cv",
    label: "Lebenslauf",
    href: "#cv",
    icon: DescriptionIcon,
    detail: "Kurzprofil und PDF-Download.",
  },
  {
    key: "hobbies",
    label: "Hobbys",
    href: "#hobbies",
    icon: FavoriteIcon,
    detail: "Interessen und Freizeit.",
  },
  {
    key: "certificates",
    label: "Zertifikate",
    href: "#certificates",
    icon: WorkspacePremiumIcon,
    detail: "Nachweise und Links.",
  },
  {
    key: "projects",
    label: "Projekte",
    href: "#projects",
    icon: WorkIcon,
    detail: "Ausgewählte Arbeiten und Demos.",
  },
  {
    key: "repos",
    label: "Repositories",
    href: "#repos",
    icon: FolderIcon,
    detail: "Neueste GitHub-Repositories.",
  },
  {
    key: "developer",
    label: "Anwendungsentwickler",
    href: "#developer",
    icon: PersonIcon,
    detail: "Profil und Skills.",
  }/*  ,
  
  {
    key: "foto-uploader",
    label: "Foto Uploader",
    href: "#foto-uploader",
    icon: CloudUploadIcon,
    detail: "Profil und Skills.",
  }, */

];
export const subCategories: Record<"foto" | "garten" | "certificates", string[]> = {
  foto: [ "natur", "herbst", "blumen", "frühling", "stadt", "makro", "sommer", "winter" ],
  garten: [ "herbst", "ernte", "gemuese", "frühling", "pflanzen", "werkzeuge", "sommer", "winter" ],
  certificates: [ "Coursera","BTK","Udemy" ],
};

export const hauptKategorien = [ "foto", "garten", "certificates" ] as const;

export const unterKategorien: Record<string, string[]> = {
  foto: [ "natur", "herbst", "blumen", "frühling", "stadt", "makro", "sommer", "winter" ],
  garten: [ "herbst", "ernte", "gemuese", "frühling", "pflanzen", "werkzeuge", "sommer", "winter" ],
  certificates: [ "Coursera","BTK","Udemy" ],
};
