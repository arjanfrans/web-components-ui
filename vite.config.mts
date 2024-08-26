import {defineConfig} from "vite";
import checker from "vite-plugin-checker";
import dts from "vite-plugin-dts";
import {resolve} from "path";

const libConfig = defineConfig({
    plugins: [
        dts({
            include: [resolve(__dirname, "src/lib/main.ts")],
        }),
        checker({
            typescript: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src/lib/main.ts"),
            fileName: "lib/main",
            formats: ["es"],
        },
        outDir: "dist",
        sourcemap: true, // Optionally enable source maps
    },
});

const staticConfig = defineConfig({
    base: process.env.BASE_PATH ?? "/",
    plugins: [
        dts({
            include: [resolve(__dirname, "src/static/main.ts")],
        }),
        checker({
            typescript: true,
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        },
        lib: {
            entry: resolve(__dirname, "src/static/main.ts"),
            fileName: "static/main",
            formats: ["es"],
        },
        outDir: "dist",
    },
});

export default process.env.TARGET === "static" ? staticConfig : libConfig;
