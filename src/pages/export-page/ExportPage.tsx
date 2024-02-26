import { Button } from "@lib/gds-components";
import { Link } from "react-router-dom";
import cn from "classnames";

import styles from "./ExportPage.module.css";

export const ExportPage = () => {
  return (
    <>
      <h1 className="govuk-heading-l govuk-!-margin-top-6">
        Export your timetable
      </h1>

      <p className="govuk-body">
        When you have completed all the details, you'll need to export your data
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
        Next, you'll need to follow the guidance which explains how to use the
        CSV files you've just downloaded to publish the timetable on your
        website:{" "}
        <Link
          to="#" /* Replace with path to real page once it's been created */
        >
          Publishing a local plan timetable online: guidance for web teams
        </Link>
      </p>

      <p className={cn("govuk-body", styles.exportButtonContainer)}>
        <Button>Export timetable CSV</Button>
      </p>

      <p className={cn("govuk-body", styles.exportButtonContainer)}>
        <Button>Export development plan CSV</Button>
      </p>

      <h2 className="govuk-heading-m govuk-!-margin-top-6">
        Preview your timetable
      </h2>

      <p className="govuk-body">
        You can use this page to preview timetable and check the data you've
        entered. This is how the timetable will be displayed on your website.
      </p>

      <p className="govuk-body">
        Rembmer to check the <strong>progress labels</strong> next to each stage
        are accurate. These are calculated automatically base on the dates
        you've entered. For example, if a stage is 'not started', 'in progress',
        or 'finished'.
      </p>

      <p className="govuk-body">
        Use the back button to make any changes before exporting.
      </p>
    </>
  );
};
