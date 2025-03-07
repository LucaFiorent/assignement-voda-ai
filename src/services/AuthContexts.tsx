import { Context, createContext } from "react";
import { AuthContextProps } from "../types/types";

const AuthContext: Context<AuthContextProps> = createContext<AuthContextProps>({
  currentUser: null,
  isLogin: false,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
