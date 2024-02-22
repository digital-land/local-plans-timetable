import type { Meta, StoryObj } from "@storybook/react";

import { DescriptionPage } from "../timetable-form/pages/DescriptionPage";

import "govuk-frontend/dist/govuk/govuk-frontend.min.css";

const meta = {
  title: "Example/DescriptionPage",
  component: DescriptionPage,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof DescriptionPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleDescriptionPagePage: Story = {};

