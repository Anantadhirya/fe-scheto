const getInputClassName = ({ variant, size, className }) => {
  const defaultClassName =
    "placeholder:text-foreground/50 rounded-[20px] border-[3px]  text-lg outline-0 disabled:cursor-not-allowed disabled:opacity-50";
  const variants = {
    default: "border-blue-200",
  };
  const sizes = {
    sm: "px-4 py-2",
    default: "px-4 py-3 h-[60px]",
  };
  return `${defaultClassName} ${variants[variant]} ${sizes[size]} ${className}`;
};

export const Input = ({
  className,
  variant = "default",
  size = "default",
  type,
  value,
  onChange,
  placeholder = "",
  ...props
}) => (
  <input
    className={getInputClassName({ variant, size, className })}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    {...props}
  />
);
