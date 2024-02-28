import { useLocation, useNavigate } from "react-router-dom";
import { PageRoute, Journeys } from "../routes/routes";
import { stages } from "./stages";

const createFlowSequence = [
  PageRoute.LPA,
  PageRoute.Title,
  PageRoute.Description,
  PageRoute.PublishLocalDevelopmentScheme,
  ...stages.map((stage) => stage.key),
  PageRoute.Export,
];

const editFlowSequence = [
  PageRoute.UploadTimetable,
  PageRoute.LPA,
  PageRoute.Title,
  PageRoute.Description,
  // missing pages
  PageRoute.PublishLocalDevelopmentScheme,
  ...stages.map((stage) => stage.key),
  PageRoute.Export,
];

export const useSequence = (userJourney: Journeys) => {
  const navigate = useNavigate();
  const { pathname } = useLocation() as { pathname: PageRoute };

  const sequence =
    userJourney == Journeys.Create ? createFlowSequence : editFlowSequence;

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
