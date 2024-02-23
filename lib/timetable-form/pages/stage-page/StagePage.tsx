import { ReactNode, useState } from "react";

import {
  Button,
  DateInput,
  ErrorSummary,
  TextArea,
} from "../../../gds-components";

import { TimetableEventKey } from "../../../constants";
import styles from "../../styles.module.css";
import { useValidation } from "./useStagePageValidation";

interface StagePageProps {
  title: string;
  description: ReactNode;
  startEvent: TimetableEventKey;
  endEvent?: TimetableEventKey;
}

export const StagePage = ({
  title,
  description,
  startEvent,
  endEvent,
}: StagePageProps): JSX.Element => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [additionalInformation, setAdditionalInformation] =
    useState<string>("");

  const { errors, validateDevelopmentPlanEventDates } = useValidation();

  const handleValidate = () => {
    const stageEventsDates = [{ reference: startEvent, eventDate: startDate }];

    if (endEvent) {
      stageEventsDates.push({ reference: endEvent, eventDate: endDate });
    }

    validateDevelopmentPlanEventDates(stageEventsDates);
  };

  return (
    <div>
      <div className={styles.form}>
        <a href="#" className="govuk-back-link">
          Back
        </a>
        <h1 className="govuk-heading-l" data-testid="form-title">
          {title} Stage
          <span className="govuk-caption-m govuk-!-margin-top-2">
            {description}
          </span>
        </h1>
        <ErrorSummary errors={errors} />
        <div id={`${startEvent}-eventDate`}>
          <DateInput
            value={startDate}
            label={endEvent ? "Start Date" : "Date"}
            name={`${startEvent}-start-date`}
            error={
              errors.find(
                (error) =>
                  error.path[0] === startEvent && error.path[1] === "eventDate"
              )?.message
            }
            onChange={setStartDate}
          />
        </div>
        {endEvent && (
          <div id={`${endEvent}-eventDate`}>
            <DateInput
              value={endDate}
              label="End Date"
              name={`${endEvent}-end-date`}
              error={
                errors.find(
                  (error) =>
                    error.path[0] === endEvent && error.path[1] === "eventDate"
                )?.message
              }
              onChange={setEndDate}
            />
          </div>
        )}
        <TextArea
          label="Additional Information (optional)"
          onChange={setAdditionalInformation}
          value={additionalInformation}
          hint="You can enter up to 100 characters"
        />
        <Button onClick={handleValidate}>Continue</Button>
      </div>
    </div>
  );
};
