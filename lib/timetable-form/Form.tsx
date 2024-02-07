import { useMemo, useState } from "react";

import { Button } from "../gds-components/button/Button";
import { TextInput } from "../gds-components/text-input/TextInput";
import { DateInput } from "../gds-components/date-input/DateInput";
import {
  DevelopmentPlan,
  DevelopmentPlanTimetable,
} from "../types/timetable";
import { devPlanToCSVString } from "../utils/timetable";
import { DEFAULT_DEVELOPMENT_PLAN } from "../constants";
import { PlanViewer } from "../timetable-visualisation/PlanViewer";

import styles from "./styles.module.css";
import "govuk-frontend/dist/govuk/govuk-frontend.min.css";

const {
  timetableEvents: timetableEventsInitialState,
  ...developmentPlanInitialState
} = DEFAULT_DEVELOPMENT_PLAN;

export const Form = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  const [developmentPlan, setDevelopmentPlan] = useState<
    Omit<DevelopmentPlan, "timetableEvents">
  >(developmentPlanInitialState);
  const [developmentPlanEvents, setDevelopmentPlanEvents] = useState<
    DevelopmentPlanTimetable[]
  >(timetableEventsInitialState);

  const timetableDownloadLink = useMemo(() => {
    const timetableCSV = devPlanToCSVString({
      ...developmentPlan,
      timetableEvents: developmentPlanEvents,
    });

    return `data:text/csv;charset=urf-8, ${timetableCSV}`;
  }, [developmentPlan, developmentPlanEvents]);

  return (
    <div className={`${className} ${styles.form}`} {...otherProps}>
      <h1 className="govuk-heading-xl" data-testid="form-title">
        Timetable Form
      </h1>
      <div className={styles.formRow}>
        <TextInput
          label="Local planning authority"
          onChange={(lpa) =>
            setDevelopmentPlan((prev) => ({
              ...prev,
              organisations: [lpa],
            }))
          }
          value={developmentPlan.organisations[0]}
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
      <a
        role="button"
        type="button"
        data-testid="csv-download-button"
        href={timetableDownloadLink}
        download="timetable.csv"
      >
        <Button>Export Timetable CSV</Button>
      </a>
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
