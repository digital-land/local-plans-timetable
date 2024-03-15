import Joi, { ValidationErrorItem } from "joi";
import { ValidateFormParams } from "../FormPageHoc";

const statusChangeEventSchema = Joi.object({
  updateStatus: Joi.boolean().messages({
    "boolean.base":
      "Select yes if you need to update the status of your Local Plan timetable",
  }),
});

export const validateUpdateTimetableStatus = ({
  statusHasChanged,
}: ValidateFormParams<Record<string, never>>) => {
  const errors: ValidationErrorItem[] = [];

  const validationResult = statusChangeEventSchema.validate({
    updateStatus: statusHasChanged,
  });

  if (validationResult.error) {
    errors.push(...validationResult.error.details);
  }

  return errors;
};
