import { ReactNode } from "react";
import { NavLink } from "react-router";

const NavElement = ({ to, children }: { to: string; children: ReactNode }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `${
          isActive ? "text-white font-semibold" : "text-slate-300"
        } flex items-center gap-2 cursor-pointer hover:text-blue-800 hover:dark:text-violet-400`
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default NavElement;
