import { v4 as uuidv4 } from "uuid";
import { DevelopmentPlan } from "./types/timetable";

export const developmentPlanTimetableEvents = [
  { name: "Timetable published", key: "timetable-published" },
  {
    name: "Draft plan for public consultation published",
    key: "draft-plan-for-public-consultation-published",
  },
  { name: "Public consultation start", key: "public-consultation-start" },
  { name: "Public consultation end", key: "public-consultation-end" },
  { name: "Submit plan for examination", key: "submit-plan-for-examination" },
  { name: "Examination hearing start", key: "examination-hearing-start" },
  {
    name: "Planning inspectorate examination start",
    key: "planning-inspectorate-examination-start",
  },
  {
    name: "Planning inspectorate examination end",
    key: "planning-inspectorate-examination-end",
  },
  {
    name: "Planning inspectorate found sound",
    key: "planning-inspectorate-found-sound",
  },
  { name: "Examination hearing end", key: "examination-hearing-end" },
  { name: "Inspector report published", key: "inspector-report-published" },
  { name: "Plan adopted", key: "plan-adopted" },
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

export const getFormattedDate = () => new Date().toISOString().split("T")[0];

export const DEFAULT_DEVELOPMENT_PLAN: DevelopmentPlan = {
  reference: uuidv4(),
  name: "",
  description: "",
  developmentPlanType: "",
  periodStartDate: getFormattedDate(),
  developmentPlanGeography: "",
  documentationUrl: "",
  adoptedDate: getFormattedDate(),
  organisations: "",
  entryDate: getFormattedDate(),
  startDate: getFormattedDate(),
};

export const DEFAULT_TIMETABLE_EVENTS = developmentPlanTimetableEvents.map(
  ({ key }) => ({
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
  })
);
