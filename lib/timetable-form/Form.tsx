import { useState } from "react";
import "govuk-frontend/dist/govuk/govuk-frontend.min.css";

import { TextInput } from "../gds-components/text-input/TextInput";
import { DateInput } from "../gds-components/date-input/DateInput";
import { Stages, FormData } from "../types/timetable";
import {
  formStateToDevelopmentPlanTimetables,
  devPlanToCSVString,
} from "../utils/timetable";
import { stageNames } from "../constants";

import styles from "./styles.module.css";

const defaultDate = "";

const initialStages = Object.fromEntries(
  stageNames.map((stage) => [stage, defaultDate])
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
      <h1 className="govuk-heading-xl" data-testid="form-title">
        Timetable Form
      </h1>
      <div className={styles.formRow}>
        <TextInput
          label="Local planning authority"
          onChange={setLpa}
          value={lpa}
        />
      </div>
      {stageNames.map((stageName) => (
        <div key={stageName}>
          <DateInput
            value={stages[stageName]}
            label={stageName}
            name={`${stageName.split(" ").join("-")}-date`}
            onChange={(value) =>
              setStages((prev) => ({ ...prev, [stageName]: value }))
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
