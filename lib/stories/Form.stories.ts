import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../timetable-form/Form';

const meta = {
  title: 'Example/Form',
  component: Form,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleForm: Story = {};
