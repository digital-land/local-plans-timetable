import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ValidationErrorItem } from "joi";
import cn from "classnames";

import { Button, ErrorSummary } from "@lib/gds-components";
import {
  DevelopmentPlan,
  DevelopmentPlanTimetable,
} from "@lib/types/timetable";
import { StatusChangeEvent } from "@lib/constants";
import { useFormContext } from "../context/use-form-context";
import { useSequence } from "./use-sequence";
import { PageRoute } from "../routes/routes";

export type ValidateFormParams<P> = {
  developmentPlan: DevelopmentPlan;
  timetableEvents: DevelopmentPlanTimetable[];
  statusChangeEvent: StatusChangeEvent | null;
  statusHasChanged: boolean | null;
  shouldUpdateDates: boolean | null;
  loadedDevelopmentPlan: DevelopmentPlan[] | null;
  loadedTimetableEvents: DevelopmentPlanTimetable[] | null;
  formProps: P;
};

interface FormPageHoCProps<P extends Record<string, unknown>> {
  FormComponent: (
    props: P & { errors: ValidationErrorItem[] | undefined }
  ) => JSX.Element;
  formProps: P;
  validatePage?: (params: ValidateFormParams<P>) => ValidationErrorItem[];
  twoThirdsWidth?: boolean;
}

export const FormPageHoC = <P extends Record<string, unknown>>({
  FormComponent,
  formProps,
  validatePage,
  twoThirdsWidth = true,
}: FormPageHoCProps<P>) => {
  const InnerComponent = () => {
    const {
      developmentPlan,
      timetableEvents,
      statusChangeEvent,
      statusHasChanged,
      shouldUpdateDates,
      userFlow,
      loadedDevelopmentPlan,
      loadedTimetableEvents,
    } = useFormContext();

    const { previousPage, navigateNext } = useSequence(
      userFlow,
      statusHasChanged ?? true,
      shouldUpdateDates ?? true
    );
    const [errors, setErrors] = useState<ValidationErrorItem[]>();

    const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const errors = validatePage?.({
        developmentPlan,
        timetableEvents,
        statusChangeEvent,
        statusHasChanged,
        shouldUpdateDates,
        formProps,
        loadedDevelopmentPlan,
        loadedTimetableEvents,
      });

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
        <form
          onSubmit={handleClick}
          className={cn({ "govuk-!-width-two-thirds": twoThirdsWidth })}
        >
          <ErrorSummary errors={errors} />
          <FormComponent {...formProps} errors={errors} />
          {navigateNext && <Button type="submit">Continue</Button>}
        </form>
      </>
    );
  };

  return <InnerComponent />;
};
