import Joi, { ValidationErrorItem } from "joi";
import { ValidateFormParams } from "../FormPageHoc";
import { startDateSchema } from "../stage-schema";

const statusChangeEventSchema = Joi.object({
  eventDate: startDateSchema,
  notes: Joi.string().allow("").max(100).messages({
    "string.max": `Notes must be less than or equal to 100 characters long`,
  }),
  developmentPlanEvent: Joi.required().messages({
    "any.required": "Select the status of your Local Plan",
  }),
})

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
