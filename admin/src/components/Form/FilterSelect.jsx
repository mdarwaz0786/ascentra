const FilterSelect = ({ paramKey, label, options, searchParams, updateQueryParams }) => {
  return (
    <select
      className="form-select"
      value={searchParams.get(paramKey) || ""}
      onChange={(e) => updateQueryParams({ [paramKey]: e.target.value, page: 1 })}
    >
      <option value="">{label}</option>

      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

export default FilterSelect;
