import { cn } from 'utils/cn';

interface Props {
  label: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  leftIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  rightIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

const Button = ({
  label,
  disabled,
  className,
  labelClassName,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onClick,
}: Props) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'w-auto flex justify-center items-center font-bold text-secondary-800 bg-primary-500 rounded-lg',
        className,
      )}
    >
      {LeftIcon && <LeftIcon className="h-full w-auto fill-current p-px" />}
      <span className={cn('whitespace-nowrap', labelClassName)}>{label}</span>
      {RightIcon && <RightIcon className="h-full w-auto fill-current p-px" />}
    </button>
  );
};

export default Button;
