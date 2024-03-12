/**
 * GDS component: https://design-system.service.gov.uk/components/text-input/
 */
import cn from "classnames";
import { CharacterCount } from "../character-count/CharacterCount";

interface TextInputProps {
  label?: string;
  onChange: (value: string) => void;
  value: string;
  id: string;
  error?: string;
  characterLimit?: number;
}

export const TextInput = ({
  label,
  onChange,
  value,
  characterLimit,
  id,
  error,
}: TextInputProps) => (
  <div className={cn("govuk-form-group govuk-!-width-one-half", { "govuk-form-group--error": error })}>
    <label className="govuk-label" htmlFor={id}>
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
        id={id}
        aria-describedby={characterLimit ? `${id}-character-count` : undefined}
      />
    </label>
    {characterLimit && (
      <CharacterCount
        characterLimit={characterLimit}
        id={`${id}-character-count`}
        numberOfCharacters={value.length}
      />
    )}
  </div>
);
