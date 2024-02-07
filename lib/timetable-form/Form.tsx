import { useCallback, useMemo, useState } from "react";

import { FileUpload, TextInput, DateInput, Button } from "../gds-components";
import { DevelopmentPlan, DevelopmentPlanTimetable } from "../types/timetable";
import {
  objectArrayToCSVString,
  CSVStringToDevPlan,
  CSVStringToDevPlanTimetable,
} from "../utils/timetable";
import { DEFAULT_DEVELOPMENT_PLAN } from "../constants";
import { PlanViewer } from "../timetable-visualisation/PlanViewer";

import styles from "./styles.module.css";
import "govuk-frontend/dist/govuk/govuk-frontend.min.css";

const {
  timetableEvents: timetableEventsInitialState,
  ...developmentPlanInitialState
} = DEFAULT_DEVELOPMENT_PLAN;

const reader = new FileReader();

export const Form = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  const [developmentPlan, setDevelopmentPlan] = useState<
    Omit<DevelopmentPlan, "timetableEvents">
  >(developmentPlanInitialState);
  const [developmentPlanEvents, setDevelopmentPlanEvents] = useState<
    DevelopmentPlanTimetable[]
  >(timetableEventsInitialState);

  const timetableDownloadLink = useMemo(() => {
    const timetableCSV = objectArrayToCSVString(developmentPlanEvents);

    return `data:text/csv;charset=urf-8, ${timetableCSV}`;
  }, [developmentPlanEvents]);

  const timetableHeaderDownloadLink = useMemo(() => {
    const timetableCSV = objectArrayToCSVString([developmentPlan]);

    return `data:text/csv;charset=urf-8, ${timetableCSV}`;
  }, [developmentPlan]);

  const handleDevelopmentPlanFileUpload = useCallback((file: File) => {
    reader.onload = (event) => {
      const csvString = event.target?.result?.toString();

      if (csvString) {
        setDevelopmentPlan(CSVStringToDevPlan(csvString));
      }
    };

    reader.readAsText(file);
  }, []);

  const handleDevelopmentPlanTimetableFileUpload = useCallback((file: File) => {
    reader.onload = (event) => {
      const csvString = event.target?.result?.toString();

      if (csvString) {
        setDevelopmentPlanEvents(CSVStringToDevPlanTimetable(csvString));
      }
    };

    reader.readAsText(file);
  }, []);

  return (
    <div className={`${className} ${styles.form}`} {...otherProps}>
      <h1 className="govuk-heading-xl" data-testid="form-title">
        Timetable Form
      </h1>
      <div>
        <FileUpload
          label="Upload a CSV file for Development Plan"
          onChange={handleDevelopmentPlanFileUpload}
        />
        <FileUpload
          label="Upload a CSV file for Timetable"
          onChange={handleDevelopmentPlanTimetableFileUpload}
        />
        <TextInput
          label="Local planning authority"
          onChange={(lpa) =>
            setDevelopmentPlan((prev) => ({
              ...prev,
              organisations: lpa,
            }))
          }
          value={developmentPlan.organisations}
        />
      </div>
      {developmentPlanEvents.map((stage) => (
        <div key={stage.developmentPlanEvent}>
          <DateInput
            value={stage.eventDate}
            label={stage.developmentPlanEvent}
            name={`${stage.developmentPlanEvent.split(" ").join("-")}-date`}
            onChange={(value) =>
              setDevelopmentPlanEvents((prev) =>
                prev.map((e) => (e === stage ? { ...e, eventDate: value } : e))
              )
            }
          />
        </div>
      ))}
      <div>
        <a
          role="button"
          type="button"
          data-testid="csv-download-button"
          href={timetableDownloadLink}
          download="timetable.csv"
        >
          <Button>Export Timetable CSV</Button>
        </a>
      </div>
      <div>
        <a
          role="button"
          type="button"
          data-testid="csv-download-header-button"
          href={timetableHeaderDownloadLink}
          download="timetableHeader.csv"
        >
          <Button>Export Timetable Header CSV</Button>
        </a>
      </div>
      <h1 className="govuk-heading-xl">Preview</h1>
      <PlanViewer
        plan={{
          ...developmentPlan,
          timetableEvents: developmentPlanEvents,
        }}
      />
    </div>
  );
};
