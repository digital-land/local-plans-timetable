import { ValidationErrorItem } from "joi";

import { TextArea, Details } from "@lib/gds-components";

import { useFormContext } from "../../context/use-form-context";

type DescriptionPageProps = {
  errors?: ValidationErrorItem[];
};

export const DescriptionPage = ({
  errors,
}: DescriptionPageProps): JSX.Element => {
  const { developmentPlan, updateDevelopmentPlan } = useFormContext();

  return (
    <div className="govuk-!-width-two-thirds">
      <h1 className="govuk-heading-l govuk-!-margin-top-6 govuk-!-margin-bottom-3">
        Local Plan description
        <span className="govuk-caption-m govuk-!-margin-top-3">
          Keep this specific to your own Local Plan
        </span>
      </h1>
      <Details
        summary="Help with writing a description"
        text="This should be a short summary. For example, 'The Local Plan was adopted by Council on 25 July 2019. It is the basis for planning decision and all future development.'"
      />
      <TextArea
        onChange={(value) => updateDevelopmentPlan("description", value)}
        value={developmentPlan.description}
        characterLimit={400}
        id="description"
        error={
          errors?.find((error) => error.path[0] === "description")?.message
        }
      />
    </div>
  );
};
