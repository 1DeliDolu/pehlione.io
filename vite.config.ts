import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const githubUsername =
    env.VITE_IO_USERNAME ||
    env.IO_USERNAME ||
    env.VITE_GITHUB_USER ||
    env.GITHUB_USER ||
    "1DeliDolu";

  return {
    // BASE_PATH ortam değişkeni ile GH Pages proje repo yolunu ayarlama.
    // username.github.io için "/" kalır; proje repo için "/repo-adi/" verilir.
    base: env.BASE_PATH || process.env.BASE_PATH || "/",
    plugins: [
      {
        name: "inject-github-profile-url",
        transformIndexHtml(html) {
          return html.replaceAll(
            "__GITHUB_PROFILE_URL__",
            `https://github.com/${githubUsername}`,
          );
        },
      },
      react(),
      tailwindcss(),
    ],
    define: {
      __IO_USERNAME__: JSON.stringify(githubUsername),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
