import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    poolOptions: {
      threads: { execArgv: ["--env-file=.env"] },
    },
    testTimeout: 50000, 
    hookTimeout: 50000,
  },
});