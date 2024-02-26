import { DevelopmentPlan, DevelopmentPlanTimetable } from "@lib/types/timetable";
import Joi, { ValidationErrorItem } from "joi";
import { StagePageProps } from "./StagePage";

const maxDate = new Date(2099, 11);
const minDate = new Date(2000, 0);

const schema = Joi.object({
  eventDate: Joi.date()
    .iso()
    .min(minDate)
    .max(maxDate)
    .messages({
      "date.format": `Date must be a real date`,
      "date.min": `Date must be after ${minDate.toISOString().split("T")[0]}`,
      "date.max": `Date must be before ${maxDate.toISOString().split("T")[0]}`,
    }),
  notes: Joi.string().allow(""),
});

export const validateTimetableStage = (
  _developmentPlan: DevelopmentPlan,
  developmentPlanEvents: DevelopmentPlanTimetable[],
  formProps: StagePageProps
) => {
  const { startEventKey, endEventKey } = formProps;

  const startEvent = developmentPlanEvents.find(
    (e) => e.developmentPlanEvent === startEventKey
  );

  const endEvent = developmentPlanEvents.find(
    (e) => e.developmentPlanEvent === endEventKey
  );

  if (!startEvent || (endEventKey && !endEvent)) {
    throw new Error("stage event not found");
  }

  const errors: ValidationErrorItem[] = [];

  const startEventValidation = schema.validate({
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
    const endEventValidation = schema.validate({
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