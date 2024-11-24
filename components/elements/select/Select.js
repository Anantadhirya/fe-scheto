import { forwardRef, useState } from "react";
import ReactSelect from "react-select";
import { twMerge } from "tailwind-merge";

export const Select = forwardRef(
  (
    {
      className = "",
      placeholder = "",
      allowSelectAll = false,
      allOption = { label: "Select all", value: "*" },
      options = [],
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [localValue, setLocalValue] = useState([]);
    const handleChange = (selected) => {
      setLocalValue(selected);
      if (onChange) onChange(selected);
    };
    return (
      <ReactSelect
        ref={ref}
        value={value ?? localValue}
        onChange={(selected) => {
          if (
            allowSelectAll &&
            selected.length > 0 &&
            selected[selected.length - 1].value === allOption.value
          ) {
            handleChange(options);
            return;
          }
          handleChange(selected);
        }}
        unstyled
        placeholder={placeholder}
        classNames={{
          container: () =>
            twMerge(
              "w-full rounded-[10px] text-base text-blue-200 outline outline-2 outline-blue-200",
              className,
            ),
          control: () => "px-3 rounded-[10px] !cursor-pointer",
          valueContainer: () => "py-2 flex gap-1",
          input: () => "outline-0",
          menu: () =>
            "mt-1.5 bg-white rounded-md outline outline-2 outline-blue-200 overflow-hidden !z-50 text-blue-200",
          menuList: () => "scroll-container",
          option: () =>
            "py-1 px-3 !cursor-pointer hover:bg-blue-200 hover:text-white",
          noOptionsMessage: () => "py-3 cursor-default",
          multiValue: () =>
            "text-sm bg-[#EEEDFE] shadow rounded-full px-2 flex gap-1",
        }}
        options={
          allowSelectAll && (value ?? localValue).length !== options.length
            ? [allOption, ...options]
            : options
        }
        {...props}
      />
    );
  },
);
Select.displayName = "Select";
