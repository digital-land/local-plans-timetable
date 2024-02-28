import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ValidationErrorItem } from "joi";

import { Button } from "@lib/gds-components";
import {
  DevelopmentPlan,
  DevelopmentPlanTimetable,
} from "@lib/types/timetable";
import { StatusChangeEvent } from "@lib/constants";
import { useFormContext } from "../context/use-form-context";
import { useSequence } from "./use-sequence";
import { PageRoute } from "../routes/routes";

export const FormPageHoC = <P extends Record<string, unknown>>(
  FormComponent: (
    props: P & { errors: ValidationErrorItem[] | undefined }
  ) => JSX.Element,
  formProps: P,
  validatePage?: (
    developmentPlan: DevelopmentPlan,
    developmentPlanTimetable: DevelopmentPlanTimetable[],
    statusChangeEvent:StatusChangeEvent | null,
    statusHasChanged: boolean | null,
    formProps: P
  ) => ValidationErrorItem[]
) => {
  const InnerComponent = () => {

    const {
      developmentPlan,
      timetableEvents,
      statusChangeEvent,
      statusHasChanged,
      userFlow
    } = useFormContext();

    const { previousPage, navigateNext } = useSequence(
      userFlow,
      statusHasChanged ?? true
    );
    const [errors, setErrors] = useState<ValidationErrorItem[]>();

    const handleClick = () => {
      const errors = validatePage?.(
        developmentPlan,
        timetableEvents,
        statusChangeEvent,
        statusHasChanged,
        formProps,
      );

      if (errors && errors.length > 0) {
        setErrors(errors);
        return;
      }

      navigateNext?.();
    };

    const navigate = useNavigate();
    useEffect(() => {
      if (!userFlow) {
        navigate(PageRoute.Root);
      }
    }, [navigate, userFlow]);

    return (
      <>
        <Link to={previousPage} className="govuk-back-link">
          Back
        </Link>
        <FormComponent {...formProps} errors={errors} />
        {navigateNext && <Button onClick={handleClick}>Continue</Button>}
      </>
    );
  };

  return <InnerComponent />;
};
