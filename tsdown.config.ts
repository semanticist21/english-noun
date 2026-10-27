import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    top50: "src/top50.ts",
    top25: "src/top25.ts",
    top10: "src/top10.ts"
  },
  format: "esm",
  dts: true,
  clean: true
});
