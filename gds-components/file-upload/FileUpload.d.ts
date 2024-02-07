/**
 * GDS component: https://design-system.service.gov.uk/components/file-upload/
 */
interface FileUploadProps {
    label: string;
    onChange: (value: File) => void;
    accept?: string;
}
export declare const FileUpload: ({ label, onChange, accept, }: FileUploadProps) => import("react/jsx-runtime").JSX.Element;
export {};
