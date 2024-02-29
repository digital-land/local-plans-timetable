import { v4 as uuidv4 } from "uuid";
import { DevelopmentPlan } from "./types/timetable";

// TODO: When we align the visualisation to the design, we won't need the event names here
export const developmentPlanTimetableEvents = [
  { name: "Timetable updated", key: "timetable-updated" },
  {
    name: "Local development scheme published",
    key: "local-development-scheme-published",
  },
  { name: "Public consultation start", key: "public-consultation-start" },
  { name: "Public consultation end", key: "public-consultation-end" },
  { name: "Publication start", key: "publication-start" },
  { name: "Publication end", key: "publication-end" },
  {
    name: "Plan submitted for examination",
    key: "plan-submitted-for-examination",
  },
  { name: "Examination hearing start", key: "examination-hearing-start" },
  { name: "Examination hearing end", key: "examination-hearing-end" },
  { name: "Plan adopted", key: "plan-adopted" },
  { name: "Plan paused", key: "plan-paused" },
  { name: "Plan withdrawn", key: "plan-withdrawn" },
  {
    name: "Plan found sound",
    key: "plan-found-sound",
  },
  {
    name: "Plan found unsound",
    key: "plan-found-unsound",
  },
  {
    name: "Plan not adopted",
    key: "plan-not-adopted",
  },
] as const;

export type TimetableEventKey =
  (typeof developmentPlanTimetableEvents)[number]["key"];

const eventKeyToNameMap = developmentPlanTimetableEvents.reduce<
  Record<TimetableEventKey, string>
>(
  (acc, { key, name }) => ({ ...acc, [key]: name }),
  {} as Record<TimetableEventKey, string>
);

export const getTimetableEventName = (key: TimetableEventKey) =>
  eventKeyToNameMap[key];

export const getFormattedDate = () => new Date().toISOString();

export const DEFAULT_DEVELOPMENT_PLAN: DevelopmentPlan = {
  reference: uuidv4(),
  name: "",
  description: "",
  developmentPlanType: "",
  periodStartDate: "",
  developmentPlanGeography: "",
  documentationUrl: "",
  organisations: "",
  entryDate: "",
  startDate: "",
};

const eventsToExclude = new Set<TimetableEventKey>([
  "timetable-updated",
  "plan-paused",
  "plan-withdrawn",
  "plan-found-sound",
  "plan-found-unsound",
  "plan-not-adopted",
]);

//These dates will be set on start of form rather than end (opposite to updated events)
export const DEFAULT_TIMETABLE_EVENTS = developmentPlanTimetableEvents
  .filter(({ key }) => !eventsToExclude.has(key))
  .map(({ key }) => ({
    reference: uuidv4(),
    name: "",
    developmentPlan: "",
    developmentPlanEvent: key,
    eventDate: "",
    notes: "",
    organisation: "",
    entryDate: getFormattedDate(),
    startDate: getFormattedDate(),
    endDate: "",
  }));
