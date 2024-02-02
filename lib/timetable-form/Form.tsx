import { useState } from "react";
import "govuk-frontend/dist/govuk/govuk-frontend.min.css";

import styles from "./styles.module.css";
import { Stages, FormData } from "../types/timetable";
import { stageNames } from "../constants";
import {
  formStateToDevelopmentPlanTimetables,
  devPlanToCSVString,
} from "../utils/timetable";

const defaultDate = "";

const initialStages = Object.fromEntries(
  stageNames.map((stage) => [stage, defaultDate]),
) as Stages;

export const Form = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...otherProps } = props;
  const [lpa, setLpa] = useState<string>("");
  const [stages, setStages] = useState<Stages>(initialStages);

  const getTimetableDownload = (formData: FormData) => {
    const timetables = formStateToDevelopmentPlanTimetables(formData);

    const timetableCSV = devPlanToCSVString(timetables);

    return `data:text/csv;charset=urf-8, ${timetableCSV}`;
  };

  return (
    <div className={`${className} ${styles.form}`} {...otherProps}>
      <h1 data-testid="form-title">Timetable Form </h1>
      <div className={styles.formRow}>
        Local Planning Authority
        <input value={lpa} onChange={(e) => setLpa(e.target.value)} />
      </div>
      {stageNames.map((stageName) => (
        <div className={styles.formRow} key={stageName}>
          {stageName}
          <input
            type="month"
            value={stages[stageName]}
            data-testid={`${stageName.replace(/ /gi, "-")}-input`}
            onChange={(e) =>
              setStages((prev) => ({
                ...prev,
                [stageName]: e.target.value,
              }))
            }
          />
        </div>
      ))}
      <a
        role="button"
        type="button"
        data-testid="csv-download-button"
        href={getTimetableDownload({ LPA: lpa, stages })}
        download="timetable.csv"
      >
        <button> Export Timetable CSV</button>
      </a>
    </div>
  );
};
