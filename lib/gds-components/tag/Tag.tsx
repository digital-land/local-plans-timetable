/**
 * GDS component: https://design-system.service.gov.uk/components/tag/
 */

export type TagProps = {
  label: "IN PROGRESS" | "FINISHED" | "NOT STARTED";
};

export const Tag = ({ label }: TagProps): JSX.Element => {
  const colour = {
    "IN PROGRESS": "blue",
    FINISHED: "green",
    "NOT STARTED": "grey",
  }[label];

  return (
    <strong
      className={`govuk-tag govuk-tag--${colour} govuk-!-font-weight-bold`}
    >
      {label}
    </strong>
  );
};
