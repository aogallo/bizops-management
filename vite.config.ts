/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    env: loadEnv(mode, process.cwd(), ""),
    setupFiles: "./src/tests/setup.ts",
  },
}));
