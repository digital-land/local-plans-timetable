import { useCallback, useMemo, useState, useEffect } from "react";

import { ValidationErrorItem } from "joi";

import { FileUpload, DateInput, Button } from "../gds-components";
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
  getStageName,
  stages,
} from "../constants";
import { PlanViewer } from "../timetable-visualisation/PlanViewer";
import { fetchLPAs } from "../api/index";
import { developmentPlanEventSchema } from "../validation";

import styles from "./styles.module.css";
import "govuk-frontend/dist/govuk/govuk-frontend.min.css";

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

  const [loadedDevelopmentPlanEvents, setLoadedDevelopmentPlanEvents] =
    useState<DevelopmentPlanTimetable[] | null>(null);
  const [developmentPlanEvents, setDevelopmentPlanEvents] = useState<
    DevelopmentPlanTimetable[]
  >(DEFAULT_TIMETABLE_EVENTS);

  const [formErrors, serFormErrors] = useState<ValidationErrorItem[]>([]);

  const timetableDownloadLink = useMemo(() => {
    const timetableCSV = resolveTimetableEventsCSV(
      developmentPlanEvents,
      loadedDevelopmentPlanEvents
    );

    return `data:text/csv;charset=urf-8,${timetableCSV}`;
  }, [developmentPlanEvents, loadedDevelopmentPlanEvents]);

  const timetableHeaderDownloadLink = useMemo(() => {
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

  const handleValidateForm = useCallback(() => {
    const validationErrors: ValidationErrorItem[] = [];

    developmentPlanEvents.forEach((event) => {
      const validationResult = developmentPlanEventSchema.validate(event, {
        abortEarly: false,
      });

      if (validationResult.error) {
        const validationErrors = validationResult.error.details.map(
          (error) => ({
            ...error,
            path: [validationResult.value.reference, ...error.path],
          })
        );
        validationErrors.push(...validationErrors);
      }
    });
    serFormErrors(validationErrors);
  }, [developmentPlanEvents]);

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
      {formErrors.length > 0 && (
        <div className="govuk-error-summary" data-module="govuk-error-summary">
          <div role="alert">
            <h2 className="govuk-error-summary__title">There is a problem</h2>
            <div className="govuk-error-summary__body">
              <ul className="govuk-list govuk-error-summary__list">
                {formErrors.map((error) => (
                  <li>
                    <a href={`#${error.path.join("-")}`}>{error.message}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
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
        <div
          id={`${stage.reference}-eventDate`}
          key={stage.developmentPlanEvent}
        >
          <DateInput
            value={stage.eventDate}
            label={getStageName(stage.developmentPlanEvent)}
            name={`${stage.developmentPlanEvent}-date`}
            error={
              formErrors.find(
                (error) =>
                  error.path[0] === stage.reference &&
                  error.path[1] === "eventDate"
              )?.message
            }
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
      <Button
        onClick={() => {
          handleValidateForm();
        }}
      >
        Validate
      </Button>
      <h1 className="govuk-heading-xl">Preview</h1>
      <PlanViewer
        developmentPlan={developmentPlan}
        timetableEvents={developmentPlanEvents}
      />
    </div>
  );
};
