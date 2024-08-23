import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import dts from "vite-plugin-dts";
import { resolve } from "path";

const libConfig = defineConfig({
  plugins: [
    dts({
      // Only include files relevant to the library
      include: [resolve(__dirname, "src/lib.ts")],
    }),
    checker({
      typescript: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib.ts"),
      fileName: "main",
      formats: ["es"],
    },
    sourcemap: true, // Optionally enable source maps
  },
});

const staticConfig = defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [
    checker({
      typescript: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/static.ts"),
      fileName: "main",
      formats: ["es"],
    },
    outDir: "static-dist", // Output directory for static build
  },
});

export default process.env.TARGET === "static" ? staticConfig : libConfig;
