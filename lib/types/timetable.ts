import { TimetableEventKey } from "../constants";

export type DevelopmentPlan = {
  reference: string;
  name: string;
  description: string;
  developmentPlanType: string;
  periodStartDate: string;
  periodEndDate?: string;
  developmentPlanGeography: string;
  documentationUrl: string;
  organisations: string;
  entryDate: string;
  startDate: string;
  endDate?: string;
};

export type DevelopmentPlanTimetable = {
  reference: string;
  name: string;
  developmentPlan: string;
  developmentPlanEvent: TimetableEventKey;
  eventDate: string;
  notes: string;
  organisation: string;
  entryDate: string;
  startDate: string;
  endDate?: string;
};
