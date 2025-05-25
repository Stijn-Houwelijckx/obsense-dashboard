import { cn } from "utils/cn";

interface Props {
  label: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
}

const Button = ({ label, type = "button", className, onClick }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "w-full p-3.5 mt-4 mb-5 font-bold rounded-lg text-secondary-800 bg-primary-500 sm:p-4 sm:mb-6",
        className
      )}
    >
      {label}
    </button>
  );
};

export default Button;
