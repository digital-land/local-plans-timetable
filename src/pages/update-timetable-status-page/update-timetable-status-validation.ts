import Joi, { ValidationErrorItem } from "joi";
import { ValidateFormParams } from "../FormPageHoc";

const statusChangeEventSchema = Joi.boolean().messages({
  "boolean.base": `Answer is required`,
});

export const validateUpdateTimetableStatus = ({
  statusHasChanged,
}: ValidateFormParams<Record<string, never>>) => {
  const errors: ValidationErrorItem[] = [];

  const validationResult = statusChangeEventSchema.validate(statusHasChanged);

  if (validationResult.error) {
    errors.push(...validationResult.error.details);
  }

  return errors;
};
