import Joi, { ValidationErrorItem } from "joi";
import { StatusChangeEvent } from "@lib/constants";
import {
  DevelopmentPlan,
  DevelopmentPlanTimetable,
} from "@lib/types/timetable";

const statusChangeEventSchema = Joi.boolean().messages({
  "boolean.base": `Answer is required`,
});

export const validateUpdateTimetableStatus = (
  _developmentPlan: DevelopmentPlan,
  _developmentPlanEvents: DevelopmentPlanTimetable[],
  _statusChangeEvent: StatusChangeEvent | null,
  statusHasChanged: boolean | null
) => {
  const errors: ValidationErrorItem[] = [];

  const validationResult = statusChangeEventSchema.validate(statusHasChanged);

  if (validationResult.error) {
    errors.push(...validationResult.error.details);
  }

  return errors;
};
