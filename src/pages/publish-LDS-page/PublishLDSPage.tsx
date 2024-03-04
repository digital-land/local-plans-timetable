import { DateInput } from "@lib/gds-components";
import { ValidationErrorItem } from "joi";
import { useFormContext } from "../../context/use-form-context";
import { TimetableEventKey } from "@lib/constants";

type PublishLDSPageProps = {
  errors?: ValidationErrorItem[];
};

export const publishLDSEventKey: TimetableEventKey =
  "local-development-scheme-published";

export const PublishLDSPage = ({
  errors,
}: PublishLDSPageProps): JSX.Element => {
  const { timetableEvents, updateTimetableEvent } = useFormContext();

  const publishLDSEvent = timetableEvents.find(
    (e) => e.developmentPlanEvent === publishLDSEventKey
  );

  if (!publishLDSEvent) {
    throw new Error("publish LDS event event not found");
  }

  return (
    <>
      <h1 className="govuk-heading-xl govuk-!-margin-top-6">
        When will you publish your local development scheme (LDS)?
        <span className="govuk-caption-m govuk-!-margin-top-3">
          This should also be the date that you publish your timetable on your
          website.
        </span>
      </h1>
      <DateInput
        value={publishLDSEvent.eventDate}
        name="publish-LDS-date"
        error={
          errors?.find(
            (error) =>
              error.path[0] === publishLDSEvent.developmentPlanEvent &&
              error.path[1] === "eventDate"
          )?.message
        }
        onChange={(value) =>
          updateTimetableEvent(publishLDSEventKey, "eventDate", value)
        }
        withDay
        id={`${publishLDSEvent.developmentPlanEvent}-eventDate`}
      />
    </>
  );
};
