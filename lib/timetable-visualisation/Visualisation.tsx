import { useCallback, useEffect, useState } from "react";
import csvToJson from "csvtojson";
import { loadCSV } from "../utils/timetable";
import { DevelopmentPlan } from "../types/timetable";

import "govuk-frontend/dist/govuk/govuk-frontend.min.css";
import { PlanPreview } from "./PlanPreview";

const DEFAULT_DEVELOPMENT_PLAN_DATA: DevelopmentPlan = {
  reference: "",
  name: "",
  description: "",
  developmentPlanType: "",
  periodStartDate: "",
  periodEndDate: "",
  developmentPlanGeography: "",
  documentationUrl: "",
  adoptedDate: "",
  organisations: [],
  entryDate: "",
  startDate: "",
  endDate: "",
  timetableEvents: [],
};

type VisualisationProps = {
  stagesFilepath: string;
  headersFilepath: string;
};

export const Visualisation = (props: VisualisationProps) => {
  const { stagesFilepath, headersFilepath } = props;
  const [timetableData, setTimetableData] = useState<DevelopmentPlan>(
    DEFAULT_DEVELOPMENT_PLAN_DATA
  );
  const loadData = useCallback(async () => {
    const stagesData = await loadCSV(stagesFilepath);
    const events = await csvToJson().fromString(stagesData);

    const headersData = await loadCSV(headersFilepath);
    const headers = await csvToJson().fromString(headersData);

    const loadedData: DevelopmentPlan = {
      ...DEFAULT_DEVELOPMENT_PLAN_DATA,
      ...headers[0],
      timetableEvents: events,
    };

    setTimetableData(loadedData);
  }, [headersFilepath, stagesFilepath]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div data-testid="visualisation">
      <PlanPreview plan={timetableData} />
    </div>
  );
};
