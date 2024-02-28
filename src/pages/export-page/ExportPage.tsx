import { useMemo } from "react";
import { Link } from "react-router-dom";

import { Button } from "@lib/gds-components";
import {
  resolveDevelopmentPlanCSV,
  resolveTimetableEventsCSV,
} from "@lib/utils/timetable";
import { DevelopmentPlanTimetable } from "@lib/types/timetable";
import { PlanViewer } from "@lib/timetable-visualisation/PlanViewer";
import { useFormContext } from "../../context/use-form-context";

export const ExportPage = () => {
  const {
    developmentPlan,
    loadedDevelopmentPlan,
    timetableEvents,
    loadedTimetableEvents,
    statusChangeEvent,
  } = useFormContext();

  const developmentPlanDownloadLink = useMemo(() => {
    const timetableCSV = resolveDevelopmentPlanCSV(
      developmentPlan,
      loadedDevelopmentPlan
    );

    return `data:text/csv;charset=urf-8,${timetableCSV}`;
  }, [developmentPlan, loadedDevelopmentPlan]);

  const timetableEventsDownloadLink = useMemo(() => {
    const timetableCSV = resolveTimetableEventsCSV(
      statusChangeEvent
        ? [...timetableEvents, statusChangeEvent as DevelopmentPlanTimetable]
        : timetableEvents,
      loadedTimetableEvents
    );

    return `data:text/csv;charset=urf-8,${timetableCSV}`;
  }, [statusChangeEvent, timetableEvents, loadedTimetableEvents]);

  return (
    <>
      <h1 className="govuk-heading-xl govuk-!-margin-top-6">
        Export your timetable
      </h1>

      <p className="govuk-body">
        When you have completed all the details, you’ll need to export your data
        as CSV files. You can use these files to generate the timetable on your
        website.
      </p>

      <p className="govuk-body">
        <strong>Step 1</strong>
      </p>

      <p className="govuk-body">
        You need to export <strong>both</strong> CSV files.
      </p>

      <p className="govuk-body">
        <strong>Step 2</strong>
      </p>

      <p className="govuk-body">
        Next, you’ll need to follow the guidance which explains how to use the
        CSV files you’ve just downloaded to publish the timetable on your
        website:{" "}
        <Link
          className="govuk-link"
          to="#" /* Replace with path to real page once it's been created */
        >
          Publishing a local plan timetable online: guidance for web teams
        </Link>
      </p>

      <div>
        <a
          role="button"
          type="button"
          data-testid="csv-download-button"
          href={timetableEventsDownloadLink}
          download="timetable.csv"
        >
          <Button>Export timetable CSV</Button>
        </a>
      </div>

      <div>
        <a
          role="button"
          type="button"
          href={developmentPlanDownloadLink}
          download="development-plan.csv"
        >
          <Button>Export development plan CSV</Button>
        </a>
      </div>

      <h2 className="govuk-heading-l govuk-!-margin-top-6">
        Preview your timetable
      </h2>

      <p className="govuk-body">
        You can use this page to preview timetable and check the data you’ve
        entered. This is how the timetable will be displayed on your website.
      </p>

      <p className="govuk-body">
        Rembmer to check the <strong>progress labels</strong> next to each stage
        are accurate. These are calculated automatically base on the dates
        you’ve entered. For example, if a stage is ‘not started’, ‘in progress’,
        or ‘finished’.
      </p>

      <p className="govuk-body">
        Use the back button to make any changes before exporting.
      </p>

      <PlanViewer
        developmentPlan={developmentPlan}
        timetableEvents={
          statusChangeEvent
            ? [
                ...timetableEvents,
                statusChangeEvent as DevelopmentPlanTimetable,
              ]
            : timetableEvents
        }
      />
    </>
  );
};
