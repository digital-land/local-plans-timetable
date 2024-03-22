import { useCallback } from "react";

import { ValidationErrorItem } from "joi";

import { FileUpload } from "@lib/gds-components";
import { csvToObjectArray, isValidEntity } from "@lib/utils/timetable";
import { TimetableEventKey, isStatusChangeEventKey } from "@lib/constants";
import {
  DevelopmentPlan,
  DevelopmentPlanTimetable,
} from "@lib/types/timetable";

import { useFormContext } from "../../context/use-form-context";

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

          const currentDevelopmentPlan = developmentPlan.find(isValidEntity);

          if (!currentDevelopmentPlan) {
            throw new Error("No valid development plan found");
          }

          setLoadedDevelopmentPlan(developmentPlan);
          setDevelopmentPlan(currentDevelopmentPlan);
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
            loadedEvents.filter(
              (event) =>
                isValidEntity(event) &&
                event.developmentPlanEvent !==
                  TimetableEventKey.TimetableUpdated &&
                !isStatusChangeEventKey(event.developmentPlanEvent)
            )
          );
        }
      };

      reader.readAsText(file);
    },
    [setLoadedTimetableEvents, setTimetableEvents]
  );

  return (
    <div className="govuk-!-width-two-thirds">
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
    </div>
  );
};
