import { ValidationErrorItem } from "joi";
import { ValidateFormParams } from "../FormPageHoc";
import { stageSchema } from "../stage-schema";
import { StagePageProps } from "./StagePage";

export const validateTimetableStage = ({
  timetableEvents,
  formProps,
}: ValidateFormParams<StagePageProps>) => {
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

  const stageValidation = stageSchema.validate(
    {
      startDate: startEvent.eventDate,
      endDate: endEvent?.eventDate,
      notes: startEvent.notes,
    },
    { abortEarly: false }
  );

  if (stageValidation.error) {
    errors.push(
      ...stageValidation.error.details.map((error) => ({
        ...error,
        path: [formProps.title.replace(" ","-"), ...error.path],
      }))
    );
  }
  return errors;
};
