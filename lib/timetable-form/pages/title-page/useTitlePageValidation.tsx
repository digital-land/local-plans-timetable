import { ValidationErrorItem } from "joi";
import { useCallback, useState } from "react";
import { DevelopmentPlan } from "../../../types/timetable";
import {
  developmentPlanSchema,
} from "../../../validation";

export const useValidation = (): {
  errors: ValidationErrorItem[];
  validateDevelopmentPlanName: (
    developmentPlan: Pick<DevelopmentPlan, "name">
  ) => void;

} => {
  const [errors, setErrors] = useState<ValidationErrorItem[]>([]);

  const validateDevelopmentPlanName = useCallback(
    (developmentPlan: Pick<DevelopmentPlan, "name">) => {
      const errors: ValidationErrorItem[] = [];

      const validationResult = developmentPlanSchema.validate(developmentPlan, {
        abortEarly: false,
      });

      if (validationResult.error) {
        const validationErrors = validationResult.error.details.map(
          (error) => ({
            ...error,
            path: [validationResult.value.reference, ...error.path],
          })
        );
        errors.push(...validationErrors);
      }

      setErrors(errors);
    },
    []
  );

  return {
    errors,
    validateDevelopmentPlanName,
  };
};
