import { ValidationErrorItem } from "joi";

import { Radios } from "@lib/gds-components";
import { useFormContext } from "../../context/use-form-context";

interface UpdateDatesPageProps {
  errors: ValidationErrorItem[] | undefined;
}

export const UpdateDatesPage = ({
  errors,
}: UpdateDatesPageProps): JSX.Element => {
  const { shouldUpdateDates, setShouldUpdateDates } = useFormContext();

  const radioValue = shouldUpdateDates?.toString();

  return (
    <>
      <h1 className="govuk-heading-l govuk-!-margin-top-6 govuk-!-width-two-thirds govuk-!-margin-bottom-7">
        Do you need to update the dates of your Local Plan timetable?
      </h1>
      <Radios
        onChange={(value) => setShouldUpdateDates(value === "true")}
        inline
        options={[
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
        ]}
        selectedOption={radioValue}
        error={errors?.[0].message}
        id="updateDates"
      />
    </>
  );
};
