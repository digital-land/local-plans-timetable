import { Button } from "@lib/gds-components";
import {
  DEFAULT_DEVELOPMENT_PLAN,
  DEFAULT_TIMETABLE_EVENTS,
} from "@lib/constants";
import { Link } from "react-router-dom";
import { PageRoute, Journey } from "../../routes/routes";
import { useFormContext } from "../../context/use-form-context";
import { useEffect } from "react";
import { NavPageWrapper } from "../nav-page-wrapper/NavPageWrapper";

export const CreateTimetablePage = () => {
  const {
    setTimetableEvents,
    setDevelopmentPlan,
    setLoadedTimetableEvents,
    setLoadedDevelopmentPlan,
    setUserFlow,
    setStatusHasChanged,
  } = useFormContext();

  useEffect(() => {
    setTimetableEvents(DEFAULT_TIMETABLE_EVENTS);
    setDevelopmentPlan(DEFAULT_DEVELOPMENT_PLAN);
    setLoadedTimetableEvents(null);
    setLoadedDevelopmentPlan(null);
    setStatusHasChanged(null);
  }, [
    setDevelopmentPlan,
    setLoadedDevelopmentPlan,
    setLoadedTimetableEvents,
    setStatusHasChanged,
    setTimetableEvents,
  ]);

  return (
    <NavPageWrapper pageTitle="Create or update a Local Plan timetable">
      <p className="govuk-body">
        Use this online form if you work in a Local Planning Authority and need
        tocreate a new Local Plan timetable or update an existing one.
      </p>
      <p className="govuk-body"> You can use this online form to:</p>
      <ul className="govuk-list govuk-list--bullet">
        <li>
          create an accessible, online timetable to publish on your
          organisation’s website
        </li>
        <li>make progress updates for key stages of your existing plan</li>
        <li>
          add or make changes to dates in your existing plan. For example, once
          examination dates are confirmed
        </li>
        <li>
          tell us if the status of your plan has changed. For example, if the
          plan has been withdrawn
        </li>
      </ul>
      <div>
        <Link to={PageRoute.LPA} onClick={() => setUserFlow(Journey.Create)}>
          <Button>Start a new timetable</Button>
        </Link>
      </div>
      <div>
        <Link
          to={PageRoute.UploadTimetable}
          onClick={() => setUserFlow(Journey.Update)}
        >
          <Button>Upload and edit an existing timetable CSV</Button>
        </Link>
      </div>
      <h2 className="govuk-heading-m">Before you start</h2>
      <p className="govuk-body">
        Read our guidance on{" "}
        <Link className="govuk-link" to={PageRoute.HowToPublish}>
          How to publish a Local Plan online
        </Link>
      </p>
      <p className="govuk-body">
        Before you fill out the form, consider who else you might need to speak
        to be able to give accurate timescales. You’ll need to give
        <b> start and end</b> dates (months and years) for key stages of the
        local plan.
      </p>
      <p className="govuk-body">
        Based on the dates you enter, the online form will automatically show if
        a stage is ‘not started’, ‘in progress’ or ‘finished’.
      </p>
    </NavPageWrapper>
  );
};
