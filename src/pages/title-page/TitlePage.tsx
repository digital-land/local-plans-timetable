import { TextInput } from "@lib/gds-components";
import { ValidationErrorItem } from "joi";
import { useFormContext } from "../../context/use-form-context";

type TitlePageProps = {
  errors?: ValidationErrorItem[];
};

export const TitlePage = ({ errors }: TitlePageProps): JSX.Element => {
  const { developmentPlan, updateDevelopmentPlan } = useFormContext();

  return (
    <div className="govuk-!-width-two-thirds">
      <h1 className="govuk-heading-l govuk-!-margin-top-6">
        Title of the Local Plan
        <span className="govuk-caption-m govuk-!-margin-top-3">
          For example, Birmingham Local Plan
        </span>
      </h1>
      <TextInput
        onChange={(value) => updateDevelopmentPlan("name", value)}
        value={developmentPlan.name}
        characterLimit={100}
        id="title"
        error={errors?.find((error) => error.path[0] === "title")?.message}
      />
    </div>
  );
};
