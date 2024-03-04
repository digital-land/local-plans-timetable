/**
 * GDS component: https://design-system.service.gov.uk/components/textarea/
 */
import cn from "classnames";

interface TextAreaProps {
  label?: string;
  onChange: (value: string) => void;
  value: string;
  id: string;
  hint?: string;
  error?: string;
}

export const TextArea = ({
  label,
  onChange,
  value,
  hint,
  error,
  id,
}: TextAreaProps) => {
  return (
    <div
      className={cn("govuk-form-group", { "govuk-form-group--error": error })}
    >
      {label && (
        <label className="govuk-label govuk-label--m" htmlFor={id}>
          {label}
        </label>
      )}
      {error && (
        <p className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> {error}
        </p>
      )}
      <textarea
        className="govuk-textarea govuk-!-margin-bottom-2"
        data-testid={`${label ? label.replace(/ /g, "-") : "input"}-text-area`}
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id={id}
      />
      {hint && (
        <div id="more-detail-hint" className="govuk-hint">
          {hint}
        </div>
      )}
    </div>
  );
};
