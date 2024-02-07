import { DEFAULT_DEVELOPMENT_PLAN } from "../constants";
import { DevelopmentPlan, DevelopmentPlanTimetable } from "../types/timetable";

const objectArrayToCSVString = (
  objArr: { [key: string]: unknown }[],
): string => {
  const headLine = Object.keys(objArr[0]).join(",");

  const CSVRows = objArr.reduce(
    (array, timetableItem) => [
      ...array,
      Object.values(timetableItem).join(","),
    ],
    [headLine],
  );

  return CSVRows.join("\n");
};

const CSVStringToDevPlan = (csvString: string): DevelopmentPlan => {
  const [headLine, data] = csvString.split("\n");

  const keys = headLine.split(",");
  const values = data.split(",");
  const entries = keys.map((key, i) => [key, values[i]]);
  
  const developmentPlan: DevelopmentPlan = Object.fromEntries(entries);

  return {
    ...DEFAULT_DEVELOPMENT_PLAN,
    ...developmentPlan,
  };
};

const CSVStringToDevPlanTimetable = (
  csvString: string
): DevelopmentPlanTimetable[] => {
  const [headLine, ...data] = csvString.split("\n");

  const keys = headLine.split(",");

  const timetableEvents = data.map((row) => {
    const values = row.split(",");
    const entries = keys.map((key, i) => [key, values[i]]);

    return Object.fromEntries(entries);
  });

  return timetableEvents;
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
  dateToDefaultLocalDateString,
  objectArrayToCSVString,
  loadCSV,
  CSVStringToDevPlan,
  CSVStringToDevPlanTimetable,
};
