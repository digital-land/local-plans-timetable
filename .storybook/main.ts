import type { StorybookConfig } from "@storybook/react-vite";
import { withoutVitePlugins } from "@storybook/builder-vite";

const config: StorybookConfig = {
  stories: ["../lib/**/*.mdx", "../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: [
    {
      from: "../node_modules/govuk-frontend/dist/govuk/assets/fonts",
      to: "assets/fonts",
    },
  ],
  viteFinal: async (config) => {
    return {
      ...config,
      plugins: await withoutVitePlugins(config.plugins, [
        "vite:lib-inject-css",
      ]),
    };
  },
};
export default config;
