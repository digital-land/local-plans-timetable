/**
 * GDS component: https://design-system.service.gov.uk/components/tag/
 */

import { useMemo } from "react";

export type TagProps = {
  label: string;
};

export const Tag = ({ label }: TagProps): JSX.Element => {
  const color = useMemo(() => {
    switch (label) {
      case "IN PROGRESS":
        return "blue";
      case "FINISHED":
        return "green";
      case "NOT STARTED":
        return "grey";
    }
  }, [label]);

  return (
    <strong
      className={`govuk-tag govuk-tag--${color} govuk-!-font-weight-bold`}
    >
      {label}
    </strong>
  );
};
