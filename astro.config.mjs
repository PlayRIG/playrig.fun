// @ts-check
// @ts-check
import {defineConfig} from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import svgr from "vite-plugin-svgr";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  server: {
    port: 8080,
    host: "0.0.0.0",
  },
  integrations: [react(), tailwind({nesting: true})],
  experimental: {
    svg: true,
  },
  vite: {
    define: {
      global: "globalThis",
    },
    plugins: [
      svgr({
        include: "**/*.svg?react",
        svgrOptions: {
          plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
          svgoConfig: {
            plugins: [
              "preset-default",
              "removeTitle",
              "removeDesc",
              "removeDoctype",
              "cleanupIds",
            ],
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@components": "/src/components",
        "@assets": "/src/assets",
        "@layouts": "/src/layouts",
      },
    },
  },
});
