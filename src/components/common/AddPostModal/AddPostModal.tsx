import { CircleX } from "lucide-react";
import PersoButton from "../PersoButton/PersoButton";
import PersoInput from "../PersoInput/PersoInput";
import { FC } from "react";
import { AddPostModalP } from "../../../types/componentPropsT";

const AddPostModal: FC<AddPostModalP> = ({
  handleAddPost,
  isOpen,
  inputsValue,
  handleChangeInputs,
  closeModal,
}) => {
  if (!isOpen) return null;
  if (inputsValue)
    return (
      <div className="absolute p-4 sm:p-5 w-full bg-slate-700 rounded-xl border-1 shadow-4xl z-10">
        <div className="flex w-full justify-end">
          <div
            onClick={closeModal}
            className="px-4 cursor-pointer text-rose-700 hover:text-rose-500 hover:scale-110 hover:rotate-360 duration-300 ease-in-out"
          >
            <CircleX size={24} />
          </div>
        </div>
        <form
          onSubmit={handleAddPost}
          className="flex flex-col items-center gap-5 pb-5"
        >
          <div className="w-full">
            <PersoInput
              label="Title"
              name="title"
              placeholder="Add a title"
              onChange={handleChangeInputs}
              value={inputsValue.title}
            />
            <textarea
              name="body"
              className="w-full px-4 py-2 min-h-30 bg-slate-900 rounded-2xl"
              placeholder="Add a body"
              onChange={handleChangeInputs}
              value={inputsValue.body}
            />
          </div>
          <div className="flex gap-5 items-center">
            <PersoButton onClickHandler={closeModal}>Cancel</PersoButton>
            <PersoButton type="submit">Add</PersoButton>
          </div>
        </form>
      </div>
    );
};

export default AddPostModal;
