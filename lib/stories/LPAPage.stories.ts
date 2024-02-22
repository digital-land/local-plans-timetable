import type { Meta, StoryObj } from "@storybook/react";

import { LPAPage } from "../timetable-form/pages/LPAPage";

import "govuk-frontend/dist/govuk/govuk-frontend.min.css";

const meta = {
  title: "Example/LPAPage",
  component: LPAPage,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof LPAPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleLPAPage: Story = {};

