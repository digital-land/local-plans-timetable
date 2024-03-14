import { useMemo } from "react";

import { TimetableEventKey, statusChangeEvents } from "../constants";
import { Tag, NotificationBanner } from "../gds-components";
import {
  getStageProgress,
  getStatusChangeMessage,
  toDefaultLocalDateString,
} from "../utils/timetable";
import { DevelopmentPlan, DevelopmentPlanTimetable } from "../types/timetable";

import { stages } from "./stages";

type PlanViewerProps = {
  developmentPlan: DevelopmentPlan;
  timetableEvents: DevelopmentPlanTimetable[];
};

type StagePreviewInfo = {
  name: string;
  startEvent: DevelopmentPlanTimetable;
  endEvent?: DevelopmentPlanTimetable;
};

export const PlanViewer = ({
  developmentPlan: { name, description },
  timetableEvents,
}: PlanViewerProps) => {
  const publishedEvent = timetableEvents.find(
    (event) =>
      event.developmentPlanEvent ===
      TimetableEventKey.LocalDevelopmentSchemePublished
  );

  const updatedEvent = timetableEvents.find(
    (event) => event.developmentPlanEvent === TimetableEventKey.TimetableUpdated
  );

  const statusChangeEvent = timetableEvents.find(
    (event) =>
      statusChangeEvents.some((e) => e === event.developmentPlanEvent) &&
      !event.endDate
  );

  if (!publishedEvent) {
    throw new Error("published event not found");
  }

  const stagesInfo = useMemo<StagePreviewInfo[]>(
    () => [
      ...(publishedEvent.eventDate
        ? [
            {
              name: "Local Development Scheme Published",
              startEvent: publishedEvent,
            },
          ]
        : []),
      ...stages
        .filter(
          (stage) =>
            timetableEvents.find(
              (event) => event.developmentPlanEvent === stage.startEventKey
            )?.eventDate &&
            timetableEvents.find(
              (event) => event.developmentPlanEvent === stage.startEventKey
            )?.eventDate
        )
        .map<StagePreviewInfo>((stage) => {
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
            startEvent,
            endEvent,
          };
        }),
    ],
    [publishedEvent, timetableEvents]
  );

  return (
    <div className="govuk-body" data-testid="plan-viewer">
      <h2 className="govuk-heading-m">{name} timetable</h2>
      <p className="govuk-body-l">{description}</p>
      {statusChangeEvent?.developmentPlanEvent && (
        <NotificationBanner
          title={`This local plan ${getStatusChangeMessage(
            statusChangeEvent.developmentPlanEvent
          )}`}
          date={statusChangeEvent.eventDate}
          message={statusChangeEvent.notes}
        />
      )}
      <hr />
      <h3 className="govuk-table__caption govuk-table__caption--m">
        Timetable
      </h3>
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
          {stagesInfo.map(({ name, startEvent, endEvent }) => (
            <tr className="govuk-table__row" key={name}>
              <th
                scope="row"
                className="govuk-table__header govuk-table__caption--m govuk-!-padding-top-6"
              >
                <div className="govuk-!-display-inline govuk-!-margin-right-3">
                  {name}
                </div>
                {updatedEvent &&
                  startEvent.eventDate &&
                  (!endEvent || endEvent.eventDate) && (
                    <Tag
                      label={getStageProgress(
                        updatedEvent.eventDate,
                        startEvent.eventDate,
                        endEvent?.eventDate
                      )}
                    />
                  )}
                <div className="govuk-body govuk-!-margin-top-5">
                  {startEvent.notes}
                </div>
              </th>
              <td className="govuk-table__cell govuk-!-padding-top-6">
                {endEvent?.eventDate
                  ? `${toDefaultLocalDateString(
                      startEvent.eventDate
                    )} to ${toDefaultLocalDateString(endEvent?.eventDate)}`
                  : toDefaultLocalDateString(startEvent.eventDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
