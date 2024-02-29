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

import { PageRoute } from "../routes/routes";

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

    const { previousPage, navigateNext } = useSequence(userFlow);
    const [errors, setErrors] = useState<ValidationErrorItem[]>();

    const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
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
      if (!userFlow) {
        navigate(PageRoute.Root);
      }
    }, [navigate, userFlow]);

    return (
      <>
        <Link to={previousPage} className="govuk-back-link">
          Back
        </Link>
        <form onSubmit={handleClick}>
          <FormComponent {...formProps} errors={errors} />
          {navigateNext && <Button type="submit">Continue</Button>}
        </form>
      </>
    );
  };

  return <InnerComponent />;
};
