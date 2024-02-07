import { useCallback, useEffect, useState } from "react";

import csvToJson from "csvtojson";

import { loadCSV } from "../utils/timetable";
import { DevelopmentPlan } from "../types/timetable";
import { PlanViewer } from "./PlanViewer";
import { DEFAULT_DEVELOPMENT_PLAN } from "../constants";

import "govuk-frontend/dist/govuk/govuk-frontend.min.css";

type VisualisationProps = {
  stagesFilepath: string;
  headersFilepath: string;
};

export const Visualisation = (props: VisualisationProps) => {
  const { stagesFilepath, headersFilepath } = props;
  const [timetableData, setTimetableData] = useState<DevelopmentPlan>(
    DEFAULT_DEVELOPMENT_PLAN
  );
  const loadData = useCallback(async () => {
    const stagesData = await loadCSV(stagesFilepath);
    const events = await csvToJson().fromString(stagesData);

    const headersData = await loadCSV(headersFilepath);
    const headers = await csvToJson().fromString(headersData);

    const loadedData: DevelopmentPlan = {
      ...DEFAULT_DEVELOPMENT_PLAN,
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
      <PlanViewer plan={timetableData} />
    </div>
  );
};
