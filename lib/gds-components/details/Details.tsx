/**
 * GDS component: https://design-system.service.gov.uk/components/details/
 */

type DetailsProps = {
  summary: string;
  text: string;
};

export const Details = ({ summary, text }: DetailsProps): JSX.Element => {
  return (
    <details className="govuk-details govuk-!-padding-0 govuk-!-margin-bottom-2">
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">{summary}</span>
      </summary>
      <div className="govuk-details__text">{text}</div>
    </details>
  );
};
