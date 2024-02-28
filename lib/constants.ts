import { v4 as uuidv4 } from "uuid";
import { DevelopmentPlan, DevelopmentPlanTimetable } from "./types/timetable";

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

export type StatusChangeEventsKey = Extract<
TimetableEventKey,
"plan-found-unsound" | "plan-withdrawn" | "plan-paused" | "plan-not-adopted"
>;

export type StatusChangeEvent = Omit<
  DevelopmentPlanTimetable,
  "developmentPlanEvent"
> & {
  developmentPlanEvent?: StatusChangeEventsKey;
};

const eventKeyToNameMap = developmentPlanTimetableEvents.reduce<
  Record<TimetableEventKey, string>
>(
  (acc, { key, name }) => ({ ...acc, [key]: name }),
  {} as Record<TimetableEventKey, string>
);

export const getTimetableEventName = (key: TimetableEventKey) =>
  eventKeyToNameMap[key];

export const getFormattedDate = () => new Date().toISOString().split("T")[0];

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

export const DEFAULT_TIMETABLE_EVENT: Omit<
  DevelopmentPlanTimetable,
  "developmentPlanEvent"
> = {
  reference: uuidv4(),
  name: "",
  developmentPlan: "",
  eventDate: "",
  notes: "",
  organisation: "",
  entryDate: getFormattedDate(),
  startDate: getFormattedDate(),
  endDate: "",
};

export const DEFAULT_TIMETABLE_EVENTS = developmentPlanTimetableEvents.map(
  ({ key }) => ({
    ...DEFAULT_TIMETABLE_EVENT,
    developmentPlanEvent: key,
  })
);
