import Joi, { ValidationErrorItem } from "joi";
import { ValidateFormParams } from "../FormPageHoc";

const updateDatesEventSchema = Joi.object({
  updateDates: Joi.boolean().messages({
    "boolean.base":
      "Select yes if you need to update the dates of your Local Plan timetable",
  }),
});

export const validateUpdateDates = ({
  shouldUpdateDates,
}: ValidateFormParams<Record<string, never>>) => {
  const errors: ValidationErrorItem[] = [];

  const validationResult = updateDatesEventSchema.validate({
    updateDates: shouldUpdateDates,
  });

  if (validationResult.error) {
    errors.push(...validationResult.error.details);
  }

  return errors;
};
