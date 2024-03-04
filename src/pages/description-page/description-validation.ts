import Joi, { ValidationErrorItem } from "joi";
import { ValidateFormParams } from "../FormPageHoc";

const descriptionSchema = Joi.object({
  description: Joi.string().max(400).messages({
    "string.max": `Description must be less than or equal to 400 characters long`,
    "string.empty": "Description is not allowed to be empty",
  }),
});

export const validateDescription = ({
  developmentPlan,
}: ValidateFormParams<Record<string, never>>) => {
  const errors: ValidationErrorItem[] = [];

  const validationResult = descriptionSchema.validate({
    description: developmentPlan.description,
  });

  if (validationResult.error) {
    errors.push(...validationResult.error.details);
  }

  return errors;
};
