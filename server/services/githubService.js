import { readCollection } from "./dbService.js";
import { runtimeConfig } from "../config/runtime.js";

const GITHUB_API_BASE_URL = "https://api.github.com";
const REPO_CACHE_TTL_MS = 5 * 60 * 1000;
const repoCache = new Map();

function buildCacheKey(username, perPage) {
  return `${username}:${perPage}`;
}

function sanitizePerPage(value) {
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isFinite(parsed)) return 10;
  return Math.min(Math.max(parsed, 1), 100);
}

function getCachedRepos(username, perPage) {
  const entry = repoCache.get(buildCacheKey(username, perPage));
  if (!entry) return null;
  return entry;
}

function setCachedRepos(username, perPage, repos) {
  repoCache.set(buildCacheKey(username, perPage), {
    repos,
    fetchedAt: Date.now(),
  });
}

function getRepoNameFromUrl(url) {
  try {
    const pathname = new URL(url).pathname.replace(/\/+$/, "");
    return pathname.split("/").pop()?.replace(/\.git$/, "") ?? url;
  } catch {
    return url.replace(/\/+$/, "").split("/").pop()?.replace(/\.git$/, "") ?? url;
  }
}

function withConfiguredGithubOwner(url) {
  if (!url.startsWith("https://github.com/")) return url;

  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return url;
    parts[0] = runtimeConfig.githubUsername;
    parsed.pathname = `/${parts.join("/")}`;
    return parsed.toString();
  } catch {
    return url;
  }
}

function inferLanguage(input) {
  const value = String(input).toLowerCase();
  if (value.includes("typescript") || value.includes("react")) return "TypeScript";
  if (value.includes("go ") || value.includes("golang")) return "Go";
  if (value.includes("spring boot") || value.includes("java")) return "Java";
  if (value.includes("laravel") || value.includes("symfony") || value.includes("php")) return "PHP";
  if (value.includes("c#") || value.includes(".net")) return "C#";
  return null;
}

async function listStaticRepos(perPage) {
  const projects = (await readCollection("projects")) ?? [];

  return projects
    .filter((project) => project?.repoUrl || project?.demoUrl)
    .slice(0, perPage)
    .map((project, index) => ({
      id: -(index + 1),
      name: project.repoUrl ? getRepoNameFromUrl(project.repoUrl) : project.name,
      html_url: project.repoUrl
        ? withConfiguredGithubOwner(project.repoUrl)
        : project.demoUrl ?? "#",
      description: project.description ?? null,
      stargazers_count: -1,
      language: inferLanguage(`${project.name ?? ""} ${project.description ?? ""}`),
      updated_at: "",
      pushed_at: "",
    }));
}

export function getRepoCacheStatus(username, perPage) {
  const entry = getCachedRepos(username, perPage);
  if (!entry) return null;
  return Date.now() - entry.fetchedAt < REPO_CACHE_TTL_MS ? "fresh" : "stale";
}

export async function listGithubRepos(username, perPageInput) {
  const perPage = sanitizePerPage(perPageInput);
  const cacheEntry = getCachedRepos(username, perPage);
  const cacheStatus = getRepoCacheStatus(username, perPage);

  if (cacheEntry && cacheStatus === "fresh") {
    return {
      repos: cacheEntry.repos,
      source: "cache",
      cache: "hit",
      warning: null,
    };
  }

  const url = new URL(`${GITHUB_API_BASE_URL}/users/${encodeURIComponent(username)}/repos`);
  url.searchParams.set("sort", "pushed");
  url.searchParams.set("per_page", String(perPage));

  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "pehlione-portfolio",
  };

  if (runtimeConfig.githubToken) {
    headers.Authorization = `Bearer ${runtimeConfig.githubToken}`;
  }

  let response;

  try {
    response = await fetch(url, { headers });
  } catch (error) {
    if (cacheEntry) {
      return {
        repos: cacheEntry.repos,
        source: "cache",
        cache: "stale",
        warning: "network",
      };
    }
    return {
      repos: await listStaticRepos(perPage),
      source: "static",
      cache: "fallback",
      warning: "network",
    };
  }

  if (!response.ok) {
    if (cacheEntry) {
      return {
        repos: cacheEntry.repos,
        source: "cache",
        cache: "stale",
        warning: `github-${response.status}`,
      };
    }
    return {
      repos: await listStaticRepos(perPage),
      source: "static",
      cache: "fallback",
      warning: `github-${response.status}`,
    };
  }

  const repos = await response.json();
  setCachedRepos(username, perPage, repos);

  return {
    repos,
    source: "github",
    cache: cacheEntry ? "refresh" : "miss",
    warning: null,
  };
}
