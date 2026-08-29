import type { StorybookConfig } from "@storybook/nextjs";

import path, { join, dirname } from "path";

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [getAbsolutePath("@storybook/addon-essentials")],

  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },

  async webpackFinal(config) {
    if (config?.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
        src: path.resolve(__dirname, "../src"),
        "@styled-system": path.resolve(__dirname, "../styled-system"),
      };
    }
    config.cache = false;
    return config;
  },
};
export default config;
