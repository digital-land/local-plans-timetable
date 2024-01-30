import { useState } from "react";
import styles from "./styles.module.css";

const stageNames = [
  "Timetable published",
  "Draft plan for public consultation published",
  "Public consultation start",
  "Public consultation end",
  "Submit plan for examination",
  "Examination hearing start",
  "Planning inspectorate examination start",
  "Planning inspectorate examination end",
  "Planning inspectorate found sound",
  "Examination hearing end",
  "Inspector report published",
  "Plan adopted",
] as const;

type StageName = (typeof stageNames)[number];

const defaultDate = "";

type Stages = {
  [key in StageName]: string;
};

const initialStages = Object.fromEntries(
  stageNames.map((stage) => [stage, defaultDate])
) as Stages;

export const Form = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...otherProps } = props;
  const [lpa, setLpa] = useState<string>("");
  const [stages, setStages] = useState<Stages>(initialStages);

  return (
    <div className={`${className} ${styles.form}`} {...otherProps}>
      <h1 data-testid="form-title">Timetable Form </h1>
      <div className={styles.formContent}>
        Local Planning Authority
        <input value={lpa} onChange={(e) => setLpa(e.target.value)} />
        {Object.entries(stages).map(([stageName, date]) => (
          <>
            {stageName}
            <input
              key={stageName}
              type="month"
              value={date}
              onChange={(e) =>
                setStages((prev) => ({
                  ...prev,
                  [stageName]: e.target.value,
                }))
              }
            />
          </>
        ))}
      </div>
    </div>
  );
};
