import { useState } from "react";

import { Button, ErrorSummary, TextArea } from "../../gds-components";

import styles from "../styles.module.css";
import { useValidation } from "../useValidation";

export const DescriptionPage = (): JSX.Element => {
  const [description, setDescription] = useState<string>("");

  const { errors, validateDevelopmentPlanDescription } = useValidation();

  const handleValidate = () => {
    validateDevelopmentPlanDescription({ description: description });
  };

  return (
    <div>
      <div className={styles.form}>
        <a href="#" className="govuk-back-link">
          Back
        </a>
        <h1 className="govuk-heading-l govuk-!-margin-top-6">
          Local Plan description
          <span className="govuk-caption-m govuk-!-margin-top-3">
            Keep this specific to your own Local Plan
          </span>
        </h1>
        <ErrorSummary errors={errors} />
        <TextArea
          label="Description"
          onChange={setDescription}
          value={description}
          hint="You can enter up to 400 characters"
          showLabel={false}
        />
        <Button onClick={handleValidate}>Continue</Button>
      </div>
    </div>
  );
};
