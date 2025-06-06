import { FieldErrors, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { cn } from 'utils/cn';

import IconButton from 'components/@button/IconButton';
import { InfoIcon } from 'components/@icon';

interface Props<T extends Record<string, unknown>> {
  name: Path<T>;
  options: string[];
  selectedOption: string;
  hasInfo?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors;
  validation?: RegisterOptions<T, Path<T>>;
}

const ToggleField = <T extends Record<string, unknown>>({
  name,
  options,
  selectedOption,
  hasInfo = false,
  register,
  errors,
  validation,
}: Props<T>) => {
  const selectedIndex = options.indexOf(selectedOption);

  return (
    <div className="flex flex-col gap-1.5 mb-1.5">
      <div className="h-11 w-full relative bg-secondary-700 rounded-full shadow-md p-1.5">
        <div className="relative h-full grid grid-cols-2">
          <div
            className={cn(
              'absolute h-full w-1/2 bg-primary-500 rounded-full transition-all duration-300 ease-in-out',
              selectedIndex === 0 ? 'translate-x-0' : 'translate-x-full',
            )}
          />
          {options.map((option, index) => (
            <label key={index} className="relative flex items-center justify-center cursor-pointer">
              <input
                type="radio"
                className="sr-only peer"
                value={option}
                {...register(name, validation)}
              />
              <span className="font-medium text-neutral-100/50 text-sm capitalize peer-checked:font-bold peer-checked:text-secondary-800 transition-all duration-150 ease-in-out">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="min-h-4 w-full flex justify-between items-center">
        {errors[name] && (
          <p className="text-xs text-red-500">{errors[name]?.message?.toString()}</p>
        )}
        {hasInfo && (
          <IconButton icon={InfoIcon} className="w-5 h-5 text-neutral-100/50 p-0 ml-auto" />
        )}
      </div>
    </div>
  );
};

export default ToggleField;
