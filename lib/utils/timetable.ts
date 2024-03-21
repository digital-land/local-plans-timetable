import { v4 as uuidv4 } from "uuid";
import { unparse, parse } from "papaparse";

import { TagLabel } from "@lib/gds-components";
import {
  TimetableEventKey,
  getFormattedDate,
  isStatusChangeEventKey,
} from "../constants";
import { DevelopmentPlan, DevelopmentPlanTimetable } from "../types/timetable";

export const csvToObjectArray = <T>(CSVString: string): T[] => {
  const json = parse<T>(CSVString, {
    header: true,
    transformHeader: (header) => kebabCaseToCamelCase(header),
  });

  if (json.errors.length) {
    throw new Error("Error parsing CSV");
  }
  return json.data;
};

export const objectArrayToCSVString = (
  objArr: { [key: string]: unknown }[]
): string => {
  // ensure all objects keys are in the same order
  const orderedObjectArray = objArr.map((object) =>
    Object.keys(object)
      .sort()
      .reduce((obj: { [key: string]: unknown }, key) => {
        obj[key] = object[key];
        return obj;
      }, {})
  );

  return unparse({
    fields: Object.keys(orderedObjectArray[0]).map((header) =>
      camelCaseToKebabCase(header)
    ),
    data: orderedObjectArray.map((obj) => Object.values(obj)),
  });
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
    if (!isValidEntity(loadedEvent)) {
      return;
    }

    const formEvent = timetableEvents.find(
      (event) => event.reference === loadedEvent.reference
    );
    if (!formEvent) {
      // Event has been removed
      return;
    }

    const currentDate = getFormattedDate();
    if (isStatusChangeEventKey(formEvent.developmentPlanEvent)) {
      loadedEvent.endDate = currentDate;
      return;
    }

    if (
      formEvent.eventDate !== loadedEvent.eventDate ||
      formEvent.notes !== loadedEvent.notes
    ) {
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

const noDateText = "unknown";

export const toStageDateString = (
  startEvent: DevelopmentPlanTimetable,
  endEvent?: DevelopmentPlanTimetable
): string => {
  const startDate = startEvent.eventDate;
  const endDate = endEvent?.eventDate;

  if (!endEvent) {
    return startDate ? toDefaultLocalDateString(startDate) : noDateText;
  }
  const start = startDate ? toDefaultLocalDateString(startDate) : noDateText;
  const end = endDate ? toDefaultLocalDateString(endDate) : noDateText;

  return `${start} to ${end}`;
};

const getDatePartFromISOString = (isoString: string, includeDays: boolean) => {
  const date = isoString.split("T")[0];
  return includeDays ? date : date.split("-").slice(0, 2).join("-");
};

export const getStageProgress = (
  lastUpdatedDate: string,
  startEventDate: string,
  endEventDate?: string
): TagLabel => {
  const includeDays = startEventDate.split("-").length > 2;
  const startDate = new Date(
    getDatePartFromISOString(startEventDate, includeDays)
  );
  const referenceDate = new Date(
    getDatePartFromISOString(lastUpdatedDate, includeDays)
  );
  const endDate = endEventDate
    ? new Date(getDatePartFromISOString(endEventDate, includeDays))
    : null;

  if (!endDate) {
    return startDate.getTime() <= referenceDate.getTime()
      ? "Finished"
      : "Not started";
  }

  if (
    startDate.getTime() <= referenceDate.getTime() &&
    endDate.getTime() >= referenceDate.getTime()
  ) {
    return "In progress";
  }

  return endDate.getTime() < referenceDate.getTime()
    ? "Finished"
    : "Not started";
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

export const camelCaseToKebabCase = (str: string): string => {
  return str.replace(/[A-Z]/g, (x) => `-${x[0].toLowerCase()}`);
};

export const kebabCaseToCamelCase = (str: string): string => {
  return str.replace(/-./g, (x) => x[1].toUpperCase());
};

const dateIsInThePast = (date: string) =>
  new Date(date).getTime() <= new Date().getTime();

const dateIsInTheFuture = (date: string) =>
  new Date(date).getTime() > new Date().getTime();

export const isValidEntity = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate?: string;
}): boolean => {
  const endDateIsValid = !endDate || dateIsInTheFuture(endDate);

  return dateIsInThePast(startDate) && endDateIsValid;
};
