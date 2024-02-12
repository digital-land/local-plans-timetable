import { useCallback, useMemo, useState, useEffect } from "react";

import { FileUpload, DateInput, Button, Autocomplete } from "../gds-components";
import { DevelopmentPlan, DevelopmentPlanTimetable } from "../types/timetable";
import {
  objectArrayToCSVString,
  CSVStringToDevPlan,
  CSVStringToDevPlanTimetable,
  resolveTimetableEventsCSV,
} from "../utils/timetable";
import { DEFAULT_DEVELOPMENT_PLAN, getStageName, stages } from "../constants";
import { PlanViewer } from "../timetable-visualisation/PlanViewer";
import { fetchLPAs } from "../api/index";

import styles from "./styles.module.css";
import "govuk-frontend/dist/govuk/govuk-frontend.min.css";

const {
  timetableEvents: timetableEventsInitialState,
  ...developmentPlanInitialState
} = DEFAULT_DEVELOPMENT_PLAN;

const reader = new FileReader();

export const Form = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  const [LPAs, setLPAs] = useState<string[]>([]);

  const [developmentPlan, setDevelopmentPlan] = useState<
    Omit<DevelopmentPlan, "timetableEvents">
  >(developmentPlanInitialState);

  const [loadedDevelopmentPlanEvents, setLoadedDevelopmentPlanEvents] =
    useState<DevelopmentPlanTimetable[] | null>(null);
  const [developmentPlanEvents, setDevelopmentPlanEvents] = useState<
    DevelopmentPlanTimetable[]
  >(timetableEventsInitialState);

  const timetableDownloadLink = useMemo(() => {
    const timetableCSV = resolveTimetableEventsCSV(
      developmentPlanEvents,
      loadedDevelopmentPlanEvents
    );

    return `data:text/csv;charset=urf-8,${timetableCSV}`;
  }, [developmentPlanEvents, loadedDevelopmentPlanEvents]);

  const timetableHeaderDownloadLink = useMemo(() => {
    const timetableCSV = objectArrayToCSVString([developmentPlan]);

    return `data:text/csv;charset=urf-8,${timetableCSV}`;
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
        const loadedEvents = CSVStringToDevPlanTimetable(csvString);
        setLoadedDevelopmentPlanEvents(loadedEvents);
        setDevelopmentPlanEvents(
          loadedEvents
            // This assumes any row with an end date is invalid
            .filter((event) => !event.endDate)
            .sort(
              (a, b) =>
                stages.findIndex((s) => s.key === a.developmentPlanEvent) -
                stages.findIndex((s) => s.key === b.developmentPlanEvent)
            )
        );
      }
    };

    reader.readAsText(file);
  }, []);

  useEffect(() => {
    const loadLpas = async () => {
      try {
        const lpas = await fetchLPAs();
        setLPAs(lpas.entities.map((lpa) => lpa.name));
      } catch (error) {
        console.error(error instanceof Error ? error.message : error);
      }
    };
    loadLpas();
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
        <Autocomplete
          label="Local planning authority"
          onChange={(lpa) =>
            setDevelopmentPlan((prev) => ({
              ...prev,
              organisations: lpa,
            }))
          }
          source={LPAs}
        />
      </div>
      {developmentPlanEvents.map((stage) => (
        <div key={stage.developmentPlanEvent}>
          <DateInput
            value={stage.eventDate}
            label={getStageName(stage.developmentPlanEvent)}
            name={`${stage.developmentPlanEvent}-date`}
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
