import { Visualisation } from "@lib/main";
import { NavPageWrapper } from "../nav-page-wrapper/NavPageWrapper";

export const VisualisationExamplePage = (): JSX.Element => {
  return (
    <NavPageWrapper pageTitle="What a Local Plan timetable created online looks like">
      <p className="govuk-body">
        This is an <strong>example</strong> of what a timetable created using
        the online form will look like on a webpage.
      </p>
      <Visualisation
        developmentPlanFilepath={
          "https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/example-development-plan.csv"
        }
        timetableEventsFilepath={
          "https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/example-timetable.csv"
        }
      />
    </NavPageWrapper>
  );
};
