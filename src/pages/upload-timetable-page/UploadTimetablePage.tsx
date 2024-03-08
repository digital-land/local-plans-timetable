import { useCallback } from "react";

import { FileUpload } from "@lib/gds-components";
import { TimetableEventKey } from "@lib/constants";
import { useFormContext } from "../../context/use-form-context";
import { csvToObjectArray } from "@lib/utils/timetable";
import {
  DevelopmentPlan,
  DevelopmentPlanTimetable,
} from "@lib/types/timetable";
import { ValidationErrorItem } from "joi";

const reader = new FileReader();

type UploadPageProps = {
  errors?: ValidationErrorItem[];
};

export const UploadTimetablePage = ({
  errors,
}: UploadPageProps): JSX.Element => {
  const {
    setTimetableEvents,
    setLoadedTimetableEvents,
    setDevelopmentPlan,
    setLoadedDevelopmentPlan,
  } = useFormContext();

  const handleDevelopmentPlanUpload = useCallback(
    (file: File) => {
      reader.onload = async (event) => {
        const csvString = event.target?.result?.toString();

        if (csvString) {
          const developmentPlan = csvToObjectArray<DevelopmentPlan>(csvString);
          setLoadedDevelopmentPlan(developmentPlan);
          // This assumes the last row is the current row
          setDevelopmentPlan(developmentPlan.slice(-1)[0]);
        }
      };

      reader.readAsText(file);
    },
    [setDevelopmentPlan, setLoadedDevelopmentPlan]
  );

  const handleTimetableUpload = useCallback(
    (file: File) => {
      reader.onload = async (event) => {
        const csvString = event.target?.result?.toString();

        if (csvString) {
          const loadedEvents =
            csvToObjectArray<DevelopmentPlanTimetable>(csvString);
          setLoadedTimetableEvents(loadedEvents);
          setTimetableEvents(
            loadedEvents
              // This assumes any row with an end date is invalid
              .filter(
                (event) =>
                  !event.endDate &&
                  event.developmentPlanEvent !==
                    TimetableEventKey.TimetableUpdated
              )
          );
        }
      };

      reader.readAsText(file);
    },
    [setLoadedTimetableEvents, setTimetableEvents]
  );

  return (
    <>
      <h1 className="govuk-heading-l govuk-!-margin-top-6">
        Upload your timetable CSV files
      </h1>
      <FileUpload
        label="Upload timetable CSV"
        onChange={handleTimetableUpload}
        id={"timetableEvents"}
        error={
          errors?.find((error) => error.path[0] === "timetableEvents")?.message
        }
      />
      <FileUpload
        label="Upload development plan CSV"
        onChange={handleDevelopmentPlanUpload}
        id={"developmentPlan"}
        error={
          errors?.find((error) => error.path[0] === "developmentPlan")?.message
        }
      />
    </>
  );
};
