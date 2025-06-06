import { FieldErrors, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props<T extends Record<string, unknown>> {
  label: string;
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  errors: FieldErrors;
  validation?: RegisterOptions<T, Path<T>>;
}

const TextAreaField = <T extends Record<string, unknown>>({
  label,
  name,
  placeholder,
  register,
  errors,
  validation,
}: Props<T>) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      <label className="font-medium text-neutral-100">{label}</label>
      <textarea
        className="w-full min-h-[100px] border border-neutral-500 bg-secondary-700 placeholder-neutral-500 rounded-lg px-3 py-2.5 focus:outline-none focus:border-primary-500 resize-none"
        placeholder={placeholder}
        {...register(name, validation)}
      />
      <div className="min-h-4 w-full">
        {errors[name] && (
          <p className="text-xs text-red-500">{errors[name]?.message?.toString()}</p>
        )}
      </div>
    </div>
  );
};

export default TextAreaField;
