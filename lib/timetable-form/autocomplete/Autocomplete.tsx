import AccessibleAutocomplete, {
  SourceFunction,
} from "accessible-autocomplete/react";

import "accessible-autocomplete/src/autocomplete.css";

interface AutocompleteProps {
  label: string;
  onChange: (value: string) => void;
  source: string[];
  value:string;
}

export const Autocomplete = ({
  label,
  onChange,
  source,
  value
}: AutocompleteProps) => {
  const suggest: SourceFunction = (query, populateResults) => {
    const filteredResults = source.filter((entry: string) =>
      entry.toLowerCase().includes(query.toLowerCase())
    );
    populateResults(filteredResults);
  };

  return (
    <div className="govuk-form-group">
      <label className="govuk-label">
        {label}
        <AccessibleAutocomplete
          id={`${label}autocomplete`}
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
