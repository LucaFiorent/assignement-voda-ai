import { FormEvent, useState } from "react";
import { FormDataT } from "../../types/componentPropsT";
import { useSignUp } from "./hooks/useAuth";
import { LoaderCircle, Lock, Mail, TriangleAlert } from "lucide-react";
import PersoInput from "../common/PersoInput/PersoInput";
import PersoButton from "../common/PersoButton/PersoButton";
import NavElement from "../common/NavElement/NavElement";
import { validateForm } from "./helper/helper";

const RegisterForm = () => {
  const dummyFormData = {
    email: "",
    password: "",
    passwordRepeat: "",
  };
  const [formData, setFormData] = useState<FormDataT>(dummyFormData);
  const [formErrors, setFormErrors] = useState<FormDataT>(dummyFormData);

  const { mutate, isLoading, isError, error: authError } = useSignUp(formData);

  function handleChange(event: FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const err = validateForm(formData);

    if (Object.keys(err).length > 0) {
      setFormErrors(err);
      setFormData(dummyFormData);
    } else {
      mutate();
    }
  }

  return (
    <div className="flex h-[80vh] items-center justify-center mx-auto w-sm">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center px-8 pt-8 pb-10 bg-slate-800 rounded-3xl w-full"
      >
        <h2 className="uppercase font-semibold text-xl mb-10">Sign up</h2>
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
          />
          <PersoInput
            label="Password Repeat"
            name="passwordRepeat"
            placeholder="Repeat your password"
            value={formData.passwordRepeat}
            onChange={handleChange}
            error={!!formErrors.passwordRepeat}
            errorMessage={formErrors.passwordRepeat}
            icon={<Lock size={18} />}
          />
        </div>
        <div>
          <PersoButton type="submit" isLoading={isLoading}>
            {isLoading ? (
              <div className="flex justify-center w-15">
                <LoaderCircle className="animate-spin" size={22} />
              </div>
            ) : (
              <p className="w-15">Sign up</p>
            )}
          </PersoButton>
          <div className="flex items-center justify-center text-sm mt-4 underline">
            <NavElement to={`/login`}>Click here to sign in</NavElement>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
