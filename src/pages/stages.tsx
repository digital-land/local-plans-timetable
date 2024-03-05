import { TimetableEventKey } from "@lib/constants";
import { PageRoute } from "../routes/routes";
import { StagePageProps } from "./stage-page/StagePage";

export type Stage = StagePageProps & {
  key: PageRoute;
};

export const stages: Stage[] = [
  {
    key: PageRoute.PublicConsultation,
    title: "Public consultation stage",
    description: (
      <p className="govuk-body">
        Regulation 18 consultation, also known as issues and options.
        <br />
        You can read more about the{" "}
        <a
          href="https://www.legislation.gov.uk/uksi/2012/767/regulation/18"
          className="govuk-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          requirements for Regulation 18 on <br />
          legislation.gov.uk (opens in new tab)
        </a>
      </p>
    ),
    startEventKey: TimetableEventKey.PublicConsultationStart,
    endEventKey: TimetableEventKey.PublicConsultationEnd,
  },
  {
    key: PageRoute.Publication,
    title: "Publication stage",
    description: (
      <p className="govuk-body">
        Regulation 19 consultation.
        <br />
        You can read more about the{" "}
        <a
          href="https://www.legislation.gov.uk/uksi/2012/767/regulation/19"
          className="govuk-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          requirements for Regulation 19 on <br />
          legislation.gov.uk (opens in new tab)
        </a>
      </p>
    ),
    startEventKey: TimetableEventKey.PublicationStart,
    endEventKey: TimetableEventKey.PublicationEnd,
  },
  {
    key: PageRoute.Submission,
    title: "Submission stage",
    description: (
      <p className="govuk-body">
        The date the plan is submitted to the Planning Inspectorate
        <div className="govuk-inset-text">
          If you do not know the exact dates tell us predicted timescales.
          <br />
          You’ll need to update this form once a date is confirmed.
        </div>
      </p>
    ),
    startEventKey: TimetableEventKey.PlanSubmittedForExamination,
  },
  {
    key: PageRoute.IndependentExamination,
    title: "Independent examination stage",
    description: (
      <p className="govuk-body">
        Local Plan examination hearing dates set by the Planning Inspectorate
        <div className="govuk-inset-text">
          If you do not know the exact dates tell us predicted timescales.
          <br />
          You’ll need to update this form once examination dates are
          <br />
          confirmed. Usually, this phase takes around 6 months
        </div>
      </p>
    ),
    startEventKey: TimetableEventKey.ExaminationHearingStart,
    endEventKey: TimetableEventKey.ExaminationHearingEnd,
  },
  {
    key: PageRoute.PlanAdopted,
    title: "Plan adopted",
    description: (
      <p className="govuk-body">
        Date the plan is adopted and will inform development in the area
        <div className="govuk-inset-text">
          If you do not know the exact dates tell us predicted timescales.
          <br />
          You’ll need to update this form once the plan is adopted.
        </div>
      </p>
    ),
    startEventKey: TimetableEventKey.PlanAdopted,
  },
];
