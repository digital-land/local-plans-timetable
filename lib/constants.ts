import { v4 as uuidv4 } from "uuid";
import { DevelopmentPlan } from "./types/timetable";

export const stageNames = [
  "Timetable published",
  "Draft plan for public consultation published",
  "Public consultation start",
  "Public consultation end",
  "Submit plan for examination",
  "Examination hearing start",
  "Planning inspectorate examination start",
  "Planning inspectorate examination end",
  "Planning inspectorate found sound",
  "Examination hearing end",
  "Inspector report published",
  "Plan adopted",
] as const;

const defaultDate = new Date().toISOString().split("T")[0];

export const DEFAULT_DEVELOPMENT_PLAN: DevelopmentPlan = {
  reference: uuidv4(),
  name: "",
  description: "",
  developmentPlanType: "",
  periodStartDate: defaultDate,
  developmentPlanGeography: "",
  documentationUrl: "",
  adoptedDate: defaultDate,
  organisations: "",
  entryDate: defaultDate,
  startDate: defaultDate,
  timetableEvents: stageNames.map((stage) => ({
    reference: uuidv4(),
    name: "",
    developmentPlan: "",
    developmentPlanEvent: stage,
    eventDate: "",
    notes: "",
    organisation: "",
    entryDate: defaultDate,
    startDate: defaultDate,
    endDate: "",
  })),
};
