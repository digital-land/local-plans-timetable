import { DevelopmentPlan } from "../types/timetable";

import "govuk-frontend/dist/govuk/govuk-frontend.min.css";

type PlanPreviewProps = {
  plan: DevelopmentPlan;
};

export const PlanPreview = ({
  plan: {
    name,
    description,
    adoptedDate,
    periodStartDate,
    periodEndDate,
    developmentPlanType,
    developmentPlanGeography,
    organisations,
    entryDate,
    startDate,
    endDate,
    documentationUrl,
    timetableEvents,
  },
}: PlanPreviewProps) => {
  return (
    <div data-testid="plan-preview">
      <div>
        <h1 className="govuk-heading-xl" data-testid="form-title">
          {name}
        </h1>
        <p className="govuk-body-l">{description}</p>
      </div>
      <div className="govuk-body">
        <p>{`Adopted: ${adoptedDate}`}</p>
        <p>{`Period Start: ${periodStartDate}`}</p>
        <p>{`Period End: ${periodEndDate}`}</p>
        <p>{`Plan Type: ${developmentPlanType}`}</p>
        <p>{`Plan Geography: ${developmentPlanGeography}`}</p>
        <p>{`Organisations: ${organisations}`}</p>
        <p>{`Entry Date ${entryDate}`}</p>
        <p>{`Start Date: ${startDate}`}</p>
        <p>{`End Date: ${endDate}`}</p>
        {documentationUrl && <a href={documentationUrl}>Documentation</a>}
      </div>
      <hr />
      <table className="govuk-table">
        <caption className="govuk-table__caption govuk-table__caption--m">
          Development Plan Timetable
        </caption>
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th scope="col" className="govuk-table__header">
              Event
            </th>
            <th scope="col" className="govuk-table__header">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          {timetableEvents.map((timetableEvent) => (
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                {timetableEvent.developmentPlanEvent}
              </th>
              <td className="govuk-table__cell">{timetableEvent.eventDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
