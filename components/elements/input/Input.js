export const Input = ({
  className,
  type,
  value,
  onChange,
  placeholder = "",
  ...props
}) => (
  <input
    className={`placeholder:text-foreground/50 h-[60px] rounded-[20px] border-[3px] border-blue-200 px-4 py-3 text-lg outline-0 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    {...props}
  />
);
