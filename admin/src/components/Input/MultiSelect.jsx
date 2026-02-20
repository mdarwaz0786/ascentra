import React from "react";
import Select from "react-select";

const MultiSelect = ({
  label,
  placeholder = "Select options",
  name,
  value = [],
  onChange,
  options = [],
  required,
  error,
  optionValue,
  optionKey,
  width,
}) => {
  const handleChange = (selectedOptions) => {
    onChange({
      target: {
        name,
        value: selectedOptions ? selectedOptions?.map((opt) => opt?.value) : [],
      },
    });
  };

  const formattedOptions = options?.map((opt) => ({
    value: opt[optionKey],
    label: opt[optionValue],
  }));

  const selectedValues = formattedOptions?.filter((item) =>
    value?.includes(item?.value)
  );

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
        value={selectedValues}
        onChange={handleChange}
        options={formattedOptions}
        isMulti
        placeholder={placeholder}
        classNamePrefix="react-select"
        styles={styles}
      />

      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default React.memo(MultiSelect);
