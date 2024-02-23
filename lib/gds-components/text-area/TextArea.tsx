/**
 * GDS component: https://design-system.service.gov.uk/components/textarea/
 */

interface TextAreaProps {
  label?: string;
  onChange: (value: string) => void;
  value: string;
  hint?: string;
}

export const TextArea = ({ label, onChange, value, hint }: TextAreaProps) => {
  return (
    <div className="govuk-form-group">
      {label && <label className="govuk-label">{label}</label>}
      <textarea
        className="govuk-textarea govuk-!-margin-bottom-2"
        data-testid={`${label ? label.replace(/ /g, "-") : "input"}-text-area`}
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
