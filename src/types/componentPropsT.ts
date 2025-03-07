import { FormEvent, MouseEventHandler, ReactNode } from "react";
import { AddPostFormDataT, PostsT } from "./types";

export interface LoginFormDataT {
  email: string;
  password: string;
}

export interface FormDataT extends LoginFormDataT {
  passwordRepeat?: string;
}

export interface PostsListP {
  posts: PostsT[];
  loading: boolean;
}

export interface PostP {
  post: PostsT;
  likePost: () => void;
}

export interface PaginationP {
  totalPages: number;
  onChange: (page: number) => void;
  activePage: number;
  inactive: boolean;
}

export interface PersoButtonP {
  children: ReactNode;
  onClickHandler?: MouseEventHandler<HTMLButtonElement>;
  error?: boolean;
  uppercase?: boolean;
  plain?: boolean;
  extraStyles?: string | false;
  type?: false | "submit";
  isLoading?: boolean;
}

export interface PersoInputP {
  label: string;
  name: string;
  value: string;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "password";
  error?: boolean;
  errorMessage?: string;
  icon?: ReactNode;
}

export interface AddPostModalP {
  inputsValue: AddPostFormDataT;
  isOpen: boolean;
  handleAddPost: (event: FormEvent<HTMLFormElement>) => void;
  handleChangeInputs: (event: FormEvent<HTMLInputElement>) => void;
  closeModal: () => void;
}
export interface PersoModalP {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onCancel: () => void;
  onOk: () => void;
}
interface Id {
  id: number;
}

export interface ToastT extends Id {
  message: string;
  type?: "success" | "error" | "info";
}

export interface ToastP {
  toast: ToastT;
  removeToast: (id: number) => void;
}
