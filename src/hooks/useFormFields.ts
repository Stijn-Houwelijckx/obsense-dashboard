import { SignUpFormData } from "types/auth.types";

type FormFields = keyof SignUpFormData;

export const useFormFields = (step: number): FormFields[] => {
  switch (step) {
    case 1:
      return ["firstName", "lastName"];
    case 2:
      return ["username", "email"];
    case 3:
      return ["password", "confirmPassword"];
    default:
      return ["firstName", "lastName"];
  }
};
