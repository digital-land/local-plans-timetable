import type { Meta, StoryObj } from "@storybook/react";

import { TitlePage } from "../timetable-form/pages/title-page/TitlePage";

import "govuk-frontend/dist/govuk/govuk-frontend.min.css";

const meta = {
  title: "Example/TitlePage",
  component: TitlePage,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof TitlePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleTitlePage: Story = {};

