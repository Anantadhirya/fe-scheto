export const Button1 = ({ children, onClick = (e) => {}, type = "submit" }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="w-full rounded-2xl bg-primary px-6 py-3 font-bold text-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      {children}
    </button>
  );
};
