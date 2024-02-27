import { FileUpload } from "@lib/gds-components";
import { useFormContext } from "../../context/use-form-context";

export const UploadTimetablePage = (): JSX.Element => {
  const { handleDevelopmentPlanUpload, handleTimetableUpload } =
    useFormContext();

  return (
    <>
      <h1 className="govuk-heading-l govuk-!-margin-top-6">
        Upload your timetable CSV files
      </h1>
      <FileUpload
        label="Upload timetable CSV"
        onChange={handleTimetableUpload}
      />
      <FileUpload
        label="Upload development plan CSV"
        onChange={handleDevelopmentPlanUpload}
      />
    </>
  );
};
