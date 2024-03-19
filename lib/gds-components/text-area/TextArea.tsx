/**
 * GDS component: https://design-system.service.gov.uk/components/textarea/
 */
import cn from "classnames";
import { CharacterCount } from "../character-count/CharacterCount";

interface TextAreaProps {
  label?: string;
  hint?: string;
  onChange: (value: string) => void;
  value: string;
  id: string;
  characterLimit?: number;
  error?: string;
}

export const TextArea = ({
  label,
  hint,
  onChange,
  value,
  characterLimit,
  error,
  id,
}: TextAreaProps) => {
  return (
    <div
      className={cn("govuk-form-group govuk-!-width-two-thirds", {
        "govuk-form-group--error": error,
      })}
    >
      {label && (
        <label className="govuk-label govuk-label--m" htmlFor={id}>
          {label}
        </label>
      )}
      {hint && (
        <div id={`${id}-hint`} className="govuk-hint">
          {hint}
        </div>
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
        aria-describedby={
          cn({
            [`${id}-character-count`]: !!characterLimit,
            [`${id}-hint`]: !!hint,
          }) || undefined
        }
      />
      {characterLimit && (
        <CharacterCount
          characterLimit={characterLimit}
          id={`${id}-character-count`}
          numberOfCharacters={value.length}
        />
      )}
    </div>
  );
};
