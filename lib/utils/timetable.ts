import { v4 as uuidv4 } from "uuid";

import { TimetableEventKey, getFormattedDate } from "../constants";
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

  return [headLine, ...CSVRows].join("\r\n");
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

  const newEvents = timetableEvents.filter(
    (event) => !eventsToDownload.some((e) => e.reference === event.reference)
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
      entryDate: currentDate,
      startDate: currentDate,
    });
  }

  return objectArrayToCSVString(planToDownload);
};

export const toDataURL = (data: BlobPart): string => {
  const blob = new Blob([data], { type: "text/csv;charset=utf-8" });
  return URL.createObjectURL(blob);
};

export const loadCSV = async (filepath: string) =>
  await fetch(filepath).then((res) => res.text());

export const toDefaultLocalDateString = (dateString: string) => {
  const date = dateString.split("T")[0];
  const [, , day] = date.split("-");

  return new Date(dateString).toLocaleDateString("en-uk", {
    ...(day && { day: "numeric" }),
    year: "numeric",
    month: "long",
  });
};

type StageProgress = "IN PROGRESS" | "FINISHED" | "NOT STARTED";

export const getStageProgress = (
  lastUpdatedDate: string,
  startEventDate: string,
  endEventDate?: string
): StageProgress => {
  const startDate = new Date(startEventDate);
  const referenceDate = new Date(lastUpdatedDate);

  if (startDate.getTime() > referenceDate.getTime()) return "NOT STARTED";

  if (!endEventDate) {
    if (startDate.getTime() < referenceDate.getTime()) return "FINISHED";
    else return "IN PROGRESS";
  }
  const endDate = new Date(endEventDate);

  if (endDate.getTime() < referenceDate.getTime()) return "FINISHED";
  else return "IN PROGRESS";
};

export const getStatusChangeMessage = (key: TimetableEventKey): string => {
  switch (key) {
    case TimetableEventKey.PlanPaused:
      return "has been paused";
    case TimetableEventKey.PlanWithdrawn:
      return "has been withdrawn";
    case TimetableEventKey.PlanFoundUnsound:
      return "has been judged not sound";
    case TimetableEventKey.PlanNotAdopted:
      return "has not been adopted by the Local Authority";
    default:
      throw new Error("invalid event");
  }
};
