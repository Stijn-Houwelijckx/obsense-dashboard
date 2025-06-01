import { cn } from 'utils/cn';

interface Props {
  label: string;
  className?: string;
  onClick?: () => void;
}

const Button = ({ label, className, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full font-bold text-secondary-800 bg-primary-500 rounded-lg mt-4 mb-5 p-3.5 sm:p-4 sm:mb-6',
        className,
      )}
    >
      {label}
    </button>
  );
};

export default Button;
