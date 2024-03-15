/**
 * GDS component: https://design-system.service.gov.uk/components/radios/
 */
import cn from "classnames";

export type RadioOption = { label: string; value: string };

type RadiosProps = {
  label?: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  id: string;
  inline?: boolean;
  error?: string;
  selectedOption?: string;
};

export const Radios = ({
  label,
  onChange,
  inline = false,
  options,
  error,
  id,
  selectedOption,
}: RadiosProps): JSX.Element => {
  return (
    <div
      className={cn("govuk-form-group", { "govuk-form-group--error": error })}
    >
      <fieldset className="govuk-fieldset" id={id}>
        {label && (
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">{label}</h1>
          </legend>
        )}
        {error && (
          <p className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {error}
          </p>
        )}
        <div
          className={cn("govuk-radios", { "govuk-radios--inline": inline })}
          data-module="govuk-radios"
        >
          {options.map(({ label, value }) => (
            <div className="govuk-radios__item" key={label}>
              <input
                className="govuk-radios__input"
                type="radio"
                value={value}
                id={value}
                name="radios"
                role="radio-input"
                checked={selectedOption === value}
                onChange={(e) => onChange(e.target.value)}
              />
              <label
                className="govuk-label govuk-radios__label"
                htmlFor={value}
              >
                {label}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};
