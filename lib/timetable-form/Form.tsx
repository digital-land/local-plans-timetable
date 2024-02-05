import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "../gds-components/button/Button";
import { TextInput } from "../gds-components/text-input/TextInput";
import { DateInput } from "../gds-components/date-input/DateInput";
import { DevelopmentPlan } from "../types/timetable";
import { devPlanToCSVString } from "../utils/timetable";
import { stageNames } from "../constants";

import styles from "./styles.module.css";
import "govuk-frontend/dist/govuk/govuk-frontend.min.css";
import { PlanPreview } from "../timetable-visualisation/PlanPreview";

const defaultDate = "";

const initialState: DevelopmentPlan = {
  reference: "",
  name: "",
  description: "",
  developmentPlanType: "",
  periodStartDate: defaultDate,
  periodEndDate: defaultDate,
  developmentPlanGeography: "",
  documentationUrl: "",
  adoptedDate: defaultDate,
  organisations: [],
  entryDate: defaultDate,
  startDate: defaultDate,
  endDate: defaultDate,
  timetableEvents: stageNames.map((stage) => ({
    reference: uuidv4(),
    name: "",
    developmentPlan: "",
    developmentPlanEvent: stage,
    eventDate: "",
    notes: "",
    organisation: "",
    entryDate: defaultDate,
    startDate: "",
    endDate: "",
  })),
};

export const Form = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...otherProps } = props;
  const [developmentPlan, setDevelopmentPlan] =
    useState<DevelopmentPlan>(initialState);

  const timetableDownloadLink = useMemo(() => {
    const timetableCSV = devPlanToCSVString(developmentPlan);

    return `data:text/csv;charset=urf-8, ${timetableCSV}`;
  }, [developmentPlan]);

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
      {developmentPlan.timetableEvents.map((stage) => (
        <div key={stage.developmentPlanEvent}>
          <DateInput
            value={stage.eventDate}
            label={stage.developmentPlanEvent}
            name={`${stage.developmentPlanEvent.split(" ").join("-")}-date`}
            onChange={(value) =>
              setDevelopmentPlan((prev) => ({
                ...prev,
                timetableEvents: prev.timetableEvents.map((e) =>
                  e === stage ? { ...e, eventDate: value } : e
                ),
              }))
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
      <PlanPreview plan={developmentPlan} />
    </div>
  );
};
