/**
 * GDS component: https://design-system.service.gov.uk/components/file-upload/
 */

import cn from "classnames";

interface FileUploadProps {
  label: string;
  onChange: (value: File) => void;
  accept?: string;
  error?: string;
  id: string;
}

export const FileUpload = ({
  label,
  onChange,
  accept = ".csv",
  error,
  id,
}: FileUploadProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      onChange(e.target.files[0]);
    }
  };

  return (
    <div
      className={cn("govuk-form-group", { "govuk-form-group--error": error })}
    >
      <label className="govuk-label govuk-label--m" htmlFor="file-upload">
        {label}
      </label>
      {error && (
        <p className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> {error}
        </p>
      )}
      <input
        id={id}
        className="govuk-file-upload"
        type="file"
        accept={accept}
        onChange={handleChange}
      />
    </div>
  );
};
