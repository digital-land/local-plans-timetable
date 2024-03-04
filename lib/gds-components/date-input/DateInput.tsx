/**
 * GDS component: https://design-system.service.gov.uk/components/date-input/
 */
import cn from "classnames";

export interface DateInputProps {
  label?: string;
  name: string;
  onChange: (value: string) => void;
  value: string;
  id: string;
  error?: string;
  withDay?: boolean;
}

export const DateInput = ({
  value,
  label,
  name,
  onChange,
  error,
  id,
  withDay = false,
}: DateInputProps) => {
  const [year = "", month = "", day = ""] = value.split("-");

  const handleChange = (value: string) => {
    onChange(value.replace(/-/g, "").length ? value : "");
  };

  return (
    <div
      className={cn("govuk-form-group", { "govuk-form-group--error": error })}
      id={id}
    >
      <fieldset
        className="govuk-fieldset"
        role="group"
        aria-describedby={`${name}-hint`}
      >
        {label && (
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            {label}
          </legend>
        )}
        {error && (
          <p className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {error}
          </p>
        )}
        <div id={`${name}-hint`} className="govuk-hint">
          For example,{withDay ? " 12" : ""} 8 2024
        </div>
        <div className="govuk-date-input">
          {withDay && (
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label
                  className="govuk-label govuk-date-input__label"
                  htmlFor={`${name}-day`}
                >
                  Day
                </label>
                <input
                  id={`${name}-day`}
                  data-testid={`${name}-day`}
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  type="text"
                  inputMode="numeric"
                  value={day}
                  onChange={(e) =>
                    handleChange(`${year}-${month}-${e.target.value}`)
                  }
                  onBlur={(e) =>
                    e.target.value.length == 1 &&
                    handleChange(`${year}-${month}-${"0" + e.target.value}`)
                  }
                  maxLength={2}
                />
              </div>
            </div>
          )}
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
                onChange={(e) =>
                  handleChange(
                    `${year}-${e.target.value}${withDay ? `-${day}` : ""}`
                  )
                }
                onBlur={(e) =>
                  e.target.value.length == 1 &&
                  handleChange(
                    `${year}-${"0" + e.target.value}${withDay ? `-${day}` : ""}`
                  )
                }
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
                onChange={(e) =>
                  handleChange(
                    `${e.target.value}-${month}${withDay ? `-${day}` : ""}`
                  )
                }
                maxLength={4}
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
};
