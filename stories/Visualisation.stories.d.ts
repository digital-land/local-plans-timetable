import type { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    component: (props: import("../timetable-visualisation/Visualisation").VisualisationProps) => import("react/jsx-runtime").JSX.Element;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const ExampleVisualisation: Story;
