/**
 * GDS component: https://design-system.service.gov.uk/components/date-input/
 */
export interface DateInputProps {
    label: string;
    name: string;
    onChange: (value: string) => void;
    value: string;
}
export declare const DateInput: ({ value, label, name, onChange }: DateInputProps) => import("react/jsx-runtime").JSX.Element;
