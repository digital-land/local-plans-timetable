import { DevelopmentPlan } from "@lib/types/timetable";
import Joi, { ValidationErrorItem } from "joi";

const titleSchema = Joi.string().max(100).messages({
  "string.max": `Title must be less must be less than or equal to 100 characters long`,
  "string.empty": "Title is not allowed to be empty",
});

export const validateTitle = (
  developmentPlan: DevelopmentPlan
) => {
  const errors: ValidationErrorItem[] = [];

  const validationResult = titleSchema.validate(developmentPlan.name, {
    abortEarly: false,
  });

  if (validationResult.error) {
    errors.push(...validationResult.error.details);
  }

  return errors;
};
