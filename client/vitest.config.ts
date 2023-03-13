/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
// @ts-ignore
import path from "path";

export default defineConfig({
    test: {
        globals: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
