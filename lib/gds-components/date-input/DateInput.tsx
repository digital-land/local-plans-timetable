/**
 * GDS component: https://design-system.service.gov.uk/components/date-input/
 */
import cn from "classnames";

export interface DateInputProps {
  label: string;
  name: string;
  onChange: (value: string) => void;
  value: string;
  error?: string;
}

export const DateInput = ({
  value,
  label,
  name,
  onChange,
  error,
}: DateInputProps) => {
  const [year = "", month = ""] = value.split("-");

  return (
    <div
      className={cn("govuk-form-group", { "govuk-form-group--error": error })}
    >
      <fieldset
        className="govuk-fieldset"
        role="group"
        aria-describedby={`${name}-hint`}
      >
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
          {label}
        </legend>
        {error && (
          <p id="passport-issued-error" className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {error}
          </p>
        )}
        <div id={`${name}-hint`} className="govuk-hint">
          For example, 3 2007
        </div>
        <div className="govuk-date-input">
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <label
                className="govuk-label govuk-date-input__label"
                htmlFor={`${name}-month`}
              >
                Month
              </label>
              <input
                id={`${name}-month`}
                data-testid={`${name}-month`}
                className="govuk-input govuk-date-input__input govuk-input--width-2"
                type="text"
                inputMode="numeric"
                value={month}
                onChange={(e) => onChange(`${year}-${e.target.value}`)}
                maxLength={2}
              />
            </div>
          </div>
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <label
                className="govuk-label govuk-date-input__label"
                htmlFor={`${name}-year`}
              >
                Year
              </label>
              <input
                id={`${name}-year`}
                data-testid={`${name}-year`}
                className="govuk-input govuk-date-input__inpaut govuk-input--width-4"
                type="text"
                inputMode="numeric"
                value={year}
                onChange={(e) => onChange(`${e.target.value}-${month}`)}
                maxLength={4}
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
};
