import type { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    component: (props: {
        stagesFilepath: string;
        headersFilepath: string;
    }) => import("react/jsx-runtime").JSX.Element;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const ExampleVisualisation: Story;
