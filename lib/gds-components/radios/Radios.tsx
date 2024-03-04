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
};

export const Radios = ({
  label,
  onChange,
  inline = false,
  options,
  error,
  id
}: RadiosProps): JSX.Element => {
  return (
    <div
      className={cn("govuk-form-group", { "govuk-form-group--error": error })}
      id={id}
    >
      <fieldset className="govuk-fieldset">
        {label && (
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">{label}</h1>
          </legend>
        )}
        <div
          className={cn("govuk-radios", { "govuk-radios--inline": inline })}
          data-module="govuk-radios"
        >
          {error && (
            <p className="govuk-error-message">
              <span className="govuk-visually-hidden">Error:</span> {error}
            </p>
          )}
          {options.map(({ label, value }) => (
            <div className="govuk-radios__item" key={label}>
              <input
                className="govuk-radios__input"
                type="radio"
                value={value}
                id={label.replace(/ /g, "-")}
                name="radios"
                role="radio-input"
                onChange={(e) => onChange(e.target.value)}
              />
              <label
                className="govuk-label govuk-radios__label"
                htmlFor={label.replace(/ /g, "-")}
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
