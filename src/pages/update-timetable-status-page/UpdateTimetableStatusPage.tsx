import { Radios } from "@lib/gds-components";
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
    <div className="govuk-!-width-two-thirds">
      <h1 className="govuk-heading-l govuk-!-margin-top-6">
        Do you need to update the status of your Local Plan timetable?
        <span className="govuk-caption-m govuk-!-margin-top-2">
          <p className="govuk-body">Has the plan been:</p>
          <ul className="govuk-list govuk-list--bullet govuk-!-margin-left-2">
            <li>paused</li>
            <li>withdrawn</li>
            <li>
              judged ‘unsound or legally non-compliant’ by the Planning
              Inspectorate
            </li>
            <li>not adopted by the Local Authority</li>
          </ul>
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
    </div>
  );
};
