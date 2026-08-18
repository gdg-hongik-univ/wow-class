import type { StorybookConfig } from "@storybook/nextjs";

import path, { join, dirname } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [getAbsolutePath("@storybook/addon-essentials")],

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },

  async webpackFinal(config) {
    config.module = config.module || { rules: [] };
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve("swc-loader"),
          options: {
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: true,
              },
              transform: {
                react: {
                  runtime: "automatic",
                },
              },
            },
          },
        },
      ],
    });

    if (config?.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "next/navigation": path.resolve(__dirname, "./mocks/nextNavigation.ts"),
        "@": path.resolve(__dirname, "../src"),
        src: path.resolve(__dirname, "../src"),
        "@styled-system": path.resolve(__dirname, "../styled-system"),
      };
    }
    return config;
  },
};
export default config;
