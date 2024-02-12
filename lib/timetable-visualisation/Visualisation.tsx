import { useCallback, useEffect, useState } from "react";

import csvToJson from "csvtojson";

import { loadCSV } from "../utils/timetable";
import { DevelopmentPlan, DevelopmentPlanTimetable } from "../types/timetable";
import { PlanViewer } from "./PlanViewer";
import {
  DEFAULT_DEVELOPMENT_PLAN,
  DEFAULT_TIMETABLE_EVENTS,
} from "../constants";

import "govuk-frontend/dist/govuk/govuk-frontend.min.css";

export type VisualisationProps = {
  stagesFilepath: string;
  headersFilepath: string;
};

export const Visualisation = (props: VisualisationProps) => {
  const { stagesFilepath, headersFilepath } = props;
  const [developmentPlan, setDevelopmentPlan] = useState<DevelopmentPlan>(
    DEFAULT_DEVELOPMENT_PLAN
  );
  const [timetableEvents, setTimetableEvents] = useState<
    DevelopmentPlanTimetable[]
  >(DEFAULT_TIMETABLE_EVENTS);

  const loadData = useCallback(async () => {
    const stagesData = await loadCSV(stagesFilepath);
    const events = await csvToJson().fromString(stagesData);

    const headersData = await loadCSV(headersFilepath);
    const headers = await csvToJson().fromString(headersData);

    const loadedData: DevelopmentPlan = {
      ...DEFAULT_DEVELOPMENT_PLAN,
      // This assumes the last row is the current row
      ...headers.slice(-1)[0],
    };

    setDevelopmentPlan(loadedData);
    setTimetableEvents(events);
  }, [headersFilepath, stagesFilepath]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div data-testid="visualisation">
      <PlanViewer
        developmentPlan={developmentPlan}
        timetableEvents={timetableEvents}
      />
    </div>
  );
};
