import { useState } from "react";
import styles from "./styles.module.css";
import { DevelopmentPlanTimetable, Stages } from "../types/timetable";
import { stageNames } from "../constants";
import { randomUUID } from "crypto";

const defaultDate = "";

const initialStages = Object.fromEntries(
  stageNames.map((stage) => [stage, defaultDate])
) as Stages;

type FormData = {
  LPA: string;
  stages: Stages;
};

const formStateToDevelopmentPlanTimetables = (
  state: FormData
): DevelopmentPlanTimetable[] => {
  return Object.entries(state.stages).map(([event, eventDate]) => ({
    reference: randomUUID(),
    name: "",
    developmentPlan: "dorcester-new-local-plan", //this will be coming from a dropdown on the form
    developmentPlanEvent: event,
    eventDate: eventDate,
    notes: "",
    organisation: state.LPA,
    entryDate: new Date().toISOString(),
    startDate: new Date().toISOString(),
  }));
};

const devPlanToCSVString = (timeTables: DevelopmentPlanTimetable[]): string => {
  const headLine = Object.keys(timeTables[0]).join(", ");

  const CSVRows = timeTables.reduce(
    (array, timetableItem) => [
      ...array,
      Object.values(timetableItem).join(", "),
    ],
    [headLine]
  );

  return CSVRows.join("\n");
};

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
        href={getTimetableDownload({ LPA: lpa, stages })}
        download="timetable.csv"
      >
        <button> Export Timetable CSV</button>
      </a>
    </div>
  );
};
