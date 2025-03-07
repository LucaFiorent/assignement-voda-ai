import { FormEvent, useState } from "react";
import PersoButton from "../common/PersoButton/PersoButton";
import PersoInput from "../common/PersoInput/PersoInput";
import { LoaderCircle, Lock, Mail, TriangleAlert } from "lucide-react";
import { LoginFormDataT } from "../../types/componentPropsT";
import { useLogin } from "./hooks/useAuth";
import NavElement from "../common/NavElement/NavElement";
import { validateForm } from "./helper/helper";

const LoginForm = () => {
  // setting values and states
  const dummyFormData = {
    email: "",
    password: "",
  };
  const [formErrors, setFormErrors] = useState<LoginFormDataT>(dummyFormData);
  const [formData, setFormData] = useState<LoginFormDataT>(dummyFormData);

  // Hook for handling login mutation
  const { mutate, isLoading, isError, error: authError } = useLogin(formData);

  // Handles input field changes
  function handleChange(event: FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  // Handle form submission
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // validate form
    const err = validateForm(formData);
    if (Object.keys(err).length > 0) {
      setFormErrors(err);
      setFormData(dummyFormData);
    }
    mutate(); // trigger login mutation
    setFormData(dummyFormData); // reset data
  }

  return (
    <div className="flex h-[80vh] items-center justify-center mx-auto w-sm">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center px-8 pt-8 pb-10 bg-slate-800 rounded-3xl w-full"
      >
        <h2 className="uppercase font-semibold text-xl">Sign in</h2>
        <div className="py-1 px-3 h-8 mt-5 mb-2">
          {isError && (
            <p className="flex items-center gap-2 text-white text-sm">
              <span className="text-rose-500">
                <TriangleAlert size={18} />
              </span>
              {authError?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-4 w-full px-8">
          <PersoInput
            label="E-Mail"
            name="email"
            placeholder="Your E-Mail..."
            value={formData.email}
            onChange={handleChange}
            error={!!formErrors.email}
            errorMessage={formErrors.email}
            icon={<Mail size={18} />}
          />
          <PersoInput
            label="Password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={!!formErrors.password}
            errorMessage={formErrors.password}
            icon={<Lock size={18} />}
            type="password"
          />
        </div>
        <div>
          <PersoButton type="submit" isLoading={isLoading}>
            {isLoading ? (
              <div className="flex justify-center w-15">
                <LoaderCircle className="animate-spin" size={22} />
              </div>
            ) : (
              <p className="w-15">Sign in</p>
            )}
          </PersoButton>
          <div className="flex items-center justify-center text-sm mt-4 underline">
            <NavElement to={`/register`}>Click here to sign up </NavElement>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
