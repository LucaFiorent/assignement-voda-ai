import { FC } from "react";
import { PersoButtonP } from "../../../types/componentPropsT";

const PersoButton: FC<PersoButtonP> = ({
  children,
  onClickHandler,
  error = false,
  uppercase = false,
  plain = false,
  extraStyles = false,
  type = false,
  isLoading = false,
}) => {
  const typeOfButton =
    !plain && error
      ? "px-6 py-4 bg-red-500 hover:bg-red-800 text-white rounded-full text-sm lg:text-md"
      : !plain && !error
      ? "px-10 py-5 rounded-full text-white text-sm lg:text-md bg-purple-700 hover:bg-purple-800"
      : "text-white text-lg";

  const defineButtonType = !type ? { onClick: onClickHandler } : { type: type };

  return (
    <button
      className={`flex items-center ${
        isLoading && "disabled"
      } gap-2 cursor-pointer font-semibold ${typeOfButton} ${
        uppercase && "uppercase"
      } ${extraStyles && extraStyles}
      disabled:opacity-75 disabled:bg-slate-200 disabled:text-slate-900 disabled:cursor-not-allowed
      `}
      {...defineButtonType}
      disabled={isLoading}
    >
      {children}
    </button>
  );
};

export default PersoButton;
