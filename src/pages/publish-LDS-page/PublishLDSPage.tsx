import { ValidationErrorItem } from "joi";

import { DateInput } from "@lib/gds-components";
import { TimetableEventKey } from "@lib/constants";
import { useFormContext } from "../../context/use-form-context";

type PublishLDSPageProps = {
  errors?: ValidationErrorItem[];
};

export const PublishLDSPage = ({
  errors,
}: PublishLDSPageProps): JSX.Element => {
  const { timetableEvents, updateTimetableEvent } = useFormContext();

  const publishLDSEvent = timetableEvents.find(
    (e) =>
      e.developmentPlanEvent ===
      TimetableEventKey.LocalDevelopmentSchemePublished
  );

  if (!publishLDSEvent) {
    throw new Error("publish LDS event event not found");
  }

  return (
    <>
      <h1 className="govuk-heading-l govuk-!-margin-top-6  govuk-!-width-two-thirds">
        Local development scheme (LDS) publish date
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
          updateTimetableEvent(
            TimetableEventKey.LocalDevelopmentSchemePublished,
            "eventDate",
            value
          )
        }
        id={`${publishLDSEvent.developmentPlanEvent}-eventDate`}
      />
    </>
  );
};
