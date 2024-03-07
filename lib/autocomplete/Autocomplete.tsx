import cn from "classnames";
import AccessibleAutocomplete, {
  SourceFunction,
} from "accessible-autocomplete/react";

import "accessible-autocomplete/src/autocomplete.css";

interface AutocompleteProps {
  label: string;
  onChange: (value: string) => void;
  source: string[];
  value: string;
  error?: string;
  id: string;
}

export const Autocomplete = ({
  label,
  onChange,
  source,
  value,
  error,
  id,
}: AutocompleteProps) => {
  const suggest: SourceFunction = (query, populateResults) => {
    const filteredResults = source.filter((entry: string) =>
      entry.toLowerCase().includes(query.toLowerCase())
    );
    populateResults(filteredResults);
  };

  return (
    <div
      className={cn("govuk-form-group", { "govuk-form-group--error": error })}
    >
      <label className="govuk-label" htmlFor={id}>
        {label}
        {error && (
          <p className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {error}
          </p>
        )}
        <AccessibleAutocomplete
          id={id}
          source={suggest}
          onConfirm={onChange}
          confirmOnBlur={false}
          autoselect={true}
          defaultValue={value}
        />
      </label>
    </div>
  );
};
