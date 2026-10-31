import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    include: ["src/**/*.test.ts"],
    coverage: {
      include: ["src/domain/**"],
      exclude: ["src/domain/**/*.test.ts", "src/domain/types.ts"],
      thresholds: { lines: 90, functions: 90, branches: 90 },
    },
  },
});
