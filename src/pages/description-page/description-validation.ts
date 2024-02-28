import { DevelopmentPlan } from "@lib/types/timetable";
import Joi, { ValidationErrorItem } from "joi";

const descriptionSchema = Joi.string().max(400).messages({
  "string.max": `Description must be less than or equal to 400 characters long`,
  "string.empty": "Description is not allowed to be empty",
});

export const validateDescription = (
  developmentPlan: DevelopmentPlan
) => {
  const errors: ValidationErrorItem[] = [];

  const validationResult = descriptionSchema.validate(developmentPlan.description, {
    abortEarly: false,
  });

  if (validationResult.error) {
    errors.push(...validationResult.error.details);
  }

  return errors;
};
