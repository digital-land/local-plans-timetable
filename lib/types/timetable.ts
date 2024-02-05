import { stageNames } from "../constants";

export type DevelopmentPlan = {
  reference: string;
  name: string;
  description: string;
  developmentPlanType: string;
  periodStartDate: Date;
  periodEndDate: Date;
  developmentPlanGeography: string;
  documentationUrl: string;
  adoptedDate: Date;
  organisations: string[];
  entryDate: Date;
  startDate: Date;
  endDate: Date;
  timetableEvents: DevelopmentPlanTimetable[];
};

export type DevelopmentPlanTimetable = {
  reference: string;
  name: string;
  developmentPlan: string;
  developmentPlanEvent: string;
  eventDate: string;
  notes: string;
  organisation: string;
  entryDate: string;
  startDate: string;
  endDate?: string;
};

export type StageName = (typeof stageNames)[number];

export type Stages = {
  [key in StageName]: string;
};

export type FormData = {
  LPA: string;
  stages: Stages;
};
