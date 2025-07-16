import Select from "react-select";

const Input = ({ type, placeholder, name, data = null, value, handleChange }) => {
  const selectStyle = {
    control: (base, state) => ({
      ...base,
      width: "100%",
      height: "5rem",
      paddingLeft: "1.25rem",
      fontSize: "1.5rem",
      textAlign: "left",
      borderWidth: "2px",
      zIndex: 20,
      borderColor: state.isFocused ? "#ec4899" : "#D1D5DB",
      borderRadius: "0.5rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#ec4899",
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 10,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#ec4899" : "#FFFFFF",
      color: "#111827",
      padding: 12,
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    }),
  };

  const options = data?.map((item) => ({
    value: item.code,
    label: (
      <div className="flex items-center space-x-2 text-2xl">
        {item.flag && (
          <img
            src={item.flag}
            alt={item.name}
            loading="lazy"
            className="w-5 h-5 object-cover"
          />
        )}
        <span>
          {item.name} ({item.code})
        </span>
      </div>
    ),
    original: item,
  }));

  const selectedOption = options?.find((option) => option.value === value) || null;

  return data && data.length > 0 ? (
    <Select
      name={name}
      options={options}
      placeholder={placeholder}
      styles={selectStyle}
      value={selectedOption}
      onChange={(selectedOption) =>
        handleChange({ name, value: selectedOption?.value })
      }
      lazyLoad
      className="w-full"
    />
  ) : (
    <input
      type={type}
      placeholder={placeholder}
      id={name}
      name={name}
      value={value}
      onChange={(e) =>
        handleChange({ name, value: e.target.value })
      }
      className="w-full mx-auto px-5 text-left text-gray-500 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 hover:border-pink-500 h-20 text-2xl"
    />
  );
};

export default Input;
