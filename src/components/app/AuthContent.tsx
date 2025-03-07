import { FC, ReactNode } from "react";
interface AuthContentProps {
  children: ReactNode;
}
const AuthContent: FC<AuthContentProps> = ({ children }) => {
  return <div className="flex flex-col items-center">{children}</div>;
};

export default AuthContent;
