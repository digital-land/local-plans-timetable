import { useState } from "react";
import { Link } from "react-router-dom";

import { ValidationErrorItem } from "joi";

import { Button } from "@lib/gds-components";
import {
  DevelopmentPlan,
  DevelopmentPlanTimetable,
} from "@lib/types/timetable";
import { useFormContext } from "../context/use-form-context";
import { useSequence } from "./use-sequence";

import styles from "./form-page.module.css";

export const FormPageHoC = <P extends Record<string, unknown>>(
  FormComponent: (
    props: P & { errors: ValidationErrorItem[] | undefined }
  ) => JSX.Element,
  formProps: P,
  validatePage?: (
    developmentPlan: DevelopmentPlan,
    developmentPlanTimetable: DevelopmentPlanTimetable[],
    formProps: P
  ) => ValidationErrorItem[]
) => {
  const InnerComponent = () => {
    const { developmentPlan, timetableEvents } = useFormContext();
    const { previousPage, navigateNext } = useSequence();
    const [errors, setErrors] = useState<ValidationErrorItem[]>();

    const handleClick = () => {
      const errors = validatePage?.(
        developmentPlan,
        timetableEvents,
        formProps
      );

      if (errors && errors.length > 0) {
        setErrors(errors);
        return;
      }

      navigateNext?.();
    };

    return (
      <div className={styles.form}>
        <Link to={previousPage} className="govuk-back-link">
          Back
        </Link>
        <FormComponent {...formProps} errors={errors} />
        <Button onClick={handleClick}>Continue</Button>
      </div>
    );
  };

  return <InnerComponent />;
};