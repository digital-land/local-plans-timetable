/**
 * GDS component: https://design-system.service.gov.uk/components/button/
 */
/// <reference types="react" />
interface ButtonProps {
    children?: React.ReactNode;
    type?: "submit" | "button" | "reset";
}
export declare const Button: ({ children, type }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export {};
