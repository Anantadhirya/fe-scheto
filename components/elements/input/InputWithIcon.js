const InputWithIcon = ({ type, placeholder, iconSrc, altText }) => {
    return (
      <div className="flex items-center border-2 border-primary rounded-2xl p-3">
        <img src={iconSrc} alt={altText} className="h-5 w-5 mr-3 text-primary" />
        <input
          type={type}
          placeholder={placeholder}
          className="w-full border-none focus:outline-none"
        />
      </div>
    );
  };
  
  export default InputWithIcon;
  