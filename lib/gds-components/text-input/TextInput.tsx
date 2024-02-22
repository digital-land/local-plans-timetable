/**
 * GDS component: https://design-system.service.gov.uk/components/text-input/
 */

interface TextInputProps {
  label: string;
  onChange: (value: string) => void;
  value: string;
  hint?: string;
  showLabel?: boolean;
}

export const TextInput = ({
  label,
  onChange,
  value,
  hint,
  showLabel = true,
}: TextInputProps) => (
  <div className="govuk-form-group">
    <label className="govuk-label">
      {showLabel && label}
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
