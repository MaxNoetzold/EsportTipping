/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  test: {
    environment: "happy-dom",
    setupFiles: ["./setupTests.ts"],
    includeSource: ["src/**/*.{ts,tsx}"],
    mockReset: true,
    restoreMocks: true,
    css: true,
  },
});
