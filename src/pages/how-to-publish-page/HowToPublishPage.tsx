import { Link } from "react-router-dom";

import { PageRoute } from "../../routes/routes";
import { NavPageWrapper } from "../nav-page-wrapper/NavPageWrapper";

export const HowToPublishPage = () => (
  <NavPageWrapper pageTitle="How to publish a Local Plan timetable online">
    <p className="govuk-body">
      The guidance is for Local Planning Authorities to create and publish a
      standardised Local Plan timetable online.
    </p>
    <p className="govuk-body">
      We’ve created an online form to help make it quicker and easier to publish
      a timetable. We recommend publishing your timetable at the same time
      you’re preparing to publish your Local Development Scheme (LDS).
    </p>
    <p className="govuk-body">Using the online form:</p>
    <ul className="govuk-list govuk-list--bullet">
      <li>
        gives a consistent structure, reducing the amount of data you’ll need to
        include
      </li>
      <li>makes it quicker and easier to update timescales</li>
      <li>
        will automatically show if stages within the timetable are ‘not
        started’, ‘in progress’ or ‘finished’, based on the dates you enter
      </li>
      <li>is clearer and more accessible for citizens</li>
    </ul>

    <h2 className="govuk-heading-m">Why this is important</h2>
    <p className="govuk-body">
      Each Local Planning Authority must publish their own Local Plan timetable.
      It is also responsible for keeping it up-to-date.
    </p>
    <p className="govuk-body">
      Understanding the status of a Local Plan gives confidence to developers
      and planning professionals. It also gives clarity to citizens. For
      example, being able to see when they can give their views and take part in
      consultations on the plan. Publishing your timetable with accurate
      information can also help reduce requests for status updates, saving time
      and resources.
    </p>

    <h2 className="govuk-heading-m">
      How to publish the timetable using the online form
    </h2>
    <p className="govuk-body">
      Follow these steps to publish the timetable online.
    </p>

    <h3 className="govuk-heading-s">Before you start</h3>
    <p className="govuk-body">
      View the{" "}
      <Link className="govuk-link" to={PageRoute.Root}>
        online form you’ll use to create your timetable
      </Link>
      .
    </p>
    <p className="govuk-body">
      Before you fill out the form, consider who else you might need to speak to
      be able to give accurate timescales. You’ll need to give{" "}
      <strong>start and end dates</strong> (months and years) for key stages.
    </p>
    <div className="govuk-inset-text">
      If you do not know the exact dates when filling out the form, we’ll ask
      you to give predicted timescales for key stages
    </div>
    <p className="govuk-body">The stages you’ll need to complete are:</p>
    <ul className="govuk-list govuk-list--bullet">
      <li>Publication - the publish date for the Local Development Scheme</li>
      <li>
        Public consultation - start and end dates for the first consultation
        phase (Regulation 18), where residents can give feedback
      </li>
      <li>
        Draft plan is published - start and end dates for the second
        consultation phase (Regulation 19) , before the plan is evaluated
      </li>
      <li>
        Submission - the date the plan is submitted to the Planning Inspectorate
      </li>
      <li>
        Independent examination - start and end dates for when the Planning
        Inspectorate will carry out an independent examination
      </li>
      <li>Adoption - the date the plan is adopted</li>
    </ul>

    <h3 className="govuk-heading-s">
      Have early conversations to help with publishing your timetable
    </h3>
    <p className="govuk-body">
      If you do not have permission to publish on your organisation’s website,
      you’ll need to speak to colleagues who can. This is so you’ll be able to
      publish your timetable later on.
    </p>
    <p className="govuk-body">For example, this could be:</p>
    <ul className="govuk-list govuk-list--bullet">
      <li>a website manager</li>
      <li>content editor</li>
      <li>someone in a technical role, such as a developer</li>
    </ul>
    <p className="govuk-body">
      This colleague will need to have the right permissions be able to access
      and make changes to your website’s code.
    </p>
    <p className="govuk-body">
      Share the specialist guidance with them:{" "}
      <Link className="govuk-link" to="#" /* TODO: Add link when page exists */>
        Publishing a local plan timetable online: guidance for web teams
      </Link>
      .
    </p>
    <p className="govuk-body">
      It’s also a good idea to give them as much notice as possible, so they can
      work with you to schedule publication around other website priorities.
      Agree a publication date and how you’ll work together to publish.
    </p>

    <h3 className="govuk-heading-s">
      Use the online form to create the timetable
    </h3>
    <p className="govuk-body">
      Follow the steps and additional information in the form.
    </p>
    <p className="govuk-body">
      Remember to complete dates for each stage <strong>accurately</strong>. The
      online form will use the dates entered to show users progress updates for
      key stages. For example, stages which are ‘in progress’.
    </p>
    <p className="govuk-body">
      You can use the preview function in the form to check your answers and how
      each of the stages is displayed, including progress made.
    </p>

    <h3 className="govuk-heading-s">Export the timetable files</h3>
    <p className="govuk-body">
      You’ll need to export your timetable once you’ve completed the online
      form.
    </p>
    <p className="govuk-body">
      When you have completed all the details, you’ll need to export your data
      as CSV files. You can use these files to generate the timetable on your
      website.
    </p>
    <p className="govuk-body">
      This includes the ‘Timetable’ file which includes the data you’ve entered
      for each stage of the timetable <strong>and</strong> the ‘Development
      plan’ file which includes any additional information and descriptions
      you’ve entered. You’ll need to export both of these files to be able to
      publish the timetable. You’ll also need these files to be able to{" "}
      <Link className="govuk-link" to="#" /* TODO: Add link when page exists */>
        update a timetable
      </Link>
      .
    </p>
    <p className="govuk-body">
      You can{" "}
      <a
        className="govuk-link"
        href="https://www.gov.uk/guidance/using-csv-file-format"
      >
        read more about using CSV files on GOV.UK
      </a>
      .
    </p>

    <h3 className="govuk-heading-s">Publish the timetable</h3>
    <p className="govuk-body">
      If you have a team who manages content on your organisation’s website,
      you’ll need to share the CSV files with them. The content editor,
      developer or colleague in a similar role should then follow the steps in
      the guidance:{" "}
      <Link className="govuk-link" to="#" /* TODO: Add link when page exists */>
        Publishing a local plan timetable online: guidance for web teams
      </Link>
      .
    </p>
    <p className="govuk-body">
      You’ll need access to your organisation’s website to be able to publish
      the timetable. If you can do this yourself, follow the same steps in the
      publishing guidance.
    </p>
  </NavPageWrapper>
);
