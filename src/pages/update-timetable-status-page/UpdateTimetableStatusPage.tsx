import { Radios } from "@lib/gds-components/radios/Radios";
import { ValidationErrorItem } from "joi";
import { useFormContext } from "../../context/use-form-context";

type UpdateTimetableStatusPageProps = {
  errors: ValidationErrorItem[] | undefined;
};

export const UpdateTimetableStatusPage = ({
  errors,
}: UpdateTimetableStatusPageProps): JSX.Element => {
  const { setStatusHasChanged } = useFormContext();

  return (
    <>
      <h1 className="govuk-heading-l govuk-!-margin-top-6">
        Do you need to update the status of your Local Plan timetable?
        <span className="govuk-caption-m govuk-!-margin-top-2">
          <p className="govuk-body">Has the plan been:</p>
          <ul className="govuk-list govuk-list--bullet">
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
        onChange={(value) => setStatusHasChanged(value === "y")}
        inline
        options={[
          { label: "Yes", value: "y" },
          { label: "No", value: "n" },
        ]}
        error={errors?.[0].message}
        id="updateStatus"
      />
    </>
  );
};
