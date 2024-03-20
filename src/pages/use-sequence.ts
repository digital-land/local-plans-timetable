import { useLocation, useNavigate } from "react-router-dom";
import { PageRoute, Journey } from "../routes/routes";
import { stages } from "./stages";
import { useMemo } from "react";

const routesOnCondition = (condition: boolean, ...routes: PageRoute[]) =>
  condition ? routes : [];

const getSequence = (
  userJourney: Journey | null,
  timetableStatusHasChanged: boolean,
  shouldUpdateDates: boolean
) => {
  if (!userJourney) {
    return [];
  }

  return [
    ...routesOnCondition(
      userJourney === Journey.Update,
      PageRoute.UploadTimetable
    ),
    PageRoute.LPA,
    PageRoute.Title,
    PageRoute.Description,
    ...routesOnCondition(
      userJourney === Journey.Update,
      PageRoute.UpdateTimetableStatus
    ),
    ...routesOnCondition(
      userJourney === Journey.Update && !!timetableStatusHasChanged,
      PageRoute.StatusChangeEvent
    ),
    ...routesOnCondition(userJourney === Journey.Update, PageRoute.UpdateDates),
    ...routesOnCondition(
      userJourney === Journey.Create || shouldUpdateDates,
      PageRoute.PublishLocalDevelopmentScheme,
      ...stages.map((stage) => stage.key)
    ),
    PageRoute.Export,
  ];
};

export const useSequence = (
  userJourney: Journey | null,
  timetableStatusHasChanged: boolean,
  shouldUpdateDates: boolean
) => {
  const navigate = useNavigate();
  const { pathname } = useLocation() as { pathname: PageRoute };

  const sequence = useMemo(
    () =>
      getSequence(userJourney, timetableStatusHasChanged, shouldUpdateDates),
    [userJourney, timetableStatusHasChanged, shouldUpdateDates]
  );

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
