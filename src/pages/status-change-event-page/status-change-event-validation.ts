import Joi, { ValidationErrorItem } from "joi";
import { StatusChangeEvent } from "@lib/constants";
import {
  DevelopmentPlan,
  DevelopmentPlanTimetable,
} from "@lib/types/timetable";
import { eventSchema } from "../event-schema";

const statusChangeEventSchema = eventSchema.concat(
  Joi.object({
    developmentPlanEvent: Joi.required().messages({
      "any.required": `Status is required`,
    }),
  })
);

export const validateStatusChangeEvent = (
  _developmentPlan: DevelopmentPlan,
  _developmentPlanEvents: DevelopmentPlanTimetable[],
  statusChangeEvent: StatusChangeEvent | null
) => {
  const errors: ValidationErrorItem[] = [];

  if (!statusChangeEvent) {
    throw new Error("event not found");
  }

  const { eventDate, notes, developmentPlanEvent } = statusChangeEvent;

  const validationResult = statusChangeEventSchema.validate(
    {
      eventDate,
      notes,
      developmentPlanEvent,
    },
    { abortEarly: false }
  );

  if (validationResult.error) {
    errors.push(...validationResult.error.details);
  }

  return errors;
};
