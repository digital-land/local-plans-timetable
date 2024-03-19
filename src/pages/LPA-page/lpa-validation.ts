import Joi, { ValidationErrorItem } from "joi";
import { ValidateFormParams } from "../FormPageHoc";

const LPASchema = Joi.object({
  LPA: Joi.string().required().messages({
    "string.empty": `Enter a valid Local Authority`,
  }),
});

export const validateLPA = ({
  developmentPlan,
}: ValidateFormParams<Record<string, never>>) => {
  const errors: ValidationErrorItem[] = [];

  const validationResult = LPASchema.validate({
    LPA: developmentPlan.organisations,
  });

  if (validationResult.error) {
    errors.push(...validationResult.error.details);
  }

  return errors;
};
