import { StatusChangeEventsKey } from "@lib/constants";
import { DateInput, TextArea } from "@lib/gds-components";
import { RadioOption, Radios } from "@lib/gds-components/radios/Radios";
import { ValidationErrorItem } from "joi";
import { useFormContext } from "../../context/use-form-context";

type ChangeEventOptions = Omit<RadioOption, "value"> & {
  value: StatusChangeEventsKey;
};

const statusChangeOptions: ChangeEventOptions[] = [
  {
    label: "Paused",
    value: "plan-paused",
  },
  {
    label: "Withdrawn",
    value: "plan-withdrawn",
  },
  {
    label: "Judged ‘unsound or legally non-compliant’",
    value: "plan-found-unsound",
  },
  {
    label: "Not adopted by the Local Authority",
    value: "plan-not-adopted",
  },
];

type StatusChangeEventPageProps = { errors: ValidationErrorItem[] | undefined };

export const StatusChangeEventPage = ({
  errors,
}: StatusChangeEventPageProps): JSX.Element => {
  const { updateStatusChangeEvent, statusChangeEvent } = useFormContext();

  if (!statusChangeEvent) {
    throw new Error("No status change event");
  }

  return (
    <>
      <h1 className="govuk-heading-xl govuk-!-margin-top-6">
        Tell us about the status change
      </h1>
      <h2 className="govuk-heading-l govuk-!-margin-top-6">
        What is the status of your Local Plan?
        <span className="govuk-caption-m govuk-!-margin-top-3">
          How has the plan changed, you need to follow legal requirements for
          showing <br />
          up to date information. You can read more about the
          <a
            href="https://www.legislation.gov.uk/ukpga/2004/5/section/15"
            target="_blank"
            rel="noopener noreferrer"
          >
            requirements in the <br />
            Planning and Compulsory Purchase Act 2004, Section 15 Regulation 18
            on <br />
            legislation.gov.uk (opens in new tab)
          </a>
        </span>
      </h2>
      <Radios
        onChange={(value) => {
          updateStatusChangeEvent("developmentPlanEvent", value);
        }}
        options={statusChangeOptions}
        error={
          errors?.find((error) => error.path[0] === "developmentPlanEvent")
            ?.message
        }
        id="developmentPlanEvent"
      />
      <DateInput
        value={statusChangeEvent.eventDate}
        label="When does this status come into effect?"
        name="event-date"
        error={errors?.find((error) => error.path[0] === "eventDate")?.message}
        withDay
        onChange={(value) => updateStatusChangeEvent("eventDate", value)}
        id="eventDate"
      />
      <TextArea
        label="Additional Information (optional)"
        onChange={(value) => updateStatusChangeEvent("notes", value)}
        value={statusChangeEvent.notes}
        characterLimit={100}
        id="notes"
        error={errors?.find((error) => error.path[0] === "notes")?.message}
      />
    </>
  );
};
