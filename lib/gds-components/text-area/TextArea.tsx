/**
 * GDS component: https://design-system.service.gov.uk/components/textarea/
 */
import cn from "classnames";

const getRemainingCharactersMessage = (
  numberOfCharacters: number,
  characterLimit: number
) => {
  const remainingCharacters = characterLimit - numberOfCharacters;

  return `You have ${remainingCharacters} character${
    Math.abs(remainingCharacters) === 1 ? "" : "s"
  } ${remainingCharacters < 0 ? "too many" : "remaining"}`;
};

interface TextAreaProps {
  label?: string;
  onChange: (value: string) => void;
  value: string;
  id: string;
  characterLimit?: number;
  error?: string;
}

export const TextArea = ({
  label,
  onChange,
  value,
  characterLimit,
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
      {characterLimit && (
        <div id="more-detail-hint" className="govuk-hint">
          {getRemainingCharactersMessage(value.length, characterLimit)}
        </div>
      )}
    </div>
  );
};
