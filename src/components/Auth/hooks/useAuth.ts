import { triggerToast } from "./../../../stores/toastStore";
import { useMutation } from "@tanstack/react-query";
import { LoginFormDataT, RegFormDataT } from "../../../types/componentPropsT";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import db, { auth } from "../../../firebase/firabase.config";
import { AuthContextProps } from "../../../types/types";
import { useContext } from "react";
import AuthContext from "../../../services/AuthContexts";
import { doc, setDoc } from "firebase/firestore";
import { validateForm } from "../helper/helper";
import { useNavigate } from "react-router";

/**
 * Function to handle user login using Firebase Authentication.
 * @param email - User's email
 * @param password - User's password
 * @returns A Promise that resolves to the authenticated User object
 * @throws Error if authentication fails
 */
async function doLogin(email: string, password: string): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Custom hook to manage login process using React Query.
 * @param formdata - provided login data
 * @returns Login mutation object including state and handlers
 */
export function useLogin(formdata: LoginFormDataT) {
  const navigate = useNavigate();
  const { login } = useContext<AuthContextProps>(AuthContext);
  const fallback: User | null = null;

  const {
    mutate,
    data = fallback,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationKey: ["userData", formdata.email, formdata.password],
    mutationFn: () => doLogin(formdata.email, formdata.password),
    onSuccess: (user) => {
      login(user); // update auth context
      navigate("/"); // navigate on home on success
      triggerToast("User signed in successfully", "success"); // trigger success toast
    },
  });

  return {
    mutate,
    data,
    isSuccess,
    isError,
    error,
  };
}

/**
 * Function to handle user registration using Firebase Authentication.
 * @param email - User's email
 * @param password - User's password
 * @param passwordRepeat - Confirmation password
 * @returns A Promise that resolves to the newly created User object
 * @throws Error if validation fails or Firebase authentication fails
 */
export async function doSignUp(
  email: string,
  password: string,
  passwordRepeat: string
) {
  // validate user input before sign-up
  const err = validateForm({
    email: email,
    password: password,
    passwordRepeat: passwordRepeat,
  });

  if (Object.keys(err).length > 0) {
    throw new Error("Form validation failed");
  }

  // create user in Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const currentUser = userCredential.user;

  // store user in firestore
  await setDoc(doc(db, "users", currentUser.uid), {
    email: currentUser.email,
    likedPosts: [],
  });

  return currentUser;
}

/**
 * Custom hook to manage user registration using React Query.
 * @param formdata - provided registration data
 * @returns Signup mutation object including state and handlers
 */
export function useSignUp(formdata: RegFormDataT) {
  const navigate = useNavigate();
  const { login } = useContext<AuthContextProps>(AuthContext);
  const fallback: User | null = null;

  const {
    mutate,
    data = fallback,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationKey: [
      "userData",
      formdata.email,
      formdata.password,
      formdata.passwordRepeat,
    ],
    mutationFn: () =>
      doSignUp(formdata.email, formdata.password, formdata.passwordRepeat),
    onSuccess: (user) => {
      login(user); // update auth context
      navigate("/"); // navigate on home on success
    },
  });

  return { mutate, data, isSuccess, isError, error };
}
