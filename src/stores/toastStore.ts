import { create } from "zustand";
import { ToastStoreT } from "../types/storeTypes";

/**
 * Zustand store for managing toast notifications
 *
 * @toasts Holds the list of toast notifications
 * @addToast Adds a new toast notification
 * @removeToast Removes a toast notification
 *
 */

const useToastStore = create<ToastStoreT>((set) => ({
  toasts: [],
  addToast: (message, type = "success") => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));

    // Automatically remove the toast after 5 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 5000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

/**
 * Utility function to trigger a toast notification
 *
 * @param message - The message to display in the toast
 * @param type - The type of toast (success, error, info)
 */
export const triggerToast = (
  message: string,
  type: "success" | "error" | "info"
) => {
  useToastStore.getState().addToast(message, type);
};

export default useToastStore;
