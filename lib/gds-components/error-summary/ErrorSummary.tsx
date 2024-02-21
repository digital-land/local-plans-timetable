/**
 * GDS component: https://design-system.service.gov.uk/components/error-summary/
 */

import { ValidationErrorItem } from "joi";

interface ErrorSummaryProps {
  errors: ValidationErrorItem[];
  title?: string;
}

export const ErrorSummary = ({
  title = "There is a problem",
  errors,
}: ErrorSummaryProps) => {
  if (!errors.length) return null;

  return (
    <div className="govuk-error-summary" data-module="govuk-error-summary">
      <div role="alert">
        <h2 className="govuk-error-summary__title">{title}</h2>
        <div className="govuk-error-summary__body">
          <ul className="govuk-list govuk-error-summary__list">
            {errors.map((error) => (
              <li key={`${error.path[0]}-${error.path[1]}`}>
                <a href={`#${error.path.join("-")}`}>{error.message}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
