/**
 * GDS component: https://design-system.service.gov.uk/components/text-input/
 */
import cn from "classnames";

interface TextInputProps {
  label?: string;
  onChange: (value: string) => void;
  value: string;
  id: string;
  error?: string;
  hint?: string;
}

export const TextInput = ({
  label,
  onChange,
  value,
  hint,
  id,
  error,
}: TextInputProps) => (
  <div
    className={cn("govuk-form-group", { "govuk-form-group--error": error })}
    id={id}
  >
    <label className="govuk-label">
      {label && label}
      {error && (
        <p className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> {error}
        </p>
      )}
      <input
        className="govuk-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
    {hint && (
      <div id="more-detail-hint" className="govuk-hint">
        {hint}
      </div>
    )}
  </div>
);
