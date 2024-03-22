import Joi, { ValidationErrorItem } from "joi";
import { ValidateFormParams } from "../FormPageHoc";
import { notesSchema, startDateSchema } from "../stage-schema";

const statusChangeEventSchema = Joi.object({
  eventDate: startDateSchema,
  notes: notesSchema,
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
