import { useLocation, useNavigate } from "react-router-dom";
import { PageRoute } from "../routes/routes";
import { stages } from "./stages";

const sequence = [
  PageRoute.LPA,
  PageRoute.Title,
  PageRoute.Description,
  PageRoute.PublishLocalDevelopmentScheme,
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
