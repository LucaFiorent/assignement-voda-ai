import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContextProps } from "../types/types";
import AuthContext from "./AuthContexts";
import AuthContent from "../components/app/AuthContent";

const AuthRoutes = () => {
  const { isLogin } = useContext<AuthContextProps>(AuthContext);
  // if is logged in navigate to home
  return isLogin ? (
    <Navigate to="/" replace />
  ) : (
    <AuthContent>
      <Outlet />
    </AuthContent>
  );
};

export default AuthRoutes;
