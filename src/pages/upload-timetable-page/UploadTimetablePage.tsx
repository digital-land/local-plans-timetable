import { FileUpload } from "@lib/gds-components";
import { useFormContext } from "../../context/use-form-context";
import { developmentPlanTimetableEvents } from "@lib/constants";
import {
  DevelopmentPlan,
  DevelopmentPlanTimetable,
} from "@lib/types/timetable";
import { fromCSVString } from "@lib/utils/timetable";
import { useCallback } from "react";

const reader = new FileReader();

export const UploadTimetablePage = (): JSX.Element => {
  const {
    setTimetableEvents,
    setLoadedTimetableEvents,
    setDevelopmentPlan,
    setLoadedDevelopmentPlan,
  } = useFormContext();

  const handleDevelopmentPlanUpload = useCallback((file: File) => {
    reader.onload = (event) => {
      const csvString = event.target?.result?.toString();

      if (csvString) {
        const developmentPlan = fromCSVString<DevelopmentPlan>(csvString);
        setLoadedDevelopmentPlan(developmentPlan);
        // This assumes the last row is the current row
        setDevelopmentPlan(developmentPlan.slice(-1)[0]);
      }
    };

    reader.readAsText(file);
  }, [setDevelopmentPlan, setLoadedDevelopmentPlan]);

  const handleTimetableUpload = useCallback((file: File) => {
    reader.onload = (event) => {
      const csvString = event.target?.result?.toString();

      if (csvString) {
        const loadedEvents = fromCSVString<DevelopmentPlanTimetable>(csvString);
        setLoadedTimetableEvents(loadedEvents);
        setTimetableEvents(
          loadedEvents
            // This assumes any row with an end date is invalid
            .filter((event) => !event.endDate)
            .sort(
              (a, b) =>
                developmentPlanTimetableEvents.findIndex(
                  (s) => s.key === a.developmentPlanEvent
                ) -
                developmentPlanTimetableEvents.findIndex(
                  (s) => s.key === b.developmentPlanEvent
                )
            )
        );
      }
    };

    reader.readAsText(file);
  }, [setLoadedTimetableEvents, setTimetableEvents]);

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
