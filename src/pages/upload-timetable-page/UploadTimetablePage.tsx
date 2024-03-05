import { useCallback } from "react";

import csvToJson from "csvtojson";

import { FileUpload } from "@lib/gds-components";
import { TimetableEventKey } from "@lib/constants";
import { useFormContext } from "../../context/use-form-context";

const reader = new FileReader();

export const UploadTimetablePage = (): JSX.Element => {
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
          const developmentPlan = await csvToJson().fromString(csvString);
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
          const loadedEvents = await csvToJson().fromString(csvString);
          setLoadedTimetableEvents(loadedEvents);
          setTimetableEvents(
            loadedEvents
              // This assumes any row with an end date is invalid
              .filter(
                (event) =>
                  !event.endDate &&
                  event.developmentPlanEvent !== TimetableEventKey.TimetableUpdated
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
      />
      <FileUpload
        label="Upload development plan CSV"
        onChange={handleDevelopmentPlanUpload}
      />
    </>
  );
};
