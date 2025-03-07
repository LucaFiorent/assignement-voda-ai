import { FC, ReactNode } from "react";
interface HomeContentProps {
  children: ReactNode;
}
const HomeContent: FC<HomeContentProps> = ({ children }) => {
  return <div className="flex flex-col items-center">{children}</div>;
};

export default HomeContent;
