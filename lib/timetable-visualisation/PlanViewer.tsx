import { getTimetableEventName } from "@lib/constants";
import { Tag } from "@lib/gds-components";
import {
  getStageProgress,
  toDefaultLocalDateString,
} from "@lib/utils/timetable";
import { stages } from "../../src/pages/stages";
import { DevelopmentPlan, DevelopmentPlanTimetable } from "../types/timetable";

import "govuk-frontend/dist/govuk/govuk-frontend.min.css";
import { useMemo } from "react";

type PlanViewerProps = {
  developmentPlan: DevelopmentPlan;
  timetableEvents: DevelopmentPlanTimetable[];
};

type StagePreviewInfo = {
  name: string;
  startDate: string;
  endDate?: string;
  info?: string;
};

export const PlanViewer = ({
  developmentPlan: { name, description },
  timetableEvents,
}: PlanViewerProps) => {
  const publishedEvent = timetableEvents.find(
    (event) =>
      event.developmentPlanEvent === "local-development-scheme-published"
  );

  const updatedEvent = timetableEvents.find(
    (event) => event.developmentPlanEvent === "timetable-updated"
  );

  if (!publishedEvent) {
    throw new Error("published event not found");
  }

  const stagesInfo = useMemo(
    () => [
      {
        name: getTimetableEventName(publishedEvent.developmentPlanEvent),
        startDate: publishedEvent.eventDate,
      },
      ...stages.map<StagePreviewInfo>((stage) => {
        const startEvent = timetableEvents.find(
          (event) => event.developmentPlanEvent === stage.startEventKey
        );

        const endEvent = timetableEvents.find(
          (event) => event.developmentPlanEvent === stage.endEventKey
        );

        if (!startEvent) {
          throw new Error("event not found");
        }
        return {
          name: stage.title,
          startDate: startEvent.eventDate,
          endDate: endEvent?.eventDate,
          info: startEvent.notes,
        };
      }),
    ],
    [publishedEvent, timetableEvents]
  );

  return (
    <div className="govuk-body" data-testid="plan-viewer">
      <h2 className="govuk-heading-l">{name}</h2>
      <p className="govuk-body-l">{description}</p>
      <hr />
      <h3 className="govuk-table__caption govuk-table__caption--l">
        Timetable
      </h3>
      <p>{`Published: ${toDefaultLocalDateString(
        publishedEvent.eventDate
      )}`}</p>
      {updatedEvent && (
        <p>{`Last updated: ${toDefaultLocalDateString(
          updatedEvent.eventDate
        )}`}</p>
      )}
      <table className="govuk-table">
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th
              scope="col"
              className="govuk-table__header govuk-!-width-two-thirds govuk-!-padding-bottom-5"
            >
              Stage
            </th>
            <th
              scope="col"
              className="govuk-table__header govuk-!-width-one-third"
            >
              Time period
            </th>
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          {stagesInfo.map(({ name, startDate, endDate, info }) => (
            <tr className="govuk-table__row" key={name}>
              <th
                scope="row"
                className="govuk-table__header govuk-table__caption--m govuk-!-padding-top-6"
              >
                <div className="govuk-!-display-inline govuk-!-margin-right-3">
                  {name}
                </div>
                <Tag label={getStageProgress(startDate, endDate)} />
                <div className="govuk-body govuk-!-margin-top-5">{info}</div>
              </th>
              <td className="govuk-table__cell govuk-!-padding-top-6">
                {endDate
                  ? `${toDefaultLocalDateString(
                      startDate
                    )} to ${toDefaultLocalDateString(endDate)}`
                  : toDefaultLocalDateString(startDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
