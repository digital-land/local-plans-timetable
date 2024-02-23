import { useEffect, useState } from "react";

import { Autocomplete } from "@lib/timetable-form/autocomplete/Autocomplete";
import { fetchLPAs } from "../../api";
import { useFormContext } from "../FormContext";

export const LPAPage = (): JSX.Element => {
  const [LPAs, setLPAs] = useState<string[]>([]);

  const { updateDevelopmentPlan } = useFormContext();

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
    <>
      <h1 className="govuk-heading-l govuk-!-margin-top-6">
        What is your Local Authority?
        <span className="govuk-caption-m govuk-!-margin-top-3">
          For example, Birmingham City Council
        </span>
      </h1>
      <Autocomplete
        label=""
        onChange={(value) => updateDevelopmentPlan("organisations", value)}
        source={LPAs}
      />
    </>
  );
};
