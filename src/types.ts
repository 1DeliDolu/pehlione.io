export interface FotoEintrag {
  id: string;
  src: string;
  name: string;
  title: string;
  description: string;
  category: "foto" | "garten";
  sub_category: string;
}

export interface Cert {
  name: string;
  issuer: string;
  img: string; // served from /public
}

export interface Props {
  onOpenDrawer?: () => void;
  variant?: "summary" | "detail";
  onOpenPage?: (page: "gartenarbeit" | "fotografie") => void;
}

export interface Project {
  name: string;
  description: string;
  demoUrl?: string;
  repoUrl?: string;
}

export interface Cv {
  cvUrl?: string;
  onOpenDrawer?: () => void;
}

export interface Repo_ {
  username: string;
  perPage?: number;
  onOpenDrawer?: () => void;
  variant?: "summary" | "detail";
}


export interface Repo  {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
};
