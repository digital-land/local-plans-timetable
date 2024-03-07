import { Link } from "react-router-dom";
import { NavPageWrapper } from "../nav-page-wrapper/NavPageWrapper";
import { PageRoute } from "../../routes/routes";

export const HowToUpdatePage = () => (
  <NavPageWrapper pageTitle="How to update a Local Plan timetable online">
    <p className="govuk-body">
      It's important to keep the timetable up to date.
    </p>
    <p className="govuk-body">You'll need to use the online form to tell us:</p>

    <ul className="govuk-list govuk-list--bullet">
      <li>if the timescales for certain stages need to change</li>
      <li>
        if you need to add dates, for example, once examination dates are
        confirmed
      </li>
      <li>if the status of the local plan changes</li>
    </ul>

    <p className="govuk-body">
      You can read more about the requirements around updating the timetable in
      the{" "}
      <Link
        className="govuk-link"
        to="https://www.legislation.gov.uk/ukpga/2004/5/section/15"
        target="_blank"
      >
        Planning and Compulsory Purchase Act 2004, Section 15 Regulation 18 on
        legislation.gov.uk (opens in new tab)
      </Link>
      .
    </p>

    <h2 className="govuk-heading-m">How to update the timetable</h2>

    <p className="govuk-body">
      You can use the{" "}
      <Link className="govuk-link" to={PageRoute.Root}>
        online timetable form
      </Link>{" "}
      to make updates. You’ll need to upload <strong>both</strong> CSV files,
      the ‘Timetable’ CSV and ‘Development plan’ CSV file. You’ll then be able
      to make your changes. For example, change or edit the dates for a
      particular stage.
    </p>

    <p className="govuk-body">
      If you need to locate these files, you can find them in the folder where
      you originally saved them within your organisation’s website when you
      first published the timetable.
    </p>

    <p className="govuk-body">
      You’ll need to re-upload the relevant files in order for the changes to
      show on your website. Follow the updating section of the{" "}
      <Link
        className="govuk-link"
        to="#"
        /*todo this needs to link to the Publishing a local plan timetable online: guidance for web teams page, nott created yet */
      >
        Publishing a local plan timetable online: guidance for web teams
      </Link>
      .
    </p>

    <h2 className="govuk-heading-m">If the status of the Local Plan changes</h2>

    <p className="govuk-body">
      You <strong>must</strong> update your timetable if the status of the plan
      changes.
    </p>

    <p className="govuk-body">For example, if:</p>

    <ul className="govuk-list govuk-list--bullet">
      <li>the plan is paused</li>
      <li>the plan is withdrawn</li>
      <li>
        the plan is judged to be ‘unsound or legally non-compliant’ by the
        Planning Inspectorate
      </li>
      <li>council members do not vote to adopt the plan</li>
    </ul>

    <p className="govuk-body">
      You can change the status of the plan within the online form. It’s
      important to do so as soon as possible so residents and stakeholders are
      aware of any changes.
    </p>

    <h2 className="govuk-heading-m">If it’s a joint local plan</h2>

    <p className="govuk-body">
      Each Local Planning Authority will need to publish their own local plan on
      their organisation’s website. You must also ensure the plan is kept up to
      date, including if the status of the plan changes.
    </p>
  </NavPageWrapper>
);
