import type { Meta, StoryObj } from '@storybook/react';

import { Visualisation } from '../timetable-visualisation/Visualisation';

const meta = {
  title: 'Example/Visualisation',
  component: Visualisation,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Visualisation>;

export default meta;
type Story = StoryObj<typeof meta>;


export const ExampleVisualisation: Story = {
  args: {
    stagesFilepath: "/assets/timetable.csv",
    headersFilepath: "/assets/timetableHeader.csv",
  },
};