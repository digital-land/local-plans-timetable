import Joi, { ValidationErrorItem } from "joi";
import { ValidateFormParams } from "../FormPageHoc";

const titleSchema = Joi.object({
  title: Joi.string().max(100).messages({
    "string.max": `Title must be less must be less than or equal to 100 characters long`,
    "string.empty": "Title is not allowed to be empty",
  }),
});

export const validateTitle = ({
  developmentPlan,
}: ValidateFormParams<Record<string, never>>) => {
  const errors: ValidationErrorItem[] = [];

  const validationResult = titleSchema.validate({
    title: developmentPlan.name,
  });

  if (validationResult.error) {
    errors.push(...validationResult.error.details);
  }

  return errors;
};
