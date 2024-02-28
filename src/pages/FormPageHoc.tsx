import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ValidationErrorItem } from "joi";

import { Button } from "@lib/gds-components";
import {
  DevelopmentPlan,
  DevelopmentPlanTimetable,
} from "@lib/types/timetable";
import { useFormContext } from "../context/use-form-context";
import { useSequence } from "./use-sequence";

import styles from "./form-page.module.css";
import { PageRoute, Journeys } from "../routes/routes";

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
    const { developmentPlan, timetableEvents, userFlow } = useFormContext();

    //const isCreateFlow = userFlow === Journeys.Create;
    const { previousPage, navigateNext } = useSequence(Journeys.Create);
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

    const navigate = useNavigate();
    useEffect(() => {
      console.log(userFlow);
      if (!userFlow) {
        navigate(PageRoute.Root);
      }
    });

    return (
      <div className={styles.form}>
        <Link to={previousPage} className="govuk-back-link">
          Back
        </Link>
        <FormComponent {...formProps} errors={errors} />
        {navigateNext && <Button onClick={handleClick}>Continue</Button>}
      </div>
    );
  };

  return <InnerComponent />;
};
