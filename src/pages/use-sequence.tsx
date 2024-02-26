import { useLocation, useNavigate } from "react-router-dom";
import { PageRoute } from "../routes/routes";
import { StagePageProps } from "./stage-page/StagePage";

export type Stage = StagePageProps & {
  key: PageRoute;
};
export const stages: Stage[] = [
  {
    key: PageRoute.PublicConsultation,
    title: "Public Consultation",
    description: (
      <p className="govuk-body">
        Regulation 18 consultation, also known as issues and options.
        <br />
        You can read more about the{" "}
        <a href="#" className="govuk-link">
          requirements for Regulation 18 on <br />
          legislation.gov.uk (opens in new tab)
        </a>
      </p>
    ),
    startEventKey: "public-consultation-start",
    endEventKey: "public-consultation-end",
  },
  {
    key: PageRoute.Submission,
    title: "Submission",
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
    startEventKey: "submit-plan-for-examination",
  },
];

const sequence = [
  PageRoute.LPA,
  PageRoute.Title,
  PageRoute.Description,
  ...stages.map((stage) => stage.key),
];

export const useSequence = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation() as { pathname: PageRoute };

  const currentPageIndex = sequence.indexOf(pathname);

  const navigateNext = () => {
    navigate(sequence[currentPageIndex + 1]);
  };

  const previousPage =
    currentPageIndex > 0 ? sequence[currentPageIndex - 1] : PageRoute.Root;

  return {
    previousPage,
    navigateNext:
      currentPageIndex < sequence.length - 1 ? navigateNext : undefined,
  };
};
