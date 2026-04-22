import dotenv from "dotenv";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-expect-error
import eslint from "vite-plugin-eslint";
import { visualizer } from "rollup-plugin-visualizer";

dotenv.config();

const ReactCompilerConfig = {
  /* ... */
};

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
    eslint({
      cache: false,
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: ["node_modules", "dist"],
      failOnError: false,
      failOnWarning: false,
      emitWarning: true,
      emitError: true,
    }),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: "dist/stats.html",
    }),
  ],
  base: "/quizdom-react-app/",
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // Firebase
          "firebase-auth": ["firebase/app", "firebase/auth"],
          "firebase-firestore": ["firebase/firestore"],
          "firebase-storage": ["firebase/storage"],
          "firebase-functions": ["firebase/functions"],
          // UI Libraries
          "bootstrap-vendor": ["react-bootstrap", "bootstrap"],
          // Forms
          "form-vendor": ["react-hook-form", "@hookform/resolvers", "yup"],
          // Other heavy vendors
          "mapbox-vendor": ["@mapbox/search-js-react"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: true,
    proxy: {
      "/api": {
        target: "http://localhost:5001/quizdom-react-app/us-central1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
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
