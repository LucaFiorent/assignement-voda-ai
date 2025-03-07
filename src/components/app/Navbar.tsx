import { CircleArrowLeft, LogOut } from "lucide-react";
import NavElement from "../common/NavElement/NavElement";
import { useLocation, useNavigate } from "react-router";
import PersoButton from "../common/PersoButton/PersoButton";
import { useContext } from "react";
import AuthContext from "../../services/AuthContexts";

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center mt-10 w-full sm:w-md md:w-lg lg:w-4xl w-auto uppercase mx-auto">
      <ul
        className={`flex items-center w-full gap-4 py-4 pl-4 pr-8 mb-5 shadow-mg rounded-full text:md lg:text-xl sm:gap-2 md:gap-4 bg-gray-800 ${
          location.pathname !== "/" && window.history.length > 1
            ? "justify-between"
            : "justify-end"
        }`}
      >
        {location.pathname !== "/" && window.history.length > 1 && (
          <li>
            <PersoButton
              onClickHandler={() => navigate(-1)}
              uppercase={true}
              plain={true}
              extraStyles={"hover:text-blue-800 hover:dark:text-violet-400"}
            >
              <CircleArrowLeft size={24} />
              <p className="hidden md:block">Back</p>
            </PersoButton>
          </li>
        )}
        <li>
          <ul className="flex items-center w-full gap-6 md:gap-6 lg:gap-10">
            <li>
              <NavElement to={`/`}>Home</NavElement>
            </li>
            <li>
              <NavElement to={`/MyPosts`}>My Posts</NavElement>
            </li>
            <li>
              <PersoButton onClickHandler={() => authCtx.logout()} plain={true}>
                <div className="flex flex-col items-center">
                  <LogOut size={22} />
                  <p className="text-xs">Logout</p>
                </div>
              </PersoButton>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
