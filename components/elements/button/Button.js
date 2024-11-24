import { tv } from "tailwind-variants";

const getButtonClassName = tv({
  base: "text-white rounded-[20px] text-nowrap outline-0",
  variants: {
    variant: {
      primary: "bg-blue-200 hover:bg-blue-200/90",
      secondary: "bg-purple-200 hover:bg-purple-200/90",
      destructive: "bg-red-100 hover:bg-red-100/90",
      black: "bg-black hover:bg-black/90",
    },
    size: {
      sm: "px-4 py-1",
      md: "px-10 py-2",
      lg: "w-full py-4",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export const Button = ({
  children,
  variant,
  size,
  className = "",
  onClick,
  ...props
}) => (
  <button
    className={getButtonClassName({ variant, size, className })}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);
