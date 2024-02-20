/**
 * GDS component: https://design-system.service.gov.uk/components/textarea/
 */

interface TextAreaProps {
  label: string;
  onChange: (value: string) => void;
  value: string;
  hint?: string;
}

export const TextArea = ({ label, onChange, value, hint }: TextAreaProps) => {
  return (
    <div className="govuk-form-group">
      <h1 className="govuk-label-wrapper">
        <label className="govuk-label govuk-label--m">{label}</label>
      </h1>
      <textarea
        className="govuk-textarea govuk-!-margin-bottom-2"
        data-testid={`${label}-text-area`}
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && (
        <div id="more-detail-hint" className="govuk-hint">
          {hint}
        </div>
      )}
    </div>
  );
};
