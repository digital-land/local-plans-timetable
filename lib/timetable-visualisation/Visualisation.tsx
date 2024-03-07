import { useCallback, useEffect, useState } from "react";

import csvToJson from "csvtojson";

import { loadCSV } from "../utils/timetable";
import { DevelopmentPlan, DevelopmentPlanTimetable } from "../types/timetable";
import { PlanViewer } from "./PlanViewer";
import {
  DEFAULT_DEVELOPMENT_PLAN,
  getDefaultTimetableEvents,
} from "../constants";

import "govuk-frontend/dist/govuk/govuk-frontend.min.css";

export type VisualisationProps = {
  developmentPlanFilepath: string;
  timetableEventsFilepath: string;
};

export const Visualisation = (props: VisualisationProps) => {
  const { timetableEventsFilepath, developmentPlanFilepath } = props;
  const [developmentPlan, setDevelopmentPlan] = useState<DevelopmentPlan>(
    DEFAULT_DEVELOPMENT_PLAN
  );
  const [timetableEvents, setTimetableEvents] = useState<
    DevelopmentPlanTimetable[]
  >(getDefaultTimetableEvents(developmentPlan.reference));

  const loadData = useCallback(async () => {
    const eventsData = await loadCSV(timetableEventsFilepath);
    const events = await csvToJson().fromString(eventsData);

    const developmentPlanData = await loadCSV(developmentPlanFilepath);
    const developmentPlan = await csvToJson().fromString(developmentPlanData);

    const loadedData: DevelopmentPlan = {
      ...DEFAULT_DEVELOPMENT_PLAN,
      // This assumes the last row is the current data
      ...developmentPlan.slice(-1)[0],
    };

    setDevelopmentPlan(loadedData);
    setTimetableEvents(
      events
        // This assumes any row with an end date is invalid
        .filter((event) => !event.endDate)
    );
  }, [developmentPlanFilepath, timetableEventsFilepath]);

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
