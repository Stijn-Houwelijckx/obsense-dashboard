import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { SignInFormData } from "types/auth.types";

import Button from "components/@button/Button";
import InputField from "components/@form/InputField";

interface Props {
  errors: FieldErrors;
  register: UseFormRegister<SignInFormData>;
  handleSubmit: UseFormHandleSubmit<SignInFormData>;
  onSubmit: (data: SignInFormData) => void;
}

const SignInForm = ({ errors, register, handleSubmit, onSubmit }: Props) => {
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form className="pt-3.5 sm:pt-2.5 xl:pt-0">
      <div className={`flex flex-col ${hasErrors ? "gap-2.5" : "gap-0"}`}>
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="john.doe@outlook.com"
          register={register}
          errors={errors}
          validation={{
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "This email is invalid.",
            },
          }}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••••••"
          isPassword
          hasForgotPassword
          register={register}
          errors={errors}
          validation={{
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
          }}
        />
      </div>
      <Button
        label="Sign in"
        type="button"
        className="mt-8"
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};

export default SignInForm;
