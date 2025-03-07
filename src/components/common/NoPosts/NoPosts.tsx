import { useNavigate } from "react-router";
import PersoButton from "../PersoButton/PersoButton";
import empty from "../../../assets/empty.png";

const NoPosts = () => {
  const navigate = useNavigate();
  return (
    <div className="w-auto mt-10 sm:w-md md:w-lg lg:w-4xl border-1 rounded-2xl px-6 md:px-10 pt-6 pb-8 md:py-8 bg-slate-800">
      <div className="flex flex-col items-center w-full">
        <div className="text-lg md:text-2xl">Opss!</div>
        <div className="p4 w-40 md:w-60">
          <img src={empty} alt="" />
        </div>
        <div className="text-lg md:text-2xl mb-5 md:mb-10">
          Still no Posts liked?
        </div>
        <PersoButton onClickHandler={() => navigate("/")}>
          Look for new Posts
        </PersoButton>
      </div>
    </div>
  );
};

export default NoPosts;
