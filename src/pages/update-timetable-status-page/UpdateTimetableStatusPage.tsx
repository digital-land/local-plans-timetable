import { Radios } from "@lib/gds-components/radios/Radios";
import { ValidationErrorItem } from "joi";
import { useFormContext } from "../../context/use-form-context";

type UpdateTimetableStatusPageProps = {
  errors: ValidationErrorItem[] | undefined;
};

export const UpdateTimetableStatusPage = ({
  errors,
}: UpdateTimetableStatusPageProps): JSX.Element => {
  const { setStatusHasChanged, statusHasChanged } = useFormContext();

  const radioValue = statusHasChanged?.toString();

  return (
    <>
      <h1 className="govuk-heading-xl govuk-!-margin-top-6">
        Do you need to update the status of your Local Plan timetable?
        <span className="govuk-caption-m govuk-!-margin-top-2">
          <p className="govuk-body">
            Has the plan been:
            <br />
            <br />
            <ul className="govuk-list govuk-list--bullet">
              <li>paused</li>
              <li>withdrawn</li>
              <li>
                judged ‘unsound or legally non-compliant’ by the Planning
                Inspectorate
              </li>
              <li>not adopted by the Local Authority</li>
            </ul>
          </p>
        </span>
      </h1>
      <Radios
        onChange={(value) => setStatusHasChanged(value === "true")}
        inline
        options={[
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
        ]}
        selectedOption={radioValue}
        error={errors?.[0].message}
        id="updateStatus"
      />
    </>
  );
};
