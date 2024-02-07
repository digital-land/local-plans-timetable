import { DevelopmentPlan } from "../types/timetable";

const devPlanToCSVString = (timeTables: DevelopmentPlan): string => {
  const headLine = Object.keys(timeTables.timetableEvents[0]).join(", ");

  const CSVRows = timeTables.timetableEvents.reduce(
    (array, timetableItem) => [
      ...array,
      Object.values(timetableItem).join(", "),
    ],
    [headLine]
  );

  return CSVRows.join("\n");
};

const loadCSV = async (filepath: string) =>
  await fetch(filepath).then((res) => res.text());

const dateToDefaultLocalDateString = (date: Date) =>
  new Date(date).toLocaleDateString("en-uk", {
    day: "numeric",
    year: "numeric",
    month: "long",
  });

export {
  devPlanToCSVString,
  loadCSV,
  dateToDefaultLocalDateString,
};
