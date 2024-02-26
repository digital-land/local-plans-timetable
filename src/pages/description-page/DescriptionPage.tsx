import { ErrorSummary, TextArea } from "@lib/gds-components";
import { ValidationErrorItem } from "joi";
import { useFormContext } from "../../context/use-form-context";

type DescriptionPageProps = {
  errors?: ValidationErrorItem[];
};

export const DescriptionPage = ({
  errors,
}: DescriptionPageProps): JSX.Element => {
  const { developmentPlan, updateDevelopmentPlan } = useFormContext();

  return (
    <>
      <h1 className="govuk-heading-xl govuk-!-margin-top-6">
        Local Plan description
        <span className="govuk-caption-m govuk-!-margin-top-3">
          Keep this specific to your own Local Plan
        </span>
      </h1>
      <ErrorSummary errors={errors} />
      <TextArea
        onChange={(value) => updateDevelopmentPlan("description", value)}
        value={developmentPlan.description}
        hint="You can enter up to 400 characters"
      />
    </>
  );
};
