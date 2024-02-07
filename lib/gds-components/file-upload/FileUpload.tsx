/**
 * GDS component: https://design-system.service.gov.uk/components/file-upload/
 */

interface FileUploadProps {
  label: string;
  onChange: (value: File) => void;
  accept?: string;
}

export const FileUpload = ({
  label,
  onChange,
  accept = ".csv",
}: FileUploadProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      onChange(e.target.files[0]);
    }
  };

  return (
    <div className="govuk-form-group">
      <label className="govuk-label">{label}</label>
      <input
        className="govuk-file-upload"
        type="file"
        accept={accept}
        onChange={handleChange}
      />
    </div>
  );
};
