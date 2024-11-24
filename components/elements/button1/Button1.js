const Button1 = ({ children, onClick=(e) => {}, type="submit" }) => {
    return (
      <button
        type="submit"
        onClick={onClick}
        className="bg-primary text-white w-full py-3 px-6 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        {children}
      </button>
    );
  };
  
  export default Button1;
  