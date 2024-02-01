/**
 * GDS component: https://design-system.service.gov.uk/components/text-input/
 */

interface TextInputProps {
  label: string;
  onChange: (value: string) => void;
  value: string;
}

export const TextInput = ({ label, onChange, value }: TextInputProps) => (
  <div className="govuk-form-group">
    <label className="govuk-label">
      {label}
      <input
        className="govuk-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  </div>
);
