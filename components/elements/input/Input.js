import { tv } from "tailwind-variants";

const getInputClassName = tv({
  base: "placeholder:text-foreground/50 rounded-[20px] border-[3px]  text-lg outline-0 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    variant: {
      default: "border-blue-200",
    },
    size: {
      sm: "px-4 py-2",
      md: "px-4 py-3 h-[60px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export const Input = ({
  className = "",
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
