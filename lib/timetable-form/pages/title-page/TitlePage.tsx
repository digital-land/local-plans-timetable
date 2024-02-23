import { useState } from "react";

import { Button, ErrorSummary, TextInput } from "../../../gds-components";

import styles from "../../styles.module.css";
import { useValidation } from "./useTitlePageValidation";

export const TitlePage = (): JSX.Element => {
  const [name, setName] = useState<string>("");

  const { errors, validateDevelopmentPlanName } = useValidation();

  const handleValidate = () => {
    validateDevelopmentPlanName({ name: name });
  };

  return (
    <div>
      <div className={styles.form}>
        <a href="#" className="govuk-back-link">
          Back
        </a>
        <h1 className="govuk-heading-l govuk-!-margin-top-6">
          Title of the Local Plan
          <span className="govuk-caption-m govuk-!-margin-top-3">
            For example, Birmingham Local Plan
          </span>
        </h1>
        <ErrorSummary errors={errors} />
        <TextInput
          onChange={setName}
          value={name}
          hint="You can enter up to 100 characters"
        />
        <Button onClick={handleValidate}>Continue</Button>
      </div>
    </div>
  );
};
