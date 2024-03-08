import Joi, { ValidationErrorItem } from "joi";
import { ValidateFormParams } from "../FormPageHoc";

const twoCSVUploadedSchema = Joi.object({
  timetableEvents: Joi.array().required().messages({
    "array.base": "Please upload a timetable CSV.",
  }),
  developmentPlan: Joi.array().required().messages({
    "array.base": "Please upload a development plan CSV.",
  }),
});

export const validateUpload = ({
  loadedDevelopmentPlan,
  loadedTimetableEvents,
}: ValidateFormParams<Record<string, never>>) => {
  const errors: ValidationErrorItem[] = [];

  const validationResult = twoCSVUploadedSchema.validate(
    {
      timetableEvents: loadedTimetableEvents,
      developmentPlan: loadedDevelopmentPlan,
    },
    { abortEarly: false }
  );

  if (validationResult.error) {
    errors.push(...validationResult.error.details);
  }

  return errors;
};
