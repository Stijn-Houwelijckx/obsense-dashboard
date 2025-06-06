import { useState } from 'react';
import { FieldErrors, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { Link } from 'react-router-dom';

import IconButton from 'components/@button/IconButton';
import { HideIcon, InfoIcon, ViewIcon } from 'components/@icon';

interface Props<T extends Record<string, unknown>> {
  label: string;
  name: Path<T>;
  type: string;
  placeholder: string;
  isPassword?: boolean;
  hasForgotPassword?: boolean;
  hasInfo?: boolean;
  onFocus?: () => void;
  register: UseFormRegister<T>;
  errors: FieldErrors;
  validation?: RegisterOptions<T, Path<T>>;
}

// TODO: remove autofill styling
// TODO: fix spacing when there are errors in forms

const InputField = <T extends Record<string, unknown>>({
  label,
  name,
  type,
  placeholder,
  isPassword = false,
  hasForgotPassword = false,
  hasInfo = false,
  onFocus,
  register,
  errors,
  validation,
}: Props<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <label className="font-medium text-neutral-100">{label}</label>
        {hasInfo && (
          <IconButton icon={InfoIcon} className="w-5 h-5 text-neutral-100/50 p-0 ml-auto" />
        )}
      </div>
      <div className="relative">
        <input
          className="w-full border border-neutral-500 bg-secondary-700 placeholder-neutral-500 rounded-lg px-3 p-2.5 focus:outline-none focus:border-primary-500"
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          onFocus={onFocus}
          {...register(name, validation)}
        />
        {isPassword && (
          <IconButton
            icon={showPassword ? HideIcon : ViewIcon}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 text-neutral-500 bg-transparent px-3 p-2.5"
          />
        )}
      </div>
      <div className="min-h-4 w-full flex justify-between">
        {errors[name] && (
          <p className="text-xs text-red-500">{errors[name]?.message?.toString()}</p>
        )}
        {hasForgotPassword && (
          <Link to="/forgot-password" className="font-bold text-xs text-primary-500 ml-auto">
            Forgot password?
          </Link>
        )}
      </div>
    </div>
  );
};

export default InputField;
