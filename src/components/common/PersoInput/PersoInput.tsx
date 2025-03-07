import { TriangleAlert } from "lucide-react";
import { FC } from "react";
import { PersoInputP } from "../../../types/componentPropsT";

const PersoInput: FC<PersoInputP> = ({
  label = "Placeholder",
  name,
  value,
  onChange,
  placeholder = "Placeholder...",
  type = "text",
  error = false,
  errorMessage,
  icon,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-semibold text-md ml-4">{label}</div>
      <div className="flex relative items-center">
        <input
          className={`py-2 pl-4 pr-6 rounded-full focus:outline-2  focus:outline-white w-full ${
            !error ? "bg-slate-900" : "bg-rose-500"
          }`}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <div className="absolute right-3">{icon}</div>
      </div>

      <div className="py-1 px-3 h-8">
        {error && (
          <div className="flex items-center gap-2 text-white text-xs">
            <div className="text-rose-500">
              <TriangleAlert size={18} />
            </div>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersoInput;
