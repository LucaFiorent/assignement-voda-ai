import { CircleX, TriangleAlert } from "lucide-react";
import PersoButton from "../PersoButton/PersoButton";
import { FC } from "react";
import { PersoModalP } from "../../../types/componentPropsT";
import Title from "../Title/Title";

const PersoModal: FC<PersoModalP> = ({
  title,
  children,
  isOpen,
  onCancel,
  onOk,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 px-10">
      <div className="absolute p-2 w-full sm:w-md md:w-lg mx-auto bg-slate-700 rounded-xl border-1 shadow-4xl z-10">
        <div className="flex w-full justify-end mb-5">
          <div
            onClick={onCancel}
            className="p-4 cursor-pointer text-rose-700 hover:text-rose-500 hover:scale-110 hover:rotate-360 duration-300 ease-in-out"
          >
            <CircleX size={24} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-5">
            <Title>
              <div className="flex gap-4">
                <TriangleAlert size={30} />
                {title}
              </div>
            </Title>
            <div className="text-center">{children}</div>
          </div>

          <div className="flex gap-5 items-center mb-10">
            <PersoButton onClickHandler={onCancel}>Cancel</PersoButton>
            <PersoButton onClickHandler={onOk}>Unlike</PersoButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersoModal;
