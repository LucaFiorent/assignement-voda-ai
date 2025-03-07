import { User } from "firebase/auth";
import { ToastT } from "./componentPropsT";

export interface ToastStoreT {
  toasts: ToastT[];
  addToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: number) => void;
}

export interface useUserStoreT {
  user: User | null;
  setUser: (userData: User) => void;
  clearUser: () => void;
}
export interface usePagesStoreT {
  actualPostsPage: number;
  actualLikedPostsPage: number;
  setPostsPage: (pageNumber: number) => void;
  setLikedPostsPage: (pageNumber: number) => void;
  clearPostsPage: () => void;
  clearLikedPostsPage: () => void;
}
