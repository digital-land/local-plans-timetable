import { ValidationErrorItem } from "joi";
import { useCallback, useState } from "react";
import { DevelopmentPlanTimetable } from "../types/timetable";
import { developmentPlanEventSchema } from "../validation";

export const useValidation = (): {
  errors: ValidationErrorItem[];
  validateDevelopmentPlanEventDates: (
    developmentPlanEventDates: Pick<
      DevelopmentPlanTimetable,
      "eventDate" | "reference"
    >[]
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

  return {
    errors,
    validateDevelopmentPlanEventDates,
  };
};
