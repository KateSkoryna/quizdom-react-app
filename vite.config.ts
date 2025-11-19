import dotenv from "dotenv";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// @ts-expect-error
import eslint from "vite-plugin-eslint";

dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    eslint({
      cache: false,
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: ["node_modules", "dist"],
    }),
  ],
  base: "/quizdom-react-app",
  define: {
    "process.env": process.env,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
});
