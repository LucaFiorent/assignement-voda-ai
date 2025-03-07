import { FC, ReactNode, useEffect, useState } from "react";
import { User } from "firebase/auth";
import AuthContext from "./AuthContexts";

interface AuthProviderProps {
  children: ReactNode;
}
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // load user form localStorage when app start
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  });

  function login(user: User) {
    // set user as currentUser and add in localStorage
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }
  function logout() {
    // remove user from currentUser and localStorage
    setCurrentUser(null);
    localStorage.removeItem("user");
  }

  useEffect(() => {
    // sync with localstorage
    if (currentUser) localStorage.setItem("user", JSON.stringify(currentUser));
    else localStorage.removeItem("user");
  }, [currentUser]);

  const value = {
    currentUser: currentUser,
    isLogin: !!currentUser,
    login: login,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
