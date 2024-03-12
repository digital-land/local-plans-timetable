import { Link } from "react-router-dom";

import { PageRoute } from "../../routes/routes";
import styles from "./NavPageWrapper.module.css";

interface NavPageWrapperProps {
  children: React.ReactNode;
  pageTitle: string;
}

export const NavPageWrapper = ({
  children,
  pageTitle,
}: NavPageWrapperProps) => (
  <div className="govuk-grid-row govuk-!-margin-top-9">
    <div className="govuk-grid-column-one-third">
      <nav className={styles.appSubnav} aria-labelledby="app-subnav-heading">
        <ul className={styles.appSubnavSection}>
          <li className={styles.appSubnavSectionItem}>
            Create or update a Local Plan timetable
          </li>
          <li className={styles.appSubnavSectionItem}>
            <Link
              className={`${styles.appSubnavLink} govuk-link  govuk-link--no-underline`}
              to={PageRoute.Root}
              aria-current="page"
            >
              Create or update a Local Plan timetable
            </Link>
          </li>
          <li className={styles.appSubnavSectionItem}>
            <Link
              className={`${styles.appSubnavLink} govuk-link  govuk-link--no-underline`}
              to={PageRoute.HowToPublish}
              aria-current="page"
            >
              How to publish a Local Plan timetable online
            </Link>
          </li>
          <li className={styles.appSubnavSectionItem}>
            <Link
              className={`${styles.appSubnavLink} govuk-link  govuk-link--no-underline`}
              to={PageRoute.HowToUpdate}
              aria-current="page"
            >
              How to update a Local Plan timetable online
            </Link>
          </li>
          <li className={styles.appSubnavSectionItem}>
            <Link
              className={`${styles.appSubnavLink} govuk-link  govuk-link--no-underline`}
              to="#"
              aria-current="page"
            >
              Publishing a local plan timetable online: guidance for web teams
            </Link>
          </li>
          <li className={styles.appSubnavSectionItem}>
            <Link
              className={`${styles.appSubnavLink} govuk-link  govuk-link--no-underline`}
              to={PageRoute.VisualisationExample}
              aria-current="page"
            >
              What a Local Plan timetable created online looks like 
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    <div className="govuk-grid-column-two-thirds">
      <h1 className="govuk-heading-l">{pageTitle}</h1>
      {children}
    </div>
  </div>
);
