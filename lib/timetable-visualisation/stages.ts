import { TimetableEventKey } from "../constants";

export type Stage = {
  title: string;
  startEventKey: TimetableEventKey;
  endEventKey?: TimetableEventKey;
};

export const stages: Stage[] = [
  {
    title: "Public consultation stage",
    startEventKey: TimetableEventKey.PublicConsultationStart,
    endEventKey: TimetableEventKey.PublicConsultationEnd,
  },
  {
    title: "Publication stage",
    startEventKey: TimetableEventKey.PublicationStart,
    endEventKey: TimetableEventKey.PublicationEnd,
  },
  {
    title: "Submission stage",
    startEventKey: TimetableEventKey.PlanSubmittedForExamination,
  },
  {
    title: "Independent examination stage",
    startEventKey: TimetableEventKey.ExaminationHearingStart,
    endEventKey: TimetableEventKey.ExaminationHearingEnd,
  },
  {
    title: "Plan adopted",
    startEventKey: TimetableEventKey.PlanAdopted,
  },
];
