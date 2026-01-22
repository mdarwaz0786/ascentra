import React from "react";
import Select from "react-select";

const SearchableSelect = ({
  label,
  placeholder = "Select an option",
  name,
  value,
  onChange,
  options = [],
  required,
  error,
  optionValue,
  optionKey,
  width,
}) => {
  const handleChange = (selectedOption) => {
    onChange({ target: { name, value: selectedOption ? selectedOption.value : "" } });
  };

  const formattedOptions = options?.map((opt) => ({
    value: opt[optionKey],
    label: opt[optionValue],
  }));

  const selectedOption = formattedOptions.find((opt) => opt?.value === value);

  const styles = {
    control: (base, state) => ({
      ...base,
      borderColor: error
        ? "#dc3545"
        : state.isFocused
          ? "#86b7fe"
          : "#ced4da",
      boxShadow: "none",
      outline: "none",
      "&:hover": {
        borderColor: "#86b7fe",
      },
    }),
  };

  return (
    <div className={`${width} mb-4`}>
      <label className="form-label" htmlFor={name}>
        {label} {required && <span className="text-danger">*</span>}
      </label>

      <Select
        id={name}
        name={name}
        value={selectedOption || null}
        onChange={handleChange}
        options={formattedOptions}
        placeholder={placeholder}
        classNamePrefix="react-select"
        isClearable
        styles={styles}
      />

      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default React.memo(SearchableSelect);
