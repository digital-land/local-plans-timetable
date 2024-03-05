import { v4 as uuidv4 } from "uuid";
import { DevelopmentPlan, DevelopmentPlanTimetable } from "./types/timetable";

export enum TimetableEventKey {
  TimetableUpdated = "timetable-updated",
  LocalDevelopmentSchemePublished = "local-development-scheme-published",
  PublicConsultationStart = "public-consultation-start",
  PublicConsultationEnd = "public-consultation-end",
  PublicationStart = "publication-start",
  PublicationEnd = "publication-end",
  PlanSubmittedForExamination = "plan-submitted-for-examination",
  ExaminationHearingStart = "examination-hearing-start",
  ExaminationHearingEnd = "examination-hearing-end",
  PlanAdopted = "plan-adopted",
  PlanPaused = "plan-paused",
  PlanWithdrawn = "plan-withdrawn",
  PlanFoundSound = "plan-found-sound",
  PlanFoundUnsound = "plan-found-unsound",
  PlanNotAdopted = "plan-not-adopted",
}

export type StatusChangeEventsKey = Extract<
  TimetableEventKey,
  | TimetableEventKey.PlanFoundUnsound
  | TimetableEventKey.PlanWithdrawn
  | TimetableEventKey.PlanPaused
  | TimetableEventKey.PlanNotAdopted
>;

export type StatusChangeEvent = Omit<
  DevelopmentPlanTimetable,
  "developmentPlanEvent"
> & {
  developmentPlanEvent?: StatusChangeEventsKey;
};

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
  TimetableEventKey.TimetableUpdated,
  TimetableEventKey.PlanPaused,
  TimetableEventKey.PlanWithdrawn,
  TimetableEventKey.PlanFoundSound,
  TimetableEventKey.PlanFoundUnsound,
  TimetableEventKey.PlanNotAdopted,
]);

export const getDefaultTimetableEvent = (): Omit<
  DevelopmentPlanTimetable,
  "developmentPlanEvent"
> => ({
  reference: uuidv4(),
  name: "",
  developmentPlan: "",
  eventDate: "",
  notes: "",
  organisation: "",
  entryDate: getFormattedDate(),
  startDate: getFormattedDate(),
  endDate: "",
});

//These dates will be set on start of form rather than end (opposite to updated events)
export const DEFAULT_TIMETABLE_EVENTS = Object.values(TimetableEventKey)
  .filter((key) => !eventsToExclude.has(key))
  .map((key) => ({
    developmentPlanEvent: key,
    ...getDefaultTimetableEvent(),
  }));
