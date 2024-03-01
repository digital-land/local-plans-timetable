import { TimetableEventKey } from "@lib/constants";

export type Stage = {
  title: string;
  startEventKey: TimetableEventKey;
  endEventKey?: TimetableEventKey;
};

export const stages: Stage[] = [
  {
    title: "Public consultation stage",
    startEventKey: "public-consultation-start",
    endEventKey: "public-consultation-end",
  },
  {
    title: "Publication stage",
    startEventKey: "publication-start",
    endEventKey: "publication-end",
  },
  {
    title: "Submission stage",
    startEventKey: "plan-submitted-for-examination",
  },
  {
    title: "Independent examination stage",
    startEventKey: "examination-hearing-start",
    endEventKey: "examination-hearing-end",
  },
  {
    title: "Plan adopted",
    startEventKey: "plan-adopted",
  },
];
