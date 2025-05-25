import { useFormFields } from "hooks/useFormFields";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { SignUpFormData } from "types/auth.types";

import Button from "components/@button/Button";
import InputField from "components/@form/InputField";

interface Props {
  errors: FieldErrors;
  register: UseFormRegister<SignUpFormData>;
  handleSubmit: UseFormHandleSubmit<SignUpFormData>;
  onSubmit: (data: SignUpFormData) => void;
  currentFormStep: number;
  handleNextFormStep: () => void;
}

const SignUpForm = ({
  errors,
  register,
  handleSubmit,
  onSubmit,
  currentFormStep,
  handleNextFormStep,
}: Props) => {
  const hasErrors = useFormFields(currentFormStep).some(
    (field) => errors[field]
  );

  return (
    <form className="pt-6 xl:pt-0">
      <div className={`flex flex-col ${hasErrors ? "gap-2.5" : "gap-0"}`}>
        <div
          className={`flex-col ${hasErrors ? "gap-2.5" : "gap-0"} ${
            currentFormStep === 1 ? "flex" : "hidden"
          } xl:flex xl:flex-row xl:gap-8`}
        >
          <InputField
            label="First name"
            name="firstName"
            type="text"
            placeholder="John"
            register={register}
            errors={errors}
            validation={{ required: "First name is required." }}
          />
          <InputField
            label="Last name"
            name="lastName"
            type="text"
            placeholder="Doe"
            register={register}
            errors={errors}
            validation={{ required: "Last name is required." }}
          />
        </div>
        <div
          className={`flex-col ${hasErrors ? "gap-2.5" : "gap-0"} ${
            currentFormStep === 2 ? "flex" : "hidden"
          } xl:flex xl:flex-row xl:gap-8`}
        >
          <InputField
            label="Username"
            name="username"
            type="text"
            placeholder="john.doe"
            register={register}
            errors={errors}
            validation={{ required: "Username is required." }}
          />
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
        </div>
        <div
          className={`flex-col ${hasErrors ? "gap-2.5" : "gap-0"} ${
            currentFormStep === 3 ? "flex" : "hidden"
          } xl:flex xl:flex-row xl:gap-8`}
        >
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••••"
            isPassword
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
          <InputField
            label="Confirm password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••••"
            isPassword
            register={register}
            errors={errors}
            validation={{
              required: "Confirm password is required.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
            }}
          />
        </div>
      </div>
      <Button
        label="Sign up"
        onClick={handleSubmit(onSubmit)}
        className={`${currentFormStep === 3 ? "block" : "hidden"} xl:block ${
          hasErrors ? "mt-8" : "mt-4"
        }`}
      />
      <Button
        label="Next Step"
        onClick={handleNextFormStep}
        className={`${currentFormStep === 3 ? "hidden" : "block"} xl:hidden ${
          hasErrors ? "mt-8" : "mt-4"
        }`}
      />
    </form>
  );
};

export default SignUpForm;
