import { v4 as uuidv4 } from "uuid";

import { getFormattedDate } from "../constants";
import { DevelopmentPlan, DevelopmentPlanTimetable } from "../types/timetable";

const objectArrayToCSVString = (
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
      // This shouldn't ever happen
      throw Error("Form event not found");
    }

    if (formEvent.eventDate !== loadedEvent.eventDate) {
      const currentDate = getFormattedDate();
      loadedEvent.endDate = currentDate;
      eventsToDownload.push({
        ...formEvent,
        reference: uuidv4(),
        entryDate: currentDate,
        startDate: currentDate,
      });
    }
  });

  return objectArrayToCSVString(eventsToDownload);
};

export const resolveDevelopmentPlanCSV = (
  developmentPlan: Omit<DevelopmentPlan, "timetableEvents">,
  loadedDevelopmentPlan: Omit<DevelopmentPlan, "timetableEvents">[] | null
): string => {
  if (!loadedDevelopmentPlan) {
    return objectArrayToCSVString([developmentPlan]);
  }

  const planToDownload: Omit<DevelopmentPlan, "timetableEvents">[] = JSON.parse(
    JSON.stringify(loadedDevelopmentPlan)
  );
  const latestPlan = planToDownload.slice(-1)[0];
  // TODO: More comparisons to make as we capture more fields
  if (developmentPlan.organisations !== latestPlan.organisations) {
    const currentDate = getFormattedDate();
    latestPlan.endDate = currentDate;
    planToDownload.push({
      ...developmentPlan,
      reference: uuidv4(),
      entryDate: currentDate,
      startDate: currentDate,
    });
  }

  return objectArrayToCSVString(planToDownload);
};

export const fromCSVString = <Row>(csvString: string): Row[] => {
  const [headLine, ...data] = csvString.split("\n");
  const keys = headLine.split(",");

  return data.map((row) => {
    const values = row.split(",");
    const entries = keys.map((key, i) => [key, values[i]]);

    return Object.fromEntries(entries);
  });
};

export const loadCSV = async (filepath: string) =>
  await fetch(filepath).then((res) => res.text());

export const dateToDefaultLocalDateString = (date: Date) =>
  new Date(date).toLocaleDateString("en-uk", {
    day: "numeric",
    year: "numeric",
    month: "long",
  });
