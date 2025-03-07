import { CircleCheckBig, Info, TriangleAlert } from "lucide-react";
import { FC, useEffect } from "react";
import { ToastP } from "../../../types/componentPropsT";

const Toast: FC<ToastP> = ({ toast, removeToast }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [removeToast, toast.id]);

  return (
    <div
      className={`fixed flex items-center gap-4 text-md min-w-xs
        max-w-150 top-20 left-1/2 transform -translate-x-1/2 
        pl-4 sm:pl-3 md:pl-2 pr-8 py-2
         rounded-full shadow-md text-white ${
           toast.type === "success"
             ? "bg-green-700"
             : toast.type === "error"
             ? "bg-red-400"
             : "bg-blue-400"
         }`}
    >
      <div className="m-lg">
        {toast.type === "success" ? (
          <CircleCheckBig size={30} />
        ) : toast.type === "error" ? (
          <TriangleAlert size={30} />
        ) : (
          <Info size={30} />
        )}
      </div>
      <p className="font-semibold"> {toast.message}</p>
    </div>
  );
};
export default Toast;
