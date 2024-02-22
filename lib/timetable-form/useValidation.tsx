import { ValidationErrorItem } from "joi";
import { useCallback, useState } from "react";
import { DevelopmentPlanTimetable, DevelopmentPlan } from "../types/timetable";
import {
  developmentPlanEventSchema,
  developmentPlanSchema,
} from "../validation";

export const useValidation = (): {
  errors: ValidationErrorItem[];
  validateDevelopmentPlanEventDates: (
    developmentPlanEventDates: Pick<
      DevelopmentPlanTimetable,
      "eventDate" | "reference"
    >[]
  ) => void;
  validateDevelopmentPlanName: (
    developmentPlan: Pick<DevelopmentPlan, "name">
  ) => void;
  validateDevelopmentPlanDescription: (
    developmentPlan: Pick<DevelopmentPlan, "description">
  ) => void;
} => {
  const [errors, setErrors] = useState<ValidationErrorItem[]>([]);

  const validateDevelopmentPlanEventDates = useCallback(
    (
      developmentPlanEventDates: Pick<
        DevelopmentPlanTimetable,
        "eventDate" | "reference"
      >[]
    ) => {
      const errors: ValidationErrorItem[] = [];

      developmentPlanEventDates.forEach((event) => {
        const validationResult = developmentPlanEventSchema.validate(event, {
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
      });
      setErrors(errors);
    },
    []
  );

  const validateDevelopmentPlanDescription = useCallback(
    (developmentPlan: Pick<DevelopmentPlan, "description">) => {
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
    validateDevelopmentPlanEventDates,
    validateDevelopmentPlanName,
    validateDevelopmentPlanDescription,
  };
};
