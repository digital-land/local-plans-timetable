import { ValidationErrorItem } from "joi";
import { ValidateFormParams } from "../FormPageHoc";
import { eventSchema } from "../event-schema";
import { StagePageProps } from "./StagePage";

export const validateTimetableStage = ({
  timetableEvents,
  formProps
}: ValidateFormParams<StagePageProps>
) => {
  const { startEventKey, endEventKey } = formProps;

  const startEvent = timetableEvents.find(
    (e) => e.developmentPlanEvent === startEventKey
  );

  const endEvent = timetableEvents.find(
    (e) => e.developmentPlanEvent === endEventKey
  );

  if (!startEvent || (endEventKey && !endEvent)) {
    throw new Error("stage event not found");
  }

  const errors: ValidationErrorItem[] = [];

  const startEventValidation = eventSchema.validate({
    eventDate: startEvent.eventDate,
    notes: startEvent.notes,
  });

  if (startEventValidation.error) {
    errors.push(
      ...startEventValidation.error.details.map((error) => ({
        ...error,
        path: [startEventKey, ...error.path],
      }))
    );
  }

  if (endEvent && endEventKey) {
    const endEventValidation = eventSchema.validate({
      eventDate: endEvent.eventDate,
      notes: endEvent.notes,
    });

    if (endEventValidation.error) {
      errors.push(
        ...endEventValidation.error.details.map((error) => ({
          ...error,
          path: [endEventKey, ...error.path],
        }))
      );
    }
  }

  return errors;
};
