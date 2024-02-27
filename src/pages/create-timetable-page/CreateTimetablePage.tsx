import { Button } from "@lib/gds-components";
import { Link } from "react-router-dom";
import { PageRoute } from "../../routes/routes";
import styles from "./create-timetable.module.css";

export const CreateTimetablePage = () => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-third">
        <nav
          className={`${styles.appSubnav}`}
          aria-labelledby="app-subnav-heading"
        >
          <ul className={`${styles.appSubnavSection}`}>
            <li className={`${styles.appSubnavSectionItem}`}>
              Create or update a Local Plan timetable
            </li>
            <li className={`${styles.appSubnavSectionItem}`}>
              <Link
                className={`${styles.appSubnavLink} govuk-link  govuk-link--no-underline`}
                to="#"
                aria-current="page"
              >
                Create or update a Local Plan timetable
              </Link>
            </li>
            <li className={`${styles.appSubnavSectionItem}`}>
              <Link
                className={`${styles.appSubnavLink} govuk-link  govuk-link--no-underline`}
                to="#"
                aria-current="page"
              >
                How to publish a Local Plan timetable online
              </Link>
            </li>
            <li className={`${styles.appSubnavSectionItem}`}>
              <Link
                className={`${styles.appSubnavLink} govuk-link  govuk-link--no-underline`}
                to="#"
                aria-current="page"
              >
                How to update a Local Plan timetable online
              </Link>
            </li>
            <li className={`${styles.appSubnavSectionItem}`}>
              <Link
                className={`${styles.appSubnavLink} govuk-link  govuk-link--no-underline`}
                to="#"
                aria-current="page"
              >
                Publishing a local plan timetable online: guidance for web teams
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-xl">
          Create or update a Local Plan timetable
        </h1>
        <p className="govuk-body">
          Use this online form if you work in a Local Planning Authority and
          need tocreate a new Local Plan timetable or update an existing one.
        </p>
        <p className="govuk-body"> You can use this online form to:</p>
        <ul className="govuk-list govuk-list--bullet">
          <li>
            create an accessible, online timetable to publish on your
            organisation’s website
          </li>
          <li>make progress updates for key stages of your existing plan</li>
          <li>
            add or make changes to dates in your existing plan. For example,
            once examination dates are confirmed
          </li>
          <li>
            tell us if the status of your plan has changed. For example, if the
            plan has been withdrawn
          </li>
        </ul>
        <div>
          <Link to={PageRoute.LPA}>
            <Button>Start a new timetable</Button>
          </Link>
        </div>
        <div>
          <Link to={PageRoute.UploadTimetable}>
            <Button>Upload and edit an existing timetable CSV</Button>
          </Link>
        </div>
        <h2 className="govuk-heading-m">Before you start</h2>
        <p className="govuk-body">
          Read our guidance on{" "}
          <Link className="govuk-link" to="#">
            How to publish a Local Plan online
          </Link>
        </p>
        <p className="govuk-body">
          Before you fill out the form, consider who else you might need to
          speak to be able to give accurate timescales. You’ll need to give
          <b> start and end</b> dates (months and years) for key stages of the
          local plan.
        </p>
        <p className="govuk-body">
          Based on the dates you enter, the online form will automatically show
          if a stage is ‘not started’, ‘in progress’ or ‘finished’.
        </p>
      </div>
    </div>
  );
};
