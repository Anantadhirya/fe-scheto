const getButtonClassName = ({ variant, size, className }) => {
  const defaultClassName = "text-white rounded-[20px] text-nowrap outline-0";
  const variants = {
    primary: "bg-blue-200 hover:bg-blue-200/90",
    secondary: "bg-purple-200 hover:bg-purple-200/90",
    destructive: "bg-red-100 hover:bg-red-100/90",
  };
  const sizes = {
    sm: "px-4 py-1",
    md: "px-10 py-2",
    lg: "w-full py-4",
  };
  return `${defaultClassName} ${variants[variant]} ${sizes[size]} ${className}`;
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => (
  <button
    className={getButtonClassName({ variant, size, className })}
    {...props}
  >
    {children}
  </button>
);
