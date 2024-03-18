import { useCallback, useEffect, useState } from "react";

import { csvToObjectArray, isValidEntity, loadCSV } from "../utils/timetable";
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
    const events = csvToObjectArray<DevelopmentPlanTimetable>(eventsData);

    const developmentPlanData = await loadCSV(developmentPlanFilepath);
    const developmentPlan =
      csvToObjectArray<DevelopmentPlan>(developmentPlanData);

    const currentDevelopmentPlan = developmentPlan.find(isValidEntity);

    if (!currentDevelopmentPlan) {
      throw new Error("No valid development plan found");
    }

    const loadedData: DevelopmentPlan = {
      ...DEFAULT_DEVELOPMENT_PLAN,
      ...currentDevelopmentPlan,
    };

    setDevelopmentPlan(loadedData);
    setTimetableEvents(events.filter(isValidEntity));
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
