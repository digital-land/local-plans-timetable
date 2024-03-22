import { ReactNode } from "react";

import { TimetableEventKey } from "@lib/constants";
import { DateInput, TextArea } from "@lib/gds-components";
import { ValidationErrorItem } from "joi";
import { useFormContext } from "../../context/use-form-context";
import { notesCharacterLimit } from "../stage-schema";

export interface StagePageProps {
  stageName: string;
  title: string;
  description: ReactNode;
  startEventKey: TimetableEventKey;
  endEventKey?: TimetableEventKey;
  errors?: ValidationErrorItem[];
}

export const StagePage = ({
  stageName,
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
      <h1
        className="govuk-heading-l govuk-!-margin-top-6"
        data-testid="form-title"
      >
        {title}
        <span className="govuk-caption-m govuk-!-margin-top-2">
          {description}
        </span>
      </h1>
      <DateInput
        value={startEvent.eventDate}
        label={endEvent ? "Start Date" : "Date"}
        name={`${stageName}-start-date`}
        error={
          errors?.find(
            (error) =>
              error.path[0] === stageName && error.path[1] === "startDate"
          )?.message
        }
        onChange={(value) =>
          updateTimetableEvent(startEventKey, "eventDate", value)
        }
        id={`${stageName}-startDate`}
      />
      {endEventKey && endEvent && (
        <DateInput
          value={endEvent.eventDate}
          label="End Date"
          name={`${stageName}-end-date`}
          error={
            errors?.find(
              (error) =>
                error.path[0] === stageName && error.path[1] === "endDate"
            )?.message
          }
          onChange={(value) =>
            updateTimetableEvent(endEventKey, "eventDate", value)
          }
          id={`${stageName}-endDate`}
        />
      )}
      <TextArea
        label="Additional Information (optional)"
        hint="This information will be shown on your timetable."
        onChange={(value) =>
          updateTimetableEvent(startEventKey, "notes", value)
        }
        value={startEvent.notes}
        characterLimit={notesCharacterLimit}
        error={
          errors?.find(
            (error) => error.path[0] === stageName && error.path[1] === "notes"
          )?.message
        }
        id={`${stageName}-notes`}
      />
    </>
  );
};
