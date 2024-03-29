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

export const statusChangeEvents = [
  TimetableEventKey.PlanFoundUnsound,
  TimetableEventKey.PlanWithdrawn,
  TimetableEventKey.PlanPaused,
  TimetableEventKey.PlanNotAdopted,
] as const;

export type StatusChangeEventKey = (typeof statusChangeEvents)[number];

export const isStatusChangeEventKey = (
  timetableEventKey: TimetableEventKey
): timetableEventKey is StatusChangeEventKey =>
  (statusChangeEvents as unknown as TimetableEventKey[]).includes(
    timetableEventKey
  );

export type StatusChangeEvent = Omit<
  DevelopmentPlanTimetable,
  "developmentPlanEvent"
> & {
  developmentPlanEvent?: StatusChangeEventKey;
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
  endDate: "",
};

const eventsToExclude = new Set<TimetableEventKey>([
  ...statusChangeEvents,
  TimetableEventKey.TimetableUpdated,
  TimetableEventKey.PlanFoundSound,
]);

export const getDefaultTimetableEvent = (): Omit<
  DevelopmentPlanTimetable,
  "developmentPlanEvent" | "developmentPlan"
> => ({
  reference: uuidv4(),
  name: "",
  eventDate: "",
  notes: "",
  organisation: "",
  entryDate: "",
  startDate: "",
  endDate: "",
});

//These dates will be set on start of form rather than end (opposite to updated events)
export const getDefaultTimetableEvents = (devPlanReference: string) =>
  Object.values(TimetableEventKey)
    .filter((key) => !eventsToExclude.has(key))
    .map((key) => ({
      developmentPlanEvent: key,
      developmentPlan: devPlanReference,
      ...getDefaultTimetableEvent(),
    }));
