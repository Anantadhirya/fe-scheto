export const Button2 = ({ children, onClick = (e) => {}, type = "Save Changes" }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className=" h-[45px] rounded-2xl bg-primary font-bold text-white shadow-lg transition-shadow duration-300 hover:shadow-x2"
      >
        {children}
      </button>
    );
  };
  