import Image from "next/image";

export const InputWithIcon = ({
  type,
  placeholder,
  iconSrc,
  altText,
  onChageFunc = (e) => {},
  value = "",
}) => {
  return (
    <div className="flex items-center rounded-2xl border-2 border-primary p-3">
      <div className="relative mr-3 h-5 w-5 flex-none text-primary">
        <Image src={iconSrc} alt={altText} fill />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent border-none focus:outline-none"
        onChange={onChageFunc}
        value={value}
      />
    </div>
  );
};
