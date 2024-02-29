import Joi, { ValidationErrorItem } from "joi";
import { ValidateFormParams } from "../FormPageHoc";
import { eventSchema } from "../event-schema";

const statusChangeEventSchema = eventSchema.concat(
  Joi.object({
    developmentPlanEvent: Joi.required().messages({
      "any.required": `Status is required`,
    }),
  })
);

export const validateStatusChangeEvent = ({
  statusChangeEvent,
}: ValidateFormParams<Record<string, never>>) => {
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
