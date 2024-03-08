import { Visualisation } from "@lib/main";

export const VisualisationExamplePage = (): JSX.Element => {
  return (
    <Visualisation
      developmentPlanFilepath={"https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/development-plan.csv"}
      timetableEventsFilepath={"https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/timetable.csv"}
    />
  );
};
