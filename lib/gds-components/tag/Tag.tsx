/**
 * GDS component: https://design-system.service.gov.uk/components/tag/
 */

export type TagLabel = "In Progress" | "Finished" | "Not Started";

type TagProps = {
  label: TagLabel;
};

export const Tag = ({ label }: TagProps): JSX.Element => {
  const colour = {
    Finished: "green",
    "In Progress": "light-blue",
    "Not Started": "grey",
  }[label];

  return <strong className={`govuk-tag govuk-tag--${colour}`}>{label}</strong>;
};
