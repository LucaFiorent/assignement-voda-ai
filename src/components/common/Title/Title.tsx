import { ReactNode } from "react";

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex text-xl font-semibold uppercase">
      <h1>{children}</h1>
    </div>
  );
};

export default Title;
