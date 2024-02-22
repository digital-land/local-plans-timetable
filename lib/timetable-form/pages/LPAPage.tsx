import { useEffect, useState } from "react";
import { fetchLPAs } from "../../api";
import { Button } from "../../gds-components";
import { Autocomplete } from "../autocomplete/Autocomplete";

import styles from "../styles.module.css";

export const LPAPage = (): JSX.Element => {
  const [LPAs, setLPAs] = useState<string[]>([]);

  const [, setSelectedLPA] = useState<string>("");

  useEffect(() => {
    const loadLpas = async () => {
      try {
        const lpas = await fetchLPAs();
        setLPAs(lpas.entities.map((lpa) => lpa.name));
      } catch (error) {
        console.error(error instanceof Error ? error.message : error);
      }
    };
    loadLpas();
  }, []);

  return (
    <div>
      <div className={styles.form}>
        <a href="#" className="govuk-back-link">
          Back
        </a>
        <h1 className="govuk-heading-l govuk-!-margin-top-6">
          What is your Local Authority?
          <span className="govuk-caption-m govuk-!-margin-top-3">
            For example, Birmingham City Council
          </span>
        </h1>
        <Autocomplete label="" onChange={setSelectedLPA} source={LPAs} />
        <Button>Continue</Button>
      </div>
    </div>
  );
};
