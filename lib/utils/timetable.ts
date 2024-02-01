import { DevelopmentPlanTimetable, FormData } from "../types/timetable";
import { v4 as uuidv4 } from "uuid";

const formStateToDevelopmentPlanTimetables = (
  state: FormData,
): DevelopmentPlanTimetable[] => {
  return Object.entries(state.stages).map(([event, eventDate]) => ({
    reference: uuidv4(),
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
    [headLine],
  );

  return CSVRows.join("\n");
};

export { formStateToDevelopmentPlanTimetables, devPlanToCSVString };
