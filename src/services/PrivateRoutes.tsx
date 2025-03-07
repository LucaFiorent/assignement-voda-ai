import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import HomeContent from "../components/app/HomeContent";
import { AuthContextProps } from "../types/types";
import AuthContext from "./AuthContexts";
import Navbar from "../components/app/Navbar";

const PrivateRoutes = () => {
  const { isLogin } = useContext<AuthContextProps>(AuthContext);

  // if not logged in navigate to login
  return !isLogin ? (
    <Navigate to="/login" replace />
  ) : (
    <HomeContent>
      <Navbar />
      <Outlet />
    </HomeContent>
  );
};

export default PrivateRoutes;
