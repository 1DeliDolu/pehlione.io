import type { Cert, Project } from "@/types/types";
import DescriptionIcon from "@mui/icons-material/Description";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import WorkIcon from "@mui/icons-material/Work";
import FolderIcon from "@mui/icons-material/Folder";
import PersonIcon from "@mui/icons-material/Person";

export const subCategories: Record<"foto" | "garten", string[]> = {
  foto: ["natur", "herbst", "blumen"],
  garten: ["herbst", "ernte", "gemuese"],
};

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

// Example projects; replace with your actual projects
export const projects: Project[] = [
  {
    name: "Portfolio-Website",
    description: "Persönliche Website mit React + TypeScript + Vite.",
    demoUrl: "https://pehlione.com/",
    repoUrl: "https://github.com/1DeliDolu/pehlione.io/",
  },
  {
    name: "Grafana Data Source Plugin für PRTG",
    description:
      "Plugin zur Integration von PRTG in Grafana (Go Backend, TypeScript Frontend).",
    demoUrl: "https://pehlione.com/",
    repoUrl: "https://github.com/1DeliDolu/PRTG",
  },
];

export const certificates: Cert[] = [
  {
    name: "Responsive Web Design",
    issuer: "FreeCodeCamp",
    img: "/certificates/responsive-web-design.png",
  },
  {
    name: "Transact-SQL",
    issuer: "Microsoft",
    img: "/certificates/tsql.png",
  },
  {
    name: "Generative AI Engineering with LLMs",
    issuer: "Coursera",
    img: "/certificates/6UJ5Q3W7Q4IT.png",
  },
  {
    name: "Building Generative AI-Powered Applications with Python",
    issuer: "Coursera",
    img: "/certificates/SPUWYF1LZ4HN.png",
  },
  {
    name: "Generative AI and LLMs: Architecture and Data Preparation",
    issuer: "Coursera",
    img: "/certificates/KDHR6PKZH6DX.png",
  },
  {
    name: "Java Programming: Solving Problems with Software",
    issuer: "Coursera",
    img: "/certificates/GQAY75EGH85E.png",
  },
  {
    name: "Advanced Styling with Responsive Design",
    issuer: "Coursera",
    img: "/certificates/HHVRQZCEKE9M.png",
  },
  {
    name: "Interactivity with JavaScript",
    issuer: "Coursera",
    img: "/certificates/BBZHU77E8F6Y.png",
  },
  {
    name: "PHP",
    issuer: "BTK",
    img: "/certificates/php.png",
  },
  {
    name: "Web Programming with React",
    issuer: "BTK",
    img: "/certificates/react.png",
  },
  {
    name: "Introduction to HTML5",
    issuer: "Coursera",
    img: "/certificates/V2USGSAUHM55.png",
  },
  {
    name: "Introduction to CSS3",
    issuer: "Coursera",
    img: "/certificates/UXZ788Y7QCEG.png",
  },
  {
    name: "Legacy JavaScript Algorithms and Data Structures",
    issuer: "FreeCodeCamp",
    img: "/certificates/legacy-js.png",
  },

  {
    name: "Web Programlama with Node.js",
    issuer: "BTK",
    img: "/certificates/nodejs.png",
  },
  {
    name: "Golang",
    issuer: "BTK",
    img: "/certificates/golang.png",
  },
  {
    name: "Kubernetes",
    issuer: "BTK",
    img: "/certificates/kubernetes.png",
  },
  {
    name: "DevOps(Jenkins)",
    issuer: "BTK",
    img: "/certificates/devops.png",
  },
  {
    name: "Blazor for Front-End Development",
    issuer: "Coursera",
    img: "/certificates/M4MG23CVGISK.png",
  },
  {
    name: "Laravel Protections",
    issuer: "Coursera",
    img: "/certificates/DQXMD3BRZA9Z.png",
  },
  {
    name: "Y0PGW8LUDE7F",
    issuer: "Coursera",
    img: "/certificates/Y0PGW8LUDE7F.png",
  },
  {
    name: "Secure Coding in Laravel",
    issuer: "Coursera",
    img: "/certificates/WA1NZF2O2J9H.png",
  }

];

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
  },
];

export const hauptKategorien = ["foto", "garten"] as const;

export const unterKategorien: Record<string, string[]> = {
  foto: ["natur", "herbst", "blumen"],
  garten: ["herbst", "ernte", "gemuese"],
};
