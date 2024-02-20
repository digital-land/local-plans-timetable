import { useCallback, useMemo, useState, useEffect } from "react";

import { FileUpload, DateInput, Button, ErrorSummary } from "../gds-components";
import { Autocomplete } from "./autocomplete/Autocomplete";
import { DevelopmentPlan, DevelopmentPlanTimetable } from "../types/timetable";
import {
  resolveTimetableEventsCSV,
  fromCSVString,
  resolveDevelopmentPlanCSV,
} from "../utils/timetable";
import {
  DEFAULT_DEVELOPMENT_PLAN,
  DEFAULT_TIMETABLE_EVENTS,
  getTimetableEventName,
  developmentPlanTimetableEvents,
} from "../constants";
import { PlanViewer } from "../timetable-visualisation/PlanViewer";
import { fetchLPAs } from "../api/index";

import styles from "./styles.module.css";
import "govuk-frontend/dist/govuk/govuk-frontend.min.css";
import { useValidation } from "./useValidation";

const reader = new FileReader();

export const Form = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  const [LPAs, setLPAs] = useState<string[]>([]);

  const [loadedDevelopmentPlan, setLoadedDevelopmentPlan] = useState<
    DevelopmentPlan[] | null
  >(null);
  const [developmentPlan, setDevelopmentPlan] = useState<DevelopmentPlan>(
    DEFAULT_DEVELOPMENT_PLAN
  );

  const [loadedTimetableEvents, setLoadedTimetableEvents] = useState<
    DevelopmentPlanTimetable[] | null
  >(null);
  const [timetableEvents, setTimetableEvents] = useState<
    DevelopmentPlanTimetable[]
  >(DEFAULT_TIMETABLE_EVENTS);

  const { errors, validateDevelopmentPlanEvents } = useValidation();

  const timetableEventsDownloadLink = useMemo(() => {
    const timetableCSV = resolveTimetableEventsCSV(
      timetableEvents,
      loadedTimetableEvents
    );

    return `data:text/csv;charset=urf-8,${timetableCSV}`;
  }, [timetableEvents, loadedTimetableEvents]);

  const developmentPlanDownloadLink = useMemo(() => {
    const timetableCSV = resolveDevelopmentPlanCSV(
      developmentPlan,
      loadedDevelopmentPlan
    );

    return `data:text/csv;charset=urf-8,${timetableCSV}`;
  }, [developmentPlan, loadedDevelopmentPlan]);

  const handleDevelopmentPlanFileUpload = useCallback((file: File) => {
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
  }, []);

  const handleDevelopmentPlanTimetableFileUpload = useCallback((file: File) => {
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
  }, []);

  const handleValidateForm = useCallback(() => {
    validateDevelopmentPlanEvents(timetableEvents);
  }, [timetableEvents, validateDevelopmentPlanEvents]);

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
      <ErrorSummary errors={errors} />
      <div>
        <FileUpload
          label="Upload a CSV file for Development Plan"
          onChange={handleDevelopmentPlanFileUpload}
        />
        <FileUpload
          label="Upload a CSV file for Development Plan Timetable"
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
      {timetableEvents.map((event) => (
        <div
          id={`${event.reference}-eventDate`}
          key={event.developmentPlanEvent}
        >
          <DateInput
            value={event.eventDate}
            label={getTimetableEventName(event.developmentPlanEvent)}
            name={`${event.developmentPlanEvent}-date`}
            error={
              errors.find(
                (error) =>
                  error.path[0] === event.reference &&
                  error.path[1] === "eventDate"
              )?.message
            }
            onChange={(value) =>
              setTimetableEvents((prev) =>
                prev.map((e) => (e === event ? { ...e, eventDate: value } : e))
              )
            }
          />
        </div>
      ))}
      <div>
        <a
          role="button"
          type="button"
          href={developmentPlanDownloadLink}
          download="development-plan.csv"
        >
          <Button>Export Development Plan CSV</Button>
        </a>
      </div>
      <div>
        <a
          role="button"
          type="button"
          data-testid="csv-download-button"
          href={timetableEventsDownloadLink}
          download="development-plan-timetable.csv"
        >
          <Button>Export Development Plan Timetable CSV</Button>
        </a>
      </div>
      <Button onClick={handleValidateForm}>Validate</Button>
      <h1 className="govuk-heading-xl">Preview</h1>
      <PlanViewer
        developmentPlan={developmentPlan}
        timetableEvents={timetableEvents}
      />
    </div>
  );
};
