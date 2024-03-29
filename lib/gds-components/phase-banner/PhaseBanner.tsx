/**
 * GDS component: https://design-system.service.gov.uk/components/phase-banner/
 */

export const PhaseBanner = () => {
  return (
    <>
      <div className="govuk-phase-banner">
        <p className="govuk-phase-banner__content">
          <strong className="govuk-tag govuk-phase-banner__content__tag">
            Prototype
          </strong>
          <span className="govuk-phase-banner__text">
            This is a prototype.
          </span>
        </p>
      </div>
    </>
  );
};
