import useToastStore from "../../../stores/toastStore";
import Toast from "./Toast";

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();
  return (
    <div className="fixed space-y-2 z-99">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
