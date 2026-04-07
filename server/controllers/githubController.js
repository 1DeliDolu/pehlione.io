import { listGithubRepos } from "../services/githubService.js";

export async function listUserRepos(req, res) {
  const perPage = req.query.per_page ?? req.query.perPage ?? 10;

  try {
    const { repos, cache, source, warning } = await listGithubRepos(req.params.username, perPage);

    res.set("Cache-Control", "public, max-age=60");
    res.set("X-Repo-Cache", cache);
    res.set("X-Repo-Source", source);
    if (warning) {
      res.set("X-Repo-Warning", warning);
    }

    return res.json(repos);
  } catch (error) {
    console.error("GitHub repo proxy error:", error);

    return res.status(502).json({
      ok: false,
      error: "Failed to fetch GitHub repositories",
    });
  }
}
