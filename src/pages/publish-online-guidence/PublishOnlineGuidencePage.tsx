import { Link } from "react-router-dom";
import { NavPageWrapper } from "../nav-page-wrapper/NavPageWrapper";
import { PageRoute } from "../../routes/routes";
import { Snippet } from "./Snippet";

export const PublishOnlineGuidencePage = () => (
  <NavPageWrapper pageTitle="Publishing a Local Plan timetable online: guidance for web teams">
    <p className="govuk-body">
      This guidance is for Local Authority{" "}
      <strong>web teams and developers</strong> to publish a standardised Local
      Plan timetable online.
    </p>
    <p className="govuk-body">
      The timetable contains the stages and timeframes for the preparation of a
      Local Plan.
    </p>
    <p className="govuk-body">
      If a colleague has shared this guidance with you, it’s because they’ll
      need your help to be able to publish this content on your organisation’s
      website.
    </p>
    <div className="govuk-inset-text">
      You’ll need to have access and permission to edit the HTML code for the
      page you intend to publish the timetable on.
    </div>
    <h3 className="govuk-heading-m">
      We've made a new online form to help local authorities create a Local Plan
      timetable
    </h3>

    <p className="govuk-body">
      The{" "}
      <Link
        className="govuk-link"
        to="https://www.gov.uk/government/organisations/department-for-levelling-up-housing-and-communities"
        target="_blank"
      >
        Department for Levelling Up, Housing and Communities (DLUHC) (opens in
        new tab)
      </Link>{" "}
      has created an online form. This is to help make it quicker and easier to
      publish a Local Plan timetable.
    </p>

    <p className="govuk-body">
      This online form can be used by all local authorities to:
    </p>

    <ul className="govuk-list govuk-list--bullet">
      <li>
        create consistency in how timetables are presented across local
        authorities
      </li>
      <li>
        automatically show if stages within the timetable are ‘not started’, ‘in
        progress’ or ‘finished’, based on the dates entered
      </li>
      <li>make the information clearer and more accessible for citizens</li>
    </ul>

    <p className="govuk-body">
      We recommend publishing your timetable at the same time you’re preparing
      to publish your Local Development Scheme (LDS).
    </p>

    <h3 className="govuk-heading-m">
      If your colleague has asked for your help to publish
    </h3>

    <p className="govuk-body">
      The online form will be completed by planning officers within your local
      authority. If these colleagues <strong>cannot</strong> make changes to the
      HTML code for your local authority’s website, they’ll need your help to be
      able to publish the timetable online.
    </p>

    <h3 className="govuk-heading-m">
      Why it’s important to publish the timetable
    </h3>

    <p className="govuk-body">
      Each Local Planning Authority must publish their own Local Plan timetable.
      It is also responsible for{" "}
      <Link className="govuk-link" to={PageRoute.HowToUpdate}>
        updating the timetable.
      </Link>{" "}
      For example, if timescales or the status of the plan changes.
    </p>

    <p className="govuk-body">
      You can read more about the legal requirements in the{" "}
      <Link
        className="govuk-link"
        to="https://www.legislation.gov.uk/ukpga/2004/5/section/15"
        target="_blank"
      >
        requirements in the Planning and Compulsory Purchase Act 2004, Section
        15 Regulation 18 on legislation.gov.uk (opens in new tab).
      </Link>
    </p>

    <h3 className="govuk-heading-m">
      Using the online form replaces the need to publish PDFs
    </h3>

    <p className="govuk-body">
      By publishing the timetable as HTML (web content), this will help make the
      timetable easier for users to search, find and use the information.
    </p>

    <p className="govuk-body">
      The online form has also been designed using accessible patterns and
      components, built using the{" "}
      <Link
        className="govuk-link"
        to="https://design-system.service.gov.uk/"
        target="_blank"
      >
        GOV.UK design system (opens in new tab).
      </Link>
    </p>

    <h3 className="govuk-heading-m">What you’ll need to publish and where </h3>

    <p className="govuk-body">
      You will need to publish the timetable on the relevant page of your local
      authority’s website. We recommend publishing the timetable at the same
      time as the Local Development Scheme (LDS).
    </p>

    <h3 className="govuk-heading-m">How to publish</h3>

    <p className="govuk-body">To publish the timetable you will need to:</p>

    <ul className="govuk-list govuk-list--bullet">
      <li>
        add 2 CSV files in a public location within your website file structure
      </li>
      <li>
        import a distributed component by adding a CSS tag and a JavaScript tag
        to a web page
      </li>
    </ul>

    <h3 className="govuk-heading-s">Before you start</h3>

    <p className="govuk-body">
      You’ll need to be confident in making changes to your website’s code
      (HTML). If you’re not, ask a colleague who can help you. This could be
      someone with more coding experience, such as a software developer or IT
      specialist.
    </p>

    <h3 className="govuk-heading-s">
      Step 1: Getting the files you’ll need to publish
    </h3>

    <p className="govuk-body">
      Once your planning officer colleague has completed the timetable online
      form, they will need to export the following files and share them with
      you. Both are in CSV format.
    </p>

    <p className="govuk-body">The 2 files you need are:</p>

    <ul className="govuk-list govuk-list--bullet">
      <li>‘timetable.csv’ </li>
      <li>‘development-plan.csv’</li>
    </ul>

    <h3 className="govuk-heading-s">
      Step 2: Save the files to a public location
    </h3>

    <p className="govuk-body">
      You’ll need to save both files in a location within your website’s file
      structure. For example, this could be in an ‘assets’ folder.
    </p>

    <p className="govuk-body">Both of these are text files (show raw data).</p>

    <h3 className="govuk-heading-s">Step 3: Import the component </h3>

    <p className="govuk-body">
      To be able to use the files, you’ll need to import the component which
      will then visualise the raw data files in a way which is accessible for
      end users.
    </p>

    <p className="govuk-body">The component is made up of 2 pieces of code.</p>

    <h3 className="govuk-heading-s">Bring in both HTML tags</h3>

    <p className="govuk-body">
      The following <strong>CSS tag</strong> will need to go inside the{" "}
      <span style={{ color: "red" }}>&lt;head&gt;</span> section of the web
      page’s HTML code.
    </p>

    <Snippet
      code={`<link rel="stylesheet" type="text/css" href="https://cdn.statically.io/gh/digital-land/local-plans-timetable/master/timetable-visualisation.min.css"/>`}
    />
    <p className="govuk-body">
      The following <strong>JavaScript tag</strong> will need to go inside the{" "}
      <span style={{ color: "red" }}>&lt;body&gt;</span> section of the web
      page’s HTML code.
    </p>

    <Snippet
      code={`<script src="https://cdn.statically.io/gh/digital-land/local-plans-timetable/master/timetable-visualisation.min.js"></script>`}
    />

    <p className="govuk-body">
      The CSS and JavaScript are now available in your website.
    </p>

    <h3 className="govuk-heading-s">Step 4: Call the JavaScript function</h3>

    <p className="govuk-body">
      Now you’ve imported the JavaScript, it has made a function available.
    </p>

    <p className="govuk-body">
      When you call the function, you’ll need to give it the path to the 2 CSV
      files you started the process with:
    </p>

    <ul className="govuk-list govuk-list--bullet">
      <li>‘timetable.csv’ </li>
      <li>‘development-plan.csv’</li>
    </ul>

    <p className="govuk-body">
      You’ll have to give it a HTML element to attach to.
    </p>

    <p className="govuk-body">
      Here’s an example of how to call the function that renders the
      visualisation.
    </p>

    <Snippet
      code={`<script>
  window.DLUHC.renderTimetableVisualisation(
    {
      developmentPlanFilepath:
        "https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/development-plan.csv",
      timetableEventsFilepath:
        "https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/timetable.csv",
    },
    document.getElementById("timetable-visualisation")
  );
</script>`}
    />

    <h3 className="govuk-heading-s">
      An example of the component in a webpage
    </h3>

    <p className="govuk-body">
      Lastly, here is an example of the component being used in a simple
      webpage.
    </p>

    <Snippet
      code={`<html>
  <head>
    <title>My first HTML page</title>
    <link
      rel=”stylesheet”
      type=”text/css”
      href=”https://cdn.statically.io/gh/digital-land/local-plans-timetable/master/timetable-visualisation.min.css”
    />
    <style>
      body {
        font-family: "Courier New", Courier, monospace;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to My Website</h1>
    <p>This is a sample paragraph.</p>
    <div id="timetable-visualisation"></div>
    <script src="https://cdn.statically.io/gh/digital-land/local-plans-timetable/master/timetable-visualisation.min.js"></script>
    <script>
      window.DLUHC.renderTimetableVisualisation(
        {
          developmentPlanFilepath: "https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/development-plan.csv",
          timetableEventsFilepath: "https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/timetable.csv",
        },
        document.getElementById("timetable-visualisation")
      );
    </script>
  </body>
</html>`}
    />

    <h3 className="govuk-heading-s">
      Step 5: Preview the visualisation of the timetable
    </h3>

    <p className="govuk-body">
      Once you’ve followed these steps and deployed the changes to your website,
      you’ll be able to see the visualisation on your webpage.
    </p>

    <p className="govuk-body">
      You can{" "}
      <Link className="govuk-link" to={PageRoute.VisualisationExample}>
        view an example of what the timetable visualisation will look like.
      </Link>
    </p>

    <h3 className="govuk-heading-m">If you need to update the timetable </h3>

    <p className="govuk-body">
      Your colleague who originally filled out the timetable (such as a planning
      officer), will first need to{" "}
      <Link className="govuk-link" to={PageRoute.Root}>
        use the online form to update the timetable details.
      </Link>
    </p>

    <p className="govuk-body">
      Providing the new files are saved in the same location within your
      website’s file structure, and with the same file path, you will not have
      to make any changes to your webpage’s code. Your webpage should now show
      the updated timetable.
    </p>
  </NavPageWrapper>
);
