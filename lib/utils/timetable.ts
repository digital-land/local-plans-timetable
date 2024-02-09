import { v4 as uuidv4 } from "uuid";

import { DEFAULT_DEVELOPMENT_PLAN, getDefaultDate } from "../constants";
import { DevelopmentPlan, DevelopmentPlanTimetable } from "../types/timetable";

export const objectArrayToCSVString = (
  objArr: { [key: string]: unknown }[]
): string => {
  const headLine = Object.keys(objArr[0]).join(",");

  const CSVRows = objArr.reduce(
    (array, timetableItem) => [
      ...array,
      Object.values(timetableItem).join(","),
    ],
    [headLine]
  );

  return CSVRows.join("\n");
};

export const resolveTimetableEventsCSV = (
  timetableEvents: DevelopmentPlanTimetable[],
  loadedTimetableEvents: DevelopmentPlanTimetable[] | null
): string => {
  if (!loadedTimetableEvents) {
    return objectArrayToCSVString(timetableEvents);
  }

  const eventsToDownload: DevelopmentPlanTimetable[] = JSON.parse(
    JSON.stringify(loadedTimetableEvents)
  );
  eventsToDownload.forEach((loadedEvent) => {
    if (loadedEvent.endDate) {
      return;
    }

    const formEvent = timetableEvents.find(
      (event) => event.reference === loadedEvent.reference
    );
    if (!formEvent) {
      return;
    }

    if (formEvent.eventDate !== loadedEvent.eventDate) {
      loadedEvent.endDate = getDefaultDate();
      eventsToDownload.push({
        ...formEvent,
        reference: uuidv4(),
        entryDate: getDefaultDate(),
        startDate: getDefaultDate(),
      });
    }
  });

  return objectArrayToCSVString(eventsToDownload);
};

export const CSVStringToDevPlan = (csvString: string): DevelopmentPlan => {
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

export const CSVStringToDevPlanTimetable = (
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

export const loadCSV = async (filepath: string) =>
  await fetch(filepath).then((res) => res.text());

export const dateToDefaultLocalDateString = (date: Date) =>
  new Date(date).toLocaleDateString("en-uk", {
    day: "numeric",
    year: "numeric",
    month: "long",
  });
