/**
 * GDS component: https://design-system.service.gov.uk/components/tag/
 */

export type TagLabel = "In progress" | "Finished" | "Not started";

type TagProps = {
  label: TagLabel;
};

export const Tag = ({ label }: TagProps): JSX.Element => {
  const colour = {
    Finished: "green",
    "In progress": "light-blue",
    "Not started": "grey",
  }[label];

  return <strong className={`govuk-tag govuk-tag--${colour}`}>{label}</strong>;
};
