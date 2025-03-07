import { FormDataT } from "../../../types/componentPropsT";

// form validation helper function
export function validateForm(formData: FormDataT) {
  const errors: Partial<FormDataT> = {};
  const emailReg: RegExp = /^\S+@\S+\.\S+$/;

  // email validation
  if (!formData.email) {
    errors.email = "E-Mail is required";
  } else if (!emailReg.test(formData.email)) {
    errors.email = "Invalid E-Mail format";
  }

  // Password validation
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (formData.password !== formData.passwordRepeat) {
    errors.passwordRepeat = "Passwords do not match";
  }

  return errors;
}
