import { ReactNode } from "react";

import { TimetableEventKey } from "@lib/constants";
import { DateInput, ErrorSummary, TextArea } from "@lib/gds-components";
import { ValidationErrorItem } from "joi";
import { useFormContext } from "../../context/use-form-context";

export interface StagePageProps {
  title: string;
  description: ReactNode;
  startEventKey: TimetableEventKey;
  endEventKey?: TimetableEventKey;
  errors?: ValidationErrorItem[];
}

export const StagePage = ({
  title,
  description,
  startEventKey,
  endEventKey,
  errors,
}: StagePageProps): JSX.Element => {
  const { timetableEvents, updateTimetableEvent } = useFormContext();

  const startEvent = timetableEvents.find(
    (e) => e.developmentPlanEvent === startEventKey
  );

  const endEvent = timetableEvents.find(
    (e) => e.developmentPlanEvent === endEventKey
  );

  if (!startEvent || (endEventKey && !endEvent)) {
    throw new Error("stage event not found");
  }

  return (
    <>
      <h1 className="govuk-heading-l" data-testid="form-title">
        {title} Stage
        <span className="govuk-caption-m govuk-!-margin-top-2">
          {description}
        </span>
      </h1>
      <ErrorSummary errors={errors} />
      <div id={`${startEvent}-eventDate`}>
        <DateInput
          value={startEvent.eventDate}
          label={endEvent ? "Start Date" : "Date"}
          name={`${startEvent}-start-date`}
          error={
            errors?.find(
              (error) =>
                error.path[0] === startEvent.developmentPlanEvent &&
                error.path[1] === "eventDate"
            )?.message
          }
          onChange={(value) =>
            updateTimetableEvent(startEventKey, "eventDate", value)
          }
        />
      </div>
      {endEventKey && endEvent && (
        <div id={`${endEvent}-eventDate`}>
          <DateInput
            value={endEvent.eventDate}
            label="End Date"
            name={`${endEvent}-end-date`}
            error={
              errors?.find(
                (error) =>
                  error.path[0] === endEvent.developmentPlanEvent &&
                  error.path[1] === "eventDate"
              )?.message
            }
            onChange={(value) =>
              updateTimetableEvent(endEventKey, "eventDate", value)
            }
          />
        </div>
      )}
      <TextArea
        label="Additional Information (optional)"
        onChange={(value) =>
          updateTimetableEvent(startEventKey, "notes", value)
        }
        value={startEvent.notes}
        hint="You can enter up to 100 characters"
      />
    </>
  );
};
