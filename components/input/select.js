import ReactSelect from "react-select";

const textIndent = ".5rem";

const selectStyles = {
  control: (base, { data }) => ({
    ...base,
    textIndent,
    minHeight: "var(--uni-height)",
    borderRadius: ".375rem",
    ":focus-within": {
      boxShadow: "0 0 0 0.2rem var(--bs-checkshadow) !important",
      borderColor: "transparent",
    },
  }),
  input: (base) => ({
    ...base,
    paddingLeft: textIndent,
  }),
  option: (base, { data }) => ({
    ...base,
    ":hover": {
      color: "white",
    },
  }),
  menuList: (base, { data }) => ({
    ...base,
    color: "var(--bs-darkblue)",
  }),
  menu: (base, { data }) => ({
    ...base,
    borderRadius: ".5rem",
  }),
  multiValueLabel: (base, { data }) => ({
    ...base,
    borderRadius: "7px 0 0 7px",
    backgroundColor: "var(--bs-textblue)",
    color: data.color || "white",
    paddingRight: "8px",
  }),
  multiValue: (base, { data }) => {
    return {
      ...base,
      color: data.color || "white",
      backgroundColor: "var(--bs-textblue)",
      borderRadius: "7px",
      marginRight: "5px",
    };
  },
  multiValueRemove: (base) => ({
    ...base,
    ":hover": {
      backgroundColor: "var(--bs-scroll)",
      borderRadius: "0 7px 7px 0",
    },
  }),
};

const Select = ({ options, noOptionsMessage, ...props }) => {
  return (
    <ReactSelect
      styles={selectStyles}
      placeholder={`請選擇${
        props.isSearchable === undefined || !!props.isSearchable
          ? "或輸入文字"
          : ""
      }`}
      noOptionsMessage={
        { function: noOptionsMessage, string: () => noOptionsMessage }[
          typeof noOptionsMessage
        ] ?? (() => "沒有資料")
      }
      options={options}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: "var(--bs-scroll)",
          primary50: "var(--bs-scroll)",
          primary75: "var(--bs-textblue)",
          primary: "var(--bs-darkblue)",
        },
      })}
      {...props}
    />
  );
};

export default Select;
