/**
 * GDS component: https://design-system.service.gov.uk/components/text-input/
 */
interface TextInputProps {
    label: string;
    onChange: (value: string) => void;
    value: string;
}
export declare const TextInput: ({ label, onChange, value }: TextInputProps) => import("react/jsx-runtime").JSX.Element;
export {};
