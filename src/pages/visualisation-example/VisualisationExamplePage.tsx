import { Visualisation } from "@lib/main";

export const VisualisationExamplePage = (): JSX.Element => {
  return (
    <Visualisation
      developmentPlanFilepath={"assets/development-plan.csv"}
      timetableEventsFilepath={"assets/timetable.csv"}
    />
  );
};
