export const InputWithIcon = ({ type, placeholder, iconSrc, altText, onChageFunc=(e) => {}, value="" }) => {
  return (
    <div className="flex items-center rounded-2xl border-2 border-primary p-3">
      <img src={iconSrc} alt={altText} className="mr-3 h-5 w-5 text-primary" />
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-none focus:outline-none"
        onChange={onChageFunc}
        value={value}
      />
    </div>
  );
};
