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
      failOnError: false,
      failOnWarning: false,
      emitWarning: true,
      emitError: true,
    }),
  ],
  base: "/quizdom-react-app/",
  define: {
    "process.env": process.env,
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        silenceDeprecations: ["legacy-js-api"],
      },
    },
    devSourcemap: true,
  },
});
