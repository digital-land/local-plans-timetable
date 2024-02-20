import type { Meta, StoryObj } from "@storybook/react";

import { FormStage } from "../timetable-form/FormStage";

const meta = {
  title: "Example/FormStage",
  component: FormStage,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof FormStage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StageWithEndEvent: Story = {
  args: {
    title: "Public Consultation",
    description: (
      <p className="govuk-body">
        Regulation 18 consultation, also known as issues and options.
        <br />
        You can read more about the{" "}
        <a href="#" className="govuk-link">
          requirements for Regulation 18 on <br />
          legislation.gov.uk (opens in new tab)
        </a>
      </p>
    ),
    startEvent: "public-consultation-start",
    endEvent: "public-consultation-end",
  },
};

export const StageWithoutEndEvent: Story = {
  args: {
    title: "Submission",
    description: (
      <p className="govuk-body">
        The date the plan is submitted to the Planning Inspectorate
        <div className="govuk-inset-text">
          If you do not know the exact dates tell us predicted timescales.
          <br />
          You’ll need to update this form once a date is confirmed.
        </div>
      </p>
    ),
    startEvent: "draft-plan-for-public-consultation-published",
  },
};
