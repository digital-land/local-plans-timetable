import { v4 as uuidv4 } from "uuid";

import { getFormattedDate } from "../constants";
import { DevelopmentPlan, DevelopmentPlanTimetable } from "../types/timetable";

const objectArrayToCSVString = (
  objArr: { [key: string]: unknown }[]
): string => {
  const headers = Object.keys(objArr[0]);

  const headLine = headers.join(",");

  const CSVRows = objArr.map((timetableItem) => {
    const values = headers.map((header) => timetableItem[header]);

    return values.join(",");
  });

  return [headLine, ...CSVRows].join("\n");
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

    if (
      formEvent.eventDate !== loadedEvent.eventDate ||
      formEvent.notes !== loadedEvent.notes
    ) {
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

  const newEvents = JSON.parse(
    JSON.stringify(
      timetableEvents.filter(
        (event) =>
          !eventsToDownload.some((e) => e.reference === event.reference)
      )
    )
  );

  eventsToDownload.push(...newEvents);

  return objectArrayToCSVString(eventsToDownload);
};

export const resolveDevelopmentPlanCSV = (
  developmentPlan: DevelopmentPlan,
  loadedDevelopmentPlan: DevelopmentPlan[] | null
): string => {
  if (!loadedDevelopmentPlan) {
    return objectArrayToCSVString([developmentPlan]);
  }

  const planToDownload: DevelopmentPlan[] = JSON.parse(
    JSON.stringify(loadedDevelopmentPlan)
  );
  const latestPlan = planToDownload.slice(-1)[0];
  if (
    developmentPlan.organisations !== latestPlan.organisations ||
    developmentPlan.name !== latestPlan.name ||
    developmentPlan.description !== latestPlan.description
  ) {
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
