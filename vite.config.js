import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Repo adı "Fatih17-s.github.io" olduğu için base "/" kalmalı.
// Eğer normal bir proje reposu kullanırsan (ör: "portfolio"),
// base değerini "/portfolio/" yap.
export default defineConfig({
  plugins: [react()],
  base: "/",
});
