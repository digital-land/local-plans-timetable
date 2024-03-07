import { useEffect, useState } from "react";

import { ValidationErrorItem } from "joi";

import { Autocomplete } from "@lib/autocomplete/Autocomplete";
import { fetchLPAs } from "../../api";
import { useFormContext } from "../../context/use-form-context";

type LPAPageProps = { errors?: ValidationErrorItem[] };

export const LPAPage = ({ errors }: LPAPageProps): JSX.Element => {
  const [LPAs, setLPAs] = useState<string[]>([]);

  const { developmentPlan, updateDevelopmentPlan } = useFormContext();

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
      <h1 className="govuk-heading-xl govuk-!-margin-top-6">
        What is your Local Authority?
        <span className="govuk-caption-m govuk-!-margin-top-3">
          For example, Birmingham City Council
        </span>
      </h1>
      <Autocomplete
        label=""
        onChange={(value) => updateDevelopmentPlan("organisations", value)}
        source={LPAs}
        value={developmentPlan.organisations}
        error={errors?.find((error) => error.path[0] === "LPA")?.message}
        id="LPA"
      />
    </>
  );
};
