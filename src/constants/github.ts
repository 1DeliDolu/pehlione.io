const DEFAULT_IO_USERNAME = "1DeliDolu";

const normalizeUsername = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : DEFAULT_IO_USERNAME;
};

export const githubUsername = normalizeUsername(__IO_USERNAME__);
export const githubProfileUrl = `https://github.com/${githubUsername}`;
export const githubRepositoriesUrl = `${githubProfileUrl}?tab=repositories`;

export const withConfiguredGithubOwner = (url: string) => {
  if (!url.startsWith("https://github.com/")) return url;

  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return url;
    parts[0] = githubUsername;
    parsed.pathname = `/${parts.join("/")}`;
    return parsed.toString();
  } catch {
    return url;
  }
};
